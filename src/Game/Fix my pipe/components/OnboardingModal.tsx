import React, { useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import CloseIcon from '@mui/icons-material/Close';
import { Language } from '../types';

interface OnboardingModalProps {
  isOpen: boolean;
  lang: Language;
  onSubmit: (name: string, mobile: string) => void;
  onSkip: () => void;
  onCancel: () => void;
}

export default function OnboardingModal({
  isOpen,
  lang,
  onSubmit,
  onSkip,
  onCancel,
}: OnboardingModalProps) {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = name.trim();
    const cleanMob = mobile.replace(/\D/g, '');

    if (cleanName.length < 2) {
      setError(lang === 'en' ? 'Please enter a valid name (min 2 characters).' : 'దయచేసి సరైన పేరును నమోదు చేయండి.');
      return;
    }
    if (!/^[6-9]\d{9}$/.test(cleanMob)) {
      setError(lang === 'en' ? 'Please enter a valid 10-digit Indian mobile number.' : 'దయచేసి సరైన 10 అంకెల మొబైల్ నంబర్ ఇవ్వండి.');
      return;
    }

    setError('');
    onSubmit(cleanName, cleanMob);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B1D3A]/55 p-4 backdrop-blur-sm dark:bg-black/70">
      <div className="fare-card-3d relative max-h-[88vh] w-full max-w-md overflow-y-auto rounded-[10px] p-6 md:p-7">
        <button
          type="button"
          onClick={onCancel}
          aria-label={lang === 'en' ? 'Cancel' : 'రద్దు చేయండి'}
          className="fare-icon-3d absolute right-4 top-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded-[6px] bg-[#0B1D3A] text-white transition-colors hover:bg-[#DC2626] dark:bg-[#1A3463] dark:hover:bg-[#DC2626]"
        >
          <CloseIcon sx={{ fontSize: 17, color: '#FFFFFF' }} />
        </button>

        <div className="mb-6 text-center">
          <div className="fare-icon-3d mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-[8px] bg-[#0B1D3A] text-white dark:bg-[#1A3463]">
            <PersonIcon sx={{ fontSize: 22, color: '#FFFFFF' }} />
          </div>
          <h3 className="text-xl font-bold tracking-tight text-[#0B1D3A] dark:text-white md:text-2xl">
            {lang === 'en' ? 'Executive Desk Sign-In' : 'FARE TL హైరింగ్ డెస్క్'}
          </h3>
          <p className="mt-1 text-xs text-[#64748B] dark:text-slate-400">
            {lang === 'en'
              ? 'Enter your profile to log game score and unlock sales leadership insights.'
              : 'మీ లీడర్‌బోర్డ్ స్కోరు మరియు ఇన్సైట్స్ సేవ్ చేయడానికి వివరాలు నమోదు చేయండి.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-[#64748B] dark:text-slate-400">
              {lang === 'en' ? 'Full Name' : 'మీ పూర్తి పేరు'}
            </label>
            <div className="relative">
              <span className="absolute left-2.5 top-2 grid h-6 w-6 place-items-center rounded-[4px] bg-[#0B1D3A] text-white dark:bg-[#1A3463]">
                <PersonIcon sx={{ fontSize: 14, color: '#FFFFFF' }} />
              </span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={lang === 'en' ? 'e.g. Rahul Sharma' : 'ఉదా: రాజు వర్మ'}
                className="w-full rounded-[8px] border border-[#E2E8F0] bg-[#F8F9FC] py-2.5 pl-11 pr-3 text-sm text-[#0B1D3A] placeholder:text-[#94A3B8] focus:border-[#0B1D3A] focus:outline-none dark:border-white/10 dark:bg-[#071124] dark:text-white dark:placeholder:text-slate-500 dark:focus:border-[#C99A2E]"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-[#64748B] dark:text-slate-400">
              {lang === 'en' ? 'Mobile Number' : 'మొబైల్ నంబర్'}
            </label>
            <div className="relative">
              <span className="absolute left-2.5 top-2 grid h-6 w-6 place-items-center rounded-[4px] bg-[#0B1D3A] text-white dark:bg-[#1A3463]">
                <PhoneIcon sx={{ fontSize: 14, color: '#FFFFFF' }} />
              </span>
              <input
                type="tel"
                maxLength={10}
                value={mobile}
                onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                placeholder="9876543210"
                className="w-full rounded-[8px] border border-[#E2E8F0] bg-[#F8F9FC] py-2.5 pl-11 pr-3 text-sm text-[#0B1D3A] placeholder:text-[#94A3B8] focus:border-[#0B1D3A] focus:outline-none dark:border-white/10 dark:bg-[#071124] dark:text-white dark:placeholder:text-slate-500 dark:focus:border-[#C99A2E]"
              />
            </div>
          </div>

          {error && <p className="rounded-[6px] border border-rose-200 bg-rose-50 p-2.5 text-xs text-rose-700 dark:border-rose-500/20 dark:bg-rose-950/30 dark:text-rose-400">{error}</p>}

          <button
            type="submit"
            className="flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-[8px] bg-gradient-to-br from-[#0B1D3A] to-[#1A3463] px-5 py-4 text-base font-bold text-white shadow-[0_3px_0_#071429] transition hover:brightness-110 active:scale-[0.99]"
          >
            <span>{lang === 'en' ? 'Start Pipeline Simulation' : 'ఆట ప్రారంభించండి'}</span>
            <ArrowForwardIcon sx={{ fontSize: 20, color: '#FFFFFF' }} />
          </button>

          <button
            type="button"
            onClick={onSkip}
            className="fare-card-3d fare-guest-btn w-full cursor-pointer rounded-[8px] py-2.5 text-[13px] font-semibold text-[#0B1D3A] transition-all dark:text-white"
          >
            {lang === 'en' ? 'Guest Mode' : 'నేరుగా ఆడండి'}
          </button>
        </form>

        <div className="mt-4 flex items-center justify-center gap-2 border-t border-[#E2E8F0] pt-4 text-[11px] text-[#64748B] dark:border-white/10 dark:text-slate-400">
          <span className="fare-icon-3d grid h-4 w-4 place-items-center rounded-[4px] bg-[#16A34A] text-white">
            <VerifiedUserIcon sx={{ fontSize: 11, color: '#FFFFFF' }} />
          </span>
          <span>{lang === 'en' ? 'Privacy guaranteed. Zero spam.' : 'మీ సమాచారం సురక్షితం.'}</span>
        </div>
      </div>
    </div>
  );
}
