import { ReactNode, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import gsap from 'gsap';
import { TlCharacter } from './CharacterAvatars';

interface AdvisorProps {
  name: string;
  role: string;
  message: ReactNode;
  messageKey: string | number;
  tone?: 'neutral' | 'good' | 'bad';
  customCharacter?: ReactNode;
  compact?: boolean;
}

const TONE_ACCENT = {
  neutral: 'border-[#E2E8F0] dark:border-white/10',
  good: 'border-emerald-500/50',
  bad: 'border-rose-500/50',
};

const TONE_BAR = {
  neutral: 'bg-[#C99A2E]',
  good: 'bg-[#16A34A]',
  bad: 'bg-[#DC2626]',
};

function ExecutiveCoachSvg({
  tone,
  reactionKey,
  hovered,
}: {
  tone: 'neutral' | 'good' | 'bad';
  reactionKey: string | number;
  hovered: boolean;
}) {
  const rootRef = useRef<SVGSVGElement>(null);
  const torsoRef = useRef<SVGGElement>(null);
  const headRef = useRef<SVGGElement>(null);
  const pointArmRef = useRef<SVGGElement>(null);
  const tabletArmRef = useRef<SVGGElement>(null);
  const leftEyeRef = useRef<SVGEllipseElement>(null);
  const rightEyeRef = useRef<SVGEllipseElement>(null);
  const shadowRef = useRef<SVGEllipseElement>(null);
  const barsRef = useRef<SVGGElement>(null);

  // Continuous lifelike idle breathing, arm gesture, tablet bars, and natural blinking
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (torsoRef.current) {
        gsap.to(torsoRef.current, {
          y: -1.8,
          duration: 1.9,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      if (headRef.current) {
        gsap.to(headRef.current, {
          y: -2.2,
          rotation: 1.4,
          transformOrigin: '80px 64px',
          duration: 2.3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      if (pointArmRef.current) {
        gsap.to(pointArmRef.current, {
          rotation: -4.5,
          transformOrigin: '104px 86px',
          duration: 1.8,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      if (tabletArmRef.current) {
        gsap.to(tabletArmRef.current, {
          rotation: 1.8,
          transformOrigin: '54px 86px',
          duration: 2.4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      if (shadowRef.current) {
        gsap.to(shadowRef.current, {
          scaleX: 0.96,
          opacity: 0.85,
          transformOrigin: '80px 206px',
          duration: 1.9,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      if (leftEyeRef.current && rightEyeRef.current) {
        const blinkTl = gsap.timeline({ repeat: -1, repeatDelay: 3.4 });
        blinkTl
          .to([leftEyeRef.current, rightEyeRef.current], {
            scaleY: 0.08,
            transformOrigin: 'center center',
            duration: 0.07,
            ease: 'power2.in',
          })
          .to([leftEyeRef.current, rightEyeRef.current], {
            scaleY: 1,
            duration: 0.1,
            ease: 'power2.out',
          });
      }

      if (barsRef.current) {
        const rects = barsRef.current.querySelectorAll('rect');
        rects.forEach((r, idx) => {
          gsap.to(r, {
            scaleY: 0.45 + idx * 0.15,
            transformOrigin: 'bottom center',
            duration: 0.9 + idx * 0.25,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  // Reaction choreography whenever tone or messageKey changes
  useEffect(() => {
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      if (tone === 'good') {
        if (torsoRef.current) {
          gsap.fromTo(
            torsoRef.current,
            { y: 0 },
            { y: -6, duration: 0.18, yoyo: true, repeat: 1, ease: 'power2.out' }
          );
        }
        if (headRef.current) {
          gsap.fromTo(
            headRef.current,
            { rotation: 0 },
            { rotation: 6, duration: 0.16, yoyo: true, repeat: 1, transformOrigin: '80px 64px', ease: 'power2.out' }
          );
        }
        if (pointArmRef.current) {
          gsap.fromTo(
            pointArmRef.current,
            { rotation: 0 },
            { rotation: -14, duration: 0.22, yoyo: true, repeat: 1, transformOrigin: '104px 86px', ease: 'back.out(2)' }
          );
        }
      } else if (tone === 'bad') {
        if (headRef.current) {
          gsap.fromTo(
            headRef.current,
            { x: 0 },
            {
              keyframes: [{ x: -3 }, { x: 3 }, { x: -2 }, { x: 0 }],
              duration: 0.36,
              ease: 'power1.inOut',
            }
          );
        }
      } else if (pointArmRef.current) {
        gsap.fromTo(
          pointArmRef.current,
          { rotation: 5 },
          { rotation: -6, duration: 0.35, yoyo: true, repeat: 1, transformOrigin: '104px 86px', ease: 'power2.out' }
        );
      }
    }, rootRef);
    return () => ctx.revert();
  }, [tone, reactionKey]);

  // Hover gesture
  useEffect(() => {
    if (!pointArmRef.current || !headRef.current) return;
    gsap.to(pointArmRef.current, {
      rotation: hovered ? -12 : 0,
      duration: 0.28,
      transformOrigin: '104px 86px',
      ease: 'power2.out',
    });
    gsap.to(headRef.current, {
      rotation: hovered ? -3 : 0,
      duration: 0.28,
      transformOrigin: '80px 64px',
      ease: 'power2.out',
    });
  }, [hovered]);

  const tabletAccent = tone === 'good' ? '#16A34A' : tone === 'bad' ? '#DC2626' : '#C99A2E';
  const browOffset = tone === 'good' ? -2 : tone === 'bad' ? 1.5 : 0;

  return (
    <svg ref={rootRef} viewBox="0 0 175 215" className="h-full w-full overflow-visible" aria-hidden>
      <defs>
        <linearGradient id="suitGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1A3463" />
          <stop offset="55%" stopColor="#0B1D3A" />
          <stop offset="100%" stopColor="#071124" />
        </linearGradient>
        <linearGradient id="lapelGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#23437D" />
          <stop offset="100%" stopColor="#10254D" />
        </linearGradient>
        <linearGradient id="tieGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E2C068" />
          <stop offset="100%" stopColor="#A17218" />
        </linearGradient>
        <linearGradient id="skinGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FAD5B8" />
          <stop offset="100%" stopColor="#E6B28E" />
        </linearGradient>
        <linearGradient id="hairGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3B281E" />
          <stop offset="100%" stopColor="#1E130E" />
        </linearGradient>
        <linearGradient id="trouserGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0D1E3D" />
          <stop offset="100%" stopColor="#060F22" />
        </linearGradient>
      </defs>

      {/* Soft ground shadow */}
      <ellipse ref={shadowRef} cx="80" cy="206" rx="44" ry="7" fill="#0B1D3A" opacity="0.22" />

      {/* Tailored Trousers & Leather Shoes */}
      <g>
        <path d="M59 144 L56 196 L71 196 L74 148 Z" fill="url(#trouserGrad)" />
        <path d="M84 148 L87 196 L102 196 L99 144 Z" fill="url(#trouserGrad)" />
        {/* Crisp trouser center crease */}
        <line x1="63.5" y1="150" x2="62.5" y2="195" stroke="#25447B" strokeWidth="1" opacity="0.45" />
        <line x1="94.5" y1="150" x2="95.5" y2="195" stroke="#25447B" strokeWidth="1" opacity="0.45" />
        {/* Oxford Shoes */}
        <path d="M51 196 Q51 191 63 191 Q73 191 73 198 L51 200 Z" fill="#2A1810" />
        <path d="M85 198 Q85 191 95 191 Q107 191 107 196 L107 200 Z" fill="#2A1810" />
        <rect x="51" y="199" width="22" height="3" rx="1.5" fill="#120A06" />
        <rect x="85" y="199" width="22" height="3" rx="1.5" fill="#120A06" />
      </g>

      {/* Upper Body Group (breathing) */}
      <g ref={torsoRef}>
        {/* Back pointing arm (articulated shoulder + forearm + pointing finger) */}
        <g ref={pointArmRef}>
          <path
            d="M104 82 Q122 72 138 52"
            stroke="url(#suitGrad)"
            strokeWidth="15"
            strokeLinecap="round"
            fill="none"
          />
          {/* White shirt cuff */}
          <path d="M133 57 L139 50" stroke="#F8FAFC" strokeWidth="10" strokeLinecap="round" />
          {/* Hand & pointing finger */}
          <circle cx="141" cy="48" r="6.5" fill="url(#skinGrad)" />
          <path d="M142 44 L151 32" stroke="url(#skinGrad)" strokeWidth="4.2" strokeLinecap="round" />
          {/* Subtle pointer cue ring on good/neutral */}
          {tone !== 'bad' && (
            <circle cx="153" cy="29" r="3" fill={tone === 'good' ? '#16A34A' : '#C99A2E'} opacity="0.85" />
          )}
        </g>

        {/* Tailored Suit Jacket */}
        <path d="M50 78 Q80 68 110 78 L113 148 Q80 152 47 148 Z" fill="url(#suitGrad)" />
        {/* White dress shirt V */}
        <polygon points="69,73 91,73 80,115" fill="#F8FAFC" />
        {/* Shirt collar */}
        <polygon points="69,73 79,78 73,83" fill="#E2E8F0" />
        <polygon points="91,73 81,78 87,83" fill="#E2E8F0" />
        {/* Gold Silk Tie */}
        <polygon points="77,77 83,77 82,84 78,84" fill="#B48327" />
        <polygon points="78,84 82,84 84,108 80,116 76,108" fill="url(#tieGrad)" />
        {/* Suit Lapels */}
        <path d="M69 73 L80 116 L58 92 L62 76 Z" fill="url(#lapelGrad)" />
        <path d="M91 73 L80 116 L102 92 L98 76 Z" fill="url(#lapelGrad)" />
        {/* FARE Gold Pocket Square */}
        <polygon points="92,99 101,96 102,102 92,102" fill="#E2C068" />
        <line x1="91" y1="102" x2="103" y2="102" stroke="#1E3A6B" strokeWidth="1.5" />
        {/* Jacket Buttons */}
        <circle cx="80" cy="123" r="2.2" fill="#060F22" stroke="#25447B" strokeWidth="0.7" />
        <circle cx="80" cy="134" r="2.2" fill="#060F22" stroke="#25447B" strokeWidth="0.7" />

        {/* Left Arm holding interactive Sales Dashboard Tablet */}
        <g ref={tabletArmRef}>
          <path d="M54 82 Q40 100 42 122" stroke="url(#suitGrad)" strokeWidth="14" strokeLinecap="round" fill="none" />
          <path d="M41 118 L43 125" stroke="#F8FAFC" strokeWidth="9.5" strokeLinecap="round" />

          {/* Tablet Chassis */}
          <g transform="translate(14, 102) rotate(-9)">
            <rect x="0" y="0" width="40" height="30" rx="4" fill="#0F172A" stroke="#64748B" strokeWidth="1.4" />
            <rect x="3" y="3" width="34" height="24" rx="2" fill="#1E293B" />
            {/* Status header bar */}
            <rect x="6" y="6" width="18" height="2.5" rx="1" fill={tabletAccent} />
            <circle cx="31" cy="7.2" r="1.5" fill={tabletAccent} />
            {/* Animated funnel metric bars */}
            <g ref={barsRef}>
              <rect x="7" y="15" width="4" height="9" rx="1" fill="#2563EB" />
              <rect x="13.5" y="12" width="4" height="12" rx="1" fill="#0F766E" />
              <rect x="20" y="14" width="4" height="10" rx="1" fill="#C99A2E" />
              <rect x="26.5" y="10" width="4" height="14" rx="1" fill={tabletAccent} />
            </g>
          </g>
          {/* Thumb & fingers gripping tablet */}
          <circle cx="44" cy="124" r="5.5" fill="url(#skinGrad)" />
        </g>

        {/* Neck & Head Group */}
        <g ref={headRef}>
          {/* Neck */}
          <rect x="73" y="56" width="14" height="19" rx="5" fill="#DFAA86" />
          <path d="M73 63 Q80 68 87 63 L87 58 L73 58 Z" fill="#C88E68" opacity="0.45" />

          {/* Ears */}
          <ellipse cx="58" cy="43" rx="4.2" ry="6.2" fill="#E6B28E" />
          <ellipse cx="102" cy="43" rx="4.2" ry="6.2" fill="#E6B28E" />

          {/* Face */}
          <rect x="60" y="20" width="40" height="44" rx="18" fill="url(#skinGrad)" />
          {/* Subtle warm cheek shading */}
          <ellipse cx="67" cy="47" rx="4" ry="2.2" fill="#E58B73" opacity="0.28" />
          <ellipse cx="93" cy="47" rx="4" ry="2.2" fill="#E58B73" opacity="0.28" />

          {/* Tailored Modern Hair */}
          <path
            d="M59 38 Q58 14 81 13 Q103 14 101 38 Q97 27 89 26 Q75 24 66 29 Q61 32 59 38 Z"
            fill="url(#hairGrad)"
          />
          <path d="M69 20 Q82 16 93 22" stroke="#5B3F31" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6" />

          {/* Expressive Eyebrows */}
          <path
            d={`M66 ${34 + browOffset} Q71 ${tone === 'bad' ? 36 : 32 + browOffset} 76 ${34 + browOffset}`}
            stroke="#2B1B12"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d={`M84 ${34 + browOffset} Q89 ${tone === 'bad' ? 36 : 32 + browOffset} 94 ${34 + browOffset}`}
            stroke="#2B1B12"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />

          {/* Eyes (blink animated) */}
          <ellipse ref={leftEyeRef} cx="71" cy="41" rx="2.7" ry="3.1" fill="#0B1D3A" />
          <ellipse ref={rightEyeRef} cx="89" cy="41" rx="2.7" ry="3.1" fill="#0B1D3A" />
          <circle cx="72" cy="39.8" r="0.9" fill="#FFFFFF" />
          <circle cx="90" cy="39.8" r="0.9" fill="#FFFFFF" />

          {/* Nose */}
          <path d="M80 41 L78.5 47.5 Q80 49 82 47.5" stroke="#C88E68" strokeWidth="1.5" fill="none" strokeLinecap="round" />

          {/* Mouth reacting to tone */}
          {tone === 'good' ? (
            <path d="M72 52 Q80 59 88 52 Z" fill="#FFFFFF" stroke="#9A3412" strokeWidth="1.5" strokeLinejoin="round" />
          ) : tone === 'bad' ? (
            <path d="M74 55 Q80 51 86 55" stroke="#9A3412" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          ) : (
            <path d="M73 52.5 Q80 57 87 52.5" stroke="#9A3412" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          )}
        </g>
      </g>

      {/* Celebratory floating sparks on positive decision */}
      {tone === 'good' && (
        <g key={String(reactionKey)}>
          <motion.circle
            cx="148"
            cy="24"
            r="3.2"
            fill="#16A34A"
            initial={{ opacity: 0, y: 8, scale: 0.4 }}
            animate={{ opacity: [0, 1, 0], y: -16, scale: [0.6, 1.1, 0.7] }}
            transition={{ duration: 0.85, ease: 'easeOut' }}
          />
          <motion.circle
            cx="160"
            cy="34"
            r="2.6"
            fill="#C99A2E"
            initial={{ opacity: 0, y: 8, scale: 0.4 }}
            animate={{ opacity: [0, 1, 0], y: -14, scale: [0.6, 1, 0.7] }}
            transition={{ duration: 0.85, delay: 0.1, ease: 'easeOut' }}
          />
        </g>
      )}
    </svg>
  );
}

export default function Advisor({ name, role, message, messageKey, tone = 'neutral', customCharacter, compact = false }: AdvisorProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`flex w-full ${compact ? 'max-w-[200px] sm:max-w-[230px]' : 'max-w-[295px]'} flex-col items-start`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={messageKey}
          initial={{ opacity: 0, y: 8, scale: 0.97 }}
          animate={{ opacity: 1, y: hovered ? -2 : 0, scale: 1 }}
          exit={{ opacity: 0, y: -5, scale: 0.98 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className={`relative ${compact ? 'ml-2 sm:ml-3 p-2 sm:p-2.5 pl-2.5 sm:pl-3 text-[10px] sm:text-xs leading-snug rounded-[8px]' : 'ml-4 sm:ml-6 p-3 sm:p-3.5 pl-3.5 sm:pl-4 text-xs sm:text-sm leading-snug rounded-[10px]'} overflow-hidden border bg-white text-[#0B1D3A] shadow-[0_8px_24px_rgba(11,29,58,0.08)] dark:bg-[#0D1B35] dark:text-slate-100 dark:shadow-[0_10px_28px_rgba(0,0,0,0.4)] ${TONE_ACCENT[tone]}`}
        >
          <span className={`absolute inset-y-0 left-0 w-1 ${TONE_BAR[tone]}`} />
          <div className="mb-1 flex items-center justify-between gap-1.5">
            <div className={`${compact ? 'text-[9px]' : 'text-[10px]'} font-bold uppercase tracking-[0.14em] text-[#C99A2E]`}>
              {name} · <span className="text-[#64748B] dark:text-slate-400">{role}</span>
            </div>
            {/* Live speaking equalizer bars */}
            <div className="flex h-2.5 items-end gap-0.5" aria-hidden>
              {[0, 1, 2].map((b) => (
                <motion.span
                  key={b}
                  className={`w-0.5 rounded-full ${TONE_BAR[tone]}`}
                  animate={{ height: ['35%', '100%', '45%'] }}
                  transition={{
                    duration: 0.65,
                    delay: b * 0.14,
                    repeat: Infinity,
                    repeatType: 'mirror',
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </div>
          </div>
          <div>{message}</div>
        </motion.div>
      </AnimatePresence>

      {/* Pointer stem connecting speech card to coach */}
      <div className={`${compact ? 'ml-6 sm:ml-8 h-1.5 w-2.5' : 'ml-10 sm:ml-14 h-2 w-3.5'} overflow-hidden`}>
        <div
          className={`mx-auto h-2.5 w-2.5 -translate-y-1.5 rotate-45 border-b border-r bg-white dark:bg-[#0D1B35] ${TONE_ACCENT[tone]}`}
        />
      </div>

      <motion.div
        className="relative -mt-1 cursor-pointer"
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        {customCharacter ?? (
          <TlCharacter
            name={name}
            role={role}
            tone={tone}
            reactionKey={messageKey}
            compact={compact}
          />
        )}
      </motion.div>
    </div>
  );
}
