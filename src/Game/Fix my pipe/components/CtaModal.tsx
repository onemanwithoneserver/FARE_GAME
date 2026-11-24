import MenuBookIcon from '@mui/icons-material/MenuBook';
import ForumIcon from '@mui/icons-material/Forum';
import PhoneIcon from '@mui/icons-material/Phone';
import CloseIcon from '@mui/icons-material/Close';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Trophy3DIcon, Users3DIcon } from './Icons3D';
import { Language } from '../types';
import { FARE_LINKS } from '../data';

interface CtaModalProps {
  isOpen: boolean;
  lang: Language;
  onClose: () => void;
}

export default function CtaModal({ isOpen, lang, onClose }: CtaModalProps) {
  if (!isOpen) return null;

  const links = [
    {
      title: lang === 'en' ? 'Hire Proven Real Estate Leaders' : 'అనుభవజ్ఞులైన టీమ్ లీడ్స్ కావాలా?',
      sub: lang === 'en' ? 'Get verified TLs, sales managers & site closers' : 'ధృవీకరించబడిన TLలు, సేల్స్ మేనేజర్లు & సైట్ క్లోజర్లు',
      url: FARE_LINKS.talent,
      badge: lang === 'en' ? 'TOP TALENT' : 'టాప్ టాలెంట్',
      bg: 'bg-[#C99A2E]',
      icon: <Users3DIcon size={22} />,
    },
    {
      title: lang === 'en' ? 'Real Estate TL Accelerator Course' : 'రియల్ ఎస్టేట్ లీడర్‌షిప్ కోర్సు',
      sub: lang === 'en' ? 'Master funnel building, closing & team reviews' : 'పైప్‌లైన్ బిల్డింగ్, క్లోజింగ్ & టీమ్ మేనేజ్‌మెంట్',
      url: FARE_LINKS.course,
      badge: lang === 'en' ? 'FREE ACCESS' : 'ఉచిత ప్రవేశం',
      bg: 'bg-[#2563EB]',
      icon: <MenuBookIcon sx={{ fontSize: 20, color: '#FFFFFF' }} />,
    },
    {
      title: lang === 'en' ? '1-on-1 Pipeline Diagnostic Call' : '1-on-1 ఫన్నెల్ డయాగ్నస్టిక్ కాల్',
      sub: lang === 'en' ? '30-minute private pipeline audit with FARE founders' : 'మీ ప్రాజెక్ట్ సేల్స్ డ్రాప్-ఆఫ్స్‌పై ఉచిత విశ్లేషణ',
      url: FARE_LINKS.session,
      badge: lang === 'en' ? 'STRATEGY' : 'వ్యూహం',
      bg: 'bg-[#0F766E]',
      icon: <PhoneIcon sx={{ fontSize: 20, color: '#FFFFFF' }} />,
    },
    {
      title: lang === 'en' ? 'Instant WhatsApp Community' : 'వాట్సాప్ లీడర్స్ కమ్యూనిటీ',
      sub: lang === 'en' ? 'Connect with 1,200+ plotted & residential leaders' : '1,200+ రియల్ ఎస్టేట్ లీడర్లతో కనెక్ట్ అవ్వండి',
      url: FARE_LINKS.whatsapp,
      badge: lang === 'en' ? 'COMMUNITY' : 'కమ్యూనిటీ',
      bg: 'bg-[#16A34A]',
      icon: <ForumIcon sx={{ fontSize: 20, color: '#FFFFFF' }} />,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#071328]/65 p-3 sm:p-4 backdrop-blur-md">
      <div className="fare-card-3d relative max-h-[90vh] w-full max-w-[390px] sm:max-w-[420px] overflow-y-auto rounded-[10px] p-4 sm:p-5 md:p-6">
        <button
          onClick={onClose}
          aria-label={lang === 'en' ? 'Close' : 'మూసివేయండి'}
          className="fare-icon-3d absolute right-3.5 top-3.5 flex h-7 w-7 cursor-pointer items-center justify-center rounded-[6px] bg-[#0B1D3A] text-white transition-colors hover:bg-[#DC2626] dark:bg-[#1A3463] dark:hover:bg-[#DC2626]"
        >
          <CloseIcon sx={{ fontSize: 16, color: '#FFFFFF' }} />
        </button>

        <div className="mb-4 text-center">
          <div className="fare-icon-3d mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-[8px] bg-[#C99A2E] text-white">
            <Trophy3DIcon size={20} />
          </div>
          <h3 className="text-lg font-bold tracking-tight text-[#0B1D3A] dark:text-white sm:text-xl">
            {lang === 'en' ? 'Scale Your Sales Pipeline with FARE' : 'FARE తో మీ సేల్స్ పెంచుకోండి'}
          </h3>
          <p className="mt-1 text-[11px] text-[#64748B] dark:text-slate-400">
            {lang === 'en'
              ? 'Proven executive solutions to scale real estate project sales and hire high-converting teams.'
              : 'రియల్ ఎస్టేట్ ప్రాజెక్ట్ సేల్స్ పెంచడానికి మరియు సమర్థవంతమైన టీమ్‌ని నిర్మించడానికి పరిష్కారాలు.'}
          </p>
        </div>

        <div className="mb-6 space-y-2.5">
          {links.map((link, idx) => (
            <a
              key={idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block cursor-pointer rounded-[8px] border border-[#E2E8F0] bg-[#F8F9FC] p-3.5 transition-all hover:border-[#C99A2E]/60 hover:bg-white dark:border-white/10 dark:bg-[#071124]/60 dark:hover:border-[#C99A2E]/50 dark:hover:bg-[#15284B]"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className={`fare-icon-3d grid h-10 w-10 shrink-0 place-items-center rounded-[6px] text-white ${link.bg}`}>
                    {link.icon}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-sm font-bold text-[#0B1D3A] transition-colors group-hover:text-[#C99A2E] dark:text-white">
                        {link.title}
                      </h4>
                      <span className="rounded-[4px] bg-[#F0F4FF] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#0B1D3A] dark:bg-[#15284B] dark:text-[#E2C068]">
                        {link.badge}
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-[#64748B] dark:text-slate-400">{link.sub}</p>
                  </div>
                </div>
                <span className="fare-icon-3d grid h-7 w-7 shrink-0 place-items-center rounded-[6px] bg-[#0B1D3A] text-white transition-colors group-hover:bg-[#C99A2E] dark:bg-[#1A3463]">
                  <OpenInNewIcon sx={{ fontSize: 15, color: '#FFFFFF' }} />
                </span>
              </div>
            </a>
          ))}
        </div>

        <button
          onClick={onClose}
          className="fare-card-3d w-full cursor-pointer rounded-[8px] py-2.5 text-xs font-semibold text-[#475569] transition-colors hover:brightness-98 dark:text-slate-300"
        >
          {lang === 'en' ? 'Close Window' : 'మూసివేయండి'}
        </button>
      </div>
    </div>
  );
}
