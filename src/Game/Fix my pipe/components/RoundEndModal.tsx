import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CloseIcon from '@mui/icons-material/Close';
import { Check3DIcon, Trophy3DIcon } from './Icons3D';
import { Language, GameMode, DecisionRecord } from '../types';
import { RAW_CASES, PROCESS_SOLUTIONS, translateText } from '../data';

interface RoundEndModalProps {
  isOpen: boolean;
  caseIndex: number;
  caseOrder: number[];
  mode: GameMode;
  lang: Language;
  leakLevel: number;
  history: DecisionRecord[];
  onContinue: () => void;
  onQuit: () => void;
}

export default function RoundEndModal({
  isOpen,
  caseIndex,
  caseOrder,
  mode,
  lang,
  leakLevel,
  history,
  onContinue,
  onQuit,
}: RoundEndModalProps) {
  if (!isOpen) return null;

  const currentCase = RAW_CASES[caseOrder[caseIndex]];
  const isFixed = leakLevel <= 0.08;
  const isPerson = mode === 1;

  let bestPicks: Array<{ name: string; score: number; reason: string; emoji: string }> = [];

  if (isPerson) {
    const raw = currentCase.p.filter((x: any) => x[2] >= 6);
    bestPicks = raw
      .map((x: any) => ({
        emoji: x[0],
        name: x[1],
        score: x[2],
        reason: x[3],
      }))
      .sort((a: any, b: any) => b.score - a.score);
  } else {
    const solutions = PROCESS_SOLUTIONS[currentCase.leak].filter((x) => x[2] === 10);
    bestPicks = solutions.map((x) => ({
      emoji: x[0],
      name: x[1],
      score: x[2],
      reason: x[3],
    }));
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B1D3A]/55 p-4 backdrop-blur-sm dark:bg-black/70">
      <div className="fare-card-3d relative max-h-[88vh] w-full max-w-xl overflow-y-auto rounded-[10px] p-6 md:p-7">
        <div className={`absolute inset-x-0 top-0 h-1 ${isFixed ? 'bg-[#16A34A]' : 'bg-[#C99A2E]'}`} />

        <button
          type="button"
          onClick={onQuit}
          aria-label={lang === 'en' ? 'Quit game' : 'గేమ్ ఆపండి'}
          className="fare-icon-3d absolute right-4 top-4 grid h-8 w-8 cursor-pointer place-items-center rounded-[6px] bg-[#0B1D3A] text-white transition hover:bg-[#DC2626] dark:bg-[#1A3463] dark:hover:bg-[#DC2626]"
        >
          <CloseIcon sx={{ fontSize: 17, color: '#FFFFFF' }} />
        </button>

        <div className="mb-5 text-center">
          <div
            className={`fare-icon-3d mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-[8px] text-white ${
              isFixed ? 'bg-[#16A34A]' : 'bg-[#C99A2E]'
            }`}
          >
            {isFixed ? <Trophy3DIcon size={26} /> : <WarningAmberIcon sx={{ fontSize: 24, color: '#FFFFFF' }} />}
          </div>
          <h2 className="text-xl font-bold tracking-tight text-[#0B1D3A] dark:text-white md:text-2xl">
            {isFixed
              ? lang === 'en' ? 'Pipeline Leak Completely Sealed!' : 'పైప్‌లైన్ లీక్ విజయవంతంగా పరిష్కరించబడింది!'
              : lang === 'en' ? 'Round Evaluation Complete' : 'రౌండ్ ముగిసింది'}
          </h2>
          <p className="mt-1 text-sm text-[#64748B] dark:text-slate-400">
            {isFixed
              ? lang === 'en' ? 'Optimal decisions increased revenue flow through the pipeline.' : 'మీ సరైన నిర్ణయాలతో కన్వర్షన్ వేగంగా పెరిగింది.'
              : lang === 'en' ? 'Some leaks still remain. Review the top solutions below.' : 'కొన్ని డ్రాప్-ఆఫ్స్ మిగిలి ఉన్నాయి. సరైన పరిష్కారాలను పరిశీలించండి.'}
          </p>
        </div>

        <div className="mb-6">
          <h4 className="mb-2.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#64748B] dark:text-slate-400">
            {isPerson
              ? lang === 'en' ? 'Top Candidate Fits For This Problem' : 'ఈ సమస్యకు సరిపోయే బెస్ట్ అభ్యర్థులు'
              : lang === 'en' ? 'Highest-Impact Process Fixes' : 'అత్యధిక ప్రభావం చూపించే సిస్టమ్స్'}
          </h4>
          <div className="space-y-2">
            {bestPicks.map((pick, i) => {
              const wasHired = history.some((h) => h.item.name === pick.name && h.decision === 'yes');
              return (
                <div
                  key={i}
                  className={`flex items-center justify-between gap-3 rounded-[8px] border p-3 text-xs md:text-sm ${
                    wasHired
                      ? 'border-emerald-300 bg-emerald-50/70 text-[#0B1D3A] dark:border-emerald-500/35 dark:bg-emerald-500/10 dark:text-emerald-200'
                      : 'border-[#E2E8F0] bg-[#F8F9FC] text-[#475569] dark:border-white/10 dark:bg-[#071124]/60 dark:text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg">{pick.emoji}</span>
                    <div>
                      <div className="font-semibold text-[#0B1D3A] dark:text-white">{translateText(pick.name, lang)}</div>
                      <div className="text-[11px] text-[#64748B] dark:text-slate-400">{translateText(pick.reason, lang)}</div>
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    {wasHired ? (
                      <span className="fare-icon-3d inline-flex items-center gap-1 rounded-[4px] bg-[#16A34A] px-2 py-0.5 text-[10px] font-bold text-white">
                        <Check3DIcon size={12} />
                        <span>{lang === 'en' ? (isPerson ? 'Hired' : 'Done') : isPerson ? 'నియమించారు' : 'అమలు'}</span>
                      </span>
                    ) : (
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[#94A3B8]">
                        {lang === 'en' ? 'Missed' : 'మిస్ అయింది'}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onQuit}
            className="fare-card-3d flex w-full cursor-pointer items-center justify-center rounded-[8px] px-3 py-3 text-xs font-semibold text-[#475569] transition hover:border-rose-300 hover:text-rose-700 dark:text-slate-300 dark:hover:border-rose-500/40 dark:hover:text-rose-300 sm:text-sm"
          >
            {lang === 'en' ? 'Quit to Lobby' : 'హోమ్‌కి వెళ్లండి'}
          </button>
          <button
            onClick={onContinue}
            className="flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-[8px] bg-gradient-to-br from-[#0B1D3A] to-[#1A3463] px-3 py-3 text-xs font-bold text-white shadow-[0_3px_0_#071429] transition hover:brightness-110 active:scale-[0.99] sm:text-sm"
          >
            <span className="truncate">{lang === 'en' ? 'Continue Next Phase' : 'తరువాతి దశకు వెళ్లండి'}</span>
            <ArrowForwardIcon sx={{ fontSize: 17, color: '#FFFFFF' }} />
          </button>
        </div>
      </div>
    </div>
  );
}
