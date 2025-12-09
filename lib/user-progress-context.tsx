"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { unitsData } from "./lesson-data"
import { useAuth } from "./auth-context"

interface UserProgress {
  completedLessons: number[]
  currentLessonId: number
  totalXp: number
  streak: number
  dailyProgress: number
  dailyGoal: number
}

interface UserProgressContextType {
  progress: UserProgress
  completeLesson: (lessonId: number, xpEarned: number) => void
  isLessonUnlocked: (lessonId: number) => boolean
  isLessonCompleted: (lessonId: number) => boolean
  getCurrentLesson: () => number
  getNextUnlockedLesson: () => number | null
}

const defaultProgress: UserProgress = {
  completedLessons: [],
  currentLessonId: 1,
  totalXp: 0,
  streak: 0,
  dailyProgress: 0,
  dailyGoal: 50,
}

const UserProgressContext = createContext<UserProgressContextType | undefined>(undefined)

export function UserProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<UserProgress>(defaultProgress)
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      const saved = localStorage.getItem(`runalingua-progress-${user.id}`)
      if (saved) {
        try {
          setProgress(JSON.parse(saved))
        } catch {
          setProgress(defaultProgress)
        }
      } else {
        setProgress(defaultProgress)
      }
    } else {
      setProgress(defaultProgress)
    }
  }, [user])

  useEffect(() => {
    if (user) {
      localStorage.setItem(`runalingua-progress-${user.id}`, JSON.stringify(progress))

      // También actualizar el ranking global
      updateLeaderboard(user.id, user.name, progress.totalXp, progress.streak)
    }
  }, [progress, user])

  const updateLeaderboard = (userId: string, name: string, xp: number, streak: number) => {
    try {
      const leaderboard = JSON.parse(localStorage.getItem("runalingua-leaderboard") || "[]")
      const existingIndex = leaderboard.findIndex((entry: any) => entry.id === userId)

      const entry = { id: userId, name, xp, streak, updatedAt: Date.now() }

      if (existingIndex >= 0) {
        leaderboard[existingIndex] = entry
      } else {
        leaderboard.push(entry)
      }

      localStorage.setItem("runalingua-leaderboard", JSON.stringify(leaderboard))
    } catch {
      // Ignorar errores de localStorage
    }
  }

  const completeLesson = (lessonId: number, xpEarned: number) => {
    setProgress((prev) => {
      const newCompletedLessons = prev.completedLessons.includes(lessonId)
        ? prev.completedLessons
        : [...prev.completedLessons, lessonId]

      const allLessons = unitsData.flatMap((u) => u.lessons.map((l) => l.id))
      const currentIndex = allLessons.indexOf(lessonId)
      const nextLessonId = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : lessonId

      return {
        ...prev,
        completedLessons: newCompletedLessons,
        currentLessonId: nextLessonId,
        totalXp: prev.totalXp + xpEarned,
        dailyProgress: Math.min(prev.dailyProgress + xpEarned, prev.dailyGoal),
        streak: prev.streak === 0 ? 1 : prev.streak,
      }
    })
  }

  const isLessonUnlocked = (lessonId: number) => {
    if (lessonId === 1) return true

    const allLessons = unitsData.flatMap((u) => u.lessons.map((l) => l.id))
    const lessonIndex = allLessons.indexOf(lessonId)

    if (lessonIndex <= 0) return true

    const previousLessonId = allLessons[lessonIndex - 1]
    return progress.completedLessons.includes(previousLessonId)
  }

  const isLessonCompleted = (lessonId: number) => {
    return progress.completedLessons.includes(lessonId)
  }

  const getCurrentLesson = () => {
    return progress.currentLessonId
  }

  const getNextUnlockedLesson = () => {
    const allLessons = unitsData.flatMap((u) => u.lessons.map((l) => l.id))
    for (const lessonId of allLessons) {
      if (isLessonUnlocked(lessonId) && !isLessonCompleted(lessonId)) {
        return lessonId
      }
    }
    return null
  }

  return (
    <UserProgressContext.Provider
      value={{
        progress,
        completeLesson,
        isLessonUnlocked,
        isLessonCompleted,
        getCurrentLesson,
        getNextUnlockedLesson,
      }}
    >
      {children}
    </UserProgressContext.Provider>
  )
}

export function useUserProgress() {
  const context = useContext(UserProgressContext)
  if (!context) {
    throw new Error("useUserProgress must be used within a UserProgressProvider")
  }
  return context
}
