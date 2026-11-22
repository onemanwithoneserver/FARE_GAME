import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import BuildIcon from '@mui/icons-material/Build';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import {
  Check3DIcon,
  Cross3DIcon,
  Layers3DIcon,
  Trophy3DIcon,
  Bolt3DIcon,
  Timer3DIcon,
} from './Icons3D';
import type { Language } from '../types';

interface GuideDialogProps {
  open: boolean;
  onClose: () => void;
  lang: Language;
}

export default function GuideDialog({ open, onClose, lang }: GuideDialogProps) {
  const en = lang === 'en';

  const objectives = [
    {
      icon: <Layers3DIcon size={18} />,
      title: en ? '3 Funnel Cases' : '3 ఫన్నెల్ కేసులు',
      desc: en ? 'Find the bottleneck stage' : 'లీక్ అవుతున్న దశను గుర్తించండి',
    },
    {
      icon: <Timer3DIcon size={18} />,
      title: en ? '8 Cards per Case' : 'కేసుకు 8 కార్డులు',
      desc: en ? 'Evaluate candidates & tools' : 'అభ్యర్థులు & టూల్స్‌ను ఎంచుకోండి',
    },
    {
      icon: <Trophy3DIcon size={18} />,
      title: en ? 'Seal the Leak' : 'లీక్‌ను ఆపండి',
      desc: en ? 'Route revenue to the vault' : 'ఆదాయాన్ని వాల్ట్‌కు చేర్చండి',
    },
  ];

  const actions = [
    {
      tone: 'green',
      icon: <Check3DIcon size={16} />,
      bg: 'bg-[#16A34A]',
      title: en ? 'Hire / Implement' : 'నియమించు / అమలు',
      badge: '+10',
      badgeColor: 'text-[#15803D] bg-emerald-500/10 dark:text-emerald-400 dark:bg-emerald-400/10 border-emerald-500/30',
      desc: en
        ? 'Add top talent or systems that solve the exact funnel bottleneck.'
        : 'ఫన్నెల్ లీక్‌ను సరిగ్గా పరిష్కరించే సరైన టీమ్ లేదా టూల్స్ చేర్చండి.',
    },
    {
      tone: 'blue',
      icon: <BuildIcon sx={{ fontSize: 16, color: '#FFFFFF' }} />,
      bg: 'bg-[#2563EB]',
      title: en ? 'Fix / Patch' : 'సరిచేయండి / ప్యాచ్',
      badge: '+3',
      badgeColor: 'text-[#1D4ED8] bg-blue-500/10 dark:text-sky-400 dark:bg-sky-400/10 border-blue-500/30',
      desc: en
        ? 'Quick partial fixes that hold pipeline pressure temporarily.'
        : 'పైప్‌లైన్ ప్రెజర్‌ను తాత్కాలికంగా ఆపే పాక్షిక పరిష్కారాలు.',
    },
    {
      tone: 'red',
      icon: <Cross3DIcon size={16} />,
      bg: 'bg-[#DC2626]',
      title: en ? 'Avoid / Pass' : 'వద్దు / నివారించండి',
      badge: '−5 / −8',
      badgeColor: 'text-[#B91C1C] bg-rose-500/10 dark:text-rose-400 dark:bg-rose-400/10 border-rose-500/30',
      desc: en
        ? 'Reject mismatches or wrong fixes that worsen pipeline leakage.'
        : 'లీక్‌ను మరింత పెంచే తప్పుడు నిర్ణయాలు మరియు సరిపోని వ్యక్తులను వద్దు.',
    },
  ];

  const scoringRules = [
    {
      score: '+10',
      label: en ? 'Permanent Clamp' : 'శాశ్వత క్లాంప్',
      desc: en ? 'Full fit solution' : 'పూర్తి స్థాయి పరిష్కారం',
      color: 'text-emerald-600 dark:text-emerald-400',
      icon: <Check3DIcon size={14} />,
    },
    {
      score: '+3',
      label: en ? 'Temporary Patch' : 'తాత్కాలిక ప్యాచ్',
      desc: en ? 'Partial fit hold' : 'పాక్షిక అదనపు సపోర్ట్',
      color: 'text-sky-600 dark:text-sky-400',
      icon: <Bolt3DIcon size={14} />,
    },
    {
      score: '−5 / −8',
      label: en ? 'Leak Worsens' : 'లీక్ పెరుగుతుంది',
      desc: en ? 'Mismatched decision' : 'తప్పుడు ఎంపిక',
      color: 'text-rose-600 dark:text-rose-400',
      icon: <TrendingDownIcon sx={{ fontSize: 14 }} />,
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
            'fare-card-3d !rounded-[12px] border border-[#DBE4FA] dark:border-white/10 !bg-[#F8F9FC] dark:!bg-[#0B1730] text-[#0B1D3A] dark:text-white',
          sx: {
            backgroundImage: 'none',
            m: { xs: 2, sm: 3 },
            overflow: 'hidden',
          },
        },
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#DBE4FA] px-4 py-3 dark:border-white/10">
        <div className="flex items-center gap-2">
          <span className="fare-icon-3d grid h-7 w-7 place-items-center rounded-[6px] bg-[#0B1D3A] text-white dark:bg-[#1A3463]">
            <MenuBookIcon sx={{ fontSize: 16, color: '#FFFFFF' }} />
          </span>
          <div>
            <h3 id="guide-dialog-title" className="text-sm font-extrabold leading-tight text-[#0B1D3A] dark:text-white">
              {en ? 'Sales Funnel Guide' : 'సేల్స్ ఫన్నెల్ గైడ్'}
            </h3>
            <p className="text-[10px] font-semibold text-[#64748B] dark:text-slate-400">
              {en ? 'Quick rules & scoring breakdown' : 'గేమ్ నియమాలు & స్కోరింగ్'}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="grid h-7 w-7 cursor-pointer place-items-center rounded-full text-slate-500 transition hover:bg-slate-200/60 hover:text-slate-900 active:scale-95 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white"
          aria-label={en ? 'Close guide' : 'సూచనలు మూసివేయండి'}
        >
          <CloseIcon sx={{ fontSize: 18 }} />
        </button>
      </div>

      {/* Content without unnecessary spacing */}
      <DialogContent sx={{ p: { xs: '12px 14px', sm: '14px 18px' } }}>
        <div className="space-y-3">
          {/* Section 1: Objectives (3 compact pills) */}
          <div className="grid grid-cols-3 gap-2">
            {objectives.map((obj) => (
              <div
                key={obj.title}
                className="flex flex-col items-center justify-center rounded-[8px] border border-[#DBE4FA] bg-white/80 p-2 text-center shadow-[inset_0_1px_0_#ffffff] dark:border-white/10 dark:bg-white/[0.04] dark:shadow-none"
              >
                <span className="mb-1">{obj.icon}</span>
                <span className="text-[11px] font-black text-[#0B1D3A] dark:text-white">{obj.title}</span>
                <span className="text-[9px] font-medium leading-tight text-[#64748B] dark:text-slate-400">{obj.desc}</span>
              </div>
            ))}
          </div>

          {/* Section 2: Action Choices (Compact stacked items) */}
          <div className="space-y-1.5 rounded-[8px] border border-[#DBE4FA] bg-white/60 p-2.5 dark:border-white/10 dark:bg-white/[0.02]">
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-[#64748B] dark:text-slate-400">
              {en ? 'Decisions & Actions' : 'నిర్ణయాలు & చర్యలు'}
            </div>
            <div className="space-y-1.5">
              {actions.map((act) => (
                <div
                  key={act.title}
                  className="flex items-start gap-2.5 rounded-[6px] border border-slate-200/70 bg-white/90 p-2 dark:border-white/10 dark:bg-[#071124]/50"
                >
                  <span className={`fare-icon-3d mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-[5px] text-white ${act.bg}`}>
                    {act.icon}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-black text-[#0B1D3A] dark:text-white">{act.title}</span>
                      <span className={`rounded border px-1 py-0.2 text-[9px] font-extrabold ${act.badgeColor}`}>
                        {act.badge}
                      </span>
                    </div>
                    <p className="mt-0.5 text-[11px] leading-snug text-[#475569] dark:text-slate-300">
                      {act.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Scoring Rules (3-column mini summary) */}
          <div className="rounded-[8px] border border-[#DBE4FA] bg-white/60 p-2.5 dark:border-white/10 dark:bg-white/[0.02]">
            <div className="mb-1.5 text-[10px] font-extrabold uppercase tracking-wider text-[#64748B] dark:text-slate-400">
              {en ? 'Scoring Impact' : 'స్కోరింగ్ ప్రభావం'}
            </div>
            <div className="grid grid-cols-3 gap-2">
              {scoringRules.map((r) => (
                <div
                  key={r.score}
                  className="flex flex-col items-center justify-center rounded-[6px] border border-slate-200/70 bg-white/90 p-1.5 text-center dark:border-white/10 dark:bg-[#071124]/50"
                >
                  <div className="flex items-center gap-1">
                    <span className={`text-xs font-black tabular-nums ${r.color}`}>{r.score}</span>
                  </div>
                  <span className="text-[10px] font-bold text-[#0B1D3A] dark:text-white">{r.label}</span>
                  <span className="text-[9px] text-[#64748B] dark:text-slate-400">{r.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>

      {/* Compact Dialog Footer */}
      <div className="flex items-center justify-between border-t border-[#DBE4FA] bg-white/40 px-4 py-2.5 dark:border-white/10 dark:bg-white/[0.02]">
        <span className="text-[10px] font-medium text-[#64748B] dark:text-slate-400">
          {en ? '💡 Swipe or tap buttons to decide' : '💡 స్వైప్ లేదా బటన్స్ ద్వారా నిర్ణయించండి'}
        </span>
        <button
          type="button"
          onClick={onClose}
          className="cursor-pointer rounded-[6px] bg-[#0B1D3A] px-3.5 py-1 text-xs font-bold text-white transition hover:bg-[#1A3463] active:scale-95 dark:bg-[#1A3463] dark:hover:bg-[#25447B]"
        >
          {en ? 'Got it' : 'అర్థమైంది'}
        </button>
      </div>
    </Dialog>
  );
}
