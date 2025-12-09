"use client"

import type React from "react"

import { useState } from "react"
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { useAuth } from "@/lib/auth-context"
import { LlamaAvatar } from "./llama-avatar"

export function AuthScreen() {
  const [mode, setMode] = useState<"login" | "register">("login")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const { login, register } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      if (mode === "register") {
        if (!name.trim()) {
          setError("Por favor ingresa tu nombre")
          setLoading(false)
          return
        }
        if (password.length < 6) {
          setError("La contraseña debe tener al menos 6 caracteres")
          setLoading(false)
          return
        }
        const result = await register(name.trim(), email, password)
        if (!result.success) {
          setError(result.error || "Error al registrarse")
        }
      } else {
        const result = await login(email, password)
        if (!result.success) {
          setError(result.error || "Error al iniciar sesión")
        }
      }
    } catch {
      setError("Ha ocurrido un error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-8">
      {/* Logo y Título */}
      <div className="text-center mb-8">
        <div className="mb-4">
          <LlamaAvatar size="lg" className="mx-auto" />
        </div>
        <h1 className="text-3xl font-bold text-primary mb-2">RunaLingua</h1>
        <p className="text-muted-foreground">Aprende Quechua de forma divertida</p>
      </div>

      {/* Tarjeta de Auth */}
      <Card className="w-full max-w-sm p-6 bg-card">
        {/* Tabs */}
        <div className="flex gap-2 mb-6 bg-muted p-1 rounded-xl">
          <button
            onClick={() => {
              setMode("login")
              setError("")
            }}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
              mode === "login" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
            }`}
          >
            Iniciar sesión
          </button>
          <button
            onClick={() => {
              setMode("register")
              setError("")
            }}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
              mode === "register" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
            }`}
          >
            Registrarse
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "register" && (
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Tu nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-10 bg-background"
                required
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 bg-background"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 pr-10 bg-background"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {error && <p className="text-sm text-destructive text-center">{error}</p>}

          <Button type="submit" className="w-full" size="lg" disabled={loading}>
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                {mode === "login" ? "Iniciar sesión" : "Crear cuenta"}
                <ArrowRight className="w-5 h-5 ml-2" />
              </>
            )}
          </Button>
        </form>
      </Card>

      {/* Decoración andina */}
      <div className="mt-8 flex items-center gap-2 text-muted-foreground">
        <div className="h-px w-12 bg-border" />
        <span className="text-sm">Preservando nuestras lenguas</span>
        <div className="h-px w-12 bg-border" />
      </div>
    </div>
  )
}
