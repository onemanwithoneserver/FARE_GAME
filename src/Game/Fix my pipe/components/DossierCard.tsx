import PersonIcon from '@mui/icons-material/Person';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
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
      className={`fare-card-3d relative w-full overflow-hidden rounded-[10px] ${
        dense ? 'p-2.5 sm:p-3.5' : 'p-3.5 sm:p-4 md:p-4.5'
      }`}
    >
      <span className="absolute inset-x-0 top-0 h-1 bg-[#0B1D3A] dark:bg-[#C99A2E]" />

      <div className={`flex items-start justify-between gap-2.5 ${dense ? 'mb-1.5' : 'mb-2'}`}>
        <div className="flex min-w-0 items-center gap-2">
          <div className={`grid shrink-0 place-items-center rounded-[8px] border border-[#E2E8F0] bg-[#F8F9FC] dark:border-white/10 dark:bg-[#15284B] ${dense ? 'h-8 w-8 text-lg' : 'h-10 w-10 text-xl'}`}>
            {item.emoji}
          </div>
          <div className="min-w-0">
            <div className={`flex items-center gap-1 font-bold uppercase tracking-[0.16em] text-[#C99A2E] ${dense ? 'text-[9px]' : 'text-[9.5px]'}`}>
              <span className="grid h-3.5 w-3.5 place-items-center rounded-[3px] bg-[#0B1D3A] text-white dark:bg-[#C99A2E]">
                {isPerson ? <PersonIcon sx={{ fontSize: dense ? 10 : 11, color: '#FFFFFF' }} /> : <LightbulbIcon sx={{ fontSize: dense ? 10 : 11, color: '#FFFFFF' }} />}
              </span>
              <span>{isPerson ? (en ? 'Candidate dossier' : 'అభ్యర్థి వివరాలు') : en ? 'Process proposal' : 'సిస్టమ్ ప్రతిపాదన'}</span>
            </div>
            <h3 className={`font-bold leading-tight text-[#0B1D3A] dark:text-white ${dense ? 'mt-0 text-sm sm:text-base' : 'mt-0.5 text-base md:text-[17px]'}`}>{translateText(item.name, lang)}</h3>
          </div>
        </div>
        {item.model && (
          <span className={`hidden shrink-0 items-center gap-1 rounded-[4px] bg-[#0B1D3A] font-semibold text-white dark:bg-[#15284B] sm:flex ${dense ? 'px-2 py-0.5 text-[10px]' : 'px-2 py-0.5 text-[10.5px]'}`}>
            <AccountBalanceWalletIcon sx={{ fontSize: dense ? 11 : 12, color: '#FFFFFF' }} />
            {translateText(item.model, lang)}
          </span>
        )}
      </div>

      {item.detail && (
        <p className={`rounded-[8px] border border-[#E2E8F0] bg-[#F8F9FC] italic leading-snug text-[#475569] dark:border-white/10 dark:bg-[#071124]/60 dark:text-slate-300 ${dense ? 'p-1.5 sm:p-2 text-[11px] sm:text-xs mb-1.5' : 'p-2 sm:p-2.5 text-xs sm:text-[13px] mb-2'}`}>
          “{translateText(item.detail, lang)}”
        </p>
      )}

      {isPerson && (item.pros || item.cons) && (
        <div className={`grid grid-cols-2 gap-2 ${dense ? 'mb-1.5' : 'mb-2'}`}>
          {item.pros && (
            <div className={`rounded-[8px] border border-emerald-200 bg-emerald-50/70 text-[#0B1D3A] dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-slate-200 ${dense ? 'p-1.5 text-[10px] sm:text-[11px] leading-tight' : 'p-2 text-xs leading-snug'}`}>
              <div className="mb-0.5 flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                <span className="grid h-3.5 w-3.5 place-items-center rounded-[3px] bg-[#16A34A] text-white">
                  <ThumbUpIcon sx={{ fontSize: 9, color: '#FFFFFF' }} />
                </span>
                {en ? 'Strengths' : 'లాభాలు'}
              </div>
              <div className="line-clamp-2">{translateText(item.pros, lang)}</div>
            </div>
          )}
          {item.cons && (
            <div className={`rounded-[8px] border border-rose-200 bg-rose-50/70 text-[#0B1D3A] dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-slate-200 ${dense ? 'p-1.5 text-[10px] sm:text-[11px] leading-tight' : 'p-2 text-xs leading-snug'}`}>
              <div className="mb-0.5 flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400">
                <span className="grid h-3.5 w-3.5 place-items-center rounded-[3px] bg-[#DC2626] text-white">
                  <ThumbDownIcon sx={{ fontSize: 9, color: '#FFFFFF' }} />
                </span>
                {en ? 'Trade-offs' : 'పరిమితులు'}
              </div>
              <div className="line-clamp-2">{translateText(item.cons, lang)}</div>
            </div>
          )}
        </div>
      )}

      {showActions && (
        <div className={`flex items-center justify-end gap-2.5 ${dense ? 'pt-0.5' : 'pt-1'}`}>
          <BigButton
            tone="red"
            size="sm"
            compactWidth={true}
            trailing={false}
            iconNode={<Cross3DIcon size={dense ? 13 : 14} />}
            title={isPerson ? (en ? 'Reject' : 'వద్దు') : en ? 'Pass' : 'వద్దు'}
            onClick={() => onReject?.()}
            disabled={disabled}
            className={dense ? '!py-1.5 !px-3.5 !text-xs min-w-[95px] sm:min-w-[110px]' : 'min-w-[120px]'}
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
            className={dense ? '!py-1.5 !px-4 !text-xs min-w-[95px] sm:min-w-[110px]' : 'min-w-[120px]'}
          />
        </div>
      )}
    </div>
  );
}
