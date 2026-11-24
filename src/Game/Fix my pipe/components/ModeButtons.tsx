import { Users3DIcon, Wrench3DIcon } from './Icons3D';
import BigButton from './BigButton';
import { usePipeGameStore } from '../store';

export default function ModeButtons({
  stacked = false,
  compact = false,
  className = '',
}: {
  stacked?: boolean;
  compact?: boolean;
  className?: string;
}) {
  const { lang, startOrPrompt } = usePipeGameStore();
  const en = lang === 'en';
  return (
    <div
      className={`grid ${
        stacked
          ? compact
            ? 'grid-cols-1 gap-2 sm:gap-2.5'
            : 'grid-cols-1 gap-2.5 sm:gap-3'
          : compact
          ? 'grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3'
          : 'grid-cols-1 sm:grid-cols-2 gap-2.5 md:gap-3'
      } ${className}`}
    >
      <BigButton
        tone="navy"
        size={compact ? 'sm' : 'md'}
        iconNode={<Users3DIcon size={compact ? 16 : 18} />}
        title={en ? 'Hire The Right Person' : 'సరైన వ్యక్తిని నియమించండి'}
        subtitle={en ? 'Fix People Leaks · Interview Candidates' : 'బృందం లీక్‌లను సరిచేయండి · అభ్యర్థులు'}
        onClick={() => startOrPrompt(1)}
        className={compact ? '!py-1.5 !px-2' : '!py-2 !px-2.5 sm:!px-3'}
      />
      <BigButton
        tone="green"
        size={compact ? 'sm' : 'md'}
        iconNode={<Wrench3DIcon size={compact ? 16 : 18} />}
        title={en ? 'Fix The Sales Process' : 'సేల్స్ విధానాన్ని సరిచేయండి'}
        subtitle={en ? 'Fix System Leaks · Implement Ideas' : 'వ్యవస్థ లీక్‌లను సరిచేయండి · ఆలోచనలు'}
        onClick={() => startOrPrompt(2)}
        className={compact ? '!py-1.5 !px-2' : '!py-2 !px-2.5 sm:!px-3'}
      />
    </div>
  );
}
