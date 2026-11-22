import { memo, useMemo } from 'react';
import { usePipeGameStore } from '../store';

function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const Skyline = memo(function Skyline({ seed, color, minH, maxH, className }: { seed: number; color: string; minH: number; maxH: number; className: string }) {
  const buildings = useMemo(() => {
    const r = rng(seed);
    const b: { x: number; w: number; h: number }[] = [];
    let x = -10;
    while (x < 1610) {
      const bw = 44 + r() * 76;
      const bh = minH + r() * (maxH - minH);
      b.push({ x, w: bw, h: bh });
      x += bw + 4 + r() * 10;
    }
    return b;
  }, [seed, minH, maxH]);

  return (
    <svg viewBox="0 0 1600 400" preserveAspectRatio="xMidYMax slice" className={className} aria-hidden>
      {buildings.map((b, i) => (
        <rect key={i} x={b.x} y={400 - b.h} width={b.w} height={b.h} fill={color} rx={2} />
      ))}
    </svg>
  );
});

export default function Backdrop({ compact = false }: { compact?: boolean }) {
  const isDark = usePipeGameStore((s) => s.theme === 'dark');

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
      <div className={`absolute inset-0 transition-colors duration-200 ${isDark ? 'fare-surface-dark' : 'fare-surface-light'}`} />
      <div
        className="absolute inset-0 opacity-[0.045] dark:opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(${isDark ? '#fff' : '#0B1D3A'} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? '#fff' : '#0B1D3A'} 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />
      <div className={`absolute inset-x-0 ${compact ? 'bottom-[15%] h-[24%]' : 'bottom-[21%] h-[32%]'}`}>
        <Skyline
          seed={23}
          color={isDark ? '#0D1B35' : '#E8EEF7'}
          minH={90}
          maxH={250}
          className="absolute inset-0 h-full w-full"
        />
      </div>
      <div className={`absolute inset-x-0 bottom-0 ${compact ? 'h-[15%]' : 'h-[21%]'} fare-floor`} />
      <div className={`absolute inset-x-0 ${compact ? 'bottom-[15%]' : 'bottom-[21%]'} h-px ${isDark ? 'bg-white/10' : 'bg-[#E2E8F0]'}`} />
    </div>
  );
}
