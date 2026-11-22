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
import SettingsIcon from '@mui/icons-material/Settings';
import TranslateIcon from '@mui/icons-material/Translate';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CloseIcon from '@mui/icons-material/Close';
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
  const [moreOpen, setMoreOpen] = useState(false);
  const moreMenuRef = useRef<HTMLDivElement>(null);
  const isHome = screen === 'home';
  const shown = useCountUp(isHome ? bestScore : score);
  const elapsed = useElapsed(startedAt, finishedAt);
  const totalGoals = caseOrder.length || 3;
  const iconPx = compact ? 15 : 18;
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

  // Close more menu when clicking outside
  useEffect(() => {
    if (!moreOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (moreMenuRef.current && !moreMenuRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [moreOpen]);

  const scorePill = (
    <div className={`flex items-center rounded-[8px] ${surface} ${compact ? 'gap-1.5 px-2 py-1' : 'gap-2 px-2.5 py-1.5'}`}>
      <div className={`fare-icon-3d grid place-items-center rounded-[5px] bg-[#0B1D3A] text-white dark:bg-[#1A3463] ${compact ? 'h-6 w-6' : 'h-8 w-8'}`}>
        <PersonIcon sx={{ fontSize: compact ? 15 : 18, color: '#FFFFFF' }} />
      </div>
      <div className="leading-tight">
        <div className={`font-semibold uppercase tracking-wider text-[#64748B] dark:text-slate-400 ${compact ? 'text-[8px]' : 'text-[9px]'}`}>
          {isHome ? (lang === 'en' ? 'Best Score' : 'బెస్ట్ స్కోర్') : lang === 'en' ? 'Your Score' : 'మీ స్కోర్'}
        </div>
        <div className="flex items-center gap-1">
          <span className={`font-black tabular-nums text-[#0B1D3A] dark:text-white ${compact ? 'text-xs sm:text-sm' : 'text-base sm:text-lg'}`}>
            {shown.toLocaleString()}
          </span>
          <span className={`fare-icon-3d grid ${compact ? 'h-3.5 w-3.5' : 'h-4 w-4'} place-items-center rounded-[3px] bg-[#C99A2E] text-white`}>
            <Star3DIcon size={compact ? 9 : 11} />
          </span>
        </div>
      </div>
    </div>
  );

  const controls = (
    <div className={`flex items-center ${compact ? 'gap-1' : 'gap-2'}`}>
      {/* Goals Pill */}
      <div className={`flex items-center rounded-[8px] ${surface} ${compact ? 'gap-1.5 px-2 py-1' : 'gap-1.5 px-2 py-1'}`}>
        <Target3DIcon size={compact ? 18 : 22} />
        <div className="leading-tight">
          {!compact && <div className="text-[8.5px] font-bold uppercase tracking-wider text-[#64748B] dark:text-slate-400">{lang === 'en' ? 'Goals' : 'లక్ష్యాలు'}</div>}
          <div className={`font-extrabold tabular-nums ${compact ? 'text-[11px]' : 'text-xs'}`}>
            {sealedCount}/{totalGoals}
          </div>
        </div>
      </div>

      {/* Timer Pill */}
      {(!compact || screen === 'play') && (
        <div className={`flex items-center rounded-[8px] ${surface} ${compact ? 'gap-1 px-1.5 py-1' : 'gap-1.5 px-2 py-1'}`}>
          <span className={`fare-icon-3d grid ${compact ? 'h-5 w-5' : 'h-6 w-6'} place-items-center rounded-[4px] bg-[#2563EB] text-white`}>
            <Timer3DIcon size={compact ? 13 : 15} />
          </span>
          <span className={`${compact ? 'text-[11px]' : 'text-xs'} font-extrabold tabular-nums`}>{fmt(elapsed)}</span>
        </div>
      )}

      {/* Merged "More Options" Control for Desktop / Full view */}
      {!compact ? (
        <div className="relative" ref={moreMenuRef}>
          <button
            type="button"
            onClick={() => setMoreOpen(!moreOpen)}
            aria-label={lang === 'en' ? 'More Options' : 'మరిన్ని ఆప్షన్స్'}
            title={lang === 'en' ? 'Game Options & Settings' : 'గేమ్ ఆప్షన్స్ & సెట్టింగ్స్'}
            className={`fare-card-3d flex cursor-pointer items-center gap-1.5 rounded-[8px] border px-2.5 py-1 text-xs font-bold text-[#0B1D3A] transition active:scale-95 dark:text-white ${
              moreOpen ? 'border-[#C99A2E] ring-1 ring-[#C99A2E]' : 'border-[#DBE4FA] dark:border-white/15'
            }`}
          >
            <span className="fare-icon-3d grid h-6 w-6 place-items-center rounded-[4px] bg-[#0B1D3A] text-white dark:bg-[#1A3463]">
              <SettingsIcon sx={{ fontSize: 15, color: '#FFFFFF' }} />
            </span>
            <span className="hidden font-bold sm:inline">{lang === 'en' ? 'Options' : 'ఆప్షన్స్'}</span>
            <KeyboardArrowDownIcon
              sx={{
                fontSize: 16,
                transform: moreOpen ? 'rotate(180deg)' : 'none',
                transition: 'transform 0.2s',
                color: '#64748B',
              }}
            />
          </button>

          {/* More Options Dropdown Panel */}
          {moreOpen && (
            <>
              <div
                className="fixed inset-0 z-40 bg-black/10 dark:bg-black/30"
                onClick={() => setMoreOpen(false)}
              />
              <div
                className="fare-card-3d absolute right-0 top-full mt-2 z-50 w-72 origin-top-right rounded-[6px] border border-[#DBE4FA] bg-white/98 p-3 shadow-[0_12px_32px_rgba(11,29,58,0.22)] backdrop-blur-md transition-all dark:border-white/15 dark:bg-[#0E1E3D]/98"
                style={{ borderRadius: '6px' }}
              >
                <div className="mb-2.5 flex items-center justify-between border-b border-[#DBE4FA] pb-2 dark:border-white/10">
                  <div className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#0B1D3A] dark:text-white">
                    <SettingsIcon sx={{ fontSize: 15, color: '#C99A2E' }} />
                    <span>{lang === 'en' ? 'Game Options' : 'గేమ్ ఆప్షన్స్'}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMoreOpen(false)}
                    className="grid h-5 w-5 place-items-center rounded-[4px] text-[#64748B] hover:bg-[#F1F5F9] dark:hover:bg-white/10"
                    aria-label="Close options"
                  >
                    <CloseIcon sx={{ fontSize: 14 }} />
                  </button>
                </div>

                <div className="flex flex-col gap-1.5">
                  {/* Sound FX Toggle */}
                  <button
                    type="button"
                    onClick={() => setSound(!sound)}
                    className="group flex w-full cursor-pointer items-center justify-between rounded-[4px] border border-[#DBE4FA]/80 p-2 text-left transition hover:border-[#2563EB]/50 hover:bg-[#F8F9FD] dark:border-white/10 dark:hover:bg-white/5"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`fare-icon-3d grid h-7 w-7 place-items-center rounded-[4px] text-white ${
                          sound ? 'bg-[#16A34A]' : 'bg-[#64748B]'
                        }`}
                      >
                        {sound ? <VolumeUpIcon sx={{ fontSize: 16, color: '#FFFFFF' }} /> : <VolumeOffIcon sx={{ fontSize: 16, color: '#FFFFFF' }} />}
                      </span>
                      <div>
                        <div className="text-xs font-bold text-[#0B1D3A] dark:text-white">{lang === 'en' ? 'Sound FX' : 'సౌండ్ ఎఫెక్ట్స్'}</div>
                        <div className="text-[10px] text-[#64748B] dark:text-slate-400">{sound ? (lang === 'en' ? 'Audio enabled' : 'ఆన్') : (lang === 'en' ? 'Muted' : 'ఆఫ్')}</div>
                      </div>
                    </div>
                    <span
                      className={`rounded-[3px] px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-white ${
                        sound ? 'bg-[#16A34A]' : 'bg-[#64748B]'
                      }`}
                    >
                      {sound ? 'ON' : 'OFF'}
                    </span>
                  </button>

                  {/* Song / Music Toggle */}
                  <button
                    type="button"
                    onClick={() => setSong(!song)}
                    className="group flex w-full cursor-pointer items-center justify-between rounded-[4px] border border-[#DBE4FA]/80 p-2 text-left transition hover:border-[#2563EB]/50 hover:bg-[#F8F9FD] dark:border-white/10 dark:hover:bg-white/5"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`fare-icon-3d grid h-7 w-7 place-items-center rounded-[4px] text-white ${
                          song ? 'bg-[#4F46E5]' : 'bg-[#64748B]'
                        }`}
                      >
                        {song ? <MusicNoteIcon sx={{ fontSize: 16, color: '#FFFFFF' }} /> : <MusicOffIcon sx={{ fontSize: 16, color: '#FFFFFF' }} />}
                      </span>
                      <div>
                        <div className="text-xs font-bold text-[#0B1D3A] dark:text-white">{lang === 'en' ? 'Music / Song' : 'సంగీతం'}</div>
                        <div className="text-[10px] text-[#64748B] dark:text-slate-400">{song ? (lang === 'en' ? 'Soundtrack playing' : 'ప్లే అవుతోంది') : (lang === 'en' ? 'Soundtrack paused' : 'ఆగిపోయింది')}</div>
                      </div>
                    </div>
                    <span
                      className={`rounded-[3px] px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-white ${
                        song ? 'bg-[#4F46E5]' : 'bg-[#64748B]'
                      }`}
                    >
                      {song ? 'ON' : 'OFF'}
                    </span>
                  </button>

                  {/* Theme Mode Toggle */}
                  <button
                    type="button"
                    onClick={handleThemeToggle}
                    className="group flex w-full cursor-pointer items-center justify-between rounded-[4px] border border-[#DBE4FA]/80 p-2 text-left transition hover:border-[#2563EB]/50 hover:bg-[#F8F9FD] dark:border-white/10 dark:hover:bg-white/5"
                  >
                    <div className="flex items-center gap-2">
                      <span className="fare-icon-3d grid h-7 w-7 place-items-center rounded-[4px] bg-[#0B1D3A] text-white dark:bg-[#1A3463]">
                        {isDark ? <LightModeIcon sx={{ fontSize: 16, color: '#F59E0B' }} /> : <DarkModeIcon sx={{ fontSize: 16, color: '#FFFFFF' }} />}
                      </span>
                      <div>
                        <div className="text-xs font-bold text-[#0B1D3A] dark:text-white">{lang === 'en' ? 'Theme Mode' : 'థీమ్ మోడ్'}</div>
                        <div className="text-[10px] text-[#64748B] dark:text-slate-400">{isDark ? (lang === 'en' ? 'Dark theme' : 'డార్క్ థీమ్') : (lang === 'en' ? 'Light theme' : 'లైట్ థీమ్')}</div>
                      </div>
                    </div>
                    <span className="rounded-[3px] border border-[#DBE4FA] bg-[#F1F5F9] px-2 py-0.5 text-[10px] font-bold text-[#0B1D3A] dark:border-white/15 dark:bg-white/10 dark:text-white">
                      {isDark ? 'Dark' : 'Light'}
                    </span>
                  </button>

                  {/* Language Toggle */}
                  <button
                    type="button"
                    onClick={() => setLang(lang === 'te' ? 'en' : 'te')}
                    className="group flex w-full cursor-pointer items-center justify-between rounded-[4px] border border-[#DBE4FA]/80 p-2 text-left transition hover:border-[#2563EB]/50 hover:bg-[#F8F9FD] dark:border-white/10 dark:hover:bg-white/5"
                  >
                    <div className="flex items-center gap-2">
                      <span className="fare-icon-3d grid h-7 w-7 place-items-center rounded-[4px] bg-[#2563EB] text-white">
                        <TranslateIcon sx={{ fontSize: 16, color: '#FFFFFF' }} />
                      </span>
                      <div>
                        <div className="text-xs font-bold text-[#0B1D3A] dark:text-white">{lang === 'en' ? 'Language' : 'భాష'}</div>
                        <div className="text-[10px] text-[#64748B] dark:text-slate-400">{lang === 'en' ? 'తెలుగులోకి మార్చండి' : 'Switch to English'}</div>
                      </div>
                    </div>
                    <span className="rounded-[3px] bg-[#2563EB] px-2 py-0.5 text-[10px] font-black text-white">
                      {lang === 'te' ? 'తెలుగు' : 'English'}
                    </span>
                  </button>

                  {/* Team Roster (during play with hires) */}
                  {screen === 'play' && hiredTeam.length > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        setMoreOpen(false);
                        openRoster();
                      }}
                      className="group flex w-full cursor-pointer items-center justify-between rounded-[4px] border border-[#DBE4FA]/80 p-2 text-left transition hover:border-[#2563EB]/50 hover:bg-[#F8F9FD] dark:border-white/10 dark:hover:bg-white/5"
                    >
                      <div className="flex items-center gap-2">
                        <span className="fare-icon-3d grid h-7 w-7 place-items-center rounded-[4px] bg-[#0B1D3A] text-white dark:bg-[#1A3463]">
                          <GroupsIcon sx={{ fontSize: 16, color: '#FFFFFF' }} />
                        </span>
                        <div>
                          <div className="text-xs font-bold text-[#0B1D3A] dark:text-white">{lang === 'en' ? 'Team Roster' : 'హైర్ చేసిన టీమ్'}</div>
                          <div className="text-[10px] text-[#64748B] dark:text-slate-400">{hiredTeam.length} {lang === 'en' ? 'hires' : 'సభ్యులు'}</div>
                        </div>
                      </div>
                    </button>
                  )}

                  {/* Quit Game Option */}
                  {!isHome && (
                    <button
                      type="button"
                      onClick={() => {
                        setMoreOpen(false);
                        handleQuitClick();
                      }}
                      className="mt-1 flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-[4px] bg-[#DC2626] p-2 text-xs font-bold text-white transition hover:bg-[#B91C1C] active:scale-95"
                    >
                      <LogoutIcon sx={{ fontSize: 15, color: '#FFFFFF' }} />
                      <span>{lang === 'en' ? 'Quit Current Game' : 'గేమ్ ఆపండి'}</span>
                    </button>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        /* Compact icon buttons for mobile/short landscape */
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
          <IconButton
            compact={compact}
            onClick={handleThemeToggle}
            label={isDark ? (lang === 'en' ? 'Light theme' : 'లైట్ థీమ్') : lang === 'en' ? 'Dark theme' : 'డార్క్ థీమ్'}
          >
            {isDark ? <LightModeIcon sx={{ fontSize: iconPx, color: '#FFFFFF' }} /> : <DarkModeIcon sx={{ fontSize: iconPx, color: '#FFFFFF' }} />}
          </IconButton>
          <IconButton compact={compact} onClick={() => setLang(lang === 'te' ? 'en' : 'te')} label={lang === 'te' ? 'English' : 'తెలుగు'}>
            <span className="font-bold text-white text-[10px]">{lang === 'te' ? 'EN' : 'తె'}</span>
          </IconButton>
        </>
      )}

      {/* Quick Quit button during play screen */}
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
