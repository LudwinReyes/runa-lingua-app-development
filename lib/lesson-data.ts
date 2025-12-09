export type ExerciseType = "match" | "translate" | "listen" | "order" | "fill" | "image"

export interface Exercise {
  id: number
  type: ExerciseType
  question: string
  options?: string[]
  correctAnswer: string | string[]
  hint?: string
  image?: string
}

export interface LessonContent {
  lessonId: number
  title: string
  description: string
  exercises: Exercise[]
}

// Estructura de unidades - SOLO QUECHUA
export interface Lesson {
  id: number
  title: string
  icon: string
  xp: number
}

export interface Unit {
  id: number
  title: string
  level: "Básico 1" | "Básico 2" | "Intermedio"
  lessons: Lesson[]
}

export const unitsData: Unit[] = [
  {
    id: 1,
    title: "Primeros pasos",
    level: "Básico 1",
    lessons: [
      { id: 1, title: "Saludos", icon: "👋", xp: 20 },
      { id: 2, title: "Presentaciones", icon: "🙋", xp: 25 },
      { id: 3, title: "Números 1-10", icon: "🔢", xp: 30 },
      { id: 4, title: "Colores", icon: "🎨", xp: 25 },
      { id: 5, title: "La familia", icon: "👨‍👩‍👧‍👦", xp: 30 },
    ],
  },
  {
    id: 2,
    title: "Vida cotidiana",
    level: "Básico 2",
    lessons: [
      { id: 6, title: "En el mercado", icon: "🏪", xp: 35 },
      { id: 7, title: "Comida", icon: "🍽️", xp: 30 },
      { id: 8, title: "Animales", icon: "🦙", xp: 35 },
      { id: 9, title: "Naturaleza", icon: "🏔️", xp: 30 },
      { id: 10, title: "Cuerpo humano", icon: "🫀", xp: 35 },
    ],
  },
  {
    id: 3,
    title: "Conversación",
    level: "Intermedio",
    lessons: [
      { id: 11, title: "Direcciones", icon: "🧭", xp: 40 },
      { id: 12, title: "El clima", icon: "🌦️", xp: 35 },
      { id: 13, title: "Verbos comunes", icon: "🏃", xp: 45 },
      { id: 14, title: "Tiempo y horas", icon: "⏰", xp: 40 },
      { id: 15, title: "Emociones", icon: "😊", xp: 40 },
    ],
  },
]

// Lecciones con contenido completo
export const lessonContents: Record<number, LessonContent> = {
  // BÁSICO 1
  1: {
    lessonId: 1,
    title: "Saludos",
    description: "Aprende los saludos básicos en Quechua",
    exercises: [
      {
        id: 1,
        type: "match",
        question: "¿Cómo se dice 'Hola' en Quechua?",
        options: ["Allin p'unchaw", "Tupananchikkama", "Imaynalla", "Añay"],
        correctAnswer: "Imaynalla",
      },
      {
        id: 2,
        type: "translate",
        question: "Traduce: 'Buenos días'",
        options: ["Allin p'unchaw", "Allin tuta", "Allin ch'isi", "Tupananchikkama"],
        correctAnswer: "Allin p'unchaw",
      },
      {
        id: 3,
        type: "match",
        question: "¿Qué significa 'Allin tuta'?",
        options: ["Buen día", "Buenas noches", "Buenas tardes", "Hola"],
        correctAnswer: "Buenas noches",
      },
      {
        id: 4,
        type: "order",
        question: "Ordena: '¿Cómo estás?'",
        options: ["kashanki", "imaynalla", "?"],
        correctAnswer: ["imaynalla", "kashanki", "?"],
      },
      {
        id: 5,
        type: "translate",
        question: "Traduce: 'Buenas tardes'",
        options: ["Allin p'unchaw", "Allin tuta", "Allin ch'isi", "Imaynalla"],
        correctAnswer: "Allin ch'isi",
      },
      {
        id: 6,
        type: "match",
        question: "¿Qué significa 'Añay'?",
        options: ["Hola", "Gracias", "Adiós", "Por favor"],
        correctAnswer: "Gracias",
      },
    ],
  },
  2: {
    lessonId: 2,
    title: "Presentaciones",
    description: "Aprende a presentarte en Quechua",
    exercises: [
      {
        id: 1,
        type: "match",
        question: "¿Cómo se dice 'Yo soy' en Quechua?",
        options: ["Ñuqa kani", "Qam kanki", "Pay kan", "Ñuqanchik"],
        correctAnswer: "Ñuqa kani",
      },
      {
        id: 2,
        type: "translate",
        question: "Traduce: 'Me llamo María'",
        options: ["María sutiy", "Ñuqa María", "María kani", "Sutiy María"],
        correctAnswer: "María sutiy",
      },
      {
        id: 3,
        type: "order",
        question: "Ordena: 'Mi nombre es Juan'",
        options: ["sutiy", "Juan"],
        correctAnswer: ["Juan", "sutiy"],
      },
      {
        id: 4,
        type: "match",
        question: "¿Qué significa 'Imaynalla kashanki'?",
        options: ["¿Cómo te llamas?", "¿Cómo estás?", "¿De dónde eres?", "¿Qué haces?"],
        correctAnswer: "¿Cómo estás?",
      },
      {
        id: 5,
        type: "translate",
        question: "Traduce: '¿Cómo te llamas?'",
        options: ["Imaynalla kashanki?", "Ima sutiyki?", "Maymantan kanki?", "Imataq ruranki?"],
        correctAnswer: "Ima sutiyki?",
      },
      {
        id: 6,
        type: "match",
        question: "¿Qué significa 'Allillanmi'?",
        options: ["Estoy mal", "Estoy bien", "No sé", "Gracias"],
        correctAnswer: "Estoy bien",
      },
    ],
  },
  3: {
    lessonId: 3,
    title: "Números 1-10",
    description: "Aprende a contar del 1 al 10",
    exercises: [
      {
        id: 1,
        type: "match",
        question: "¿Cómo se dice 'uno' en Quechua?",
        options: ["Iskay", "Huk", "Kimsa", "Tawa"],
        correctAnswer: "Huk",
      },
      {
        id: 2,
        type: "translate",
        question: "Traduce: 'tres'",
        options: ["Iskay", "Kimsa", "Tawa", "Pichqa"],
        correctAnswer: "Kimsa",
      },
      {
        id: 3,
        type: "match",
        question: "¿Qué número es 'pichqa'?",
        options: ["4", "5", "6", "7"],
        correctAnswer: "5",
      },
      {
        id: 4,
        type: "order",
        question: "Ordena los números del 1 al 3:",
        options: ["kimsa", "huk", "iskay"],
        correctAnswer: ["huk", "iskay", "kimsa"],
      },
      {
        id: 5,
        type: "translate",
        question: "Traduce: 'diez'",
        options: ["Pusaq", "Isqun", "Chunka", "Qanchis"],
        correctAnswer: "Chunka",
      },
      {
        id: 6,
        type: "match",
        question: "¿Qué número es 'suqta'?",
        options: ["5", "6", "7", "8"],
        correctAnswer: "6",
      },
      {
        id: 7,
        type: "translate",
        question: "Traduce: 'ocho'",
        options: ["Suqta", "Qanchis", "Pusaq", "Isqun"],
        correctAnswer: "Pusaq",
      },
    ],
  },
  4: {
    lessonId: 4,
    title: "Colores",
    description: "Aprende los colores en Quechua",
    exercises: [
      {
        id: 1,
        type: "match",
        question: "¿Cómo se dice 'rojo' en Quechua?",
        options: ["Q'illu", "Puka", "Yuraq", "Yana"],
        correctAnswer: "Puka",
      },
      {
        id: 2,
        type: "translate",
        question: "Traduce: 'azul'",
        options: ["Puka", "Q'illu", "Anqas", "Q'umir"],
        correctAnswer: "Anqas",
      },
      {
        id: 3,
        type: "match",
        question: "¿Qué color es 'q'illu'?",
        options: ["Rojo", "Amarillo", "Verde", "Blanco"],
        correctAnswer: "Amarillo",
      },
      {
        id: 4,
        type: "translate",
        question: "Traduce: 'negro'",
        options: ["Yuraq", "Yana", "Uqi", "Puka"],
        correctAnswer: "Yana",
      },
      {
        id: 5,
        type: "match",
        question: "¿Qué color es 'yuraq'?",
        options: ["Negro", "Gris", "Blanco", "Marrón"],
        correctAnswer: "Blanco",
      },
      {
        id: 6,
        type: "translate",
        question: "Traduce: 'verde'",
        options: ["Anqas", "Q'umir", "Uqi", "Puka"],
        correctAnswer: "Q'umir",
      },
    ],
  },
  5: {
    lessonId: 5,
    title: "La familia",
    description: "Aprende los miembros de la familia",
    exercises: [
      {
        id: 1,
        type: "match",
        question: "¿Cómo se dice 'mamá' en Quechua?",
        options: ["Tayta", "Mama", "Wawqi", "Pana"],
        correctAnswer: "Mama",
      },
      {
        id: 2,
        type: "translate",
        question: "Traduce: 'papá'",
        options: ["Mama", "Tayta", "Wawa", "Hatun mama"],
        correctAnswer: "Tayta",
      },
      {
        id: 3,
        type: "match",
        question: "¿Qué significa 'wawa'?",
        options: ["Abuelo", "Hijo/Bebé", "Hermano", "Tío"],
        correctAnswer: "Hijo/Bebé",
      },
      {
        id: 4,
        type: "translate",
        question: "Traduce: 'hermano' (de varón)",
        options: ["Pana", "Wawqi", "Turi", "Ñaña"],
        correctAnswer: "Wawqi",
      },
      {
        id: 5,
        type: "match",
        question: "¿Qué significa 'hatun mama'?",
        options: ["Mamá grande", "Abuela", "Tía", "Madrina"],
        correctAnswer: "Abuela",
      },
      {
        id: 6,
        type: "order",
        question: "Ordena: 'Mi mamá'",
        options: ["mama", "ñuqap"],
        correctAnswer: ["ñuqap", "mama"],
      },
    ],
  },
  // BÁSICO 2
  6: {
    lessonId: 6,
    title: "En el mercado",
    description: "Vocabulario para ir de compras",
    exercises: [
      {
        id: 1,
        type: "match",
        question: "¿Cómo se dice 'mercado' en Quechua?",
        options: ["Wasi", "Qhatu", "Llaqta", "Pampa"],
        correctAnswer: "Qhatu",
      },
      {
        id: 2,
        type: "translate",
        question: "Traduce: '¿Cuánto cuesta?'",
        options: ["Ima sutiyki?", "Hayk'aq?", "Hayk'ataq?", "Imataq kay?"],
        correctAnswer: "Hayk'ataq?",
      },
      {
        id: 3,
        type: "match",
        question: "¿Qué significa 'rantikuy'?",
        options: ["Vender", "Comprar", "Pagar", "Cambiar"],
        correctAnswer: "Comprar",
      },
      {
        id: 4,
        type: "translate",
        question: "Traduce: 'dinero'",
        options: ["Quri", "Qulqi", "Rumi", "Q'umir"],
        correctAnswer: "Qulqi",
      },
      {
        id: 5,
        type: "order",
        question: "Ordena: 'Quiero comprar'",
        options: ["munani", "rantikuyta"],
        correctAnswer: ["rantikuyta", "munani"],
      },
      {
        id: 6,
        type: "match",
        question: "¿Qué significa 'qatuy'?",
        options: ["Comprar", "Vender", "Regalar", "Guardar"],
        correctAnswer: "Vender",
      },
    ],
  },
  7: {
    lessonId: 7,
    title: "Comida",
    description: "Aprende nombres de alimentos",
    exercises: [
      {
        id: 1,
        type: "match",
        question: "¿Cómo se dice 'papa' en Quechua?",
        options: ["Sara", "Papa", "Kinuwa", "Uqa"],
        correctAnswer: "Papa",
      },
      {
        id: 2,
        type: "translate",
        question: "Traduce: 'maíz'",
        options: ["Papa", "Sara", "Kinuwa", "Tarwi"],
        correctAnswer: "Sara",
      },
      {
        id: 3,
        type: "match",
        question: "¿Qué es 'kinuwa'?",
        options: ["Arroz", "Trigo", "Quinua", "Cebada"],
        correctAnswer: "Quinua",
      },
      {
        id: 4,
        type: "translate",
        question: "Traduce: 'carne'",
        options: ["Yaku", "Aycha", "T'anta", "Yuyu"],
        correctAnswer: "Aycha",
      },
      {
        id: 5,
        type: "match",
        question: "¿Qué significa 'yaku'?",
        options: ["Comida", "Agua", "Sal", "Pan"],
        correctAnswer: "Agua",
      },
      {
        id: 6,
        type: "translate",
        question: "Traduce: 'pan'",
        options: ["Aycha", "T'anta", "Kachi", "Yuyu"],
        correctAnswer: "T'anta",
      },
      {
        id: 7,
        type: "order",
        question: "Ordena: 'Tengo hambre'",
        options: ["kani", "yarqasqa"],
        correctAnswer: ["yarqasqa", "kani"],
      },
    ],
  },
  8: {
    lessonId: 8,
    title: "Animales",
    description: "Aprende nombres de animales andinos",
    exercises: [
      {
        id: 1,
        type: "image",
        question: "¿Cómo se llama este animal en Quechua?",
        image: "/llama-animal-andean-cute-cartoon.jpg",
        options: ["Alpaka", "Llama", "Wik'uña", "Kuntur"],
        correctAnswer: "Llama",
      },
      {
        id: 2,
        type: "image",
        question: "¿Cómo se llama este animal en Quechua?",
        image: "/condor-bird-andean-flying-cartoon.jpg",
        options: ["Kuntur", "Puma", "Allqu", "Añas"],
        correctAnswer: "Kuntur",
      },
      {
        id: 3,
        type: "image",
        question: "¿Cómo se llama este animal en Quechua?",
        image: "/alpaca-fluffy-cute-cartoon-andean.jpg",
        options: ["Llama", "Wik'uña", "Alpaka", "Taruka"],
        correctAnswer: "Alpaka",
      },
      {
        id: 4,
        type: "image",
        question: "¿Cómo se llama este animal en Quechua?",
        image: "/guinea-pig-cuy-cute-cartoon.jpg",
        options: ["Ukucha", "Quwi", "Misi", "Allqu"],
        correctAnswer: "Quwi",
      },
      {
        id: 5,
        type: "image",
        question: "¿Cómo se llama este animal en Quechua?",
        image: "/puma-mountain-lion-cartoon-andean.jpg",
        options: ["Kuntur", "Atuq", "Puma", "Añas"],
        correctAnswer: "Puma",
      },
      {
        id: 6,
        type: "image",
        question: "¿Cómo se llama este animal en Quechua?",
        image: "/dog-friendly-cartoon-cute.jpg",
        options: ["Misi", "Quwi", "Allqu", "Ukucha"],
        correctAnswer: "Allqu",
      },
      {
        id: 7,
        type: "image",
        question: "¿Cómo se llama este animal en Quechua?",
        image: "/cat-cute-cartoon-friendly.jpg",
        options: ["Allqu", "Misi", "Quwi", "Atuq"],
        correctAnswer: "Misi",
      },
      {
        id: 8,
        type: "match",
        question: "¿Qué animal es 'atuq'?",
        options: ["Puma", "Cóndor", "Zorro", "Vicuña"],
        correctAnswer: "Zorro",
      },
    ],
  },
  9: {
    lessonId: 9,
    title: "Naturaleza",
    description: "Vocabulario sobre la naturaleza",
    exercises: [
      {
        id: 1,
        type: "match",
        question: "¿Cómo se dice 'montaña' en Quechua?",
        options: ["Mayu", "Urqu", "Qucha", "Sach'a"],
        correctAnswer: "Urqu",
      },
      {
        id: 2,
        type: "translate",
        question: "Traduce: 'río'",
        options: ["Urqu", "Mayu", "Qucha", "Wayra"],
        correctAnswer: "Mayu",
      },
      {
        id: 3,
        type: "match",
        question: "¿Qué significa 'qucha'?",
        options: ["Río", "Mar", "Lago/Laguna", "Lluvia"],
        correctAnswer: "Lago/Laguna",
      },
      {
        id: 4,
        type: "translate",
        question: "Traduce: 'sol'",
        options: ["Killa", "Inti", "Ch'aska", "Nina"],
        correctAnswer: "Inti",
      },
      {
        id: 5,
        type: "match",
        question: "¿Qué es 'killa'?",
        options: ["Sol", "Luna", "Estrella", "Nube"],
        correctAnswer: "Luna",
      },
      {
        id: 6,
        type: "translate",
        question: "Traduce: 'tierra'",
        options: ["Yaku", "Pacha", "Wayra", "Nina"],
        correctAnswer: "Pacha",
      },
      {
        id: 7,
        type: "order",
        question: "Ordena: 'La montaña grande'",
        options: ["urqu", "hatun"],
        correctAnswer: ["hatun", "urqu"],
      },
    ],
  },
  10: {
    lessonId: 10,
    title: "Cuerpo humano",
    description: "Partes del cuerpo",
    exercises: [
      {
        id: 1,
        type: "match",
        question: "¿Cómo se dice 'cabeza' en Quechua?",
        options: ["Maki", "Uma", "Chaki", "Sinqa"],
        correctAnswer: "Uma",
      },
      {
        id: 2,
        type: "translate",
        question: "Traduce: 'mano'",
        options: ["Uma", "Maki", "Chaki", "Ñawi"],
        correctAnswer: "Maki",
      },
      {
        id: 3,
        type: "match",
        question: "¿Qué parte del cuerpo es 'chaki'?",
        options: ["Mano", "Pie", "Cabeza", "Ojo"],
        correctAnswer: "Pie",
      },
      {
        id: 4,
        type: "translate",
        question: "Traduce: 'ojo'",
        options: ["Rinri", "Sinqa", "Ñawi", "Simi"],
        correctAnswer: "Ñawi",
      },
      {
        id: 5,
        type: "match",
        question: "¿Qué significa 'rinri'?",
        options: ["Nariz", "Boca", "Oreja", "Pelo"],
        correctAnswer: "Oreja",
      },
      {
        id: 6,
        type: "translate",
        question: "Traduce: 'corazón'",
        options: ["Sunqu", "Wiksa", "Uma", "Tullu"],
        correctAnswer: "Sunqu",
      },
    ],
  },
  // INTERMEDIO
  11: {
    lessonId: 11,
    title: "Direcciones",
    description: "Aprende a pedir y dar direcciones",
    exercises: [
      {
        id: 1,
        type: "match",
        question: "¿Cómo se dice 'derecha' en Quechua?",
        options: ["Lluq'i", "Paña", "Wichay", "Uray"],
        correctAnswer: "Paña",
      },
      {
        id: 2,
        type: "translate",
        question: "Traduce: 'izquierda'",
        options: ["Paña", "Lluq'i", "Ñawpaq", "Qhipa"],
        correctAnswer: "Lluq'i",
      },
      {
        id: 3,
        type: "match",
        question: "¿Qué significa 'wichay'?",
        options: ["Abajo", "Arriba", "Adelante", "Atrás"],
        correctAnswer: "Arriba",
      },
      {
        id: 4,
        type: "translate",
        question: "Traduce: '¿Dónde está?'",
        options: ["Imataq?", "Maypin?", "Pitaq?", "Hayk'aq?"],
        correctAnswer: "Maypin?",
      },
      {
        id: 5,
        type: "order",
        question: "Ordena: 'Ve a la derecha'",
        options: ["riy", "pañaman"],
        correctAnswer: ["pañaman", "riy"],
      },
      {
        id: 6,
        type: "match",
        question: "¿Qué significa 'karupi'?",
        options: ["Cerca", "Lejos", "Aquí", "Allí"],
        correctAnswer: "Lejos",
      },
    ],
  },
  12: {
    lessonId: 12,
    title: "El clima",
    description: "Clima y tiempo atmosférico",
    exercises: [
      {
        id: 1,
        type: "match",
        question: "¿Cómo se dice 'lluvia' en Quechua?",
        options: ["Rit'i", "Para", "Wayra", "Qasa"],
        correctAnswer: "Para",
      },
      {
        id: 2,
        type: "translate",
        question: "Traduce: 'nieve'",
        options: ["Para", "Rit'i", "Chiri", "Ruphay"],
        correctAnswer: "Rit'i",
      },
      {
        id: 3,
        type: "match",
        question: "¿Qué significa 'wayra'?",
        options: ["Sol", "Lluvia", "Viento", "Nube"],
        correctAnswer: "Viento",
      },
      {
        id: 4,
        type: "translate",
        question: "Traduce: 'hace frío'",
        options: ["Ruphayku", "Chiriyku", "Paranku", "Wayraku"],
        correctAnswer: "Chiriyku",
      },
      {
        id: 5,
        type: "match",
        question: "¿Qué es 'phuyu'?",
        options: ["Nieve", "Nube", "Niebla", "Rayo"],
        correctAnswer: "Nube",
      },
      {
        id: 6,
        type: "order",
        question: "Ordena: 'Está lloviendo'",
        options: ["parashan"],
        correctAnswer: ["parashan"],
      },
    ],
  },
  13: {
    lessonId: 13,
    title: "Verbos comunes",
    description: "Acciones cotidianas",
    exercises: [
      {
        id: 1,
        type: "match",
        question: "¿Cómo se dice 'comer' en Quechua?",
        options: ["Upyay", "Mikhuy", "Puñuy", "Rimay"],
        correctAnswer: "Mikhuy",
      },
      {
        id: 2,
        type: "translate",
        question: "Traduce: 'beber'",
        options: ["Mikhuy", "Upyay", "Puñuy", "Puriy"],
        correctAnswer: "Upyay",
      },
      {
        id: 3,
        type: "match",
        question: "¿Qué significa 'puñuy'?",
        options: ["Comer", "Caminar", "Dormir", "Trabajar"],
        correctAnswer: "Dormir",
      },
      {
        id: 4,
        type: "translate",
        question: "Traduce: 'hablar'",
        options: ["Uyariy", "Rimay", "Qhaway", "Ruray"],
        correctAnswer: "Rimay",
      },
      {
        id: 5,
        type: "match",
        question: "¿Qué verbo es 'puriy'?",
        options: ["Correr", "Caminar", "Saltar", "Nadar"],
        correctAnswer: "Caminar",
      },
      {
        id: 6,
        type: "order",
        question: "Ordena: 'Yo como'",
        options: ["mikhuni", "ñuqa"],
        correctAnswer: ["ñuqa", "mikhuni"],
      },
      {
        id: 7,
        type: "translate",
        question: "Traduce: 'trabajar'",
        options: ["Pukllay", "Llamk'ay", "Tusuy", "Takiy"],
        correctAnswer: "Llamk'ay",
      },
    ],
  },
  14: {
    lessonId: 14,
    title: "Tiempo y horas",
    description: "Expresar tiempo y horarios",
    exercises: [
      {
        id: 1,
        type: "match",
        question: "¿Cómo se dice 'hoy' en Quechua?",
        options: ["Qayna", "Kunan", "Paqarin", "Mincha"],
        correctAnswer: "Kunan",
      },
      {
        id: 2,
        type: "translate",
        question: "Traduce: 'ayer'",
        options: ["Kunan", "Qayna", "Paqarin", "Wata"],
        correctAnswer: "Qayna",
      },
      {
        id: 3,
        type: "match",
        question: "¿Qué significa 'paqarin'?",
        options: ["Ayer", "Hoy", "Mañana", "Semana"],
        correctAnswer: "Mañana",
      },
      {
        id: 4,
        type: "translate",
        question: "Traduce: 'ahora'",
        options: ["Qayna", "Kunanqa", "Qhipa", "Ñawpaq"],
        correctAnswer: "Kunanqa",
      },
      {
        id: 5,
        type: "match",
        question: "¿Qué es 'wata'?",
        options: ["Día", "Mes", "Año", "Hora"],
        correctAnswer: "Año",
      },
      {
        id: 6,
        type: "translate",
        question: "Traduce: 'día'",
        options: ["Tuta", "P'unchaw", "Killa", "Wata"],
        correctAnswer: "P'unchaw",
      },
    ],
  },
  15: {
    lessonId: 15,
    title: "Emociones",
    description: "Expresar sentimientos",
    exercises: [
      {
        id: 1,
        type: "match",
        question: "¿Cómo se dice 'feliz' en Quechua?",
        options: ["Llakisqa", "Kusi", "Phiña", "Mancharisqa"],
        correctAnswer: "Kusi",
      },
      {
        id: 2,
        type: "translate",
        question: "Traduce: 'triste'",
        options: ["Kusi", "Llakisqa", "Phiñasqa", "Sayk'usqa"],
        correctAnswer: "Llakisqa",
      },
      {
        id: 3,
        type: "match",
        question: "¿Qué significa 'phiñasqa'?",
        options: ["Feliz", "Triste", "Enojado", "Cansado"],
        correctAnswer: "Enojado",
      },
      {
        id: 4,
        type: "translate",
        question: "Traduce: 'tengo miedo'",
        options: ["Kusisqa kani", "Manchakuni", "Llakikuni", "Sayk'usqa kani"],
        correctAnswer: "Manchakuni",
      },
      {
        id: 5,
        type: "match",
        question: "¿Qué significa 'munakuy'?",
        options: ["Odiar", "Amar", "Temer", "Llorar"],
        correctAnswer: "Amar",
      },
      {
        id: 6,
        type: "order",
        question: "Ordena: 'Estoy feliz'",
        options: ["kani", "kusisqa"],
        correctAnswer: ["kusisqa", "kani"],
      },
    ],
  },
}
