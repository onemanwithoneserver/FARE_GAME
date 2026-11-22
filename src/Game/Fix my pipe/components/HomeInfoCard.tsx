import { useState } from 'react';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import TimerIcon from '@mui/icons-material/Timer';
import GuideDialog from './GuideDialog';
import { usePipeGameStore } from '../store';

export default function HomeInfoCard() {
  const { lang } = usePipeGameStore();
  const [guideOpen, setGuideOpen] = useState(false);
  const en = lang === 'en';

  const stats = [
    {
      icon: <FolderCopyIcon sx={{ fontSize: 16, color: '#FFFFFF' }} />,
      bg: 'bg-gradient-to-br from-[#F59E0B] via-[#D97706] to-[#92400E]',
      label: en ? 'Cases' : 'కేసులు',
      value: '3',
    },
    {
      icon: <FactCheckIcon sx={{ fontSize: 16, color: '#FFFFFF' }} />,
      bg: 'bg-gradient-to-br from-[#16A34A] to-[#15803D]',
      label: en ? 'Decisions / Case' : 'నిర్ణయాలు',
      value: '8',
    },
    {
      icon: <TimerIcon sx={{ fontSize: 16, color: '#FFFFFF' }} />,
      bg: 'bg-gradient-to-br from-[#2563EB] to-[#1D4ED8]',
      label: en ? 'Play Time' : 'సమయం',
      value: en ? '~4m' : '~4 ని.',
    },
  ];

  return (
    <div className="fare-card-3d w-full max-w-[295px] rounded-[12px] p-2.5 transition-all duration-300">
      {/* 2x2 Balanced Grid: 3 Stats + Guide Action Tile */}
      <div className="grid grid-cols-2 gap-2">
        {stats.map((it) => (
          <div
            key={it.label}
            className="flex flex-col justify-between rounded-[9px] border border-[#DBE4FA] bg-gradient-to-b from-white to-[#F4F7FF] p-2.5 shadow-[inset_0_1px_0_#ffffff] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#C99A2E]/50 hover:shadow-sm dark:border-white/10 dark:bg-gradient-to-b dark:from-[#15284B] dark:to-[#0B1730] dark:shadow-none dark:hover:border-amber-400/50"
          >
            <div className="flex items-center justify-between gap-1.5">
              <span className={`fare-icon-3d grid h-7 w-7 shrink-0 place-items-center rounded-[6px] text-white shadow-sm ${it.bg}`}>
                {it.icon}
              </span>
              <span className="text-base font-black tabular-nums tracking-tight text-[#0B1D3A] dark:text-white">
                {it.value}
              </span>
            </div>
            <div className="mt-2 truncate text-[11px] font-bold text-[#334155] dark:text-slate-200">
              {it.label}
            </div>
          </div>
        ))}

        {/* 4th Tile: Interactive Guide Button in place of Best Score */}
        <button
          type="button"
          onClick={() => setGuideOpen(true)}
          className="group relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-[9px] border border-[#2563EB]/40 bg-gradient-to-br from-[#0B1D3A] via-[#142A54] to-[#1E3A8A] p-2.5 text-left text-white shadow-[0_2px_8px_rgba(11,29,58,0.2)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#3B82F6] hover:shadow-[0_4px_14px_rgba(37,99,235,0.3)] active:scale-95 dark:from-[#1E3A8A] dark:to-[#2563EB]"
          aria-label={en ? 'Open Game Guide' : 'గేమ్ సూచనలు'}
        >
          <span className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent" />
          <div className="flex items-center justify-between gap-1.5">
            <span className="fare-icon-3d grid h-7 w-7 shrink-0 place-items-center rounded-[6px] bg-white/20 text-white shadow-inner transition-transform duration-200 group-hover:scale-110">
              <MenuBookIcon sx={{ fontSize: 16, color: '#FFFFFF' }} />
            </span>
            <span className="rounded-full bg-white/20 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-white">
              {en ? 'Guide' : 'గైడ్'}
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span className="truncate text-[11px] font-black text-white">
              {en ? 'How to Play' : 'సూచనలు'}
            </span>
            <span className="text-xs font-bold text-sky-200 transition-transform duration-200 group-hover:translate-x-0.5">
              →
            </span>
          </div>
        </button>
      </div>

      <GuideDialog open={guideOpen} onClose={() => setGuideOpen(false)} lang={lang} />
    </div>
  );
}
