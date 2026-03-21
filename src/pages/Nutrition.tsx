import { motion } from "framer-motion"
import Icon from "@/components/ui/icon"

const recipes = [
  { title: "Овсянка с бананом и мёдом", kcal: 380, time: "10 мин", tags: ["завтрак", "быстро"] },
  { title: "Куриная грудка с гречкой", kcal: 420, time: "30 мин", tags: ["обед", "белок"] },
  { title: "Яичница с овощами", kcal: 290, time: "10 мин", tags: ["завтрак", "белок"] },
  { title: "Творог с ягодами", kcal: 220, time: "5 мин", tags: ["перекус", "быстро"] },
  { title: "Рис с тунцом и огурцом", kcal: 350, time: "20 мин", tags: ["обед", "белок"] },
  { title: "Smoothie с бананом и шпинатом", kcal: 180, time: "5 мин", tags: ["завтрак", "быстро"] },
]

const checklist = [
  "Куриная грудка / индейка",
  "Яйца",
  "Творог / греческий йогурт",
  "Гречка / рис / овсянка",
  "Свежие овощи (огурец, помидор, морковь)",
  "Фрукты (банан, яблоко, апельсин)",
  "Орехи (миндаль, грецкие)",
  "Тунец в собственном соку",
]

export default function Nutrition() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <a href="/" className="flex items-center gap-2 text-neutral-500 hover:text-[#FF6B35] transition-colors mb-8 text-sm">
          <Icon name="ArrowLeft" size={16} />
          На главную
        </a>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF6B35] to-[#FF8C5A] flex items-center justify-center">
              <Icon name="Salad" size={20} className="text-white" />
            </div>
            <span className="text-[#FF6B35] font-semibold text-sm uppercase tracking-widest">Питание</span>
          </div>
          <h1 className="text-5xl font-black mb-4">Ешь умно</h1>
          <p className="text-neutral-400 text-lg max-w-xl mb-12">Простые рецепты без заморочек. Основы КБЖУ и чек-лист продуктов для старта.</p>
        </motion.div>

        <div className="grid grid-cols-3 gap-4 mb-12">
          {[["Белки", "строят мышцы", "Meat"], ["Жиры", "дают энергию", "Droplets"], ["Углеводы", "заряжают мозг", "Zap"]].map(([name, desc, icon], i) => (
            <motion.div key={name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 + 0.3 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
              <Icon name={icon} fallback="Circle" size={24} className="text-[#FF6B35] mx-auto mb-2" />
              <div className="font-bold text-white">{name}</div>
              <div className="text-neutral-500 text-xs mt-1">{desc}</div>
            </motion.div>
          ))}
        </div>

        <h2 className="text-2xl font-bold mb-6">Простые рецепты</h2>
        <div className="grid gap-4 mb-12">
          {recipes.map((r, i) => (
            <motion.div key={r.title} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 + 0.4 }}
              className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl p-4 hover:border-[#FF6B35]/40 transition-all">
              <div>
                <div className="font-semibold text-white">{r.title}</div>
                <div className="flex gap-2 mt-1">
                  {r.tags.map(t => (
                    <span key={t} className="text-xs bg-white/10 px-2 py-0.5 rounded-full text-neutral-400">{t}</span>
                  ))}
                </div>
              </div>
              <div className="text-right">
                <div className="text-[#FF6B35] font-bold">{r.kcal} ккал</div>
                <div className="text-neutral-500 text-xs">{r.time}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <h2 className="text-2xl font-bold mb-6">Чек-лист продуктов</h2>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <p className="text-neutral-400 text-sm mb-4">Эти продукты — основа рациона. Держи в холодильнике всегда:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {checklist.map((item, i) => (
              <motion.div key={item} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 + 0.6 }}
                className="flex items-center gap-3">
                <div className="w-5 h-5 rounded border-2 border-[#FF6B35] flex-shrink-0 flex items-center justify-center">
                  <Icon name="Check" size={12} className="text-[#FF6B35]" />
                </div>
                <span className="text-sm text-neutral-300">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
