"use client"

import { useState } from "react"
import { Lock, Check, Star, ChevronDown, ChevronRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { unitsData } from "@/lib/lesson-data"
import { useUserProgress } from "@/lib/user-progress-context"

interface LessonsScreenProps {
  onStartLesson: (lessonId: number) => void
}

export function LessonsScreen({ onStartLesson }: LessonsScreenProps) {
  const [expandedUnits, setExpandedUnits] = useState<number[]>([1])
  const { isLessonUnlocked, isLessonCompleted, getCurrentLesson } = useUserProgress()

  const toggleUnit = (unitId: number) => {
    setExpandedUnits((prev) => (prev.includes(unitId) ? prev.filter((id) => id !== unitId) : [...prev, unitId]))
  }

  const getUnitProgress = (unitId: number) => {
    const unit = unitsData.find((u) => u.id === unitId)
    if (!unit) return 0
    const completed = unit.lessons.filter((l) => isLessonCompleted(l.id)).length
    return (completed / unit.lessons.length) * 100
  }

  const getLessonStatus = (lessonId: number): "completed" | "current" | "locked" => {
    if (isLessonCompleted(lessonId)) return "completed"
    if (isLessonUnlocked(lessonId)) return "current"
    return "locked"
  }

  const currentLessonId = getCurrentLesson()

  return (
    <div className="px-4 py-6 max-w-lg mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Lecciones de Quechua</h1>
        <p className="text-muted-foreground">Aprende paso a paso</p>
      </div>

      {/* Units List */}
      <div className="space-y-4">
        {unitsData.map((unit) => {
          const unitProgress = getUnitProgress(unit.id)
          const isExpanded = expandedUnits.includes(unit.id)

          return (
            <Card key={unit.id} className="overflow-hidden bg-card">
              {/* Unit Header */}
              <button
                onClick={() => toggleUnit(unit.id)}
                className="w-full p-4 flex items-center gap-4 hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-foreground">{unit.title}</h3>
                    {unitProgress === 100 && <Star className="w-4 h-4 text-secondary-foreground fill-secondary" />}
                  </div>
                  <p className="text-sm text-muted-foreground">{unit.description}</p>
                  <div className="mt-2">
                    <Progress value={unitProgress} className="h-2" />
                  </div>
                </div>
                {isExpanded ? (
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                )}
              </button>

              {/* Lessons Grid */}
              {isExpanded && (
                <div className="px-4 pb-4 grid grid-cols-5 gap-2">
                  {unit.lessons.map((lesson) => {
                    const status = getLessonStatus(lesson.id)
                    const isCurrent = lesson.id === currentLessonId && status !== "completed"

                    return (
                      <button
                        key={lesson.id}
                        onClick={() => status !== "locked" && onStartLesson(lesson.id)}
                        disabled={status === "locked"}
                        className={`relative aspect-square rounded-xl flex flex-col items-center justify-center transition-all ${
                          status === "completed"
                            ? "bg-primary/20 text-primary"
                            : status === "current"
                              ? isCurrent
                                ? "bg-primary text-primary-foreground ring-4 ring-primary/30 animate-pulse"
                                : "bg-primary text-primary-foreground ring-2 ring-primary/30"
                              : "bg-muted text-muted-foreground opacity-60"
                        }`}
                        aria-label={`${lesson.title}${status === "locked" ? " (bloqueado)" : ""}`}
                      >
                        <span className="text-xl">{lesson.icon}</span>
                        {status === "completed" && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                            <Check className="w-3 h-3 text-primary-foreground" />
                          </div>
                        )}
                        {status === "locked" && <Lock className="w-4 h-4 absolute bottom-1" />}
                      </button>
                    )
                  })}
                </div>
              )}
            </Card>
          )
        })}
      </div>
    </div>
  )
}
