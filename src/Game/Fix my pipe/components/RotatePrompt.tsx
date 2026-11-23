import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScreenRotationIcon from '@mui/icons-material/ScreenRotation';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { usePipeGameStore } from '../store';

interface RotatePromptProps {
  onDismiss?: () => void;
}

export default function RotatePrompt({ onDismiss }: RotatePromptProps) {
  const { lang, screen, showSectionCta, showCta } = usePipeGameStore();
  const en = lang === 'en';
  const [shouldPrompt, setShouldPrompt] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      if (typeof window === 'undefined') return;
      const isPortrait = window.innerHeight > window.innerWidth;
      const isSmallOrTouch =
        window.innerWidth < 900 ||
        ('ontouchstart' in window && (window.innerWidth < 1024 || window.innerHeight < 1024));

      // EXCEPTION: Mobile Score screen (screen === 'result') and "Want to build your team?" dialog
      // are allowed to display in portrait! Rotate prompt is bypassed for these.
      const isException = screen === 'result' || showSectionCta || showCta;

      if (!isSmallOrTouch || isException) {
        setShouldPrompt(false);
        return;
      }

      // For Home and active Play gameplay on mobile, landscape is required
      setShouldPrompt(isPortrait);

      // If user rotates to landscape, reset dismissed state so it prompts next time they go back to portrait
      if (!isPortrait) {
        setDismissed(false);
      }
    };

    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);

    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, [screen, showSectionCta, showCta]);

  if (!shouldPrompt || dismissed) {
    return null;
  }

  const handleDismiss = () => {
    setDismissed(true);
    onDismiss?.();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#071124]/95 p-4 sm:p-6 text-center text-white backdrop-blur-lg select-none"
      >
        <motion.div
          initial={{ scale: 0.9, y: 16 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 16 }}
          transition={{ type: 'spring', stiffness: 280, damping: 22 }}
          className="fare-card-3d relative flex max-w-sm flex-col items-center rounded-[18px] border border-[#C99A2E]/40 bg-gradient-to-b from-[#0B1D3A] to-[#061124] p-5 sm:p-6 shadow-2xl"
        >
          {/* Animated Rotating Device Graphic */}
          <div className="relative mb-4 grid h-20 w-20 place-items-center sm:h-24 sm:w-24">
            {/* Glowing gold circular aura */}
            <div className="absolute inset-0 rounded-full bg-[#C99A2E]/25 blur-xl animate-pulse" />

            {/* Rotating Phone Mockup */}
            <motion.div
              animate={{
                rotate: [0, 0, 90, 90, 0],
                scale: [1, 1, 1.05, 1.05, 1],
              }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative h-14 w-9 rounded-[10px] border-2 border-[#C99A2E] bg-[#1A3463] shadow-lg sm:h-16 sm:w-10"
            >
              {/* Phone notch */}
              <div className="mx-auto mt-1 h-1 w-3 rounded-full bg-white/40" />
              {/* Phone display */}
              <div className="mx-auto mt-1.5 flex h-9 w-6 flex-col justify-center gap-1 rounded-[4px] bg-[#0B1D3A] p-1 sm:h-10 sm:w-7">
                <div className="h-1.5 w-full rounded-full bg-[#3B82F6]" />
                <div className="h-1.5 w-4/5 rounded-full bg-[#10B981]" />
                <div className="h-1.5 w-3/5 rounded-full bg-[#F59E0B]" />
              </div>
            </motion.div>

            {/* Subtle circular indicator */}
            <div className="pointer-events-none absolute inset-0 grid place-items-center opacity-30">
              <ScreenRotationIcon sx={{ fontSize: 64, color: '#C99A2E' }} />
            </div>
          </div>

          {/* Heading */}
          <h2 className="mb-2 text-base font-black leading-snug tracking-tight text-white sm:text-xl">
            {en ? 'Please Rotate to Landscape' : 'దయచేసి ఫోన్‌ను అడ్డంగా తిప్పండి'}
          </h2>

          {/* Description */}
          <p className="mb-5 text-xs leading-relaxed text-slate-300 sm:text-sm">
            {en
              ? 'For the best experience, Fix My Pipe runs in landscape mode so the complete pipeline, team, and decision cards fit clearly without any truncation.'
              : 'మొత్తం సేల్స్ ఫన్నెల్, పైప్‌లైన్ మరియు టీమ్ స్పష్టంగా కనిపించడానికి దయచేసి మీ ఫోన్‌ను ల్యాండ్‌స్కేప్ (Landscape) మోడ్‌కు తిప్పండి.'}
          </p>

          {/* Fallback dismiss button */}
          <button
            type="button"
            onClick={handleDismiss}
            className="flex cursor-pointer items-center gap-1.5 rounded-[10px] border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-slate-300 transition-all hover:bg-white/20 hover:text-white"
          >
            <span>{en ? 'Continue in Portrait' : 'పోర్ట్రెయిట్ మోడ్‌లోనే కొనసాగించండి'}</span>
            <ArrowForwardIcon sx={{ fontSize: 13 }} />
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
