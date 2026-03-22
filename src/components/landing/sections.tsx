import { Badge } from "@/components/ui/badge"
import Icon from "@/components/ui/icon"
import { useEffect, useState } from "react"

const StatCard = ({ value, label }: { value: string; label: string }) => (
  <div className="flex flex-col items-center bg-white/5 border border-white/10 rounded-2xl px-6 py-4 min-w-[120px]">
    <span className="text-3xl font-black text-[#FF6B35]">{value}</span>
    <span className="text-sm text-neutral-400 mt-1 text-center">{label}</span>
  </div>
)

const SectionCard = ({
  icon,
  title,
  desc,
  link,
  color,
}: {
  icon: string
  title: string
  desc: string
  link: string
  color: string
}) => (
  <a
    href={link}
    className="group flex flex-col gap-3 bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[#FF6B35]/60 hover:bg-[#FF6B35]/5 transition-all cursor-pointer"
  >
    <div
      className="w-12 h-12 rounded-xl flex items-center justify-center"
      style={{ background: color }}
    >
      <Icon name={icon} fallback="Circle" size={24} className="text-white" />
    </div>
    <h3 className="text-white font-bold text-xl group-hover:text-[#FF6B35] transition-colors">
      {title}
    </h3>
    <p className="text-neutral-400 text-sm leading-relaxed">{desc}</p>
    <span className="text-[#FF6B35] text-sm font-semibold flex items-center gap-1 mt-auto">
      Перейти <Icon name="ArrowRight" size={14} />
    </span>
  </a>
)

const recipes = [
  { emoji: "🥣", title: "Овсянка с бананом", kcal: "380 ккал", time: "10 мин" },
  { emoji: "🍗", title: "Курица с гречкой", kcal: "420 ккал", time: "30 мин" },
  { emoji: "🍳", title: "Яичница с овощами", kcal: "290 ккал", time: "10 мин" },
  { emoji: "🫙", title: "Творог с ягодами", kcal: "220 ккал", time: "5 мин" },
  { emoji: "🐟", title: "Рис с тунцом", kcal: "350 ккал", time: "20 мин" },
]

const exerciseList = [
  { emoji: "💪", title: "Отжимания", muscle: "грудь, трицепс", reps: "3×10", level: "Новичок", color: "#27AE60" },
  { emoji: "🦵", title: "Приседания", muscle: "ноги, ягодицы", reps: "3×15", level: "Новичок", color: "#27AE60" },
  { emoji: "🧱", title: "Планка", muscle: "пресс, кор", reps: "3×30 сек", level: "Новичок", color: "#27AE60" },
  { emoji: "🚶", title: "Выпады", muscle: "ноги, баланс", reps: "3×12", level: "Средний", color: "#FF6B35" },
  { emoji: "⚡", title: "Берпи", muscle: "всё тело", reps: "3×8", level: "Средний", color: "#FF6B35" },
  { emoji: "🏋️", title: "Подтягивания", muscle: "спина, бицепс", reps: "3×6", level: "Средний", color: "#FF6B35" },
  { emoji: "🎯", title: "Пистолет", muscle: "ноги, баланс", reps: "3×5", level: "Продвинутый", color: "#E74C3C" },
  { emoji: "🔥", title: "Взрывные отжимания", muscle: "грудь, скорость", reps: "3×8", level: "Продвинутый", color: "#E74C3C" },
]

const smokingReviews = [
  { name: "Артём, 22 года", text: "Месяц без сигарет! Трекер очень помогает — видишь реальные цифры и уже жалко бросать 😄", avatar: "🧑" },
  { name: "Катя, 19 лет", text: "Начала ради эксперимента, а теперь не могу представить себя курящей. 47 дней — это моя победа.", avatar: "👩" },
  { name: "Дима, 24 года", text: "Сэкономил уже 4 800 рублей. Потрачу на новые кроссы. Лучшая мотивация!", avatar: "🧔" },
]

const allReviews = [
  { name: "Маша, 20 лет", text: "Сайт реально работает. Похудела на 3 кг за месяц, просто следуя рецептам из раздела питания.", avatar: "👩‍🦰", section: "Питание" },
  { name: "Никита, 23 года", text: "Делаю тренировки каждый день уже 2 месяца. Никакого зала — только пол и желание.", avatar: "🧑‍🦱", section: "Тренировки" },
  { name: "Лена, 18 лет", text: "Дыхательные практики из раздела ментального здоровья помогли справиться с экзаменами. Спасибо!", avatar: "👧", section: "Ментальное здоровье" },
  { name: "Артём, 22 года", text: "Бросил курить 2 месяца назад. Трекер — лучшее, что придумали. Каждый день — маленькая победа.", avatar: "🧑", section: "Отказ от курения" },
]

function QuitSmokingCounter() {
  const BASE = 1247
  const [count, setCount] = useState(BASE)

  useEffect(() => {
    const stored = localStorage.getItem("impulse_quit_count")
    if (stored) {
      setCount(Math.max(BASE, parseInt(stored)))
    }

    const interval = setInterval(() => {
      setCount(prev => {
        const next = prev + 1
        localStorage.setItem("impulse_quit_count", String(next))
        return next
      })
    }, 45000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="mt-8 space-y-6">
      <div className="inline-flex items-center gap-4 bg-white/5 border border-[#27AE60]/30 rounded-2xl px-6 py-4">
        <span className="text-4xl">🚭</span>
        <div>
          <div className="text-4xl font-black text-[#27AE60]">{count.toLocaleString("ru-RU")}</div>
          <div className="text-neutral-400 text-sm mt-0.5">человек бросили курить с Импульсом</div>
        </div>
      </div>

      <div className="space-y-3 max-w-xl">
        <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Отзывы</div>
        {smokingReviews.map((r, i) => (
          <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-start gap-3">
            <span className="text-2xl flex-shrink-0">{r.avatar}</span>
            <div>
              <div className="text-[#27AE60] font-semibold text-sm">{r.name}</div>
              <div className="text-neutral-300 text-sm mt-0.5 leading-relaxed">{r.text}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function FooterReviews() {
  return (
    <div className="mt-8 max-w-3xl w-full">
      <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-4">Что говорят пользователи</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {allReviews.map((r, i) => (
          <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-start gap-3">
            <span className="text-2xl flex-shrink-0">{r.avatar}</span>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-white font-semibold text-sm">{r.name}</span>
                <span className="text-xs bg-white/10 px-2 py-0.5 rounded-full text-neutral-400">{r.section}</span>
              </div>
              <div className="text-neutral-400 text-sm mt-1 leading-relaxed">{r.text}</div>
            </div>
          </div>
        ))}
      </div>
      <p className="text-neutral-600 text-xs mt-10 max-w-lg leading-relaxed">
        Материалы носят ознакомительный характер. Проконсультируйтесь со специалистом перед началом тренировок или изменением рациона.
      </p>
    </div>
  )
}

export const sections = [
  {
    id: "hero",
    subtitle: (
      <Badge
        variant="outline"
        className="text-[#FF6B35] border-[#FF6B35] text-sm px-4 py-1"
      >
        Молодёжный портал о здоровье
      </Badge>
    ),
    title: "Импульс. Дай себе старт.",
    content:
      "Питание, тренировки, ментальное здоровье и отказ от курения — всё, что нужно для крутой жизни. Для тех, кто от 16 до 25.",
    showButton: true,
    buttonText: "Начать путь",
    buttonLink: "#sections",
    customContent: (
      <div className="flex flex-wrap gap-4 mt-10">
        <StatCard value="50+" label="рецептов" />
        <StatCard value="30+" label="тренировок" />
        <StatCard value="1000+" label="бросили курить" />
        <StatCard value="4" label="раздела" />
      </div>
    ),
  },
  {
    id: "sections",
    title: "Выбери свой путь",
    content: "Четыре направления — один портал. Начни с любого.",
    customContent: (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 max-w-3xl">
        <SectionCard
          icon="Salad"
          title="Питание"
          desc="Простые рецепты, основы КБЖУ и чек-листы продуктов для здорового рациона."
          link="/nutrition"
          color="linear-gradient(135deg,#FF6B35,#FF8C5A)"
        />
        <SectionCard
          icon="Dumbbell"
          title="Тренировки"
          desc="Упражнения без инвентаря, уровни сложности и видео с правильной техникой."
          link="/workouts"
          color="linear-gradient(135deg,#2C3E66,#3D5A99)"
        />
        <SectionCard
          icon="Ban"
          title="Отказ от курения"
          desc="Трекер дней без сигарет, калькулятор экономии и советы по преодолению тяги."
          link="/quit-smoking"
          color="linear-gradient(135deg,#27AE60,#2ECC71)"
        />
        <SectionCard
          icon="Brain"
          title="Ментальное здоровье"
          desc="Сон, стресс, дыхательные практики и таймер для релакса."
          link="/mental"
          color="linear-gradient(135deg,#8E44AD,#9B59B6)"
        />
      </div>
    ),
  },
  {
    id: "nutrition",
    subtitle: (
      <div className="flex items-center gap-2 text-[#FF6B35]">
        <Icon name="Salad" size={20} />
        <span className="text-sm font-semibold uppercase tracking-widest">Питание</span>
      </div>
    ),
    title: "Ешь умно,\nчувствуй себя сильным.",
    content:
      "Не нужно сидеть на диетах. Простые рецепты, понятные КБЖУ и чек-листы продуктов — питание без стресса.",
    showButton: true,
    buttonText: "Смотреть все рецепты",
    buttonLink: "/nutrition",
    customContent: (
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-w-2xl">
        {recipes.map((r, i) => (
          <a key={i} href="/nutrition"
            className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3 hover:border-[#FF6B35]/50 hover:bg-white/8 transition-all group cursor-pointer">
            <span className="text-2xl flex-shrink-0">{r.emoji}</span>
            <div className="min-w-0">
              <div className="text-white text-sm font-semibold group-hover:text-[#FF6B35] transition-colors truncate">{r.title}</div>
              <div className="text-neutral-500 text-xs">{r.kcal} · {r.time}</div>
            </div>
          </a>
        ))}
      </div>
    ),
  },
  {
    id: "workouts",
    subtitle: (
      <div className="flex items-center gap-2 text-[#2C3E66]">
        <Icon name="Dumbbell" size={20} />
        <span className="text-sm font-semibold uppercase tracking-widest">Тренировки</span>
      </div>
    ),
    title: "Зал не нужен.\nНужно желание.",
    content:
      "Упражнения без инвентаря для дома, улицы и общаги. Выбирай уровень — от новичка до продвинутого.",
    showButton: true,
    buttonText: "Все упражнения",
    buttonLink: "/workouts",
    customContent: (
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-2xl">
        {exerciseList.map((ex, i) => (
          <a key={i} href="/workouts"
            className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-4 py-3 hover:border-[#FF6B35]/50 hover:bg-white/8 transition-all group cursor-pointer">
            <div className="flex items-center gap-3 min-w-0">
              <span className="text-xl flex-shrink-0">{ex.emoji}</span>
              <div className="min-w-0">
                <div className="text-white text-sm font-semibold group-hover:text-[#FF6B35] transition-colors truncate">{ex.title}</div>
                <div className="text-neutral-500 text-xs truncate">{ex.muscle}</div>
              </div>
            </div>
            <div className="flex-shrink-0 ml-2 text-right">
              <div className="text-white text-xs font-mono font-bold">{ex.reps}</div>
              <div className="text-xs mt-0.5" style={{ color: ex.color }}>{ex.level}</div>
            </div>
          </a>
        ))}
      </div>
    ),
  },
  {
    id: "quit-smoking",
    subtitle: (
      <div className="flex items-center gap-2 text-[#27AE60]">
        <Icon name="Ban" size={20} />
        <span className="text-sm font-semibold uppercase tracking-widest">Отказ от курения</span>
      </div>
    ),
    title: "Каждый день\nбез сигареты — победа.",
    content:
      "Трекер дней без курения, калькулятор сэкономленных денег и конкретные советы, когда тяга накрывает.",
    showButton: true,
    buttonText: "Запустить трекер",
    buttonLink: "/quit-smoking",
    customContent: <QuitSmokingCounter />,
  },
  {
    id: "mental",
    subtitle: (
      <div className="flex items-center gap-2 text-[#8E44AD]">
        <Icon name="Brain" size={20} />
        <span className="text-sm font-semibold uppercase tracking-widest">Ментальное здоровье</span>
      </div>
    ),
    title: "Голова в порядке —\nвсё остальное тоже.",
    content:
      "Сон, управление стрессом, дыхательные техники и таймер для медитации. Просто и доступно.",
    showButton: true,
    buttonText: "Начать практику",
    buttonLink: "/mental",
  },
  {
    id: "footer",
    title: "Импульс — это ты.",
    content:
      "Начни с малого. Один шаг, один день, одна привычка — и жизнь меняется.",
    showButton: true,
    buttonText: "Начать путь",
    buttonLink: "#hero",
    customContent: <FooterReviews />,
  },
]
