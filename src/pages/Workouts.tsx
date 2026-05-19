import { motion, AnimatePresence } from "framer-motion"
import Icon from "@/components/ui/icon"
import { useState, useEffect, useRef } from "react"
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
  timerSeconds?: number
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
    timerSeconds: 30,
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

const weekPrograms = [
  {
    name: "Старт",
    desc: "Для тех, кто только начинает. Плавный вход без перегрузки.",
    color: "#27AE60",
    icon: "Sprout",
    level: "Новичок",
    days: [
      { day: "Пн", exercises: ["Отжимания", "Приседания", "Планка"] },
      { day: "Вт", exercises: ["Отдых / прогулка"] },
      { day: "Ср", exercises: ["Приседания", "Планка", "Отжимания"] },
      { day: "Чт", exercises: ["Отдых / прогулка"] },
      { day: "Пт", exercises: ["Отжимания", "Приседания", "Планка"] },
      { day: "Сб", exercises: ["Лёгкая прогулка 30 мин"] },
      { day: "Вс", exercises: ["Отдых"] },
    ],
  },
  {
    name: "Кардио",
    desc: "Упор на сжигание калорий и выносливость. Средний уровень.",
    color: "#FF6B35",
    icon: "Heart",
    level: "Средний",
    days: [
      { day: "Пн", exercises: ["Берпи", "Выпады", "Приседания"] },
      { day: "Вт", exercises: ["Отдых / йога"] },
      { day: "Ср", exercises: ["Берпи", "Планка", "Отжимания"] },
      { day: "Чт", exercises: ["Бег или велосипед 30 мин"] },
      { day: "Пт", exercises: ["Берпи", "Выпады", "Берпи"] },
      { day: "Сб", exercises: ["Подтягивания", "Отжимания"] },
      { day: "Вс", exercises: ["Отдых"] },
    ],
  },
  {
    name: "Сила",
    desc: "Акцент на силовые упражнения. Для продвинутых.",
    color: "#E74C3C",
    icon: "Dumbbell",
    level: "Продвинутый",
    days: [
      { day: "Пн", exercises: ["Взрывные отжимания", "Подтягивания", "Пистолет"] },
      { day: "Вт", exercises: ["Отдых / растяжка"] },
      { day: "Ср", exercises: ["Пистолет", "Берпи", "Планка"] },
      { day: "Чт", exercises: ["Взрывные отжимания", "Выпады"] },
      { day: "Пт", exercises: ["Подтягивания", "Пистолет", "Взрывные отжимания"] },
      { day: "Сб", exercises: ["Лёгкое кардио 20 мин"] },
      { day: "Вс", exercises: ["Отдых"] },
    ],
  },
]

function ExerciseTimer({ seconds, onClose }: { seconds: number; onClose: () => void }) {
  const [remaining, setRemaining] = useState(seconds)
  const [running, setRunning] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (running && remaining > 0) {
      intervalRef.current = setInterval(() => setRemaining(r => r - 1), 1000)
    } else if (remaining === 0) {
      setRunning(false)
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [running, remaining])

  const progress = ((seconds - remaining) / seconds) * 100

  return (
    <div className="mt-4 bg-[#FF6B35]/10 border border-[#FF6B35]/30 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-[#FF6B35] uppercase tracking-wider flex items-center gap-1">
          <Icon name="Timer" size={13} /> Таймер упражнения
        </span>
        <button onClick={onClose} className="text-neutral-500 hover:text-white transition-colors">
          <Icon name="X" size={14} />
        </button>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-4xl font-black font-mono text-white w-20 text-center">
          {String(Math.floor(remaining / 60)).padStart(2, "0")}:{String(remaining % 60).padStart(2, "0")}
        </div>
        <div className="flex-1">
          <div className="w-full bg-white/10 rounded-full h-2 mb-3">
            <motion.div className="h-2 rounded-full bg-[#FF6B35]" style={{ width: `${progress}%` }} />
          </div>
          <div className="flex gap-2">
            {!running && remaining === seconds && (
              <button onClick={() => setRunning(true)}
                className="flex items-center gap-1 px-3 py-1.5 bg-[#FF6B35] text-white text-xs font-bold rounded-lg hover:bg-[#FF8C5A] transition-colors">
                <Icon name="Play" size={12} /> Старт
              </button>
            )}
            {running && (
              <button onClick={() => setRunning(false)}
                className="flex items-center gap-1 px-3 py-1.5 bg-white/10 text-white text-xs font-bold rounded-lg hover:bg-white/20 transition-colors">
                <Icon name="Pause" size={12} /> Пауза
              </button>
            )}
            {!running && remaining < seconds && remaining > 0 && (
              <button onClick={() => setRunning(true)}
                className="flex items-center gap-1 px-3 py-1.5 bg-[#FF6B35] text-white text-xs font-bold rounded-lg hover:bg-[#FF8C5A] transition-colors">
                <Icon name="Play" size={12} /> Продолжить
              </button>
            )}
            {remaining < seconds && (
              <button onClick={() => { setRemaining(seconds); setRunning(false) }}
                className="flex items-center gap-1 px-3 py-1.5 bg-white/5 text-neutral-400 text-xs rounded-lg hover:bg-white/10 transition-colors">
                <Icon name="RotateCcw" size={12} /> Сброс
              </button>
            )}
            {remaining === 0 && (
              <span className="text-[#27AE60] text-xs font-bold flex items-center gap-1">
                <Icon name="CheckCircle" size={13} /> Готово!
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function SetCounter({ totalSets }: { totalSets: number }) {
  const [done, setDone] = useState(0)
  const [resting, setResting] = useState(false)
  const [restLeft, setRestLeft] = useState(0)
  const restRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const startRest = (sec: number) => {
    setResting(true)
    setRestLeft(sec)
    restRef.current = setInterval(() => {
      setRestLeft(r => {
        if (r <= 1) {
          clearInterval(restRef.current!)
          setResting(false)
          return 0
        }
        return r - 1
      })
    }, 1000)
  }

  const handleDone = () => {
    if (done < totalSets) {
      setDone(d => d + 1)
      if (done + 1 < totalSets) startRest(60)
    }
  }

  const reset = () => {
    setDone(0)
    setResting(false)
    setRestLeft(0)
    if (restRef.current) clearInterval(restRef.current)
  }

  return (
    <div className="bg-[#2C3E66]/20 border border-[#2C3E66]/40 rounded-xl p-4 mt-4">
      <div className="flex items-center gap-2 mb-3">
        <Icon name="RotateCcw" size={14} className="text-[#3D5A99]" />
        <span className="text-xs font-semibold text-[#3D5A99] uppercase tracking-wider">Счётчик подходов</span>
      </div>
      <div className="flex gap-2 mb-3">
        {Array.from({ length: totalSets }).map((_, i) => (
          <div key={i} className={`flex-1 h-2 rounded-full transition-all ${i < done ? "bg-[#27AE60]" : "bg-white/10"}`} />
        ))}
      </div>
      <div className="flex items-center justify-between">
        <span className="text-white font-bold">{done} / {totalSets} подходов</span>
        <div className="flex gap-2">
          {done > 0 && (
            <button onClick={reset} className="text-neutral-500 text-xs hover:text-white transition-colors flex items-center gap-1">
              <Icon name="RotateCcw" size={12} /> Сброс
            </button>
          )}
          {done < totalSets && !resting && (
            <button onClick={handleDone}
              className="px-3 py-1.5 bg-[#27AE60] hover:bg-[#219a52] text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1">
              <Icon name="Check" size={12} /> Выполнено
            </button>
          )}
          {resting && (
            <span className="text-[#FF6B35] text-xs font-bold flex items-center gap-1">
              <Icon name="Clock" size={12} /> Отдых {restLeft}с
            </span>
          )}
          {done === totalSets && (
            <span className="text-[#27AE60] text-xs font-bold flex items-center gap-1">
              <Icon name="Trophy" size={13} /> Тренировка завершена!
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Workouts() {
  const [activeLevel, setActiveLevel] = useState("Все")
  const [selected, setSelected] = useState<Exercise | null>(null)
  const [showTimer, setShowTimer] = useState(false)
  const [activeProgram, setActiveProgram] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<"exercises" | "programs">("exercises")

  const filtered = activeLevel === "Все" ? exercises : exercises.filter(e => e.level === activeLevel)

  const getSetsCount = (ex: Exercise) => {
    const match = ex.sets.match(/^(\d+)\s*подхода/)
    return match ? parseInt(match[1]) : 3
  }

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
          <p className="text-neutral-400 text-lg max-w-xl mb-8">Упражнения для дома, улицы и общаги. Без инвентаря — только ты и желание.</p>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          <button onClick={() => setActiveTab("exercises")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${activeTab === "exercises" ? "bg-[#FF6B35] text-white" : "bg-white/5 text-neutral-400 hover:bg-white/10"}`}>
            <Icon name="Dumbbell" size={15} /> Упражнения
          </button>
          <button onClick={() => setActiveTab("programs")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${activeTab === "programs" ? "bg-[#FF6B35] text-white" : "bg-white/5 text-neutral-400 hover:bg-white/10"}`}>
            <Icon name="CalendarDays" size={15} /> Программы на неделю
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "exercises" ? (
            <motion.div key="exercises" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              {/* Level filter */}
              <div className="flex gap-2 mb-6 flex-wrap">
                {levels.map(level => (
                  <button key={level} onClick={() => setActiveLevel(level)}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${activeLevel === level ? "bg-[#2C3E66] text-white" : "bg-white/5 text-neutral-400 hover:bg-white/10"}`}>
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
                    className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl p-5 hover:border-[#FF6B35]/60 hover:bg-white/[0.08] transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 text-xl">
                        {ex.emoji}
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
            </motion.div>
          ) : (
            <motion.div key="programs" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div className="grid gap-4">
                {weekPrograms.map((prog, i) => (
                  <motion.div key={prog.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                    className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                    <div className="p-5 cursor-pointer flex items-center justify-between"
                      onClick={() => setActiveProgram(activeProgram === prog.name ? null : prog.name)}>
                      <div className="flex items-center gap-4">
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: prog.color + "33" }}>
                          <Icon name={prog.icon} fallback="Dumbbell" size={22} style={{ color: prog.color }} />
                        </div>
                        <div>
                          <div className="font-black text-white text-lg">{prog.name}</div>
                          <div className="text-neutral-400 text-sm">{prog.desc}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs px-2 py-1 rounded-full font-semibold hidden sm:block"
                          style={{ background: levelColors[prog.level] + "22", color: levelColors[prog.level] }}>
                          {prog.level}
                        </span>
                        <Icon name={activeProgram === prog.name ? "ChevronUp" : "ChevronDown"} size={18} className="text-neutral-500" />
                      </div>
                    </div>
                    <AnimatePresence>
                      {activeProgram === prog.name && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden border-t border-white/10">
                          <div className="p-5 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
                            {prog.days.map((day, di) => (
                              <div key={di} className="bg-white/5 rounded-xl p-3">
                                <div className="font-bold text-xs mb-2" style={{ color: prog.color }}>{day.day}</div>
                                <div className="space-y-1">
                                  {day.exercises.map((e, ei) => (
                                    <div key={ei} className="text-neutral-300 text-xs leading-snug">{e}</div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
            onClick={() => { setSelected(null); setShowTimer(false) }}
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
                  onClick={() => { setSelected(null); setShowTimer(false) }}
                  className="flex-shrink-0 w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                >
                  <Icon name="X" size={16} className="text-neutral-400" />
                </button>
              </div>

              <div className="px-6 py-5 space-y-5">
                {/* Muscle groups */}
                <div>
                  <h4 className="text-xs font-semibold text-[#FF6B35] uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Icon name="Dumbbell" size={13} /> Какие мышцы работают
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selected.muscleGroups.map(m => (
                      <span key={m} className="text-xs bg-white/[0.08] border border-white/10 px-3 py-1.5 rounded-full text-neutral-300">{m}</span>
                    ))}
                  </div>
                </div>

                {/* Steps */}
                <div>
                  <h4 className="text-xs font-semibold text-[#FF6B35] uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Icon name="ListOrdered" size={13} /> Техника выполнения
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

                {/* Sets info */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-start gap-3">
                  <Icon name="RotateCcw" size={16} className="text-[#FF6B35] flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-semibold text-[#FF6B35] uppercase tracking-wider mb-1">Подходы и повторения</div>
                    <div className="text-sm text-neutral-300">{selected.sets}</div>
                  </div>
                </div>

                {/* Set counter */}
                <SetCounter totalSets={getSetsCount(selected)} />

                {/* Timer (if timed exercise) */}
                {selected.timerSeconds && (
                  showTimer
                    ? <ExerciseTimer seconds={selected.timerSeconds} onClose={() => setShowTimer(false)} />
                    : <button onClick={() => setShowTimer(true)}
                        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-[#FF6B35]/40 text-[#FF6B35] text-sm font-semibold hover:bg-[#FF6B35]/10 transition-colors">
                        <Icon name="Timer" size={15} /> Запустить таймер
                      </button>
                )}

                {/* Safety */}
                <div>
                  <h4 className="text-xs font-semibold text-[#FF6B35] uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Icon name="ShieldCheck" size={13} /> Советы по безопасности
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
                  onClick={() => { setSelected(null); setShowTimer(false) }}
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
