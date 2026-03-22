import { motion } from "framer-motion"
import Icon from "@/components/ui/icon"
import { useState } from "react"
import BrandLogo from "@/components/ui/brand-logo"

const levels = ["Все", "Новичок", "Средний", "Продвинутый"]

const exercises = [
  { title: "Отжимания", level: "Новичок", muscle: "грудь, трицепс", reps: "3×10", icon: "PersonStanding" },
  { title: "Приседания", level: "Новичок", muscle: "ноги, ягодицы", reps: "3×15", icon: "Activity" },
  { title: "Планка", level: "Новичок", muscle: "пресс, кор", reps: "3×30 сек", icon: "Minus" },
  { title: "Выпады", level: "Средний", muscle: "ноги, баланс", reps: "3×12", icon: "Footprints" },
  { title: "Берпи", level: "Средний", muscle: "всё тело", reps: "3×8", icon: "Zap" },
  { title: "Подтягивания", level: "Средний", muscle: "спина, бицепс", reps: "3×6", icon: "ArrowUp" },
  { title: "Пистолет", level: "Продвинутый", muscle: "ноги, баланс", reps: "3×5", icon: "Target" },
  { title: "Взрывные отжимания", level: "Продвинутый", muscle: "грудь, скорость", reps: "3×8", icon: "Flame" },
]

const levelColors: Record<string, string> = {
  "Новичок": "#27AE60",
  "Средний": "#FF6B35",
  "Продвинутый": "#E74C3C",
}

export default function Workouts() {
  const [activeLevel, setActiveLevel] = useState("Все")

  const filtered = activeLevel === "Все" ? exercises : exercises.filter(e => e.level === activeLevel)

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <BrandLogo />
      <div className="max-w-4xl mx-auto px-6 py-12">
        <a href="/" className="flex items-center gap-2 text-neutral-500 hover:text-[#2C3E66] transition-colors mb-8 text-sm">
          <Icon name="ArrowLeft" size={16} />
          На главную
        </a>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2C3E66] to-[#3D5A99] flex items-center justify-center">
              <Icon name="Dumbbell" size={20} className="text-white" />
            </div>
            <span className="text-[#3D5A99] font-semibold text-sm uppercase tracking-widest">Тренировки</span>
          </div>
          <h1 className="text-5xl font-black mb-4">Зал не нужен</h1>
          <p className="text-neutral-400 text-lg max-w-xl mb-10">Упражнения без инвентаря. Дома, на улице, в общаге — где угодно.</p>
        </motion.div>

        <div className="flex gap-2 mb-8 flex-wrap">
          {levels.map(level => (
            <button key={level} onClick={() => setActiveLevel(level)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${activeLevel === level ? "bg-[#FF6B35] text-white" : "bg-white/5 text-neutral-400 hover:bg-white/10"}`}>
              {level}
            </button>
          ))}
        </div>

        <div className="grid gap-4">
          {filtered.map((ex, i) => (
            <motion.div key={ex.title} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
              className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl p-5 hover:border-[#FF6B35]/40 transition-all">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                  <Icon name={ex.icon} fallback="Activity" size={20} className="text-[#FF6B35]" />
                </div>
                <div>
                  <div className="font-bold text-white">{ex.title}</div>
                  <div className="text-neutral-500 text-xs mt-0.5">{ex.muscle}</div>
                </div>
              </div>
              <div className="text-right flex-shrink-0 ml-4">
                <div className="font-mono font-bold text-white text-sm">{ex.reps}</div>
                <div className="text-xs mt-1 px-2 py-0.5 rounded-full inline-block"
                  style={{ background: levelColors[ex.level] + "22", color: levelColors[ex.level] }}>
                  {ex.level}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <Icon name="Video" size={16} className="text-[#FF6B35]" />
            <h2 className="font-bold text-white">Видео с техникой</h2>
          </div>
          <p className="text-neutral-400 text-sm">Видеоуроки с правильной техникой выполнения — скоро здесь. Следи за обновлениями!</p>
        </div>
      </div>
    </div>
  )
}