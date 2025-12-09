"use client"

import { Flame, Zap, Target, ChevronRight, BookOpen } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { LlamaAvatar } from "@/components/llama-avatar"
import { useUserProgress } from "@/lib/user-progress-context"
import { unitsData, lessonContents } from "@/lib/lesson-data"

interface HomeScreenProps {
  onStartLesson: (lessonId: number) => void
}

export function HomeScreen({ onStartLesson }: HomeScreenProps) {
  const { progress, getNextUnlockedLesson, isLessonCompleted } = useUserProgress()

  const nextLessonId = getNextUnlockedLesson() || 1
  const nextLessonInfo = unitsData.flatMap((u) => u.lessons).find((l) => l.id === nextLessonId)
  const nextLessonContent = lessonContents[nextLessonId]

  // Calcular progreso de la lección actual
  const currentUnit = unitsData.find((u) => u.lessons.some((l) => l.id === nextLessonId))
  const lessonsInUnit = currentUnit?.lessons || []
  const completedInUnit = lessonsInUnit.filter((l) => isLessonCompleted(l.id)).length
  const unitProgress = lessonsInUnit.length > 0 ? (completedInUnit / lessonsInUnit.length) * 100 : 0

  // Datos culturales rotativos
  const culturalTips = [
    {
      icon: "🏔️",
      title: "Dato cultural",
      text: '"Allin p\'unchaw" significa "buen día" en Quechua. Es el saludo más común usado en las comunidades andinas durante la mañana.',
    },
    {
      icon: "🦙",
      title: "¿Sabías que?",
      text: 'La llama es un animal sagrado en la cultura andina. En Quechua se dice igual: "llama" (pronunciado YAH-mah).',
    },
    {
      icon: "☀️",
      title: "Cultura Inca",
      text: '"Inti" es el dios del sol en la cultura Inca. La palabra "Inti" también significa sol en Quechua.',
    },
    {
      icon: "🌽",
      title: "Gastronomía",
      text: 'El maíz o "sara" es fundamental en la cocina andina. Se usa para hacer chicha, mote, y muchos platos tradicionales.',
    },
  ]

  const randomTip = culturalTips[Math.floor(Math.random() * culturalTips.length)]

  return (
    <div className="px-4 py-6 max-w-lg mx-auto space-y-6">
      {/* Header with Avatar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <LlamaAvatar size="md" />
          <div>
            <h1 className="text-xl font-bold text-foreground">¡Allin p'unchaw!</h1>
            <p className="text-sm text-muted-foreground">Quechua · {currentUnit?.title || "Básico"}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-secondary/50 px-3 py-1.5 rounded-full">
          <Flame className="w-5 h-5 text-primary" />
          <span className="font-bold text-foreground">{progress.streak}</span>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="p-3 text-center bg-card">
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <Flame className="w-4 h-4 text-primary" />
            <span className="text-lg font-bold text-foreground">{progress.streak}</span>
          </div>
          <span className="text-xs text-muted-foreground">Racha</span>
        </Card>
        <Card className="p-3 text-center bg-card">
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <Zap className="w-4 h-4 text-secondary-foreground" />
            <span className="text-lg font-bold text-foreground">{progress.totalXp}</span>
          </div>
          <span className="text-xs text-muted-foreground">XP Total</span>
        </Card>
        <Card className="p-3 text-center bg-card">
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <Target className="w-4 h-4 text-accent" />
            <span className="text-lg font-bold text-foreground">
              {progress.dailyProgress}/{progress.dailyGoal}
            </span>
          </div>
          <span className="text-xs text-muted-foreground">Meta diaria</span>
        </Card>
      </div>

      {/* Daily Progress */}
      <Card className="p-4 bg-card">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-foreground">Progreso de hoy</h2>
          <span className="text-sm text-muted-foreground">
            {Math.round((progress.dailyProgress / progress.dailyGoal) * 100)}%
          </span>
        </div>
        <Progress value={(progress.dailyProgress / progress.dailyGoal) * 100} className="h-3" />
        {progress.dailyProgress < progress.dailyGoal ? (
          <p className="text-sm text-muted-foreground mt-2">
            ¡{progress.dailyGoal - progress.dailyProgress} XP más para completar tu meta!
          </p>
        ) : (
          <p className="text-sm text-primary mt-2 font-medium">¡Meta diaria completada!</p>
        )}
      </Card>

      {/* Continue Learning */}
      <div>
        <h2 className="font-semibold text-foreground mb-3">Continuar aprendiendo</h2>
        <Card
          className="p-4 bg-primary/5 border-primary/20 cursor-pointer hover:bg-primary/10 transition-colors"
          onClick={() => onStartLesson(nextLessonId)}
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center text-2xl">
              {nextLessonInfo?.icon || "📚"}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">{nextLessonContent?.title || "Nueva lección"}</h3>
              <p className="text-sm text-muted-foreground">
                {nextLessonContent?.description || "Continúa tu aprendizaje"}
              </p>
              <div className="mt-2">
                <Progress value={unitProgress} className="h-2" />
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </div>
        </Card>
      </div>

      {/* Quick Stats */}
      <div>
        <h2 className="font-semibold text-foreground mb-3">Tu progreso</h2>
        <div className="grid grid-cols-2 gap-3">
          <Card className="p-4 bg-card">
            <div className="flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-primary" />
              <div>
                <p className="text-2xl font-bold text-foreground">{progress.completedLessons.length}</p>
                <p className="text-sm text-muted-foreground">Lecciones completadas</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 bg-card">
            <div className="flex items-center gap-3">
              <Zap className="w-8 h-8 text-secondary-foreground" />
              <div>
                <p className="text-2xl font-bold text-foreground">{progress.totalXp}</p>
                <p className="text-sm text-muted-foreground">XP totales</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Cultural Tip */}
      <Card className="p-4 bg-accent/10 border-accent/20">
        <div className="flex items-start gap-3">
          <span className="text-2xl">{randomTip.icon}</span>
          <div>
            <h3 className="font-semibold text-foreground">{randomTip.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{randomTip.text}</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
