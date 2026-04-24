import { useEffect } from "react"
import { useUIStore } from "@/lib/ui-store"
import { OrbSlot } from "./OrbSlot"
import { MiniAppCards } from "./MiniAppCards"
import { MiniAppQuiz } from "./MiniAppQuiz"
import { MiniAppProgress } from "./MiniAppProgress"
import { MiniAppDictionary } from "./MiniAppDictionary"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"

type AppType = "cards" | "quiz" | "progress" | "dictionary"

const APP_COMPONENTS: Record<AppType, React.ComponentType> = {
  cards: MiniAppCards,
  quiz: MiniAppQuiz,
  progress: MiniAppProgress,
  dictionary: MiniAppDictionary,
}

const APP_ICONS: Record<AppType, string> = {
  cards: "BookOpen",
  quiz: "Brain",
  progress: "TrendingUp",
  dictionary: "BookMarked",
}

const APP_LABELS: Record<AppType, string> = {
  cards: "Карточки",
  quiz: "Тест",
  progress: "Прогресс",
  dictionary: "Словарь",
}

export function OSOverlay() {
  const { osOpen, activeApp, closeOS, setActiveApp } = useUIStore()

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && osOpen) {
        closeOS()
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [osOpen, closeOS])

  if (!osOpen) return null

  const ActiveComponent = activeApp ? APP_COMPONENTS[activeApp as AppType] : null

  return (
    <div className="fixed inset-0 z-50 bg-[#FAFAFA] overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b-[3px] border-black bg-white">
        <div className="flex items-center gap-4">
          <OrbSlot size="sm" />
          <h1 className="text-2xl font-black">WORDLY</h1>
          <span className="text-sm font-bold bg-[#4F46E5] text-white px-2 py-1 border-[2px] border-black">
            Изучай языки
          </span>
        </div>

        <Button
          onClick={closeOS}
          className="w-10 h-10 p-0 bg-[#4F46E5] text-white border-[3px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all focus:ring-4 focus:ring-[#4F46E5]"
          aria-label="Закрыть"
        >
          <Icon name="X" size={16} />
        </Button>
      </header>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Sidebar */}
        <nav className="w-64 bg-white border-r-[3px] border-black p-4">
          <div className="space-y-2">
            {(Object.keys(APP_COMPONENTS) as AppType[]).map((key) => {
              const isActive = activeApp === key

              return (
                <Button
                  key={key}
                  onClick={() => setActiveApp(key)}
                  className={`w-full justify-start gap-3 h-12 border-[3px] border-black font-bold text-left transition-all focus:ring-4 focus:ring-[#4F46E5] ${
                    isActive
                      ? "bg-[#4F46E5] text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                      : "bg-white text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px]"
                  }`}
                >
                  <Icon name={APP_ICONS[key]} size={20} />
                  {APP_LABELS[key]}
                </Button>
              )
            })}
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-auto">
          {ActiveComponent ? (
            <ActiveComponent />
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="text-8xl mb-6">🌍</div>
                <h2 className="text-4xl font-black mb-4">Добро пожаловать в WORDLY</h2>
                <p className="text-xl text-gray-600">Выбери раздел в боковом меню, чтобы начать</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
