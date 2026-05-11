import { useState } from "react";
import Icon from "@/components/ui/icon";

type Section =
  | "home"
  | "teams"
  | "leaderboard"
  | "tournaments"
  | "training"
  | "rules"
  | "news"
  | "contacts";

const HERO_IMG =
  "https://cdn.poehali.dev/projects/23a6f0fa-85b1-41ff-85d1-82ac28a5e96b/files/1c2fcf01-2ee7-42ec-a87d-44fae31519e8.jpg";
const TEAM_IMG =
  "https://cdn.poehali.dev/projects/23a6f0fa-85b1-41ff-85d1-82ac28a5e96b/files/808c46b1-afa0-4676-bbf9-7378df0e97b3.jpg";
const TROPHY_IMG =
  "https://cdn.poehali.dev/projects/23a6f0fa-85b1-41ff-85d1-82ac28a5e96b/files/ef302cf7-699e-4058-9f01-4f67fa25fa89.jpg";

const NAV_ITEMS: { id: Section; label: string; icon: string }[] = [
  { id: "home", label: "Главная", icon: "Home" },
  { id: "teams", label: "Команды", icon: "Users" },
  { id: "leaderboard", label: "Рейтинг", icon: "Trophy" },
  { id: "tournaments", label: "Турниры", icon: "Calendar" },
  { id: "training", label: "Обучение", icon: "BookOpen" },
  { id: "rules", label: "Правила", icon: "FileText" },
  { id: "news", label: "Новости", icon: "Newspaper" },
  { id: "contacts", label: "Контакты", icon: "Mail" },
];

const TEAMS = [
  { id: 1, name: "Молния", city: "Москва", players: 8, wins: 14, img: TEAM_IMG, color: "#FF6B00" },
  { id: 2, name: "Буря", city: "Казань", players: 7, wins: 11, img: TEAM_IMG, color: "#00E676" },
  { id: 3, name: "Торнадо", city: "Екатеринбург", players: 9, wins: 9, img: TEAM_IMG, color: "#2196F3" },
  { id: 4, name: "Ракета", city: "Новосибирск", players: 6, wins: 7, img: TEAM_IMG, color: "#E91E63" },
];

const PLAYERS = [
  { rank: 1, name: "Артём Волков", team: "Молния", goals: 34, assists: 18, matches: 22, avg: 9.4 },
  { rank: 2, name: "Денис Краснов", team: "Буря", goals: 28, assists: 22, matches: 20, avg: 9.1 },
  { rank: 3, name: "Максим Орлов", team: "Торнадо", goals: 25, assists: 15, matches: 21, avg: 8.8 },
  { rank: 4, name: "Илья Соколов", team: "Ракета", goals: 22, assists: 19, matches: 19, avg: 8.5 },
  { rank: 5, name: "Роман Лебедев", team: "Молния", goals: 20, assists: 24, matches: 22, avg: 8.2 },
];

const TOURNAMENTS = [
  { id: 1, name: "Кубок Весны 2026", date: "15 мая – 1 июня", teams: 16, prize: "150 000 ₽", status: "active", city: "Москва" },
  { id: 2, name: "Чемпионат Поволжья", date: "20 июня – 10 июля", teams: 24, prize: "300 000 ₽", status: "upcoming", city: "Казань" },
  { id: 3, name: "Ночная Лига", date: "5–25 августа", teams: 12, prize: "80 000 ₽", status: "upcoming", city: "Екатеринбург" },
  { id: 4, name: "Зимний Кубок 2025", date: "Декабрь 2025", teams: 20, prize: "200 000 ₽", status: "finished", city: "Новосибирск" },
];

const NEWS = [
  { id: 1, title: "Молния выиграла региональный чемпионат с разницей в 7 голов", date: "10 мая 2026", tag: "Результаты", img: HERO_IMG },
  { id: 2, title: "Открыта регистрация на Кубок Весны — участвуй уже сейчас!", date: "8 мая 2026", tag: "Турниры", img: TROPHY_IMG },
  { id: 3, title: "Новое обучающее видео: защитные построения в микрофутзале", date: "5 мая 2026", tag: "Обучение", img: TEAM_IMG },
  { id: 4, title: "Интервью с лучшим игроком сезона Артёмом Волковым", date: "3 мая 2026", tag: "Интервью", img: TEAM_IMG },
];

const LESSONS = [
  { id: 1, title: "Основы техники паса", duration: "12 мин", level: "Новичок" },
  { id: 2, title: "Тактика прессинга 2-2", duration: "18 мин", level: "Средний" },
  { id: 3, title: "Удар с разворота", duration: "15 мин", level: "Продвинутый" },
  { id: 4, title: "Позиционная защита", duration: "20 мин", level: "Средний" },
  { id: 5, title: "Игра вратаря", duration: "25 мин", level: "Продвинутый" },
  { id: 6, title: "Стандартные положения", duration: "14 мин", level: "Новичок" },
];

const RULES = [
  { title: "Состав команды", icon: "Users", text: "Команда состоит из 5 игроков на поле (включая вратаря) и до 3 запасных. Разрешены неограниченные замены во время остановок игры." },
  { title: "Площадка", icon: "Map", text: "Игра проводится на площадке 20×40 метров с искусственным или натуральным покрытием. Ворота 2×3 метра." },
  { title: "Мяч", icon: "Circle", text: "Используется мяч размера 4 с пониженным отскоком. Вес мяча 400–440 граммов." },
  { title: "Время игры", icon: "Clock", text: "Два тайма по 20 минут чистого времени. Перерыв 10 минут. При ничьей — дополнительное время и серия пенальти." },
  { title: "Нарушения", icon: "AlertTriangle", text: "Накопленные фолы (более 5 в тайме) приводят к пенальти-удару без стенки. Прямое удаление за опасную игру." },
  { title: "Аут и угловой", icon: "CornerUpRight", text: "При выходе мяча в аут — удар ногой с боковой линии (не руками). Угловые удары выполняются с угла площадки." },
];

function StatCard({ value, label, icon }: { value: string; label: string; icon: string }) {
  return (
    <div className="bg-card-custom rounded-xl p-6 text-center sport-card">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-orange-neon/10 mb-4">
        <Icon name={icon} size={22} className="text-orange-neon" />
      </div>
      <div className="font-oswald text-3xl font-bold neon-orange mb-1">{value}</div>
      <div className="text-gray-400 text-sm font-roboto">{label}</div>
    </div>
  );
}

function SectionHeader({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="mb-10 animate-fadeInUp">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-8 h-1 bg-orange-neon rounded-full" />
        <span className="text-orange-neon font-oswald text-sm uppercase tracking-widest">{sub || "Микрофутзал"}</span>
      </div>
      <h2 className="font-oswald text-4xl md:text-5xl font-bold text-white uppercase">{title}</h2>
    </div>
  );
}

function HomeSection({ navigate }: { navigate: (s: Section) => void }) {
  return (
    <div>
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden -mt-16">
        <img src={HERO_IMG} alt="Микрофутзал" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0d12]/60 via-[#0a0d12]/40 to-[#0a0d12]" />
        <div className="absolute inset-0 stripe-pattern" />
        <div className="relative z-10 text-center px-6 pt-20">
          <div className="inline-block bg-orange-neon/10 border border-orange-neon/30 rounded-full px-4 py-1 mb-6 animate-fadeIn">
            <span className="font-oswald text-orange-neon text-sm uppercase tracking-widest">Официальный портал</span>
          </div>
          <h1 className="font-oswald text-5xl md:text-8xl font-bold text-white uppercase leading-none mb-4 animate-fadeInUp text-glow-orange">
            МИКРО<br /><span className="neon-orange">ФУТЗАЛ</span>
          </h1>
          <p className="font-roboto text-gray-300 text-xl max-w-2xl mx-auto mb-10 animate-fadeInUp delay-200">
            Самый динамичный командный спорт. Присоединяйся к лиге, создавай команду и борись за чемпионство!
          </p>
          <div className="flex flex-wrap gap-4 justify-center animate-fadeInUp delay-300">
            <button onClick={() => navigate("teams")} className="btn-primary px-8 py-4 rounded-lg text-base">
              Зарегистрировать команду
            </button>
            <button onClick={() => navigate("tournaments")} className="btn-outline px-8 py-4 rounded-lg text-base">
              Смотреть турниры
            </button>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fadeIn delay-600">
          <span className="text-gray-500 text-xs font-roboto uppercase tracking-widest">Листай вниз</span>
          <Icon name="ChevronDown" size={20} className="text-orange-neon animate-bounce" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          <StatCard value="48" label="Активных команд" icon="Users" />
          <StatCard value="312" label="Игроков" icon="User" />
          <StatCard value="6" label="Турниров в год" icon="Trophy" />
          <StatCard value="12" label="Городов" icon="MapPin" />
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {[
            { icon: "Users", title: "Команды и профили", text: "Создай профиль команды, добавляй игроков и управляй составом прямо на платформе.", action: "teams" },
            { icon: "Trophy", title: "Турниры и кубки", text: "Участвуй в региональных и национальных соревнованиях с призовым фондом.", action: "tournaments" },
            { icon: "BookOpen", title: "Обучение", text: "Видео-уроки от профессиональных тренеров для всех уровней подготовки.", action: "training" },
          ].map((f, i) => (
            <div
              key={f.title}
              className="bg-card-custom rounded-2xl p-8 sport-card cursor-pointer animate-fadeInUp"
              style={{ animationDelay: `${i * 0.15}s` }}
              onClick={() => navigate(f.action as Section)}
            >
              <div className="w-14 h-14 rounded-xl bg-orange-neon/10 flex items-center justify-center mb-6">
                <Icon name={f.icon} size={28} className="text-orange-neon" />
              </div>
              <h3 className="font-oswald text-2xl font-bold text-white mb-3">{f.title}</h3>
              <p className="font-roboto text-gray-400 leading-relaxed">{f.text}</p>
              <div className="mt-6 flex items-center gap-2 text-orange-neon font-oswald text-sm uppercase tracking-wider">
                Подробнее <Icon name="ArrowRight" size={16} />
              </div>
            </div>
          ))}
        </div>

        <SectionHeader title="Последние новости" sub="Свежее" />
        <div className="grid md:grid-cols-2 gap-4">
          {NEWS.slice(0, 2).map((n) => (
            <div key={n.id} className="bg-card-custom rounded-xl overflow-hidden sport-card cursor-pointer" onClick={() => navigate("news")}>
              <div className="relative h-48">
                <img src={n.img} alt={n.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111620] to-transparent" />
                <span className="absolute top-3 left-3 bg-orange-neon text-white text-xs font-oswald uppercase px-3 py-1 rounded-full">{n.tag}</span>
              </div>
              <div className="p-5">
                <p className="text-gray-400 text-xs mb-2 font-roboto">{n.date}</p>
                <h4 className="font-oswald text-lg font-semibold text-white leading-snug">{n.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TeamsSection() {
  const [tab, setTab] = useState<"teams" | "register">("teams");
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <SectionHeader title="Команды и игроки" sub="Участники" />
      <div className="flex gap-2 mb-8">
        {(["teams", "register"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-6 py-2 rounded-lg font-oswald text-sm uppercase tracking-wider transition-all ${tab === t ? "bg-orange-neon text-white" : "border border-[#1e2535] text-gray-400 hover:text-white"}`}
          >
            {t === "teams" ? "Команды" : "Регистрация"}
          </button>
        ))}
      </div>

      {tab === "teams" && (
        <div className="grid md:grid-cols-2 gap-6">
          {TEAMS.map((team, i) => (
            <div key={team.id} className="bg-card-custom rounded-2xl overflow-hidden sport-card animate-fadeInUp" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="relative h-40">
                <img src={team.img} alt={team.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111620] via-[#111620]/60 to-transparent" />
                <div className="absolute top-4 right-4 w-3 h-3 rounded-full" style={{ background: team.color, boxShadow: `0 0 10px ${team.color}` }} />
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-oswald text-2xl font-bold text-white">{team.name}</h3>
                    <div className="flex items-center gap-1 text-gray-400 text-sm font-roboto mt-1">
                      <Icon name="MapPin" size={14} /> {team.city}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-oswald text-xl font-bold" style={{ color: team.color }}>{team.wins}</div>
                    <div className="text-gray-500 text-xs font-roboto">победы</div>
                  </div>
                </div>
                <div className="flex gap-4 items-center">
                  <div className="bg-secondary/50 rounded-lg px-3 py-2 flex items-center gap-2">
                    <Icon name="Users" size={14} className="text-gray-400" />
                    <span className="font-roboto text-sm text-gray-300">{team.players} игроков</span>
                  </div>
                  <button className="btn-outline px-4 py-2 rounded-lg text-xs ml-auto">Профиль</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "register" && (
        <div className="max-w-2xl">
          <div className="bg-card-custom rounded-2xl p-8 animate-fadeInUp">
            <h3 className="font-oswald text-2xl font-bold text-white mb-6">Регистрация команды</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-400 text-sm font-roboto mb-2">Название команды *</label>
                <input type="text" placeholder="Например: Стрела" className="w-full bg-secondary border border-[#1e2535] rounded-lg px-4 py-3 text-white font-roboto placeholder-gray-600 focus:outline-none focus:border-orange-neon transition-colors" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 text-sm font-roboto mb-2">Город *</label>
                  <input type="text" placeholder="Ваш город" className="w-full bg-secondary border border-[#1e2535] rounded-lg px-4 py-3 text-white font-roboto placeholder-gray-600 focus:outline-none focus:border-orange-neon transition-colors" />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm font-roboto mb-2">Количество игроков</label>
                  <input type="number" placeholder="5–10" min={5} max={10} className="w-full bg-secondary border border-[#1e2535] rounded-lg px-4 py-3 text-white font-roboto placeholder-gray-600 focus:outline-none focus:border-orange-neon transition-colors" />
                </div>
              </div>
              <div>
                <label className="block text-gray-400 text-sm font-roboto mb-2">Имя капитана *</label>
                <input type="text" placeholder="Полное имя" className="w-full bg-secondary border border-[#1e2535] rounded-lg px-4 py-3 text-white font-roboto placeholder-gray-600 focus:outline-none focus:border-orange-neon transition-colors" />
              </div>
              <div>
                <label className="block text-gray-400 text-sm font-roboto mb-2">Контактный email *</label>
                <input type="email" placeholder="captain@email.com" className="w-full bg-secondary border border-[#1e2535] rounded-lg px-4 py-3 text-white font-roboto placeholder-gray-600 focus:outline-none focus:border-orange-neon transition-colors" />
              </div>
              <div>
                <label className="block text-gray-400 text-sm font-roboto mb-2">Телефон</label>
                <input type="tel" placeholder="+7 (___) ___-__-__" className="w-full bg-secondary border border-[#1e2535] rounded-lg px-4 py-3 text-white font-roboto placeholder-gray-600 focus:outline-none focus:border-orange-neon transition-colors" />
              </div>
              <button className="btn-primary w-full py-4 rounded-lg text-base mt-2">Зарегистрировать команду</button>
              <p className="text-gray-500 text-xs font-roboto text-center">Нажимая кнопку, вы соглашаетесь с правилами лиги</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function LeaderboardSection() {
  const podiumOrder = [1, 0, 2];
  const podiumMedals = ["🥈", "🥇", "🥉"];
  const podiumHeights = ["h-28", "h-36", "h-24"];
  const podiumColors = [
    "linear-gradient(to top, #C0C0C0, #A0A0A0)",
    "linear-gradient(to top, #FFD700, #FFA500)",
    "linear-gradient(to top, #CD7F32, #A05020)",
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <SectionHeader title="Таблица лидеров" sub="Рейтинг" />
      <div className="grid grid-cols-3 gap-4 mb-10 max-w-2xl mx-auto">
        {podiumOrder.map((playerIdx, colIdx) => {
          const p = PLAYERS[playerIdx];
          return (
            <div key={p.rank} className={`flex flex-col items-center ${colIdx === 0 ? "mt-8" : colIdx === 2 ? "mt-12" : ""}`}>
              <div className="text-3xl mb-2">{podiumMedals[colIdx]}</div>
              <div className="font-oswald text-sm text-white text-center font-bold">{p.name.split(" ")[0]}</div>
              <div className="text-gray-400 text-xs font-roboto mb-2">{p.goals} голов</div>
              <div className={`w-full ${podiumHeights[colIdx]} rounded-t-lg flex items-center justify-center`} style={{ background: podiumColors[colIdx] }}>
                <span className="font-oswald text-3xl font-bold text-white">{playerIdx + 1}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-card-custom rounded-2xl overflow-hidden leader-table">
        <div className="grid grid-cols-6 gap-4 px-6 py-3 bg-secondary/50 text-gray-400 text-xs font-oswald uppercase tracking-widest">
          <div>#</div>
          <div className="col-span-2">Игрок</div>
          <div className="text-center">Голы</div>
          <div className="text-center">Передачи</div>
          <div className="text-center">Рейтинг</div>
        </div>
        {PLAYERS.map((p, i) => (
          <div key={p.rank} className="grid grid-cols-6 gap-4 px-6 py-4 items-center border-t border-[#1e2535] hover:bg-secondary/30 transition-colors animate-fadeInUp" style={{ animationDelay: `${i * 0.08}s` }}>
            <div>
              <span className={`rank-badge inline-flex w-8 h-8 rounded-full items-center justify-center text-white font-oswald font-bold text-sm ${p.rank > 3 ? "bg-secondary" : ""}`}>{p.rank}</span>
            </div>
            <div className="col-span-2">
              <div className="font-oswald text-white font-semibold">{p.name}</div>
              <div className="text-gray-400 text-xs font-roboto flex items-center gap-1">
                <Icon name="Shield" size={10} /> {p.team}
              </div>
            </div>
            <div className="text-center font-oswald font-bold text-orange-neon text-lg">{p.goals}</div>
            <div className="text-center font-oswald text-gray-300">{p.assists}</div>
            <div className="text-center">
              <span className="bg-green-neon/10 text-green-neon font-oswald font-bold px-3 py-1 rounded-full text-sm">{p.avg}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TournamentsSection() {
  const statusMap: Record<string, { label: string; color: string }> = {
    active: { label: "Идёт", color: "text-green-neon bg-green-neon/10" },
    upcoming: { label: "Скоро", color: "text-orange-neon bg-orange-neon/10" },
    finished: { label: "Завершён", color: "text-gray-400 bg-secondary" },
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <SectionHeader title="Турниры и соревнования" sub="Расписание" />
      <div className="relative h-64 rounded-2xl overflow-hidden mb-10">
        <img src={TROPHY_IMG} alt="Кубок" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0d12] via-[#0a0d12]/60 to-transparent" />
        <div className="absolute inset-0 flex items-center px-10">
          <div>
            <div className="text-orange-neon font-oswald text-sm uppercase tracking-widest mb-2">Главный приз сезона</div>
            <h3 className="font-oswald text-4xl font-bold text-white mb-3">Кубок Весны 2026</h3>
            <div className="flex items-center gap-4">
              <span className="bg-orange-neon text-white font-oswald text-xs uppercase px-3 py-1 rounded-full">Идёт регистрация</span>
              <span className="text-gray-300 font-roboto text-sm">15 мая — 1 июня</span>
            </div>
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {TOURNAMENTS.map((t, i) => {
          const st = statusMap[t.status];
          return (
            <div key={t.id} className="bg-card-custom rounded-2xl p-6 sport-card animate-fadeInUp" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-oswald text-xl font-bold text-white">{t.name}</h3>
                <span className={`text-xs font-oswald uppercase px-3 py-1 rounded-full ${st.color}`}>{st.label}</span>
              </div>
              <div className="space-y-2 mb-5">
                <div className="flex items-center gap-2 text-gray-400 text-sm font-roboto"><Icon name="Calendar" size={14} className="text-orange-neon" />{t.date}</div>
                <div className="flex items-center gap-2 text-gray-400 text-sm font-roboto"><Icon name="MapPin" size={14} className="text-orange-neon" />{t.city}</div>
                <div className="flex items-center gap-2 text-gray-400 text-sm font-roboto"><Icon name="Users" size={14} className="text-orange-neon" />{t.teams} команд</div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-gray-500 text-xs font-roboto">Призовой фонд</div>
                  <div className="font-oswald text-xl font-bold neon-orange">{t.prize}</div>
                </div>
                {t.status !== "finished" && <button className="btn-primary px-5 py-2 rounded-lg text-sm">Участвовать</button>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TrainingSection() {
  const levelColors: Record<string, string> = {
    "Новичок": "text-green-neon bg-green-neon/10",
    "Средний": "text-yellow-400 bg-yellow-400/10",
    "Продвинутый": "text-orange-neon bg-orange-neon/10",
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <SectionHeader title="Обучающие материалы" sub="Обучение" />
      <div className="relative h-72 rounded-2xl overflow-hidden mb-10 cursor-pointer sport-card">
        <img src={TEAM_IMG} alt="Видеоурок" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0d12]/90 to-[#0a0d12]/20" />
        <div className="absolute inset-0 flex items-center px-10">
          <div className="max-w-md">
            <span className="text-orange-neon font-oswald text-xs uppercase tracking-widest">Рекомендуемое</span>
            <h3 className="font-oswald text-3xl font-bold text-white my-3">Мастер-класс: Тактика атаки в микрофутзале</h3>
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-orange-neon flex items-center justify-center glow-orange cursor-pointer hover:scale-110 transition-transform">
                <Icon name="Play" size={24} className="text-white ml-1" />
              </div>
              <div>
                <div className="text-white font-roboto font-medium">32 минуты</div>
                <div className="text-gray-400 text-sm font-roboto">Профессиональный уровень</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {LESSONS.map((l, i) => (
          <div key={l.id} className="bg-card-custom rounded-xl p-5 sport-card cursor-pointer animate-fadeInUp" style={{ animationDelay: `${i * 0.08}s` }}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-orange-neon/10 flex items-center justify-center flex-shrink-0 hover:bg-orange-neon transition-colors group cursor-pointer">
                <Icon name="Play" size={18} className="text-orange-neon group-hover:text-white ml-0.5" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-oswald text-base font-semibold text-white truncate">{l.title}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-oswald ${levelColors[l.level]}`}>{l.level}</span>
                  <span className="text-gray-500 text-xs font-roboto">{l.duration}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RulesSection() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <SectionHeader title="Правила игры" sub="Регламент" />
      <div className="bg-orange-neon/5 border border-orange-neon/20 rounded-2xl p-6 mb-10 flex items-start gap-4 animate-fadeIn">
        <Icon name="Info" size={22} className="text-orange-neon flex-shrink-0 mt-0.5" />
        <p className="font-roboto text-gray-300 leading-relaxed">
          Микрофутзал — это адаптированная версия футзала для небольших площадок. Ниже представлены основные правила лиги. За полным регламентом обращайтесь в организационный комитет.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {RULES.map((r, i) => (
          <div key={r.title} className="bg-card-custom rounded-2xl p-6 sport-card animate-fadeInUp" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-orange-neon/10 flex items-center justify-center">
                <Icon name={r.icon} size={22} className="text-orange-neon" fallback="Circle" />
              </div>
              <h3 className="font-oswald text-xl font-bold text-white">{r.title}</h3>
            </div>
            <p className="font-roboto text-gray-400 leading-relaxed text-sm">{r.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function NewsSection() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <SectionHeader title="Новости региона" sub="Актуально" />
      <div className="grid md:grid-cols-2 gap-6">
        {NEWS.map((n, i) => (
          <div key={n.id} className={`bg-card-custom rounded-2xl overflow-hidden sport-card cursor-pointer animate-fadeInUp ${i === 0 ? "md:col-span-2" : ""}`} style={{ animationDelay: `${i * 0.1}s` }}>
            <div className={`relative ${i === 0 ? "h-64" : "h-48"}`}>
              <img src={n.img} alt={n.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111620] to-transparent" />
              <span className="absolute top-4 left-4 bg-orange-neon text-white text-xs font-oswald uppercase px-3 py-1 rounded-full">{n.tag}</span>
            </div>
            <div className="p-6">
              <p className="text-gray-400 text-xs mb-2 font-roboto flex items-center gap-1">
                <Icon name="Clock" size={12} /> {n.date}
              </p>
              <h4 className={`font-oswald font-bold text-white leading-snug ${i === 0 ? "text-2xl" : "text-lg"}`}>{n.title}</h4>
              {i === 0 && <button className="btn-outline mt-4 px-5 py-2 rounded-lg text-sm">Читать полностью</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactsSection() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <SectionHeader title="Контакты" sub="Связь с нами" />
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          {[
            { icon: "MapPin", title: "Адрес офиса", value: "г. Москва, ул. Спортивная, 12, оф. 304" },
            { icon: "Phone", title: "Телефон", value: "+7 (495) 123-45-67" },
            { icon: "Mail", title: "Email", value: "info@microfutsal.ru" },
            { icon: "Clock", title: "Режим работы", value: "Пн–Пт: 9:00–18:00, Сб: 10:00–15:00" },
          ].map((c, i) => (
            <div key={c.title} className="bg-card-custom rounded-xl p-5 flex items-center gap-4 sport-card animate-fadeInUp" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="w-12 h-12 rounded-xl bg-orange-neon/10 flex items-center justify-center flex-shrink-0">
                <Icon name={c.icon} size={20} className="text-orange-neon" />
              </div>
              <div>
                <div className="text-gray-400 text-xs font-roboto mb-0.5">{c.title}</div>
                <div className="text-white font-roboto font-medium">{c.value}</div>
              </div>
            </div>
          ))}
          <div className="bg-card-custom rounded-xl p-5 animate-fadeInUp delay-400">
            <div className="text-gray-400 text-xs font-roboto mb-3">Соцсети</div>
            <div className="flex gap-3">
              {[
                { icon: "Send", label: "Telegram" },
                { icon: "MessageCircle", label: "VK" },
                { icon: "Youtube", label: "YouTube" },
              ].map(({ icon, label }) => (
                <button key={icon} className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-orange-neon transition-colors" title={label}>
                  <Icon name={icon} size={18} className="text-gray-300" fallback="Share2" />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-card-custom rounded-2xl p-8 animate-fadeInUp delay-200">
          <h3 className="font-oswald text-2xl font-bold text-white mb-6">Обратная связь</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400 text-sm font-roboto mb-2">Имя</label>
                <input type="text" placeholder="Ваше имя" className="w-full bg-secondary border border-[#1e2535] rounded-lg px-4 py-3 text-white font-roboto placeholder-gray-600 focus:outline-none focus:border-orange-neon transition-colors" />
              </div>
              <div>
                <label className="block text-gray-400 text-sm font-roboto mb-2">Email</label>
                <input type="email" placeholder="email@example.com" className="w-full bg-secondary border border-[#1e2535] rounded-lg px-4 py-3 text-white font-roboto placeholder-gray-600 focus:outline-none focus:border-orange-neon transition-colors" />
              </div>
            </div>
            <div>
              <label className="block text-gray-400 text-sm font-roboto mb-2">Тема</label>
              <input type="text" placeholder="Тема обращения" className="w-full bg-secondary border border-[#1e2535] rounded-lg px-4 py-3 text-white font-roboto placeholder-gray-600 focus:outline-none focus:border-orange-neon transition-colors" />
            </div>
            <div>
              <label className="block text-gray-400 text-sm font-roboto mb-2">Сообщение</label>
              <textarea rows={5} placeholder="Ваше сообщение..." className="w-full bg-secondary border border-[#1e2535] rounded-lg px-4 py-3 text-white font-roboto placeholder-gray-600 focus:outline-none focus:border-orange-neon transition-colors resize-none" />
            </div>
            <button className="btn-primary w-full py-4 rounded-lg text-base">Отправить сообщение</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Index() {
  const [active, setActive] = useState<Section>("home");
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = (s: Section) => {
    setActive(s);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderSection = () => {
    switch (active) {
      case "home": return <HomeSection navigate={navigate} />;
      case "teams": return <TeamsSection />;
      case "leaderboard": return <LeaderboardSection />;
      case "tournaments": return <TournamentsSection />;
      case "training": return <TrainingSection />;
      case "rules": return <RulesSection />;
      case "news": return <NewsSection />;
      case "contacts": return <ContactsSection />;
    }
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--dark-bg)" }}>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0d12]/90 backdrop-blur-md border-b border-[#1e2535]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => navigate("home")} className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-neon rounded-lg flex items-center justify-center glow-orange">
              <span className="font-oswald font-bold text-white text-sm">МФ</span>
            </div>
            <span className="font-oswald font-bold text-white text-lg hidden sm:block">МИКРО<span className="text-orange-neon">ФУТЗАЛ</span></span>
          </button>

          <div className="hidden lg:flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(item.id)}
                className={`nav-link font-oswald text-sm uppercase tracking-wider transition-colors ${active === item.id ? "text-orange-neon active" : "text-gray-400 hover:text-white"}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => navigate("teams")} className="hidden md:block btn-primary px-5 py-2 rounded-lg text-sm">
              Войти
            </button>
            <button className="lg:hidden w-9 h-9 flex items-center justify-center" onClick={() => setMenuOpen(!menuOpen)}>
              <Icon name={menuOpen ? "X" : "Menu"} size={22} className="text-white" />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="lg:hidden border-t border-[#1e2535] bg-[#0a0d12] animate-fade-in">
            <div className="max-w-7xl mx-auto px-6 py-4 space-y-1">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => navigate(item.id)}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg font-oswald text-sm uppercase tracking-wider transition-colors ${active === item.id ? "bg-orange-neon/10 text-orange-neon" : "text-gray-400 hover:text-white hover:bg-secondary"}`}
                >
                  <Icon name={item.icon} size={16} />
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      <main className={active !== "home" ? "pt-16" : ""}>
        {renderSection()}
      </main>

      <footer className="border-t border-[#1e2535] mt-10">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-orange-neon rounded-lg flex items-center justify-center">
              <span className="font-oswald font-bold text-white text-xs">МФ</span>
            </div>
            <span className="font-oswald font-bold text-white">МИКРО<span className="text-orange-neon">ФУТЗАЛ</span></span>
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            {NAV_ITEMS.map((item) => (
              <button key={item.id} onClick={() => navigate(item.id)} className="text-gray-500 hover:text-orange-neon font-roboto text-sm transition-colors">
                {item.label}
              </button>
            ))}
          </div>
          <div className="text-gray-600 text-sm font-roboto">© 2026 МикроФутзал</div>
        </div>
      </footer>
    </div>
  );
}
