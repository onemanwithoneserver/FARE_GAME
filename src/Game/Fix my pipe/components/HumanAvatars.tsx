import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

interface AvatarProps {
  name?: string;
  role?: string;
  badgeEmoji?: string;
  isPerson?: boolean;
  itemKey?: string | number;
}

/**
 * 1. High-fidelity FARE Coach SVG Avatar.
 * Mature executive mentor, dark espresso styled hair, gold-rimmed executive spectacles,
 * tailored midnight navy suit & FARE Gold silk tie.
 */
export function CoachHumanAvatar({ name }: { name?: string }) {
  const rootRef = useRef<SVGSVGElement>(null);
  const headRef = useRef<SVGGElement>(null);
  const leftEyeRef = useRef<SVGEllipseElement>(null);
  const rightEyeRef = useRef<SVGEllipseElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headRef.current) {
        gsap.to(headRef.current, {
          y: -1.6,
          rotation: 0.8,
          transformOrigin: '50px 48px',
          duration: 2.3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }
      if (leftEyeRef.current && rightEyeRef.current) {
        const blinkTl = gsap.timeline({ repeat: -1, repeatDelay: 3.6 });
        blinkTl
          .to([leftEyeRef.current, rightEyeRef.current], {
            scaleY: 0.1,
            transformOrigin: 'center center',
            duration: 0.08,
            ease: 'power2.in',
          })
          .to([leftEyeRef.current, rightEyeRef.current], {
            scaleY: 1,
            duration: 0.1,
            ease: 'power2.out',
          });
      }
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-20 w-20 sm:h-24 sm:w-24">
        <div className="absolute inset-x-2 bottom-0 h-4 rounded-full bg-[#EAB308]/25 blur-sm" />

        <svg
          ref={rootRef}
          viewBox="0 0 100 110"
          className="relative z-10 h-full w-full overflow-visible drop-shadow-[0_4px_10px_rgba(0,0,0,0.35)]"
        >
          <defs>
            <linearGradient id="coachDarkHair" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4A2818" />
              <stop offset="60%" stopColor="#2E170C" />
              <stop offset="100%" stopColor="#150A05" />
            </linearGradient>
            <linearGradient id="coachSkinTone" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FDE6D2" />
              <stop offset="100%" stopColor="#E2A782" />
            </linearGradient>
            <linearGradient id="coachNavySuit" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#152B52" />
              <stop offset="50%" stopColor="#0B1D3A" />
              <stop offset="100%" stopColor="#061122" />
            </linearGradient>
            <linearGradient id="coachGoldTie" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#B45309" />
            </linearGradient>
          </defs>

          {/* Shoulders & Midnight Suit */}
          <path d="M12 104 C12 80 28 72 50 72 C72 72 88 80 88 104 Z" fill="url(#coachNavySuit)" />
          <polygon points="42,72 58,72 50,96" fill="#FFFFFF" />
          <polygon points="48,74 52,74 54,92 50,96 46,92" fill="url(#coachGoldTie)" />
          <path d="M42 72 L50 96 L32 84 L36 74 Z" fill="#0B1D3A" />
          <path d="M58 72 L50 96 L68 84 L64 74 Z" fill="#0B1D3A" />
          {/* Gold Pin */}
          <circle cx="34" cy="80" r="1.5" fill="#F59E0B" />

          {/* Head & Neck */}
          <g ref={headRef}>
            <rect x="44" y="60" width="12" height="15" rx="4" fill="#E2A782" />
            <circle cx="30" cy="46" r="4.5" fill="#E2A782" />
            <circle cx="70" cy="46" r="4.5" fill="#E2A782" />
            <rect x="32" y="24" width="36" height="42" rx="16" fill="url(#coachSkinTone)" />
            <ellipse cx="38" cy="50" rx="3.5" ry="2" fill="#FB7185" opacity="0.3" />
            <ellipse cx="62" cy="50" rx="3.5" ry="2" fill="#FB7185" opacity="0.3" />

            {/* Dark Styled Side-Part Hair */}
            <path
              d="M30 36 C28 14 42 10 50 10 C62 10 72 14 70 36 C66 26 58 20 50 20 C40 20 34 26 30 36 Z"
              fill="url(#coachDarkHair)"
            />
            <path d="M38 18 C44 14 54 14 62 18" stroke="#78350F" strokeWidth="2" strokeLinecap="round" fill="none" />
            <circle cx="34" cy="24" r="3" fill="url(#coachDarkHair)" />
            <circle cx="66" cy="24" r="3" fill="url(#coachDarkHair)" />

            {/* Eyebrows */}
            <path d="M37 36 Q42 34 46 36" stroke="#29140B" strokeWidth="1.8" strokeLinecap="round" fill="none" />
            <path d="M54 36 Q58 34 63 36" stroke="#29140B" strokeWidth="1.8" strokeLinecap="round" fill="none" />

            {/* Gold-Rimmed Executive Spectacles */}
            <g stroke="#D97706" strokeWidth="1.3" fill="none">
              <rect x="35" y="36" width="11" height="9" rx="2" />
              <rect x="54" y="36" width="11" height="9" rx="2" />
              <line x1="46" y1="40" x2="54" y2="40" strokeWidth="1.5" />
            </g>

            {/* Warm Brown Eyes behind spectacles */}
            <ellipse ref={leftEyeRef} cx="41" cy="40.5" rx="2.2" ry="2.6" fill="#2E150B" />
            <ellipse ref={rightEyeRef} cx="59.5" cy="40.5" rx="2.2" ry="2.6" fill="#2E150B" />
            <circle cx="42" cy="39.5" r="0.8" fill="#FFFFFF" />
            <circle cx="60.5" cy="39.5" r="0.8" fill="#FFFFFF" />

            {/* Nose */}
            <path d="M50 43 L48.5 49 Q50 50 51.5 49" stroke="#C2410C" strokeWidth="1.2" strokeLinecap="round" fill="none" />

            {/* Wise Smile */}
            <path d="M44 54 Q50 60 56 54" stroke="#78350F" strokeWidth="1.8" strokeLinecap="round" fill="none" />
            <path d="M45 54 Q50 58 55 54 Z" fill="#FFFFFF" opacity="0.85" />
          </g>
        </svg>
      </div>

      <span className="mt-1 whitespace-nowrap rounded-full border border-[#C99A2E]/70 bg-[#0B1D3A] px-2.5 py-0.5 text-[11px] font-extrabold tracking-wide text-white shadow-md">
        {name || 'FARE COACH'}
      </span>
    </div>
  );
}

/**
 * 2. High-fidelity human TL (Team Leader / Agent) SVG Avatar.
 * Styled with blonde hair, tech operations headset, cobalt suit and emerald tie.
 */
export function TlHumanAvatar({ name }: { name?: string }) {
  const rootRef = useRef<SVGSVGElement>(null);
  const headRef = useRef<SVGGElement>(null);
  const leftEyeRef = useRef<SVGEllipseElement>(null);
  const rightEyeRef = useRef<SVGEllipseElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Subtle idle breathing & head motion
      if (headRef.current) {
        gsap.to(headRef.current, {
          y: -1.6,
          rotation: 1,
          transformOrigin: '50px 48px',
          duration: 2.2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      // Natural lifelike blinking
      if (leftEyeRef.current && rightEyeRef.current) {
        const blinkTl = gsap.timeline({ repeat: -1, repeatDelay: 3.5 });
        blinkTl
          .to([leftEyeRef.current, rightEyeRef.current], {
            scaleY: 0.1,
            transformOrigin: 'center center',
            duration: 0.08,
            ease: 'power2.in',
          })
          .to([leftEyeRef.current, rightEyeRef.current], {
            scaleY: 1,
            duration: 0.1,
            ease: 'power2.out',
          });
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-20 w-20 sm:h-24 sm:w-24">
        {/* Soft radial gold ground glow */}
        <div className="absolute inset-x-2 bottom-0 h-4 rounded-full bg-[#C99A2E]/25 blur-sm" />

        <svg
          ref={rootRef}
          viewBox="0 0 100 110"
          className="relative z-10 h-full w-full overflow-visible drop-shadow-[0_4px_10px_rgba(0,0,0,0.35)]"
        >
          <defs>
            <linearGradient id="tlBlondeHair" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FDE047" />
              <stop offset="60%" stopColor="#EAB308" />
              <stop offset="100%" stopColor="#CA8A04" />
            </linearGradient>
            <linearGradient id="tlSkin" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFEDD5" />
              <stop offset="100%" stopColor="#FDBA74" />
            </linearGradient>
            <linearGradient id="tlSuit" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#2563EB" />
              <stop offset="50%" stopColor="#1D4ED8" />
              <stop offset="100%" stopColor="#1E3A8A" />
            </linearGradient>
            <linearGradient id="tlTie" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#818CF8" />
              <stop offset="100%" stopColor="#4F46E5" />
            </linearGradient>
          </defs>

          {/* Shoulders & Suit */}
          <path d="M12 104 C12 80 28 72 50 72 C72 72 88 80 88 104 Z" fill="url(#tlSuit)" />
          {/* White dress shirt V */}
          <polygon points="42,72 58,72 50,96" fill="#FFFFFF" />
          {/* Tie */}
          <polygon points="48,74 52,74 54,92 50,96 46,92" fill="url(#tlTie)" />
          {/* Suit Lapels */}
          <path d="M42 72 L50 96 L32 84 L36 74 Z" fill="#1E40AF" />
          <path d="M58 72 L50 96 L68 84 L64 74 Z" fill="#1E40AF" />

          {/* Head & Neck */}
          <g ref={headRef}>
            {/* Neck */}
            <rect x="44" y="60" width="12" height="15" rx="4" fill="#FDBA74" />
            {/* Ears */}
            <circle cx="30" cy="46" r="4.5" fill="#FDBA74" />
            <circle cx="70" cy="46" r="4.5" fill="#FDBA74" />
            {/* Face */}
            <rect x="32" y="24" width="36" height="42" rx="16" fill="url(#tlSkin)" />
            {/* Rosy Cheeks */}
            <ellipse cx="38" cy="50" rx="3.5" ry="2" fill="#FB7185" opacity="0.4" />
            <ellipse cx="62" cy="50" rx="3.5" ry="2" fill="#FB7185" opacity="0.4" />

            {/* Blonde Wavy Hair */}
            <path
              d="M30 36 C28 14 42 10 50 10 C62 10 72 14 70 36 C66 26 58 20 50 20 C40 20 34 26 30 36 Z"
              fill="url(#tlBlondeHair)"
            />
            {/* Hair curl tufts */}
            <path d="M38 18 C44 14 54 14 62 18" stroke="#FEF08A" strokeWidth="2" strokeLinecap="round" fill="none" />
            <circle cx="34" cy="24" r="3" fill="url(#tlBlondeHair)" />
            <circle cx="66" cy="24" r="3" fill="url(#tlBlondeHair)" />

            {/* Eyebrows */}
            <path d="M37 36 Q42 34 46 36" stroke="#B45309" strokeWidth="1.8" strokeLinecap="round" fill="none" />
            <path d="M54 36 Q58 34 63 36" stroke="#B45309" strokeWidth="1.8" strokeLinecap="round" fill="none" />

            {/* Blue Eyes (blinking) */}
            <ellipse ref={leftEyeRef} cx="42" cy="42" rx="2.5" ry="3" fill="#1E3A8A" />
            <ellipse ref={rightEyeRef} cx="58" cy="42" rx="2.5" ry="3" fill="#1E3A8A" />
            <circle cx="43" cy="41" r="0.9" fill="#FFFFFF" />
            <circle cx="59" cy="41" r="0.9" fill="#FFFFFF" />

            {/* Nose */}
            <path d="M50 43 L48.5 49 Q50 50 51.5 49" stroke="#EA580C" strokeWidth="1.2" strokeLinecap="round" fill="none" />

            {/* Friendly Smile */}
            <path d="M44 54 Q50 60 56 54" stroke="#991B1B" strokeWidth="1.8" strokeLinecap="round" fill="none" />
            <path d="M45 54 Q50 58 55 54 Z" fill="#FFFFFF" opacity="0.8" />
          </g>
        </svg>
      </div>

      {/* Name pill underneath */}
      <span className="mt-1 whitespace-nowrap rounded-full border border-[#C99A2E]/50 bg-[#0B1D3A]/90 px-2.5 py-0.5 text-[11px] font-extrabold tracking-wide text-white shadow-md">
        {name || 'మీరు (TL)'}
      </span>
    </div>
  );
}

/**
 * High-fidelity human Candidate / Profile SVG Avatar.
 * Styled after the suited candidate professional in the reference game,
 * with role badge icon and entrance animation.
 */
export function CandidateHumanAvatar({
  name,
  badgeEmoji,
  isPerson = true,
  itemKey,
}: AvatarProps) {
  const rootRef = useRef<SVGSVGElement>(null);
  const headRef = useRef<SVGGElement>(null);
  const leftEyeRef = useRef<SVGEllipseElement>(null);
  const rightEyeRef = useRef<SVGEllipseElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Subtle idle breathing
      if (headRef.current) {
        gsap.to(headRef.current, {
          y: -1.4,
          duration: 1.8,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      // Natural blinking
      if (leftEyeRef.current && rightEyeRef.current) {
        const blinkTl = gsap.timeline({ repeat: -1, repeatDelay: 3.2 });
        blinkTl
          .to([leftEyeRef.current, rightEyeRef.current], {
            scaleY: 0.1,
            transformOrigin: 'center center',
            duration: 0.08,
            ease: 'power2.in',
          })
          .to([leftEyeRef.current, rightEyeRef.current], {
            scaleY: 1,
            duration: 0.1,
            ease: 'power2.out',
          });
      }
    }, rootRef);

    return () => ctx.revert();
  }, [itemKey]);

  return (
    <motion.div
      key={itemKey}
      initial={{ x: 45, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -45, opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center"
    >
      <div className="relative h-20 w-20 sm:h-24 sm:w-24">
        {/* Soft radial ground glow */}
        <div className="absolute inset-x-2 bottom-0 h-4 rounded-full bg-[#3B82F6]/20 blur-sm" />

        <svg
          ref={rootRef}
          viewBox="0 0 100 110"
          className="relative z-10 h-full w-full overflow-visible drop-shadow-[0_4px_10px_rgba(0,0,0,0.35)]"
        >
          <defs>
            <linearGradient id="candHair" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#334155" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>
            <linearGradient id="candSkin" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FED7AA" />
              <stop offset="100%" stopColor="#FB923C" />
            </linearGradient>
            <linearGradient id="candSuit" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#581C87" />
              <stop offset="50%" stopColor="#4C1D95" />
              <stop offset="100%" stopColor="#2E1065" />
            </linearGradient>
            <linearGradient id="procSuit" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#0F766E" />
              <stop offset="50%" stopColor="#115E59" />
              <stop offset="100%" stopColor="#134E4A" />
            </linearGradient>
          </defs>

          {/* Shoulders & Tailored Suit */}
          <path
            d="M14 104 C14 80 28 72 50 72 C72 72 86 80 86 104 Z"
            fill={isPerson ? 'url(#candSuit)' : 'url(#procSuit)'}
          />
          {/* Crisp shirt */}
          <polygon points="42,72 58,72 50,96" fill="#F8FAFC" />
          {/* Tie or Bowtie */}
          <polygon points="48,74 52,74 53.5,92 50,96 46.5,92" fill={isPerson ? '#F59E0B' : '#38BDF8'} />
          {/* Lapels */}
          <path d="M42 72 L50 96 L33 84 L37 74 Z" fill={isPerson ? '#3B0764' : '#042F2E'} />
          <path d="M58 72 L50 96 L67 84 L63 74 Z" fill={isPerson ? '#3B0764' : '#042F2E'} />

          {/* Head & Neck */}
          <g ref={headRef}>
            {/* Neck */}
            <rect x="44" y="60" width="12" height="15" rx="4" fill="#FB923C" />
            {/* Ears */}
            <circle cx="30" cy="46" r="4.5" fill="#FB923C" />
            <circle cx="70" cy="46" r="4.5" fill="#FB923C" />
            {/* Face */}
            <rect x="32" y="24" width="36" height="42" rx="16" fill="url(#candSkin)" />
            {/* Rosy Cheeks */}
            <ellipse cx="38" cy="50" rx="3.5" ry="2" fill="#FB7185" opacity="0.3" />
            <ellipse cx="62" cy="50" rx="3.5" ry="2" fill="#FB7185" opacity="0.3" />

            {/* Dark Styled Hair */}
            <path
              d="M30 35 C28 12 40 8 50 8 C62 8 72 12 70 35 C66 24 56 18 50 18 C42 18 34 24 30 35 Z"
              fill="url(#candHair)"
            />
            {/* Hair parting / texture */}
            <path d="M38 16 Q50 12 62 17" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6" />

            {/* Eyebrows */}
            <path d="M37 36 Q42 33 46 35" stroke="#1E293B" strokeWidth="1.8" strokeLinecap="round" fill="none" />
            <path d="M54 35 Q58 33 63 36" stroke="#1E293B" strokeWidth="1.8" strokeLinecap="round" fill="none" />

            {/* Eyes (blinking) */}
            <ellipse ref={leftEyeRef} cx="42" cy="42" rx="2.5" ry="3" fill="#0F172A" />
            <ellipse ref={rightEyeRef} cx="58" cy="42" rx="2.5" ry="3" fill="#0F172A" />
            <circle cx="43" cy="41" r="0.9" fill="#FFFFFF" />
            <circle cx="59" cy="41" r="0.9" fill="#FFFFFF" />

            {/* Nose */}
            <path d="M50 43 L48.5 49 Q50 50 51.5 49" stroke="#C2410C" strokeWidth="1.2" strokeLinecap="round" fill="none" />

            {/* Confident Smile */}
            <path d="M44 54 Q50 60 56 54" stroke="#881337" strokeWidth="1.8" strokeLinecap="round" fill="none" />
            <path d="M45 54 Q50 58 55 54 Z" fill="#FFFFFF" opacity="0.9" />

            {/* Glasses for process specialist */}
            {!isPerson && (
              <g stroke="#0284C7" strokeWidth="1.6" fill="none">
                <rect x="36" y="38" width="11" height="8" rx="2" />
                <rect x="53" y="38" width="11" height="8" rx="2" />
                <line x1="47" y1="42" x2="53" y2="42" />
              </g>
            )}
          </g>
        </svg>

        {/* Floating Category / Emoji Badge */}
        {badgeEmoji && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 350, damping: 18, delay: 0.15 }}
            className="fare-icon-3d absolute -bottom-1 -right-1 grid h-7 w-7 place-items-center rounded-full border-2 border-white bg-gradient-to-br from-[#3B82F6] to-[#1D4ED8] text-sm text-white shadow-lg sm:h-8 sm:w-8 sm:text-base"
          >
            {badgeEmoji}
          </motion.div>
        )}
      </div>

      {/* Name pill underneath */}
      <span className="mt-1 whitespace-nowrap rounded-full border border-[#C99A2E]/50 bg-[#0B1D3A]/90 px-2.5 py-0.5 text-[11px] font-extrabold tracking-wide text-white shadow-md">
        {name || (isPerson ? 'Candidate' : 'Idea')}
      </span>
    </motion.div>
  );
}
