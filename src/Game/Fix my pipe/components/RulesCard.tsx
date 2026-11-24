import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import GroupsIcon from '@mui/icons-material/Groups';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import BuildIcon from '@mui/icons-material/Build';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import {
  Target3DIcon,
  Check3DIcon,
  Cross3DIcon,
  Layers3DIcon,
  Trophy3DIcon,
  Bolt3DIcon,
} from './Icons3D';
import { usePipeGameStore } from '../store';
import type { Language } from '../types';

type RowTone = 'green' | 'blue' | 'red';
interface Row {
  tone: RowTone;
  renderIcon: (px: number) => React.ReactNode;
  title: string;
  text: string;
}

const TONE_ICON: Record<RowTone, string> = {
  green: 'bg-[#16A34A] text-white fare-icon-3d',
  blue: 'bg-[#2563EB] text-white fare-icon-3d',
  red: 'bg-[#DC2626] text-white fare-icon-3d',
};

const TONE_TEXT: Record<RowTone, string> = {
  green: 'text-[#15803D] dark:text-emerald-400',
  blue: 'text-[#1D4ED8] dark:text-sky-400',
  red: 'text-[#B91C1C] dark:text-rose-400',
};

function slides(lang: Language): Row[][] {
  const en = lang === 'en';
  return [
    [
      { tone: 'green', renderIcon: (px) => <Check3DIcon size={px} />, title: en ? 'Hire / Implement' : 'నియమించు / అమలు', text: en ? 'Add the right team and tools to improve conversion.' : 'సేల్స్ పెంచడానికి సరైన టీమ్, టూల్స్ చేర్చండి.' },
      { tone: 'blue', renderIcon: (px) => <BuildIcon sx={{ fontSize: px, color: '#FFFFFF' }} />, title: en ? 'Fix' : 'సరిచేయండి', text: en ? 'Make sure your funnel flows smoothly.' : 'మీ ఫన్నెల్ సాఫీగా ప్రవహించేలా చూడండి.' },
      { tone: 'red', renderIcon: (px) => <Cross3DIcon size={px} />, title: en ? 'Avoid' : 'నివారించండి', text: en ? "Don't choose the wrong solution." : 'తప్పు పరిష్కారాన్ని ఎంచుకోకండి.' },
    ],
    [
      { tone: 'red', renderIcon: (px) => <Layers3DIcon size={px} />, title: en ? '3 Cases' : '3 కేసులు', text: en ? 'Each case has one leaking funnel stage.' : 'ప్రతి కేసులో ఒక దశ లీక్ అవుతుంది.' },
      { tone: 'blue', renderIcon: (px) => <GroupsIcon sx={{ fontSize: px, color: '#FFFFFF' }} />, title: en ? '8 Cards' : '8 కార్డులు', text: en ? 'Review every candidate or idea and decide.' : 'ప్రతి అభ్యర్థి లేదా ఆలోచనను పరిశీలించి నిర్ణయించండి.' },
      { tone: 'green', renderIcon: (px) => <VerifiedUserIcon sx={{ fontSize: px, color: '#FFFFFF' }} />, title: en ? 'Seal it' : 'సీల్ చేయండి', text: en ? 'Seal the leak to send gold to the vault.' : 'లీక్ ఆపితే బంగారం వాల్ట్‌లోకి వెళ్తుంది.' },
    ],
    [
      { tone: 'green', renderIcon: (px) => <Trophy3DIcon size={px + 1} />, title: '+10', text: en ? 'Perfect fit locks a titanium clamp.' : 'సరైన ఎంపిక — శాశ్వత టైటానియం క్లాంప్.' },
      { tone: 'blue', renderIcon: (px) => <Bolt3DIcon size={px} />, title: '+3', text: en ? 'Partial fit adds a temporary patch.' : 'పాక్షిక ఎంపిక — తాత్కాలిక ప్యాచ్.' },
      { tone: 'red', renderIcon: (px) => <TrendingDownIcon sx={{ fontSize: px, color: '#FFFFFF' }} />, title: '−5 / −8', text: en ? 'Wrong picks make the leak worse.' : 'తప్పు నిర్ణయం లీక్‌ను మరింత పెంచుతుంది.' },
    ],
  ];
}

export default function RulesCard({ compact = false, autoPlay = false }: { compact?: boolean; autoPlay?: boolean }) {
  const lang = usePipeGameStore((s) => s.lang);
  const [idx, setIdx] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [userPaused, setUserPaused] = useState(!autoPlay);
  const data = slides(lang);
  const paused = !autoPlay || hovered || userPaused;

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % data.length), 5500);
    return () => clearInterval(id);
  }, [paused, data.length]);

  const iconGlyphPx = compact ? 16 : 19;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`fare-card-3d rounded-[10px] ${compact ? 'p-3.5' : 'p-4 md:p-5'}`}
    >
      <div className="flex items-center gap-4 md:gap-5">
        {!compact && (
          <div className="hidden shrink-0 sm:flex sm:items-center sm:justify-center">
            <Target3DIcon size={96} />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.ul
              key={idx}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className={compact ? 'space-y-2' : 'grid grid-cols-1 gap-2.5 sm:grid-cols-3'}
            >
              {data[idx].map((r) =>
                compact ? (
                  <li key={r.title} className="flex items-center gap-2.5">
                    <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-[6px] ${TONE_ICON[r.tone]}`}>
                      {r.renderIcon(iconGlyphPx)}
                    </span>
                    <p className="text-xs leading-snug text-[#475569] dark:text-slate-300">
                      <b className={TONE_TEXT[r.tone]}>{r.title}</b>
                      <span className="text-slate-400"> : </span>
                      {r.text}
                    </p>
                  </li>
                ) : (
                  <li
                    key={r.title}
                    className="flex flex-col gap-2 rounded-[8px] border border-[#DBE4FA] bg-white/75 p-3 dark:border-white/10 dark:bg-[#071124]/45"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-[7px] ${TONE_ICON[r.tone]}`}>
                        {r.renderIcon(iconGlyphPx)}
                      </span>
                      <b className={`text-sm font-bold leading-tight ${TONE_TEXT[r.tone]}`}>{r.title}</b>
                    </div>
                    <p className="text-xs leading-relaxed text-[#475569] dark:text-slate-300">{r.text}</p>
                  </li>
                )
              )}
            </motion.ul>
          </AnimatePresence>
        </div>
      </div>
      <div className={`flex items-center ${compact ? 'mt-2.5 justify-center gap-2.5' : 'mt-3.5 justify-between'}`}>
        {!compact && (
          <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#64748B] dark:text-slate-400">
            {lang === 'en' ? `Guide · ${idx + 1}/${data.length}` : `సూచనలు · ${idx + 1}/${data.length}`}
          </span>
        )}
        <div className="flex items-center gap-1.5">
          {data.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Slide ${i + 1}`}
              onClick={() => setIdx(i)}
              className={`h-1.5 cursor-pointer rounded-full transition-all ${
                i === idx
                  ? 'w-6 bg-[#0B1D3A] dark:bg-white'
                  : 'w-1.5 bg-[#CBD5E1] hover:bg-[#94A3B8] dark:bg-white/25 dark:hover:bg-white/45'
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => setUserPaused((p) => !p)}
          aria-label={userPaused ? (lang === 'en' ? 'Play slides' : 'ప్లే చేయండి') : lang === 'en' ? 'Pause slides' : 'పాజ్ చేయండి'}
          title={userPaused ? (lang === 'en' ? 'Play' : 'ప్లే') : lang === 'en' ? 'Pause' : 'పాజ్'}
          className={`fare-icon-3d grid cursor-pointer place-items-center rounded-[6px] text-white transition active:scale-95 ${
            compact ? 'h-6 w-6' : 'h-7 w-7'
          } ${
            userPaused ? 'bg-[#0B1D3A] hover:bg-[#1A3463] dark:bg-[#1A3463]' : 'bg-[#0B1D3A] hover:bg-[#1A3463] dark:bg-[#1A3463]'
          }`}
        >
          {userPaused ? (
            <PlayArrowIcon sx={{ fontSize: compact ? 15 : 17, color: '#FFFFFF' }} />
          ) : (
            <PauseIcon sx={{ fontSize: compact ? 15 : 17, color: '#FFFFFF' }} />
          )}
        </button>
      </div>
    </div>
  );
}
