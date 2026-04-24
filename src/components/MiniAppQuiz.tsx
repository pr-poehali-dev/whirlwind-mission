import { useState } from "react"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"

const QUESTIONS = [
  { question: "Как переводится «Apple»?", options: ["Апельсин", "Яблоко", "Банан", "Груша"], correct: 1 },
  { question: "Как переводится «School»?", options: ["Дом", "Парк", "Школа", "Магазин"], correct: 2 },
  { question: "Как переводится «Beautiful»?", options: ["Большой", "Быстрый", "Красивый", "Умный"], correct: 2 },
  { question: "Как переводится «Friend»?", options: ["Враг", "Учитель", "Родитель", "Друг"], correct: 3 },
  { question: "Как переводится «Journey»?", options: ["Путешествие", "Отдых", "Работа", "Учёба"], correct: 0 },
]

export function MiniAppQuiz() {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const q = QUESTIONS[current]

  const handleAnswer = (idx: number) => {
    if (selected !== null) return
    setSelected(idx)
    if (idx === q.correct) setScore((s) => s + 1)

    setTimeout(() => {
      if (current + 1 >= QUESTIONS.length) {
        setFinished(true)
      } else {
        setCurrent((c) => c + 1)
        setSelected(null)
      }
    }, 1000)
  }

  const restart = () => {
    setCurrent(0)
    setSelected(null)
    setScore(0)
    setFinished(false)
  }

  if (finished) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-4xl font-black mb-6 border-b-[3px] border-black pb-2">Результат теста</h2>
        <div className="bg-white border-[3px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-12">
          <div className="text-8xl mb-4">{score >= 4 ? "🏆" : score >= 2 ? "👍" : "📚"}</div>
          <p className="text-5xl font-black mb-2">{score} / {QUESTIONS.length}</p>
          <p className="text-xl text-gray-600 mb-8">
            {score >= 4 ? "Отлично! Ты хорошо знаешь слова!" : score >= 2 ? "Неплохо, продолжай учить!" : "Нужно ещё поучить слова!"}
          </p>
          <Button
            onClick={restart}
            className="bg-[#4F46E5] text-white border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all font-black text-lg px-8 py-4 h-auto gap-2"
          >
            <Icon name="RefreshCw" size={20} />
            Пройти ещё раз
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-4xl font-black mb-2 border-b-[3px] border-black pb-2">Тест</h2>
      <p className="text-gray-600 font-medium mb-8">
        Вопрос {current + 1} из {QUESTIONS.length} · Правильных: {score}
      </p>

      <div className="bg-white border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-8 mb-6">
        <p className="text-2xl font-black">{q.question}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {q.options.map((option, idx) => {
          let style = "bg-white text-black"
          if (selected !== null) {
            if (idx === q.correct) style = "bg-green-500 text-white"
            else if (idx === selected) style = "bg-red-500 text-white"
          }

          return (
            <Button
              key={idx}
              onClick={() => handleAnswer(idx)}
              className={`h-16 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all font-bold text-lg ${style}`}
            >
              {option}
            </Button>
          )
        })}
      </div>
    </div>
  )
}
