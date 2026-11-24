import { motion, type Variants } from 'framer-motion';
import PersonIcon from '@mui/icons-material/Person';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Check3DIcon, Cross3DIcon } from './Icons3D';
import BigButton from './BigButton';
import { translateText } from '../data';
import type { CardItem, Language } from '../types';

const QUALITY_META: Record<
  'ideal' | 'part' | 'bad',
  {
    en: string;
    te: string;
    stripe: string;
    cardTint: string;
    badgeCls: string;
    ptsCls: string;
    glow: string;
  }
> = {
  ideal: {
    en: '🎯 Ideal decision',
    te: '🎯 సరైన నిర్ణయం',
    stripe: 'bg-[#16A34A]',
    cardTint: 'border-emerald-300/80 bg-emerald-50/40 dark:border-emerald-500/40 dark:bg-emerald-950/25',
    badgeCls: 'bg-emerald-600 text-white',
    ptsCls: 'bg-emerald-600 text-white',
    glow: 'rgba(22,163,74,0.35)',
  },
  part: {
    en: '🤔 Partial decision',
    te: '🤔 పాక్షిక నిర్ణయం',
    stripe: 'bg-[#D97706]',
    cardTint: 'border-amber-300/80 bg-amber-50/40 dark:border-amber-500/40 dark:bg-amber-950/25',
    badgeCls: 'bg-amber-500 text-[#0B1D3A]',
    ptsCls: 'bg-amber-500 text-[#0B1D3A]',
    glow: 'rgba(217,119,6,0.3)',
  },
  bad: {
    en: '❌ Incorrect decision',
    te: '❌ తప్పు నిర్ణయం',
    stripe: 'bg-[#DC2626]',
    cardTint: 'border-rose-300/80 bg-rose-50/40 dark:border-rose-500/40 dark:bg-rose-950/25',
    badgeCls: 'bg-rose-600 text-white',
    ptsCls: 'bg-rose-600 text-white',
    glow: 'rgba(220,38,38,0.3)',
  },
};

const EASE = [0.16, 1, 0.3, 1] as const;

const containerV: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const itemV: Variants = {
  hidden: { opacity: 0, y: 12, filter: 'blur(4px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.42, ease: EASE } },
};

const popV: Variants = {
  hidden: { opacity: 0, scale: 0.4 },
  show: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 520, damping: 18 } },
};

export interface CardFeedback {
  text: string;
  type: 'clamp' | 'tape' | 'fall' | 'crack' | 'reject_good' | 'reject_bad';
  scoreDelta: number;
  leakDelta: number;
  quality: 'ideal' | 'part' | 'bad';
  accepted: boolean;
}

export interface ProblemInfo {
  leakName?: string;
  problemNumber?: string;
  text: string;
}

function TopStripe({ className }: { className: string }) {
  return (
    <motion.span
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 0.6, ease: EASE }}
      style={{ originX: 0 }}
      className={`absolute inset-x-0 top-0 h-1 ${className}`}
    />
  );
}

function ProblemHeader({ problem, en, dense }: { problem: ProblemInfo; en: boolean; dense: boolean }) {
  return (
    <motion.div variants={itemV} className={`border-b border-slate-200/80 dark:border-white/10 ${dense ? 'pb-3' : 'pb-3.5'}`}>
      <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.12em]">
        <div className="flex items-center gap-1.5 text-[#DC2626] dark:text-rose-400">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#DC2626] opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#DC2626]" />
          </span>
          {problem.leakName ? `${problem.leakName} · ` : ''}
          {en ? 'Drop-off' : 'డ్రాప్-ఆఫ్'}
        </div>
      </div>
      <h2 className={`mt-1.5 font-semibold leading-snug text-[#0B1D3A] dark:text-white ${dense ? 'text-sm' : 'text-[15px] sm:text-base'}`}>
        {problem.text}
      </h2>
    </motion.div>
  );
}

interface DossierCardProps {
  item: CardItem;
  lang: Language;
  stageName?: string;
  problem?: ProblemInfo;
  awaitingNext?: boolean;
  feedback?: CardFeedback | null;
  isLastCard?: boolean;
  onAccept?: () => void;
  onReject?: () => void;
  onNext?: () => void;
  disabled?: boolean;
  showActions?: boolean;
  dense?: boolean;
}

export default function DossierCard({
  item,
  lang,
  stageName,
  problem,
  awaitingNext = false,
  feedback = null,
  isLastCard = false,
  onAccept,
  onReject,
  onNext,
  disabled = false,
  showActions = true,
  dense = false,
}: DossierCardProps) {
  const isPerson = item.type === 'candidate';
  const en = lang === 'en';

  if (awaitingNext && feedback) {
    const qm = QUALITY_META[feedback.quality];
    const ptsText = feedback.scoreDelta > 0 ? `+${feedback.scoreDelta}` : `${feedback.scoreDelta}`;
    const isBad = feedback.quality === 'bad';
    const isIdeal = feedback.quality === 'ideal';

    return (
      <motion.div
        variants={containerV}
        initial="hidden"
        animate="show"
        className={`fare-card-3d relative flex w-full flex-col overflow-hidden rounded-[10px] sm:rounded-[12px] border ${qm.cardTint} ${
          dense ? 'gap-3 p-4' : 'gap-3.5 p-5'
        }`}
      >
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          initial={{ boxShadow: `inset 0 0 0 0 ${qm.glow}` }}
          animate={
            isBad
              ? { x: [0, -7, 7, -5, 5, -2, 0], boxShadow: [`inset 0 0 0 0 ${qm.glow}`, `inset 0 0 28px 2px ${qm.glow}`, `inset 0 0 0 0 ${qm.glow}`] }
              : { boxShadow: [`inset 0 0 0 0 ${qm.glow}`, `inset 0 0 30px 3px ${qm.glow}`, `inset 0 0 10px 0 ${qm.glow}`] }
          }
          transition={{ duration: isBad ? 0.5 : 1.1, ease: 'easeOut' }}
        />
        <TopStripe className={qm.stripe} />

        {isIdeal && (
          <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
            {Array.from({ length: 10 }).map((_, i) => (
              <motion.span
                key={i}
                className="absolute top-3 h-1.5 w-1.5 rounded-full"
                style={{
                  left: `${8 + i * 9}%`,
                  background: ['#16A34A', '#C99A2E', '#38BDF8', '#F472B6'][i % 4],
                }}
                initial={{ y: 0, opacity: 1, scale: 1 }}
                animate={{ y: [0, -18 - (i % 3) * 8, 60], x: [0, (i % 2 ? 1 : -1) * 12], opacity: [1, 1, 0], rotate: 180 }}
                transition={{ duration: 1.3, delay: 0.15 + i * 0.03, ease: 'easeOut' }}
              />
            ))}
          </div>
        )}

        {problem && <ProblemHeader problem={problem} en={en} dense={dense} />}

        <motion.div variants={itemV} className="flex items-center justify-between gap-2.5">
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              className={`grid shrink-0 place-items-center rounded-[8px] border border-[#E2E8F0] bg-[#F8F9FC] dark:border-white/15 dark:bg-[#15284B] ${dense ? 'h-9 w-9 text-lg' : 'h-10 w-10 text-xl'}`}
            >
              {item.emoji}
            </motion.div>
            <h3 className={`font-semibold leading-snug text-[#0B1D3A] dark:text-white ${dense ? 'text-xs sm:text-sm' : 'text-sm sm:text-[15px]'}`}>
              {translateText(item.name, lang)}
            </h3>
          </div>
          <motion.span
            initial={{ scale: 0, rotate: -25, opacity: 0 }}
            animate={{ scale: [0, 1.35, 1], rotate: 0, opacity: 1 }}
            transition={{ duration: 0.55, delay: 0.25, ease: EASE }}
            className={`shrink-0 rounded-full px-2.5 py-0.5 font-mono font-semibold tabular-nums shadow-xs ${qm.ptsCls} ${dense ? 'text-xs' : 'text-xs sm:text-sm'}`}
          >
            {ptsText}
          </motion.span>
        </motion.div>

        <motion.div variants={itemV} className="flex flex-col items-start gap-1.5">
          <motion.span
            variants={popV}
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-semibold uppercase tracking-wider ${qm.badgeCls} ${dense ? 'text-[9.5px]' : 'text-[10px]'}`}
          >
            {qm[lang]}
          </motion.span>
          <div className={`font-semibold leading-snug text-[#0B1D3A] dark:text-white ${dense ? 'text-xs sm:text-[13.5px]' : 'text-sm sm:text-[15px]'}`}>
            {translateText(feedback.text, lang)}
          </div>
        </motion.div>

        <motion.div
          variants={itemV}
          className={`flex items-start gap-2.5 rounded-[8px] border border-[#E2E8F0] bg-white/85 dark:border-white/10 dark:bg-[#071124]/65 ${dense ? 'px-3 py-2.5' : 'px-3.5 py-3'}`}
        >
          <span className="shrink-0 font-semibold uppercase tracking-wider text-[#C99A2E] text-[10px] mt-0.5">
            {en ? 'Why' : 'ఎందుకు'}
          </span>
          <p className={`font-medium leading-snug text-[#1E293B] dark:text-slate-100 ${dense ? 'text-xs' : 'text-xs sm:text-sm'}`}>
            {translateText(item.reason, lang)}
          </p>
        </motion.div>

        {isPerson && (item.detail || item.pros || item.cons) && (
          <motion.div
            variants={itemV}
            className={`flex flex-col border-t border-[#E2E8F0] dark:border-white/10 ${dense ? 'pt-3 gap-2' : 'pt-3.5 gap-2.5'}`}
          >
            <div className="text-[10px] font-semibold uppercase tracking-widest text-[#64748B] dark:text-slate-400">
              {en ? 'About this profile' : 'ఈ ప్రొఫైల్ గురించి'}
            </div>
            {item.detail && (
              <p className={`text-[#475569] dark:text-slate-300 leading-relaxed ${dense ? 'text-xs' : 'text-[13px]'}`}>
                {translateText(item.detail, lang)}
              </p>
            )}
            {(item.pros || item.cons) && (
              <div className="grid gap-1.5">
                {item.pros && (
                  <motion.div
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.45, duration: 0.35, ease: EASE }}
                    className={`flex items-start gap-2.5 rounded-[8px] bg-white/75 dark:bg-[#0B172E]/70 border border-[#E2E8F0]/80 dark:border-white/10 ${dense ? 'px-3 py-2 text-xs' : 'px-3.5 py-2.5 text-[13px]'}`}
                  >
                    <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-semibold text-[10px] mt-0.5">
                      +
                    </span>
                    <span className="text-[#0B1D3A] dark:text-slate-200 leading-snug">{translateText(item.pros, lang)}</span>
                  </motion.div>
                )}
                {item.cons && (
                  <motion.div
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.55, duration: 0.35, ease: EASE }}
                    className={`flex items-start gap-2.5 rounded-[8px] bg-white/75 dark:bg-[#0B172E]/70 border border-[#E2E8F0]/80 dark:border-white/10 ${dense ? 'px-3 py-2 text-xs' : 'px-3.5 py-2.5 text-[13px]'}`}
                  >
                    <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 font-semibold text-[10px] mt-0.5">
                      !
                    </span>
                    <span className="text-[#0B1D3A] dark:text-slate-200 leading-snug">{translateText(item.cons, lang)}</span>
                  </motion.div>
                )}
              </div>
            )}
          </motion.div>
        )}

        {showActions && (
          <motion.div variants={itemV} className="flex justify-center pt-1">
            <motion.div animate={{ scale: [1, 1.04, 1] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}>
              <BigButton
                tone="gold"
                size="sm"
                compactWidth={true}
                trailing={false}
                iconNode={<ArrowForwardIcon sx={{ fontSize: 15, color: '#FFFFFF' }} />}
                title={
                  isLastCard
                    ? en
                      ? 'See problem summary'
                      : 'సమస్య సారాంశం చూడండి'
                    : isPerson
                    ? en
                      ? 'Next candidate'
                      : 'తర్వాతి అభ్యర్థి'
                    : en
                    ? 'Next Idea'
                    : 'తర్వాతి ఆలోచన'
                }
                onClick={() => onNext?.()}
                className="!px-4 !py-1.5"
              />
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerV}
      initial="hidden"
      animate="show"
      className={`fare-card-3d relative flex w-full flex-col overflow-hidden rounded-[10px] sm:rounded-[12px] ${dense ? 'gap-3 p-4' : 'gap-3.5 p-5'}`}
    >
      <TopStripe className={isPerson ? 'bg-[#0B1D3A] dark:bg-[#C99A2E]' : 'bg-[#0F766E]'} />

      {problem && <ProblemHeader problem={problem} en={en} dense={dense} />}

      <motion.div variants={itemV} className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <motion.div
            initial={{ scale: 0.5, rotate: -12, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1, y: [0, -3, 0] }}
            transition={{
              scale: { type: 'spring', stiffness: 420, damping: 16, delay: 0.12 },
              rotate: { type: 'spring', stiffness: 420, damping: 16, delay: 0.12 },
              opacity: { duration: 0.2, delay: 0.12 },
              y: { duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: 0.6 },
            }}
            whileHover={{ scale: 1.08, rotate: 4 }}
            className={`grid shrink-0 place-items-center rounded-[8px] border ${
              isPerson
                ? 'border-[#E2E8F0] bg-[#F8F9FC] dark:border-white/10 dark:bg-[#15284B]'
                : 'border-teal-500/30 bg-teal-500/10 dark:border-teal-400/30 dark:bg-teal-950/50'
            } ${dense ? 'h-11 w-11 text-xl' : 'h-12 w-12 text-2xl'}`}
          >
            {item.emoji}
          </motion.div>
          <div className="min-w-0">
            <div
              className={`flex items-center gap-1 font-semibold uppercase tracking-[0.14em] ${
                isPerson ? 'text-[#C99A2E]' : 'text-[#0F766E] dark:text-teal-400'
              } ${dense ? 'text-[8.5px] sm:text-[9px]' : 'text-[9.5px]'}`}
            >
              <span
                className={`grid h-3 w-3 place-items-center rounded-[2px] text-white ${
                  isPerson ? 'bg-[#0B1D3A] dark:bg-[#C99A2E]' : 'bg-[#0F766E]'
                }`}
              >
                {isPerson ? (
                  <PersonIcon sx={{ fontSize: dense ? 9 : 11, color: '#FFFFFF' }} />
                ) : (
                  <LightbulbIcon sx={{ fontSize: dense ? 9 : 11, color: '#FFFFFF' }} />
                )}
              </span>
              <span>{isPerson ? (en ? 'Candidate to hire' : 'నియమించే అభ్యర్థి') : en ? 'Process idea' : 'విధాన ఆలోచన'}</span>
            </div>
            <h3 className={`font-semibold leading-snug text-[#0B1D3A] dark:text-white ${dense ? 'mt-1 text-sm sm:text-[15px]' : 'mt-1 text-base md:text-[17px]'}`}>
              {translateText(item.name, lang)}
            </h3>
            {!isPerson && stageName && (
              <div className="mt-1 flex flex-wrap items-center gap-1.5">
                <span className="inline-flex items-center rounded-full border border-teal-500/30 bg-teal-500/10 px-2 py-0.5 text-[10px] font-semibold text-[#0F766E] dark:text-teal-300">
                  {stageName} {en ? 'stage' : 'దశ'}
                </span>
              </div>
            )}
          </div>
        </div>
        {isPerson && item.model && (
          <span className={`hidden shrink-0 items-center gap-1 rounded-[4px] bg-[#0B1D3A] font-semibold text-white dark:bg-[#15284B] sm:flex ${dense ? 'px-2 py-0.5 text-[9.5px]' : 'px-2.5 py-0.5 text-[10.5px]'}`}>
            <AccountBalanceWalletIcon sx={{ fontSize: dense ? 11 : 12, color: '#FFFFFF' }} />
            {translateText(item.model, lang)}
          </span>
        )}
      </motion.div>

      <motion.div
        variants={itemV}
        className={`relative overflow-hidden rounded-[8px] border border-[#C99A2E]/30 bg-[#FEF3C7]/45 dark:border-[#C99A2E]/30 dark:bg-[#C99A2E]/10 ${dense ? 'px-3.5 py-2.5' : 'px-4 py-3'}`}
      >
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/70 to-transparent dark:via-white/15"
          animate={{ x: ['0%', '420%'] }}
          transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 1.6, ease: 'easeInOut', delay: 0.6 }}
        />
        <p className={`relative flex items-center gap-1.5 font-semibold text-[#92400E] dark:text-[#FDE68A] ${dense ? 'text-xs' : 'text-xs sm:text-sm'}`}>
          <motion.span
            animate={{ rotate: [0, -12, 12, -6, 0] }}
            transition={{ duration: 0.9, repeat: Infinity, repeatDelay: 2.2 }}
            className="inline-block"
          >
            🤔
          </motion.span>
          {isPerson
            ? en
              ? 'Can this person fix this problem?'
              : 'ఈ వ్యక్తి ఈ సమస్యను పరిష్కరించగలరా?'
            : en
            ? 'Will this idea fix this problem?'
            : 'ఈ ఆలోచన ఈ సమస్యను పరిష్కరిస్తుందా?'}
        </p>
      </motion.div>

      {showActions && (
        <motion.div variants={itemV} className="flex items-center justify-center gap-2.5 pt-1">
          <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.94 }}>
            <BigButton
              tone="red"
              size="sm"
              compactWidth={true}
              trailing={false}
              iconNode={<Cross3DIcon size={dense ? 13 : 14} />}
              title={isPerson ? (en ? 'Reject' : 'వద్దు') : en ? 'Pass' : 'వద్దు'}
              onClick={() => onReject?.()}
              disabled={disabled}
              className={dense ? '!py-1.5 !px-3 !text-xs min-w-[92px]' : '!py-2 !px-3.5 min-w-[115px]'}
            />
          </motion.div>
          <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.94 }}>
            <BigButton
              tone="green"
              size="sm"
              compactWidth={true}
              trailing={false}
              iconNode={<Check3DIcon size={dense ? 13 : 15} />}
              title={isPerson ? (en ? 'Hire' : 'నియమించు') : en ? 'Implement' : 'అమలు చేయండి'}
              onClick={() => onAccept?.()}
              disabled={disabled}
              className={dense ? '!py-1.5 !px-3 !text-xs min-w-[92px]' : '!py-2 !px-3.5 min-w-[115px]'}
            />
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
