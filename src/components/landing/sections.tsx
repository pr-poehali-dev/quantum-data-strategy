import { Badge } from "@/components/ui/badge"
import Icon from "@/components/ui/icon"

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
        <span className="text-sm font-semibold uppercase tracking-widest">
          Питание
        </span>
      </div>
    ),
    title: "Ешь умно,\nчувствуй себя сильным.",
    content:
      "Не нужно сидеть на диетах. Простые рецепты, понятные КБЖУ и чек-листы продуктов — питание без стресса.",
    showButton: true,
    buttonText: "Смотреть рецепты",
    buttonLink: "/nutrition",
  },
  {
    id: "workouts",
    subtitle: (
      <div className="flex items-center gap-2 text-[#2C3E66]">
        <Icon name="Dumbbell" size={20} />
        <span className="text-sm font-semibold uppercase tracking-widest">
          Тренировки
        </span>
      </div>
    ),
    title: "Зал не нужен.\nНужно желание.",
    content:
      "Упражнения без инвентаря для дома, улицы и общаги. Выбирай уровень — от новичка до продвинутого.",
    showButton: true,
    buttonText: "Начать тренировку",
    buttonLink: "/workouts",
  },
  {
    id: "quit-smoking",
    subtitle: (
      <div className="flex items-center gap-2 text-[#27AE60]">
        <Icon name="Ban" size={20} />
        <span className="text-sm font-semibold uppercase tracking-widest">
          Отказ от курения
        </span>
      </div>
    ),
    title: "Каждый день\nбез сигареты — победа.",
    content:
      "Трекер дней без курения, калькулятор сэкономленных денег и конкретные советы, когда тяга накрывает.",
    showButton: true,
    buttonText: "Запустить трекер",
    buttonLink: "/quit-smoking",
  },
  {
    id: "mental",
    subtitle: (
      <div className="flex items-center gap-2 text-[#8E44AD]">
        <Icon name="Brain" size={20} />
        <span className="text-sm font-semibold uppercase tracking-widest">
          Ментальное здоровье
        </span>
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
    customContent: (
      <p className="text-neutral-600 text-xs mt-16 max-w-lg leading-relaxed">
        Материалы носят ознакомительный характер. Проконсультируйтесь со
        специалистом перед началом тренировок или изменением рациона.
      </p>
    ),
  },
]
