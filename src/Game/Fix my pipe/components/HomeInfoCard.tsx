import { useState } from 'react';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { Timer3DIcon, Trophy3DIcon, Vault3DIcon } from './Icons3D';
import GuideDialog from './GuideDialog';
import { usePipeGameStore } from '../store';

export default function HomeInfoCard() {
  const { lang, bestScore } = usePipeGameStore();
  const [guideOpen, setGuideOpen] = useState(false);
  const en = lang === 'en';
  const items = [
    {
      icon: <FolderCopyIcon sx={{ fontSize: 17, color: '#FFFFFF' }} />,
      bg: 'bg-[#0B1D3A] dark:bg-[#1A3463]',
      label: en ? 'Cases' : 'కేసులు',
      value: '3',
    },
    {
      icon: <FactCheckIcon sx={{ fontSize: 17, color: '#FFFFFF' }} />,
      bg: 'bg-[#16A34A]',
      label: en ? 'Decisions / Case' : 'నిర్ణయాలు',
      value: '8',
    },
    {
      icon: <Timer3DIcon size={19} />,
      bg: 'bg-[#2563EB]',
      label: en ? 'Play Time' : 'సమయం',
      value: en ? '~4m' : '~4 ని.',
    },
    {
      icon: <Trophy3DIcon size={19} />,
      bg: 'bg-[#C99A2E]',
      label: en ? 'Best Score' : 'బెస్ట్ స్కోర్',
      value: bestScore.toLocaleString(),
    },
  ];

  return (
    <div className="fare-card-3d w-full max-w-[290px] rounded-[10px] p-4">
      <div className="mb-3 flex items-center gap-2.5">
        <Vault3DIcon size={40} className="shrink-0" />
        <div className="min-w-0 flex-1">
          <div className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#0B1D3A] dark:text-white">
            {en ? 'Revenue Vault' : 'రెవెన్యూ వాల్ట్'}
          </div>
          <div className="text-[10px] font-semibold text-[#64748B] dark:text-slate-400">
            {en ? 'Session Overview' : 'గేమ్ వివరాలు'}
          </div>
        </div>
        <button
          type="button"
          onClick={() => setGuideOpen(true)}
          className="flex shrink-0 cursor-pointer items-center gap-1 rounded-[6px] bg-[#0B1D3A] px-2 py-1.5 text-[11px] font-bold text-white transition hover:bg-[#1A3463] active:scale-95 dark:bg-[#1A3463] dark:hover:bg-[#25447B]"
        >
          <MenuBookIcon sx={{ fontSize: 15 }} />
          {en ? 'Guide' : 'సూచనలు'}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {items.map((it) => (
          <div
            key={it.label}
            className="flex flex-col justify-between gap-2 rounded-[8px] border border-[#DBE4FA] bg-gradient-to-b from-white to-[#F4F7FF] p-2.5 shadow-[inset_0_1px_0_#ffffff] dark:border-white/10 dark:bg-gradient-to-b dark:from-[#15284B] dark:to-[#0B1730] dark:shadow-none"
          >
            <div className="flex items-center justify-between gap-1.5">
              <span className={`fare-icon-3d grid h-7 w-7 shrink-0 place-items-center rounded-[6px] text-white ${it.bg}`}>
                {it.icon}
              </span>
              <span className="text-base font-black tabular-nums text-[#0B1D3A] dark:text-white">{it.value}</span>
            </div>
            <span className="truncate text-[11px] font-semibold text-[#475569] dark:text-slate-300">{it.label}</span>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-start gap-2 border-t border-[#DBE4FA] pt-2.5 dark:border-white/10">
        <span className="fare-icon-3d mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-[4px] bg-[#16A34A] text-white">
          <VerifiedUserIcon sx={{ fontSize: 12, color: '#FFFFFF' }} />
        </span>
        <p className="text-[11px] leading-snug text-[#64748B] dark:text-slate-400">
          {en ? 'Seal every leak to keep gold flowing into your vault.' : 'ప్రతి లీక్‌ను ఆపి, బంగారాన్ని వాల్ట్‌లోకి ప్రవహించేలా చేయండి.'}
        </p>
      </div>

      <GuideDialog open={guideOpen} onClose={() => setGuideOpen(false)} lang={lang} />
    </div>
  );
}
