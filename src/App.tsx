import { useState, type KeyboardEvent, type ReactNode } from "react";

type IconName =
  | "activity"
  | "arrow"
  | "bell"
  | "call"
  | "chevron"
  | "clock"
  | "device"
  | "grid"
  | "link"
  | "message"
  | "more"
  | "people"
  | "phone"
  | "search"
  | "send"
  | "settings"
  | "shield"
  | "signal"
  | "sim"
  | "sync"
  | "wifi";

const iconPaths: Record<IconName, ReactNode> = {
  activity: <path d="M3 12h4l2.4-6 4.2 12 2.8-6H21" />,
  arrow: <path d="m9 18 6-6-6-6" />,
  bell: <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" />,
  call: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2.1Z" />,
  chevron: <path d="m6 9 6 6 6-6" />,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  device: <><rect x="6" y="2" width="12" height="20" rx="2" /><path d="M10 18h4" /></>,
  grid: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
  link: <><path d="M10 13a5 5 0 0 0 7.1.1l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1" /><path d="M14 11a5 5 0 0 0-7.1-.1l-2 2A5 5 0 0 0 12 20l1.1-1.1" /></>,
  message: <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z" />,
  more: <><circle cx="5" cy="12" r="1" fill="currentColor" /><circle cx="12" cy="12" r="1" fill="currentColor" /><circle cx="19" cy="12" r="1" fill="currentColor" /></>,
  people: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" /></>,
  phone: <><rect x="5" y="2" width="14" height="20" rx="3" /><path d="M10 18h4" /></>,
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
  send: <path d="m22 2-7 20-4-9-9-4Z M22 2 11 13" />,
  settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-1.6v-.2h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z" /></>,
  shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z M9 12l2 2 4-4" />,
  signal: <path d="M4 20v-3M9 20v-7M14 20v-11M19 20V5" />,
  sim: <path d="M6 2h9l4 4v16H6Z M9 11h6v7H9Z" />,
  sync: <><path d="M20 7h-5V2" /><path d="M20 7a8 8 0 1 0 1 7M4 17h5v5" /></>,
  wifi: <><path d="M5 12.6a10 10 0 0 1 14 0M2 9.2a15 15 0 0 1 20 0M8.5 16a5 5 0 0 1 7 0" /><circle cx="12" cy="20" r="1" fill="currentColor" /></>,
};

function Icon({ name, size = "md" }: { name: IconName; size?: "sm" | "md" | "lg" }) {
  const sizeClass = size === "sm" ? "size-4" : size === "lg" ? "size-7" : "size-5";
  return <svg className={sizeClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{iconPaths[name]}</svg>;
}

function Action({
  children,
  className = "",
  onClick,
  label,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  label?: string;
}) {
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if ((event.key === "Enter" || event.key === " ") && onClick) {
      event.preventDefault();
      onClick();
    }
  };
  return (
    <div role="button" tabIndex={0} aria-label={label} onClick={onClick} onKeyDown={handleKeyDown} className={`select-none cursor-pointer ${className}`}>
      {children}
    </div>
  );
}

const navItems: { label: string; icon: IconName }[] = [
  { label: "Kontrol Merkezi", icon: "grid" },
  { label: "Aramalar", icon: "call" },
  { label: "Mesajlar", icon: "message" },
  { label: "Kişiler", icon: "people" },
  { label: "Cihazlar", icon: "device" },
];

const activities = [
  { name: "Ayşe Demir", detail: "Gelen arama", time: "2 dk önce", icon: "call" as IconName, color: "bg-[#dfff51] text-[#101c2a]" },
  { name: "Kerem Yılmaz", detail: "Mesaj gönderildi", time: "18 dk önce", icon: "message" as IconName, color: "bg-[#d7e5ff] text-[#183764]" },
  { name: "+90 532 441 08 12", detail: "Cevapsız arama", time: "42 dk önce", icon: "call" as IconName, color: "bg-[#ffe0da] text-[#8c3228]" },
];

const callRecords = [
  { name: "Ayşe Demir", initials: "AD", number: "+90 532 245 18 62", type: "Gelen", date: "Bugün, 10:42", duration: "04:18", color: "bg-[#ead7ff] text-[#5d347a]" },
  { name: "Mert Kaya", initials: "MK", number: "+90 555 901 32 10", type: "Giden", date: "Bugün, 09:16", duration: "01:47", color: "bg-[#d7e5ff] text-[#274f7d]" },
  { name: "+90 532 441 08 12", initials: "?", number: "Kayıtlı olmayan numara", type: "Cevapsız", date: "Bugün, 08:34", duration: "—", color: "bg-[#ffe0da] text-[#8c3228]" },
  { name: "Selin Aksoy", initials: "SA", number: "+90 542 774 03 21", type: "Gelen", date: "Dün, 21:08", duration: "12:05", color: "bg-[#f1d0bd] text-[#66351d]" },
  { name: "Kerem Yılmaz", initials: "KY", number: "+90 505 312 77 14", type: "Giden", date: "Dün, 18:22", duration: "02:36", color: "bg-[#d8efd9] text-[#285b32]" },
  { name: "Ofis", initials: "OF", number: "+90 212 334 19 40", type: "Giden", date: "Dün, 14:11", duration: "08:52", color: "bg-[#fff0bd] text-[#76550c]" },
];

function CallsView({ onCall }: { onCall: (name: string) => void }) {
  const [filter, setFilter] = useState("Tümü");
  const filters = ["Tümü", "Gelen", "Giden", "Cevapsız"];
  const visibleCalls = filter === "Tümü" ? callRecords : callRecords.filter((call) => call.type === filter);

  return (
    <div className="p-5 md:p-8">
      <div className="mb-7 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            <span className="h-px w-5 bg-slate-400" /> İletişim merkezi
          </div>
          <p className="font-display text-3xl font-bold tracking-tight md:text-4xl">Aramalar</p>
          <p className="mt-2 text-sm leading-6 text-slate-500">Tüm cihazlardaki aramalarınızı izleyin ve yönetin.</p>
        </div>
        <div className="flex items-center gap-3">
          <Action className="flex items-center gap-2 rounded-xl border border-[#13202e]/10 bg-white px-4 py-3 text-xs font-semibold text-slate-600 shadow-sm">
            <Icon name="clock" size="sm" /> Son 7 gün <Icon name="chevron" size="sm" />
          </Action>
          <Action onClick={() => onCall("Yeni arama")} className="flex items-center gap-2 rounded-xl bg-[#101c2a] px-4 py-3 text-xs font-bold text-white shadow-lg">
            <span className="text-[#dfff51]"><Icon name="call" size="sm" /></span> Yeni arama
          </Action>
        </div>
      </div>

      <div className="mb-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Toplam arama", value: "47", change: "+12%", icon: "call" as IconName, tone: "bg-[#101c2a] text-white", iconTone: "bg-white/10 text-[#dfff51]" },
          { label: "Toplam süre", value: "2s 48dk", change: "+18 dk", icon: "clock" as IconName, tone: "bg-white", iconTone: "bg-[#eef0ec] text-[#243a4f]" },
          { label: "Cevapsız", value: "05", change: "-2 bu hafta", icon: "bell" as IconName, tone: "bg-white", iconTone: "bg-[#ffe0da] text-[#9a3e33]" },
          { label: "Ortalama süre", value: "3:34", change: "+24 sn", icon: "activity" as IconName, tone: "bg-[#dfff51]", iconTone: "bg-[#101c2a] text-[#dfff51]" },
        ].map((stat) => (
          <div key={stat.label} className={`rounded-[22px] border border-[#13202e]/10 p-5 ${stat.tone}`}>
            <div className="mb-5 flex items-start justify-between">
              <span className={`grid size-10 place-items-center rounded-xl ${stat.iconTone}`}><Icon name={stat.icon} size="sm" /></span>
              <span className={`text-[10px] font-bold ${stat.tone.includes("101c2a") ? "text-[#dfff51]" : "text-[#658100]"}`}>{stat.change}</span>
            </div>
            <p className="font-display text-2xl font-bold">{stat.value}</p>
            <p className={`mt-1 text-xs ${stat.tone.includes("101c2a") ? "text-slate-400" : "text-slate-500"}`}>{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_300px]">
        <section className="min-w-0 overflow-hidden rounded-[24px] border border-[#13202e]/10 bg-white">
          <div className="flex flex-col justify-between gap-4 border-b border-[#13202e]/8 p-5 md:flex-row md:items-center md:px-6">
            <div>
              <p className="font-display text-lg font-bold">Arama geçmişi</p>
              <p className="mt-1 text-xs text-slate-500">{visibleCalls.length} kayıt görüntüleniyor</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="mr-1 hidden items-center gap-2 rounded-xl bg-[#f1f3ef] px-3 py-2.5 text-xs text-slate-400 sm:flex">
                <Icon name="search" size="sm" /><span>Geçmişte ara...</span>
              </div>
              <Action className="grid size-10 place-items-center rounded-xl border border-[#13202e]/10 text-slate-500" label="Daha fazla"><Icon name="more" /></Action>
            </div>
          </div>

          <div className="flex gap-1 overflow-x-auto border-b border-[#13202e]/8 px-5 py-3 md:px-6">
            {filters.map((item) => (
              <Action key={item} onClick={() => setFilter(item)} className={`whitespace-nowrap rounded-lg px-3 py-2 text-xs font-semibold transition ${filter === item ? "bg-[#101c2a] text-white" : "text-slate-500 hover:bg-[#f1f3ef]"}`}>
                {item}
                {item === "Cevapsız" && <span className="ml-2 rounded-full bg-[#e45c4c] px-1.5 py-0.5 text-[9px] text-white">5</span>}
              </Action>
            ))}
          </div>

          <div className="divide-y divide-[#13202e]/8">
            {visibleCalls.map((call) => (
              <div key={call.name + call.date} className="group flex items-center gap-3 px-5 py-4 transition hover:bg-[#f8f9f6] md:px-6">
                <div className={`grid size-11 shrink-0 place-items-center rounded-xl text-xs font-bold ${call.color}`}>{call.initials}</div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold">{call.name}</p>
                  <p className="mt-0.5 truncate text-[11px] text-slate-500">{call.number}</p>
                </div>
                <div className="hidden w-24 items-center gap-2 sm:flex">
                  <span className={`grid size-6 place-items-center rounded-lg ${
                    call.type === "Cevapsız" ? "bg-[#ffe0da] text-[#b13d31]" : call.type === "Gelen" ? "bg-[#e6f3d0] text-[#557400]" : "bg-[#dbe8ff] text-[#315983]"
                  }`}>
                    <span className={call.type === "Giden" ? "-rotate-45" : call.type === "Gelen" ? "rotate-[135deg]" : "rotate-[135deg]"}><Icon name="arrow" size="sm" /></span>
                  </span>
                  <span className={`text-[11px] font-semibold ${call.type === "Cevapsız" ? "text-[#b13d31]" : "text-slate-600"}`}>{call.type}</span>
                </div>
                <div className="hidden w-28 md:block">
                  <p className="text-xs font-medium">{call.date}</p>
                  <p className="mt-0.5 text-[10px] text-slate-400">{call.duration}</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <Action onClick={() => onCall(call.name)} className="grid size-9 place-items-center rounded-xl bg-[#eef0ec] text-[#31420b] transition group-hover:bg-[#dfff51]" label={`${call.name} kişisini ara`}><Icon name="call" size="sm" /></Action>
                  <Action className="hidden size-9 place-items-center rounded-xl text-slate-400 hover:bg-slate-100 md:grid" label="Mesaj gönder"><Icon name="message" size="sm" /></Action>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between border-t border-[#13202e]/8 px-5 py-4 md:px-6">
            <p className="text-[11px] text-slate-400">47 kayıttan 6 tanesi</p>
            <div className="flex gap-2">
              <Action className="grid size-8 place-items-center rounded-lg border border-[#13202e]/10 text-slate-300"><span className="rotate-180"><Icon name="arrow" size="sm" /></span></Action>
              <Action className="grid size-8 place-items-center rounded-lg border border-[#13202e]/10 text-slate-600"><Icon name="arrow" size="sm" /></Action>
            </div>
          </div>
        </section>

        <aside className="space-y-5">
          <section className="rounded-[24px] bg-[#101c2a] p-5 text-white">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="font-display text-lg font-bold">Sık arananlar</p>
                <p className="mt-1 text-[11px] text-slate-400">Tek dokunuşla bağlantı</p>
              </div>
              <Icon name="people" />
            </div>
            <div className="space-y-2">
              {callRecords.slice(0, 3).map((person, index) => (
                <Action key={person.name} onClick={() => onCall(person.name)} className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.04] p-3 transition hover:bg-white/10">
                  <span className={`grid size-9 place-items-center rounded-lg text-[10px] font-bold ${person.color}`}>{person.initials}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-xs font-semibold">{person.name}</span>
                    <span className="mt-0.5 block text-[9px] text-slate-500">{index + 3} arama</span>
                  </span>
                  <span className="text-[#dfff51]"><Icon name="call" size="sm" /></span>
                </Action>
              ))}
            </div>
          </section>

          <section className="relative overflow-hidden rounded-[24px] border border-[#13202e]/10 bg-[#dbe8ff] p-5">
            <div className="absolute -right-8 -top-8 size-24 rounded-full border border-[#25456f]/10" />
            <span className="grid size-10 place-items-center rounded-xl bg-white/70 text-[#25456f]"><Icon name="sync" size="sm" /></span>
            <p className="font-display mt-4 text-base font-bold">Geçmiş senkronize</p>
            <p className="mt-1 text-xs leading-5 text-[#4c6482]">Pixel 8 Pro ile tüm aramalar güncel.</p>
            <p className="mt-4 text-[10px] font-semibold text-[#315983]">SON KONTROL · ŞİMDİ</p>
          </section>
        </aside>
      </div>
    </div>
  );
}

export default function App() {
  const [activeNav, setActiveNav] = useState("Aramalar");
  const [deviceRole, setDeviceRole] = useState<"Ana cihaz" | "İkincil cihaz">("Ana cihaz");
  const [dialed, setDialed] = useState("");
  const [callState, setCallState] = useState<"idle" | "calling">("idle");
  const [notice, setNotice] = useState("Tüm sistemler normal çalışıyor");

  const dial = (value: string) => {
    if (dialed.length < 16) setDialed((current) => current + value);
  };

  const startCall = () => {
    if (!dialed) {
      setNotice("Arama için bir numara girin");
      return;
    }
    setCallState("calling");
    setNotice(`${dialed} aranıyor`);
  };

  return (
    <div className="min-h-screen bg-[#eef0ec] text-[#13202e] antialiased">
      <div className="mx-auto flex min-h-screen max-w-[1600px]">
        <aside className="hidden w-64 shrink-0 flex-col bg-[#101c2a] px-5 py-6 text-white lg:flex">
          <div className="mb-10 flex items-center gap-3 px-2">
            <div className="grid size-10 place-items-center rounded-xl bg-[#dfff51] text-[#101c2a] shadow-[0_0_30px_rgba(223,255,81,0.18)]">
              <Icon name="link" />
            </div>
            <div>
              <p className="font-display text-xl font-bold tracking-tight">CallBridge</p>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">Connected mobile</p>
            </div>
          </div>

          <div className="space-y-1.5">
            {navItems.map((item) => (
              <Action
                key={item.label}
                onClick={() => setActiveNav(item.label)}
                className={`flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium transition ${
                  activeNav === item.label ? "bg-white/10 text-white" : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span className={activeNav === item.label ? "text-[#dfff51]" : ""}><Icon name={item.icon} /></span>
                <span className="flex-1">{item.label}</span>
                {item.label === "Mesajlar" && <span className="rounded-full bg-[#dfff51] px-2 py-0.5 text-[10px] font-bold text-[#101c2a]">3</span>}
              </Action>
            ))}
          </div>

          <div className="my-7 h-px bg-white/10" />
          <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">Sistem</p>
          <div className="space-y-1.5">
            <Action onClick={() => setActiveNav("Güvenlik")} className="flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium text-slate-400 transition hover:bg-white/5 hover:text-white"><Icon name="shield" /> Güvenlik</Action>
            <Action onClick={() => setActiveNav("Ayarlar")} className="flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium text-slate-400 transition hover:bg-white/5 hover:text-white"><Icon name="settings" /> Ayarlar</Action>
          </div>

          <div className="mt-auto rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="grid size-8 place-items-center rounded-lg bg-[#dfff51]/15 text-[#dfff51]"><Icon name="shield" size="sm" /></span>
              <span className="flex items-center gap-1.5 text-[10px] font-semibold text-[#dfff51]"><i className="size-1.5 rounded-full bg-[#dfff51]" /> GÜVENLİ</span>
            </div>
            <p className="text-sm font-semibold">Uçtan uca koruma</p>
            <p className="mt-1 text-xs leading-5 text-slate-400">Cihaz bağlantınız şifreleniyor.</p>
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          <header className="flex h-20 items-center justify-between border-b border-[#13202e]/10 bg-[#f7f8f4]/90 px-5 backdrop-blur md:px-8">
            <div className="flex items-center gap-3 lg:hidden">
              <div className="grid size-9 place-items-center rounded-xl bg-[#101c2a] text-[#dfff51]"><Icon name="link" /></div>
              <p className="font-display text-lg font-bold">CallBridge</p>
            </div>
            <div className="hidden items-center gap-2 rounded-xl border border-[#13202e]/10 bg-white px-3 py-2.5 text-sm text-slate-400 md:flex md:w-64">
              <Icon name="search" size="sm" />
              <span>Kişi veya numara ara</span>
              <span className="ml-auto rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold">⌘ K</span>
            </div>
            <div className="ml-auto flex items-center gap-3">
              <div className="hidden items-center gap-2 rounded-full bg-[#dfff51]/40 px-3 py-1.5 text-xs font-semibold text-[#31420b] sm:flex">
                <span className="size-2 rounded-full bg-[#76a400]" /> Ana cihaz çevrimiçi
              </div>
              <Action label="Bildirimler" className="relative grid size-10 place-items-center rounded-xl border border-[#13202e]/10 bg-white text-slate-600">
                <Icon name="bell" />
                <span className="absolute right-2 top-2 size-2 rounded-full border-2 border-white bg-orange-500" />
              </Action>
              <div className="flex items-center gap-2 border-l border-[#13202e]/10 pl-3">
                <div className="grid size-10 place-items-center rounded-xl bg-[#f1d0bd] text-sm font-bold text-[#66351d]">BK</div>
                <div className="hidden xl:block">
                  <p className="text-sm font-semibold">Burak Kaya</p>
                  <p className="text-[11px] text-slate-500">Yönetici</p>
                </div>
                <Icon name="chevron" size="sm" />
              </div>
            </div>
          </header>

          {activeNav === "Aramalar" ? (
            <CallsView onCall={(name) => setNotice(`${name} aranıyor`)} />
          ) : (
          <div className="p-5 md:p-8">
            <div className="mb-7 flex flex-col justify-between gap-5 xl:flex-row xl:items-end">
              <div>
                <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  <span className="h-px w-5 bg-slate-400" /> İletişim merkezi
                </div>
                <p className="font-display text-3xl font-bold tracking-tight md:text-4xl">Günaydın, Burak.</p>
                <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">Telefon hattınız bağlı ve iletişim için hazır. Tüm cihazları tek noktadan yönetin.</p>
              </div>
              <div className="flex w-fit rounded-xl border border-[#13202e]/10 bg-white p-1 shadow-sm">
                {(["Ana cihaz", "İkincil cihaz"] as const).map((role) => (
                  <Action key={role} onClick={() => setDeviceRole(role)} className={`rounded-lg px-4 py-2 text-xs font-semibold transition ${deviceRole === role ? "bg-[#101c2a] text-white" : "text-slate-500"}`}>
                    {role}
                  </Action>
                ))}
              </div>
            </div>

            <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_340px]">
              <div className="min-w-0 space-y-5">
                <section className="relative overflow-hidden rounded-[28px] bg-[#101c2a] p-6 text-white shadow-[0_18px_50px_rgba(16,28,42,0.13)] md:p-7">
                  <div className="absolute -right-20 -top-24 size-72 rounded-full border border-white/10" />
                  <div className="absolute -right-4 -top-10 size-48 rounded-full border border-white/10" />
                  <div className="relative flex flex-col justify-between gap-8 md:flex-row md:items-center">
                    <div>
                      <div className="mb-5 flex items-center gap-2">
                        <span className="flex items-center gap-2 rounded-full bg-[#dfff51]/15 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#dfff51]">
                          <i className="size-1.5 rounded-full bg-[#dfff51] shadow-[0_0_10px_#dfff51]" /> Bağlantı aktif
                        </span>
                        <span className="text-xs text-slate-400">Son senkronizasyon: şimdi</span>
                      </div>
                      <p className="text-sm font-medium text-slate-400">{deviceRole}</p>
                      <p className="font-display mt-1 text-2xl font-bold">Pixel 8 Pro</p>
                      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-300">
                        <span className="flex items-center gap-2"><Icon name="sim" size="sm" /> Turkcell</span>
                        <span className="flex items-center gap-2"><Icon name="signal" size="sm" /> 5G · Güçlü</span>
                        <span className="flex items-center gap-2"><Icon name="wifi" size="sm" /> Wi-Fi</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-5">
                      <div className="relative grid size-24 place-items-center rounded-full border border-white/10 bg-white/[0.04]">
                        <div className="absolute inset-2 rounded-full border-2 border-[#dfff51] border-l-transparent" />
                        <div className="text-center">
                          <p className="font-display text-xl font-bold">89%</p>
                          <p className="text-[9px] uppercase tracking-wider text-slate-400">Batarya</p>
                        </div>
                      </div>
                      <Action onClick={() => setNotice("Cihazlar senkronize edildi")} className="grid size-11 place-items-center rounded-xl border border-white/10 bg-white/5 text-[#dfff51] transition hover:bg-white/10" label="Senkronize et"><Icon name="sync" /></Action>
                    </div>
                  </div>
                </section>

                <div className="grid grid-cols-3 gap-2.5 md:gap-4">
                  {[
                    { label: "Bugünkü aramalar", value: "12", trend: "+8%", icon: "call" as IconName },
                    { label: "Yeni mesajlar", value: "03", trend: "2 okunmamış", icon: "message" as IconName },
                    { label: "Bağlı cihazlar", value: "02", trend: "Tümü aktif", icon: "link" as IconName },
                  ].map((stat) => (
                    <div key={stat.label} className="min-w-0 rounded-xl border border-[#13202e]/10 bg-white p-3 md:rounded-2xl md:p-4">
                      <div className="mb-3 flex items-start justify-between gap-1 md:mb-4">
                        <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-[#eef0ec] text-[#243a4f] md:size-9 md:rounded-xl"><Icon name={stat.icon} size="sm" /></span>
                        <span className="hidden text-[9px] font-semibold text-[#658100] sm:block md:text-[10px]">{stat.trend}</span>
                      </div>
                      <p className="font-display text-xl font-bold md:text-2xl">{stat.value}</p>
                      <p className="mt-1 truncate text-[9px] text-slate-500 sm:text-[10px] md:text-xs">{stat.label}</p>
                    </div>
                  ))}
                </div>

                <section className="rounded-[24px] border border-[#13202e]/10 bg-white p-5 md:p-6">
                  <div className="mb-5 flex items-center justify-between">
                    <div>
                      <p className="font-display text-lg font-bold">Son aktiviteler</p>
                      <p className="mt-1 text-xs text-slate-500">Cihazlar arasındaki son iletişim hareketleri</p>
                    </div>
                    <Action onClick={() => setNotice("Tüm aktiviteler görüntüleniyor")} className="flex items-center gap-1 text-xs font-semibold text-[#516900]">Tümünü gör <Icon name="arrow" size="sm" /></Action>
                  </div>
                  <div className="divide-y divide-[#13202e]/8">
                    {activities.map((activity) => (
                      <div key={activity.name + activity.time} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                        <span className={`grid size-10 shrink-0 place-items-center rounded-xl ${activity.color}`}><Icon name={activity.icon} size="sm" /></span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold">{activity.name}</p>
                          <p className="text-xs text-slate-500">{activity.detail}</p>
                        </div>
                        <span className="text-[11px] text-slate-400">{activity.time}</span>
                        <Action label="Diğer seçenekler" className="text-slate-400"><Icon name="more" /></Action>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <aside className="space-y-5">
                <section className="overflow-hidden rounded-[28px] border border-[#13202e]/10 bg-white shadow-[0_18px_50px_rgba(16,28,42,0.07)]">
                  <div className="border-b border-[#13202e]/8 bg-[#f7f8f4] px-6 py-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-display text-lg font-bold">Hızlı arama</p>
                        <p className="mt-1 text-xs text-slate-500">Ana cihaz üzerinden ara</p>
                      </div>
                      <span className="grid size-10 place-items-center rounded-xl bg-[#101c2a] text-[#dfff51]"><Icon name="phone" /></span>
                    </div>
                  </div>
                  <div className="p-6">
                    {callState === "calling" ? (
                      <div className="flex min-h-[330px] flex-col items-center justify-center text-center">
                        <div className="relative mb-6">
                          <div className="absolute inset-0 animate-ping rounded-full bg-[#dfff51]/30" />
                          <div className="relative grid size-24 place-items-center rounded-full bg-[#101c2a] text-[#dfff51]"><Icon name="call" size="lg" /></div>
                        </div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Aranıyor</p>
                        <p className="font-display mt-2 text-2xl font-bold">{dialed}</p>
                        <Action onClick={() => { setCallState("idle"); setNotice("Arama sonlandırıldı"); }} className="mt-8 grid size-14 place-items-center rounded-full bg-[#e45c4c] text-white shadow-lg" label="Aramayı bitir">
                          <span className="rotate-[135deg]"><Icon name="call" /></span>
                        </Action>
                      </div>
                    ) : (
                      <>
                        <div className="mb-5 flex h-14 items-center justify-between rounded-xl border border-[#13202e]/10 bg-[#f7f8f4] px-4">
                          <span className={`font-display text-xl font-semibold tracking-wide ${dialed ? "text-[#13202e]" : "text-slate-300"}`}>{dialed || "+90 5__ ___ __ __"}</span>
                          {dialed && <Action onClick={() => setDialed((value) => value.slice(0, -1))} className="text-xs font-semibold text-slate-400">SİL</Action>}
                        </div>
                        <div className="grid grid-cols-3 gap-2.5">
                          {["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"].map((key) => (
                            <Action key={key} onClick={() => dial(key)} className="grid h-12 place-items-center rounded-xl bg-[#f1f3ef] font-display text-lg font-semibold transition hover:bg-[#e4e8df]">{key}</Action>
                          ))}
                        </div>
                        <Action onClick={startCall} className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-[#dfff51] py-3.5 text-sm font-bold text-[#101c2a] shadow-[0_10px_24px_rgba(142,173,26,0.2)] transition hover:bg-[#d5f34d]">
                          <Icon name="call" size="sm" /> Aramayı başlat
                        </Action>
                      </>
                    )}
                  </div>
                </section>

                <div className="rounded-2xl border border-[#13202e]/10 bg-[#dbe8ff] p-5">
                  <div className="flex gap-3">
                    <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-white/70 text-[#25456f]"><Icon name="activity" size="sm" /></span>
                    <div>
                      <p className="text-sm font-bold">Sistem durumu</p>
                      <p className="mt-1 text-xs leading-5 text-[#4c6482]">{notice}</p>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
          )}

          <nav className="sticky bottom-0 z-20 flex border-t border-[#13202e]/10 bg-white/95 px-2 py-2 backdrop-blur lg:hidden">
            {navItems.slice(0, 5).map((item) => (
              <Action key={item.label} onClick={() => setActiveNav(item.label)} className={`flex flex-1 flex-col items-center gap-1 rounded-xl py-2 text-[9px] font-semibold ${activeNav === item.label ? "bg-[#101c2a] text-[#dfff51]" : "text-slate-500"}`}>
                <Icon name={item.icon} size="sm" /><span>{item.label.split(" ")[0]}</span>
              </Action>
            ))}
          </nav>
        </main>
      </div>
    </div>
  );
}
