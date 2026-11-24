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
import SwipeRightIcon from '@mui/icons-material/SwipeRight';
import SwipeLeftIcon from '@mui/icons-material/SwipeLeft';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
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
      iconBg: 'bg-amber-500 shadow-amber-500/30',
      badgeBg: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300',
      title: en ? '3 Funnel Cases' : '3 కేసులు',
      desc: en ? 'Diagnose stage leaks' : 'లీక్‌లను గుర్తించండి',
    },
    {
      step: '02',
      icon: <AccessTimeFilledIcon sx={{ fontSize: 13, color: '#FFFFFF' }} />,
      iconBg: 'bg-blue-600 shadow-blue-500/30',
      badgeBg: 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300',
      title: en ? '8 Cards / Case' : '8 కార్డులు / కేసు',
      desc: en ? 'Evaluate solutions' : 'పరిష్కారాలు ఎంచుకోండి',
    },
    {
      step: '03',
      icon: <LockIcon sx={{ fontSize: 13, color: '#FFFFFF' }} />,
      iconBg: 'bg-emerald-600 shadow-emerald-500/30',
      badgeBg: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300',
      title: en ? 'Seal & Bank' : 'లీక్ ఆపి భద్రపరచండి',
      desc: en ? 'Route to treasure vault' : 'ఆదాయాన్ని పెంచండి',
    },
  ];

  const actions = [
    {
      type: 'hire',
      icon: <CheckIcon sx={{ fontSize: 15, color: '#FFFFFF' }} />,
      iconBg: 'bg-emerald-600 shadow-emerald-600/30',
      title: en ? 'Hire / Implement' : 'నియమించు / అమలు',
      badge: '+10 / +3 pts',
      badgeStyle: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-bold',
      containerStyle:
        'border-emerald-500/35 bg-gradient-to-r from-emerald-50/70 via-white to-emerald-50/40 dark:from-emerald-950/25 dark:via-[#0E1F3D] dark:to-emerald-950/15',
      desc: en
        ? 'Accept high-match talent or tools that seal the active stage leak.'
        : 'యాక్టివ్ స్టేజ్ లీక్‌ను పరిష్కరించే సరైన టాలెంట్ లేదా టూల్స్‌ను ఎంచుకోండి.',
      controlsMobile: en ? 'Swipe Right' : 'కుడివైపు స్వైప్',
      keys: ['→', 'Enter'],
      accentColor: 'text-emerald-700 dark:text-emerald-400',
    },
    {
      type: 'reject',
      icon: <CloseIcon sx={{ fontSize: 15, color: '#FFFFFF' }} />,
      iconBg: 'bg-rose-600 shadow-rose-600/30',
      title: en ? 'Avoid / Reject' : 'వద్దు / తిరస్కరించండి',
      badge: en ? 'Avoids −5 Loss' : '−5 నష్టం నివారణ',
      badgeStyle: 'border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-300 font-bold',
      containerStyle:
        'border-rose-500/35 bg-gradient-to-r from-rose-50/70 via-white to-rose-50/40 dark:from-rose-950/25 dark:via-[#0E1F3D] dark:to-rose-950/15',
      desc: en
        ? 'Pass on poor fits to protect pipeline pressure & avoid revenue loss.'
        : 'పైప్‌లైన్ ఒత్తిడి తగ్గకుండా, సరైనది కాని ఎంపికలను తిరస్కరించండి.',
      controlsMobile: en ? 'Swipe Left' : 'ఎడమవైపు స్వైప్',
      keys: ['←', 'Esc'],
      accentColor: 'text-rose-700 dark:text-rose-400',
    },
  ];

  const scoringRules = [
    {
      score: '+10',
      label: en ? 'Clamp' : 'క్లాంప్',
      sub: en ? 'Full solution fit' : 'పూర్తి పరిష్కారం',
      color: 'text-emerald-600 dark:text-emerald-400',
      icon: <CheckIcon sx={{ fontSize: 13, color: '#FFFFFF' }} />,
      iconBg: 'bg-emerald-600',
      border: 'border-emerald-300 dark:border-emerald-500/30',
      bg: 'bg-gradient-to-b from-emerald-50/80 to-white dark:from-emerald-950/30 dark:to-[#0B1730]',
    },
    {
      score: '+3',
      label: en ? 'Patch' : 'ప్యాచ్',
      sub: en ? 'Partial fix' : 'పాక్షిక పరిష్కారం',
      color: 'text-blue-600 dark:text-blue-400',
      icon: <BoltIcon sx={{ fontSize: 13, color: '#FFFFFF' }} />,
      iconBg: 'bg-blue-600',
      border: 'border-blue-300 dark:border-blue-500/30',
      bg: 'bg-gradient-to-b from-blue-50/80 to-white dark:from-blue-950/30 dark:to-[#0B1730]',
    },
    {
      score: '−5 / −8',
      label: en ? 'Leak' : 'లీక్',
      sub: en ? 'Wrong pick' : 'తప్పుడు ఎంపిక',
      color: 'text-rose-600 dark:text-rose-400',
      icon: <TrendingDownIcon sx={{ fontSize: 13, color: '#FFFFFF' }} />,
      iconBg: 'bg-rose-600',
      border: 'border-rose-300 dark:border-rose-500/30',
      bg: 'bg-gradient-to-b from-rose-50/80 to-white dark:from-rose-950/30 dark:to-[#0B1730]',
    },
  ];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="guide-dialog-title"
      fullWidth
      maxWidth={false}
      scroll="paper"
      slotProps={{
        paper: {
          className:
            'border border-[#D1DDF5] dark:border-white/15 !bg-[#F8FAFD] dark:!bg-[#0A162D] text-[#0B1D3A] dark:text-white shadow-2xl',
          style: { borderRadius: '6px' },
          sx: {
            backgroundImage: 'none',
            display: 'flex',
            flexDirection: 'column',
            maxHeight: { xs: 'calc(100dvh - 16px)', sm: '86vh' },
            maxWidth: { xs: '94vw', sm: 450, md: 470 },
            m: { xs: 1, sm: 2 },
            overflow: 'hidden',
          },
        },
      }}
    >
      {/* Dialog Header - Fixed at top */}
      <div className="shrink-0 flex items-center justify-between border-b border-[#DBE4FA] bg-gradient-to-r from-white via-[#F8FAFD] to-white px-4 py-2.5 sm:px-5 sm:py-3.5 dark:border-white/10 dark:from-[#0D1E3C] dark:via-[#0B1730] dark:to-[#0D1E3C]">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div
            className="grid h-8 w-8 sm:h-9 sm:w-9 place-items-center bg-gradient-to-br from-[#0B1D3A] via-[#142A54] to-[#1E3A8A] text-white shadow-sm ring-1 ring-white/20 dark:from-[#1E3A8A] dark:to-[#2563EB]"
            style={{ borderRadius: '4px' }}
          >
            <MenuBookIcon sx={{ fontSize: { xs: 16, sm: 18 }, color: '#FFFFFF' }} />
          </div>
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <h3 id="guide-dialog-title" className="text-sm sm:text-[15px] font-bold leading-tight tracking-tight text-[#0B1D3A] dark:text-white">
                {en ? 'Game Guide' : 'గేమ్ సూచనలు'}
              </h3>
              <span
                className="bg-amber-400/20 px-1.5 py-0.5 text-[8px] sm:text-[8.5px] font-bold uppercase tracking-wider text-amber-700 dark:bg-amber-400/10 dark:text-amber-300 border border-amber-400/30"
                style={{ borderRadius: '2px' }}
              >
                FARE DESK
              </span>
            </div>
            <p className="mt-0.5 text-[10px] sm:text-[11px] font-semibold text-[#64748B] dark:text-slate-400">
              {en ? 'Quick rules & scoring strategy' : 'త్వరిత నియమాలు & స్కోరింగ్ విధానం'}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="grid h-7 w-7 cursor-pointer place-items-center rounded-[3px] text-slate-400 transition-all hover:bg-slate-200/80 hover:text-slate-800 active:scale-95 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white"
          aria-label={en ? 'Close guide' : 'సూచనలు మూసివేయండి'}
        >
          <CloseIcon sx={{ fontSize: 18 }} />
        </button>
      </div>

      {/* Dialog Content - Only instruction & scoring points part scrolls */}
      <DialogContent
        sx={{
          flex: '1 1 auto',
          overflowY: 'auto',
          overscrollBehavior: 'contain',
          minHeight: 0,
          p: { xs: '12px 14px', sm: '16px 20px' },
          '&::-webkit-scrollbar': { width: '4px' },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(100, 116, 139, 0.3)',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: 'rgba(100, 116, 139, 0.5)',
          },
        }}
      >
        <div className="space-y-3.5 sm:space-y-4">
          {/* Section 1: 3-Step Flow Pipeline */}
          <div
            className="grid grid-cols-3 divide-x divide-slate-200/80 border border-[#D5E1F7] bg-white p-2 sm:p-2.5 shadow-xs dark:divide-white/10 dark:border-white/10 dark:bg-white/[0.03]"
            style={{ borderRadius: '4px' }}
          >
            {steps.map((st, idx) => (
              <div key={st.step} className="relative flex flex-col items-center justify-between px-1 sm:px-1.5 py-0.5 text-center">
                <div className="mb-1 sm:mb-1.5 flex items-center gap-1 sm:gap-1.5">
                  <span
                    className={`grid h-4.5 w-4.5 sm:h-5 sm:w-5 place-items-center text-white shadow-xs ${st.iconBg}`}
                    style={{ borderRadius: '2px' }}
                  >
                    {st.icon}
                  </span>
                  <span
                    className={`px-1.5 py-0.2 text-[8.5px] sm:text-[9px] font-bold uppercase tracking-wider ${st.badgeBg}`}
                    style={{ borderRadius: '2px' }}
                  >
                    {st.step}
                  </span>
                </div>
                <div className="text-[11px] sm:text-[11.5px] font-bold leading-tight text-[#0B1D3A] dark:text-white">
                  {st.title}
                </div>
                <div className="mt-0.5 sm:mt-1 text-[9px] sm:text-[9.5px] font-medium leading-tight text-[#64748B] dark:text-slate-400">
                  {st.desc}
                </div>
                {idx < 2 && (
                  <span className="pointer-events-none absolute -right-1.5 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-600 hidden sm:block">
                    <ArrowForwardIosIcon sx={{ fontSize: 8 }} />
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Section 2: Direct Action Cards */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[9.5px] sm:text-[10px] font-bold uppercase tracking-widest text-[#64748B] dark:text-slate-400">
                {en ? 'How to Make Decisions' : 'నిర్ణయాల విధానం'}
              </span>
              <div className="h-px flex-1 bg-slate-200/80 dark:bg-white/10" />
            </div>

            <div className="space-y-2 sm:space-y-2.5">
              {actions.map((act) => (
                <div
                  key={act.title}
                  className={`border p-2.5 sm:p-3 shadow-xs transition-all ${act.containerStyle}`}
                  style={{ borderRadius: '4px' }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 sm:gap-2.5">
                      <span
                        className={`grid h-5.5 w-5.5 sm:h-6 sm:w-6 shrink-0 place-items-center text-white shadow-xs ${act.iconBg}`}
                        style={{ borderRadius: '2px' }}
                      >
                        {act.icon}
                      </span>
                      <span className="text-xs sm:text-[13px] font-bold text-[#0B1D3A] dark:text-white tracking-tight">
                        {act.title}
                      </span>
                    </div>

                    <span
                      className={`border px-1.5 sm:px-2 py-0.5 text-[8.5px] sm:text-[9px] tracking-wider uppercase ${act.badgeStyle}`}
                      style={{ borderRadius: '2px' }}
                    >
                      {act.badge}
                    </span>
                  </div>

                  <p className="mt-1 sm:mt-1.5 text-[10.5px] sm:text-[11px] leading-relaxed text-[#475569] dark:text-slate-300">
                    {act.desc}
                  </p>

                  <div className="mt-2 sm:mt-2.5 flex items-center justify-between border-t border-black/5 dark:border-white/5 pt-1.5 sm:pt-2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9.5px] sm:text-[10px] font-bold text-[#64748B] dark:text-slate-400">
                        {en ? 'Desktop:' : 'డెస్క్‌టాప్:'}
                      </span>
                      {act.keys.map((k) => (
                        <kbd
                          key={k}
                          className="inline-block border border-slate-300 bg-white px-1.5 py-0.5 text-[9.5px] sm:text-[10px] font-bold text-[#0B1D3A] shadow-xs dark:border-white/20 dark:bg-[#15284B] dark:text-white"
                          style={{ borderRadius: '2px' }}
                        >
                          {k}
                        </kbd>
                      ))}
                    </div>

                    <div className={`flex items-center gap-1 text-[10px] sm:text-[10.5px] font-bold ${act.accentColor}`}>
                      {act.type === 'hire' ? (
                        <SwipeRightIcon sx={{ fontSize: 13 }} />
                      ) : (
                        <SwipeLeftIcon sx={{ fontSize: 13 }} />
                      )}
                      <span>{act.controlsMobile}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Direct Scoring Tiles */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[9.5px] sm:text-[10px] font-bold uppercase tracking-widest text-[#64748B] dark:text-slate-400">
                  {en ? 'Scoring & Impact' : 'స్కోరింగ్ ఫలితాలు'}
                </span>
                <div className="h-px w-8 sm:w-10 bg-slate-200/80 dark:bg-white/10" />
              </div>

              <div
                className="inline-flex items-center gap-1 border border-amber-500/30 bg-amber-500/10 px-1.5 sm:px-2 py-0.5 text-[8.5px] sm:text-[9.5px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300"
                style={{ borderRadius: '2px' }}
              >
                <WhatshotIcon sx={{ fontSize: 12, color: '#D97706' }} />
                <span>{en ? 'Up to 3x Combo Multiplier' : 'గరిష్టంగా 3x కాంబో'}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
              {scoringRules.map((r) => (
                <div
                  key={r.score}
                  className={`flex flex-col items-center justify-center border p-2 sm:p-2.5 text-center shadow-xs transition-transform hover:-translate-y-0.5 ${r.border} ${r.bg}`}
                  style={{ borderRadius: '4px' }}
                >
                  <div className="flex items-center gap-1 sm:gap-1.5">
                    <span
                      className={`grid h-4.5 w-4.5 sm:h-5 sm:w-5 place-items-center text-white shadow-xs ${r.iconBg}`}
                      style={{ borderRadius: '2px' }}
                    >
                      {r.icon}
                    </span>
                    <span className={`text-xs sm:text-[13px] font-bold tabular-nums ${r.color}`}>
                      {r.score}
                    </span>
                  </div>
                  <span className="mt-1 sm:mt-1.5 text-[10.5px] sm:text-[11px] font-bold leading-tight text-[#0B1D3A] dark:text-white">
                    {r.label}
                  </span>
                  <span className="mt-0.5 text-[8.5px] sm:text-[9px] font-semibold text-[#64748B] dark:text-slate-400">
                    {r.sub}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>

      {/* Dialog Footer - Fixed at bottom */}
      <div className="shrink-0 flex items-center justify-between border-t border-[#DBE4FA] bg-gradient-to-r from-white via-[#F8FAFD] to-white px-4 py-2 sm:px-5 sm:py-2.5 dark:border-white/10 dark:from-[#0B1730] dark:via-[#0D1E3C] dark:to-[#0B1730]">
        <div className="flex items-center gap-1 sm:gap-1.5 text-[#64748B] dark:text-slate-300">
          <LightbulbIcon sx={{ fontSize: { xs: 13, sm: 15 }, color: '#F59E0B' }} />
          <span className="text-[9.5px] sm:text-[10.5px] font-bold">
            {en ? 'String correct picks in a row to maximize revenue flow.' : 'వరుసగా సరైన ఎంపికలతో కాంబో పెంచుకోండి.'}
          </span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="group relative cursor-pointer overflow-hidden border border-[#1E3A8A]/50 bg-gradient-to-r from-[#0B1D3A] via-[#142A54] to-[#1E3A8A] px-4 sm:px-5 py-1.5 sm:py-2 text-[11px] sm:text-xs font-bold tracking-wide text-white shadow-[0_2px_8px_rgba(11,29,58,0.25)] transition-all hover:brightness-110 active:scale-95 dark:border-white/20 dark:from-[#1E3A8A] dark:to-[#2563EB]"
          style={{ borderRadius: '3px' }}
        >
          <span className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent" />
          <span>{en ? 'Got It' : 'అర్థమైంది'}</span>
        </button>
      </div>
    </Dialog>
  );
}