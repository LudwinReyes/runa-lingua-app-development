"use client"

import { useState } from "react"
import { BottomNavigation } from "@/components/bottom-navigation"
import { HomeScreen } from "@/components/home-screen"
import { LessonsScreen } from "@/components/lessons-screen"
import { LeaderboardScreen } from "@/components/leaderboard-screen"
import { ProfileScreen } from "@/components/profile-screen"
import { DictionaryScreen } from "@/components/dictionary-screen"
import { LessonView } from "@/components/lesson-view"
import { AuthScreen } from "@/components/auth-screen"
import { AuthProvider, useAuth } from "@/lib/auth-context"
import { UserProgressProvider } from "@/lib/user-progress-context"
import { ThemeProvider } from "@/lib/theme-context"

export type Screen = "home" | "lessons" | "leaderboard" | "dictionary" | "profile"

function RunaLinguaApp() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home")
  const [activeLessonId, setActiveLessonId] = useState<number | null>(null)
  const { isAuthenticated } = useAuth()

  const handleStartLesson = (lessonId: number) => {
    setActiveLessonId(lessonId)
  }

  const handleExitLesson = () => {
    setActiveLessonId(null)
  }

  if (!isAuthenticated) {
    return <AuthScreen />
  }

  if (activeLessonId !== null) {
    return <LessonView lessonId={activeLessonId} onExit={handleExitLesson} onStartNextLesson={setActiveLessonId} />
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 pb-20 overflow-y-auto">
        {currentScreen === "home" && <HomeScreen onStartLesson={handleStartLesson} />}
        {currentScreen === "lessons" && <LessonsScreen onStartLesson={handleStartLesson} />}
        {currentScreen === "leaderboard" && <LeaderboardScreen />}
        {currentScreen === "dictionary" && <DictionaryScreen />}
        {currentScreen === "profile" && <ProfileScreen />}
      </main>
      <BottomNavigation currentScreen={currentScreen} onNavigate={setCurrentScreen} />
    </div>
  )
}

function AuthenticatedApp() {
  return (
    <UserProgressProvider>
      <RunaLinguaApp />
    </UserProgressProvider>
  )
}

export default function RunaLingua() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AuthenticatedApp />
      </AuthProvider>
    </ThemeProvider>
  )
}
