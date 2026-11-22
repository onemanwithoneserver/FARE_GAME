import { motion } from 'framer-motion';
import { usePipeGameStore } from '../store';

export default function TitleBanner({ compact = false, subtitle }: { compact?: boolean; subtitle?: string }) {
  const lang = usePipeGameStore((s) => s.lang);
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="flex select-none flex-col items-center text-center"
    >
      <span className="inline-flex items-center gap-1.5 rounded-[4px] bg-[#C99A2E] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#0B1D3A]">
        {lang === 'en' ? 'FARE Sales Desk' : 'FARE సేల్స్ డెస్క్'}
      </span>
      <h1
        className={`mt-1.5 font-extrabold leading-tight tracking-tight text-[#0B1D3A] dark:text-white ${
          compact ? 'text-2xl' : 'text-3xl xl:text-4xl'
        }`}
      >
        {lang === 'en' ? 'Sales Funnel ' : 'సేల్స్ ఫన్నెల్ '}
        <span className="text-[#C99A2E]">{lang === 'en' ? 'Game' : 'గేమ్'}</span>
      </h1>
      <p className={`mt-0.5 font-medium text-[#64748B] dark:text-slate-400 ${compact ? 'text-xs' : 'text-sm'}`}>
        {subtitle ?? (lang === 'en' ? 'Fix Your Sales Funnel' : 'మీ సేల్స్ ఫన్నెల్‌ను సరిచేయండి')}
      </p>
    </motion.div>
  );
}
