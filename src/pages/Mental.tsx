import { motion, AnimatePresence } from "framer-motion"
import Icon from "@/components/ui/icon"
import { useState, useEffect, useRef } from "react"
import BrandLogo from "@/components/ui/brand-logo"

const sleepTips = [
  "Ложись и вставай в одно время каждый день",
  "Убирай телефон за 30 минут до сна",
  "Держи комнату прохладной (18–20°C)",
  "Не употребляй кофеин после 15:00",
  "Используй кровать только для сна — не для учёбы",
  "Расслабляющий ритуал перед сном: чай, книга, душ",
]

const stressTips = [
  "Запиши тревогу на бумагу — она теряет силу",
  "5 минут прогулки снижают кортизол на 20%",
  "Поговори с другом или близким",
  "Переключись на физическую активность",
  "Метод 5-4-3-2-1: назови 5 вещей вокруг, 4 звука, 3 ощущения",
  "Установи «час без новостей» в течение дня",
]

const burnoutTips = [
  "Выгорание — сигнал, а не слабость",
  "Делай паузы каждые 90 минут работы",
  "Научись говорить «нет» необязательному",
  "Возвращай хобби, от которых получал удовольствие",
  "Разграничь рабочее и личное время — чётко",
  "Если ничего не радует 2+ недели — поговори со специалистом",
]

const breathingExercises = [
  {
    name: "4-7-8",
    desc: "Вдох 4 сек → задержка 7 сек → выдох 8 сек",
    benefit: "Снижает тревогу, помогает заснуть",
    icon: "Wind",
    inhale: 4,
    hold: 7,
    exhale: 8,
    color: "#8E44AD",
  },
  {
    name: "Квадратное дыхание",
    desc: "Вдох 4 → задержка 4 → выдох 4 → задержка 4",
    benefit: "Успокаивает и концентрирует внимание",
    icon: "Square",
    inhale: 4,
    hold: 4,
    exhale: 4,
    color: "#2C3E66",
  },
  {
    name: "Боевое дыхание",
    desc: "Вдох 4 → выдох 4 — применяют морские котики",
    benefit: "Быстро снижает стресс в острой ситуации",
    icon: "Shield",
    inhale: 4,
    hold: 0,
    exhale: 4,
    color: "#27AE60",
  },
  {
    name: "Диафрагмальное",
    desc: "Медленный глубокий вдох животом → долгий выдох",
    benefit: "Активирует парасимпатическую систему",
    icon: "Waves",
    inhale: 5,
    hold: 0,
    exhale: 7,
    color: "#E67E22",
  },
]

const meditations = [
  {
    title: "Сканирование тела",
    duration: "10 мин",
    level: "Новичок",
    desc: "Лягте удобно. Закройте глаза. Медленно переводите внимание от пальцев ног вверх — к голове. Замечайте ощущения без оценки.",
    icon: "ScanLine",
    color: "#8E44AD",
  },
  {
    title: "Наблюдение за дыханием",
    duration: "5 мин",
    level: "Новичок",
    desc: "Сядьте прямо. Наблюдайте за вдохом и выдохом. Когда мысли уходят в сторону — мягко возвращайте внимание к дыханию.",
    icon: "Eye",
    color: "#2C3E66",
  },
  {
    title: "Визуализация безопасного места",
    duration: "15 мин",
    level: "Средний",
    desc: "Представьте место, где вам спокойно: лес, море, комната. Детально прорисуйте образ — звуки, запахи, ощущения. Побудьте там.",
    icon: "Sunset",
    color: "#27AE60",
  },
  {
    title: "Благодарность",
    duration: "7 мин",
    level: "Любой",
    desc: "Запишите или мысленно назовите 3 вещи, за которые вы благодарны сегодня. Необязательно большие — подойдёт вкусный кофе или хорошая песня.",
    icon: "Heart",
    color: "#E74C3C",
  },
]

const stressTestQuestions = [
  { q: "Как часто ты чувствуешь себя нервным или тревожным?", },
  { q: "Сложно ли тебе расслабиться после напряжённого дня?", },
  { q: "Бывают ли трудности с концентрацией из-за мыслей в голове?", },
  { q: "Ощущаешь ли ты, что проблем слишком много и не справиться?", },
  { q: "Чувствуешь ли раздражительность или вспышки злости?", },
]

const stressAnswers = ["Почти никогда", "Иногда", "Часто", "Почти всегда"]

function BreathingAnimator({ exercise, onClose }: { exercise: typeof breathingExercises[0]; onClose: () => void }) {
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale" | "hold2">("inhale")
  const [count, setCount] = useState(exercise.inhale)
  const [cycles, setCycles] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const phases = [
    { key: "inhale", label: "Вдох", duration: exercise.inhale },
    ...(exercise.hold > 0 ? [{ key: "hold", label: "Задержка", duration: exercise.hold }] : []),
    { key: "exhale", label: "Выдох", duration: exercise.exhale },
    ...(exercise.name === "Квадратное дыхание" ? [{ key: "hold2", label: "Задержка", duration: 4 }] : []),
  ] as { key: typeof phase; label: string; duration: number }[]

  const phaseIdx = useRef(0)

  useEffect(() => {
    let c = phases[0].duration
    setCount(c)
    setPhase(phases[0].key)

    timerRef.current = setInterval(() => {
      c -= 1
      setCount(c)
      if (c <= 0) {
        phaseIdx.current = (phaseIdx.current + 1) % phases.length
        if (phaseIdx.current === 0) setCycles(prev => prev + 1)
        const next = phases[phaseIdx.current]
        setPhase(next.key)
        c = next.duration
        setCount(c)
      }
    }, 1000)

    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [])

  const scale = phase === "inhale" ? 1.4 : phase === "exhale" ? 0.7 : 1
  const label = phases.find(p => p.key === phase)?.label ?? ""

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      <div className="bg-[#111] border border-white/10 rounded-3xl p-8 max-w-sm w-full text-center">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-white font-bold text-lg">{exercise.name}</h3>
            <p className="text-neutral-400 text-sm">{cycles} циклов</p>
          </div>
          <button onClick={onClose} className="text-neutral-500 hover:text-white transition-colors">
            <Icon name="X" size={20} />
          </button>
        </div>

        <div className="relative flex items-center justify-center h-52 mb-6">
          <motion.div
            animate={{ scale }}
            transition={{ duration: phase === "inhale" ? exercise.inhale : phase === "exhale" ? exercise.exhale : 0.3, ease: "easeInOut" }}
            className="absolute w-32 h-32 rounded-full opacity-20"
            style={{ background: exercise.color }}
          />
          <motion.div
            animate={{ scale }}
            transition={{ duration: phase === "inhale" ? exercise.inhale : phase === "exhale" ? exercise.exhale : 0.3, ease: "easeInOut" }}
            className="absolute w-24 h-24 rounded-full opacity-30"
            style={{ background: exercise.color }}
          />
          <div className="relative z-10 flex flex-col items-center">
            <span className="text-5xl font-black text-white">{count}</span>
            <span className="text-sm mt-1 font-semibold" style={{ color: exercise.color }}>{label}</span>
          </div>
        </div>

        <p className="text-neutral-400 text-sm">{exercise.benefit}</p>
      </div>
    </div>
  )
}

function StressTest() {
  const [answers, setAnswers] = useState<number[]>(Array(stressTestQuestions.length).fill(-1))
  const [result, setResult] = useState<null | { level: string; desc: string; color: string }>(null)

  const allAnswered = answers.every(a => a >= 0)

  const calculate = () => {
    const score = answers.reduce((s, a) => s + a, 0)
    if (score <= 3) setResult({ level: "Низкий стресс", desc: "Отлично! Ты справляешься. Поддерживай текущий ритм и не забывай про профилактику.", color: "#27AE60" })
    else if (score <= 7) setResult({ level: "Умеренный стресс", desc: "Стресс есть, но управляемый. Попробуй дыхательные практики и больше отдыха.", color: "#F39C12" })
    else if (score <= 11) setResult({ level: "Высокий стресс", desc: "Нагрузка серьёзная. Обрати внимание на сон, физическую активность и паузы в течение дня.", color: "#E74C3C" })
    else setResult({ level: "Очень высокий стресс", desc: "Тело и ум перегружены. Поговори с близким или специалистом — это важно.", color: "#8E44AD" })
  }

  const reset = () => { setAnswers(Array(stressTestQuestions.length).fill(-1)); setResult(null) }

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
      <div className="flex items-center gap-2 mb-5">
        <Icon name="ClipboardList" size={18} className="text-[#F39C12]" />
        <h2 className="font-bold text-white">Тест на уровень стресса</h2>
      </div>
      {!result ? (
        <>
          <div className="space-y-5">
            {stressTestQuestions.map((item, qi) => (
              <div key={qi}>
                <p className="text-sm text-neutral-300 mb-2">{qi + 1}. {item.q}</p>
                <div className="flex flex-wrap gap-2">
                  {stressAnswers.map((ans, ai) => (
                    <button key={ai} onClick={() => { const a = [...answers]; a[qi] = ai; setAnswers(a) }}
                      className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${answers[qi] === ai ? "bg-[#F39C12] border-[#F39C12] text-white font-semibold" : "border-white/10 text-neutral-400 hover:border-[#F39C12]/40"}`}>
                      {ans}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <button disabled={!allAnswered} onClick={calculate}
            className="mt-6 w-full bg-[#F39C12] hover:bg-[#d68910] disabled:opacity-30 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-colors">
            Узнать результат
          </button>
        </>
      ) : (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center py-4">
          <div className="text-5xl font-black mb-2" style={{ color: result.color }}>{result.level}</div>
          <p className="text-neutral-300 text-sm max-w-sm mx-auto mb-6">{result.desc}</p>
          <button onClick={reset} className="text-neutral-500 hover:text-white text-sm underline transition-colors">Пройти снова</button>
        </motion.div>
      )}
    </div>
  )
}

function RelaxTimer() {
  const [duration, setDuration] = useState(5)
  const [running, setRunning] = useState(false)
  const [remaining, setRemaining] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const start = () => { setRemaining(duration * 60); setRunning(true) }
  const stop = () => { setRunning(false); setRemaining(0); if (intervalRef.current) clearInterval(intervalRef.current) }

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
  const progress = running ? ((duration * 60 - remaining) / (duration * 60)) * 100 : 0

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
            {[3, 5, 10, 15, 20].map(m => (
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
          <div className="text-6xl font-black text-[#8E44AD] my-4 font-mono">{mm}:{ss}</div>
          <div className="w-full bg-white/10 rounded-full h-1.5 mb-4">
            <motion.div className="h-1.5 rounded-full bg-[#8E44AD]" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-neutral-400 text-sm mb-4">Закрой глаза и дыши глубоко...</p>
          <button onClick={stop} className="text-neutral-500 hover:text-white text-sm underline transition-colors">Остановить</button>
        </div>
      )}
    </div>
  )
}

export default function Mental() {
  const [activeBreathing, setActiveBreathing] = useState<string | null>(null)
  const [animatingExercise, setAnimatingExercise] = useState<typeof breathingExercises[0] | null>(null)
  const [openMeditation, setOpenMeditation] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<"sleep" | "stress" | "burnout">("sleep")

  const tabData = {
    sleep: { tips: sleepTips, color: "blue-400", label: "Сон", icon: "Moon" },
    stress: { tips: stressTips, color: "yellow-400", label: "Стресс", icon: "CloudLightning" },
    burnout: { tips: burnoutTips, color: "red-400", label: "Выгорание", icon: "Flame" },
  }
  const current = tabData[activeTab]

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <BrandLogo />

      {animatingExercise && (
        <BreathingAnimator exercise={animatingExercise} onClose={() => setAnimatingExercise(null)} />
      )}

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

        {/* Тест на стресс */}
        <StressTest />

        {/* Советы по темам */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
          <div className="flex gap-2 mb-5 flex-wrap">
            {(Object.keys(tabData) as (keyof typeof tabData)[]).map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${activeTab === tab ? "bg-[#8E44AD] text-white" : "bg-white/5 text-neutral-400 hover:bg-white/10"}`}>
                <Icon name={tabData[tab].icon} fallback="Circle" size={14} />
                {tabData[tab].label}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.ul key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-3">
              {current.tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-neutral-300">
                  <div className={`w-1.5 h-1.5 rounded-full bg-${current.color} mt-2 flex-shrink-0`} />
                  {tip}
                </li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>

        {/* Дыхательные практики */}
        <h2 className="text-2xl font-bold mb-4">Дыхательные практики</h2>
        <div className="grid gap-4 mb-10">
          {breathingExercises.map((ex, i) => (
            <motion.div key={ex.name} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 + 0.2 }}
              className={`bg-white/5 border rounded-xl p-5 cursor-pointer transition-all ${activeBreathing === ex.name ? "border-[#8E44AD]" : "border-white/10 hover:border-[#8E44AD]/40"}`}
              onClick={() => setActiveBreathing(activeBreathing === ex.name ? null : ex.name)}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: ex.color + "33" }}>
                    <Icon name={ex.icon} fallback="Wind" size={18} style={{ color: ex.color }} />
                  </div>
                  <div>
                    <div className="font-bold text-white">{ex.name}</div>
                    <div className="text-neutral-400 text-xs mt-0.5">{ex.benefit}</div>
                  </div>
                </div>
                <Icon name={activeBreathing === ex.name ? "ChevronUp" : "ChevronDown"} size={16} className="text-neutral-500" />
              </div>
              <AnimatePresence>
                {activeBreathing === ex.name && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                    <div className="mt-4 flex gap-3 flex-wrap items-center">
                      <div className="rounded-lg px-4 py-2 text-center" style={{ background: ex.color + "22" }}>
                        <div className="font-bold text-lg" style={{ color: ex.color }}>{ex.inhale}с</div>
                        <div className="text-neutral-400 text-xs">вдох</div>
                      </div>
                      {ex.hold > 0 && (
                        <div className="bg-white/5 rounded-lg px-4 py-2 text-center">
                          <div className="text-white font-bold text-lg">{ex.hold}с</div>
                          <div className="text-neutral-400 text-xs">задержка</div>
                        </div>
                      )}
                      <div className="bg-white/5 rounded-lg px-4 py-2 text-center">
                        <div className="text-white font-bold text-lg">{ex.exhale}с</div>
                        <div className="text-neutral-400 text-xs">выдох</div>
                      </div>
                      <button onClick={(e) => { e.stopPropagation(); setAnimatingExercise(ex) }}
                        className="ml-auto flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all"
                        style={{ background: ex.color }}>
                        <Icon name="Play" size={14} />
                        Начать
                      </button>
                    </div>
                    <p className="text-neutral-500 text-xs mt-3">{ex.desc}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Медитации */}
        <h2 className="text-2xl font-bold mb-4">Медитации и практики</h2>
        <div className="grid md:grid-cols-2 gap-4 mb-10">
          {meditations.map((med, i) => (
            <motion.div key={med.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 + 0.2 }}
              className="bg-white/5 border border-white/10 rounded-xl p-5 cursor-pointer hover:border-[#8E44AD]/40 transition-all"
              onClick={() => setOpenMeditation(openMeditation === med.title ? null : med.title)}>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: med.color + "33" }}>
                  <Icon name={med.icon} fallback="Sparkles" size={18} style={{ color: med.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-white">{med.title}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-neutral-400">{med.duration}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: med.color + "22", color: med.color }}>{med.level}</span>
                  </div>
                  <AnimatePresence>
                    {openMeditation === med.title && (
                      <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                        className="text-neutral-400 text-sm mt-2 leading-relaxed overflow-hidden">
                        {med.desc}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
                <Icon name={openMeditation === med.title ? "ChevronUp" : "ChevronDown"} size={16} className="text-neutral-500 flex-shrink-0 mt-1" />
              </div>
            </motion.div>
          ))}
        </div>

        <RelaxTimer />
      </div>
    </div>
  )
}
