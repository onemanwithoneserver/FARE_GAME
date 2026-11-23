import PersonIcon from '@mui/icons-material/Person';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { Check3DIcon, Cross3DIcon } from './Icons3D';
import BigButton from './BigButton';
import { translateText } from '../data';
import type { CardItem, Language } from '../types';

interface DossierCardProps {
  item: CardItem;
  lang: Language;
  onAccept?: () => void;
  onReject?: () => void;
  disabled?: boolean;
  showActions?: boolean;
  dense?: boolean;
}

export default function DossierCard({ item, lang, onAccept, onReject, disabled = false, showActions = true, dense = false }: DossierCardProps) {
  const isPerson = item.type === 'candidate';
  const en = lang === 'en';

  return (
    <div
      className={`fare-card-3d relative w-full overflow-hidden rounded-[8px] sm:rounded-[10px] ${
        dense ? 'p-3 sm:p-3.5' : 'p-3.5 sm:p-4 md:p-4.5'
      }`}
    >
      <span className="absolute inset-x-0 top-0 h-1 bg-[#0B1D3A] dark:bg-[#C99A2E]" />

      <div className={`flex items-start justify-between gap-1.5 sm:gap-2 ${dense ? 'mb-2 sm:mb-2.5' : 'mb-2'}`}>
        <div className="flex min-w-0 items-center gap-1.5 sm:gap-2">
          <div className={`grid shrink-0 place-items-center rounded-[5px] sm:rounded-[6px] border border-[#E2E8F0] bg-[#F8F9FC] dark:border-white/10 dark:bg-[#15284B] ${dense ? 'h-8 w-8 sm:h-9 sm:w-9 text-base sm:text-lg' : 'h-10 w-10 text-xl'}`}>
            {item.emoji}
          </div>
          <div className="min-w-0">
            <div className={`flex items-center gap-1 font-bold uppercase tracking-[0.14em] text-[#C99A2E] ${dense ? 'text-[8.5px] sm:text-[9px]' : 'text-[9.5px]'}`}>
              <span className="grid h-3 w-3 place-items-center rounded-[2px] bg-[#0B1D3A] text-white dark:bg-[#C99A2E]">
                {isPerson ? <PersonIcon sx={{ fontSize: dense ? 9 : 11, color: '#FFFFFF' }} /> : <LightbulbIcon sx={{ fontSize: dense ? 9 : 11, color: '#FFFFFF' }} />}
              </span>
              <span>{isPerson ? (en ? 'Candidate dossier' : 'అభ్యర్థి వివరాలు') : en ? 'Process proposal' : 'సిస్టమ్ ప్రతిపాదన'}</span>
            </div>
            <h3 className={`font-bold leading-tight text-[#0B1D3A] dark:text-white ${dense ? 'mt-0.5 text-[13px] sm:text-[14.5px]' : 'mt-0.5 text-base md:text-[17px]'}`}>{translateText(item.name, lang)}</h3>
          </div>
        </div>
        {item.model && (
          <span className={`hidden shrink-0 items-center gap-1 rounded-[4px] bg-[#0B1D3A] font-semibold text-white dark:bg-[#15284B] sm:flex ${dense ? 'px-2 py-0.5 text-[9.5px]' : 'px-2 py-0.5 text-[10.5px]'}`}>
            <AccountBalanceWalletIcon sx={{ fontSize: dense ? 11 : 12, color: '#FFFFFF' }} />
            {translateText(item.model, lang)}
          </span>
        )}
      </div>

      {item.detail && (
        <p className={`rounded-[6px] border border-[#E2E8F0] bg-[#F8F9FC] italic text-[#475569] dark:border-white/10 dark:bg-[#071124]/60 dark:text-slate-300 ${dense ? 'py-2.5 px-3 sm:py-3 sm:px-3.5 text-xs sm:text-[12.5px] leading-relaxed mb-2.5 min-h-[48px] sm:min-h-[54px] flex items-center' : 'p-2.5 sm:p-3 text-xs sm:text-sm mb-2.5'}`}>
          “{translateText(item.detail, lang)}”
        </p>
      )}

      {showActions && (
        <div className={`flex items-center justify-end gap-2 sm:gap-2.5 ${dense ? 'pt-1' : 'pt-1'}`}>
          <BigButton
            tone="red"
            size="sm"
            compactWidth={true}
            trailing={false}
            iconNode={<Cross3DIcon size={dense ? 13 : 14} />}
            title={isPerson ? (en ? 'Reject' : 'వద్దు') : en ? 'Pass' : 'వద్దు'}
            onClick={() => onReject?.()}
            disabled={disabled}
            className={dense ? '!py-2 sm:!py-2.5 !px-3.5 sm:!px-4 !text-xs min-w-[78px] sm:min-w-[90px]' : 'min-w-[120px]'}
          />
          <BigButton
            tone="green"
            size="sm"
            compactWidth={true}
            trailing={false}
            iconNode={<Check3DIcon size={dense ? 13 : 15} />}
            title={isPerson ? (en ? 'Hire' : 'నియమించు') : en ? 'Implement' : 'అమలు చేయండి'}
            onClick={() => onAccept?.()}
            disabled={disabled}
            className={dense ? '!py-2 sm:!py-2.5 !px-4 sm:!px-4.5 !text-xs min-w-[78px] sm:min-w-[90px]' : 'min-w-[120px]'}
          />
        </div>
      )}
    </div>
  );
}
