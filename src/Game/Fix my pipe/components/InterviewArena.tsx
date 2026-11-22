import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import GroupsIcon from '@mui/icons-material/Groups';
import { TlHumanAvatar, CandidateHumanAvatar } from './HumanAvatars';
import { RAW_CASES, STAGES, translateText } from '../data';
import type { CardItem, Language } from '../types';

interface InterviewArenaProps {
  currentCase: typeof RAW_CASES[0];
  item: CardItem;
  lang: Language;
  isPerson: boolean;
  playerName?: string;
  hiredTeam: CardItem[];
  onAccept: () => void;
  onReject: () => void;
  disabled?: boolean;
}

export default function InterviewArena({
  currentCase,
  item,
  lang,
  isPerson,
  playerName,
  hiredTeam,
  onAccept,
  onReject,
  disabled = false,
}: InterviewArenaProps) {
  const en = lang === 'en';
  const stage = STAGES[currentCase.leak];

  // Hotkey support: ArrowLeft/Esc to reject, ArrowRight/Enter to hire
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (disabled) return;
      if (e.key === 'ArrowLeft' || e.key === 'Escape') {
        e.preventDefault();
        onReject();
      } else if (e.key === 'ArrowRight' || e.key === 'Enter') {
        e.preventDefault();
        onAccept();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onAccept, onReject, disabled]);

  const tlLabel = playerName ? `${playerName} (TL)` : en ? 'You (TL)' : 'మీరు (TL)';
  const candidateLabel = isPerson ? (en ? 'Candidate' : 'అభ్యర్థి') : en ? 'Idea' : 'ఐడియా';

  return (
    <div className="flex w-full flex-col gap-3">
      {/* 1. DIALOGUE SECTION: Two speech cards facing each other */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {/* LEFT SPEECH CARD: The Problem (from TL) */}
        <div className="relative flex flex-col justify-between rounded-[12px] border-l-4 border-[#DC2626] border-y border-r border-[#E2E8F0] bg-white p-3.5 shadow-sm dark:border-y-white/10 dark:border-r-white/10 dark:bg-[#0B172E] sm:p-4">
          <div>
            <div className="mb-1.5 flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-[#DC2626]">
              <WarningAmberIcon sx={{ fontSize: 13, color: '#DC2626' }} />
              <span>
                {en ? 'YOUR PROBLEM' : 'మీ PROBLEM'} · {stage?.name[lang]}
              </span>
            </div>
            <p className="text-xs font-semibold leading-relaxed text-[#0B1D3A] dark:text-slate-100 sm:text-sm">
              “{translateText(currentCase.q, lang)}”
            </p>
          </div>

          {/* Speech pointer triangle pointing down to TL */}
          <div className="absolute -bottom-2 left-8 h-2 w-3.5 overflow-hidden">
            <div className="mx-auto h-2.5 w-2.5 -translate-y-1.5 rotate-45 border-b border-r border-[#E2E8F0] bg-white dark:border-white/10 dark:bg-[#0B172E]" />
          </div>
        </div>

        {/* RIGHT SPEECH CARD: The Candidate Profile / Process Idea */}
        <AnimatePresence mode="wait">
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="relative flex flex-col justify-between rounded-[12px] border-r-4 border-[#C99A2E] border-y border-l border-[#E2E8F0] bg-white p-3.5 shadow-sm dark:border-y-white/10 dark:border-l-white/10 dark:bg-[#0B172E] sm:p-4"
          >
            <div>
              <div className="mb-1.5 flex items-center justify-between gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#C99A2E]">
                  {isPerson ? (en ? '👉 CANDIDATE PROFILE' : '👉 నేను · CANDIDATE') : en ? '💡 PROCESS IDEA' : '💡 ప్రాసెస్ ఐడియా'}
                </span>
                {item.model && (
                  <span className="rounded bg-[#0B1D3A]/5 px-2 py-0.5 text-[10px] font-bold text-[#0B1D3A] dark:bg-white/10 dark:text-slate-200">
                    {translateText(item.model, lang)}
                  </span>
                )}
              </div>

              <div className="mb-1.5 flex items-center gap-2">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-[6px] bg-[#F1F5F9] text-base dark:bg-white/10">
                  {item.emoji}
                </span>
                <h4 className="text-xs font-bold leading-snug text-[#0B1D3A] dark:text-white sm:text-sm">
                  {translateText(item.name, lang)}
                </h4>
              </div>

              {item.detail && (
                <p className="mb-2 text-xs italic text-[#475569] dark:text-slate-300">
                  “{translateText(item.detail, lang)}”
                </p>
              )}

              {/* Strengths & Trade-offs tags */}
              {isPerson && (item.pros || item.cons) && (
                <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                  {item.pros && (
                    <div className="flex items-start gap-1 rounded-[6px] bg-emerald-50 px-2 py-1 text-[11px] text-[#065F46] dark:bg-emerald-950/40 dark:text-emerald-300">
                      <ThumbUpIcon sx={{ fontSize: 11, color: '#16A34A', mt: '2px', shrink: 0 }} />
                      <span className="truncate">{translateText(item.pros, lang)}</span>
                    </div>
                  )}
                  {item.cons && (
                    <div className="flex items-start gap-1 rounded-[6px] bg-rose-50 px-2 py-1 text-[11px] text-[#9F1239] dark:bg-rose-950/40 dark:text-rose-300">
                      <ThumbDownIcon sx={{ fontSize: 11, color: '#DC2626', mt: '2px', shrink: 0 }} />
                      <span className="truncate">{translateText(item.cons, lang)}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Speech pointer triangle pointing down to Candidate */}
            <div className="absolute -bottom-2 right-8 h-2 w-3.5 overflow-hidden">
              <div className="mx-auto h-2.5 w-2.5 -translate-y-1.5 rotate-45 border-b border-r border-[#E2E8F0] bg-white dark:border-white/10 dark:bg-[#0B172E]" />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 2. THE ARENA FLOOR: Human TL on left, Team in middle, Human Candidate on right */}
      <div className="relative flex items-center justify-between rounded-[14px] border border-emerald-800/40 bg-gradient-to-b from-[#14261B] via-[#0E1E14] to-[#07130C] px-5 py-3 shadow-[inset_0_2px_8px_rgba(0,0,0,0.4)] sm:px-8 sm:py-4">
        {/* Left: Human TL Avatar */}
        <div className="shrink-0">
          <TlHumanAvatar name={tlLabel} />
        </div>

        {/* Center: YOUR TEAM Roster */}
        <div className="flex flex-col items-center justify-center px-2 text-center">
          <div className="mb-1 flex items-center gap-1 text-[10px] font-black uppercase tracking-[0.2em] text-[#A7F3D0]">
            <GroupsIcon sx={{ fontSize: 13, color: '#34D399' }} />
            <span>{en ? 'YOUR TEAM' : 'మీ టీమ్'}</span>
          </div>

          <div className="flex min-h-[34px] items-center gap-1.5">
            {hiredTeam.length === 0 ? (
              <span className="text-[10px] font-medium text-emerald-200/50">
                {en ? 'Hire specialists to fill slots' : 'స్లాట్లను భర్తీ చేయండి'}
              </span>
            ) : (
              hiredTeam.slice(-5).map((member, idx) => (
                <motion.div
                  key={`${member.id}-${idx}`}
                  initial={{ scale: 0, y: 6 }}
                  animate={{ scale: 1, y: 0 }}
                  className="grid h-7 w-7 place-items-center rounded-full border border-emerald-400/40 bg-[#064E3B] text-xs shadow-md"
                  title={member.name}
                >
                  {member.emoji}
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* Right: Human Candidate Avatar */}
        <div className="shrink-0">
          <CandidateHumanAvatar
            name={candidateLabel}
            badgeEmoji={item.emoji}
            isPerson={isPerson}
            itemKey={item.id}
          />
        </div>
      </div>

      {/* 3. PROMINENT HERO ACTION BUTTONS: Big Reject & Hire side by side */}
      <div className="grid grid-cols-2 gap-3 pt-1">
        <motion.button
          type="button"
          whileHover={{ y: -1.5, scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={onReject}
          disabled={disabled}
          className="group flex cursor-pointer items-center justify-center gap-2 rounded-[12px] border border-rose-300/40 bg-gradient-to-b from-[#EF4444] via-[#DC2626] to-[#B91C1C] py-3 px-4 font-bold text-white shadow-[0_6px_20px_rgba(220,38,38,0.32),0_3px_0_#991B1B] transition-all hover:brightness-105 active:brightness-95 disabled:cursor-not-allowed disabled:opacity-50 sm:py-3.5"
        >
          <span className="grid h-6 w-6 place-items-center rounded-[4px] bg-white/20">
            <CloseIcon sx={{ fontSize: 17, color: '#FFFFFF' }} />
          </span>
          <span className="text-sm sm:text-base">
            {isPerson ? (en ? 'Reject' : 'వద్దు') : en ? 'Pass' : 'వద్దు'}
          </span>
          <span className="hidden text-[10px] font-normal opacity-75 sm:inline">
            [←]
          </span>
        </motion.button>

        <motion.button
          type="button"
          whileHover={{ y: -1.5, scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={onAccept}
          disabled={disabled}
          className="group flex cursor-pointer items-center justify-center gap-2 rounded-[12px] border border-emerald-300/40 bg-gradient-to-b from-[#22C55E] via-[#16A34A] to-[#15803D] py-3 px-4 font-bold text-white shadow-[0_6px_20px_rgba(22,163,74,0.32),0_3px_0_#166534] transition-all hover:brightness-105 active:brightness-95 disabled:cursor-not-allowed disabled:opacity-50 sm:py-3.5"
        >
          <span className="grid h-6 w-6 place-items-center rounded-[4px] bg-white/20">
            <CheckIcon sx={{ fontSize: 18, color: '#FFFFFF' }} />
          </span>
          <span className="text-sm sm:text-base">
            {isPerson ? (en ? 'Hire' : 'నియమించు') : en ? 'Implement' : 'అమలు చేయండి'}
          </span>
          <span className="hidden text-[10px] font-normal opacity-75 sm:inline">
            [→]
          </span>
        </motion.button>
      </div>
    </div>
  );
}
