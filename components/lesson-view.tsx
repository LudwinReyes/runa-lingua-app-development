"use client"

import { useState } from "react"
import { X, Volume2, Check, ChevronRight, Heart, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card } from "@/components/ui/card"
import { lessonContents, unitsData } from "@/lib/lesson-data"
import { useUserProgress } from "@/lib/user-progress-context"

interface LessonViewProps {
  lessonId: number
  onExit: () => void
  onStartNextLesson: (lessonId: number) => void
}

export function LessonView({ lessonId, onExit, onStartNextLesson }: LessonViewProps) {
  const [currentExercise, setCurrentExercise] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [orderedWords, setOrderedWords] = useState<string[]>([])
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [lives, setLives] = useState(3)
  const [xpEarned, setXpEarned] = useState(0)
  const [lessonComplete, setLessonComplete] = useState(false)

  const { completeLesson, getNextUnlockedLesson } = useUserProgress()

  const lessonContent = lessonContents[lessonId]
  const exercises = lessonContent?.exercises || []

  const exercise = exercises[currentExercise]
  const progress = exercises.length > 0 ? ((currentExercise + 1) / exercises.length) * 100 : 0

  const lessonInfo = unitsData.flatMap((u) => u.lessons).find((l) => l.id === lessonId)

  const checkAnswer = () => {
    if (!exercise) return

    let correct = false

    if (exercise.type === "order") {
      correct = JSON.stringify(orderedWords) === JSON.stringify(exercise.correctAnswer)
    } else {
      correct = selectedAnswer === exercise.correctAnswer
    }

    setIsCorrect(correct)
    setShowResult(true)

    if (correct) {
      setXpEarned((prev) => prev + 10)
    } else {
      setLives((prev) => Math.max(0, prev - 1))
    }
  }

  const nextExercise = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise((prev) => prev + 1)
      setSelectedAnswer(null)
      setOrderedWords([])
      setShowResult(false)
    } else {
      completeLesson(lessonId, xpEarned + (isCorrect ? 10 : 0))
      setLessonComplete(true)
    }
  }

  const handleWordClick = (word: string) => {
    if (orderedWords.includes(word)) {
      setOrderedWords(orderedWords.filter((w) => w !== word))
    } else {
      setOrderedWords([...orderedWords, word])
    }
  }

  const handleStartNextLesson = () => {
    const nextLesson = getNextUnlockedLesson()
    if (nextLesson) {
      onStartNextLesson(nextLesson)
    }
  }

  if (lessonComplete) {
    const nextLesson = getNextUnlockedLesson()
    const nextLessonInfo = nextLesson ? unitsData.flatMap((u) => u.lessons).find((l) => l.id === nextLesson) : null

    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 mx-auto mb-6 bg-primary/20 rounded-full flex items-center justify-center">
            <Trophy className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">¡Lección completada!</h1>
          <p className="text-muted-foreground mb-8">
            {lessonContent?.title}: {lessonContent?.description}
          </p>

          <Card className="p-6 mb-6 bg-card">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{xpEarned}</div>
                <div className="text-sm text-muted-foreground">XP ganados</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground">
                  {Math.round((xpEarned / (exercises.length * 10)) * 100)}%
                </div>
                <div className="text-sm text-muted-foreground">Precisión</div>
              </div>
            </div>
          </Card>

          {nextLessonInfo && (
            <Card className="p-4 mb-4 bg-primary/5 border-primary/20">
              <p className="text-sm text-muted-foreground mb-2">Siguiente lección desbloqueada:</p>
              <div className="flex items-center gap-3">
                <span className="text-2xl">{nextLessonInfo.icon}</span>
                <div className="text-left">
                  <p className="font-semibold text-foreground">{nextLessonInfo.title}</p>
                  <p className="text-sm text-muted-foreground">+{nextLessonInfo.xp} XP</p>
                </div>
              </div>
            </Card>
          )}

          <div className="space-y-3">
            {nextLessonInfo && (
              <Button onClick={handleStartNextLesson} className="w-full" size="lg">
                Siguiente lección
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            )}
            <Button onClick={onExit} variant="outline" className="w-full bg-transparent" size="lg">
              Volver al inicio
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (!exercise) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
        <p className="text-muted-foreground mb-4">Esta lección aún no tiene contenido</p>
        <Button onClick={onExit}>Volver</Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="px-4 py-3 flex items-center gap-4 border-b border-border">
        <button onClick={onExit} className="p-2 hover:bg-muted rounded-full" aria-label="Salir">
          <X className="w-6 h-6 text-muted-foreground" />
        </button>
        <Progress value={progress} className="flex-1 h-3" />
        <div className="flex items-center gap-1">
          {[...Array(3)].map((_, i) => (
            <Heart
              key={i}
              className={`w-6 h-6 ${i < lives ? "text-destructive fill-destructive" : "text-muted-foreground"}`}
            />
          ))}
        </div>
      </header>

      {/* Lesson Title */}
      <div className="px-4 py-2 bg-muted/50">
        <p className="text-sm text-muted-foreground">
          {lessonInfo?.icon} {lessonContent?.title}
        </p>
      </div>

      {/* Exercise Content */}
      <main className="flex-1 px-4 py-6 max-w-lg mx-auto w-full">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-foreground mb-2">{exercise.question}</h2>
          {exercise.hint && <p className="text-sm text-muted-foreground">{exercise.hint}</p>}
          {exercise.type === "listen" && (
            <Button variant="outline" size="lg" className="mt-4 bg-transparent">
              <Volume2 className="w-6 h-6 mr-2" />
              Escuchar
            </Button>
          )}
        </div>

        {exercise.type === "image" && exercise.image && (
          <div className="mb-6 flex justify-center">
            <div className="w-48 h-48 rounded-2xl overflow-hidden bg-muted border-2 border-border">
              <img src={exercise.image || "/placeholder.svg"} alt="Animal" className="w-full h-full object-cover" />
            </div>
          </div>
        )}

        {/* Answer Options */}
        {exercise.type === "order" ? (
          <div className="space-y-6">
            {/* Selected words */}
            <div className="min-h-16 p-4 bg-muted rounded-xl flex flex-wrap gap-2">
              {orderedWords.length === 0 && (
                <span className="text-muted-foreground text-sm">Toca las palabras para ordenarlas</span>
              )}
              {orderedWords.map((word, index) => (
                <button
                  key={index}
                  onClick={() => handleWordClick(word)}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium"
                >
                  {word}
                </button>
              ))}
            </div>
            {/* Available words */}
            <div className="flex flex-wrap gap-2 justify-center">
              {exercise.options?.map((word) => (
                <button
                  key={word}
                  onClick={() => handleWordClick(word)}
                  disabled={orderedWords.includes(word)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    orderedWords.includes(word)
                      ? "bg-muted text-muted-foreground opacity-50"
                      : "bg-card border-2 border-border text-foreground hover:border-primary"
                  }`}
                >
                  {word}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid gap-3">
            {exercise.options?.map((option) => (
              <button
                key={option}
                onClick={() => !showResult && setSelectedAnswer(option)}
                disabled={showResult}
                className={`p-4 rounded-xl border-2 text-left font-medium transition-all ${
                  showResult
                    ? option === exercise.correctAnswer
                      ? "border-green-500 bg-green-500/10 text-green-700 dark:text-green-400"
                      : option === selectedAnswer
                        ? "border-destructive bg-destructive/10 text-destructive"
                        : "border-border bg-card text-foreground"
                    : selectedAnswer === option
                      ? "border-primary bg-primary/10 text-foreground"
                      : "border-border bg-card text-foreground hover:border-primary/50"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </main>

      {/* Bottom Action */}
      <footer className="px-4 py-4 border-t border-border bg-card">
        <div className="max-w-lg mx-auto">
          {showResult ? (
            <div className={`mb-4 p-4 rounded-xl ${isCorrect ? "bg-green-500/10" : "bg-destructive/10"}`}>
              <div className="flex items-center gap-2 mb-1">
                {isCorrect ? (
                  <>
                    <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
                    <span className="font-bold text-green-700 dark:text-green-400">¡Correcto!</span>
                  </>
                ) : (
                  <>
                    <X className="w-5 h-5 text-destructive" />
                    <span className="font-bold text-destructive">Incorrecto</span>
                  </>
                )}
              </div>
              {!isCorrect && (
                <p className="text-sm text-muted-foreground">
                  La respuesta correcta es:{" "}
                  <strong className="text-foreground">
                    {Array.isArray(exercise.correctAnswer) ? exercise.correctAnswer.join(" ") : exercise.correctAnswer}
                  </strong>
                </p>
              )}
            </div>
          ) : null}

          <Button
            onClick={showResult ? nextExercise : checkAnswer}
            disabled={!showResult && !selectedAnswer && orderedWords.length === 0}
            className="w-full"
            size="lg"
          >
            {showResult ? (
              <>
                Continuar
                <ChevronRight className="w-5 h-5 ml-2" />
              </>
            ) : (
              "Comprobar"
            )}
          </Button>
        </div>
      </footer>
    </div>
  )
}
