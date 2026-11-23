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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B1D3A]/55 p-2 sm:p-4 backdrop-blur-sm dark:bg-black/70">
      <div className="fare-card-3d relative max-h-[94dvh] w-full max-w-[275px] xs:max-w-[295px] sm:max-w-[360px] overflow-y-auto rounded-[8px] sm:rounded-[10px] p-2.5 sm:p-5 md:p-6">
        <button
          type="button"
          onClick={onCancel}
          aria-label={lang === 'en' ? 'Cancel' : 'రద్దు చేయండి'}
          className="fare-icon-3d absolute right-2 top-2 sm:right-3.5 sm:top-3.5 flex h-5 w-5 sm:h-7 sm:w-7 cursor-pointer items-center justify-center rounded-[4px] sm:rounded-[6px] bg-[#0B1D3A] text-white transition-colors hover:bg-[#DC2626] dark:bg-[#1A3463] dark:hover:bg-[#DC2626]"
        >
          <CloseIcon sx={{ fontSize: { xs: 11, sm: 16 }, color: '#FFFFFF' }} />
        </button>

        <div className="mb-2 sm:mb-4 text-center">
          <div className="fare-icon-3d mx-auto mb-1 sm:mb-2 flex h-6 w-6 sm:h-9 sm:w-9 items-center justify-center rounded-[5px] sm:rounded-[8px] bg-[#0B1D3A] text-white dark:bg-[#1A3463]">
            <PersonIcon sx={{ fontSize: { xs: 12, sm: 18 }, color: '#FFFFFF' }} />
          </div>
          <h3 className="text-[12.5px] xs:text-[13px] sm:text-lg md:text-xl font-bold tracking-tight text-[#0B1D3A] dark:text-white">
            {lang === 'en' ? 'Executive Desk Sign-In' : 'FARE TL హైరింగ్ డెస్క్'}
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-1.5 sm:space-y-3.5">
          <div>
            <label className="mb-0.5 sm:mb-1 block text-[8px] sm:text-[10.5px] font-bold uppercase tracking-wider text-[#64748B] dark:text-slate-400">
              {lang === 'en' ? 'Full Name' : 'మీ పూర్తి పేరు'}
            </label>
            <div className="relative">
              <span className="absolute left-1.5 top-1 sm:left-2.5 sm:top-2 grid h-4 w-4 sm:h-5 sm:w-5 place-items-center rounded-[2.5px] sm:rounded-[4px] bg-[#0B1D3A] text-white dark:bg-[#1A3463]">
                <PersonIcon sx={{ fontSize: { xs: 9.5, sm: 13 }, color: '#FFFFFF' }} />
              </span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={lang === 'en' ? 'e.g. Rahul Sharma' : 'ఉదా: రాజు వర్మ'}
                className="w-full rounded-[5px] sm:rounded-[8px] border border-[#E2E8F0] bg-[#F8F9FC] py-1 sm:py-2 pl-6.5 sm:pl-9 pr-2 sm:pr-3 text-[10px] xs:text-[10.5px] sm:text-xs md:text-sm text-[#0B1D3A] placeholder:text-[#94A3B8] focus:border-[#0B1D3A] focus:outline-none dark:border-white/10 dark:bg-[#071124] dark:text-white dark:placeholder:text-slate-500 dark:focus:border-[#C99A2E]"
              />
            </div>
          </div>

          <div>
            <label className="mb-0.5 sm:mb-1 block text-[8px] sm:text-[10.5px] font-bold uppercase tracking-wider text-[#64748B] dark:text-slate-400">
              {lang === 'en' ? 'Mobile Number' : 'మొబైల్ నంబర్'}
            </label>
            <div className="relative">
              <span className="absolute left-1.5 top-1 sm:left-2.5 sm:top-2 grid h-4 w-4 sm:h-5 sm:w-5 place-items-center rounded-[2.5px] sm:rounded-[4px] bg-[#0B1D3A] text-white dark:bg-[#1A3463]">
                <PhoneIcon sx={{ fontSize: { xs: 9.5, sm: 13 }, color: '#FFFFFF' }} />
              </span>
              <input
                type="tel"
                maxLength={10}
                value={mobile}
                onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                placeholder="9876543210"
                className="w-full rounded-[5px] sm:rounded-[8px] border border-[#E2E8F0] bg-[#F8F9FC] py-1 sm:py-2 pl-6.5 sm:pl-9 pr-2 sm:pr-3 text-[10px] xs:text-[10.5px] sm:text-xs md:text-sm text-[#0B1D3A] placeholder:text-[#94A3B8] focus:border-[#0B1D3A] focus:outline-none dark:border-white/10 dark:bg-[#071124] dark:text-white dark:placeholder:text-slate-500 dark:focus:border-[#C99A2E]"
              />
            </div>
          </div>

          {error && <p className="rounded-[4px] sm:rounded-[6px] border border-rose-200 bg-rose-50 p-1 sm:p-2 text-[9px] sm:text-xs text-rose-700 dark:border-rose-500/20 dark:bg-rose-950/30 dark:text-rose-400">{error}</p>}

          <button
            type="submit"
            className="flex w-full cursor-pointer items-center justify-center gap-1 sm:gap-2 rounded-[5px] sm:rounded-[8px] bg-gradient-to-br from-[#0B1D3A] to-[#1A3463] px-2.5 py-1.5 sm:px-4 sm:py-3 text-[10.5px] sm:text-sm md:text-base font-bold text-white shadow-[0_2px_0_#071429] sm:shadow-[0_3px_0_#071429] transition hover:brightness-110 active:scale-[0.99]"
          >
            <span>{lang === 'en' ? 'Start Pipeline Simulation' : 'ఆట ప్రారంభించండి'}</span>
            <ArrowForwardIcon sx={{ fontSize: { xs: 12, sm: 18 }, color: '#FFFFFF' }} />
          </button>

          <button
            type="button"
            onClick={onSkip}
            className="fare-card-3d fare-guest-btn w-full cursor-pointer rounded-[5px] sm:rounded-[8px] py-1 sm:py-2 text-[9.5px] sm:text-[13px] font-semibold text-[#0B1D3A] transition-all dark:text-white"
          >
            {lang === 'en' ? 'Guest Mode' : 'నేరుగా ఆడండి'}
          </button>
        </form>

        <div className="mt-1.5 sm:mt-3 flex items-center justify-center gap-1 sm:gap-1.5 border-t border-[#E2E8F0] pt-1.5 sm:pt-3 text-[8px] sm:text-[10.5px] text-[#64748B] dark:border-white/10 dark:text-slate-400">
          <span className="fare-icon-3d grid h-2.5 w-2.5 sm:h-3.5 sm:w-3.5 place-items-center rounded-[2px] sm:rounded-[3px] bg-[#16A34A] text-white">
            <VerifiedUserIcon sx={{ fontSize: { xs: 7, sm: 10 }, color: '#FFFFFF' }} />
          </span>
          <span>{lang === 'en' ? 'Privacy guaranteed. Zero spam.' : 'మీ సమాచారం సురక్షితం.'}</span>
        </div>
      </div>
    </div>
  );
}
