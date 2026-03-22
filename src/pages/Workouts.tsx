import { motion, AnimatePresence } from "framer-motion"
import Icon from "@/components/ui/icon"
import { useState } from "react"
import BrandLogo from "@/components/ui/brand-logo"

const levels = ["Все", "Новичок", "Средний", "Продвинутый"]

interface Exercise {
  title: string
  level: string
  muscle: string
  reps: string
  icon: string
  emoji: string
  muscleGroups: string[]
  steps: string[]
  sets: string
  safety: string[]
}

const exercises: Exercise[] = [
  {
    title: "Отжимания",
    level: "Новичок",
    muscle: "грудь, трицепс",
    reps: "3×10",
    icon: "PersonStanding",
    emoji: "💪",
    muscleGroups: ["Грудные мышцы", "Трицепс", "Передние дельты", "Кор"],
    steps: [
      "Прими упор лёжа: руки чуть шире плеч, тело — прямая линия от головы до пяток.",
      "Медленно опускай грудь к полу, сгибая локти под углом ~45° к телу.",
      "Не касаясь пола грудью, зафиксируйся на секунду в нижней точке.",
      "Мощно выжми себя вверх, полностью выпрямив руки.",
      "Не провисай в пояснице и не задирай таз — держи тело прямым всё время.",
    ],
    sets: "3 подхода × 10 повторений. Отдых 60 сек между подходами.",
    safety: [
      "Не запрокидывай голову — смотри чуть вперёд-вниз",
      "Если тяжело — начни с колен, постепенно переходи на полные отжимания",
      "Локти не должны «смотреть» строго в стороны — угол ~45°",
    ],
  },
  {
    title: "Приседания",
    level: "Новичок",
    muscle: "ноги, ягодицы",
    reps: "3×15",
    icon: "Activity",
    emoji: "🦵",
    muscleGroups: ["Квадрицепсы", "Ягодицы", "Бицепс бедра", "Икры"],
    steps: [
      "Встань прямо, ноги чуть шире плеч, носки слегка развёрнуты наружу.",
      "Руки вытяни вперёд или скрести на груди для баланса.",
      "Медленно опускайся вниз, отводя таз назад — как будто садишься на стул.",
      "Опустись до параллели бёдер с полом (или чуть ниже, если гибкость позволяет).",
      "Уверенно встань обратно, выпрямив ноги и напрягая ягодицы в верхней точке.",
    ],
    sets: "3 подхода × 15 повторений. Отдых 60 сек между подходами.",
    safety: [
      "Колени не должны «заваливаться» внутрь — следи, чтобы они шли в направлении носков",
      "Спина прямая на протяжении всего упражнения — не сутулься",
      "Пятки не отрывай от пола",
    ],
  },
  {
    title: "Планка",
    level: "Новичок",
    muscle: "пресс, кор",
    reps: "3×30 сек",
    icon: "Minus",
    emoji: "🧱",
    muscleGroups: ["Поперечная мышца живота", "Прямая мышца живота", "Ягодицы", "Спина"],
    steps: [
      "Прими положение как при отжимании, но опирайся не на ладони, а на предплечья.",
      "Локти ровно под плечами, предплечья параллельны друг другу.",
      "Тело — прямая линия: не поднимай таз и не опускай его.",
      "Напряги пресс, ягодицы и бёдра одновременно.",
      "Держи позицию отведённое время, дыши ровно.",
    ],
    sets: "3 подхода × 30 секунд. Отдых 45 сек между подходами.",
    safety: [
      "Не задерживай дыхание — дыши спокойно и равномерно",
      "Не опускай голову — шея должна быть продолжением позвоночника",
      "Если чувствуешь боль в пояснице — остановись и проверь положение",
    ],
  },
  {
    title: "Выпады",
    level: "Средний",
    muscle: "ноги, баланс",
    reps: "3×12",
    icon: "Footprints",
    emoji: "🚶",
    muscleGroups: ["Квадрицепсы", "Ягодицы", "Бицепс бедра", "Мышцы стабилизаторы"],
    steps: [
      "Встань прямо, ноги вместе, руки на поясе или вдоль тела.",
      "Сделай широкий шаг вперёд одной ногой.",
      "Опускай заднее колено вертикально вниз, почти до касания пола.",
      "Переднее бедро — параллельно полу, колено строго над голеностопом (не выходит за носок).",
      "Оттолкнись передней ногой и вернись в исходное положение. Смени ногу.",
    ],
    sets: "3 подхода × 12 повторений на каждую ногу. Отдых 60 сек.",
    safety: [
      "Не наклоняй корпус вперёд — держи спину вертикально",
      "Переднее колено не должно выходить за линию носка",
      "Начни без дополнительного веса, пока не освоишь технику",
    ],
  },
  {
    title: "Берпи",
    level: "Средний",
    muscle: "всё тело",
    reps: "3×8",
    icon: "Zap",
    emoji: "⚡",
    muscleGroups: ["Всё тело", "Сердечно-сосудистая система", "Кор", "Ноги, грудь, плечи"],
    steps: [
      "Встань прямо, затем резко присядь и поставь ладони на пол перед собой.",
      "Прыжком забрось ноги назад — окажись в позиции отжимания.",
      "Выполни одно отжимание (можно пропустить на начальном этапе).",
      "Прыжком подтяни ноги к рукам — вернись в присед.",
      "Взрывно выпрыгни вверх, вытянув руки над головой.",
    ],
    sets: "3 подхода × 8 повторений. Отдых 90 сек между подходами.",
    safety: [
      "Берпи — интенсивное упражнение: следи за пульсом",
      "Не делай, если есть проблемы с коленями или поясницей",
      "Лучше меньше повторений с правильной техникой, чем много — кое-как",
    ],
  },
  {
    title: "Подтягивания",
    level: "Средний",
    muscle: "спина, бицепс",
    reps: "3×6",
    icon: "ArrowUp",
    emoji: "🏋️",
    muscleGroups: ["Широчайшие мышцы спины", "Бицепс", "Задние дельты", "Ромбовидные мышцы"],
    steps: [
      "Возьмись за перекладину хватом чуть шире плеч, ладони от себя.",
      "Повисни на вытянутых руках, плечи слегка подняты к ушам.",
      "Потяни лопатки вниз и назад, затем тяни себя вверх до подбородка выше перекладины.",
      "Поднимайся за счёт спины и рук, не раскачиваясь.",
      "Медленно опускайся вниз на контроле — не бросай вес.",
    ],
    sets: "3 подхода × 6 повторений. Отдых 90 сек между подходами.",
    safety: [
      "Не раскачивайся — это читинг и риск травмы",
      "Если нет перекладины — заменить можно тягой резинки или горизонтальным подтягиванием под столом",
      "Не «вешайся» на суставы в нижней точке — держи лёгкое напряжение",
    ],
  },
  {
    title: "Пистолет",
    level: "Продвинутый",
    muscle: "ноги, баланс",
    reps: "3×5",
    icon: "Target",
    emoji: "🎯",
    muscleGroups: ["Квадрицепсы", "Ягодицы", "Мышцы баланса", "Кор"],
    steps: [
      "Встань на одну ногу, другую вытяни вперёд параллельно полу.",
      "Руки вытяни вперёд для баланса.",
      "Медленно приседай на опорной ноге, вытянутая нога остаётся горизонтально.",
      "Опустись как можно ниже — в идеале до касания ягодицей голени.",
      "Мощно встань обратно, сохраняя баланс.",
    ],
    sets: "3 подхода × 5 повторений на каждую ногу. Отдых 2 мин.",
    safety: [
      "Начни с неполной амплитудой — постепенно увеличивай глубину",
      "Можно держаться за дверной косяк на первых тренировках",
      "При болях в колене — немедленно прекрати",
    ],
  },
  {
    title: "Взрывные отжимания",
    level: "Продвинутый",
    muscle: "грудь, скорость",
    reps: "3×8",
    icon: "Flame",
    emoji: "🔥",
    muscleGroups: ["Грудные мышцы", "Трицепс", "Передние дельты", "Взрывная сила"],
    steps: [
      "Прими положение для отжиманий: руки чуть шире плеч, тело прямое.",
      "Медленно опустись вниз до почти касания пола грудью.",
      "Взрывным усилием оттолкнись так сильно, чтобы ладони оторвались от пола.",
      "В воздухе можно хлопнуть в ладоши или просто зафиксировать отрыв.",
      "Мягко приземлись на согнутые руки и сразу уходи в следующее повторение.",
    ],
    sets: "3 подхода × 8 повторений. Отдых 90 сек между подходами.",
    safety: [
      "Обязательно освой обычные отжимания перед взрывными",
      "Приземляйся мягко — жёсткое приземление перегружает суставы",
      "Выполняй на нескользкой поверхности",
    ],
  },
]

const levelColors: Record<string, string> = {
  "Новичок": "#27AE60",
  "Средний": "#FF6B35",
  "Продвинутый": "#E74C3C",
}

export default function Workouts() {
  const [activeLevel, setActiveLevel] = useState("Все")
  const [selected, setSelected] = useState<Exercise | null>(null)

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
            <motion.div
              key={ex.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
              onClick={() => setSelected(ex)}
              className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl p-5 hover:border-[#FF6B35]/60 hover:bg-white/8 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                  <Icon name={ex.icon} fallback="Activity" size={20} className="text-[#FF6B35]" />
                </div>
                <div>
                  <div className="font-bold text-white group-hover:text-[#FF6B35] transition-colors">{ex.title}</div>
                  <div className="text-neutral-500 text-xs mt-0.5">{ex.muscle}</div>
                </div>
              </div>
              <div className="text-right flex-shrink-0 ml-4 flex items-center gap-3">
                <div>
                  <div className="font-mono font-bold text-white text-sm">{ex.reps}</div>
                  <div className="text-xs mt-1 px-2 py-0.5 rounded-full inline-block"
                    style={{ background: levelColors[ex.level] + "22", color: levelColors[ex.level] }}>
                    {ex.level}
                  </div>
                </div>
                <Icon name="ChevronRight" size={18} className="text-neutral-600 group-hover:text-[#FF6B35] transition-colors" />
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
              className="bg-[#141414] border border-white/10 rounded-2xl w-full max-w-lg max-h-[88vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 bg-[#141414] border-b border-white/10 px-6 py-4 flex items-start justify-between gap-4 rounded-t-2xl">
                <div className="flex items-center gap-4">
                  <div className="text-4xl leading-none">{selected.emoji}</div>
                  <div>
                    <h3 className="text-xl font-black text-white leading-tight">{selected.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
                        style={{ background: levelColors[selected.level] + "22", color: levelColors[selected.level] }}>
                        {selected.level}
                      </span>
                      <span className="text-neutral-500 text-xs">{selected.reps}</span>
                    </div>
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
                {/* Muscle groups */}
                <div>
                  <h4 className="text-xs font-semibold text-[#FF6B35] uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Icon name="Dumbbell" size={13} />
                    Какие мышцы работают
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selected.muscleGroups.map(m => (
                      <span key={m} className="text-xs bg-white/8 border border-white/10 px-3 py-1.5 rounded-full text-neutral-300">{m}</span>
                    ))}
                  </div>
                </div>

                {/* Steps */}
                <div>
                  <h4 className="text-xs font-semibold text-[#FF6B35] uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Icon name="ListOrdered" size={13} />
                    Техника выполнения
                  </h4>
                  <ol className="space-y-3">
                    {selected.steps.map((step, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-neutral-300">
                        <span className="w-6 h-6 rounded-full bg-[#FF6B35]/15 border border-[#FF6B35]/30 flex-shrink-0 flex items-center justify-center text-[#FF6B35] font-bold text-xs mt-0.5">
                          {i + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Sets */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-start gap-3">
                  <Icon name="RotateCcw" size={16} className="text-[#FF6B35] flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-semibold text-[#FF6B35] uppercase tracking-wider mb-1">Подходы и повторения</div>
                    <div className="text-sm text-neutral-300">{selected.sets}</div>
                  </div>
                </div>

                {/* Safety */}
                <div>
                  <h4 className="text-xs font-semibold text-[#FF6B35] uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Icon name="ShieldCheck" size={13} />
                    Советы по безопасности
                  </h4>
                  <ul className="space-y-2">
                    {selected.safety.map((tip, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-neutral-300">
                        <Icon name="AlertCircle" size={14} className="text-yellow-500 flex-shrink-0 mt-0.5" />
                        {tip}
                      </li>
                    ))}
                  </ul>
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
