import { useUIStore } from "@/lib/ui-store"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"

type AppType = "cards" | "quiz" | "progress" | "dictionary"

const DOCK_ITEMS: Array<{ id: AppType; label: string; icon: string }> = [
  { id: "cards", label: "Карточки", icon: "BookOpen" },
  { id: "quiz", label: "Тест", icon: "Brain" },
  { id: "progress", label: "Прогресс", icon: "TrendingUp" },
  { id: "dictionary", label: "Словарь", icon: "BookMarked" },
]

export function Dock() {
  const { openOS } = useUIStore()

  return (
    <div className="flex gap-3 p-4 bg-white border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      {DOCK_ITEMS.map(({ id, label, icon }) => (
        <Button
          key={id}
          onClick={() => openOS(id)}
          className="w-12 h-12 p-0 bg-[#4F46E5] text-white border-[3px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
          aria-label={label}
        >
          <Icon name={icon} size={20} />
        </Button>
      ))}
    </div>
  )
}
