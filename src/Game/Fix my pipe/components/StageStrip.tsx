import GroupsIcon from '@mui/icons-material/Groups';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PublicIcon from '@mui/icons-material/Public';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HandshakeIcon from '@mui/icons-material/Handshake';
import { STAGES } from '../data';
import type { Language } from '../types';

const ICONS = [GroupsIcon, PersonAddIcon, PublicIcon, ShoppingCartIcon, HandshakeIcon];

export default function StageStrip({ lang, leakStage, fixed }: { lang: Language; leakStage: number | null; fixed: boolean }) {
  return (
    <div className="grid grid-cols-5 gap-1.5">
      {STAGES.map((st, i) => {
        const Icon = ICONS[i];
        const isLeak = leakStage === i;
        return (
          <div
            key={st.id}
            className={`flex flex-col items-center gap-0.5 rounded-[6px] border px-1 py-1.5 text-center ${
              isLeak ? (fixed ? 'ring-2 ring-emerald-500' : 'ring-2 ring-rose-500') : ''
            }`}
            style={{ background: st.color, borderColor: 'rgba(255,255,255,0.18)' }}
          >
            <Icon sx={{ fontSize: 15, color: '#FFFFFF' }} />
            <span className="w-full truncate text-[9px] font-bold leading-tight text-white">{st.name[lang]}</span>
          </div>
        );
      })}
    </div>
  );
}
