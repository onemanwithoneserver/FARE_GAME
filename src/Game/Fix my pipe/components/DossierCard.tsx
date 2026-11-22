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
        dense ? 'p-4' : 'p-5 md:p-6'
      }`}
    >
      <span className="absolute inset-x-0 top-0 h-1 bg-[#0B1D3A] dark:bg-[#C99A2E]" />

      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className={`grid shrink-0 place-items-center rounded-[8px] border border-[#E2E8F0] bg-[#F8F9FC] dark:border-white/10 dark:bg-[#15284B] ${dense ? 'h-11 w-11 text-2xl' : 'h-12 w-12 text-2xl'}`}>
            {item.emoji}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#C99A2E]">
              <span className="grid h-4 w-4 place-items-center rounded-[4px] bg-[#0B1D3A] text-white dark:bg-[#C99A2E]">
                {isPerson ? <PersonIcon sx={{ fontSize: 11, color: '#FFFFFF' }} /> : <LightbulbIcon sx={{ fontSize: 11, color: '#FFFFFF' }} />}
              </span>
              <span>{isPerson ? (en ? 'Candidate dossier' : 'అభ్యర్థి వివరాలు') : en ? 'Process proposal' : 'సిస్టమ్ ప్రతిపాదన'}</span>
            </div>
            <h3 className={`mt-0.5 font-bold leading-tight text-[#0B1D3A] dark:text-white ${dense ? 'text-base' : 'text-lg md:text-[19px]'}`}>{translateText(item.name, lang)}</h3>
          </div>
        </div>
        {item.model && (
          <span className="hidden shrink-0 items-center gap-1.5 rounded-[4px] bg-[#0B1D3A] px-2.5 py-1 text-[11px] font-semibold text-white dark:bg-[#15284B] sm:flex">
            <AccountBalanceWalletIcon sx={{ fontSize: 13, color: '#FFFFFF' }} />
            {translateText(item.model, lang)}
          </span>
        )}
      </div>

      {item.detail && (
        <p className={`mb-3 rounded-[8px] border border-[#E2E8F0] bg-[#F8F9FC] italic leading-relaxed text-[#475569] dark:border-white/10 dark:bg-[#071124]/60 dark:text-slate-300 ${dense ? 'p-2.5 text-xs' : 'p-3 text-sm'}`}>
          “{translateText(item.detail, lang)}”
        </p>
      )}

      {isPerson && (item.pros || item.cons) && (
        <div className={`mb-3 grid gap-2.5 ${dense ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
          {item.pros && (
            <div className="rounded-[8px] border border-emerald-200 bg-emerald-50/70 p-2.5 text-xs text-[#0B1D3A] dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-slate-200 md:text-[13px]">
              <div className="mb-1 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                <span className="grid h-4 w-4 place-items-center rounded-[3px] bg-[#16A34A] text-white">
                  <ThumbUpIcon sx={{ fontSize: 10, color: '#FFFFFF' }} />
                </span>
                {en ? 'Strengths' : 'లాభాలు'}
              </div>
              {translateText(item.pros, lang)}
            </div>
          )}
          {item.cons && (
            <div className="rounded-[8px] border border-rose-200 bg-rose-50/70 p-2.5 text-xs text-[#0B1D3A] dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-slate-200 md:text-[13px]">
              <div className="mb-1 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400">
                <span className="grid h-4 w-4 place-items-center rounded-[3px] bg-[#DC2626] text-white">
                  <ThumbDownIcon sx={{ fontSize: 10, color: '#FFFFFF' }} />
                </span>
                {en ? 'Trade-offs' : 'పరిమితులు'}
              </div>
              {translateText(item.cons, lang)}
            </div>
          )}
        </div>
      )}


      {showActions && (
        <div className="flex items-center justify-end gap-2.5 pt-1">
          <BigButton
            tone="red"
            size="sm"
            compactWidth={true}
            trailing={false}
            iconNode={<Cross3DIcon size={14} />}
            title={isPerson ? (en ? 'Reject' : 'వద్దు') : en ? 'Pass' : 'వద్దు'}
            onClick={() => onReject?.()}
            disabled={disabled}
            className="min-w-[120px]"
          />
          <BigButton
            tone="green"
            size="sm"
            compactWidth={true}
            trailing={false}
            iconNode={<Check3DIcon size={15} />}
            title={isPerson ? (en ? 'Hire' : 'నియమించు') : en ? 'Implement' : 'అమలు చేయండి'}
            onClick={() => onAccept?.()}
            disabled={disabled}
            className="min-w-[120px]"
          />
        </div>
      )}
    </div>
  );
}
