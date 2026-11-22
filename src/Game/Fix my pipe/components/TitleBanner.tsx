import { motion } from 'framer-motion';
import { usePipeGameStore } from '../store';

export default function TitleBanner({ compact = false, subtitle }: { compact?: boolean; subtitle?: string }) {
  const lang = usePipeGameStore((s) => s.lang);
  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="flex select-none flex-col items-center text-center"
    >
      <span className={`inline-flex items-center gap-1 rounded-[4px] bg-[#C99A2E] text-[#0B1D3A] font-bold uppercase tracking-[0.16em] ${compact ? 'px-1.5 py-0.2 text-[8px]' : 'px-2 py-0.5 text-[9px]'}`}>
        {lang === 'en' ? 'FARE Sales Desk' : 'FARE సేల్స్ డెస్క్'}
      </span>
      <h1
        className={`font-extrabold leading-tight tracking-tight text-[#0B1D3A] dark:text-white ${
          compact ? 'mt-0.5 text-xs sm:text-sm md:text-base' : 'mt-1 text-lg sm:text-xl md:text-2xl'
        }`}
      >
        {lang === 'en' ? 'Sales Funnel ' : 'సేల్స్ ఫన్నెల్ '}
        <span className="text-[#C99A2E]">{lang === 'en' ? 'Game' : 'గేమ్'}</span>
      </h1>
      <p className={`font-medium text-[#64748B] dark:text-slate-400 ${compact ? 'mt-0 text-[9px] sm:text-[10px]' : 'mt-0.5 text-[11px] sm:text-xs'}`}>
        {subtitle ?? (lang === 'en' ? 'Fix Your Sales Funnel' : 'మీ సేల్స్ ఫన్నెల్‌ను సరిచేయండి')}
      </p>
    </motion.div>
  );
}
