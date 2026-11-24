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
  }
> = {
  ideal: {
    en: '🎯 Ideal decision',
    te: '🎯 సరైన నిర్ణయం',
    stripe: 'bg-[#16A34A]',
    cardTint: 'border-emerald-300/80 bg-emerald-50/40 dark:border-emerald-500/40 dark:bg-emerald-950/25',
    badgeCls: 'bg-emerald-600 text-white',
    ptsCls: 'bg-emerald-600 text-white',
  },
  part: {
    en: '🤔 Partial decision',
    te: '🤔 పాక్షిక నిర్ణయం',
    stripe: 'bg-[#D97706]',
    cardTint: 'border-amber-300/80 bg-amber-50/40 dark:border-amber-500/40 dark:bg-amber-950/25',
    badgeCls: 'bg-amber-500 text-[#0B1D3A]',
    ptsCls: 'bg-amber-500 text-[#0B1D3A]',
  },
  bad: {
    en: '❌ Incorrect decision',
    te: '❌ తప్పు నిర్ణయం',
    stripe: 'bg-[#DC2626]',
    cardTint: 'border-rose-300/80 bg-rose-50/40 dark:border-rose-500/40 dark:bg-rose-950/25',
    badgeCls: 'bg-rose-600 text-white',
    ptsCls: 'bg-rose-600 text-white',
  },
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

    return (
      <div
        className={`fare-card-3d relative w-full overflow-hidden rounded-[8px] sm:rounded-[10px] border ${qm.cardTint} ${
          dense ? 'p-3 sm:p-3.5' : 'p-3.5 sm:p-4 md:p-4.5'
        }`}
      >
        <span className={`absolute inset-x-0 top-0 h-1 ${qm.stripe}`} />

        {problem && (
          <div className={`border-b border-slate-200/80 dark:border-white/10 ${dense ? 'pb-2 mb-2 sm:pb-2.5 sm:mb-2.5' : 'pb-2.5 mb-3'}`}>
            <div className="flex items-center justify-between gap-2 text-[9.5px] font-bold uppercase tracking-[0.1em] text-[#DC2626] dark:text-rose-400">
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#DC2626] animate-pulse" />
                {problem.leakName ? `${problem.leakName} · ` : ''}{en ? 'Drop-off' : 'డ్రాప్-ఆఫ్'}
              </span>
              {problem.problemNumber && (
                <span className="text-[#C99A2E]">{problem.problemNumber}</span>
              )}
            </div>
            <h2 className={`mt-0.5 font-bold leading-snug text-[#0B1D3A] dark:text-white ${dense ? 'text-xs sm:text-[13px]' : 'text-sm sm:text-base'}`}>
              {problem.text}
            </h2>
          </div>
        )}

        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className={`grid shrink-0 place-items-center rounded-full border border-[#E2E8F0] bg-white dark:border-white/15 dark:bg-[#15284B] ${dense ? 'h-7 w-7 text-sm' : 'h-8 w-8 text-base'}`}>
              {item.emoji}
            </div>
            <span className={`truncate font-bold text-[#0B1D3A] dark:text-white ${dense ? 'text-xs sm:text-[13px]' : 'text-sm'}`}>
              {translateText(item.name, lang)}
            </span>
          </div>
          <span className={`shrink-0 rounded-full px-2.5 py-0.5 font-mono font-bold tabular-nums shadow-xs ${qm.ptsCls} ${dense ? 'text-xs' : 'text-xs sm:text-sm'}`}>
            {ptsText}
          </span>
        </div>

        <div className="mb-1.5">
          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-bold uppercase tracking-wider ${qm.badgeCls} ${dense ? 'text-[9px] sm:text-[9.5px]' : 'text-[10px]'}`}>
            {qm[lang]}
          </span>
        </div>

        <div className={`font-bold leading-snug text-[#0B1D3A] dark:text-white ${dense ? 'text-[13px] sm:text-sm mb-2' : 'text-base sm:text-[17px] mb-2.5'}`}>
          {translateText(feedback.text, lang)}
        </div>

        <div className={`flex items-start gap-2 rounded-[7px] border border-[#E2E8F0] bg-white/85 dark:border-white/10 dark:bg-[#071124]/65 ${dense ? 'px-2.5 py-2 mb-2' : 'px-3 py-2.5 mb-2.5'}`}>
          <span className="shrink-0 font-bold uppercase tracking-wider text-[#C99A2E] text-[10px] mt-0.5">
            {en ? 'Why' : 'ఎందుకు'}
          </span>
          <p className={`font-medium leading-snug text-[#1E293B] dark:text-slate-100 ${dense ? 'text-xs' : 'text-xs sm:text-sm'}`}>
            {translateText(item.reason, lang)}
          </p>
        </div>

        {isPerson && (item.detail || item.pros || item.cons) && (
          <div className={`border-t border-[#E2E8F0] dark:border-white/10 ${dense ? 'pt-2 space-y-1.5' : 'pt-2.5 space-y-2'}`}>
            <div className="text-[9.5px] font-bold uppercase tracking-widest text-[#64748B] dark:text-slate-400">
              {en ? 'About this profile' : 'ఈ ప్రొఫైల్ గురించి'}
            </div>
            {item.detail && (
              <p className={`text-[#475569] dark:text-slate-300 leading-snug ${dense ? 'text-[11px]' : 'text-xs'}`}>
                {translateText(item.detail, lang)}
              </p>
            )}
            {(item.pros || item.cons) && (
              <div className="grid gap-1">
                {item.pros && (
                  <div className={`flex items-start gap-2 rounded-[6px] bg-white/75 dark:bg-[#0B172E]/70 border border-[#E2E8F0]/80 dark:border-white/10 ${dense ? 'px-2 py-1 text-[11px]' : 'px-2.5 py-1.5 text-xs'}`}>
                    <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold text-[10px] mt-0.5">
                      +
                    </span>
                    <span className="text-[#0B1D3A] dark:text-slate-200 leading-snug">
                      {translateText(item.pros, lang)}
                    </span>
                  </div>
                )}
                {item.cons && (
                  <div className={`flex items-start gap-2 rounded-[6px] bg-white/75 dark:bg-[#0B172E]/70 border border-[#E2E8F0]/80 dark:border-white/10 ${dense ? 'px-2 py-1 text-[11px]' : 'px-2.5 py-1.5 text-xs'}`}>
                    <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 font-bold text-[10px] mt-0.5">
                      !
                    </span>
                    <span className="text-[#0B1D3A] dark:text-slate-200 leading-snug">
                      {translateText(item.cons, lang)}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {showActions && (
          <div className={`flex justify-center ${dense ? 'pt-2.5' : 'pt-3'}`}>
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
                  : 'తర్వాతి ఐడియా'
              }
              onClick={() => onNext?.()}
              className="!px-4 !py-1.5"
            />
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={`fare-card-3d relative w-full overflow-hidden rounded-[8px] sm:rounded-[10px] ${
        dense ? 'p-3 sm:p-3.5' : 'p-3.5 sm:p-4 md:p-4.5'
      }`}
    >
      <span className={`absolute inset-x-0 top-0 h-1 ${isPerson ? 'bg-[#0B1D3A] dark:bg-[#C99A2E]' : 'bg-[#0F766E]'}`} />

      {problem && (
        <div className={`border-b border-slate-200/80 dark:border-white/10 ${dense ? 'pb-2 mb-2 sm:pb-2.5 sm:mb-2.5' : 'pb-2.5 mb-3'}`}>
          <div className="flex items-center justify-between gap-2 text-[9.5px] font-bold uppercase tracking-[0.1em] text-[#DC2626] dark:text-rose-400">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#DC2626] animate-pulse" />
              {problem.leakName ? `${problem.leakName} · ` : ''}{en ? 'Drop-off' : 'డ్రాప్-ఆఫ్'}
            </span>
            {problem.problemNumber && (
              <span className="text-[#C99A2E]">{problem.problemNumber}</span>
            )}
          </div>
          <h2 className={`mt-0.5 font-bold leading-snug text-[#0B1D3A] dark:text-white ${dense ? 'text-xs sm:text-[13px]' : 'text-sm sm:text-base'}`}>
            {problem.text}
          </h2>
        </div>
      )}

      <div className={`flex items-start justify-between gap-1.5 sm:gap-2 ${dense ? 'mb-2 sm:mb-2.5' : 'mb-2.5'}`}>
        <div className="flex min-w-0 items-center gap-2 sm:gap-2.5">
          <div
            className={`grid shrink-0 place-items-center rounded-[8px] border ${
              isPerson
                ? 'border-[#E2E8F0] bg-[#F8F9FC] dark:border-white/10 dark:bg-[#15284B]'
                : 'border-teal-500/30 bg-teal-500/10 dark:border-teal-400/30 dark:bg-teal-950/50'
            } ${dense ? 'h-9 w-9 text-lg' : 'h-11 w-11 text-2xl'}`}
          >
            {item.emoji}
          </div>
          <div className="min-w-0">
            <div
              className={`flex items-center gap-1 font-bold uppercase tracking-[0.14em] ${
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
              <span>{isPerson ? (en ? 'Candidate to hire' : 'నియమించే అభ్యర్థి') : en ? 'Process idea' : 'ప్రాసెస్ ఐడియా'}</span>
            </div>
            <h3 className={`font-bold leading-tight text-[#0B1D3A] dark:text-white ${dense ? 'mt-0.5 text-[13.5px] sm:text-[15px]' : 'mt-0.5 text-base md:text-[18px]'}`}>
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
      </div>

      <div className={`rounded-[7px] border border-[#C99A2E]/30 bg-[#FEF3C7]/45 dark:border-[#C99A2E]/30 dark:bg-[#C99A2E]/10 ${dense ? 'px-3 py-2 mb-2' : 'px-3.5 py-2.5 mb-3'}`}>
        <p className={`font-bold text-[#92400E] dark:text-[#FDE68A] ${dense ? 'text-xs' : 'text-xs sm:text-sm'}`}>
          {isPerson
            ? en
              ? 'Can this person fix this problem?'
              : 'ఈ person ఈ problem ని fix చేయగలరా?'
            : en
            ? 'Will this idea fix this problem?'
            : 'ఈ ఐడియా ఈ problem ని fix చేస్తుందా?'}
        </p>
      </div>

      {showActions && (
        <div className={`flex items-center justify-center gap-2 sm:gap-2.5 ${dense ? 'pt-1' : 'pt-1.5'}`}>
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

          <div className="hidden sm:flex items-center gap-1.5 rounded-[8px] border border-[#DBE4FA] bg-[#F8F9FC] px-2.5 py-1.5 text-[11px] font-bold text-[#0B1D3A] shadow-xs dark:border-white/10 dark:bg-[#15284B] dark:text-slate-200">
            <span>{item.emoji}</span>
            <span className="max-w-[115px] truncate">{translateText(item.name, lang)}</span>
          </div>

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
        </div>
      )}
    </div>
  );
}
