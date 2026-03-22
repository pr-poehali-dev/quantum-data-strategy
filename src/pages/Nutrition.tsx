import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Icon from "@/components/ui/icon"
import BrandLogo from "@/components/ui/brand-logo"

interface Recipe {
  title: string
  kcal: number
  time: string
  tags: string[]
  ingredients: string[]
  steps: string[]
}

const recipes: Recipe[] = [
  {
    title: "Овсянка с бананом и мёдом",
    kcal: 380,
    time: "10 мин",
    tags: ["завтрак", "быстро"],
    ingredients: [
      "Овсяные хлопья — 80 г",
      "Молоко или вода — 200 мл",
      "Банан — 1 шт.",
      "Мёд — 1 ч. л.",
      "Щепотка соли",
    ],
    steps: [
      "Залей овсяные хлопья молоком и поставь на средний огонь.",
      "Вари 5–7 минут, помешивая, до нужной густоты.",
      "Нарежь банан кружочками.",
      "Выложи кашу в тарелку, сверху положи банан и полей мёдом.",
    ],
  },
  {
    title: "Куриная грудка с гречкой",
    kcal: 420,
    time: "30 мин",
    tags: ["обед", "белок"],
    ingredients: [
      "Куриная грудка — 150 г",
      "Гречневая крупа — 80 г",
      "Оливковое масло — 1 ч. л.",
      "Соль, перец — по вкусу",
      "Чеснок — 1 зубчик",
    ],
    steps: [
      "Промой гречку и отвари в подсоленной воде 15–20 минут.",
      "Куриную грудку нарежь на кусочки, посоли и поперчи.",
      "Разогрей сковороду с маслом, обжарь чеснок 1 минуту.",
      "Добавь курицу и жарь на среднем огне 8–10 минут до готовности.",
      "Подавай курицу с гречкой.",
    ],
  },
  {
    title: "Яичница с овощами",
    kcal: 290,
    time: "10 мин",
    tags: ["завтрак", "белок"],
    ingredients: [
      "Яйца — 3 шт.",
      "Помидор — 1 шт.",
      "Болгарский перец — ½ шт.",
      "Оливковое масло — 1 ч. л.",
      "Соль, зелень — по вкусу",
    ],
    steps: [
      "Нарежь помидор и перец небольшими кубиками.",
      "Разогрей сковороду с маслом на среднем огне.",
      "Обжарь овощи 2–3 минуты.",
      "Разбей яйца прямо на овощи, посоли.",
      "Жарь ещё 3–4 минуты до готовности. Посыпь зеленью.",
    ],
  },
  {
    title: "Творог с ягодами",
    kcal: 220,
    time: "5 мин",
    tags: ["перекус", "быстро"],
    ingredients: [
      "Творог 5% — 200 г",
      "Свежие или замороженные ягоды — 80 г",
      "Мёд или сироп — 1 ч. л.",
    ],
    steps: [
      "Разморозь ягоды, если используешь замороженные.",
      "Выложи творог в тарелку.",
      "Сверху добавь ягоды и полей мёдом.",
    ],
  },
  {
    title: "Рис с тунцом и огурцом",
    kcal: 350,
    time: "20 мин",
    tags: ["обед", "белок"],
    ingredients: [
      "Рис — 80 г",
      "Тунец в собственном соку — 1 банка (185 г)",
      "Огурец — 1 шт.",
      "Лимонный сок — 1 ч. л.",
      "Соль, перец — по вкусу",
    ],
    steps: [
      "Отвари рис в подсоленной воде согласно инструкции (около 15 минут).",
      "Слей воду с тунца, разомни вилкой.",
      "Нарежь огурец тонкими кружочками.",
      "Смешай рис с тунцом, добавь лимонный сок, посоли и поперчи.",
      "Подавай с ломтиками огурца.",
    ],
  },
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
  const [selected, setSelected] = useState<Recipe | null>(null)

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <BrandLogo />
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

        <h2 className="text-2xl font-bold mb-2">Простые рецепты</h2>
        <p className="text-neutral-500 text-sm mb-6">Нажми на блюдо, чтобы открыть рецепт</p>
        <div className="grid gap-4 mb-12">
          {recipes.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 + 0.4 }}
              onClick={() => setSelected(r)}
              className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl p-4 hover:border-[#FF6B35]/60 hover:bg-white/8 transition-all cursor-pointer group"
            >
              <div>
                <div className="font-semibold text-white group-hover:text-[#FF6B35] transition-colors">{r.title}</div>
                <div className="flex gap-2 mt-1">
                  {r.tags.map(t => (
                    <span key={t} className="text-xs bg-white/10 px-2 py-0.5 rounded-full text-neutral-400">{t}</span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-[#FF6B35] font-bold">{r.kcal} ккал</div>
                  <div className="text-neutral-500 text-xs">{r.time}</div>
                </div>
                <Icon name="ChevronRight" size={18} className="text-neutral-600 group-hover:text-[#FF6B35] transition-colors" />
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

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="bg-[#141414] border border-white/10 rounded-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-[#141414] border-b border-white/10 px-6 py-4 flex items-start justify-between gap-4 rounded-t-2xl">
                <div>
                  <h3 className="text-xl font-bold text-white leading-tight">{selected.title}</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[#FF6B35] font-semibold text-sm">{selected.kcal} ккал</span>
                    <span className="text-neutral-500 text-sm flex items-center gap-1">
                      <Icon name="Clock" size={13} />
                      {selected.time}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="flex-shrink-0 w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                >
                  <Icon name="X" size={16} className="text-neutral-400" />
                </button>
              </div>

              <div className="px-6 py-5 space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-[#FF6B35] uppercase tracking-wider mb-3">Ингредиенты</h4>
                  <ul className="space-y-2">
                    {selected.ingredients.map((ing, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-neutral-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35] mt-1.5 flex-shrink-0" />
                        {ing}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-[#FF6B35] uppercase tracking-wider mb-3">Приготовление</h4>
                  <ol className="space-y-3">
                    {selected.steps.map((step, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-neutral-300">
                        <span className="w-6 h-6 rounded-full bg-[#FF6B35]/15 border border-[#FF6B35]/30 flex-shrink-0 flex items-center justify-center text-[#FF6B35] font-bold text-xs">
                          {i + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>

                <button
                  onClick={() => setSelected(null)}
                  className="w-full py-3 rounded-xl bg-[#FF6B35] hover:bg-[#FF8C5A] text-white font-semibold transition-colors"
                >
                  Закрыть
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
