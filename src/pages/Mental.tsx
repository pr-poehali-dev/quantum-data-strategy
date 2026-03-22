import { motion } from "framer-motion"
import Icon from "@/components/ui/icon"
import { useState, useEffect, useRef } from "react"
import BrandLogo from "@/components/ui/brand-logo"

const sleepTips = [
  "Ложись и вставай в одно время каждый день",
  "Убирай телефон за 30 минут до сна",
  "Держи комнату прохладной (18–20°C)",
  "Не употребляй кофеин после 15:00",
]

const stressTips = [
  "Запиши тревогу на бумагу — она теряет силу",
  "5 минут прогулки снижают кортизол на 20%",
  "Поговори с другом или близким",
  "Переключись на физическую активность",
]

const breathingExercises = [
  { name: "4-7-8", desc: "Вдох 4 сек → задержка 7 сек → выдох 8 сек", icon: "Wind", inhale: 4, hold: 7, exhale: 8 },
  { name: "Квадрат", desc: "Вдох 4 → задержка 4 → выдох 4 → задержка 4", icon: "Square", inhale: 4, hold: 4, exhale: 4 },
  { name: "Боевое дыхание", desc: "Вдох 4 → выдох 4 — применяют морские котики", icon: "Shield", inhale: 4, hold: 0, exhale: 4 },
]

function RelaxTimer() {
  const [duration, setDuration] = useState(5)
  const [running, setRunning] = useState(false)
  const [remaining, setRemaining] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const start = () => {
    setRemaining(duration * 60)
    setRunning(true)
  }

  const stop = () => {
    setRunning(false)
    setRemaining(0)
    if (intervalRef.current) clearInterval(intervalRef.current)
  }

  useEffect(() => {
    if (running && remaining > 0) {
      intervalRef.current = setInterval(() => setRemaining(r => r - 1), 1000)
    } else if (remaining === 0 && running) {
      setRunning(false)
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [running, remaining])

  const mm = String(Math.floor(remaining / 60)).padStart(2, "0")
  const ss = String(remaining % 60).padStart(2, "0")

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
      <div className="flex items-center gap-2 justify-center mb-4">
        <Icon name="Timer" size={18} className="text-[#8E44AD]" />
        <h2 className="font-bold text-white">Таймер релакса</h2>
      </div>
      {!running ? (
        <div>
          <p className="text-neutral-400 text-sm mb-4">Выбери время для медитации или дыхательной практики</p>
          <div className="flex gap-2 justify-center mb-4">
            {[3, 5, 10, 15].map(m => (
              <button key={m} onClick={() => setDuration(m)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${duration === m ? "bg-[#8E44AD] text-white" : "bg-white/5 text-neutral-400 hover:bg-white/10"}`}>
                {m} мин
              </button>
            ))}
          </div>
          <button onClick={start} className="bg-[#8E44AD] hover:bg-[#7d3c98] text-white font-bold px-8 py-3 rounded-xl transition-colors">
            Начать
          </button>
        </div>
      ) : (
        <div>
          <div className="text-6xl font-black text-[#8E44AD] my-6 font-mono">{mm}:{ss}</div>
          <p className="text-neutral-400 text-sm mb-4">Закрой глаза и дыши глубоко...</p>
          <button onClick={stop} className="text-neutral-500 hover:text-white text-sm underline transition-colors">
            Остановить
          </button>
        </div>
      )}
    </div>
  )
}

export default function Mental() {
  const [activeBreathing, setActiveBreathing] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <BrandLogo />
      <div className="max-w-4xl mx-auto px-6 py-12">
        <a href="/" className="flex items-center gap-2 text-neutral-500 hover:text-[#8E44AD] transition-colors mb-8 text-sm">
          <Icon name="ArrowLeft" size={16} />
          На главную
        </a>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8E44AD] to-[#9B59B6] flex items-center justify-center">
              <Icon name="Brain" size={20} className="text-white" />
            </div>
            <span className="text-[#9B59B6] font-semibold text-sm uppercase tracking-widest">Ментальное здоровье</span>
          </div>
          <h1 className="text-5xl font-black mb-4">Голова в порядке</h1>
          <p className="text-neutral-400 text-lg max-w-xl mb-10">Сон, стресс, дыхание — простые инструменты, которые реально работают.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Icon name="Moon" size={18} className="text-blue-400" />
              <h2 className="font-bold text-white">Сон</h2>
            </div>
            <ul className="space-y-3">
              {sleepTips.map((tip, i) => (
                <motion.li key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.1 + 0.3 }}
                  className="flex items-start gap-3 text-sm text-neutral-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                  {tip}
                </motion.li>
              ))}
            </ul>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Icon name="CloudLightning" size={18} className="text-yellow-400" />
              <h2 className="font-bold text-white">Стресс</h2>
            </div>
            <ul className="space-y-3">
              {stressTips.map((tip, i) => (
                <motion.li key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.1 + 0.3 }}
                  className="flex items-start gap-3 text-sm text-neutral-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2 flex-shrink-0" />
                  {tip}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-6">Дыхательные практики</h2>
        <div className="grid gap-4 mb-10">
          {breathingExercises.map((ex, i) => (
            <motion.div key={ex.name} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 + 0.4 }}
              className={`bg-white/5 border rounded-xl p-5 cursor-pointer transition-all ${activeBreathing === ex.name ? "border-[#8E44AD]" : "border-white/10 hover:border-[#8E44AD]/40"}`}
              onClick={() => setActiveBreathing(activeBreathing === ex.name ? null : ex.name)}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Icon name={ex.icon} fallback="Wind" size={20} className="text-[#8E44AD]" />
                  <div>
                    <div className="font-bold text-white">{ex.name}</div>
                    <div className="text-neutral-400 text-xs mt-0.5">{ex.desc}</div>
                  </div>
                </div>
                <Icon name={activeBreathing === ex.name ? "ChevronUp" : "ChevronDown"} size={16} className="text-neutral-500" />
              </div>
              {activeBreathing === ex.name && (
                <div className="mt-4 flex gap-3 flex-wrap">
                  <div className="bg-[#8E44AD]/20 rounded-lg px-4 py-2 text-center">
                    <div className="text-[#8E44AD] font-bold text-lg">{ex.inhale}</div>
                    <div className="text-neutral-400 text-xs">вдох</div>
                  </div>
                  {ex.hold > 0 && (
                    <div className="bg-white/5 rounded-lg px-4 py-2 text-center">
                      <div className="text-white font-bold text-lg">{ex.hold}</div>
                      <div className="text-neutral-400 text-xs">задержка</div>
                    </div>
                  )}
                  <div className="bg-white/5 rounded-lg px-4 py-2 text-center">
                    <div className="text-white font-bold text-lg">{ex.exhale}</div>
                    <div className="text-neutral-400 text-xs">выдох</div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <RelaxTimer />
      </div>
    </div>
  )
}