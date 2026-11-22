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
      icon: <FolderCopyIcon sx={{ fontSize: 16, color: '#FFFFFF' }} />,
      bg: 'bg-gradient-to-br from-[#1E3A8A] to-[#0B1D3A]',
      label: en ? 'Cases' : 'కేసులు',
      subtext: en ? 'Funnel stages' : 'దశలు',
      value: '3',
      isScore: false,
      highlight: false,
    },
    {
      icon: <FactCheckIcon sx={{ fontSize: 16, color: '#FFFFFF' }} />,
      bg: 'bg-gradient-to-br from-[#16A34A] to-[#15803D]',
      label: en ? 'Decisions / Case' : 'నిర్ణయాలు',
      subtext: en ? 'Dossier cards' : 'కార్డులు',
      value: '8',
      isScore: false,
      highlight: false,
    },
    {
      icon: <Timer3DIcon size={18} />,
      bg: 'bg-gradient-to-br from-[#2563EB] to-[#1D4ED8]',
      label: en ? 'Est. Time' : 'సమయం',
      subtext: en ? 'Fast-paced' : 'వేగవంతమైనది',
      value: en ? '~4m' : '~4 ని.',
      isScore: false,
      highlight: false,
    },
    {
      icon: <Trophy3DIcon size={18} />,
      bg: 'bg-gradient-to-br from-[#F59E0B] via-[#D97706] to-[#92400E]',
      label: en ? 'Best Score' : 'బెస్ట్ స్కోర్',
      subtext: bestScore > 0 ? (en ? 'High Record' : 'రికార్డ్') : en ? 'Session Target' : 'లక్ష్యం',
      value: bestScore.toLocaleString(),
      isScore: true,
      highlight: bestScore > 0,
    },
  ];

  return (
    <div className="fare-card-3d w-full max-w-[295px] rounded-[12px] p-4 transition-all duration-300">
      {/* Header with 3D Vault badge & Guide action */}
      <div className="mb-3.5 flex items-center gap-2.5">
        <div className="relative grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-amber-400/20 via-sky-500/10 to-transparent p-1 shadow-[inset_0_1px_1px_rgba(255,255,255,0.45)] dark:from-amber-400/10 dark:via-blue-500/10">
          <Vault3DIcon size={36} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span className="text-[12px] font-black uppercase tracking-[0.14em] text-[#0B1D3A] dark:text-white">
              {en ? 'Revenue Vault' : 'రెవెన్యూ వాల్ట్'}
            </span>
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
          </div>
          <div className="text-[10px] font-semibold text-[#64748B] dark:text-slate-400">
            {en ? 'Session Overview' : 'గేమ్ వివరాలు'}
          </div>
        </div>

        <button
          type="button"
          onClick={() => setGuideOpen(true)}
          className="group relative flex shrink-0 cursor-pointer items-center gap-1.5 overflow-hidden rounded-full bg-gradient-to-r from-[#0B1D3A] to-[#1A3463] px-3 py-1.5 text-[11px] font-extrabold text-white shadow-[0_2px_8px_rgba(11,29,58,0.25)] transition-all duration-200 hover:scale-105 hover:shadow-[0_4px_14px_rgba(11,29,58,0.35)] active:scale-95 dark:from-[#1E3A8A] dark:to-[#2563EB] dark:shadow-[0_2px_8px_rgba(37,99,235,0.3)]"
          aria-label={en ? 'Open Game Guide' : 'గేమ్ సూచనలు తెరవండి'}
        >
          <span className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/25 to-transparent" />
          <MenuBookIcon sx={{ fontSize: 13 }} className="transition-transform duration-200 group-hover:scale-110" />
          <span>{en ? 'Guide' : 'సూచనలు'}</span>
        </button>
      </div>

      {/* 2x2 Polish Stat Grid */}
      <div className="grid grid-cols-2 gap-2">
        {items.map((it) => (
          <div
            key={it.label}
            className={`group flex flex-col justify-between rounded-[9px] border border-[#DBE4FA] bg-gradient-to-b from-white to-[#F4F7FF] p-2.5 shadow-[inset_0_1px_0_#ffffff] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#C99A2E]/50 hover:shadow-sm dark:border-white/10 dark:bg-gradient-to-b dark:from-[#15284B] dark:to-[#0B1730] dark:shadow-none dark:hover:border-amber-400/50 ${
              it.highlight ? 'ring-1 ring-amber-400/40 bg-amber-50/40 dark:bg-amber-950/20' : ''
            }`}
          >
            <div className="flex items-center justify-between gap-1.5">
              <span className={`fare-icon-3d grid h-7 w-7 shrink-0 place-items-center rounded-[6px] text-white shadow-sm ${it.bg}`}>
                {it.icon}
              </span>
              <span
                className={`text-base font-black tabular-nums tracking-tight ${
                  it.isScore ? 'text-[#C99A2E] dark:text-[#FBBF24]' : 'text-[#0B1D3A] dark:text-white'
                }`}
              >
                {it.value}
              </span>
            </div>
            <div className="mt-1.5 min-w-0">
              <div className="truncate text-[11px] font-bold text-[#334155] dark:text-slate-200">
                {it.label}
              </div>
              <div className="truncate text-[9px] font-medium text-[#64748B] dark:text-slate-400">
                {it.subtext}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sealed Pipeline Status Tip */}
      <div className="mt-3 flex items-center gap-2.5 rounded-[8px] border border-[#DBE4FA] bg-gradient-to-r from-emerald-500/10 via-sky-500/5 to-transparent px-2.5 py-2 dark:border-white/10 dark:from-emerald-500/15">
        <span className="fare-icon-3d grid h-6 w-6 shrink-0 place-items-center rounded-[6px] bg-[#16A34A] text-white shadow-sm">
          <VerifiedUserIcon sx={{ fontSize: 13, color: '#FFFFFF' }} />
        </span>
        <p className="text-[10px] font-semibold leading-tight text-[#475569] dark:text-slate-300">
          {en
            ? 'Seal funnel leaks to route maximum revenue into this vault.'
            : 'ఫన్నెల్ లీక్‌లను ఆపి గరిష్ట ఆదాయాన్ని వాల్ట్‌లోకి చేర్చండి.'}
        </p>
      </div>

      <GuideDialog open={guideOpen} onClose={() => setGuideOpen(false)} lang={lang} />
    </div>
  );
}
