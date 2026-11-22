import RefreshIcon from '@mui/icons-material/Refresh';
import { Layers3DIcon, Star3DIcon, Trophy3DIcon } from './Icons3D';
import { Language, GameMode, CardItem } from '../types';
import { translateText } from '../data';

interface ResultScreenProps {
  score: number;
  goodCount: number;
  totalDecisions: number;
  maxCombo: number;
  mode: GameMode;
  lang: Language;
  hiredTeam: CardItem[];
  onPlayAgain: () => void;
  onSwitchMode: () => void;
  onOpenCta: () => void;
  onHome: () => void;
}

export default function ResultScreen({
  score,
  goodCount,
  totalDecisions,
  maxCombo,
  mode,
  lang,
  hiredTeam,
  onPlayAgain,
  onSwitchMode,
  onOpenCta,
  onHome,
}: ResultScreenProps) {
  const accuracy = totalDecisions > 0 ? Math.round((goodCount / totalDecisions) * 100) : 0;
  const stars = accuracy >= 80 ? 3 : accuracy >= 55 ? 2 : 1;
  const isPerson = mode === 1;

  const performanceTitle = {
    en: accuracy >= 80 ? 'Master Pipeline Executive' : accuracy >= 55 ? 'Competent Sales Leader' : 'Pipeline Needs Optimization',
    te: accuracy >= 80 ? 'అత్యుత్తమ సేల్స్ లీడర్!' : accuracy >= 55 ? 'మంచి నిర్ణయాలు తీసుకున్నారు' : 'ఇంకా మెరుగుపడాల్సిన అవసరం ఉంది',
  };

  return (
    <div className="mx-auto w-full max-w-2xl p-2 md:p-4">
      <div className="fare-card-3d relative overflow-hidden rounded-[10px] p-6 md:p-8">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#0B1D3A] via-[#C99A2E] to-[#16A34A]" />

        <div className="mb-7 text-center">
          <div className="mb-3 flex items-center justify-center gap-2">
            {[1, 2, 3].map((starIdx) => (
              <span
                key={starIdx}
                className={`fare-icon-3d grid h-10 w-10 place-items-center rounded-[8px] ${
                  starIdx <= stars ? 'bg-[#C99A2E] text-white' : 'bg-[#CBD5E1] text-white opacity-50 dark:bg-slate-800 dark:text-slate-600'
                }`}
              >
                <Star3DIcon size={22} />
              </span>
            ))}
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-[#0B1D3A] dark:text-white md:text-3xl">
            {performanceTitle[lang]}
          </h2>
          <p className="mt-1 text-sm text-[#64748B] dark:text-slate-400">
            {lang === 'en'
              ? `You resolved ${goodCount} of ${totalDecisions} pipeline challenges with strategic decisions.`
              : `${totalDecisions} అవకాశాలలో ${goodCount} సరైన నిర్ణయాలు తీసుకున్నారు.`}
          </p>
        </div>

        <div className="mb-6 grid grid-cols-3 gap-3">
          <div className="rounded-[8px] border border-[#E2E8F0] bg-[#F8F9FC] p-4 text-center dark:border-white/10 dark:bg-[#071124]/60">
            <div className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[#64748B] dark:text-slate-400">
              {lang === 'en' ? 'FINAL SCORE' : 'మొత్తం స్కోరు'}
            </div>
            <div className="font-mono text-2xl font-black text-[#C99A2E] md:text-3xl">{score.toLocaleString()}</div>
          </div>

          <div className="rounded-[8px] border border-[#E2E8F0] bg-[#F8F9FC] p-4 text-center dark:border-white/10 dark:bg-[#071124]/60">
            <div className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[#64748B] dark:text-slate-400">
              {lang === 'en' ? 'ACCURACY' : 'ఖచ్చితత్వం'}
            </div>
            <div className="font-mono text-2xl font-black text-[#16A34A] md:text-3xl">{accuracy}%</div>
          </div>

          <div className="rounded-[8px] border border-[#E2E8F0] bg-[#F8F9FC] p-4 text-center dark:border-white/10 dark:bg-[#071124]/60">
            <div className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[#64748B] dark:text-slate-400">
              {lang === 'en' ? 'MAX STREAK' : 'గరిష్ట స్ట్రీక్'}
            </div>
            <div className="font-mono text-2xl font-black text-[#2563EB] dark:text-sky-400 md:text-3xl">{maxCombo}x</div>
          </div>
        </div>

        {hiredTeam.length > 0 && (
          <div className="mb-6 rounded-[8px] border border-[#E2E8F0] bg-[#F8F9FC] p-4 dark:border-white/10 dark:bg-[#071124]/60">
            <h4 className="mb-3 flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.14em] text-[#64748B] dark:text-slate-400">
              <span>{isPerson ? (lang === 'en' ? 'Hired Team Roster' : 'హైర్ చేసిన టీమ్') : lang === 'en' ? 'Implemented Solutions' : 'అమలు చేసిన సిస్టమ్స్'}</span>
              <span className="text-[#C99A2E]">
                {hiredTeam.length} {lang === 'en' ? 'Assets' : 'అసెట్లు'}
              </span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {hiredTeam.map((h, i) => (
                <div
                  key={i}
                  className="inline-flex items-center gap-1.5 rounded-[4px] border border-[#E2E8F0] bg-white px-2.5 py-1 text-xs font-medium text-[#0B1D3A] dark:border-white/10 dark:bg-[#15284B] dark:text-slate-200"
                >
                  <span>{h.emoji}</span>
                  <span>{translateText(h.name, lang)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-3">
          <button
            onClick={onSwitchMode}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-[8px] bg-[#C99A2E] px-5 py-3 text-sm font-bold text-white shadow-[0_3px_0_#8B6919] transition hover:bg-[#B48327] active:scale-[0.99] md:text-base"
          >
            <Layers3DIcon size={20} />
            <span>
              {isPerson
                ? lang === 'en' ? 'Switch to Mode 2: Fix The Process' : 'మోడ్ 2: ప్రాసెస్ ఫిక్స్ చేయండి'
                : lang === 'en' ? 'Switch to Mode 1: Hire The Right Person' : 'మోడ్ 1: సరైన వ్యక్తిని హైర్ చేయండి'}
            </span>
          </button>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={onPlayAgain}
              className="fare-card-3d flex cursor-pointer items-center justify-center gap-2 rounded-[8px] px-4 py-3 text-sm font-semibold text-[#0B1D3A] transition hover:brightness-98 active:scale-[0.99] dark:text-slate-200"
            >
              <span className="fare-icon-3d grid h-5 w-5 place-items-center rounded-[4px] bg-[#0B1D3A] text-white dark:bg-[#2563EB]">
                <RefreshIcon sx={{ fontSize: 14, color: '#FFFFFF' }} />
              </span>
              <span>{lang === 'en' ? 'Play Again' : 'మళ్లీ ఆడండి'}</span>
            </button>

            <button
              onClick={onOpenCta}
              className="flex cursor-pointer items-center justify-center gap-2 rounded-[8px] bg-gradient-to-br from-[#0B1D3A] to-[#1A3463] px-4 py-3 text-sm font-semibold text-white shadow-[0_3px_0_#071429] transition hover:brightness-110 active:scale-[0.99]"
            >
              <Trophy3DIcon size={20} />
              <span>{lang === 'en' ? 'FARE Academy' : 'FARE అకాడమీ'}</span>
            </button>
          </div>

          <button
            onClick={onHome}
            className="w-full cursor-pointer py-2 text-xs font-semibold uppercase tracking-wider text-[#64748B] transition-colors hover:text-[#0B1D3A] dark:text-slate-400 dark:hover:text-white"
          >
            {lang === 'en' ? '← Return to Main Lobby' : '← ప్రధాన పేజీకి వెళ్లండి'}
          </button>
        </div>
      </div>
    </div>
  );
}
