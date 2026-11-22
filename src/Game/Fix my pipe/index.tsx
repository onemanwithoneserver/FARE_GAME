import { useState, useEffect } from 'react';
import DesktopView from './desktop';
import MobileView from './mobile';
import RotatePrompt from './components/RotatePrompt';

export { SoundEngine, soundEngine, encodeWav, renderSongWav, exportSongWav } from './sound';
export { usePipeGameStore } from './store';

export default function FixMyPipeGame() {
  const [isPortraitMobile, setIsPortraitMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    const isPortrait = window.innerHeight > window.innerWidth;
    const isSmallOrTouch =
      window.innerWidth < 900 ||
      ('ontouchstart' in window && (window.innerWidth < 1024 || window.innerHeight < 1024));
    return isPortrait && isSmallOrTouch;
  });
  const [allowPortrait, setAllowPortrait] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      if (typeof window === 'undefined') return;
      const isPortrait = window.innerHeight > window.innerWidth;
      const isSmallOrTouch =
        window.innerWidth < 900 ||
        ('ontouchstart' in window && (window.innerWidth < 1024 || window.innerHeight < 1024));

      const portraitDevice = isPortrait && isSmallOrTouch;
      setIsPortraitMobile(portraitDevice);

      // Reset allowPortrait if user rotates to landscape
      if (!isPortrait) {
        setAllowPortrait(false);
      }
    };

    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);

    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);

  const showPortraitMobile = isPortraitMobile && allowPortrait;

  return (
    <>
      <RotatePrompt onDismiss={() => setAllowPortrait(true)} />
      {showPortraitMobile ? <MobileView /> : <DesktopView />}
    </>
  );
}
