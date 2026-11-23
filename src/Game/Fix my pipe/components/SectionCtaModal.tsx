import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import HomeIcon from '@mui/icons-material/Home';
import CloseIcon from '@mui/icons-material/Close';
import SchoolIcon from '@mui/icons-material/School';
import PhoneIcon from '@mui/icons-material/Phone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FareLogo from './FareLogo';
import FooterSection from './FooterSection';
import { Users3DIcon } from './Icons3D';
import { Language } from '../types';
import { FARE_LINKS } from '../data';

interface SectionCtaModalProps {
  isOpen: boolean;
  caseIndex: number;
  totalCases: number;
  lang: Language;
  onNext: () => void;
  onHome: () => void;
  onClose: () => void;
}

export default function SectionCtaModal({
  isOpen,
  caseIndex,
  totalCases,
  lang,
  onNext,
  onHome,
  onClose,
}: SectionCtaModalProps) {
  const en = lang === 'en';
  const isLast = caseIndex + 1 >= totalCases;

  if (!isOpen) return null;

  const actionCards = [
    {
      title: en ? 'Hire trained profiles' : 'శిక్షణ పొందిన ప్రొఫైల్స్ ని హైర్ చేయండి',
      sub: en ? 'FARE Talent Pool · Zero commission' : 'FARE టాలెంట్ పూల్ · జీరో కమీషన్',
      badge: '',
      icon: <Users3DIcon size={18} />,
      iconBg: 'bg-gradient-to-br from-amber-500 to-amber-600',
      btnText: en ? 'Hire now' : 'హైర్ చేయండి',
      btnBg: 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-sm',
      url: 'https://wa.me/917674993040?text=Hi%20FARE%2C%20I%20want%20to%20hire%20trained%20real%20estate%20profiles',
    },
    {
      title: en ? 'Learn Team Building skills' : 'టీమ్ బిల్డింగ్ స్కిల్స్ నేర్చుకోండి',
      sub: en ? 'Open Plot Team Building course' : 'ఓపెన్ ప్లాట్ టీమ్ బిల్డింగ్ కోర్సు',
      badge: 'FREE',
      icon: <SchoolIcon sx={{ fontSize: 18, color: '#FFFFFF' }} />,
      iconBg: 'bg-gradient-to-br from-sky-500 to-cyan-600',
      btnText: en ? 'Start free' : 'ఉచితంగా ప్రారంభించండి',
      btnBg: 'bg-gradient-to-r from-sky-500 to-cyan-600 hover:from-sky-600 hover:to-cyan-700 text-white shadow-sm',
      url: FARE_LINKS.course || 'https://www.fare.training',
    },
    {
      title: en ? 'Talk your training need with FARE' : 'మీ ట్రైనింగ్ అవసరాలను FARE తో మాట్లాడండి',
      sub: en ? '1:1 session with a FARE expert' : 'FARE నిపుణులతో 1:1 సెషన్',
      badge: 'FREE',
      icon: <PhoneIcon sx={{ fontSize: 17, color: '#FFFFFF' }} />,
      iconBg: 'bg-gradient-to-br from-indigo-500 to-purple-600',
      btnText: en ? 'Book session' : 'సెషన్ బుక్ చేయండి',
      btnBg: 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-sm',
      url: FARE_LINKS.session || 'https://wa.me/917674993040?text=Hi%20FARE%2C%20I%20would%20like%20a%20FREE%20session%20to%20discuss%20my%20team%20training%20needs',
    },
    {
      title: en ? 'Join WhatsApp community' : 'వాట్సాప్ కమ్యూనిటీలో చేరండి',
      sub: en ? 'Weekly team building tips' : 'వీక్లీ టీమ్ బిల్డింగ్ టిప్స్',
      badge: 'FREE',
      icon: <WhatsAppIcon sx={{ fontSize: 18, color: '#FFFFFF' }} />,
      iconBg: 'bg-gradient-to-br from-emerald-500 to-green-600',
      btnText: en ? 'Join' : 'చేరండి',
      btnBg: 'bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-sm',
      url: FARE_LINKS.whatsapp || 'https://wa.me/917674993040?text=Hi%20FARE%2C%20please%20add%20me%20to%20the%20team%20building%20tips%20WhatsApp%20community',
    },
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#071328]/75 p-2 sm:p-4 backdrop-blur-md"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 8 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="fare-card-3d relative w-full max-w-[480px] max-h-[92vh] overflow-y-auto rounded-[12px] border border-[#DBE4FA] bg-white/98 p-3.5 sm:p-5 text-[#0B1D3A] shadow-2xl dark:border-white/10 dark:bg-[#071328]/98 dark:text-white"
        >
          {/* Top Brand Stripe */}
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#0B1D3A] via-[#C99A2E] to-[#16A34A]" />

          {/* Top Close Button ('✕') */}
          <button
            type="button"
            onClick={onClose}
            aria-label={en ? 'Close' : 'మూసివేయండి'}
            className="fare-icon-3d absolute right-3 top-3 sm:right-3.5 sm:top-3.5 z-10 grid h-7 w-7 cursor-pointer place-items-center rounded-[6px] bg-[#0B1D3A] text-white transition hover:bg-[#DC2626] dark:bg-[#1A3463] dark:hover:bg-[#DC2626]"
          >
            <CloseIcon sx={{ fontSize: 16, color: '#FFFFFF' }} />
          </button>

          {/* Micro Section Counter Pill */}
          <div className="mb-2 flex items-center justify-center gap-1.5 text-[9.5px] sm:text-[10.5px] font-bold">
            <span className="rounded-[4px] border border-[#C99A2E]/40 bg-[#C99A2E]/10 px-2.5 py-0.5 uppercase tracking-wider text-[#C99A2E]">
              {en ? `Section ${caseIndex + 1} of ${totalCases} Complete` : `విభాగం ${caseIndex + 1} / ${totalCases} పూర్తయింది`}
            </span>
          </div>

          {/* Centered FARE Logo Card */}
          <div className="mx-auto mb-2 flex justify-center">
            <FareLogo compact={true} />
          </div>

          {/* Title & Subtitle from Screenshot */}
          <div className="mb-3 text-center">
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-[#0B1D3A] dark:text-white">
              {en ? (
                <>
                  Want to <span className="text-[#C99A2E] dark:text-[#E2C068]">build your team?</span>
                </>
              ) : (
                <>
                  మీ టీమ్‌ను <span className="text-[#C99A2E] dark:text-[#E2C068]">నిర్మించాలనుకుంటున్నారా?</span>
                </>
              )}
            </h2>
            <p className="mt-0.5 text-xs sm:text-[12.5px] font-semibold text-[#64748B] dark:text-slate-300">
              {en ? 'Right profiles, right skills, dedicated support' : 'సరైన profiles, సరైన skills, సరైన support'}
            </p>
          </div>

          {/* 4 Action Cards from Screenshot */}
          <div className="mb-3 space-y-2">
            {actionCards.map((card, i) => (
              <div
                key={i}
                className="flex items-center justify-between gap-2 rounded-[8px] border border-[#E2E8F0] bg-[#F8F9FC] p-2.5 shadow-xs transition-all hover:border-[#C99A2E]/50 dark:border-white/10 dark:bg-[#0E1F3D]"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className={`grid h-8 w-8 sm:h-9 sm:w-9 shrink-0 place-items-center rounded-[6px] text-white shadow-xs ${card.iconBg}`}>
                    {card.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h4 className="text-[12px] sm:text-[13px] font-bold text-[#0B1D3A] dark:text-white leading-tight">
                        {card.title}
                      </h4>
                      {card.badge && (
                        <span className="rounded bg-emerald-500/20 px-1 py-0.2 text-[8px] sm:text-[8.5px] font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                          {card.badge}
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 truncate text-[10px] sm:text-[11px] text-[#64748B] dark:text-slate-400">
                      {card.sub}
                    </p>
                  </div>
                </div>

                <a
                  href={card.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`shrink-0 cursor-pointer rounded-[6px] px-3 py-1.5 text-[10.5px] sm:text-[11px] font-bold text-white transition-all hover:brightness-110 active:scale-95 ${card.btnBg}`}
                >
                  {card.btnText}
                </a>
              </div>
            ))}
          </div>

          {/* Navigation Action Buttons from Screenshot */}
          <div className="mb-2 space-y-2">
            <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
              <button
                type="button"
                onClick={onNext}
                className="group flex cursor-pointer items-center justify-center gap-1.5 rounded-[8px] bg-gradient-to-r from-[#C99A2E] to-[#B48327] px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-bold text-white shadow-[0_3px_0_#8B6919] transition hover:brightness-110 active:scale-95"
              >
                <span>
                  {isLast
                    ? en ? 'See Result' : 'రిజల్ట్ చూడండి'
                    : en ? 'Next problem' : 'తరువాతి సమస్య'}
                </span>
                <ArrowForwardIcon sx={{ fontSize: { xs: 14, sm: 16 } }} />
              </button>

              <button
                type="button"
                onClick={onHome}
                className="flex cursor-pointer items-center justify-center gap-1.5 rounded-[8px] border border-[#1E3A8A] bg-gradient-to-r from-[#0B1D3A] via-[#142A54] to-[#1E3A8A] px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-bold text-white shadow-[0_3px_0_#071429] transition hover:brightness-110 active:scale-95"
              >
                <HomeIcon sx={{ fontSize: { xs: 15, sm: 17 } }} />
                <span>{en ? 'Home' : 'హోమ్'}</span>
              </button>
            </div>
          </div>

          {/* ── FOOTER SOCIAL & CONTACT DOCK (FROM IMAGE 2) ── */}
          <div className="border-t border-[#E2E8F0] dark:border-white/10 pt-2 text-center">
            <FooterSection compact={true} />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
