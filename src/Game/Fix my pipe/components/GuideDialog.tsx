import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CheckIcon from '@mui/icons-material/Check';
import LayersIcon from '@mui/icons-material/Layers';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import LockIcon from '@mui/icons-material/Lock';
import BoltIcon from '@mui/icons-material/Bolt';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import type { Language } from '../types';

interface GuideDialogProps {
  open: boolean;
  onClose: () => void;
  lang: Language;
}

export default function GuideDialog({ open, onClose, lang }: GuideDialogProps) {
  const en = lang === 'en';

  const steps = [
    {
      step: '01',
      icon: <LayersIcon sx={{ fontSize: 13, color: '#FFFFFF' }} />,
      iconBg: 'bg-[#D97706]',
      title: en ? '3 Funnel Cases' : '3 కేసులు',
      desc: en ? 'Identify the leak' : 'లీక్‌ను గుర్తించండి',
    },
    {
      step: '02',
      icon: <AccessTimeFilledIcon sx={{ fontSize: 13, color: '#FFFFFF' }} />,
      iconBg: 'bg-[#2563EB]',
      title: en ? '8 Cards / Case' : '8 కార్డులు',
      desc: en ? 'Evaluate options' : 'ఎంపికలను పరిశీలించండి',
    },
    {
      step: '03',
      icon: <LockIcon sx={{ fontSize: 13, color: '#FFFFFF' }} />,
      iconBg: 'bg-[#16A34A]',
      title: en ? 'Seal & Bank' : 'లీక్ ఆపండి',
      desc: en ? 'Route to vault' : 'ఆదాయాన్ని భద్రపరచండి',
    },
  ];

  const actions = [
    {
      icon: <CheckIcon sx={{ fontSize: 15, color: '#FFFFFF' }} />,
      bg: 'bg-[#16A34A]',
      title: en ? 'Hire / Implement' : 'నియమించు / అమలు',
      badge: '+10 / +3',
      badgeStyle: 'border-emerald-500/30 bg-emerald-500/15 text-emerald-700 dark:text-emerald-300',
      containerStyle:
        'border-emerald-500/30 bg-emerald-50/40 dark:border-emerald-500/20 dark:bg-emerald-950/15',
      desc: en
        ? 'Accept talent or tools that fix the leak.'
        : 'లీక్‌ను పరిష్కరించే సరైన టీమ్ లేదా టూల్స్‌ను ఎంచుకోండి.',
      controls: en ? '👉 Swipe Right or Press [→] / Enter' : '👉 కుడివైపు స్వైప్ లేదా [→] / Enter',
      controlColor: 'text-emerald-700 dark:text-emerald-400',
    },
    {
      icon: <CloseIcon sx={{ fontSize: 15, color: '#FFFFFF' }} />,
      bg: 'bg-[#DC2626]',
      title: en ? 'Avoid / Reject' : 'వద్దు / నివారించండి',
      badge: en ? 'Avoids −5' : '−5 నివారణ',
      badgeStyle: 'border-rose-500/30 bg-rose-500/15 text-rose-700 dark:text-rose-300',
      containerStyle:
        'border-rose-500/30 bg-rose-50/40 dark:border-rose-500/20 dark:bg-rose-950/15',
      desc: en
        ? 'Reject mismatches to avoid revenue loss.'
        : 'పైప్‌లైన్ ఒత్తిడి తగ్గకుండా సరిపోని వాటిని తిరస్కరించండి.',
      controls: en ? '👈 Swipe Left or Press [←] / Esc' : '👈 ఎడమవైపు స్వైప్ లేదా [←] / Esc',
      controlColor: 'text-rose-700 dark:text-rose-400',
    },
  ];

  const scoringRules = [
    {
      score: '+10',
      label: en ? 'Clamp' : 'క్లాంప్',
      desc: en ? 'Full solution fit' : 'పూర్తి పరిష్కారం',
      color: 'text-emerald-600 dark:text-emerald-400',
      icon: <CheckIcon sx={{ fontSize: 12, color: '#FFFFFF' }} />,
      iconBg: 'bg-[#16A34A]',
      bg: 'bg-emerald-50/60 border-emerald-300/60 dark:bg-emerald-950/20 dark:border-emerald-500/20',
    },
    {
      score: '+3',
      label: en ? 'Patch' : 'ప్యాచ్',
      desc: en ? 'Partial fix' : 'పాక్షిక పరిష్కారం',
      color: 'text-sky-600 dark:text-sky-400',
      icon: <BoltIcon sx={{ fontSize: 12, color: '#FFFFFF' }} />,
      iconBg: 'bg-[#2563EB]',
      bg: 'bg-sky-50/60 border-sky-300/60 dark:bg-sky-950/20 dark:border-sky-500/20',
    },
    {
      score: '−5 / −8',
      label: en ? 'Leak' : 'లీక్',
      desc: en ? 'Wrong pick' : 'తప్పుడు ఎంపిక',
      color: 'text-rose-600 dark:text-rose-400',
      icon: <TrendingDownIcon sx={{ fontSize: 12, color: '#FFFFFF' }} />,
      iconBg: 'bg-[#DC2626]',
      bg: 'bg-rose-50/60 border-rose-300/60 dark:bg-rose-950/20 dark:border-rose-500/20',
    },
  ];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="guide-dialog-title"
      fullWidth
      maxWidth="sm"
      slotProps={{
        paper: {
          className:
            'fare-card-3d !rounded-[18px] border border-[#DBE4FA] dark:border-white/15 !bg-[#F8FAFC] dark:!bg-[#0A162D] text-[#0B1D3A] dark:text-white shadow-2xl',
          sx: {
            backgroundImage: 'none',
            m: { xs: 1.5, sm: 2.5 },
            overflow: 'hidden',
          },
        },
      }}
    >
      {/* Dialog Header */}
      <div className="flex items-center justify-between border-b border-[#DBE4FA] bg-gradient-to-r from-white via-[#F8FAFD] to-white px-5 py-3 dark:border-white/10 dark:from-[#0D1E3C] dark:via-[#0B1730] dark:to-[#0D1E3C]">
        <div className="flex items-center gap-2.5">
          <div className="relative grid h-8 w-8 place-items-center rounded-[8px] bg-gradient-to-br from-[#0B1D3A] to-[#1E3A8A] text-white shadow-sm dark:from-[#1E3A8A] dark:to-[#2563EB]">
            <MenuBookIcon sx={{ fontSize: 16, color: '#FFFFFF' }} />
          </div>
          <div>
            <h3 id="guide-dialog-title" className="text-sm font-black leading-tight tracking-tight text-[#0B1D3A] dark:text-white">
              {en ? 'Game Guide' : 'గేమ్ సూచనలు'}
            </h3>
            <p className="text-[10px] font-semibold text-[#64748B] dark:text-slate-400">
              {en ? 'Quick rules & scoring' : 'నియమాలు & స్కోరింగ్'}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="grid h-7 w-7 cursor-pointer place-items-center rounded-full text-slate-500 transition-all hover:bg-slate-200/70 hover:text-slate-900 active:scale-95 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white"
          aria-label={en ? 'Close guide' : 'సూచనలు మూసివేయండి'}
        >
          <CloseIcon sx={{ fontSize: 18 }} />
        </button>
      </div>

      {/* Dialog Content */}
      <DialogContent sx={{ p: { xs: '14px 16px', sm: '16px 20px' } }}>
        <div className="space-y-3.5">
          {/* Section 1: Single Unified 3-Step Flow Strip */}
          <div className="grid grid-cols-3 divide-x divide-slate-200/80 rounded-[14px] border border-[#DBE4FA] bg-white p-2.5 shadow-sm dark:divide-white/10 dark:border-white/10 dark:bg-white/[0.03]">
            {steps.map((st) => (
              <div key={st.step} className="flex flex-col items-center justify-center px-1 text-center">
                <div className="mb-1 flex items-center gap-1.5">
                  <span className={`grid h-5 w-5 place-items-center rounded-[6px] text-white shadow-sm ${st.iconBg}`}>
                    {st.icon}
                  </span>
                  <span className="text-[9px] font-black uppercase tracking-wider text-[#C99A2E]">
                    {st.step}
                  </span>
                </div>
                <div className="text-[11px] font-black leading-tight text-[#0B1D3A] dark:text-white">
                  {st.title}
                </div>
                <div className="mt-0.5 text-[9px] font-medium leading-tight text-[#64748B] dark:text-slate-400">
                  {st.desc}
                </div>
              </div>
            ))}
          </div>

          {/* Section 2: Direct Action Cards */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#64748B] dark:text-slate-400">
                {en ? 'Interactive Actions' : 'నిర్ణయాలు'}
              </span>
              <div className="h-px flex-1 bg-slate-200/80 dark:bg-white/10" />
            </div>

            <div className="space-y-2">
              {actions.map((act) => (
                <div
                  key={act.title}
                  className={`rounded-[14px] border p-3 shadow-sm transition-all ${act.containerStyle}`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-[8px] text-white shadow-sm ${act.bg}`}>
                        {act.icon}
                      </span>
                      <span className="text-xs font-black text-[#0B1D3A] dark:text-white">
                        {act.title}
                      </span>
                    </div>

                    <span className={`rounded-full border px-2.5 py-0.5 text-[9px] font-black ${act.badgeStyle}`}>
                      {act.badge}
                    </span>
                  </div>

                  <p className="mt-1 text-[11px] leading-snug text-[#475569] dark:text-slate-300">
                    {act.desc}
                  </p>

                  <div className={`mt-1.5 text-[10px] font-bold ${act.controlColor}`}>
                    {act.controls}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Direct Scoring Tiles */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#64748B] dark:text-slate-400">
                  {en ? 'Scoring Impact' : 'స్కోరింగ్'}
                </span>
                <div className="h-px w-12 bg-slate-200/80 dark:bg-white/10" />
              </div>

              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#D97706] dark:text-[#FBBF24]">
                <WhatshotIcon sx={{ fontSize: 13, color: '#D97706' }} />
                {en ? 'Combo Multiplier' : 'కాంబో'}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {scoringRules.map((r) => (
                <div
                  key={r.score}
                  className={`flex flex-col items-center justify-center rounded-[12px] border p-2 text-center shadow-sm ${r.bg}`}
                >
                  <div className="flex items-center gap-1.5">
                    <span className={`grid h-5 w-5 place-items-center rounded-[6px] text-white shadow-sm ${r.iconBg}`}>
                      {r.icon}
                    </span>
                    <span className={`text-xs font-black tabular-nums ${r.color}`}>
                      {r.score}
                    </span>
                  </div>
                  <span className="mt-1 text-[10px] font-bold leading-tight text-[#0B1D3A] dark:text-white">
                    {r.label}
                  </span>
                  <span className="text-[9px] font-medium text-[#64748B] dark:text-slate-400">
                    {r.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>

      {/* Dialog Footer */}
      <div className="flex items-center justify-between border-t border-[#DBE4FA] bg-gradient-to-r from-white/90 via-[#F8FAFD] to-white/90 px-5 py-2.5 dark:border-white/10 dark:from-[#0B1730] dark:via-[#0D1E3C] dark:to-[#0B1730]">
        <span className="text-[10px] font-semibold text-[#64748B] dark:text-slate-400">
          {en ? '💡 String correct picks to multiply score' : '💡 సరైన ఎంపికలతో స్కోర్ పెంచుకోండి'}
        </span>
        <button
          type="button"
          onClick={onClose}
          className="group relative cursor-pointer overflow-hidden rounded-full bg-gradient-to-r from-[#0B1D3A] to-[#1A3463] px-4 py-1.5 text-xs font-black text-white shadow-[0_2px_8px_rgba(11,29,58,0.25)] transition-all hover:scale-105 active:scale-95 dark:from-[#1E3A8A] dark:to-[#2563EB]"
        >
          <span className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/25 to-transparent" />
          <span>{en ? 'Got it' : 'అర్థమైంది'}</span>
        </button>
      </div>
    </Dialog>
  );
}