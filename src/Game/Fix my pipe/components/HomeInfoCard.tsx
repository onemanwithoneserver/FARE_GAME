import { useState } from 'react';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import TimerIcon from '@mui/icons-material/Timer';
import GuideDialog from './GuideDialog';
import { usePipeGameStore } from '../store';

export default function HomeInfoCard({ compact = false }: { compact?: boolean }) {
  const { lang } = usePipeGameStore();
  const [guideOpen, setGuideOpen] = useState(false);
  const en = lang === 'en';

  const stats = [
    {
      icon: <FolderCopyIcon sx={{ fontSize: compact ? 14 : 19, color: '#FFFFFF' }} />,
      bg: 'bg-gradient-to-br from-[#F59E0B] via-[#D97706] to-[#B45309]',
      border: 'border-amber-500/30',
      label: en ? 'Cases' : 'కేసులు',
      value: '3',
    },
    {
      icon: <FactCheckIcon sx={{ fontSize: compact ? 14 : 19, color: '#FFFFFF' }} />,
      bg: 'bg-gradient-to-br from-[#16A34A] to-[#15803D]',
      border: 'border-emerald-500/30',
      label: en ? 'Decisions / Case' : 'నిర్ణయాలు',
      value: '8',
    },
    {
      icon: <TimerIcon sx={{ fontSize: compact ? 14 : 19, color: '#FFFFFF' }} />,
      bg: 'bg-gradient-to-br from-[#2563EB] to-[#1D4ED8]',
      border: 'border-blue-500/30',
      label: en ? 'Play Time' : 'సమయం',
      value: en ? '~4m' : '~4 ని.',
    },
  ];

  return (
    <div
      className={`fare-card-3d w-full ${
        compact ? 'max-w-[240px] p-2 rounded-[2px]' : 'max-w-[335px] p-3 rounded-[4px]'
      } transition-all duration-300`}
      style={{ borderRadius: compact ? '2px' : '4px' }}
    >
      {/* 2x2 Balanced Grid: 3 Stats + Guide Action Tile */}
      <div className={`grid grid-cols-2 ${compact ? 'gap-1.5' : 'gap-2.5'}`}>
        {stats.map((it) => (
          <div
            key={it.label}
            className={`group flex flex-col justify-between border border-[#DBE4FA] bg-gradient-to-b from-white to-[#F6F9FF] ${
              compact ? 'p-2 rounded-[2px]' : 'p-3 rounded-[2px]'
            } shadow-[inset_0_1px_0_#ffffff] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#C99A2E]/70 hover:shadow-sm dark:border-white/10 dark:bg-gradient-to-b dark:from-[#15284B] dark:to-[#0B1730] dark:shadow-none dark:hover:border-amber-400/60`}
            style={{ borderRadius: '2px' }}
          >
            <div className="flex items-center justify-between gap-1.5">
              <span
                className={`grid ${
                  compact ? 'h-6 w-6 rounded-[2px]' : 'h-8 w-8 rounded-[2px]'
                } shrink-0 place-items-center text-white shadow-sm ${it.bg}`}
                style={{ borderRadius: '2px' }}
              >
                {it.icon}
              </span>
              <span
                className={`${
                  compact ? 'text-sm' : 'text-lg sm:text-xl'
                } font-black tabular-nums tracking-tight text-[#0B1D3A] dark:text-white`}
              >
                {it.value}
              </span>
            </div>
            <div
              className={`mt-2 truncate ${
                compact ? 'text-[9.5px]' : 'text-[11.5px] sm:text-[12px]'
              } font-bold tracking-tight text-[#475569] dark:text-slate-300`}
            >
              {it.label}
            </div>
          </div>
        ))}

        {/* 4th Tile: Interactive Guide Button */}
        <button
          type="button"
          onClick={() => setGuideOpen(true)}
          className={`group relative flex cursor-pointer flex-col justify-between overflow-hidden border border-[#2563EB]/40 bg-gradient-to-br from-[#0B1D3A] via-[#142A54] to-[#1E3A8A] ${
            compact ? 'p-2 rounded-[2px]' : 'p-3 rounded-[2px]'
          } text-left text-white shadow-[0_2px_8px_rgba(11,29,58,0.2)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#C99A2E] hover:shadow-[0_4px_14px_rgba(37,99,235,0.3)] active:scale-95 dark:from-[#142A54] dark:to-[#1E3A8A]`}
          style={{ borderRadius: '2px' }}
          aria-label={en ? 'Open Game Guide' : 'గేమ్ సూచనలు'}
        >
          <span className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent" />
          <div className="flex items-center justify-between gap-1.5">
            <span
              className={`grid ${
                compact ? 'h-6 w-6 rounded-[2px]' : 'h-8 w-8 rounded-[2px]'
              } shrink-0 place-items-center bg-white/20 text-white shadow-inner transition-transform duration-200 group-hover:scale-105`}
              style={{ borderRadius: '2px' }}
            >
              <MenuBookIcon sx={{ fontSize: compact ? 14 : 19, color: '#FFFFFF' }} />
            </span>
            <span
              className={`bg-gradient-to-r from-amber-400 to-amber-500 px-2 py-0.5 ${
                compact ? 'text-[8px]' : 'text-[9.5px]'
              } font-black uppercase tracking-wider text-[#0B1D3A] shadow-xs`}
              style={{ borderRadius: '2px' }}
            >
              {en ? 'Guide' : 'గైడ్'}
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span
              className={`truncate ${
                compact ? 'text-[9.5px]' : 'text-[12px] sm:text-[13px]'
              } font-black text-white group-hover:text-amber-300 transition-colors`}
            >
              {en ? 'How to Play' : 'సూచనలు'}
            </span>
            <span className="text-[12px] font-bold text-amber-300 transition-transform duration-200 group-hover:translate-x-0.5">
              →
            </span>
          </div>
        </button>
      </div>

      <GuideDialog open={guideOpen} onClose={() => setGuideOpen(false)} lang={lang} />
    </div>
  );
}
