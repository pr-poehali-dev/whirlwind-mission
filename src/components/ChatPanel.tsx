import type React from "react"
import { useState, useEffect, useRef } from "react"
import { useUIStore } from "@/lib/ui-store"
import { Button } from "@/components/ui/button"

const QUICK_CHIPS = ["Учить слова!", "Пройти тест", "Мой прогресс"]

const RESPONSES: Record<string, string> = {
  "Учить слова!": "Отлично! Открываю карточки со словами — листай и запоминай!",
  "Пройти тест": "Проверим, что ты уже выучил! Открываю тест.",
  "Мой прогресс": "Смотрим твою статистику — как ты учишься!",
}

const ACTION_RESPONSES: Record<string, { response: string; action: string }> = {
  "карточки": { response: "Открываю карточки слов!", action: "cards" },
  "учить": { response: "Отлично, учим слова!", action: "cards" },
  "тест": { response: "Открываю тест!", action: "quiz" },
  "проверь": { response: "Проверяю знания!", action: "quiz" },
  "прогресс": { response: "Вот твоя статистика!", action: "progress" },
  "словарь": { response: "Открываю словарь!", action: "dictionary" },
}

type AppType = "cards" | "quiz" | "progress" | "dictionary"

export function ChatPanel() {
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([])
  const [inputValue, setInputValue] = useState("")
  const { openOS } = useUIStore()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleChipClick = (chip: string) => {
    const response = RESPONSES[chip] || "Интересный вопрос! Дай подумать..."
    setMessages((prev) => [...prev, { text: chip, isUser: true }, { text: response, isUser: false }])
    const actionKey = Object.keys(ACTION_RESPONSES).find((key) => chip.toLowerCase().includes(key.toLowerCase()))
    if (actionKey) {
      setTimeout(() => openOS(ACTION_RESPONSES[actionKey].action as AppType), 800)
    }
  }

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    const userMessage = inputValue.trim()
    setInputValue("")

    // Check if it's an action command
    const lowerMessage = userMessage.toLowerCase()
    const actionMatch = Object.keys(ACTION_RESPONSES).find((key) => lowerMessage.includes(key.toLowerCase()))

    if (actionMatch) {
      const { response, action } = ACTION_RESPONSES[actionMatch]
      setMessages((prev) => [...prev, { text: userMessage, isUser: true }, { text: response, isUser: false }])

      setTimeout(() => {
        openOS(action as AppType)
      }, 1000)
    } else {
      // Default response for non-action messages
      const defaultResponse =
        "Попробуй написать «учить», «тест», «прогресс» или «словарь» — открою нужный раздел!"
      setMessages((prev) => [...prev, { text: userMessage, isUser: true }, { text: defaultResponse, isUser: false }])
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-6 space-y-3 h-32 overflow-y-auto scroll-smooth">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] p-3 border-[3px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
                msg.isUser ? "bg-[#4F46E5] text-white" : "bg-white text-black"
              }`}
            >
              <p className="text-sm font-medium leading-tight">{msg.text}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleInputSubmit} className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Напиши «учить», «тест» или «словарь»..."
            className="flex-1 p-3 border-[3px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] bg-white text-black font-medium text-sm focus:outline-none focus:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] focus:translate-x-[1px] focus:translate-y-[1px] transition-all"
          />
          <Button
            type="submit"
            className="bg-[#4F46E5] text-white border-[3px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all font-bold px-4"
          >
            Отправить
          </Button>
        </div>
      </form>

      {/* Quick Action Chips */}
      <div className="flex flex-wrap gap-2 justify-center">
        {QUICK_CHIPS.map((chip) => (
          <Button
            key={chip}
            onClick={() => handleChipClick(chip)}
            className="bg-white text-black border-[3px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all font-bold text-xs px-3 py-2 h-auto"
          >
            {chip}
          </Button>
        ))}
      </div>
    </div>
  )
}