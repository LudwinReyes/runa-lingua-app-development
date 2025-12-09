"use client"

import { useState } from "react"
import { Search, Volume2, BookOpen, Star, ChevronDown } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { dictionaryData, categories } from "@/lib/dictionary-data"

export function DictionaryScreen() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [favorites, setFavorites] = useState<number[]>([1, 40, 54])
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false)
  const [expandedEntry, setExpandedEntry] = useState<number | null>(null)

  const filteredEntries = dictionaryData.filter((entry) => {
    const matchesSearch =
      entry.quechua.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.spanish.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = !selectedCategory || entry.category === selectedCategory
    const matchesFavorites = !showOnlyFavorites || favorites.includes(entry.id)

    return matchesSearch && matchesCategory && matchesFavorites
  })

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]))
  }

  const toggleExpanded = (id: number) => {
    setExpandedEntry((prev) => (prev === id ? null : id))
  }

  return (
    <div className="px-4 py-6 max-w-lg mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Diccionario</h1>
        <p className="text-muted-foreground">Quechua - Español ({dictionaryData.length} palabras)</p>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Buscar palabra..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-card"
        />
      </div>

      {/* Favorites Toggle */}
      <button
        onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
        className={`mb-4 px-4 py-2 rounded-full text-sm font-medium transition-all ${
          showOnlyFavorites ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
        }`}
      >
        <Star className={`w-4 h-4 inline mr-1 ${showOnlyFavorites ? "fill-primary-foreground" : ""}`} />
        Favoritos ({favorites.length})
      </button>

      {/* Category Pills */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-3 py-1 rounded-full text-sm whitespace-nowrap transition-all ${
            !selectedCategory ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
          }`}
        >
          Todas
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-3 py-1 rounded-full text-sm whitespace-nowrap transition-all ${
              selectedCategory === category ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-sm text-muted-foreground mb-4">
        {filteredEntries.length} resultado{filteredEntries.length !== 1 ? "s" : ""}
      </p>

      {/* Dictionary Entries */}
      <div className="space-y-3">
        {filteredEntries.map((entry) => {
          const isExpanded = expandedEntry === entry.id
          const isFavorite = favorites.includes(entry.id)

          return (
            <Card key={entry.id} className="overflow-hidden bg-card">
              {/* Entry Header - Always visible */}
              <button
                onClick={() => toggleExpanded(entry.id)}
                className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-lg text-foreground">{entry.spanish}</h3>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                      {entry.category}
                    </span>
                  </div>
                  <p className="text-primary font-semibold">{entry.quechua}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleFavorite(entry.id)
                    }}
                    className={`p-2 rounded-full ${isFavorite ? "text-secondary-foreground" : "text-muted-foreground"}`}
                    aria-label={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
                  >
                    <Star className={`w-5 h-5 ${isFavorite ? "fill-secondary" : ""}`} />
                  </button>
                  <ChevronDown
                    className={`w-5 h-5 text-muted-foreground transition-transform ${isExpanded ? "rotate-180" : ""}`}
                  />
                </div>
              </button>

              {/* Expanded Content */}
              {isExpanded && (
                <div className="px-4 pb-4 space-y-3">
                  {/* Pronunciation with audio button */}
                  <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg">
                    <div>
                      <span className="text-xs text-muted-foreground">Pronunciación</span>
                      <p className="font-mono text-foreground">{entry.pronunciation}</p>
                    </div>
                    <button className="p-2 text-primary hover:bg-primary/10 rounded-full" aria-label="Escuchar">
                      <Volume2 className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Example */}
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      <BookOpen className="w-4 h-4" />
                      <span>Ejemplo</span>
                    </div>
                    <p className="text-foreground italic">&quot;{entry.example}&quot;</p>
                    <p className="text-sm text-muted-foreground mt-1">{entry.exampleTranslation}</p>
                  </div>
                </div>
              )}
            </Card>
          )
        })}
      </div>

      {filteredEntries.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No se encontraron resultados</p>
        </div>
      )}
    </div>
  )
}
