"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface User {
  id: string
  name: string
  email: string
  createdAt: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  updateUser: (updates: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface StoredUser extends User {
  password: string
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  // Cargar usuario actual al iniciar
  useEffect(() => {
    const currentUserId = localStorage.getItem("runalingua-current-user")
    if (currentUserId) {
      const users = getStoredUsers()
      const foundUser = users.find((u) => u.id === currentUserId)
      if (foundUser) {
        const { password, ...userWithoutPassword } = foundUser
        setUser(userWithoutPassword)
      }
    }
  }, [])

  const getStoredUsers = (): StoredUser[] => {
    try {
      const stored = localStorage.getItem("runalingua-users")
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  }

  const saveUsers = (users: StoredUser[]) => {
    localStorage.setItem("runalingua-users", JSON.stringify(users))
  }

  const register = async (name: string, email: string, password: string) => {
    const users = getStoredUsers()

    // Verificar si el email ya existe
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, error: "Este correo ya está registrado" }
    }

    const newUser: StoredUser = {
      id: crypto.randomUUID(),
      name,
      email: email.toLowerCase(),
      password,
      createdAt: new Date().toISOString(),
    }

    users.push(newUser)
    saveUsers(users)

    // Inicializar progreso para el nuevo usuario
    localStorage.setItem(
      `runalingua-progress-${newUser.id}`,
      JSON.stringify({
        completedLessons: [],
        currentLessonId: 1,
        totalXp: 0,
        streak: 0,
        dailyProgress: 0,
        dailyGoal: 50,
      }),
    )

    // Auto login después del registro
    const { password: _, ...userWithoutPassword } = newUser
    setUser(userWithoutPassword)
    localStorage.setItem("runalingua-current-user", newUser.id)

    return { success: true }
  }

  const login = async (email: string, password: string) => {
    const users = getStoredUsers()
    const foundUser = users.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password)

    if (!foundUser) {
      return { success: false, error: "Correo o contraseña incorrectos" }
    }

    const { password: _, ...userWithoutPassword } = foundUser
    setUser(userWithoutPassword)
    localStorage.setItem("runalingua-current-user", foundUser.id)

    return { success: true }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("runalingua-current-user")
  }

  const updateUser = (updates: Partial<User>) => {
    if (!user) return

    const users = getStoredUsers()
    const userIndex = users.findIndex((u) => u.id === user.id)
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...updates }
      saveUsers(users)
      setUser((prev) => (prev ? { ...prev, ...updates } : null))
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
