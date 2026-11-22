import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import type { CardItem, Language } from '../types';

interface CoachCharacterProps {
  name?: string;
  role?: string;
  tone?: 'neutral' | 'good' | 'bad';
  reactionKey?: string | number;
  compact?: boolean;
}

interface TlCharacterProps {
  name?: string;
  role?: string;
  tone?: 'neutral' | 'good' | 'bad';
  reactionKey?: string | number;
  compact?: boolean;
}

interface CandidateCharacterProps {
  item: CardItem;
  isPerson: boolean;
  lang: Language;
  reactionKey?: string | number;
  compact?: boolean;
}

/**
 * 1. FARE Coach (Executive Sales Mentor)
 * Distinct look: Mature executive presence, dark espresso styled side-part hair,
 * gold-rimmed executive spectacles, tailored midnight navy three-piece suit,
 * FARE Gold silk tie & pocket square, holding executive sales diagnostic tablet.
 */
export function CoachCharacter({ name, tone = 'neutral', reactionKey, compact = false }: CoachCharacterProps) {
  const rootRef = useRef<SVGSVGElement>(null);
  const torsoRef = useRef<SVGGElement>(null);
  const headRef = useRef<SVGGElement>(null);
  const pointArmRef = useRef<SVGGElement>(null);
  const tabletArmRef = useRef<SVGGElement>(null);
  const leftEyeRef = useRef<SVGEllipseElement>(null);
  const rightEyeRef = useRef<SVGEllipseElement>(null);
  const shadowRef = useRef<SVGEllipseElement>(null);
  const barsRef = useRef<SVGGElement>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (torsoRef.current) {
        gsap.to(torsoRef.current, {
          y: -2,
          duration: 2.1,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }
      if (headRef.current) {
        gsap.to(headRef.current, {
          y: -2,
          rotation: 1.1,
          transformOrigin: '50px 38px',
          duration: 2.3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }
      if (pointArmRef.current) {
        gsap.to(pointArmRef.current, {
          rotation: -5,
          transformOrigin: '72px 64px',
          duration: 2.0,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }
      if (tabletArmRef.current) {
        gsap.to(tabletArmRef.current, {
          rotation: 2.2,
          transformOrigin: '28px 64px',
          duration: 2.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }
      if (shadowRef.current) {
        gsap.to(shadowRef.current, {
          scaleX: 0.95,
          opacity: 0.85,
          transformOrigin: '50px 148px',
          duration: 2.1,
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
      if (barsRef.current) {
        const rects = barsRef.current.querySelectorAll('rect');
        rects.forEach((r, idx) => {
          gsap.to(r, {
            scaleY: 0.45 + idx * 0.15,
            transformOrigin: 'bottom center',
            duration: 0.85 + idx * 0.22,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });
        });
      }
    }, rootRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      if (tone === 'good') {
        if (torsoRef.current) {
          gsap.fromTo(torsoRef.current, { y: 0 }, { y: -6, duration: 0.18, yoyo: true, repeat: 1, ease: 'power2.out' });
        }
        if (pointArmRef.current) {
          gsap.fromTo(pointArmRef.current, { rotation: 0 }, { rotation: -16, duration: 0.22, yoyo: true, repeat: 1, ease: 'back.out(2)' });
        }
      } else if (tone === 'bad' && headRef.current) {
        gsap.fromTo(headRef.current, { x: 0 }, { keyframes: [{ x: -3 }, { x: 3 }, { x: -2 }, { x: 0 }], duration: 0.35, ease: 'power1.inOut' });
      }
    }, rootRef);
    return () => ctx.revert();
  }, [tone, reactionKey]);

  return (
    <div
      className="relative flex flex-col items-center cursor-pointer select-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={`relative ${compact ? 'h-[105px] w-[84px] sm:h-[120px] sm:w-[96px]' : 'h-[165px] w-[130px] sm:h-[185px] sm:w-[145px]'}`}>
        <div className="absolute inset-x-3 bottom-1 h-5 rounded-full bg-[#EAB308]/25 blur-md" />

        <svg
          ref={rootRef}
          viewBox="0 0 100 155"
          className="relative z-10 h-full w-full overflow-visible drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)]"
        >
          <defs>
            <linearGradient id="coachHairGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4A2818" />
              <stop offset="50%" stopColor="#2E170C" />
              <stop offset="100%" stopColor="#150A05" />
            </linearGradient>
            <linearGradient id="coachSkinGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FDE6D2" />
              <stop offset="100%" stopColor="#E2A782" />
            </linearGradient>
            <linearGradient id="coachSuitGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#152B52" />
              <stop offset="50%" stopColor="#0B1D3A" />
              <stop offset="100%" stopColor="#061122" />
            </linearGradient>
            <linearGradient id="coachTieGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#B45309" />
            </linearGradient>
          </defs>

          {/* Ground shadow */}
          <ellipse ref={shadowRef} cx="50" cy="148" rx="34" ry="5.5" fill="#0B1D3A" opacity="0.35" />

          {/* Legs & Oxford Leather Shoes */}
          <path d="M37 106 L34 142 L45 142 L47 108 Z" fill="#061122" />
          <path d="M53 108 L55 142 L66 142 L63 106 Z" fill="#061122" />
          <path d="M30 142 Q30 138 39 138 Q46 138 46 144 L30 145 Z" fill="#1C1917" />
          <path d="M54 144 Q54 138 61 138 Q70 138 70 142 L70 145 Z" fill="#1C1917" />

          {/* Torso Group */}
          <g ref={torsoRef}>
            {/* Right Arm: Guiding / Pointing gesture */}
            <g ref={pointArmRef}>
              <path
                d="M68 62 Q82 54 94 40"
                stroke="url(#coachSuitGrad)"
                strokeWidth="11"
                strokeLinecap="round"
                fill="none"
              />
              <path d="M90 44 L95 38" stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" />
              <circle cx="96" cy="36" r="4.5" fill="url(#coachSkinGrad)" />
              <path d="M97 33 L105 24" stroke="url(#coachSkinGrad)" strokeWidth="3" strokeLinecap="round" />
              <circle cx="107" cy="22" r="2.5" fill="#EAB308" />
            </g>

            {/* Bespoke Three-Piece Suit Jacket */}
            <path d="M30 58 Q50 50 70 58 L72 108 Q50 112 28 108 Z" fill="url(#coachSuitGrad)" />
            {/* White dress shirt */}
            <polygon points="43,54 57,54 50,84" fill="#FFFFFF" />
            {/* Gold Silk Tie */}
            <polygon points="48,56 52,56 53,78 50,84 47,78" fill="url(#coachTieGrad)" />
            {/* Navy Lapels */}
            <path d="M43 54 L50 84 L36 68 L38 56 Z" fill="#1E3A6B" />
            <path d="M57 54 L50 84 L64 68 L62 56 Z" fill="#1E3A6B" />
            {/* FARE Gold pocket square */}
            <polygon points="61,72 67,69 68,74 61,74" fill="#F59E0B" />
            {/* FARE Gold Coach Lapel Pin */}
            <circle cx="40" cy="66" r="1.8" fill="#F59E0B" stroke="#B45309" strokeWidth="0.5" />

            {/* Left Arm holding Executive Diagnostic Tablet */}
            <g ref={tabletArmRef}>
              <path
                d="M32 62 Q20 74 22 92"
                stroke="url(#coachSuitGrad)"
                strokeWidth="10"
                strokeLinecap="round"
                fill="none"
              />
              <g transform="translate(6, 78) rotate(-8)">
                <rect x="0" y="0" width="28" height="21" rx="3" fill="#0B132B" stroke="#D97706" strokeWidth="1" />
                <rect x="2" y="2" width="24" height="17" rx="1.5" fill="#152238" />
                {/* Gold header bar on tablet */}
                <rect x="4" y="4" width="12" height="2" rx="0.5" fill="#F59E0B" />
                {/* Metric bars */}
                <g ref={barsRef}>
                  <rect x="5" y="11" width="3" height="6" rx="0.5" fill="#3B82F6" />
                  <rect x="9.5" y="8" width="3" height="9" rx="0.5" fill="#10B981" />
                  <rect x="14" y="9.5" width="3" height="7.5" rx="0.5" fill="#F59E0B" />
                  <rect x="18.5" y="6.5" width="3" height="10.5" rx="0.5" fill="#EC4899" />
                </g>
              </g>
              <circle cx="23" cy="94" r="4" fill="url(#coachSkinGrad)" />
            </g>

            {/* Head & Neck */}
            <g ref={headRef}>
              <rect x="45" y="44" width="10" height="13" rx="3" fill="#E2A782" />
              <circle cx="34" cy="33" r="3.5" fill="#E2A782" />
              <circle cx="66" cy="33" r="3.5" fill="#E2A782" />
              <rect x="36" y="16" width="28" height="32" rx="12" fill="url(#coachSkinGrad)" />
              <ellipse cx="40" cy="35" rx="3" ry="1.6" fill="#FB7185" opacity="0.3" />
              <ellipse cx="62" cy="35" rx="3" ry="1.6" fill="#FB7185" opacity="0.3" />

              {/* Distinguished Dark Espresso Side-Part Hair */}
              <path
                d="M34 26 C31 8 42 4 50 4 C60 4 68 8 66 26 C62 17 55 12 50 12 C41 12 37 17 34 26 Z"
                fill="url(#coachHairGrad)"
              />
              <path d="M38 10 Q48 6 58 10" stroke="#78350F" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.8" />
              {/* Subtle silver temple accents */}
              <path d="M34 22 C33 26 35 28 36 29" stroke="#CBD5E1" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.75" />
              <path d="M66 22 C67 26 65 28 64 29" stroke="#CBD5E1" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.75" />

              {/* Distinguished Eyebrows */}
              <path d="M39 23 Q44 21 47 23" stroke="#29140B" strokeWidth="1.8" strokeLinecap="round" fill="none" />
              <path d="M53 23 Q56 21 61 23" stroke="#29140B" strokeWidth="1.8" strokeLinecap="round" fill="none" />

              {/* Executive Gold Spectacles */}
              <g stroke="#D97706" strokeWidth="1.2" fill="none">
                <rect x="38" y="23" width="9.5" height="7.5" rx="2" />
                <rect x="52.5" y="23" width="9.5" height="7.5" rx="2" />
                <line x1="47.5" y1="26" x2="52.5" y2="26" strokeWidth="1.4" />
                <line x1="38" y1="26" x2="34" y2="25" />
                <line x1="62" y1="26" x2="66" y2="25" />
              </g>

              {/* Warm Brown Eyes behind spectacles */}
              <ellipse ref={leftEyeRef} cx="43" cy="27" rx="1.8" ry="2.2" fill="#2E150B" />
              <ellipse ref={rightEyeRef} cx="57" cy="27" rx="1.8" ry="2.2" fill="#2E150B" />
              <circle cx="43.7" cy="26.3" r="0.6" fill="#FFFFFF" />
              <circle cx="57.7" cy="26.3" r="0.6" fill="#FFFFFF" />

              {/* Nose */}
              <path d="M50 28 L48.5 33 Q50 34 51.5 33" stroke="#C2410C" strokeWidth="1.2" strokeLinecap="round" fill="none" />

              {/* Warm Mentor Smile */}
              <path d="M45 37 Q50 42 55 37" stroke="#78350F" strokeWidth="1.8" strokeLinecap="round" fill="none" />
              <path d="M46 37 Q50 40 54 37 Z" fill="#FFFFFF" opacity="0.9" />
            </g>
          </g>

          {tone === 'good' && (
            <g key={String(reactionKey)}>
              <circle cx="98" cy="18" r="2.5" fill="#EAB308" className="animate-ping" />
              <circle cx="106" cy="28" r="2" fill="#F59E0B" className="animate-pulse" />
            </g>
          )}
        </svg>
      </div>

      {/* Identity Pill: FARE COACH */}
      <div className={`flex items-center gap-1.5 rounded-full border border-[#C99A2E]/70 bg-[#0B1D3A] text-white shadow-md ${compact ? '-mt-0.5 px-2.5 py-0.5 text-[9px]' : '-mt-1 px-3.5 py-1 text-[11px]'} font-extrabold`}>
        <span className="h-1.5 w-1.5 rounded-full bg-[#EAB308] animate-pulse" />
        <span className="tracking-wide text-white">{name || 'FARE COACH'}</span>
      </div>
    </div>
  );
}

/**
 * 2. Team Leader (Pipeline TL)
 * Distinct look: Dynamic operational leader, golden blonde wavy hair,
 * operations headset/microphone, royal cobalt blue blazer, emerald tie,
 * clipboard/checklist, pointing gesture.
 */
export function TlCharacter({ name, tone = 'neutral', reactionKey, compact = false }: TlCharacterProps) {
  const rootRef = useRef<SVGSVGElement>(null);
  const torsoRef = useRef<SVGGElement>(null);
  const headRef = useRef<SVGGElement>(null);
  const pointArmRef = useRef<SVGGElement>(null);
  const tabletArmRef = useRef<SVGGElement>(null);
  const leftEyeRef = useRef<SVGEllipseElement>(null);
  const rightEyeRef = useRef<SVGEllipseElement>(null);
  const shadowRef = useRef<SVGEllipseElement>(null);
  const [hovered, setHovered] = useState(false);

  // Lifelike idle loop: breathing, arm gesture, tablet bars, eye blinking
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (torsoRef.current) {
        gsap.to(torsoRef.current, {
          y: -2,
          duration: 2.0,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      if (headRef.current) {
        gsap.to(headRef.current, {
          y: -2.2,
          rotation: 1.2,
          transformOrigin: '50px 38px',
          duration: 2.2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      if (pointArmRef.current) {
        gsap.to(pointArmRef.current, {
          rotation: -4,
          transformOrigin: '72px 64px',
          duration: 1.9,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      if (tabletArmRef.current) {
        gsap.to(tabletArmRef.current, {
          rotation: 2,
          transformOrigin: '28px 64px',
          duration: 2.4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      if (shadowRef.current) {
        gsap.to(shadowRef.current, {
          scaleX: 0.95,
          opacity: 0.85,
          transformOrigin: '50px 148px',
          duration: 2.0,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      if (leftEyeRef.current && rightEyeRef.current) {
        const blinkTl = gsap.timeline({ repeat: -1, repeatDelay: 3.4 });
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

  // Tone reactions
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
        if (pointArmRef.current) {
          gsap.fromTo(
            pointArmRef.current,
            { rotation: 0 },
            { rotation: -16, duration: 0.22, yoyo: true, repeat: 1, ease: 'back.out(2)' }
          );
        }
      } else if (tone === 'bad' && headRef.current) {
        gsap.fromTo(
          headRef.current,
          { x: 0 },
          { keyframes: [{ x: -3 }, { x: 3 }, { x: -2 }, { x: 0 }], duration: 0.35, ease: 'power1.inOut' }
        );
      }
    }, rootRef);
    return () => ctx.revert();
  }, [tone, reactionKey]);

  return (
    <div
      className="relative flex flex-col items-center cursor-pointer select-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={`relative ${compact ? 'h-[105px] w-[84px] sm:h-[120px] sm:w-[96px]' : 'h-[165px] w-[130px] sm:h-[185px] sm:w-[145px]'}`}>
        {/* Soft golden aura beneath character */}
        <div className="absolute inset-x-3 bottom-1 h-5 rounded-full bg-[#C99A2E]/25 blur-md" />

        <svg
          ref={rootRef}
          viewBox="0 0 100 155"
          className="relative z-10 h-full w-full overflow-visible drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)]"
        >
          <defs>
            <linearGradient id="tlHairGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FDE047" />
              <stop offset="50%" stopColor="#EAB308" />
              <stop offset="100%" stopColor="#B45309" />
            </linearGradient>
            <linearGradient id="tlSkinGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFEDD5" />
              <stop offset="100%" stopColor="#FDBA74" />
            </linearGradient>
            <linearGradient id="tlSuitGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#2563EB" />
              <stop offset="50%" stopColor="#1D4ED8" />
              <stop offset="100%" stopColor="#1E3A8A" />
            </linearGradient>
            <linearGradient id="tlTieGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>

          {/* Ground shadow */}
          <ellipse ref={shadowRef} cx="50" cy="148" rx="34" ry="5.5" fill="#0B1D3A" opacity="0.35" />

          {/* Legs & Shoes */}
          <path d="M37 106 L34 142 L45 142 L47 108 Z" fill="#1E293B" />
          <path d="M53 108 L55 142 L66 142 L63 106 Z" fill="#1E293B" />
          {/* Oxford shoes */}
          <path d="M30 142 Q30 138 39 138 Q46 138 46 144 L30 145 Z" fill="#0F172A" />
          <path d="M54 144 Q54 138 61 138 Q70 138 70 142 L70 145 Z" fill="#0F172A" />

          {/* Upper Body (Breathing group) */}
          <g ref={torsoRef}>
            {/* Right Pointing Arm (gesturing towards center card) */}
            <g ref={pointArmRef}>
              <path
                d="M68 62 Q82 54 94 40"
                stroke="url(#tlSuitGrad)"
                strokeWidth="11"
                strokeLinecap="round"
                fill="none"
              />
              <path d="M90 44 L95 38" stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" />
              <circle cx="96" cy="36" r="4.5" fill="url(#tlSkinGrad)" />
              <path d="M97 33 L104 24" stroke="url(#tlSkinGrad)" strokeWidth="3" strokeLinecap="round" />
              {tone === 'good' && <circle cx="106" cy="22" r="2.5" fill="#16A34A" />}
            </g>

            {/* Suit Torso (Cobalt Operations Blazer) */}
            <path d="M30 58 Q50 50 70 58 L72 108 Q50 112 28 108 Z" fill="url(#tlSuitGrad)" />
            {/* White dress shirt V */}
            <polygon points="43,54 57,54 50,84" fill="#FFFFFF" />
            {/* Emerald Silk Tie */}
            <polygon points="48,56 52,56 53,78 50,84 47,78" fill="url(#tlTieGrad)" />
            {/* Suit Lapels */}
            <path d="M43 54 L50 84 L36 68 L38 56 Z" fill="#1D4ED8" />
            <path d="M57 54 L50 84 L64 68 L62 56 Z" fill="#1D4ED8" />
            {/* Cyan pocket square */}
            <polygon points="61,72 67,69 68,74 61,74" fill="#38BDF8" />

            {/* Team Leader Official Lanyard */}
            <path d="M44 56 L49 76" stroke="#10B981" strokeWidth="1.3" />
            <path d="M56 56 L51 76" stroke="#10B981" strokeWidth="1.3" />
            <rect x="47.5" y="76" width="5" height="7" rx="1" fill="#FFFFFF" stroke="#059669" strokeWidth="0.8" />
            <rect x="48.5" y="78" width="3" height="3" rx="0.5" fill="#0284C7" />

            {/* Left Arm holding Checklist Clipboard */}
            <g ref={tabletArmRef}>
              <path
                d="M32 62 Q20 74 22 92"
                stroke="url(#tlSuitGrad)"
                strokeWidth="10"
                strokeLinecap="round"
                fill="none"
              />
              {/* Operations Checklist Clipboard */}
              <g transform="translate(6, 78) rotate(-8)">
                <rect x="0" y="0" width="28" height="21" rx="2" fill="#F8FAFC" stroke="#64748B" strokeWidth="1" />
                <rect x="9" y="-2" width="10" height="3" rx="1" fill="#334155" />
                {/* Checklist items */}
                <line x1="5" y1="5" x2="23" y2="5" stroke="#10B981" strokeWidth="1.5" />
                <line x1="5" y1="9" x2="19" y2="9" stroke="#94A3B8" strokeWidth="1.2" />
                <line x1="5" y1="13" x2="21" y2="13" stroke="#94A3B8" strokeWidth="1.2" />
                <line x1="5" y1="17" x2="17" y2="17" stroke="#94A3B8" strokeWidth="1.2" />
              </g>
              <circle cx="23" cy="94" r="4" fill="url(#tlSkinGrad)" />
            </g>

            {/* Head & Neck Group */}
            <g ref={headRef}>
              {/* Neck */}
              <rect x="45" y="44" width="10" height="13" rx="3" fill="#FDBA74" />
              {/* Ears */}
              <circle cx="34" cy="33" r="3.5" fill="#FDBA74" />
              <circle cx="66" cy="33" r="3.5" fill="#FDBA74" />
              {/* Face */}
              <rect x="36" y="16" width="28" height="32" rx="12" fill="url(#tlSkinGrad)" />
              {/* Rosy Cheeks */}
              <ellipse cx="40" cy="35" rx="3" ry="1.6" fill="#FB7185" opacity="0.4" />
              <ellipse cx="60" cy="35" rx="3" ry="1.6" fill="#FB7185" opacity="0.4" />

              {/* Styled Blonde Wavy Hair */}
              <path
                d="M34 26 C32 8 44 4 50 4 C60 4 68 8 66 26 C62 18 56 12 50 12 C42 12 37 18 34 26 Z"
                fill="url(#tlHairGrad)"
              />
              <path d="M40 10 Q50 6 60 10" stroke="#FEF08A" strokeWidth="1.5" strokeLinecap="round" fill="none" />
              <circle cx="37" cy="15" r="2.5" fill="url(#tlHairGrad)" />
              <circle cx="63" cy="15" r="2.5" fill="url(#tlHairGrad)" />

              {/* Eyebrows */}
              <path d="M40 24 Q44 22 47 24" stroke="#B45309" strokeWidth="1.5" strokeLinecap="round" fill="none" />
              <path d="M53 24 Q56 22 60 24" stroke="#B45309" strokeWidth="1.5" strokeLinecap="round" fill="none" />

              {/* Operations Headset with Mic */}
              <path d="M34 25 C31 27 31 35 34 38" stroke="#0284C7" strokeWidth="2.4" fill="none" strokeLinecap="round" />
              <circle cx="32" cy="32" r="2.8" fill="#0369A1" stroke="#38BDF8" strokeWidth="1" />
              <path d="M32 34 Q37 41 43 39" stroke="#0284C7" strokeWidth="1.3" fill="none" strokeLinecap="round" />
              <circle cx="43" cy="39" r="1.3" fill="#38BDF8" />

              {/* Blue Eyes (blinking) */}
              <ellipse ref={leftEyeRef} cx="44" cy="28" rx="2" ry="2.4" fill="#1E3A8A" />
              <ellipse ref={rightEyeRef} cx="56" cy="28" rx="2" ry="2.4" fill="#1E3A8A" />
              <circle cx="44.8" cy="27" r="0.7" fill="#FFFFFF" />
              <circle cx="56.8" cy="27" r="0.7" fill="#FFFFFF" />

              {/* Nose */}
              <path d="M50 28 L49 33 Q50 34 51 33" stroke="#EA580C" strokeWidth="1" strokeLinecap="round" fill="none" />

              {/* Warm Smile */}
              <path d="M45 37 Q50 42 55 37" stroke="#991B1B" strokeWidth="1.5" strokeLinecap="round" fill="none" />
              <path d="M46 37 Q50 40 54 37 Z" fill="#FFFFFF" opacity="0.85" />
            </g>
          </g>

          {/* Celebratory floating sparks on positive tone */}
          {tone === 'good' && (
            <g key={String(reactionKey)}>
              <circle cx="98" cy="18" r="2.5" fill="#16A34A" className="animate-ping" />
              <circle cx="106" cy="28" r="2" fill="#10B981" className="animate-pulse" />
            </g>
          )}
        </svg>
      </div>

      {/* Identity Pill: PIPELINE TL */}
      <div className={`flex items-center gap-1.5 rounded-full border border-[#10B981]/70 bg-[#0B1D3A] text-white shadow-md ${compact ? '-mt-0.5 px-2.5 py-0.5 text-[9px]' : '-mt-1 px-3.5 py-1 text-[11px]'} font-extrabold`}>
        <span className="h-1.5 w-1.5 rounded-full bg-[#10B981] animate-pulse" />
        <span className="tracking-wide text-white">{name || 'PIPELINE TL'}</span>
      </div>
    </div>
  );
}

/**
 * Candidate Character (Right side)
 * Features mirrored posture facing toward the center card,
 * tailored professional suit, live blinking, breathing, role badge, and entrance spring animation.
 */
export function CandidateCharacter({ item, isPerson, lang, reactionKey, compact = false }: CandidateCharacterProps) {
  const rootRef = useRef<SVGSVGElement>(null);
  const torsoRef = useRef<SVGGElement>(null);
  const headRef = useRef<SVGGElement>(null);
  const dossierArmRef = useRef<SVGGElement>(null);
  const leftEyeRef = useRef<SVGEllipseElement>(null);
  const rightEyeRef = useRef<SVGEllipseElement>(null);
  const shadowRef = useRef<SVGEllipseElement>(null);

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
          y: -2.0,
          rotation: -1.2,
          transformOrigin: '50px 38px',
          duration: 2.1,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      if (dossierArmRef.current) {
        gsap.to(dossierArmRef.current, {
          rotation: 3,
          transformOrigin: '72px 64px',
          duration: 2.2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      if (shadowRef.current) {
        gsap.to(shadowRef.current, {
          scaleX: 0.95,
          opacity: 0.85,
          transformOrigin: '50px 148px',
          duration: 1.9,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      if (leftEyeRef.current && rightEyeRef.current) {
        const blinkTl = gsap.timeline({ repeat: -1, repeatDelay: 3.1 });
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
  }, [item.id]);

  return (
    <motion.div
      key={item.id}
      initial={{ x: 30, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -25, opacity: 0 }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex flex-col items-center select-none"
    >
      <div className={`relative ${compact ? 'h-[105px] w-[84px] sm:h-[120px] sm:w-[96px]' : 'h-[165px] w-[130px] sm:h-[185px] sm:w-[145px]'}`}>
        {/* Soft violet/emerald ground glow */}
        <div
          className={`absolute inset-x-3 bottom-1 h-5 rounded-full blur-md ${
            isPerson ? 'bg-[#9333EA]/25' : 'bg-[#0D9488]/25'
          }`}
        />

        <svg
          ref={rootRef}
          viewBox="0 0 100 155"
          className="relative z-10 h-full w-full overflow-visible drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)]"
        >
          <defs>
            <linearGradient id="candHairGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#334155" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>
            <linearGradient id="candSkinGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FED7AA" />
              <stop offset="100%" stopColor="#FB923C" />
            </linearGradient>
            <linearGradient id="candSuitGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#581C87" />
              <stop offset="50%" stopColor="#4C1D95" />
              <stop offset="100%" stopColor="#2E1065" />
            </linearGradient>
            <linearGradient id="procSuitGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#0F766E" />
              <stop offset="50%" stopColor="#115E59" />
              <stop offset="100%" stopColor="#134E4A" />
            </linearGradient>
          </defs>

          {/* Ground shadow */}
          <ellipse ref={shadowRef} cx="50" cy="148" rx="34" ry="5.5" fill="#0B1D3A" opacity="0.35" />

          {/* Trousers & Shoes */}
          <path d="M37 106 L34 142 L45 142 L47 108 Z" fill="#1E1B4B" />
          <path d="M53 108 L55 142 L66 142 L63 106 Z" fill="#1E1B4B" />
          {/* Shoes */}
          <path d="M30 142 Q30 138 39 138 Q46 138 46 144 L30 145 Z" fill="#1C1917" />
          <path d="M54 144 Q54 138 61 138 Q70 138 70 142 L70 145 Z" fill="#1C1917" />

          {/* Upper Body (Breathing group) */}
          <g ref={torsoRef}>
            {/* Left Arm gesturing towards center card */}
            <path
              d="M32 62 Q18 54 8 40"
              stroke={isPerson ? 'url(#candSuitGrad)' : 'url(#procSuitGrad)'}
              strokeWidth="11"
              strokeLinecap="round"
              fill="none"
            />
            <path d="M11 44 L6 38" stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" />
            <circle cx="5" cy="36" r="4.5" fill="url(#candSkinGrad)" />
            <path d="M4 33 L-3 24" stroke="url(#candSkinGrad)" strokeWidth="3" strokeLinecap="round" />

            {/* Suit Torso */}
            <path
              d="M30 58 Q50 50 70 58 L72 108 Q50 112 28 108 Z"
              fill={isPerson ? 'url(#candSuitGrad)' : 'url(#procSuitGrad)'}
            />
            {/* White shirt V */}
            <polygon points="43,54 57,54 50,84" fill="#FFFFFF" />
            {/* Tie */}
            <polygon
              points="48,56 52,56 53,78 50,84 47,78"
              fill={isPerson ? '#F59E0B' : '#38BDF8'}
            />
            {/* Lapels */}
            <path d="M43 54 L50 84 L36 68 L38 56 Z" fill={isPerson ? '#3B0764' : '#042F2E'} />
            <path d="M57 54 L50 84 L64 68 L62 56 Z" fill={isPerson ? '#3B0764' : '#042F2E'} />

            {/* Right Arm holding Dossier Folder / Clipboard */}
            <g ref={dossierArmRef}>
              <path
                d="M68 62 Q80 74 78 92"
                stroke={isPerson ? 'url(#candSuitGrad)' : 'url(#procSuitGrad)'}
                strokeWidth="10"
                strokeLinecap="round"
                fill="none"
              />
              {/* Dossier Folder */}
              <g transform="translate(68, 80) rotate(10)">
                <rect x="0" y="0" width="24" height="18" rx="2.5" fill="#C99A2E" stroke="#B45309" strokeWidth="1" />
                <rect x="2" y="2" width="20" height="14" rx="1.5" fill="#FFFBEB" />
                <line x1="5" y1="6" x2="19" y2="6" stroke="#C99A2E" strokeWidth="1.2" />
                <line x1="5" y1="10" x2="16" y2="10" stroke="#C99A2E" strokeWidth="1.2" />
              </g>
              <circle cx="77" cy="94" r="4" fill="url(#candSkinGrad)" />
            </g>

            {/* Head & Neck */}
            <g ref={headRef}>
              <rect x="45" y="44" width="10" height="13" rx="3" fill="#FB923C" />
              <circle cx="34" cy="33" r="3.5" fill="#FB923C" />
              <circle cx="66" cy="33" r="3.5" fill="#FB923C" />
              <rect x="36" y="16" width="28" height="32" rx="12" fill="url(#candSkinGrad)" />
              <ellipse cx="40" cy="35" rx="3" ry="1.6" fill="#FB7185" opacity="0.3" />
              <ellipse cx="60" cy="35" rx="3" ry="1.6" fill="#FB7185" opacity="0.3" />

              {/* Dark Styled Hair */}
              <path
                d="M34 26 C32 8 44 4 50 4 C60 4 68 8 66 26 C62 17 56 12 50 12 C42 12 37 17 34 26 Z"
                fill="url(#candHairGrad)"
              />
              <path d="M40 9 Q50 5 60 9" stroke="#64748B" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.7" />

              {/* Eyebrows */}
              <path d="M40 24 Q44 22 47 24" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" fill="none" />
              <path d="M53 24 Q56 22 60 24" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" fill="none" />

              {/* Eyes (blinking) */}
              <ellipse ref={leftEyeRef} cx="44" cy="28" rx="2" ry="2.4" fill="#0F172A" />
              <ellipse ref={rightEyeRef} cx="56" cy="28" rx="2" ry="2.4" fill="#0F172A" />
              <circle cx="44.8" cy="27" r="0.7" fill="#FFFFFF" />
              <circle cx="56.8" cy="27" r="0.7" fill="#FFFFFF" />

              {/* Nose */}
              <path d="M50 28 L49 33 Q50 34 51 33" stroke="#C2410C" strokeWidth="1" strokeLinecap="round" fill="none" />

              {/* Confident Smile */}
              <path d="M45 37 Q50 42 55 37" stroke="#881337" strokeWidth="1.5" strokeLinecap="round" fill="none" />
              <path d="M46 37 Q50 40 54 37 Z" fill="#FFFFFF" opacity="0.9" />

              {/* Glasses for process specialist */}
              {!isPerson && (
                <g stroke="#0284C7" strokeWidth="1.5" fill="none">
                  <rect x="39" y="24" width="9" height="7" rx="1.5" />
                  <rect x="52" y="24" width="9" height="7" rx="1.5" />
                  <line x1="48" y1="27" x2="52" y2="27" />
                </g>
              )}
            </g>
          </g>

          {/* Floating Role / Emoji Badge */}
          <g transform="translate(74, 18)">
            <circle cx="12" cy="12" r="12" fill="#3B82F6" stroke="#FFFFFF" strokeWidth="2" filter="drop-shadow(0 2px 5px rgba(0,0,0,0.3))" />
            <text x="12" y="16.5" textAnchor="middle" fontSize="13">
              {item.emoji}
            </text>
          </g>
        </svg>
      </div>

      {/* Identity Pill */}
      <div className={`flex items-center gap-1.5 rounded-full border border-[#38BDF8]/60 bg-[#0B1D3A] text-white shadow-md ${compact ? '-mt-0.5 px-2.5 py-0.5 text-[9px]' : '-mt-1 px-3.5 py-1 text-[11px]'} font-extrabold`}>
        <span className="h-1.5 w-1.5 rounded-full bg-[#38BDF8] animate-pulse" />
        <span className="max-w-[100px] truncate tracking-wide text-white">{isPerson ? (lang === 'en' ? 'Candidate' : 'అభ్యర్థి') : lang === 'en' ? 'Idea' : 'ఐడియా'}</span>
      </div>
    </motion.div>
  );
}
