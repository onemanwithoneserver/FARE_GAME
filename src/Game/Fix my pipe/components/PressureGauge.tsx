import SpeedIcon from '@mui/icons-material/Speed';
import { Bolt3DIcon } from './Icons3D';
import { Language } from '../types';

interface PressureGaugeProps {
  leakLevel: number;
  score: number;
  combo: number;
  lang: Language;
}

export default function PressureGauge({ leakLevel, score, combo, lang }: PressureGaugeProps) {
  const pressurePct = Math.round(Math.max(10, (1 - leakLevel) * 100));
  const isHealthy = pressurePct >= 80;
  const isCritical = pressurePct < 40;

  return (
    <div className="fare-card-3d flex items-center justify-between gap-4 rounded-[10px] p-4">
      <div className="flex items-center gap-3">
        <div className="relative flex h-12 w-12 items-center justify-center">
          <svg className="h-12 w-12 -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-[#E2E8F0] dark:text-white/10"
              strokeWidth="3.5"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className={`transition-all duration-500 ${
                isHealthy ? 'text-[#16A34A]' : isCritical ? 'text-[#DC2626]' : 'text-[#C99A2E]'
              }`}
              strokeDasharray={`${pressurePct}, 100`}
              strokeWidth="3.5"
              strokeLinecap="round"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`fare-icon-3d grid h-7 w-7 place-items-center rounded-full text-white ${isHealthy ? 'bg-[#16A34A]' : isCritical ? 'bg-[#DC2626]' : 'bg-[#0B1D3A] dark:bg-[#1A3463]'}`}>
              <SpeedIcon sx={{ fontSize: 15, color: '#FFFFFF' }} />
            </span>
          </div>
        </div>
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#C99A2E]">
            {lang === 'en' ? 'Funnel Pressure' : 'పైప్‌లైన్ ప్రెషర్'}
          </div>
          <div className="text-xs font-semibold text-[#0B1D3A] dark:text-slate-100">
            {isHealthy
              ? lang === 'en' ? 'Sealed & Converting' : 'పూర్తిగా సీల్ అయింది'
              : isCritical
              ? lang === 'en' ? 'Heavy Revenue Leak' : 'తీవ్రమైన డ్రాప్-ఆఫ్'
              : lang === 'en' ? 'Partial Flow' : 'కొంత ప్రవాహం'}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 text-right">
        {combo > 1 && (
          <div className="fare-icon-3d flex items-center gap-1 rounded-[5px] bg-[#C99A2E] px-2 py-0.5 text-[11px] font-bold text-white">
            <Bolt3DIcon size={12} />
            <span>{combo}x</span>
          </div>
        )}
        <div>
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] dark:text-slate-400">
            {lang === 'en' ? 'SCORE' : 'స్కోరు'}
          </div>
          <div className="font-mono text-xl font-black tracking-tight text-[#0B1D3A] dark:text-white tabular-nums">
            {score.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}
