import { useState } from "react"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"

const WORDS = [
  { word: "Apple", translation: "Яблоко", example: "I eat an apple every day." },
  { word: "House", translation: "Дом", example: "This is my house." },
  { word: "Friend", translation: "Друг", example: "She is my best friend." },
  { word: "School", translation: "Школа", example: "I go to school every morning." },
  { word: "Beautiful", translation: "Красивый", example: "The sunset is beautiful." },
  { word: "Journey", translation: "Путешествие", example: "The journey took three days." },
]

export function MiniAppCards() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [known, setKnown] = useState<number[]>([])

  const current = WORDS[currentIndex]

  const handleNext = (isKnown: boolean) => {
    if (isKnown) setKnown((prev) => [...prev, currentIndex])
    setFlipped(false)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % WORDS.length)
    }, 150)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-4xl font-black mb-2 border-b-[3px] border-black pb-2">Карточки слов</h2>
      <p className="text-gray-600 font-medium mb-8">
        Карточка {currentIndex + 1} из {WORDS.length} · Выучено: {known.length}
      </p>

      {/* Card */}
      <div
        onClick={() => setFlipped(!flipped)}
        className="bg-white border-[3px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-12 text-center cursor-pointer hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all mb-6 min-h-[240px] flex flex-col items-center justify-center"
      >
        {!flipped ? (
          <>
            <p className="text-5xl font-black mb-4">{current.word}</p>
            <p className="text-gray-400 font-medium">нажми, чтобы увидеть перевод</p>
          </>
        ) : (
          <>
            <p className="text-5xl font-black mb-4 text-[#4F46E5]">{current.translation}</p>
            <p className="text-gray-600 italic text-lg">"{current.example}"</p>
          </>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <Button
          onClick={() => handleNext(false)}
          className="flex-1 h-14 bg-white text-black border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all font-black text-lg gap-2"
        >
          <Icon name="X" size={20} />
          Не знаю
        </Button>
        <Button
          onClick={() => handleNext(true)}
          className="flex-1 h-14 bg-[#4F46E5] text-white border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all font-black text-lg gap-2"
        >
          <Icon name="Check" size={20} />
          Знаю!
        </Button>
      </div>

      {/* Progress bar */}
      <div className="mt-8">
        <div className="flex justify-between text-sm font-bold mb-2">
          <span>Прогресс</span>
          <span>{Math.round((known.length / WORDS.length) * 100)}%</span>
        </div>
        <div className="h-4 bg-gray-100 border-[3px] border-black">
          <div
            className="h-full bg-[#4F46E5] transition-all"
            style={{ width: `${(known.length / WORDS.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
}
