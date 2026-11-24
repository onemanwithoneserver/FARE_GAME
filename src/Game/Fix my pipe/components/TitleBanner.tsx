import { motion } from 'framer-motion';
import { usePipeGameStore } from '../store';

export default function TitleBanner({ compact = false, subtitle }: { compact?: boolean; subtitle?: string }) {
  const lang = usePipeGameStore((s) => s.lang);
  const en = lang === 'en';

  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="flex select-none flex-col items-center text-center max-w-full"
    >
      
      <span
        className={`inline-flex items-center gap-1 rounded-full bg-[#C99A2E] text-[#0B1D3A] font-bold uppercase tracking-[0.16em] shadow-xs ${
          compact ? 'px-2.5 py-0.5 text-[8.5px] sm:text-[9.5px]' : 'px-3.5 py-1 text-[11px] sm:text-xs'
        }`}
      >
        {en ? 'Team Leads' : 'టీమ్ లీడ్స్'}
      </span>

      <h1
        className={`font-semibold leading-tight tracking-tight text-[#0B1D3A] dark:text-white ${
          compact
            ? 'mt-1 text-base sm:text-lg md:text-xl'
            : 'mt-1.5 text-2xl sm:text-3xl md:text-4xl'
        }`}
      >
        {en ? (
          <>
            How do you fix your <span className="text-[#C99A2E]">Sales Funnel?</span>
          </>
        ) : (
          <>
            మీ <span className="text-[#C99A2E]">సేల్స్ ఫన్నెల్</span> ని ఎలా సరిచేస్తారు?
          </>
        )}
      </h1>

      <p
        className={`font-semibold text-slate-500 dark:text-slate-300 ${
          compact ? 'mt-0.5 text-[10px] sm:text-[11px]' : 'mt-1 text-xs sm:text-sm md:text-base'
        }`}
      >
        {subtitle ?? (en ? 'Plug revenue leaks across your sales pipeline' : 'మీ సేల్స్ పైప్‌లైన్ లీక్‌లను పరిష్కరించండి')}
      </p>
    </motion.div>
  );
}
