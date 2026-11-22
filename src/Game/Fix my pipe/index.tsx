import { useState, useEffect } from 'react';
import DesktopView from './desktop';
import MobileView from './mobile';

export { SoundEngine, soundEngine, encodeWav, renderSongWav, exportSongWav } from './sound';
export { usePipeGameStore } from './store';

export default function FixMyPipeGame() {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return isMobile ? <MobileView /> : <DesktopView />;
}
