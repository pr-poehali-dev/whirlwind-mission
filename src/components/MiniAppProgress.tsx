export function MiniAppProgress() {
  const stats = [
    { label: "Слов выучено", value: "24", icon: "✅", color: "bg-green-100" },
    { label: "Дней подряд", value: "7", icon: "🔥", color: "bg-orange-100" },
    { label: "Тестов пройдено", value: "12", icon: "🧠", color: "bg-purple-100" },
    { label: "Правильных ответов", value: "89%", icon: "🎯", color: "bg-blue-100" },
  ]

  const weekActivity = [
    { day: "Пн", words: 5 },
    { day: "Вт", words: 8 },
    { day: "Ср", words: 3 },
    { day: "Чт", words: 10 },
    { day: "Пт", words: 7 },
    { day: "Сб", words: 6 },
    { day: "Вс", words: 4 },
  ]

  const maxWords = Math.max(...weekActivity.map((d) => d.words))

  return (
    <div className="max-w-3xl">
      <h2 className="text-4xl font-black mb-6 border-b-[3px] border-black pb-2">Мой прогресс</h2>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {stats.map((stat, i) => (
          <div
            key={i}
            className={`${stat.color} p-6 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`}
          >
            <div className="text-4xl mb-2">{stat.icon}</div>
            <p className="text-4xl font-black">{stat.value}</p>
            <p className="text-gray-600 font-medium">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Weekly chart */}
      <div className="bg-white p-6 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <h3 className="text-2xl font-black mb-6">Активность за неделю</h3>
        <div className="flex items-end gap-3 h-32">
          {weekActivity.map((day, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <div
                className="w-full bg-[#4F46E5] border-[2px] border-black transition-all"
                style={{ height: `${(day.words / maxWords) * 100}%` }}
              />
              <span className="text-xs font-bold">{day.day}</span>
              <span className="text-xs text-gray-500">{day.words}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
