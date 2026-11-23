import { CSSProperties, useId } from 'react';

interface Icon3DProps {
  size?: number;
  className?: string;
  style?: CSSProperties;
}

export function Target3DIcon({ size = 56, className = '', style }: Icon3DProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" className={className} style={style} aria-hidden>
      <defs>
        <radialGradient id="t3d-rim" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FF5252" />
          <stop offset="60%" stopColor="#E11D48" />
          <stop offset="100%" stopColor="#881337" />
        </radialGradient>
        <radialGradient id="t3d-white" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="75%" stopColor="#F1F5F9" />
          <stop offset="100%" stopColor="#CBD5E1" />
        </radialGradient>
        <linearGradient id="t3d-dart" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="50%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#1E3A8A" />
        </linearGradient>
        <filter id="t3d-shadow" x="-20%" y="-20%" width="145%" height="145%">
          <feDropShadow dx="1.5" dy="4" stdDeviation="2.5" floodColor="#0B1D3A" floodOpacity="0.28" />
        </filter>
      </defs>

      <g filter="url(#t3d-shadow)">
        {/* 3D Extruded Red Rim Depth */}
        <circle cx="38" cy="44" r="30" fill="#7F1D1D" />
        {/* Outer Red Ring */}
        <circle cx="37" cy="40" r="30" fill="url(#t3d-rim)" />
        {/* White Ring */}
        <circle cx="37" cy="40" r="22.5" fill="url(#t3d-white)" />
        {/* Inner Red Ring */}
        <circle cx="37" cy="40" r="15" fill="url(#t3d-rim)" />
        {/* Inner White Ring */}
        <circle cx="37" cy="40" r="8.5" fill="url(#t3d-white)" />
        {/* Center Bullseye */}
        <circle cx="37" cy="40" r="4.2" fill="#B91C1C" />
      </g>

      {/* 3D Blue Dart stuck in Bullseye */}
      <g filter="url(#t3d-shadow)">
        {/* Dart Shaft */}
        <path d="M37 40 L63 14" stroke="#1E40AF" strokeWidth="4.8" strokeLinecap="round" />
        <path d="M37 40 L63 14" stroke="url(#t3d-dart)" strokeWidth="3.4" strokeLinecap="round" />
        {/* Upper Fletching Fin */}
        <path d="M53 24 L52 10 L65 12 L59 18 Z" fill="#3B82F6" stroke="#1E3A8A" strokeWidth="0.6" />
        {/* Lower Fletching Fin */}
        <path d="M56 21 L68 15 L70 28 L59 24 Z" fill="#1D4ED8" stroke="#1E3A8A" strokeWidth="0.6" />
        {/* Dart Tail Tip */}
        <circle cx="64.5" cy="12.5" r="2" fill="#1E3A8A" />
      </g>
    </svg>
  );
}

export function Users3DIcon({ size = 28, className = '' }: Icon3DProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" className={className} aria-hidden>
      <defs>
        <linearGradient id="u3d-main" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="65%" stopColor="#E2E8F0" />
          <stop offset="100%" stopColor="#94A3B8" />
        </linearGradient>
        <linearGradient id="u3d-side" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F8FAFC" />
          <stop offset="100%" stopColor="#CBD5E1" />
        </linearGradient>
      </defs>
      {/* Back side silhouettes */}
      <circle cx="10.5" cy="14" r="4.2" fill="url(#u3d-side)" opacity="0.88" />
      <path d="M3.5 31 C3.5 24 7 21 10.5 21 C14 21 17 24 17 31 Z" fill="url(#u3d-side)" opacity="0.88" />
      <circle cx="29.5" cy="14" r="4.2" fill="url(#u3d-side)" opacity="0.88" />
      <path d="M23 31 C23 24 26 21 29.5 21 C33 21 36.5 24 36.5 31 Z" fill="url(#u3d-side)" opacity="0.88" />
      {/* Center lead silhouette with 3D rim */}
      <circle cx="20" cy="12.8" r="5.3" fill="#64748B" opacity="0.35" transform="translate(0,1.2)" />
      <circle cx="20" cy="12.5" r="5.3" fill="url(#u3d-main)" />
      <path d="M10.5 33.5 C10.5 25 14.5 21.5 20 21.5 C25.5 21.5 29.5 25 29.5 33.5 Z" fill="#64748B" opacity="0.35" transform="translate(0,1.4)" />
      <path d="M10.5 33 C10.5 24.5 14.5 21 20 21 C25.5 21 29.5 24.5 29.5 33 Z" fill="url(#u3d-main)" />
    </svg>
  );
}

export function Wrench3DIcon({ size = 28, className = '' }: Icon3DProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" className={className} aria-hidden>
      <defs>
        <linearGradient id="w3d-metal" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="35%" stopColor="#F8FAFC" />
          <stop offset="70%" stopColor="#CBD5E1" />
          <stop offset="100%" stopColor="#94A3B8" />
        </linearGradient>
      </defs>
      {/* 3D Depth Layer */}
      <g transform="translate(2.8, 3.6) scale(1.48)" fill="#064E3B" opacity="0.4">
        <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z" />
      </g>
      {/* Main 3D Metallic Tool */}
      <g transform="translate(2, 2.2) scale(1.48)">
        <path
          d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"
          fill="url(#w3d-metal)"
        />
        {/* Specular Ridge / Highlight Along Shank */}
        <line x1="10.8" y1="12.2" x2="19.5" y2="20.8" stroke="#FFFFFF" strokeWidth="0.9" strokeLinecap="round" opacity="0.9" />
        <line x1="11.6" y1="13.2" x2="18.8" y2="20.2" stroke="#94A3B8" strokeWidth="0.7" strokeLinecap="round" opacity="0.5" />
      </g>
    </svg>
  );
}

export function Lightbulb3DIcon({ size = 28, className = '' }: Icon3DProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" className={className} aria-hidden>
      <defs>
        <radialGradient id="lb-glow" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="50%" stopColor="#FEF08A" />
          <stop offset="100%" stopColor="#EAB308" />
        </radialGradient>
      </defs>
      {/* 3D Drop Shadow */}
      <g transform="translate(0.8, 1.6)" fill="#064E3B" opacity="0.35">
        <path d="M20 5 C13.4 5 8 10.4 8 17 C8 21.1 10.2 24.6 13.5 26.6 V30 C13.5 30.8 14.2 31.5 15 31.5 H25 C25.8 31.5 26.5 30.8 26.5 30 V26.6 C29.8 24.6 32 21.1 32 17 C32 10.4 26.6 5 20 5 Z" />
      </g>
      {/* Glass Bulb */}
      <path
        d="M20 5 C13.4 5 8 10.4 8 17 C8 21.1 10.2 24.6 13.5 26.6 V30 C13.5 30.8 14.2 31.5 15 31.5 H25 C25.8 31.5 26.5 30.8 26.5 30 V26.6 C29.8 24.6 32 21.1 32 17 C32 10.4 26.6 5 20 5 Z"
        fill="url(#lb-glow)"
      />
      {/* Screw Base */}
      <rect x="15" y="32" width="10" height="2" rx="0.8" fill="#CBD5E1" />
      <rect x="16.5" y="34.5" width="7" height="1.8" rx="0.8" fill="#94A3B8" />
      {/* Filament Accent */}
      <path d="M17 19 L19 13 H21 L23 19" fill="none" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Gear3DIcon({ size = 28, className = '' }: Icon3DProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" className={className} aria-hidden>
      <defs>
        <linearGradient id="g3d-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="60%" stopColor="#E2E8F0" />
          <stop offset="100%" stopColor="#94A3B8" />
        </linearGradient>
      </defs>
      {/* 3D depth layer */}
      <g transform="translate(0.8,1.8)" fill="#064E3B" opacity="0.35">
        <path d="M17.2 4.5 H22.8 L23.6 8.3 C24.8 8.7 25.9 9.3 26.9 10.1 L30.5 8.5 L33.5 13.7 L30.4 16.2 C30.6 17.4 30.6 18.6 30.4 19.8 L33.5 22.3 L30.5 27.5 L26.9 25.9 C25.9 26.7 24.8 27.3 23.6 27.7 L22.8 31.5 H17.2 L16.4 27.7 C15.2 27.3 14.1 26.7 13.1 25.9 L9.5 27.5 L6.5 22.3 L9.6 19.8 C9.4 18.6 9.4 17.4 9.6 16.2 L6.5 13.7 L9.5 8.5 L13.1 10.1 C14.1 9.3 15.2 8.7 16.4 8.3 Z" />
      </g>
      <path
        d="M17.2 4.5 H22.8 L23.6 8.3 C24.8 8.7 25.9 9.3 26.9 10.1 L30.5 8.5 L33.5 13.7 L30.4 16.2 C30.6 17.4 30.6 18.6 30.4 19.8 L33.5 22.3 L30.5 27.5 L26.9 25.9 C25.9 26.7 24.8 27.3 23.6 27.7 L22.8 31.5 H17.2 L16.4 27.7 C15.2 27.3 14.1 26.7 13.1 25.9 L9.5 27.5 L6.5 22.3 L9.6 19.8 C9.4 18.6 9.4 17.4 9.6 16.2 L6.5 13.7 L9.5 8.5 L13.1 10.1 C14.1 9.3 15.2 8.7 16.4 8.3 Z"
        fill="url(#g3d-body)"
      />
      <circle cx="20" cy="18" r="5.5" fill="#16A34A" />
      <circle cx="20" cy="18" r="3.4" fill="#FFFFFF" opacity="0.9" />
    </svg>
  );
}

export function Trophy3DIcon({ size = 24, className = '' }: Icon3DProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" className={className} aria-hidden>
      <defs>
        <linearGradient id="tr3d" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="65%" stopColor="#F1F5F9" />
          <stop offset="100%" stopColor="#CBD5E1" />
        </linearGradient>
      </defs>
      <path d="M9 9 H6 C5 9 4.5 10 4.5 11.5 C4.5 14.5 6.8 17 10 17" fill="none" stroke="url(#tr3d)" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M27 9 H30 C31 9 31.5 10 31.5 11.5 C31.5 14.5 29.2 17 26 17" fill="none" stroke="url(#tr3d)" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M10 7 H26 V15.5 C26 20 22.4 23 18 23 C13.6 23 10 20 10 15.5 Z" fill="url(#tr3d)" />
      <rect x="16.2" y="22.5" width="3.6" height="4.8" fill="#CBD5E1" />
      <rect x="11.5" y="27" width="13" height="3.2" rx="1.4" fill="url(#tr3d)" />
    </svg>
  );
}

export function Star3DIcon({ size = 18, className = '' }: Icon3DProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden>
      <defs>
        <linearGradient id="s3d" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="70%" stopColor="#FEF3C7" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
      </defs>
      <path
        d="M12 2.4 L14.9 8.3 L21.4 9.2 L16.7 13.8 L17.8 20.3 L12 17.2 L6.2 20.3 L7.3 13.8 L2.6 9.2 L9.1 8.3 Z"
        fill="url(#s3d)"
      />
    </svg>
  );
}

export function Timer3DIcon({ size = 18, className = '' }: Icon3DProps) {
  const uid = useId();
  const bodyGrad = `${uid}-tm-body`;
  const rimGrad = `${uid}-tm-rim`;
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden>
      <defs>
        <linearGradient id={bodyGrad} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="70%" stopColor="#F1F5F9" />
          <stop offset="100%" stopColor="#CBD5E1" />
        </linearGradient>
        <linearGradient id={rimGrad} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#94A3B8" />
        </linearGradient>
      </defs>
      {/* Subtle 3D underside drop shadow */}
      <circle cx="16" cy="19.2" r="10.4" fill="#0B1D3A" opacity="0.28" />
      {/* Top stopwatch crown & stem */}
      <rect x="13.8" y="4.2" width="4.4" height="3.8" rx="0.8" fill={`url(#${rimGrad})`} />
      <rect x="11.5" y="2.2" width="9" height="2.6" rx="1.3" fill="#FFFFFF" />
      {/* Side angled pusher button */}
      <path d="M23.2 8.4 L25.6 6.2 L27.2 7.8 L24.8 10 Z" fill="#E2E8F0" />
      {/* Main 3D pearl-white clock case */}
      <circle cx="16" cy="18" r="10.4" fill={`url(#${bodyGrad})`} />
      {/* Recessed inner clock dial */}
      <circle cx="16" cy="18" r="7.8" fill="#FFFFFF" />
      <circle cx="16" cy="18" r="7.8" fill="none" stroke="#CBD5E1" strokeWidth="1" />
      {/* Crisp high-contrast hands */}
      <path
        d="M16 12.2 V18 L20.2 20.6"
        stroke="#0B1D3A"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Center pivot */}
      <circle cx="16" cy="18" r="1.5" fill="#2563EB" />
    </svg>
  );
}

export function Layers3DIcon({ size = 18, className = '' }: Icon3DProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M12 3 L21 7.8 L12 12.6 L3 7.8 Z" fill="#FFFFFF" />
      <path d="M3 12 L12 16.8 L21 12" fill="none" stroke="#E2E8F0" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 16.2 L12 21 L21 16.2" fill="none" stroke="#CBD5E1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Check3DIcon({ size = 16, className = '' }: Icon3DProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M5.5 12.5 L10 17 L18.5 7.5" fill="none" stroke="#FFFFFF" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Cross3DIcon({ size = 16, className = '' }: Icon3DProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M7 7 L17 17 M17 7 L7 17" stroke="#FFFFFF" strokeWidth="3.2" strokeLinecap="round" />
    </svg>
  );
}

export function Bolt3DIcon({ size = 16, className = '' }: Icon3DProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M13 2 L4.5 13.5 H11.5 L10.5 22 L19.5 10.5 H12.5 Z" fill="#FFFFFF" />
    </svg>
  );
}

export function Vault3DIcon({ size = 40, className = '' }: Icon3DProps) {
  const uid = useId();
  const bodyGrad = `${uid}-v-body`;
  const doorGrad = `${uid}-v-door`;
  const goldGrad = `${uid}-v-gold`;
  const shadowId = `${uid}-v-sh`;
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className={className} aria-hidden>
      <defs>
        <linearGradient id={bodyGrad} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="55%" stopColor="#1E3A8A" />
          <stop offset="100%" stopColor="#0B1D3A" />
        </linearGradient>
        <linearGradient id={doorGrad} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="65%" stopColor="#E2E8F0" />
          <stop offset="100%" stopColor="#CBD5E1" />
        </linearGradient>
        <linearGradient id={goldGrad} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="50%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>
        <filter id={shadowId} x="-20%" y="-20%" width="145%" height="145%">
          <feDropShadow dx="1.5" dy="3.5" stdDeviation="2.2" floodColor="#0B1D3A" floodOpacity="0.26" />
        </filter>
      </defs>

      <g filter={`url(#${shadowId})`}>
        {/* 3D extruded bottom base & feet */}
        <rect x="13" y="49" width="8" height="5" rx="2" fill="#0B1D3A" />
        <rect x="41" y="49" width="8" height="5" rx="2" fill="#0B1D3A" />
        {/* 3D depth shell */}
        <rect x="10" y="13" width="44" height="39" rx="9" fill="#071429" />
        {/* Main sculpted royal-blue vault body */}
        <rect x="9" y="10" width="44" height="39" rx="9" fill={`url(#${bodyGrad})`} />
        {/* Recessed bright pearl-white door */}
        <rect x="15" y="16" width="32" height="27" rx="5.5" fill={`url(#${doorGrad})`} />
        {/* Hinge accents */}
        <rect x="12.5" y="20" width="3.5" height="6" rx="1.5" fill={`url(#${goldGrad})`} />
        <rect x="12.5" y="33" width="3.5" height="6" rx="1.5" fill={`url(#${goldGrad})`} />
        {/* Center vault lock dial */}
        <circle cx="31" cy="29.5" r="8.5" fill="#1E3A8A" />
        <circle cx="31" cy="29.5" r="6.2" fill={`url(#${goldGrad})`} />
        <circle cx="31" cy="29.5" r="2.6" fill="#0B1D3A" />
      </g>

      {/* 3D Golden Key / Arrow Stick locked into vault dial */}
      <g filter={`url(#${shadowId})`}>
        <path d="M31 29.5 L53 8.5" stroke="#92400E" strokeWidth="5.2" strokeLinecap="round" />
        <path d="M31 29.5 L53 8.5" stroke={`url(#${goldGrad})`} strokeWidth="3.6" strokeLinecap="round" />
        <circle cx="53.5" cy="8" r="5" fill={`url(#${goldGrad})`} stroke="#92400E" strokeWidth="1" />
        <circle cx="53.5" cy="8" r="2" fill="#FFFBEB" />
      </g>
    </svg>
  );
}
