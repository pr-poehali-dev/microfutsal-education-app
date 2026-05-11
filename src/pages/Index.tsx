import { useState } from "react";
import Icon from "@/components/ui/icon";

// ─── Картинки ────────────────────────────────────────────────────────────────
const IMG_KREMLIN  = "https://cdn.poehali.dev/projects/23a6f0fa-85b1-41ff-85d1-82ac28a5e96b/files/0bc1e01f-5f9e-4619-ba93-70418a49d9b3.jpg";
const IMG_KIDS     = "https://cdn.poehali.dev/projects/23a6f0fa-85b1-41ff-85d1-82ac28a5e96b/files/3bf866a0-045a-4ee9-b33c-3997bf44a459.jpg";
const IMG_COACH    = "https://cdn.poehali.dev/projects/23a6f0fa-85b1-41ff-85d1-82ac28a5e96b/files/ea3d5753-55bf-44f4-b022-00e84a4a0540.jpg";
const IMG_HERO     = "https://cdn.poehali.dev/projects/23a6f0fa-85b1-41ff-85d1-82ac28a5e96b/files/1c2fcf01-2ee7-42ec-a87d-44fae31519e8.jpg";
const IMG_TROPHY   = "https://cdn.poehali.dev/projects/23a6f0fa-85b1-41ff-85d1-82ac28a5e96b/files/ef302cf7-699e-4058-9f01-4f67fa25fa89.jpg";

// ─── Типы ─────────────────────────────────────────────────────────────────────
type Role   = "student" | "teacher" | "admin";
type Screen = "login" | "home" | "learn" | "train" | "tournaments" | "rating" | "profile" | "teacher-cabinet" | "rules" | "news";

// ─── Данные ───────────────────────────────────────────────────────────────────
const ACHIEVEMENTS = [
  { id:1, icon:"⚽", title:"Первый гол",      done:true  },
  { id:2, icon:"🎯", title:"Хет-трик",        done:true  },
  { id:3, icon:"🤝", title:"Честная игра",    done:true  },
  { id:4, icon:"🛡️", title:"Стена",           done:false },
  { id:5, icon:"👑", title:"Капитан",         done:false },
  { id:6, icon:"🌟", title:"Мастер обводки",  done:false },
];

const PLAYERS_RATING = [
  { rank:1, name:"Артём Волков",   school:"Школа №5",    goals:34, assists:18, stars:4.8 },
  { rank:2, name:"Денис Краснов",  school:"Лицей №40",   goals:28, assists:22, stars:4.6 },
  { rank:3, name:"Максим Орлов",   school:"Школа №19",   goals:25, assists:15, stars:4.4 },
  { rank:4, name:"Илья Соколов",   school:"Гимназия №1", goals:22, assists:19, stars:4.2 },
  { rank:5, name:"Роман Лебедев",  school:"Школа №37",   goals:20, assists:24, stars:4.0 },
];

const TEAMS_RATING = [
  { pos:1, name:"Молния",  school:"Школа №5",    w:14, d:2, l:1, gf:58, ga:22, pts:44 },
  { pos:2, name:"Буря",    school:"Лицей №40",   w:11, d:3, l:3, gf:44, ga:28, pts:36 },
  { pos:3, name:"Торнадо", school:"Школа №19",   w:9,  d:4, l:4, gf:37, ga:31, pts:31 },
  { pos:4, name:"Ракета",  school:"Гимназия №1", w:7,  d:2, l:8, gf:30, ga:40, pts:23 },
];

const TOURNAMENTS = [
  { id:1, name:"Кубок Нижегородской области 2026", date:"20 мая – 5 июня",  teams:16, level:"Региональный",  status:"active",   city:"Нижний Новгород",    prize:"200 000 ₽" },
  { id:2, name:"Весенний кубок школ",              date:"1–15 июня",        teams:24, level:"Муниципальный", status:"upcoming",  city:"Нижний Новгород",    prize:"80 000 ₽"  },
  { id:3, name:"Лига школ — Сезон 2",              date:"Сентябрь 2026",    teams:32, level:"Школьный",      status:"upcoming",  city:"Нижегородская обл.", prize:"50 000 ₽"  },
  { id:4, name:"Зимний кубок 2025/26",             date:"Январь 2026",      teams:12, level:"Региональный",  status:"finished",  city:"Нижний Новгород",    prize:"150 000 ₽" },
];

const LESSONS = [
  { id:1, title:"История микрофутзала",        dur:"8 мин",  level:"Теория",  module:"Основы",  done:true  },
  { id:2, title:"Правила игры и площадка",      dur:"12 мин", level:"Теория",  module:"Основы",  done:true  },
  { id:3, title:"Расстановка 2×2",              dur:"15 мин", level:"Тактика", module:"Тактика", done:false },
  { id:4, title:"Прессинг и защита",            dur:"18 мин", level:"Тактика", module:"Тактика", done:false },
  { id:5, title:"Техника паса",                 dur:"14 мин", level:"Техника", module:"Техника", done:false },
  { id:6, title:"Удар с разворота",             dur:"16 мин", level:"Техника", module:"Техника", done:false },
];

const EXERCISES_DEFAULT = [
  { id:1, title:"Разминка (суставная гимнастика)", dur:"5 мин",  sets:"1×5 мин",   icon:"Activity",   done:false },
  { id:2, title:"Челночный бег 10×10м",            dur:"8 мин",  sets:"5 повторов", icon:"Zap",        done:false },
  { id:3, title:"Передачи в парах",                dur:"10 мин", sets:"3×10 пасов", icon:"ArrowRight", done:false },
  { id:4, title:"Удары по воротам",                dur:"12 мин", sets:"10 ударов",  icon:"Target",     done:false },
  { id:5, title:"Обводка конусов",                 dur:"10 мин", sets:"4 серии",    icon:"GitBranch",  done:false },
  { id:6, title:"Заминка",                         dur:"5 мин",  sets:"1×5 мин",   icon:"Wind",       done:false },
];

const NEWS_DATA = [
  { id:1, title:"Определились финалисты Кубка НО — «Молния» против «Бури»",        date:"10 мая 2026", tag:"Результаты", img:IMG_HERO   },
  { id:2, title:"Запись на Весенний кубок школ открыта до 25 мая",                  date:"8 мая 2026",  tag:"Турниры",    img:IMG_TROPHY },
  { id:3, title:"Видеоурок: Тактика прессинга 2×2 от тренера сборной НО",           date:"5 мая 2026",  tag:"Обучение",   img:IMG_KIDS   },
  { id:4, title:"Встреча с ФК «Нижний Новгород»: мастер-класс для лидеров рейтинга",date:"3 мая 2026",  tag:"События",    img:IMG_COACH  },
];

const RULES_DATA = [
  { title:"Состав команды",    icon:"Users",        text:"5 игроков на поле (включая вратаря), до 3 запасных. Замены неограничены во время остановок игры." },
  { title:"Площадка",          icon:"Map",           text:"20×40 метров, ворота 2×3 м. Искусственное или натуральное покрытие. Разметка аналогична мини-футболу." },
  { title:"Мяч",               icon:"Circle",        text:"Размер 4, пониженный отскок. Вес 400–440 г. Проверяется перед матчем главным судьёй." },
  { title:"Время игры",        icon:"Clock",         text:"2 тайма по 20 минут чистого времени. Перерыв 10 мин. При ничьей — 2×5 мин, затем серия пенальти." },
  { title:"Накопленные фолы",  icon:"AlertTriangle", text:"Более 5 фолов в тайме — пенальти без стенки. Прямое удаление за опасную игру." },
  { title:"Аут и угловые",     icon:"CornerUpRight", text:"Мяч вне поля — удар ногой с боковой. Угловые выполняются с угла поля. Вратарь вводит мяч руками." },
];

// ─── Вспомогательные компоненты ───────────────────────────────────────────────
function Stars({ value, max = 5 }: { value: number; max?: number }) {
  return (
    <span className="inline-flex gap-0.5">
      {Array.from({ length: max }, (_, i) => (
        <span key={i} className={i < Math.round(value) ? "star-filled" : "star-empty"}>★</span>
      ))}
    </span>
  );
}

function SectionHeader({ title, sub, color = "orange" }: { title: string; sub?: string; color?: "orange"|"blue"|"green" }) {
  const line = color==="blue" ? "bg-nn-blue" : color==="green" ? "bg-nn-green" : "bg-[var(--nn-orange)]";
  const txt  = color==="blue" ? "text-nn-blue" : color==="green" ? "text-nn-green" : "text-nn-orange";
  return (
    <div className="mb-6 animate-fadeInUp">
      <div className="flex items-center gap-3 mb-1">
        <div className={`w-7 h-1 rounded-full ${line}`} />
        <span className={`font-oswald text-xs uppercase tracking-widest ${txt}`}>{sub || "Микрофутзал НН"}</span>
      </div>
      <h2 className="font-oswald text-3xl font-bold text-white uppercase">{title}</h2>
    </div>
  );
}

function StatPill({ value, label, color="orange" }: { value:string; label:string; color?:"orange"|"blue"|"green" }) {
  const txt = color==="blue"?"text-nn-blue":color==="green"?"text-nn-green":"text-nn-orange";
  return (
    <div className="nn-card p-4 text-center">
      <div className={`font-oswald text-2xl font-bold ${txt}`}>{value}</div>
      <div className="text-gray-400 text-xs font-roboto mt-1">{label}</div>
    </div>
  );
}

// ─── Экран выбора роли ────────────────────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: (r: Role) => void }) {
  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden" style={{background:"var(--nn-dark)"}}>
      <img src={IMG_KREMLIN} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#080C14]/70 via-[#080C14]/50 to-[#080C14]" />
      <div className="absolute inset-0 field-grid opacity-40" />

      <div className="relative z-10 text-center px-6 w-full max-w-xl">
        <div className="flex items-center justify-center gap-3 mb-3 animate-fadeIn">
          <div className="w-14 h-14 rounded-2xl bg-[var(--nn-orange)] flex items-center justify-center glow-orange">
            <span className="font-oswald font-bold text-white text-xl">НН</span>
          </div>
          <div className="text-left">
            <div className="font-oswald font-bold text-white text-2xl leading-tight">МИКРО<span className="text-nn-orange">ФУТЗАЛ</span></div>
            <div className="font-roboto text-nn-blue text-xs uppercase tracking-widest">Нижегородская область</div>
          </div>
        </div>

        <div className="text-gray-400 font-roboto text-sm mb-8 animate-fadeIn delay-200">🦌 Официальная образовательная платформа</div>
        <h1 className="font-oswald text-3xl font-bold text-white mb-6 animate-fadeInUp delay-100">Выбери свою роль</h1>

        <div className="space-y-3 animate-fadeInUp delay-200">
          <button onClick={() => onLogin("student")} className="w-full nn-card p-5 flex items-center gap-4 text-left group hover:border-[var(--nn-orange)] transition-all">
            <div className="w-12 h-12 rounded-xl bg-[#FF6B00]/15 flex items-center justify-center flex-shrink-0 group-hover:bg-[#FF6B00]/30 transition-colors">
              <Icon name="User" size={22} className="text-nn-orange" />
            </div>
            <div className="flex-1">
              <div className="font-oswald text-lg font-bold text-white">Ученик / Студент</div>
              <div className="font-roboto text-gray-400 text-xs mt-0.5">Обучение, тренировки, турниры, личная статистика</div>
            </div>
            <Icon name="ChevronRight" size={18} className="text-gray-500 group-hover:text-nn-orange transition-colors" />
          </button>

          <button onClick={() => onLogin("teacher")} className="w-full nn-card p-5 flex items-center gap-4 text-left group hover:border-nn-blue transition-all">
            <div className="w-12 h-12 rounded-xl bg-nn-blue/15 flex items-center justify-center flex-shrink-0 group-hover:bg-nn-blue/30 transition-colors">
              <Icon name="GraduationCap" size={22} className="text-nn-blue" />
            </div>
            <div className="flex-1">
              <div className="font-oswald text-lg font-bold text-white">Учитель / Тренер</div>
              <div className="font-roboto text-gray-400 text-xs mt-0.5">Методкабинет, журнал класса, организация турниров</div>
            </div>
            <Icon name="ChevronRight" size={18} className="text-gray-500 group-hover:text-nn-blue transition-colors" />
          </button>

          <button onClick={() => onLogin("admin")} className="w-full nn-card p-5 flex items-center gap-4 text-left group hover:border-nn-green transition-all">
            <div className="w-12 h-12 rounded-xl bg-nn-green/15 flex items-center justify-center flex-shrink-0 group-hover:bg-nn-green/30 transition-colors">
              <Icon name="Shield" size={22} className="text-nn-green" />
            </div>
            <div className="flex-1">
              <div className="font-oswald text-lg font-bold text-white">Администратор</div>
              <div className="font-roboto text-gray-400 text-xs mt-0.5">Управление школами, аналитика, турнирные сетки</div>
            </div>
            <Icon name="ChevronRight" size={18} className="text-gray-500 group-hover:text-nn-green transition-colors" />
          </button>
        </div>

        <p className="text-gray-600 text-xs font-roboto mt-6 animate-fadeIn delay-400">
          Авторизация через VK ID · Яндекс ID · Аккаунт школы
        </p>
      </div>
    </div>
  );
}

// ─── Дашборд ученика ──────────────────────────────────────────────────────────
function StudentHome({ navigate }: { navigate: (s: Screen) => void }) {
  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      {/* Приветствие */}
      <div className="relative rounded-2xl overflow-hidden h-44">
        <img src={IMG_KIDS} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080C14]/95 via-[#080C14]/70 to-transparent" />
        <div className="absolute inset-0 flex items-center px-6">
          <div>
            <div className="text-nn-orange font-oswald text-xs uppercase tracking-widest mb-1">Добро пожаловать</div>
            <h2 className="font-oswald text-2xl font-bold text-white">Артём Волков</h2>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <span className="badge-orange">Школа №5</span>
              <span className="badge-blue">7 класс</span>
              <div className="flex items-center gap-1"><span className="text-yellow-400 text-sm">⭐</span><span className="font-oswald text-white text-sm font-bold">4.8</span></div>
            </div>
          </div>
        </div>
        <div className="absolute right-5 top-1/2 -translate-y-1/2 text-right">
          <div className="font-oswald text-3xl font-bold text-nn-orange text-glow-orange">1 240</div>
          <div className="text-gray-300 text-xs font-roboto">⚽ футкоинов</div>
        </div>
      </div>

      {/* Прогресс */}
      <div className="nn-card p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="font-oswald text-base font-bold text-white">Прогресс обучения</div>
          <button onClick={() => navigate("learn")} className="text-nn-orange text-xs font-oswald uppercase tracking-wider flex items-center gap-1">
            Продолжить <Icon name="ArrowRight" size={13} />
          </button>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[{label:"Основы",pct:100,bar:"progress-bar-green"},{label:"Тактика",pct:45,bar:"progress-bar"},{label:"Техника",pct:20,bar:"progress-bar-blue"}].map(m => (
            <div key={m.label}>
              <div className="flex justify-between text-xs font-roboto mb-1">
                <span className="text-gray-300">{m.label}</span>
                <span className="text-gray-400">{m.pct}%</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div className={`h-full ${m.bar}`} style={{width:`${m.pct}%`}} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Быстрые кнопки */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {([
          {icon:"BookOpen", label:"Обучение",   screen:"learn"        as Screen, c:"orange"},
          {icon:"Dumbbell", label:"Тренировка", screen:"train"        as Screen, c:"blue"  },
          {icon:"Trophy",   label:"Турниры",    screen:"tournaments"  as Screen, c:"green" },
          {icon:"BarChart2",label:"Рейтинг",    screen:"rating"       as Screen, c:"orange"},
        ] as const).map(a => (
          <button key={a.label} onClick={() => navigate(a.screen)} className="nn-card p-4 flex flex-col items-center gap-2">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${a.c==="blue"?"bg-nn-blue/15":a.c==="green"?"bg-nn-green/15":"bg-[#FF6B00]/15"}`}>
              <Icon name={a.icon} size={20} className={a.c==="blue"?"text-nn-blue":a.c==="green"?"text-nn-green":"text-nn-orange"} />
            </div>
            <span className="font-oswald text-sm font-bold text-white uppercase">{a.label}</span>
          </button>
        ))}
      </div>

      {/* Достижения */}
      <div>
        <SectionHeader title="Мои достижения" sub="Трофеи" />
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {ACHIEVEMENTS.map((a,i) => (
            <div key={a.id} className={`nn-card p-3 text-center animate-fadeInUp ${!a.done?"opacity-30 grayscale":""}`} style={{animationDelay:`${i*0.07}s`}}>
              <div className="text-2xl mb-1">{a.icon}</div>
              <div className="font-oswald text-xs text-white font-bold leading-tight">{a.title}</div>
              {a.done && <div className="text-nn-green text-xs mt-1">✓</div>}
            </div>
          ))}
        </div>
      </div>

      {/* Турнир-баннер */}
      <div className="relative rounded-2xl overflow-hidden">
        <img src={IMG_TROPHY} alt="" className="w-full h-36 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080C14]/95 to-[#080C14]/30" />
        <div className="absolute inset-0 flex items-center justify-between px-6">
          <div>
            <span className="badge-green mb-1 inline-block">Регистрация открыта</span>
            <div className="font-oswald text-lg font-bold text-white mt-1">Кубок Нижегородской области</div>
            <div className="text-gray-300 font-roboto text-sm">20 мая – 5 июня · 16 команд</div>
          </div>
          <button onClick={() => navigate("tournaments")} className="btn-nn btn-nn-orange px-4 py-2.5 flex-shrink-0 text-sm">Участвовать</button>
        </div>
      </div>
    </div>
  );
}

// ─── Обучение ─────────────────────────────────────────────────────────────────
function LearnModule() {
  const [mod, setMod] = useState("Все");
  const mods = ["Все","Основы","Тактика","Техника"];
  const filtered = mod==="Все" ? LESSONS : LESSONS.filter(l => l.module===mod);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <SectionHeader title="Обучение" sub="Образовательный модуль" />
      <div className="flex gap-2 flex-wrap mb-5">
        {mods.map(m => (
          <button key={m} onClick={() => setMod(m)} className={`px-4 py-1.5 rounded-full text-xs font-oswald uppercase tracking-wider transition-all ${mod===m?"bg-[var(--nn-orange)] text-white":"nn-card text-gray-400 hover:text-white"}`}>{m}</button>
        ))}
      </div>

      <div className="relative rounded-2xl overflow-hidden h-48 mb-6 cursor-pointer">
        <img src={IMG_KIDS} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080C14]/90 to-[#080C14]/20" />
        <div className="absolute inset-0 flex items-center px-8">
          <div>
            <span className="badge-orange mb-2 inline-block">Рекомендуется</span>
            <h3 className="font-oswald text-xl font-bold text-white mt-1">Расстановка 2×2 — разбор с анимацией</h3>
            <div className="flex items-center gap-3 mt-3">
              <div className="w-11 h-11 rounded-full bg-[var(--nn-orange)] flex items-center justify-center glow-orange hover:scale-110 transition-transform">
                <Icon name="Play" size={20} className="text-white ml-0.5" />
              </div>
              <div>
                <div className="text-white font-roboto text-sm font-medium">15 минут</div>
                <div className="text-gray-400 text-xs font-roboto">Тактика · Средний</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3 mb-8">
        {filtered.map((l,i) => (
          <div key={l.id} className="nn-card p-4 flex items-center gap-4 cursor-pointer animate-fadeInUp" style={{animationDelay:`${i*0.07}s`}}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${l.done?"bg-nn-green/20":"bg-[#FF6B00]/15 hover:bg-[#FF6B00]/30 transition-colors"}`}>
              <Icon name={l.done?"CheckCircle":"Play"} size={17} className={l.done?"text-nn-green":"text-nn-orange"} />
            </div>
            <div className="flex-1 min-w-0">
              <div className={`font-oswald text-base font-semibold ${l.done?"text-gray-400 line-through":"text-white"}`}>{l.title}</div>
              <div className="flex items-center gap-2 mt-1">
                <span className={`text-xs px-2 py-0.5 rounded-full font-oswald ${l.level==="Теория"?"badge-blue":l.level==="Тактика"?"badge-orange":"badge-green"}`}>{l.level}</span>
                <span className="text-gray-500 text-xs font-roboto">{l.dur}</span>
              </div>
            </div>
            {l.done && <span className="text-nn-green text-xs font-oswald">+50⚽</span>}
          </div>
        ))}
      </div>

      <div className="nn-card p-6 border-2 border-nn-blue/40">
        <div className="flex items-center gap-3 mb-3">
          <Icon name="HelpCircle" size={20} className="text-nn-blue" />
          <h3 className="font-oswald text-xl font-bold text-white">Тест по правилам</h3>
        </div>
        <p className="text-gray-400 font-roboto text-sm mb-4">10 вопросов с мгновенной обратной связью. За прохождение +100 ⚽ футкоинов.</p>
        <button className="btn-nn btn-nn-blue px-6 py-3">Начать тест</button>
      </div>
    </div>
  );
}

// ─── Тренировки ───────────────────────────────────────────────────────────────
function TrainModule() {
  const [exs, setExs] = useState(EXERCISES_DEFAULT);
  const done = exs.filter(e => e.done).length;
  const toggle = (id: number) => setExs(prev => prev.map(e => e.id===id?{...e,done:!e.done}:e));

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <SectionHeader title="Тренировки" sub="Комплекс упражнений" color="blue" />

      <div className="nn-card p-5 mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="font-oswald text-base font-bold text-white">Тренировка #12 · Сегодня</div>
          <span className={`text-sm font-oswald ${done===exs.length?"text-nn-green":"text-gray-400"}`}>{done}/{exs.length}</span>
        </div>
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <div className="progress-bar-blue h-full transition-all duration-500" style={{width:`${(done/exs.length)*100}%`}} />
        </div>
        {done===exs.length && <div className="mt-3 text-nn-green font-oswald text-sm animate-fadeIn">✅ Тренировка завершена! +150 ⚽</div>}
      </div>

      <div className="space-y-3 mb-8">
        {exs.map((e,i) => (
          <button key={e.id} onClick={() => toggle(e.id)} className={`w-full nn-card p-4 flex items-center gap-4 text-left animate-fadeInUp transition-all ${e.done?"opacity-60":""}`} style={{animationDelay:`${i*0.06}s`}}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${e.done?"bg-nn-green/20":"bg-nn-blue/15"}`}>
              <Icon name={e.done?"CheckCircle":e.icon} size={17} className={e.done?"text-nn-green":"text-nn-blue"} fallback="Activity" />
            </div>
            <div className="flex-1">
              <div className={`font-oswald text-base font-semibold ${e.done?"line-through text-gray-500":"text-white"}`}>{e.title}</div>
              <div className="text-gray-400 text-xs font-roboto mt-0.5">{e.sets} · {e.dur}</div>
            </div>
            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${e.done?"bg-nn-green border-nn-green":"border-gray-600"}`}>
              {e.done && <Icon name="Check" size={11} className="text-white" />}
            </div>
          </button>
        ))}
      </div>

      <div className="nn-card p-6 border border-[var(--nn-orange)]/30">
        <div className="flex items-center gap-3 mb-4">
          <Icon name="Award" size={20} className="text-nn-orange" />
          <h3 className="font-oswald text-xl font-bold text-white">Зачётные нормативы</h3>
        </div>
        <div className="space-y-3">
          {[
            {label:"10 передач за 30 сек",     g5:"≤30 сек", g4:"31–35 сек", g3:"36–40 сек"},
            {label:"Челночный бег 10×10м",      g5:"≤25 сек", g4:"26–28 сек", g3:"29–32 сек"},
            {label:"Удары по воротам (из 10)",  g5:"9–10",    g4:"7–8",       g3:"5–6"      },
          ].map(n => (
            <div key={n.label} className="bg-nn-surface rounded-xl p-3">
              <div className="font-oswald text-sm text-white mb-2">{n.label}</div>
              <div className="grid grid-cols-3 gap-2 text-xs font-roboto">
                <div className="bg-nn-green/10 rounded-lg px-2 py-1 text-center"><span className="text-nn-green font-bold">5</span> — {n.g5}</div>
                <div className="bg-[#FF6B00]/10 rounded-lg px-2 py-1 text-center"><span className="text-nn-orange font-bold">4</span> — {n.g4}</div>
                <div className="bg-nn-blue/10 rounded-lg px-2 py-1 text-center"><span className="text-nn-blue font-bold">3</span> — {n.g3}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Турниры ──────────────────────────────────────────────────────────────────
function TournamentsModule() {
  const stCfg: Record<string,{label:string;cls:string}> = {
    active:   {label:"Идёт",     cls:"badge-green" },
    upcoming: {label:"Скоро",    cls:"badge-orange"},
    finished: {label:"Завершён", cls:"badge-blue"  },
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <SectionHeader title="Турниры" sub="Соревнования НО" color="green" />

      <div className="relative rounded-2xl overflow-hidden h-40 mb-6">
        <img src={IMG_TROPHY} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080C14]/95 to-[#080C14]/30" />
        <div className="absolute inset-0 flex items-center justify-between px-6">
          <div>
            <span className="badge-green mb-1 inline-block">Идёт регистрация</span>
            <h3 className="font-oswald text-xl font-bold text-white mt-1">Кубок НО 2026</h3>
            <div className="text-gray-300 text-sm font-roboto">20 мая – 5 июня · 200 000 ₽</div>
          </div>
          <button className="btn-nn btn-nn-green px-4 py-2.5 text-sm flex-shrink-0">Подать заявку</button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {TOURNAMENTS.map((t,i) => {
          const st = stCfg[t.status];
          return (
            <div key={t.id} className="nn-card p-5 animate-fadeInUp" style={{animationDelay:`${i*0.08}s`}}>
              <div className="flex items-start justify-between mb-3">
                <h4 className="font-oswald text-base font-bold text-white leading-snug flex-1 mr-3">{t.name}</h4>
                <span className={st.cls}>{st.label}</span>
              </div>
              <div className="space-y-1.5 mb-4">
                <div className="flex items-center gap-2 text-gray-400 text-xs font-roboto"><Icon name="Calendar" size={12} className="text-nn-orange" />{t.date}</div>
                <div className="flex items-center gap-2 text-gray-400 text-xs font-roboto"><Icon name="MapPin" size={12} className="text-nn-orange" />{t.city}</div>
                <div className="flex items-center gap-2 text-gray-400 text-xs font-roboto"><Icon name="Users" size={12} className="text-nn-orange" />{t.teams} команд · {t.level}</div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-gray-500 text-xs font-roboto">Приз</div>
                  <div className="font-oswald text-lg font-bold text-nn-orange">{t.prize}</div>
                </div>
                {t.status!=="finished" && <button className="btn-nn btn-outline-orange px-4 py-1.5 text-xs">Подробнее</button>}
              </div>
            </div>
          );
        })}
      </div>

      <div className="nn-card p-5">
        <h3 className="font-oswald text-lg font-bold text-white mb-4">Система командного зачёта</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
          {[{label:"Победа",pts:"+3",c:"text-nn-green"},{label:"Ничья",pts:"+1",c:"text-nn-blue"},{label:"Поражение",pts:"+0",c:"text-gray-400"},{label:"Сухой матч",pts:"+1",c:"text-nn-orange"}].map(r => (
            <div key={r.label} className="bg-nn-surface rounded-xl p-3">
              <div className={`font-oswald text-2xl font-bold ${r.c}`}>{r.pts}</div>
              <div className="text-gray-400 text-xs font-roboto mt-1">{r.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Рейтинг ──────────────────────────────────────────────────────────────────
function RatingModule() {
  const [tab, setTab] = useState<"players"|"teams">("players");

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <SectionHeader title="Рейтинг" sub="Таблица лидеров" />
      <div className="flex gap-2 mb-6">
        {(["players","teams"] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-5 py-2 rounded-lg font-oswald text-xs uppercase tracking-wider transition-all ${tab===t?"bg-[var(--nn-orange)] text-white":"nn-card text-gray-400 hover:text-white"}`}>
            {t==="players"?"Игроки":"Команды"}
          </button>
        ))}
      </div>

      {tab==="players" && (
        <>
          <div className="grid grid-cols-3 gap-3 mb-6 max-w-sm mx-auto">
            {[1,0,2].map((pi,ci) => {
              const p = PLAYERS_RATING[pi];
              const medals=["🥈","🥇","🥉"];
              const h=["h-20","h-28","h-16"];
              const grd=["linear-gradient(to top,#CBD5E1,#94A3B8)","linear-gradient(to top,#FFD700,#F59E0B)","linear-gradient(to top,#D97706,#92400E)"];
              return (
                <div key={pi} className={`flex flex-col items-center ${ci===0?"mt-8":ci===2?"mt-12":""}`}>
                  <span className="text-2xl">{medals[ci]}</span>
                  <div className="font-oswald text-xs text-white text-center font-bold mt-1">{p.name.split(" ")[0]}</div>
                  <div className="text-gray-400 text-xs">{p.goals}г</div>
                  <div className={`w-full ${h[ci]} rounded-t-lg flex items-center justify-center mt-1`} style={{background:grd[ci]}}>
                    <span className="font-oswald text-2xl font-bold text-white">{pi+1}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="nn-card overflow-hidden">
            <div className="grid grid-cols-6 px-4 py-2 bg-secondary/50 text-gray-400 text-xs font-oswald uppercase tracking-widest">
              <div>#</div><div className="col-span-2">Игрок</div><div className="text-center">Голы</div><div className="text-center">Передачи</div><div className="text-center">Звёзды</div>
            </div>
            {PLAYERS_RATING.map((p,i) => (
              <div key={p.rank} className="leader-row grid grid-cols-6 px-4 py-3 items-center border-t border-[#1C2538] hover:bg-secondary/20 transition-colors animate-fadeInUp" style={{animationDelay:`${i*0.06}s`}}>
                <div><span className={`rank-num inline-flex w-7 h-7 rounded-full items-center justify-center text-white font-oswald font-bold text-xs ${p.rank>3?"bg-secondary":""}`}>{p.rank}</span></div>
                <div className="col-span-2">
                  <div className="font-oswald text-sm font-semibold text-white">{p.name}</div>
                  <div className="text-gray-500 text-xs font-roboto">{p.school}</div>
                </div>
                <div className="text-center font-oswald font-bold text-nn-orange">{p.goals}</div>
                <div className="text-center font-oswald text-gray-300">{p.assists}</div>
                <div className="text-center"><Stars value={p.stars} /></div>
              </div>
            ))}
          </div>
        </>
      )}

      {tab==="teams" && (
        <div className="nn-card overflow-hidden">
          <div className="grid grid-cols-8 px-4 py-2 bg-secondary/50 text-gray-400 text-xs font-oswald uppercase tracking-widest">
            <div>#</div><div className="col-span-2">Команда</div><div className="text-center">В</div><div className="text-center">Н</div><div className="text-center">П</div><div className="text-center">Мячи</div><div className="text-center">Очки</div>
          </div>
          {TEAMS_RATING.map((t,i) => (
            <div key={t.pos} className="grid grid-cols-8 px-4 py-3 items-center border-t border-[#1C2538] hover:bg-secondary/20 transition-colors animate-fadeInUp" style={{animationDelay:`${i*0.06}s`}}>
              <div className="font-oswald text-sm font-bold text-gray-400">{t.pos}</div>
              <div className="col-span-2">
                <div className="font-oswald text-sm font-semibold text-white">{t.name}</div>
                <div className="text-gray-500 text-xs font-roboto">{t.school}</div>
              </div>
              <div className="text-center font-oswald text-nn-green font-bold text-sm">{t.w}</div>
              <div className="text-center font-oswald text-gray-400 text-sm">{t.d}</div>
              <div className="text-center font-oswald text-red-400 text-sm">{t.l}</div>
              <div className="text-center text-gray-300 text-xs font-roboto">{t.gf}:{t.ga}</div>
              <div className="text-center"><span className="bg-[#FF6B00]/15 text-nn-orange font-oswald font-bold px-2 py-0.5 rounded-full text-sm">{t.pts}</span></div>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-3 gap-3 mt-6">
        {[{icon:"⚽",title:"Лучший бомбардир",name:"Артём Волков",val:"34 гола"},{icon:"🎯",title:"Лучший ассистент",name:"Роман Лебедев",val:"24 передачи"},{icon:"🛡️",title:"Лучший вратарь",name:"Иван Кузнецов",val:"12 «сухарей»"}].map(n => (
          <div key={n.title} className="nn-card p-4 text-center">
            <div className="text-2xl mb-1">{n.icon}</div>
            <div className="text-gray-400 text-xs font-roboto mb-1">{n.title}</div>
            <div className="font-oswald text-sm font-bold text-white">{n.name}</div>
            <div className="text-nn-orange text-xs font-oswald mt-1">{n.val}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Правила ──────────────────────────────────────────────────────────────────
function RulesModule() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <SectionHeader title="Правила игры" sub="Регламент" />
      <div className="nn-card p-4 mb-5 flex items-start gap-3 border border-nn-blue/30">
        <Icon name="Info" size={17} className="text-nn-blue flex-shrink-0 mt-0.5" />
        <p className="text-gray-300 text-sm font-roboto leading-relaxed">Микрофутзал НН — адаптированная версия мини-футбола для образовательных учреждений Нижегородской области. Правила утверждены региональной федерацией футбола.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {RULES_DATA.map((r,i) => (
          <div key={r.title} className="nn-card p-5 animate-fadeInUp" style={{animationDelay:`${i*0.08}s`}}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#FF6B00]/15 flex items-center justify-center">
                <Icon name={r.icon} size={17} className="text-nn-orange" fallback="Circle" />
              </div>
              <h3 className="font-oswald text-lg font-bold text-white">{r.title}</h3>
            </div>
            <p className="text-gray-400 text-sm font-roboto leading-relaxed">{r.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Новости ──────────────────────────────────────────────────────────────────
function NewsModule() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <SectionHeader title="Новости" sub="Нижегородская область" />
      <div className="grid md:grid-cols-2 gap-4">
        {NEWS_DATA.map((n,i) => (
          <div key={n.id} className={`nn-card overflow-hidden cursor-pointer animate-fadeInUp ${i===0?"md:col-span-2":""}`} style={{animationDelay:`${i*0.08}s`}}>
            <div className={`relative ${i===0?"h-52":"h-36"}`}>
              <img src={n.img} alt={n.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F1520] to-transparent" />
              <span className={`absolute top-3 left-3 ${n.tag==="Результаты"?"badge-green":n.tag==="Турниры"?"badge-orange":n.tag==="Обучение"?"badge-blue":"badge-orange"}`}>{n.tag}</span>
            </div>
            <div className="p-4">
              <p className="text-gray-500 text-xs font-roboto mb-1 flex items-center gap-1"><Icon name="Clock" size={11} />{n.date}</p>
              <h4 className={`font-oswald font-bold text-white leading-snug ${i===0?"text-xl":"text-base"}`}>{n.title}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Методкабинет учителя ─────────────────────────────────────────────────────
function TeacherCabinet() {
  const [sec, setSec] = useState<"overview"|"journal"|"equipment">("overview");

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <SectionHeader title="Методкабинет" sub="Учитель / Тренер" color="blue" />
      <div className="flex gap-2 mb-6 flex-wrap">
        {(["overview","journal","equipment"] as const).map(s => (
          <button key={s} onClick={() => setSec(s)} className={`px-4 py-2 rounded-lg font-oswald text-xs uppercase tracking-wider transition-all ${sec===s?"bg-nn-blue text-white":"nn-card text-gray-400 hover:text-white"}`}>
            {s==="overview"?"Пособие":s==="journal"?"Журнал":"Оборудование"}
          </button>
        ))}
      </div>

      {sec==="overview" && (
        <div className="space-y-4">
          <div className="nn-card p-6 border border-nn-blue/30">
            <div className="flex items-center gap-3 mb-4"><Icon name="Layers" size={20} className="text-nn-blue" /><h3 className="font-oswald text-xl font-bold text-white">Конструктор урока</h3></div>
            <div className="grid md:grid-cols-3 gap-3">
              {["Разминка (5 мин)","Техника паса (10 мин)","Тактика 2×2 (15 мин)","Двусторонняя игра (20 мин)","Разбор ошибок (5 мин)","Заминка (5 мин)"].map((item,i) => (
                <div key={i} className="bg-nn-surface rounded-xl p-3 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-nn-blue/20 flex items-center justify-center flex-shrink-0"><span className="text-nn-blue text-xs font-oswald font-bold">{i+1}</span></div>
                  <span className="text-white text-xs font-roboto">{item}</span>
                </div>
              ))}
            </div>
            <button className="btn-nn btn-nn-blue px-6 py-2 mt-4 text-sm">Сохранить план урока</button>
          </div>

          <div className="nn-card p-6">
            <div className="flex items-center gap-3 mb-4"><Icon name="FileText" size={20} className="text-nn-orange" /><h3 className="font-oswald text-xl font-bold text-white">Готовые конспекты</h3></div>
            <div className="space-y-2">
              {["Урок 1: Введение в микрофутзал","Урок 5: Тактика защиты","Урок 10: Стандартные положения","Праздник спорта: Мини-турнир"].map((c,i) => (
                <div key={i} className="flex items-center justify-between bg-nn-surface rounded-xl px-4 py-3">
                  <div className="flex items-center gap-3"><Icon name="FileText" size={15} className="text-gray-400" /><span className="text-white text-sm font-roboto">{c}</span></div>
                  <button className="text-nn-orange text-xs font-oswald uppercase hover:underline">Скачать</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {sec==="journal" && (
        <div className="nn-card overflow-hidden">
          <div className="p-4 border-b border-[#1C2538] flex items-center justify-between">
            <h3 className="font-oswald text-lg font-bold text-white">Журнал класса 7А</h3>
            <span className="badge-green">20 учеников</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-secondary/50 text-gray-400 text-xs font-oswald uppercase tracking-wider">
                  <th className="text-left px-4 py-2">Ученик</th>
                  <th className="text-center px-4 py-2">Тест</th>
                  <th className="text-center px-4 py-2">Норматив</th>
                  <th className="text-center px-4 py-2">Трен.</th>
                  <th className="text-center px-4 py-2">Звёзды</th>
                </tr>
              </thead>
              <tbody>
                {["Волков А.","Краснов Д.","Орлов М.","Соколов И.","Лебедев Р."].map((name,i) => {
                  const g=[5,4,5,3,4],t=[8,6,9,5,7],s=[4.8,4.2,4.9,3.8,4.5];
                  return (
                    <tr key={i} className="border-t border-[#1C2538] hover:bg-secondary/20 transition-colors">
                      <td className="px-4 py-3 font-roboto text-white text-sm">{name}</td>
                      <td className="px-4 py-3 text-center font-oswald font-bold text-sm" style={{color:g[i]===5?"var(--nn-green)":g[i]===4?"var(--nn-orange)":"var(--nn-blue)"}}>{g[i]}</td>
                      <td className="px-4 py-3 text-center font-oswald font-bold text-sm" style={{color:g[i]>=4?"var(--nn-green)":"var(--nn-orange)"}}>{g[i]>=4?"Сдал":"В процессе"}</td>
                      <td className="px-4 py-3 text-center font-roboto text-gray-300 text-sm">{t[i]}/10</td>
                      <td className="px-4 py-3 text-center"><Stars value={s[i]} /></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {sec==="equipment" && (
        <div className="nn-card p-6 border border-nn-green/30">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3"><Icon name="Calculator" size={20} className="text-nn-green" /><h3 className="font-oswald text-xl font-bold text-white">Калькулятор зала</h3></div>
            <span className="badge-green">~27 500 ₽</span>
          </div>
          <div className="space-y-2">
            {[
              {item:"Ворота (2 шт.), ПВХ-трубы",  price:"4 000 ₽",  done:true },
              {item:"Мячи футзальные (5 шт.)",     price:"6 500 ₽",  done:true },
              {item:"Конусы и стойки (20 шт.)",    price:"1 500 ₽",  done:false},
              {item:"Разметка (клейкая лента)",    price:"800 ₽",    done:false},
              {item:"Жилетки (2 цвета, 10+10)",    price:"4 200 ₽",  done:false},
              {item:"Насос + манометр",             price:"1 200 ₽",  done:true },
              {item:"Секундомер",                  price:"800 ₽",    done:true },
              {item:"Аптечка",                     price:"2 500 ₽",  done:false},
            ].map((e,i) => (
              <div key={i} className={`flex items-center justify-between bg-nn-surface rounded-xl px-4 py-3 ${e.done?"opacity-50":""}`}>
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${e.done?"bg-nn-green border-nn-green":"border-gray-500"}`}>
                    {e.done && <Icon name="Check" size={10} className="text-white" />}
                  </div>
                  <span className="text-white text-sm font-roboto">{e.item}</span>
                </div>
                <span className="text-nn-orange font-oswald text-sm font-bold">{e.price}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Профиль ──────────────────────────────────────────────────────────────────
function ProfileModule({ role, onLogout }: { role: Role; onLogout: () => void }) {
  const rl: Record<Role,string> = {student:"Ученик",teacher:"Учитель",admin:"Администратор"};
  const rc: Record<Role,string> = {student:"badge-orange",teacher:"badge-blue",admin:"badge-green"};
  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <SectionHeader title="Профиль" sub="Личный кабинет" />
      <div className="nn-card p-6 mb-5">
        <div className="flex items-start gap-5">
          <div className="w-18 h-18 w-16 h-16 rounded-2xl bg-[#FF6B00]/20 flex items-center justify-center flex-shrink-0 border-2 border-[var(--nn-orange)]">
            <span className="font-oswald font-bold text-nn-orange text-xl">АВ</span>
          </div>
          <div className="flex-1">
            <div className="font-oswald text-2xl font-bold text-white">Артём Волков</div>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <span className={rc[role]}>{rl[role]}</span>
              <span className="badge-blue">Школа №5 · 7 класс</span>
              <span className="badge-green">Нижний Новгород</span>
            </div>
            <div className="flex items-center gap-4 mt-3">
              {[{v:"34",l:"голов",c:"text-nn-orange"},{v:"18",l:"передач",c:"text-nn-blue"},{v:"22",l:"матчей",c:"text-nn-green"},{v:"1 240",l:"⚽ монет",c:"text-yellow-400"}].map(s => (
                <div key={s.l} className="text-center">
                  <div className={`font-oswald text-lg font-bold ${s.c}`}>{s.v}</div>
                  <div className="text-gray-400 text-xs font-roboto">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="nn-card p-6 mb-5">
        <div className="flex items-center gap-3 mb-4">
          <Icon name="Star" size={18} className="text-yellow-400" />
          <h3 className="font-oswald text-xl font-bold text-white">Оценка по системе 5 звёзд</h3>
        </div>
        <div className="grid grid-cols-5 gap-3">
          {[{l:"Голы",s:4.8},{l:"Передачи",s:4.2},{l:"Защита",s:3.6},{l:"Креатив",s:4.5},{l:"Дисциплина",s:5.0}].map(c => (
            <div key={c.l} className="bg-nn-surface rounded-xl p-3 text-center">
              <div className="text-gray-400 text-xs font-roboto mb-1">{c.l}</div>
              <div className="font-oswald text-xl font-bold text-white">{c.s.toFixed(1)}</div>
              <Stars value={c.s} />
            </div>
          ))}
        </div>
      </div>

      <div className="nn-card p-6 mb-5">
        <h3 className="font-oswald text-xl font-bold text-white mb-4">Достижения</h3>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {ACHIEVEMENTS.map((a,i) => (
            <div key={a.id} className={`bg-nn-surface rounded-xl p-3 text-center animate-fadeInUp ${!a.done?"opacity-30 grayscale":""}`} style={{animationDelay:`${i*0.05}s`}}>
              <div className="text-xl mb-1">{a.icon}</div>
              <div className="font-oswald text-xs text-white">{a.title}</div>
            </div>
          ))}
        </div>
      </div>

      <button onClick={onLogout} className="btn-nn btn-outline-orange w-full py-3 flex items-center justify-center gap-2">
        <Icon name="LogOut" size={15} /> Выйти из аккаунта
      </button>
    </div>
  );
}

// ─── Дашборд учителя ─────────────────────────────────────────────────────────
function TeacherHome({ navigate }: { navigate: (s: Screen) => void }) {
  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      <div className="relative rounded-2xl overflow-hidden h-40">
        <img src={IMG_COACH} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080C14]/95 to-[#080C14]/40" />
        <div className="absolute inset-0 flex items-center px-6">
          <div>
            <div className="text-nn-blue font-oswald text-xs uppercase tracking-widest mb-1">Методкабинет</div>
            <h2 className="font-oswald text-2xl font-bold text-white">Мария Петрова</h2>
            <div className="flex items-center gap-2 mt-2">
              <span className="badge-blue">Учитель физкультуры</span>
              <span className="badge-orange">Школа №5</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatPill value="23"   label="Учеников"       color="blue"   />
        <StatPill value="8/10" label="Тренировок"      color="green"  />
        <StatPill value="4.3"  label="Ср. оценка"      color="orange" />
        <StatPill value="2"    label="Турниров"        color="blue"   />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {([
          {icon:"Layers",   label:"Конструктор уроков", desc:"Создай план на неделю из готовых блоков",  screen:"teacher-cabinet",c:"blue"   },
          {icon:"Users",    label:"Журнал класса",       desc:"Успеваемость, тесты, посещаемость",        screen:"teacher-cabinet",c:"orange" },
          {icon:"Trophy",   label:"Создать турнир",      desc:"Автоматическая сетка, ведение счёта",      screen:"tournaments",     c:"green"  },
          {icon:"Star",     label:"Оценивание",          desc:"Система 5 звёзд и командный зачёт",        screen:"rating",          c:"orange" },
        ] as const).map(a => (
          <button key={a.label} onClick={() => navigate(a.screen as Screen)} className="nn-card p-5 flex items-start gap-4 text-left">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${a.c==="blue"?"bg-nn-blue/15":a.c==="green"?"bg-nn-green/15":"bg-[#FF6B00]/15"}`}>
              <Icon name={a.icon} size={20} className={a.c==="blue"?"text-nn-blue":a.c==="green"?"text-nn-green":"text-nn-orange"} />
            </div>
            <div>
              <div className="font-oswald text-base font-bold text-white">{a.label}</div>
              <div className="text-gray-400 text-xs font-roboto mt-0.5">{a.desc}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Дашборд администратора ───────────────────────────────────────────────────
function AdminHome() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      <div className="relative rounded-2xl overflow-hidden h-36">
        <img src={IMG_KREMLIN} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080C14]/95 to-[#080C14]/40" />
        <div className="absolute inset-0 flex items-center px-6">
          <div>
            <div className="text-nn-green font-oswald text-xs uppercase tracking-widest mb-1">Региональный координатор</div>
            <h2 className="font-oswald text-2xl font-bold text-white">Администратор НО</h2>
            <div className="text-gray-300 text-sm font-roboto mt-1">Нижегородская область · Сезон 2025/26</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatPill value="47"  label="Школ в системе"    color="green"  />
        <StatPill value="312" label="Зарегистрировано"  color="blue"   />
        <StatPill value="6"   label="Активных турниров" color="orange" />
        <StatPill value="89%" label="Вовлечённость"     color="green"  />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="nn-card p-5">
          <h3 className="font-oswald text-lg font-bold text-white mb-4">Школы по районам</h3>
          <div className="space-y-2">
            {[{d:"Нижегородский",s:12,a:11},{d:"Советский",s:9,a:8},{d:"Автозаводский",s:14,a:12},{d:"Сормовский",s:8,a:7}].map(r => (
              <div key={r.d} className="flex items-center gap-3">
                <span className="text-gray-400 text-xs font-roboto w-28 flex-shrink-0">{r.d}</span>
                <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="progress-bar-green h-full" style={{width:`${(r.a/r.s)*100}%`}} />
                </div>
                <span className="text-gray-300 text-xs font-roboto w-10 text-right">{r.a}/{r.s}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="nn-card p-5">
          <h3 className="font-oswald text-lg font-bold text-white mb-4">Активность за неделю</h3>
          <div className="space-y-3">
            {[{l:"Новых игроков",v:"42",i:"UserPlus",c:"text-nn-green"},{l:"Матчей сыграно",v:"18",i:"Zap",c:"text-nn-orange"},{l:"Тестов пройдено",v:"137",i:"CheckCircle",c:"text-nn-blue"},{l:"Видеоуроков",v:"284",i:"Play",c:"text-yellow-400"}].map(s => (
              <div key={s.l} className="flex items-center gap-3">
                <Icon name={s.i} size={15} className={s.c} fallback="Circle" />
                <span className="text-gray-400 text-xs font-roboto flex-1">{s.l}</span>
                <span className={`font-oswald font-bold text-sm ${s.c}`}>{s.v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Навигация ────────────────────────────────────────────────────────────────
const STUDENT_TABS = [
  {id:"home" as Screen,        label:"Главная",   icon:"Home"    },
  {id:"learn" as Screen,       label:"Обучение",  icon:"BookOpen"},
  {id:"train" as Screen,       label:"Трениров.", icon:"Dumbbell"},
  {id:"tournaments" as Screen, label:"Турниры",   icon:"Trophy"  },
  {id:"profile" as Screen,     label:"Профиль",   icon:"User"    },
];
const TEACHER_TABS = [
  {id:"home" as Screen,            label:"Главная",  icon:"Home"    },
  {id:"teacher-cabinet" as Screen, label:"Кабинет",  icon:"Layers"  },
  {id:"tournaments" as Screen,     label:"Турниры",  icon:"Trophy"  },
  {id:"rating" as Screen,          label:"Рейтинг",  icon:"BarChart2"},
  {id:"profile" as Screen,         label:"Профиль",  icon:"User"    },
];
const ADMIN_TABS = [
  {id:"home" as Screen,        label:"Аналитика", icon:"BarChart2"},
  {id:"tournaments" as Screen, label:"Турниры",   icon:"Trophy"   },
  {id:"rating" as Screen,      label:"Рейтинг",   icon:"Star"     },
  {id:"news" as Screen,        label:"Новости",   icon:"Newspaper"},
  {id:"profile" as Screen,     label:"Профиль",   icon:"User"     },
];

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function Index() {
  const [role, setRole]     = useState<Role | null>(null);
  const [screen, setScreen] = useState<Screen>("home");

  const handleLogin  = (r: Role) => { setRole(r); setScreen("home"); };
  const handleLogout = ()         => { setRole(null); setScreen("home"); };
  const navigate = (s: Screen)    => { setScreen(s); window.scrollTo({top:0,behavior:"smooth"}); };

  if (!role) return <LoginScreen onLogin={handleLogin} />;

  const tabs = role==="teacher" ? TEACHER_TABS : role==="admin" ? ADMIN_TABS : STUDENT_TABS;

  const renderScreen = () => {
    if (screen==="profile")         return <ProfileModule role={role} onLogout={handleLogout} />;
    if (screen==="learn")           return <LearnModule />;
    if (screen==="train")           return <TrainModule />;
    if (screen==="tournaments")     return <TournamentsModule />;
    if (screen==="rating")          return <RatingModule />;
    if (screen==="rules")           return <RulesModule />;
    if (screen==="news")            return <NewsModule />;
    if (screen==="teacher-cabinet") return <TeacherCabinet />;
    if (role==="teacher") return <TeacherHome navigate={navigate} />;
    if (role==="admin")   return <AdminHome />;
    return <StudentHome navigate={navigate} />;
  };

  const roleInit: Record<Role,string> = {student:"АВ", teacher:"МП", admin:"АД"};
  const roleColor: Record<Role,string> = {student:"bg-[#FF6B00]/20 text-nn-orange", teacher:"bg-nn-blue/20 text-nn-blue", admin:"bg-nn-green/20 text-nn-green"};

  return (
    <div className="min-h-screen pb-20" style={{background:"var(--nn-dark)"}}>
      {/* Топ-бар */}
      <header className="sticky top-0 z-40 bg-[#080C14]/90 backdrop-blur-md border-b border-[#1C2538]">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <button onClick={() => navigate("home")} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[var(--nn-orange)] flex items-center justify-center glow-orange">
              <span className="font-oswald font-bold text-white text-sm">НН</span>
            </div>
            <div className="leading-none">
              <span className="font-oswald font-bold text-white text-base">МИКРО<span className="text-nn-orange">ФУТЗАЛ</span></span>
              <div className="text-gray-500 text-xs font-roboto hidden sm:block">Нижегородская область</div>
            </div>
          </button>

          {/* Desktop */}
          <nav className="hidden md:flex items-center gap-1">
            {tabs.filter(t => t.id!=="profile").map(t => (
              <button key={t.id} onClick={() => navigate(t.id)} className={`px-3 py-1.5 rounded-lg font-oswald text-xs uppercase tracking-wider transition-all ${screen===t.id?"bg-[#FF6B00]/15 text-nn-orange":"text-gray-400 hover:text-white"}`}>
                {t.label}
              </button>
            ))}
          </nav>

          <button onClick={() => navigate("profile")} className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-oswald font-bold ${roleColor[role]}`}>
            {roleInit[role]}
          </button>
        </div>
      </header>

      <main>{renderScreen()}</main>

      {/* Мобильная навигация */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#0F1520]/95 backdrop-blur-md border-t border-[#1C2538]">
        <div className="flex">
          {tabs.map(t => (
            <button key={t.id} onClick={() => navigate(t.id)} className={`flex-1 flex flex-col items-center gap-0.5 py-2.5 transition-colors ${screen===t.id?"text-nn-orange":"text-gray-600"}`}>
              <Icon name={t.icon} size={20} />
              <span className="text-xs font-roboto">{t.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
