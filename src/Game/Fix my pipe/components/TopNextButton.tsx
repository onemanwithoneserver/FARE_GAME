import { motion } from 'framer-motion';
import Tooltip from '@mui/material/Tooltip';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import type { Language } from '../types';

interface TopNextButtonProps {
  onNext: () => void;
  lang: Language;
  isPerson: boolean;
  isLastCard: boolean;
  compact?: boolean;
  className?: string;
}

export default function TopNextButton({
  onNext,
  lang,
  isPerson,
  isLastCard,
  compact = true,
  className = '',
}: TopNextButtonProps) {
  const en = lang === 'en';

  const tooltipTitle = isLastCard
    ? en
      ? 'See problem summary'
      : 'సమస్య సారాంశం చూడండి'
    : isPerson
    ? en
      ? 'Next candidate'
      : 'తర్వాతి అభ్యర్థి'
    : en
    ? 'Next Idea'
    : 'తర్వాతి ఆలోచన';

  return (
    <Tooltip title={tooltipTitle} arrow enterTouchDelay={50} placement="bottom">
      <motion.button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: [1, 1.05, 1], opacity: 1 }}
        transition={{
          scale: { repeat: Infinity, duration: 1.8, ease: 'easeInOut' },
          opacity: { duration: 0.2 },
        }}
        aria-label={tooltipTitle}
        className={`fare-card-3d inline-flex cursor-pointer items-center gap-1 shrink-0 rounded-full border border-amber-400/80 bg-gradient-to-r from-[#D97706] to-[#B45309] hover:from-[#B45309] hover:to-[#92400E] font-bold text-white shadow-[0_2px_8px_rgba(217,119,6,0.35)] transition-all active:scale-95 ${
          compact ? 'px-2.5 py-0.5 text-[11px]' : 'px-3 py-1 text-xs'
        } ${className}`}
      >
        <span>{en ? 'Next' : 'తర్వాతి'}</span>
        <ArrowForwardIcon sx={{ fontSize: compact ? 13 : 15, color: '#FFFFFF' }} />
      </motion.button>
    </Tooltip>
  );
}
