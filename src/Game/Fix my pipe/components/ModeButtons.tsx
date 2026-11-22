import { Users3DIcon, Gear3DIcon } from './Icons3D';
import BigButton from './BigButton';
import { usePipeGameStore } from '../store';

export default function ModeButtons({ stacked = false }: { stacked?: boolean }) {
  const { lang, startOrPrompt } = usePipeGameStore();
  return (
    <div className={`grid gap-3 ${stacked ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2 md:gap-4'}`}>
      <BigButton
        tone="navy"
        iconNode={<Users3DIcon size={24} />}
        title={lang === 'en' ? 'Hire The Right Person' : 'సరైన వ్యక్తిని నియమించండి'}
        subtitle={lang === 'en' ? 'Candidates to interview' : 'ఇంటర్వ్యూ చేయాల్సిన అభ్యర్థులు'}
        onClick={() => startOrPrompt(1)}
      />
      <BigButton
        tone="green"
        iconNode={<Gear3DIcon size={24} />}
        title={lang === 'en' ? 'Fix The Process' : 'ప్రాసెస్‌ను సరిచేయండి'}
        subtitle={lang === 'en' ? 'Ideas to implement' : 'అమలు చేయాల్సిన ఐడియాలు'}
        onClick={() => startOrPrompt(2)}
      />
    </div>
  );
}
