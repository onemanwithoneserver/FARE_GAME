import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import {
  Check3DIcon,
  Cross3DIcon,
  Layers3DIcon,
  Trophy3DIcon,
  Bolt3DIcon,
  Timer3DIcon,
  Vault3DIcon,
} from './Icons3D';
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
      icon: <Layers3DIcon size={18} />,
      title: en ? '3 Funnel Cases' : '3 ఫన్నెల్ కేసులు',
      desc: en ? 'Identify each revenue leak stage' : 'ప్రతి దశలో లీక్‌ను గుర్తించండి',
    },
    {
      step: '02',
      icon: <Timer3DIcon size={18} />,
      title: en ? '8 Dossiers / Case' : 'కేసుకు 8 కార్డులు',
      desc: en ? 'Evaluate candidates & systems' : 'అభ్యర్థులు & టూల్స్‌ను ఎంచుకోండి',
    },
    {
      step: '03',
      icon: <Vault3DIcon size={20} />,
      title: en ? 'Seal & Bank' : 'లీక్‌ను ఆపి నిల్వ చేయండి',
      desc: en ? 'Direct revenue safely into vault' : 'ఆదాయాన్ని వాల్ట్‌కు చేర్చండి',
    },
  ];

  const actions = [
    {
      tone: 'green',
      icon: <Check3DIcon size={18} />,
      title: en ? 'Hire / Implement' : 'నియమించు / అమలు',
      badge: '+10 / +3',
      controlDesktop: en ? 'Press [→] or Enter' : '[→] లేదా Enter',
      controlMobile: en ? 'Swipe Right 👉' : 'కుడివైపు స్వైప్ 👉',
      badgeColor:
        'text-emerald-700 bg-emerald-500/15 border-emerald-500/30 dark:text-emerald-300 dark:bg-emerald-400/15',
      desc: en
        ? 'Accept talent or systems tailored to solve the current pipeline leak. Perfect fit locks a clamp (+10); partial fit patches pressure (+3).'
        : 'ప్రస్తుత పైప్‌లైన్ లీక్‌ను పరిష్కరించే సరైన టీమ్ లేదా టూల్స్‌ను ఆమోదించండి. సరైన ఎంపికతో (+10), పాక్షిక ఎంపికతో (+3) లభిస్తాయి.',
    },
    {
      tone: 'red',
      icon: <Cross3DIcon size={18} />,
      title: en ? 'Avoid / Reject' : 'వద్దు / నివారించండి',
      badge: en ? 'Prevents −5 to −8' : '−5 నుండి −8 నివారణ',
      controlDesktop: en ? 'Press [←] or Esc' : '[←] లేదా Esc',
      controlMobile: en ? 'Swipe Left 👈' : 'ఎడమవైపు స్వైప్ 👈',
      badgeColor:
        'text-rose-700 bg-rose-500/15 border-rose-500/30 dark:text-rose-300 dark:bg-rose-400/15',
      desc: en
        ? 'Pass on mismatches and unsuitable proposals. Rejecting bad fits keeps pipe pressure stable and prevents costly leakage penalties.'
        : 'సరిపోని వ్యక్తులు లేదా తప్పుడు టూల్స్‌ను తిరస్కరించండి. తప్పుడు నిర్ణయాలు పైప్‌లైన్ లీక్‌ను తీవ్రం చేయకుండా కాపాడండి.',
    },
  ];

  const scoringRules = [
    {
      score: '+10',
      label: en ? 'Permanent Clamp' : 'శాశ్వత క్లాంప్',
      desc: en ? 'Full solution fit' : 'పూర్తి స్థాయి సరిపోలిక',
      color: 'text-emerald-600 dark:text-emerald-400',
      icon: <Check3DIcon size={13} />,
      bg: 'bg-emerald-50/70 border-emerald-200/80 dark:bg-emerald-950/20 dark:border-emerald-500/20',
    },
    {
      score: '+3',
      label: en ? 'Temporary Patch' : 'తాత్కాలిక ప్యాచ్',
      desc: en ? 'Partial fit hold' : 'పాక్షిక అదనపు సపోర్ట్',
      color: 'text-sky-600 dark:text-sky-400',
      icon: <Bolt3DIcon size={13} />,
      bg: 'bg-sky-50/70 border-sky-200/80 dark:bg-sky-950/20 dark:border-sky-500/20',
    },
    {
      score: '−5 / −8',
      label: en ? 'Leak Worsens' : 'లీక్ పెరుగుతుంది',
      desc: en ? 'Mismatched decision' : 'తప్పుడు ఎంపిక పెనాల్టీ',
      color: 'text-rose-600 dark:text-rose-400',
      icon: <TrendingDownIcon sx={{ fontSize: 13 }} />,
      bg: 'bg-rose-50/70 border-rose-200/80 dark:bg-rose-950/20 dark:border-rose-500/20',
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
            'fare-card-3d !rounded-[14px] border border-[#DBE4FA] dark:border-white/15 !bg-[#F8FAFC] dark:!bg-[#0A162D] text-[#0B1D3A] dark:text-white shadow-2xl',
          sx: {
            backgroundImage: 'none',
            m: { xs: 1.5, sm: 2.5 },
            overflow: 'hidden',
          },
        },
      }}
    >
      {/* Dialog Header */}
      <div className="flex items-center justify-between border-b border-[#DBE4FA] bg-gradient-to-r from-white via-[#F8FAFD] to-white px-4 py-3 dark:border-white/10 dark:from-[#0D1E3C] dark:via-[#0B1730] dark:to-[#0D1E3C]">
        <div className="flex items-center gap-2.5">
          <div className="relative grid h-8 w-8 place-items-center rounded-[8px] bg-gradient-to-br from-[#0B1D3A] to-[#1E3A8A] text-white shadow-sm dark:from-[#1E3A8A] dark:to-[#2563EB]">
            <MenuBookIcon sx={{ fontSize: 17, color: '#FFFFFF' }} />
          </div>
          <div>
            <h3 id="guide-dialog-title" className="text-sm font-black leading-tight tracking-tight text-[#0B1D3A] dark:text-white">
              {en ? 'Sales Funnel Playbook' : 'సేల్స్ ఫన్నెల్ గైడ్'}
            </h3>
            <p className="text-[10px] font-semibold text-[#64748B] dark:text-slate-400">
              {en ? 'Master decision-making & score maximum points' : 'నిర్ణయాలు & స్కోరింగ్ సూత్రాలు'}
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
      <DialogContent sx={{ p: { xs: '12px 14px', sm: '14px 18px' } }}>
        <div className="space-y-3">
          {/* Section 1: 3-Step Game Flow */}
          <div className="grid grid-cols-3 gap-2">
            {steps.map((st) => (
              <div
                key={st.step}
                className="relative flex flex-col items-center justify-between rounded-[9px] border border-[#DBE4FA] bg-white p-2 text-center shadow-[inset_0_1px_0_#ffffff] dark:border-white/10 dark:bg-white/[0.03] dark:shadow-none"
              >
                <div className="mb-1 flex w-full items-center justify-between px-0.5">
                  <span className="text-[9px] font-black uppercase tracking-wider text-[#C99A2E]">
                    {st.step}
                  </span>
                  <span className="shrink-0">{st.icon}</span>
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

          {/* Section 2: Decision Actions (Hire vs Avoid) */}
          <div className="space-y-1.5 rounded-[10px] border border-[#DBE4FA] bg-white/70 p-2.5 dark:border-white/10 dark:bg-white/[0.02]">
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-[#64748B] dark:text-slate-400">
              {en ? 'Interactive Actions' : 'నిర్ణయాల ఎంపిక'}
            </div>
            <div className="space-y-1.5">
              {actions.map((act) => (
                <div
                  key={act.title}
                  className="rounded-[8px] border border-slate-200/80 bg-white p-2.5 shadow-sm dark:border-white/10 dark:bg-[#071124]/60"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`fare-icon-3d grid h-6 w-6 shrink-0 place-items-center rounded-[6px] text-white ${
                          act.tone === 'green' ? 'bg-[#16A34A]' : 'bg-[#DC2626]'
                        }`}
                      >
                        {act.icon}
                      </span>
                      <span className="text-xs font-black text-[#0B1D3A] dark:text-white">
                        {act.title}
                      </span>
                    </div>

                    <span className={`rounded-full border px-2 py-0.5 text-[10px] font-extrabold ${act.badgeColor}`}>
                      {act.badge}
                    </span>
                  </div>

                  <p className="mt-1 text-[11px] leading-snug text-[#475569] dark:text-slate-300">
                    {act.desc}
                  </p>

                  <div className="mt-1.5 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-1 text-[10px] font-semibold text-[#64748B] dark:border-white/5 dark:text-slate-400">
                    <span className="inline-flex items-center gap-1">
                      <KeyboardIcon sx={{ fontSize: 13 }} />
                      {act.controlDesktop}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <TouchAppIcon sx={{ fontSize: 13 }} />
                      {act.controlMobile}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Scoring Matrix & Combo Streak */}
          <div className="rounded-[10px] border border-[#DBE4FA] bg-white/70 p-2.5 dark:border-white/10 dark:bg-white/[0.02]">
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#64748B] dark:text-slate-400">
                {en ? 'Scoring & Multipliers' : 'స్కోరింగ్ ప్రభావం & కాంబో'}
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#D97706] dark:text-[#FBBF24]">
                <WhatshotIcon sx={{ fontSize: 13 }} />
                {en ? 'Combo Streak Active' : 'కాంబో స్ట్రీక్'}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {scoringRules.map((r) => (
                <div
                  key={r.score}
                  className={`flex flex-col items-center justify-center rounded-[7px] border p-1.5 text-center transition-all ${r.bg}`}
                >
                  <div className="flex items-center gap-1">
                    {r.icon}
                    <span className={`text-xs font-black tabular-nums ${r.color}`}>
                      {r.score}
                    </span>
                  </div>
                  <span className="mt-0.5 text-[10px] font-bold leading-tight text-[#0B1D3A] dark:text-white">
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
      <div className="flex items-center justify-between border-t border-[#DBE4FA] bg-gradient-to-r from-white/90 via-[#F8FAFD] to-white/90 px-4 py-2.5 dark:border-white/10 dark:from-[#0B1730] dark:via-[#0D1E3C] dark:to-[#0B1730]">
        <span className="text-[10px] font-semibold text-[#64748B] dark:text-slate-400">
          {en ? '💡 String correct picks together to maximize score' : '💡 వరుస సరైన ఎంపికలతో ఎక్కువ పాయింట్లు సాధించండి'}
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
