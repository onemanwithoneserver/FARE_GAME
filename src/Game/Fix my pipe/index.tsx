import { useState, useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import DesktopView from './desktop/index';
import MobileView from './mobile/index';
import RotatePrompt from './components/RotatePrompt';

export { SoundEngine, soundEngine, encodeWav, renderSongWav, exportSongWav } from './sound';
export { usePipeGameStore } from './store';
export { default as DesktopView } from './desktop/index';
export { default as MobileView } from './mobile/index';

function detectMobileViewport(): boolean {
  if (typeof window === 'undefined') return false;
  const w = window.innerWidth;
  const h = window.innerHeight;
  // Mobile portrait (narrow width) OR mobile landscape (short height on phone/phablet)
  const isMobilePortrait = w < 768;
  const isMobileLandscape = h <= 520 && w <= 1024;
  return isMobilePortrait || isMobileLandscape;
}

export default function FixMyPipeGame() {
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const viewParam = searchParams.get('view')?.toLowerCase();
  const isDesktopRoute = location.pathname.includes('/desktop') || viewParam === 'desktop';
  const isMobileRoute = location.pathname.includes('/mobile') || viewParam === 'mobile';

  const [isMobileDevice, setIsMobileDevice] = useState<boolean>(detectMobileViewport);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileDevice(detectMobileViewport());
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  // Explicit route/query override takes priority
  if (isDesktopRoute) {
    return <DesktopView />;
  }
  if (isMobileRoute) {
    return <MobileView />;
  }

  return (
    <>
      <RotatePrompt />
      {isMobileDevice ? <MobileView /> : <DesktopView />}
    </>
  );
}
