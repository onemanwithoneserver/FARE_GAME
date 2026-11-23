import { ComponentType, ReactNode } from 'react';
import { motion } from 'framer-motion';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

type Tone = 'navy' | 'green' | 'red' | 'gold';

const TONES: Record<Tone, string> = {
  navy: 'border-[#0B1D3A] bg-gradient-to-br from-[#0B1D3A] to-[#1A3463] hover:from-[#1E3A6B] hover:to-[#2563EB] hover:border-[#2563EB] text-white shadow-[0_8px_20px_-8px_rgba(11,29,58,0.5),0_3px_0_#061124] dark:border-white/15',
  green: 'border-[#86EFAC] bg-gradient-to-b from-[#F0FDF4] to-[#DCFCE7] hover:border-[#16A34A] hover:from-[#22C55E] hover:to-[#16A34A] hover:text-white text-[#14532D] shadow-[0_6px_16px_-6px_rgba(22,163,74,0.18),0_3px_0_#BBF7D0] dark:border-emerald-500/35 dark:from-[#0E3A2A] dark:to-[#08261B] dark:hover:border-[#22C55E] dark:hover:from-[#22C55E] dark:hover:to-[#16A34A] dark:text-emerald-100',
  red: 'border-[#DBE4FA] bg-gradient-to-b from-white to-[#F1F5FF] hover:border-[#DC2626] hover:from-[#DC2626] hover:to-[#B91C1C] hover:text-white text-[#0B1D3A] shadow-[0_6px_16px_-6px_rgba(29,78,216,0.12),0_3px_0_#D5DFF6] dark:border-white/10 dark:from-[#132548] dark:to-[#0B1730] dark:hover:border-[#DC2626] dark:hover:from-[#DC2626] dark:hover:to-[#B91C1C] dark:hover:text-white dark:text-slate-100',
  gold: 'border-[#B48327] bg-[#C99A2E] hover:border-[#0B1D3A] hover:bg-[#0B1D3A] hover:text-white text-[#0B1D3A] shadow-[0_6px_16px_-6px_rgba(201,154,46,0.45),0_3px_0_#8A5A00]',
};

const ICON_BG: Record<Tone, string> = {
  navy: 'bg-[#1E3A6B] group-hover:bg-[#1D4ED8] fare-icon-3d',
  green: 'bg-[#16A34A] group-hover:bg-[#15803D] fare-icon-3d',
  red: 'bg-[#DC2626] group-hover:bg-[#991B1B] fare-icon-3d',
  gold: 'bg-[#9A6A10] group-hover:bg-[#1A3463] fare-icon-3d',
};

interface BigButtonProps {
  tone: Tone | 'purple';
  icon?: ComponentType<{ sx?: object }>;
  iconNode?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  hideSubtitleOnMobile?: boolean;
  onClick: () => void;
  disabled?: boolean;
  size?: 'lg' | 'md' | 'sm';
  trailing?: boolean;
  compactWidth?: boolean;
  className?: string;
}

export default function BigButton({
  tone,
  icon: Icon,
  iconNode,
  title,
  subtitle,
  hideSubtitleOnMobile = false,
  onClick,
  disabled,
  size = 'lg',
  trailing = true,
  compactWidth = false,
  className = '',
}: BigButtonProps) {
  const lg = size === 'lg';
  const sm = size === 'sm';
  const resolvedTone: Tone = tone === 'purple' ? 'navy' : tone;
  return (
    <motion.button
      type="button"
      whileHover={disabled ? undefined : { y: -1.5 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className={`group relative flex cursor-pointer items-center ${
        sm ? 'gap-1.5 sm:gap-2' : 'gap-2 sm:gap-2.5'
      } rounded-[8px] border text-left transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${
        compactWidth ? 'w-auto' : 'w-full'
      } ${TONES[resolvedTone]} ${
        lg ? 'px-3.5 py-3 md:px-4 md:py-3.5' : sm ? 'px-2.5 py-1.5 sm:px-3 sm:py-2' : 'px-2.5 sm:px-3 py-2.5'
      } ${className}`}
    >
      {(Icon || iconNode) && (
        <span
          className={`grid shrink-0 place-items-center rounded-[6px] text-white transition-colors duration-200 ${ICON_BG[resolvedTone]} ${
            lg ? 'h-10 w-10 md:h-11 md:w-11' : sm ? 'h-6 w-6 sm:h-7 sm:w-7' : 'h-7.5 w-7.5 sm:h-8 sm:w-8'
          }`}
        >
          {iconNode ?? (Icon && <Icon sx={{ fontSize: lg ? 22 : sm ? 15 : 18, color: '#FFFFFF' }} />)}
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span
          className={`block font-bold leading-tight ${
            lg
              ? 'text-[15px] md:text-base truncate'
              : sm
              ? 'text-[11.5px] sm:text-xs tracking-tight'
              : 'text-[12.5px] sm:text-[13px] lg:text-[13.5px] tracking-tight whitespace-nowrap'
          }`}
        >
          {title}
        </span>
        {subtitle && (
          <span
            className={`${hideSubtitleOnMobile ? 'hidden sm:block' : 'block'} truncate opacity-75 ${
              lg ? 'text-xs' : sm ? 'text-[9.5px] sm:text-[10px]' : 'text-[10.5px] sm:text-[11px]'
            }`}
          >
            {subtitle}
          </span>
        )}
      </span>
      {trailing && (
        <span
          className={`grid ${
            sm ? 'h-5 w-5' : 'h-6 w-6'
          } shrink-0 place-items-center rounded-[4px] transition-transform group-hover:translate-x-0.5 ${ICON_BG[resolvedTone]}`}
        >
          <ChevronRightIcon sx={{ fontSize: sm ? 14 : 17, color: '#FFFFFF' }} />
        </span>
      )}
    </motion.button>
  );
}
