"use client"

import { Home, BookOpen, Trophy, Book, User } from "lucide-react"
import type { Screen } from "@/app/page"

interface BottomNavigationProps {
  currentScreen: Screen
  onNavigate: (screen: Screen) => void
}

const navItems: { id: Screen; icon: typeof Home; label: string }[] = [
  { id: "home", icon: Home, label: "Inicio" },
  { id: "lessons", icon: BookOpen, label: "Lecciones" },
  { id: "leaderboard", icon: Trophy, label: "Ranking" },
  { id: "dictionary", icon: Book, label: "Diccionario" },
  { id: "profile", icon: User, label: "Perfil" },
]

export function BottomNavigation({ currentScreen, onNavigate }: BottomNavigationProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
      <div className="max-w-lg mx-auto flex items-center justify-around py-2">
        {navItems.map((item) => {
          const isActive = currentScreen === item.id
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ${
                isActive ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground"
              }`}
              aria-label={item.label}
            >
              <item.icon className={`w-6 h-6 ${isActive ? "stroke-[2.5]" : ""}`} />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
