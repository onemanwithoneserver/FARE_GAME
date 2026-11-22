import { ReactNode, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import MusicOffIcon from '@mui/icons-material/MusicOff';
import GroupsIcon from '@mui/icons-material/Groups';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LogoutIcon from '@mui/icons-material/Logout';
import { Target3DIcon, Star3DIcon, Timer3DIcon } from './Icons3D';
import FareLogo from './FareLogo';
import { usePipeGameStore } from '../store';

function useCountUp(value: number) {
  const [display, setDisplay] = useState(value);
  const fromRef = useRef(value);
  useEffect(() => {
    const from = fromRef.current;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 500);
      const eased = 1 - Math.pow(1 - t, 3);
      const v = Math.round(from + (value - from) * eased);
      setDisplay(v);
      fromRef.current = v;
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return display;
}

function useElapsed(startedAt: number | null, finishedAt: number | null) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!startedAt || finishedAt) return;
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 500);
    return () => clearInterval(id);
  }, [startedAt, finishedAt]);
  if (!startedAt) return 0;
  return Math.max(0, Math.floor(((finishedAt ?? now) - startedAt) / 1000));
}

const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

function IconButton({
  onClick,
  label,
  children,
  compact,
  tone = 'navy',
  bgClass,
}: {
  onClick: () => void;
  label: string;
  children: ReactNode;
  compact?: boolean;
  tone?: 'navy' | 'danger';
  bgClass?: string;
}) {
  const bg =
    bgClass ??
    (tone === 'danger'
      ? 'border-[#B91C1C] bg-[#DC2626] hover:bg-[#B91C1C] text-white fare-icon-3d'
      : 'border-[#0B1D3A] bg-[#0B1D3A] hover:bg-[#1A3463] text-white dark:border-white/15 dark:bg-[#1A3463] dark:hover:bg-[#25447B] fare-icon-3d');

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`grid shrink-0 cursor-pointer place-items-center rounded-[8px] border shadow-[0_2px_6px_rgba(11,29,58,0.12)] transition active:scale-95 ${bg} ${
        compact ? 'h-7 w-7' : 'h-10 w-10'
      }`}
    >
      {children}
    </button>
  );
}

export default function Hud({ center, compact = false }: { center?: ReactNode; compact?: boolean }) {
  const {
    screen,
    score,
    bestScore,
    sealedCount,
    caseOrder,
    startedAt,
    finishedAt,
    sound,
    setSound,
    song,
    setSong,
    lang,
    setLang,
    theme,
    setTheme,
    openQuitConfirm,
    quitGame,
    hiredTeam,
    openRoster,
  } = usePipeGameStore();
  const isHome = screen === 'home';
  const shown = useCountUp(isHome ? bestScore : score);
  const elapsed = useElapsed(startedAt, finishedAt);
  const totalGoals = caseOrder.length || 3;
  const iconPx = compact ? 15 : 19;
  const isDark = theme === 'dark';

  const surface = 'fare-card-3d text-[#0B1D3A] dark:text-white';

  const handleQuitClick = () => {
    if (screen === 'play') openQuitConfirm();
    else quitGame();
  };

  const navigate = useNavigate();

  const handleThemeToggle = () => {
    const nextTheme = isDark ? 'light' : 'dark';
    setTheme(nextTheme);
    try {
      navigate(`/fix-my-pipe/${nextTheme}`);
    } catch (_) {}
  };

  const scorePill = (
    <div className={`flex items-center rounded-[8px] ${surface} ${compact ? 'gap-1.5 px-2 py-1' : 'gap-3 px-3.5 py-2'}`}>
      <div className={`fare-icon-3d grid place-items-center rounded-[6px] bg-[#0B1D3A] text-white dark:bg-[#1A3463] ${compact ? 'h-6 w-6' : 'h-10 w-10'}`}>
        <PersonIcon sx={{ fontSize: compact ? 15 : 22, color: '#FFFFFF' }} />
      </div>
      <div className="leading-tight">
        <div className={`font-semibold uppercase tracking-wider text-[#64748B] dark:text-slate-400 ${compact ? 'text-[8px]' : 'text-[10px]'}`}>
          {isHome ? (lang === 'en' ? 'Best Score' : 'బెస్ట్ స్కోర్') : lang === 'en' ? 'Your Score' : 'మీ స్కోర్'}
        </div>
        <div className="flex items-center gap-1">
          <span className={`font-black tabular-nums text-[#0B1D3A] dark:text-white ${compact ? 'text-xs sm:text-sm' : 'text-xl'}`}>
            {shown.toLocaleString()}
          </span>
          <span className={`fare-icon-3d grid ${compact ? 'h-3.5 w-3.5' : 'h-4.5 w-4.5'} place-items-center rounded-[4px] bg-[#C99A2E] text-white`}>
            <Star3DIcon size={compact ? 9 : 12} />
          </span>
        </div>
      </div>
    </div>
  );

  const controls = (
    <div className={`flex items-center ${compact ? 'gap-1' : 'gap-2'}`}>
      <div className={`flex items-center rounded-[8px] ${surface} ${compact ? 'gap-1.5 px-2 py-1.5' : 'gap-2 px-2.5 py-1.5'}`}>
        <Target3DIcon size={compact ? 20 : 30} />
        <div className="leading-tight">
          {!compact && <div className="text-[9px] font-bold uppercase tracking-wider text-[#64748B] dark:text-slate-400">{lang === 'en' ? 'Goals' : 'లక్ష్యాలు'}</div>}
          <div className={`font-extrabold tabular-nums ${compact ? 'text-[11px]' : 'text-xs'}`}>
            {sealedCount}/{totalGoals}
          </div>
        </div>
      </div>
      {!compact && (
        <div className={`flex items-center rounded-[8px] ${surface} gap-2 px-2.5 py-1.5`}>
          <span className="fare-icon-3d grid h-7 w-7 place-items-center rounded-[5px] bg-[#2563EB] text-white">
            <Timer3DIcon size={18} />
          </span>
          <span className="text-xs font-extrabold tabular-nums">{fmt(elapsed)}</span>
        </div>
      )}
      {screen === 'play' && hiredTeam.length > 0 && !compact && (
        <IconButton onClick={openRoster} label={lang === 'en' ? 'Team roster' : 'టీమ్'}>
          <GroupsIcon sx={{ fontSize: iconPx, color: '#FFFFFF' }} />
        </IconButton>
      )}
      {!compact ? (
        <div className={`flex items-center gap-1.5 rounded-[8px] ${surface} px-2 py-1.5`}>
          <button
            type="button"
            onClick={() => setSound(!sound)}
            aria-label={sound ? (lang === 'en' ? 'Mute sound' : 'సౌండ్ ఆఫ్') : lang === 'en' ? 'Enable sound' : 'సౌండ్ ఆన్'}
            title={sound ? (lang === 'en' ? 'Sound: On' : 'సౌండ్: ఆన్') : lang === 'en' ? 'Sound: Off' : 'సౌండ్: ఆఫ్'}
            className="flex cursor-pointer items-center gap-1.5 rounded-[6px] pr-1 transition hover:opacity-90"
          >
            <span
              className={`fare-icon-3d grid h-7 w-7 place-items-center rounded-[5px] text-white ${
                sound ? 'bg-[#16A34A]' : 'bg-[#64748B]'
              }`}
            >
              {sound ? <VolumeUpIcon sx={{ fontSize: 16, color: '#FFFFFF' }} /> : <VolumeOffIcon sx={{ fontSize: 16, color: '#FFFFFF' }} />}
            </span>
            <span className="text-[11px] font-bold">{lang === 'en' ? 'Sound' : 'సౌండ్'}</span>
          </button>
          <span className="h-4 w-px bg-[#DBE4FA] dark:bg-white/15" />
          <button
            type="button"
            onClick={() => setSong(!song)}
            aria-label={song ? (lang === 'en' ? 'Pause song' : 'పాట ఆపండి') : lang === 'en' ? 'Play song' : 'పాట ప్లే'}
            title={song ? (lang === 'en' ? 'Song: On' : 'పాట: ఆన్') : lang === 'en' ? 'Song: Off' : 'పాట: ఆఫ్'}
            className="flex cursor-pointer items-center gap-1.5 rounded-[6px] pr-1 transition hover:opacity-90"
          >
            <span
              className={`fare-icon-3d grid h-7 w-7 place-items-center rounded-[5px] text-white ${
                song ? 'bg-[#4F46E5]' : 'bg-[#64748B]'
              }`}
            >
              {song ? <MusicNoteIcon sx={{ fontSize: 16, color: '#FFFFFF' }} /> : <MusicOffIcon sx={{ fontSize: 16, color: '#FFFFFF' }} />}
            </span>
            <span className="text-[11px] font-bold">{lang === 'en' ? 'Song' : 'పాట'}</span>
          </button>
        </div>
      ) : (
        <>
          <IconButton
            compact={compact}
            onClick={() => setSound(!sound)}
            bgClass={sound ? 'border-[#15803D] bg-[#16A34A] text-white fare-icon-3d' : 'border-[#475569] bg-[#64748B] text-white fare-icon-3d'}
            label={sound ? (lang === 'en' ? 'Sound: On' : 'సౌండ్: ఆన్') : lang === 'en' ? 'Sound: Off' : 'సౌండ్: ఆఫ్'}
          >
            {sound ? <VolumeUpIcon sx={{ fontSize: iconPx, color: '#FFFFFF' }} /> : <VolumeOffIcon sx={{ fontSize: iconPx, color: '#FFFFFF' }} />}
          </IconButton>
          <IconButton
            compact={compact}
            onClick={() => setSong(!song)}
            bgClass={song ? 'border-[#4338CA] bg-[#4F46E5] text-white fare-icon-3d' : 'border-[#475569] bg-[#64748B] text-white fare-icon-3d'}
            label={song ? (lang === 'en' ? 'Song: On' : 'పాట: ఆన్') : lang === 'en' ? 'Song: Off' : 'పాట: ఆఫ్'}
          >
            {song ? <MusicNoteIcon sx={{ fontSize: iconPx, color: '#FFFFFF' }} /> : <MusicOffIcon sx={{ fontSize: iconPx, color: '#FFFFFF' }} />}
          </IconButton>
        </>
      )}
      <IconButton
        compact={compact}
        onClick={handleThemeToggle}
        label={isDark ? (lang === 'en' ? 'Light theme' : 'లైట్ థీమ్') : lang === 'en' ? 'Dark theme' : 'డార్క్ థీమ్'}
      >
        {isDark ? <LightModeIcon sx={{ fontSize: iconPx, color: '#FFFFFF' }} /> : <DarkModeIcon sx={{ fontSize: iconPx, color: '#FFFFFF' }} />}
      </IconButton>
      <IconButton compact={compact} onClick={() => setLang(lang === 'te' ? 'en' : 'te')} label={lang === 'te' ? 'English' : 'తెలుగు'}>
        <span className={`font-bold text-white ${compact ? 'text-[10px]' : 'text-xs'}`}>{lang === 'te' ? 'EN' : 'తె'}</span>
      </IconButton>
      {!isHome && (
        <IconButton
          compact={compact}
          tone="danger"
          onClick={handleQuitClick}
          label={lang === 'en' ? 'Quit Game' : 'గేమ్ ఆపండి'}
        >
          <LogoutIcon sx={{ fontSize: iconPx, color: '#FFFFFF' }} />
        </IconButton>
      )}
    </div>
  );

  if (!center) {
    return (
      <div className={`flex items-center justify-between ${compact ? 'gap-1.5' : 'gap-4'}`}>
        <div className={`flex items-center ${compact ? 'gap-1.5' : 'gap-2.5 lg:gap-3'}`}>
          <FareLogo compact={compact} />
          {scorePill}
        </div>
        {controls}
      </div>
    );
  }

  if (compact) {
    return (
      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-2">
        <div className="flex shrink-0 items-center gap-1.5">
          <FareLogo compact={true} />
          {scorePill}
        </div>
        <div className="flex justify-center px-1">{center}</div>
        <div className="justify-self-end">{controls}</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-start gap-4">
      <div className="justify-self-start">
        <div className="flex items-center gap-2.5 lg:gap-3">
          <FareLogo />
          {scorePill}
        </div>
      </div>
      <div className="justify-self-center">{center}</div>
      <div className="justify-self-end">{controls}</div>
    </div>
  );
}
