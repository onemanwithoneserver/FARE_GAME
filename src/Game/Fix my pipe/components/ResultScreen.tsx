import React from 'react';
import RefreshIcon from '@mui/icons-material/Refresh';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import PhoneIcon from '@mui/icons-material/Phone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FareLogo from './FareLogo';
import FooterSection from './FooterSection';
import { Layers3DIcon, Star3DIcon, Users3DIcon } from './Icons3D';
import { Language, GameMode, CardItem } from '../types';
import { FARE_LINKS, translateText } from '../data';

interface ResultScreenProps {
  score: number;
  goodCount: number;
  totalDecisions: number;
  maxCombo: number;
  mode: GameMode;
  lang: Language;
  hiredTeam: CardItem[];
  onPlayAgain: () => void;
  onSwitchMode: () => void;
  onOpenCta: () => void;
  onHome: () => void;
}

export default function ResultScreen({
  score,
  goodCount,
  totalDecisions,
  maxCombo,
  mode,
  lang,
  hiredTeam,
  onPlayAgain,
  onSwitchMode,
  onHome,
}: ResultScreenProps) {
  const accuracy = totalDecisions > 0 ? Math.round((goodCount / totalDecisions) * 100) : 0;
  const stars = accuracy >= 80 ? 3 : accuracy >= 55 ? 2 : 1;
  const isPerson = mode === 1;
  const en = lang === 'en';

  const performanceTitle = {
    en: accuracy >= 80 ? 'Master Pipeline Executive' : accuracy >= 55 ? 'Competent Sales Leader' : 'Pipeline Needs Optimization',
    te: accuracy >= 80 ? 'అత్యుత్తమ సేల్స్ లీడర్!' : accuracy >= 55 ? 'మంచి నిర్ణయాలు తీసుకున్నారు' : 'ఇంకా మెరుగుపడాల్సిన అవసరం ఉంది',
  };

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
    <div className="mx-auto w-full max-w-xl p-2 sm:p-3">
      <div className="fare-card-3d relative max-h-[88vh] overflow-y-auto rounded-[12px] border border-[#DBE4FA] bg-white/95 p-3.5 sm:p-5 md:p-6 text-[#0B1D3A] shadow-2xl dark:border-white/10 dark:bg-[#071328]/95 dark:text-white">
        {/* Top Brand Stripe */}
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#0B1D3A] via-[#C99A2E] to-[#16A34A]" />

        {/* ── 1. ACADEMY BENCHMARK HEADER ── */}
        <div className="mb-3 text-center">
          <div className="mx-auto mb-1.5 flex justify-center">
            <FareLogo compact={true} />
          </div>

          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#C99A2E]/40 bg-[#C99A2E]/10 px-3 py-0.5 text-[8.5px] sm:text-[9.5px] font-black uppercase tracking-widest text-[#C99A2E]">
            <span>✦</span>
            <span>{en ? 'ACADEMY BENCHMARK COMPLETED' : 'అకాడమీ బెంచ్‌మార్క్ పూర్తయింది'}</span>
            <span>✦</span>
          </div>

          {/* Stars */}
          <div className="mt-2 mb-1 flex items-center justify-center gap-2">
            {[1, 2, 3].map((starIdx) => (
              <span
                key={starIdx}
                className={`fare-icon-3d grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-[8px] transition-all ${
                  starIdx <= stars
                    ? 'bg-[#C99A2E] text-white shadow-[0_3px_0_#8B6919]'
                    : 'bg-[#CBD5E1] text-white opacity-40 dark:bg-slate-800 dark:text-slate-600'
                }`}
              >
                <Star3DIcon size={22} />
              </span>
            ))}
          </div>

          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-[#0B1D3A] dark:text-white">
            {performanceTitle[lang]}
          </h2>
          <p className="mt-0.5 text-xs text-[#64748B] dark:text-slate-400">
            {en
              ? `You resolved ${goodCount} of ${totalDecisions} pipeline challenges with strategic decisions.`
              : `${totalDecisions} అవకాశాలలో ${goodCount} సరైన నిర్ణయాలు తీసుకున్నారు.`}
          </p>
        </div>

        {/* ── 2. METRICS GRID ── */}
        <div className="mb-3.5 grid grid-cols-3 gap-2 sm:gap-3">
          <div className="rounded-[8px] border border-[#E2E8F0] bg-[#F8F9FC] p-2.5 sm:p-3 text-center dark:border-white/10 dark:bg-[#0E1F3D]">
            <div className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#64748B] dark:text-slate-400">
              {en ? 'FINAL SCORE' : 'మొత్తం స్కోరు'}
            </div>
            <div className="font-mono text-xl sm:text-2xl font-black text-[#C99A2E]">{score.toLocaleString()}</div>
          </div>

          <div className="rounded-[8px] border border-[#E2E8F0] bg-[#F8F9FC] p-2.5 sm:p-3 text-center dark:border-white/10 dark:bg-[#0E1F3D]">
            <div className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#64748B] dark:text-slate-400">
              {en ? 'ACCURACY' : 'ఖచ్చితత్వం'}
            </div>
            <div className="font-mono text-xl sm:text-2xl font-black text-[#16A34A]">{accuracy}%</div>
          </div>

          <div className="rounded-[8px] border border-[#E2E8F0] bg-[#F8F9FC] p-2.5 sm:p-3 text-center dark:border-white/10 dark:bg-[#0E1F3D]">
            <div className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#64748B] dark:text-slate-400">
              {en ? 'MAX STREAK' : 'గరిష్ట స్ట్రీక్'}
            </div>
            <div className="font-mono text-xl sm:text-2xl font-black text-[#2563EB] dark:text-sky-400">{maxCombo}x</div>
          </div>
        </div>

        {/* ── 3. HIRED TEAM ROSTER / SOLUTIONS ── */}
        {hiredTeam.length > 0 && (
          <div className="mb-3.5 rounded-[8px] border border-[#E2E8F0] bg-[#F8F9FC] p-2.5 sm:p-3 dark:border-white/10 dark:bg-[#0E1F3D]">
            <h4 className="mb-2 flex items-center justify-between text-[9.5px] sm:text-[10px] font-bold uppercase tracking-[0.14em] text-[#64748B] dark:text-slate-400">
              <span>{isPerson ? (en ? 'Hired Team Roster' : 'హైర్ చేసిన టీమ్') : en ? 'Implemented Solutions' : 'అమలు చేసిన సిస్టమ్స్'}</span>
              <span className="text-[#C99A2E]">
                {hiredTeam.length} {en ? 'Assets' : 'అసెట్లు'}
              </span>
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {hiredTeam.map((h, i) => (
                <div
                  key={i}
                  className="inline-flex items-center gap-1 rounded-[4px] border border-[#E2E8F0] bg-white px-2 py-0.5 text-[10.5px] sm:text-xs font-medium text-[#0B1D3A] dark:border-white/10 dark:bg-[#15284B] dark:text-slate-200"
                >
                  <span>{h.emoji}</span>
                  <span>{translateText(h.name, lang)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── 4. MODE SWITCH ACTION ── */}
        <div className="mb-3.5">
          <button
            type="button"
            onClick={onSwitchMode}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-[8px] bg-gradient-to-r from-[#1E3A8A] to-[#0B1D3A] px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-bold text-white shadow-[0_3px_0_#071429] transition hover:brightness-110 active:scale-[0.99]"
          >
            <Layers3DIcon size={18} />
            <span>
              {isPerson
                ? en ? 'Switch to Mode 2: Fix The Process' : 'మోడ్ 2: ప్రాసెస్ ఫిక్స్ చేయండి'
                : en ? 'Switch to Mode 1: Hire The Right Person' : 'మోడ్ 1: సరైన వ్యక్తిని హైర్ చేయండి'}
            </span>
          </button>
        </div>

        {/* ── 5. TEAM BUILDING SECTION ("THE ABOVE CARD") ── */}
        <div className="border-t border-[#E2E8F0] dark:border-white/10 pt-3 mb-3.5">
          <div className="mb-3 text-center">
            <h3 className="text-lg sm:text-xl font-black tracking-tight text-[#0B1D3A] dark:text-white">
              {en ? (
                <>
                  Want to <span className="text-[#C99A2E] dark:text-[#E2C068]">build your team?</span>
                </>
              ) : (
                <>
                  మీ టీమ్‌ను <span className="text-[#C99A2E] dark:text-[#E2C068]">నిర్మించాలనుకుంటున్నారా?</span>
                </>
              )}
            </h3>
            <p className="mt-0.5 text-[11.5px] sm:text-xs font-semibold text-[#64748B] dark:text-slate-300">
              {en ? 'Right profiles, right skills, dedicated support' : 'సరైన profiles, సరైన skills, సరైన support'}
            </p>
          </div>

          {/* 4 Action Cards from Screenshot */}
          <div className="space-y-2 mb-3">
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
        </div>

        {/* ── 6. NAVIGATION & SHARING BUTTONS ── */}
        <div className="mb-2.5 space-y-2">
          <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
            <button
              type="button"
              onClick={onPlayAgain}
              className="group flex cursor-pointer items-center justify-center gap-1.5 rounded-[8px] bg-gradient-to-r from-[#C99A2E] to-[#B48327] px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-bold text-white shadow-[0_3px_0_#8B6919] transition hover:brightness-110 active:scale-95"
            >
              <RefreshIcon sx={{ fontSize: { xs: 15, sm: 17 } }} />
              <span>{en ? 'Play Again' : 'మళ్లీ ఆడండి'}</span>
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

        {/* ── 7. FOOTER SOCIAL & CONTACT DOCK (REPLACED WITH IMAGE 2) ── */}
        <div className="border-t border-[#E2E8F0] dark:border-white/10 pt-2 text-center">
          <FooterSection compact={true} />
        </div>
      </div>
    </div>
  );
}
