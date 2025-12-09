"use client"

import { useState, useEffect } from "react"
import { Trophy, Medal, Flame, ChevronUp, ChevronDown } from "lucide-react"
import { Card } from "@/components/ui/card"
import { LlamaAvatar } from "@/components/llama-avatar"
import { useAuth } from "@/lib/auth-context"
import { useUserProgress } from "@/lib/user-progress-context"

interface LeaderboardUser {
  id: string
  name: string
  xp: number
  streak: number
  rank: number
  change: "up" | "down" | "same"
  isCurrentUser?: boolean
}

const sampleUsers = [
  { id: "sample-1", name: "Carlos M.", xp: 2450, streak: 15 },
  { id: "sample-2", name: "Ana P.", xp: 2280, streak: 12 },
  { id: "sample-3", name: "José L.", xp: 2150, streak: 10 },
  { id: "sample-4", name: "Pedro S.", xp: 1180, streak: 5 },
  { id: "sample-5", name: "Lucía G.", xp: 1050, streak: 8 },
  { id: "sample-6", name: "Miguel A.", xp: 980, streak: 4 },
  { id: "sample-7", name: "Rosa V.", xp: 890, streak: 6 },
]

export function LeaderboardScreen() {
  const [timeframe, setTimeframe] = useState<"week" | "month" | "all">("week")
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardUser[]>([])
  const { user } = useAuth()
  const { progress } = useUserProgress()

  useEffect(() => {
    // Cargar leaderboard del localStorage
    const storedLeaderboard = JSON.parse(localStorage.getItem("runalingua-leaderboard") || "[]")

    // Combinar usuarios de muestra con usuarios reales
    const allUsers = [...sampleUsers]

    // Agregar usuarios reales del leaderboard
    storedLeaderboard.forEach((entry: any) => {
      const exists = allUsers.some((u) => u.id === entry.id)
      if (!exists) {
        allUsers.push(entry)
      } else {
        // Actualizar si ya existe
        const index = allUsers.findIndex((u) => u.id === entry.id)
        allUsers[index] = entry
      }
    })

    // Asegurar que el usuario actual esté en la lista
    if (user) {
      const currentUserIndex = allUsers.findIndex((u) => u.id === user.id)
      if (currentUserIndex >= 0) {
        allUsers[currentUserIndex] = {
          id: user.id,
          name: user.name,
          xp: progress.totalXp,
          streak: progress.streak,
        }
      } else {
        allUsers.push({
          id: user.id,
          name: user.name,
          xp: progress.totalXp,
          streak: progress.streak,
        })
      }
    }

    // Ordenar por XP y asignar rankings
    const sorted = allUsers
      .sort((a, b) => b.xp - a.xp)
      .map((u, index) => ({
        ...u,
        rank: index + 1,
        change: "same" as const,
        isCurrentUser: user ? u.id === user.id : false,
      }))

    setLeaderboardData(sorted)
  }, [user, progress])

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-secondary-foreground" />
      case 2:
        return <Medal className="w-6 h-6 text-muted-foreground" />
      case 3:
        return <Medal className="w-6 h-6 text-primary" />
      default:
        return <span className="w-6 h-6 flex items-center justify-center font-bold text-muted-foreground">{rank}</span>
    }
  }

  const getChangeIcon = (change: "up" | "down" | "same") => {
    switch (change) {
      case "up":
        return <ChevronUp className="w-4 h-4 text-green-600" />
      case "down":
        return <ChevronDown className="w-4 h-4 text-red-500" />
      default:
        return <span className="w-4 h-4 text-muted-foreground">-</span>
    }
  }

  const top3 = leaderboardData.slice(0, 3)

  return (
    <div className="px-4 py-6 max-w-lg mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-foreground">Clasificación</h1>
        <p className="text-muted-foreground">Compite con otros estudiantes</p>
      </div>

      {/* Timeframe Selector */}
      <div className="flex gap-2 mb-6 bg-muted p-1 rounded-xl">
        {(["week", "month", "all"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTimeframe(t)}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
              timeframe === t ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
            }`}
          >
            {t === "week" ? "Semana" : t === "month" ? "Mes" : "Total"}
          </button>
        ))}
      </div>

      {/* Top 3 Podium */}
      {top3.length >= 3 && (
        <div className="flex items-end justify-center gap-2 mb-6 h-40">
          {/* 2nd Place */}
          <div className="flex flex-col items-center">
            <LlamaAvatar size="md" />
            <div className="mt-2 w-20 bg-muted-foreground/20 rounded-t-lg pt-8 pb-2 text-center">
              <p className="text-sm font-semibold text-foreground truncate px-1">{top3[1]?.name}</p>
              <p className="text-xs text-muted-foreground">{top3[1]?.xp} XP</p>
            </div>
          </div>
          {/* 1st Place */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <LlamaAvatar size="lg" />
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                <Trophy className="w-4 h-4 text-secondary-foreground" />
              </div>
            </div>
            <div className="mt-2 w-24 bg-secondary/30 rounded-t-lg pt-12 pb-2 text-center">
              <p className="text-sm font-semibold text-foreground truncate px-1">{top3[0]?.name}</p>
              <p className="text-xs text-muted-foreground">{top3[0]?.xp} XP</p>
            </div>
          </div>
          {/* 3rd Place */}
          <div className="flex flex-col items-center">
            <LlamaAvatar size="md" />
            <div className="mt-2 w-20 bg-primary/20 rounded-t-lg pt-6 pb-2 text-center">
              <p className="text-sm font-semibold text-foreground truncate px-1">{top3[2]?.name}</p>
              <p className="text-xs text-muted-foreground">{top3[2]?.xp} XP</p>
            </div>
          </div>
        </div>
      )}

      {/* Full Leaderboard */}
      <Card className="divide-y divide-border bg-card">
        {leaderboardData.map((leaderboardUser) => (
          <div
            key={leaderboardUser.id}
            className={`flex items-center gap-3 p-4 ${leaderboardUser.isCurrentUser ? "bg-primary/5" : ""}`}
          >
            {getRankIcon(leaderboardUser.rank)}
            <LlamaAvatar size="sm" />
            <div className="flex-1">
              <p className={`font-semibold ${leaderboardUser.isCurrentUser ? "text-primary" : "text-foreground"}`}>
                {leaderboardUser.name} {leaderboardUser.isCurrentUser && "(Tú)"}
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{leaderboardUser.xp} XP</span>
                <span>·</span>
                <Flame className="w-3 h-3 text-primary" />
                <span>{leaderboardUser.streak}</span>
              </div>
            </div>
            {getChangeIcon(leaderboardUser.change)}
          </div>
        ))}
      </Card>
    </div>
  )
}
