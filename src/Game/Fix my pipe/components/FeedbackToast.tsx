import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { usePipeGameStore } from '../store';

const LABELS: Record<string, { en: string; te: string }> = {
  clamp: { en: 'Titanium clamp locked', te: 'శాశ్వత క్లాంప్' },
  band: { en: 'Strong repair', te: 'బలమైన రిపేర్' },
  tape: { en: 'Temporary patch', te: 'తాత్కాలిక ప్యాచ్' },
  fall: { en: 'Patch fell off', te: 'ప్యాచ్ పడిపోయింది' },
  crack: { en: 'Leak got worse', te: 'లీక్ పెరిగింది' },
  reject_good: { en: 'Smart pass', te: 'సరైన తిరస్కరణ' },
  reject_bad: { en: 'Missed a fix', te: 'మంచి అవకాశం మిస్' },
};

export default function FeedbackToast() {
  const { history, lastFeedback, lang } = usePipeGameStore();
  const [shownFor, setShownFor] = useState(-1);

  useEffect(() => {
    if (history.length === 0) return;
    setShownFor(history.length);
    const id = setTimeout(() => setShownFor(-1), 1500);
    return () => clearTimeout(id);
  }, [history.length]);

  const visible = shownFor === history.length && lastFeedback;
  const delta = lastFeedback?.scoreDelta ?? 0;
  const positive = delta > 0;
  const label = lastFeedback ? LABELS[lastFeedback.type]?.[lang] ?? '' : '';

  return (
    <div className="pointer-events-none absolute inset-x-0 top-2 z-20 flex justify-center">
      <AnimatePresence>
        {visible && (
          <motion.div
            key={history.length}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`flex items-center gap-2 rounded-[6px] border px-3.5 py-1.5 shadow-md ${
              positive ? 'border-emerald-700 bg-[#16A34A]' : delta === 0 ? 'border-slate-600 bg-slate-700' : 'border-rose-800 bg-[#DC2626]'
            }`}
          >
            <span className="text-base font-black text-white tabular-nums">{positive ? `+${delta}` : delta}</span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-white/95">{label}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
