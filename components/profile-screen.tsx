"use client"

import { Award, Calendar, Target, ChevronRight, Volume2, Moon, Bell, LogOut } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { LlamaAvatar } from "@/components/llama-avatar"
import { useAuth } from "@/lib/auth-context"
import { useUserProgress } from "@/lib/user-progress-context"
import { useTheme } from "@/lib/theme-context"

export function ProfileScreen() {
  const { user, logout } = useAuth()
  const { progress } = useUserProgress()
  const { theme, toggleTheme } = useTheme()

  // Calcular nivel basado en XP
  const getLevel = (xp: number) => {
    if (xp >= 5000) return "Avanzado"
    if (xp >= 2000) return "Intermedio"
    return "Básico"
  }

  const getNextLevelXp = (xp: number) => {
    if (xp >= 5000) return { current: xp, target: 10000, progress: ((xp - 5000) / 5000) * 100 }
    if (xp >= 2000) return { current: xp - 2000, target: 3000, progress: ((xp - 2000) / 3000) * 100 }
    return { current: xp, target: 2000, progress: (xp / 2000) * 100 }
  }

  const levelProgress = getNextLevelXp(progress.totalXp)
  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("es", { month: "long", year: "numeric" })
    : "Recién registrado"

  const achievements = [
    { id: 1, title: "Primera lección", icon: "🎯", unlocked: progress.completedLessons.length > 0 },
    { id: 2, title: "Racha de 7 días", icon: "🔥", unlocked: progress.streak >= 7 },
    { id: 3, title: "100 XP", icon: "⭐", unlocked: progress.totalXp >= 100 },
    { id: 4, title: "Maestro del quechua", icon: "👑", unlocked: progress.completedLessons.length >= 15 },
  ]

  return (
    <div className="px-4 py-6 max-w-lg mx-auto space-y-6">
      {/* Profile Header */}
      <div className="text-center">
        <LlamaAvatar size="lg" className="mx-auto" />
        <h1 className="text-xl font-bold text-foreground mt-3">{user?.name || "Usuario"}</h1>
        <p className="text-muted-foreground">{user?.email}</p>
        <div className="inline-flex items-center gap-2 mt-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
          <Award className="w-4 h-4" />
          Nivel {getLevel(progress.totalXp)}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="p-4 text-center bg-card">
          <div className="text-2xl font-bold text-primary">{progress.totalXp}</div>
          <div className="text-sm text-muted-foreground">XP Total</div>
        </Card>
        <Card className="p-4 text-center bg-card">
          <div className="text-2xl font-bold text-foreground">{progress.completedLessons.length * 10}</div>
          <div className="text-sm text-muted-foreground">Palabras aprendidas</div>
        </Card>
        <Card className="p-4 text-center bg-card">
          <div className="text-2xl font-bold text-foreground">{progress.completedLessons.length}</div>
          <div className="text-sm text-muted-foreground">Lecciones</div>
        </Card>
        <Card className="p-4 text-center bg-card">
          <div className="text-2xl font-bold text-foreground">{progress.streak}</div>
          <div className="text-sm text-muted-foreground">Racha actual</div>
        </Card>
      </div>

      {/* Progress to Next Level */}
      <Card className="p-4 bg-card">
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold text-foreground">Progreso al siguiente nivel</span>
          <span className="text-sm text-muted-foreground">
            {Math.round(levelProgress.current)}/{levelProgress.target} XP
          </span>
        </div>
        <Progress value={levelProgress.progress} className="h-3" />
        <p className="text-sm text-muted-foreground mt-2">
          ¡{levelProgress.target - Math.round(levelProgress.current)} XP más para el siguiente nivel!
        </p>
      </Card>

      {/* Achievements */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-foreground">Logros</h2>
          <button className="text-sm text-primary font-medium">Ver todos</button>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`aspect-square rounded-xl flex flex-col items-center justify-center ${
                achievement.unlocked ? "bg-secondary/30" : "bg-muted opacity-50"
              }`}
              title={achievement.title}
            >
              <span className="text-2xl">{achievement.icon}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Settings */}
      <Card className="divide-y divide-border bg-card">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
              <Target className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <p className="font-medium text-foreground">Meta diaria</p>
              <p className="text-sm text-muted-foreground">{progress.dailyGoal} XP por día</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </div>
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
              <Volume2 className="w-5 h-5 text-muted-foreground" />
            </div>
            <p className="font-medium text-foreground">Efectos de sonido</p>
          </div>
          <Switch defaultChecked />
        </div>
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
              <Bell className="w-5 h-5 text-muted-foreground" />
            </div>
            <p className="font-medium text-foreground">Recordatorios</p>
          </div>
          <Switch defaultChecked />
        </div>
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
              <Moon className="w-5 h-5 text-muted-foreground" />
            </div>
            <p className="font-medium text-foreground">Modo oscuro</p>
          </div>
          <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} />
        </div>
      </Card>

      {/* Logout Button */}
      <Button variant="outline" className="w-full bg-transparent" onClick={logout}>
        <LogOut className="w-4 h-4 mr-2" />
        Cerrar sesión
      </Button>

      {/* Member Info */}
      <div className="text-center text-sm text-muted-foreground">
        <Calendar className="w-4 h-4 inline mr-1" />
        Miembro desde {memberSince}
      </div>
    </div>
  )
}
