import { motion } from "framer-motion"
import Icon from "@/components/ui/icon"
import { useState, useEffect } from "react"
import BrandLogo from "@/components/ui/brand-logo"

const tips = [
  { icon: "Droplets", text: "Выпей стакан холодной воды — тяга проходит за 3–5 минут" },
  { icon: "Wind", text: "Глубокий вдох на 4 счёта, задержка на 4, выдох на 8" },
  { icon: "Footprints", text: "Выйди на прогулку — физическая активность снижает тягу" },
  { icon: "Apple", text: "Сжуй морковку или яблоко — замещение оральной привычки" },
  { icon: "MessageCircle", text: "Напиши другу — поддержка снижает риск срыва на 40%" },
  { icon: "Music", text: "Включи любимую музыку и отвлекись на 10 минут" },
]

function plural(n: number, one: string, few: string, many: string) {
  if (n % 10 === 1 && n % 100 !== 11) return one
  if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) return few
  return many
}

export default function QuitSmoking() {
  const [lastDate, setLastDate] = useState("")
  const [cigarettesPerDay, setCigarettesPerDay] = useState(10)
  const [pricePerPack, setPricePerPack] = useState(220)
  const [stats, setStats] = useState<{ days: number; hours: number; saved: number; cigarettes: number } | null>(null)

  const savedKey = "impulse_quit_date"
  const cigKey = "impulse_cig_per_day"
  const priceKey = "impulse_price_per_pack"

  useEffect(() => {
    const saved = localStorage.getItem(savedKey)
    const cig = localStorage.getItem(cigKey)
    const price = localStorage.getItem(priceKey)
    if (saved) setLastDate(saved)
    if (cig) setCigarettesPerDay(Number(cig))
    if (price) setPricePerPack(Number(price))
  }, [])

  useEffect(() => {
    if (!lastDate) { setStats(null); return }
    const diff = Date.now() - new Date(lastDate).getTime()
    if (diff < 0) { setStats(null); return }
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)
    const saved = Math.round((days * cigarettesPerDay / 20) * pricePerPack)
    const cigarettes = days * cigarettesPerDay
    setStats({ days, hours, saved, cigarettes })
  }, [lastDate, cigarettesPerDay, pricePerPack])

  const handleStart = () => {
    localStorage.setItem(savedKey, lastDate)
    localStorage.setItem(cigKey, String(cigarettesPerDay))
    localStorage.setItem(priceKey, String(pricePerPack))
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <BrandLogo />
      <div className="max-w-4xl mx-auto px-6 py-12">
        <a href="/" className="flex items-center gap-2 text-neutral-500 hover:text-[#27AE60] transition-colors mb-8 text-sm">
          <Icon name="ArrowLeft" size={16} />
          На главную
        </a>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#27AE60] to-[#2ECC71] flex items-center justify-center">
              <Icon name="Ban" size={20} className="text-white" />
            </div>
            <span className="text-[#27AE60] font-semibold text-sm uppercase tracking-widest">Отказ от курения</span>
          </div>
          <h1 className="text-5xl font-black mb-4">Каждый день — победа</h1>
          <p className="text-neutral-400 text-lg max-w-xl mb-10">Трекер покажет сколько дней, сколько денег сэкономлено и сколько сигарет не выкурено.</p>
        </motion.div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
          <h2 className="font-bold text-lg mb-5">Запусти трекер</h2>
          <div className="grid gap-4">
            <div>
              <label className="text-neutral-400 text-sm mb-2 block">Дата последней сигареты</label>
              <input type="date" value={lastDate} onChange={e => setLastDate(e.target.value)}
                max={new Date().toISOString().split("T")[0]}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#27AE60] outline-none transition-colors" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-neutral-400 text-sm mb-2 block">Сигарет в день</label>
                <input type="number" value={cigarettesPerDay} onChange={e => setCigarettesPerDay(Number(e.target.value))} min={1} max={60}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#27AE60] outline-none transition-colors" />
              </div>
              <div>
                <label className="text-neutral-400 text-sm mb-2 block">Цена пачки (₽)</label>
                <input type="number" value={pricePerPack} onChange={e => setPricePerPack(Number(e.target.value))} min={50}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#27AE60] outline-none transition-colors" />
              </div>
            </div>
            <button onClick={handleStart}
              className="w-full bg-[#27AE60] hover:bg-[#219a52] text-white font-bold py-3 rounded-xl transition-colors">
              Сохранить
            </button>
          </div>
        </div>

        {stats && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
            {[
              { value: stats.days, label: plural(stats.days, "день", "дня", "дней"), icon: "Calendar", color: "#27AE60" },
              { value: stats.hours, label: "часов", icon: "Clock", color: "#3498DB" },
              { value: `${stats.saved}₽`, label: "сэкономлено", icon: "Wallet", color: "#FF6B35" },
              { value: stats.cigarettes, label: plural(stats.cigarettes, "сигарета", "сигареты", "сигарет") + " не выкурено", icon: "Ban", color: "#E74C3C" },
            ].map(s => (
              <div key={s.label} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                <Icon name={s.icon} fallback="Circle" size={20} className="mx-auto mb-2" style={{ color: s.color }} />
                <div className="text-2xl font-black" style={{ color: s.color }}>{s.value}</div>
                <div className="text-neutral-500 text-xs mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        )}

        <h2 className="text-2xl font-bold mb-6">Советы при тяге</h2>
        <div className="grid gap-3">
          {tips.map((tip, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 + 0.4 }}
              className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="w-9 h-9 rounded-lg bg-[#27AE60]/20 flex items-center justify-center flex-shrink-0">
                <Icon name={tip.icon} fallback="Circle" size={18} className="text-[#27AE60]" />
              </div>
              <p className="text-neutral-300 text-sm leading-relaxed">{tip.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}