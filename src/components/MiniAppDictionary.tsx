import { useState } from "react"
import Icon from "@/components/ui/icon"

const ALL_WORDS = [
  { word: "Apple", translation: "Яблоко", category: "Еда", level: "A1" },
  { word: "House", translation: "Дом", category: "Дом", level: "A1" },
  { word: "Friend", translation: "Друг", category: "Люди", level: "A1" },
  { word: "School", translation: "Школа", category: "Учёба", level: "A1" },
  { word: "Beautiful", translation: "Красивый", category: "Прилагательные", level: "A2" },
  { word: "Journey", translation: "Путешествие", category: "Путешествия", level: "B1" },
  { word: "Knowledge", translation: "Знание", category: "Учёба", level: "B1" },
  { word: "Adventure", translation: "Приключение", category: "Путешествия", level: "B1" },
  { word: "Courage", translation: "Смелость", category: "Черты", level: "B2" },
  { word: "Accomplish", translation: "Достичь", category: "Глаголы", level: "B2" },
]

const LEVEL_COLORS: Record<string, string> = {
  A1: "bg-green-400",
  A2: "bg-yellow-400",
  B1: "bg-orange-400",
  B2: "bg-red-400",
}

export function MiniAppDictionary() {
  const [search, setSearch] = useState("")

  const filtered = ALL_WORDS.filter(
    (w) =>
      w.word.toLowerCase().includes(search.toLowerCase()) ||
      w.translation.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="max-w-3xl">
      <h2 className="text-4xl font-black mb-6 border-b-[3px] border-black pb-2">Словарь</h2>

      {/* Search */}
      <div className="relative mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Поиск слова или перевода..."
          className="w-full p-4 pl-12 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white text-black font-medium focus:outline-none focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:translate-x-[2px] focus:translate-y-[2px] transition-all"
        />
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          <Icon name="Search" size={20} />
        </div>
      </div>

      {/* Words table */}
      <div className="bg-white border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
        <div className="grid grid-cols-4 bg-black text-white p-3 font-black text-sm">
          <span>Слово</span>
          <span>Перевод</span>
          <span>Тема</span>
          <span>Уровень</span>
        </div>
        {filtered.map((w, i) => (
          <div
            key={i}
            className="grid grid-cols-4 p-4 border-b-[2px] border-black hover:bg-indigo-50 transition-colors"
          >
            <span className="font-black">{w.word}</span>
            <span className="font-medium text-[#4F46E5]">{w.translation}</span>
            <span className="text-gray-600 text-sm">{w.category}</span>
            <span>
              <span className={`${LEVEL_COLORS[w.level]} text-black px-2 py-0.5 border-[2px] border-black text-xs font-black`}>
                {w.level}
              </span>
            </span>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="p-8 text-center text-gray-500 font-medium">Слова не найдены</div>
        )}
      </div>

      <p className="mt-4 text-sm text-gray-500 font-medium">Всего слов: {ALL_WORDS.length} · Найдено: {filtered.length}</p>
    </div>
  )
}
