import CloseIcon from '@mui/icons-material/Close';
import { Users3DIcon } from './Icons3D';
import { CardItem, Language } from '../types';
import { translateText } from '../data';

interface TeamRosterModalProps {
  isOpen: boolean;
  hiredTeam: CardItem[];
  lang: Language;
  onClose: () => void;
}

export default function TeamRosterModal({
  isOpen,
  hiredTeam,
  lang,
  onClose,
}: TeamRosterModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B1D3A]/55 p-4 backdrop-blur-sm dark:bg-black/70">
      <div className="fare-card-3d relative flex max-h-[85vh] w-full max-w-lg flex-col rounded-[10px] p-6">
        <button
          onClick={onClose}
          aria-label={lang === 'en' ? 'Close' : 'మూసివేయండి'}
          className="fare-icon-3d absolute right-4 top-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded-[6px] bg-[#0B1D3A] text-white transition-colors hover:bg-[#DC2626] dark:bg-[#1A3463] dark:hover:bg-[#DC2626]"
        >
          <CloseIcon sx={{ fontSize: 17, color: '#FFFFFF' }} />
        </button>

        <div className="mb-4 flex items-center gap-3 border-b border-[#E2E8F0] pb-3 dark:border-white/10">
          <div className="fare-icon-3d flex h-10 w-10 items-center justify-center rounded-[8px] bg-[#0B1D3A] text-white dark:bg-[#1A3463]">
            <Users3DIcon size={22} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#0B1D3A] dark:text-white">
              {lang === 'en' ? 'Active Deployed Assets' : 'యాక్టివ్ టీమ్ & సిస్టమ్స్'}
            </h3>
            <p className="text-xs text-[#64748B] dark:text-slate-400">
              {hiredTeam.length} {lang === 'en' ? 'solutions currently operating in your pipeline' : 'పరిష్కారాలు ప్రస్తుతం పనిచేస్తున్నాయి'}
            </p>
          </div>
        </div>

        <div className="flex-1 space-y-2.5 overflow-y-auto pr-1">
          {hiredTeam.length === 0 ? (
            <div className="py-12 text-center text-sm text-[#64748B] dark:text-slate-400">
              {lang === 'en' ? 'No candidates hired yet in this session.' : 'ఇంకా ఎవరినీ నియమించలేదు.'}
            </div>
          ) : (
            hiredTeam.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between gap-3 rounded-[8px] border border-[#E2E8F0] bg-[#F8F9FC] p-3 text-xs dark:border-white/10 dark:bg-[#071124]/60 md:text-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{item.emoji}</div>
                  <div>
                    <h4 className="font-semibold text-[#0B1D3A] dark:text-white">{translateText(item.name, lang)}</h4>
                    <p className="text-[11px] italic text-[#64748B] dark:text-slate-400">"{translateText(item.reason, lang)}"</p>
                  </div>
                </div>

                {item.model && (
                  <span className="shrink-0 rounded-[4px] border border-[#E2E8F0] bg-white px-2 py-0.5 text-[10px] font-semibold text-[#475569] dark:border-white/10 dark:bg-[#15284B] dark:text-slate-300">
                    {translateText(item.model, lang)}
                  </span>
                )}
              </div>
            ))
          )}
        </div>

        <div className="mt-4 border-t border-[#E2E8F0] pt-3 text-right dark:border-white/10">
          <button
            onClick={onClose}
            className="fare-card-3d cursor-pointer rounded-[8px] px-5 py-2 text-xs font-semibold text-[#475569] hover:brightness-98 dark:text-slate-300"
          >
            {lang === 'en' ? 'Close' : 'మూసివేయండి'}
          </button>
        </div>
      </div>
    </div>
  );
}
