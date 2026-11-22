import { useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import { FARE_LINKS } from '../data';
import { usePipeGameStore } from '../store';

const TWITTER_URL = 'https://twitter.com/fare_training';

// Authentic Official Brand SVG Icons
function PhoneBrandIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-white" aria-hidden="true">
      <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z" />
    </svg>
  );
}

function WhatsAppBrandIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-white" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.04 14.69 2 12.04 2ZM12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.8 7.37 7.5 3.67 12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15ZM16.57 14.39C16.32 14.27 15.1 13.67 14.87 13.58C14.65 13.5 14.48 13.46 14.32 13.7C14.16 13.95 13.68 14.51 13.54 14.68C13.39 14.84 13.25 14.86 13 14.74C12.75 14.61 11.96 14.36 11.02 13.52C10.29 12.87 9.8 12.07 9.65 11.83C9.51 11.58 9.64 11.45 9.76 11.33C9.88 11.22 10.02 11.03 10.15 10.89C10.27 10.74 10.31 10.64 10.39 10.48C10.48 10.31 10.43 10.17 10.37 10.05C10.31 9.93 9.82 8.72 9.61 8.23C9.42 7.74 9.21 7.81 9.06 7.8C8.92 7.8 8.76 7.79 8.59 7.79C8.43 7.79 8.16 7.85 7.94 8.09C7.71 8.34 7.08 8.93 7.08 10.13C7.08 11.33 7.96 12.49 8.08 12.65C8.21 12.81 9.8 15.26 12.24 16.31C12.82 16.56 13.27 16.71 13.62 16.82C14.21 17.01 14.74 16.98 15.17 16.92C15.65 16.85 16.64 16.32 16.85 15.74C17.05 15.17 17.05 14.68 16.99 14.58C16.93 14.48 16.82 14.42 16.57 14.39Z" />
    </svg>
  );
}

function WebBrandIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-white" aria-hidden="true">
      <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm7.93 9h-3.95a15.65 15.65 0 00-1.37-5.06A8.02 8.02 0 0119.93 11zM12 4.07c.88 1.45 1.54 3.19 1.88 4.93h-3.76c.34-1.74 1-3.48 1.88-4.93zM4.07 13h3.95c.1 1.77.59 3.5 1.37 5.06A8.02 8.02 0 014.07 13zm3.95-2H4.07a8.02 8.02 0 014.54-5.06A15.65 15.65 0 008.02 11zm3.98 8.93c-.88-1.45-1.54-3.19-1.88-4.93h3.76c-.34 1.74-1 3.48-1.88 4.93zm2.59-6.93H9.41a13.68 13.68 0 010-2h5.18c0 .67-.06 1.34-.18 2zm-.61 5.06c.78-1.56 1.27-3.29 1.37-5.06h3.95a8.02 8.02 0 01-5.32 5.06z" />
    </svg>
  );
}

function InstagramBrandIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-white" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function TwitterXBrandIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3 w-3 fill-white" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function ModernShareGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-white stroke-[2.2] stroke-linecap-round stroke-linejoin-round" aria-hidden="true">
      <path d="M4 12v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" y1="2" x2="12" y2="15" />
    </svg>
  );
}

interface SocialLinkItem {
  id: string;
  name: string;
  href: string;
  external: boolean;
  brandGradient: string;
  brandShadow: string;
  chipA: string;
  chipB: string;
  icon: React.ReactNode;
}

export default function FooterSection({ compact = false }: { compact?: boolean }) {
  const lang = usePipeGameStore((s) => s.lang);
  const en = lang === 'en';
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareUrl = FARE_LINKS.share;
    const shareText = en
      ? 'Fix Your Sales Funnel: Where is your sales pipeline leaking? Play this FARE simulation!'
      : 'మీ సేల్స్ ఫన్నెల్ ఎక్కడ లీక్ అవుతోంది? ఈ FARE గేమ్ ఆడి చూడండి!';

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: en ? 'Sales Funnel Game · FARE' : 'సేల్స్ ఫన్నెల్ గేమ్ · FARE',
          text: shareText,
          url: shareUrl,
        });
        return;
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') return;
      }
    }

    try {
      await navigator.clipboard?.writeText(shareUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch (_) {
      window.open(`https://wa.me/?text=${encodeURIComponent(`${shareText}\n${shareUrl}`)}`, '_blank', 'noopener,noreferrer');
    }
  };

  const socialLinks: SocialLinkItem[] = [
    {
      id: 'phone',
      name: '7674993040',
      href: 'tel:+917674993040',
      external: false,
      brandGradient: 'linear-gradient(135deg, #34D399 0%, #10B981 45%, #059669 100%)',
      brandShadow: '0 3px 8px rgba(16, 185, 129, 0.4)',
      chipA: '#34D399',
      chipB: '#059669',
      icon: <PhoneBrandIcon />,
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      href: 'https://wa.me/917674993040',
      external: true,
      brandGradient: 'linear-gradient(135deg, #25D366 0%, #20BA5A 50%, #128C7E 100%)',
      brandShadow: '0 3px 8px rgba(37, 211, 102, 0.4)',
      chipA: '#25D366',
      chipB: '#128C7E',
      icon: <WhatsAppBrandIcon />,
    },
    {
      id: 'website',
      name: en ? 'Website' : 'వెబ్‌సైట్',
      href: 'https://www.fare.training',
      external: true,
      brandGradient: 'linear-gradient(135deg, #38BDF8 0%, #0284C7 50%, #1D4ED8 100%)',
      brandShadow: '0 3px 8px rgba(2, 132, 199, 0.4)',
      chipA: '#38BDF8',
      chipB: '#1D4ED8',
      icon: <WebBrandIcon />,
    },
    {
      id: 'instagram',
      name: 'Instagram',
      href: 'https://www.instagram.com/fare.training',
      external: true,
      brandGradient:
        'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)',
      brandShadow: '0 3px 10px rgba(225, 48, 108, 0.45)',
      chipA: '#E1306C',
      chipB: '#833AB4',
      icon: <InstagramBrandIcon />,
    },
    {
      id: 'twitter',
      name: 'Twitter (X)',
      href: TWITTER_URL,
      external: true,
      brandGradient: 'linear-gradient(135deg, #27272a 0%, #18181b 50%, #000000 100%)',
      brandShadow: '0 3px 8px rgba(0, 0, 0, 0.5)',
      chipA: '#71717A',
      chipB: '#18181b',
      icon: <TwitterXBrandIcon />,
    },
  ];

  return (
    <footer className={`w-full select-none ${compact ? 'pt-2 pb-1' : 'mt-4 pt-2'}`}>
      <div className="fare-card-3d mx-auto flex w-full max-w-2xl flex-col items-center gap-3.5 rounded-[10px] px-4 py-3.5 text-center">
        {/* Share Button (Centered, Tactile 3D Feedback) */}
        <div className="flex w-full justify-center">
          <button
            type="button"
            onClick={handleShare}
            className={`group relative inline-flex cursor-pointer items-center justify-center gap-2.5 overflow-hidden rounded-full px-6 py-2.5 text-sm font-extrabold text-white transition-all duration-300 hover:scale-105 active:scale-95 ${
              copied
                ? 'bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 shadow-[0_4px_16px_rgba(16,185,129,0.45)]'
                : 'fare-share-btn shadow-[0_4px_18px_rgba(22,163,74,0.4)]'
            }`}
          >
            {/* Top specular reflection */}
            <span className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/25 to-transparent" />

            <span className="relative grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white/20 shadow-inner">
              {copied ? (
                <CheckIcon sx={{ fontSize: 15, color: '#FFFFFF' }} />
              ) : (
                <ModernShareGlyph />
              )}
            </span>

            <span className="relative tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
              {copied
                ? en
                  ? 'Link Copied!'
                  : 'లింక్ కాపీ అయింది!'
                : en
                  ? 'Share this game'
                  : 'ఈ గేమ్‌ను షేర్ చేయండి'}
            </span>
          </button>
        </div>

        {/* Divider & FARE Branding */}
        <div className="w-full border-t border-[#DBE4FA] pt-2.5 dark:border-white/10">
         {/*  <div className="mb-2.5 text-xs font-extrabold tracking-wide text-[#0B1D3A] dark:text-white">
            <span className="text-[#C99A2E]">FARE</span> · Finishing Academy for Real Estate
          </div> */}

          {/* Social Media & Contact Chips: Perfectly Equal Spacing Between All Items */}
          <div className="flex w-full flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            {socialLinks.map((item) => (
              <a
                key={item.id}
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                style={{ '--chip-a': item.chipA, '--chip-b': item.chipB } as React.CSSProperties}
                className="fare-chip fare-card-3d group inline-flex shrink-0 items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-bold text-[#0B1D3A] transition-all duration-200 hover:scale-105 active:scale-95 dark:text-slate-100"
              >
                {/* Real-time Authentic Brand Icon Badge */}
                <span
                  style={{
                    background: item.brandGradient,
                    boxShadow: item.brandShadow,
                  }}
                  className="relative grid h-5 w-5 shrink-0 place-items-center rounded-full transition-transform duration-200 group-hover:scale-110"
                >
                  <span className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.45),inset_0_-1px_1px_rgba(0,0,0,0.25)]" />
                  {item.icon}
                </span>

                {/* Brand Name */}
                <span className="leading-tight text-slate-800 transition-colors group-hover:text-black dark:text-slate-100 dark:group-hover:text-white">
                  {item.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
