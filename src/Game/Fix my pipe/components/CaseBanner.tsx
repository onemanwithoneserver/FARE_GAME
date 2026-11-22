import { motion } from 'framer-motion';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { STAGES, translateText } from '../data';
import type { Language } from '../types';

interface CaseBannerProps {
  title: string;
  quote: string;
  leak: number;
  caseIndex: number;
  totalCases: number;
  deckLength: number;
  cardIndex: number;
  lang: Language;
  compact?: boolean;
}

export default function CaseBanner({ title, quote, leak, caseIndex, totalCases, deckLength, cardIndex, lang, compact = false }: CaseBannerProps) {
  const stage = STAGES[leak];
  return (
    <motion.div
      key={`${caseIndex}-${title}`}
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      className={`fare-card-3d relative w-full overflow-hidden rounded-[10px] text-center ${
        compact ? 'px-3 py-2.5' : 'max-w-2xl px-6 py-3'
      }`}
    >
      <span className="absolute inset-x-0 top-0 h-1" style={{ background: stage.color }} />
      <div className="flex flex-wrap items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] md:text-[11px]">
        <span className="flex items-center gap-1 rounded-[4px] px-2 py-0.5 text-white" style={{ background: stage.color }}>
          <WarningAmberIcon sx={{ fontSize: 13, color: '#FFFFFF' }} />
          {stage.name[lang]}
        </span>
        <span className="text-[#C99A2E]">
          {lang === 'en' ? 'Case' : 'కేసు'} {caseIndex + 1}/{totalCases}
        </span>
      </div>
      <h2 className={`mt-1 font-bold leading-snug text-[#0B1D3A] dark:text-white ${compact ? 'text-sm' : 'text-lg'}`}>{translateText(title, lang)}</h2>
      {!compact && <p className="mt-0.5 text-xs italic text-[#64748B] dark:text-slate-400">“{translateText(quote, lang)}”</p>}
      <div className="mt-2 flex justify-center gap-1">
        {Array.from({ length: deckLength }).map((_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${i < cardIndex ? 'w-4 bg-[#C99A2E]' : i === cardIndex ? 'w-6 bg-[#0B1D3A] dark:bg-white' : 'w-1.5 bg-[#E2E8F0] dark:bg-white/20'}`}
          />
        ))}
      </div>
    </motion.div>
  );
}
