import React, { useEffect } from 'react';
import {
  HashRouter,
  Routes,
  Route,
  Navigate,
  useParams,
  useSearchParams,
  useNavigate,
} from 'react-router-dom';
import FixMyPipeGame from '@/Game/Fix my pipe';
import { usePipeGameStore } from '@/Game/Fix my pipe/store';
import type { Theme } from '@/Game/Fix my pipe/types';

function FixMyPipeRoute() {
  const { themeParam } = useParams<{ themeParam?: string }>();
  const [searchParams] = useSearchParams();
  const theme = usePipeGameStore((s) => s.theme);
  const setTheme = usePipeGameStore((s) => s.setTheme);
  const navigate = useNavigate();

  // Synchronize route & query parameter with store theme
  useEffect(() => {
    // 0. Dedicated view route (desktop / mobile)
    if (themeParam === 'desktop' || themeParam === 'mobile') {
      return;
    }

    // 1. Path parameter: /fix-my-pipe/dark or /fix-my-pipe/light
    if (themeParam === 'dark' || themeParam === 'light') {
      if (theme !== themeParam) {
        setTheme(themeParam);
      }
      return;
    }

    // 2. Query parameter: /fix-my-pipe?theme=dark or ?theme=light
    const queryTheme = searchParams.get('theme') as Theme | null;
    if (queryTheme === 'dark' || queryTheme === 'light') {
      if (theme !== queryTheme) {
        setTheme(queryTheme);
      }
      return;
    }

    // 3. Fallback: if route has no theme specified, normalize URL to current theme
    navigate(`/fix-my-pipe/${theme}`, { replace: true });
  }, [themeParam, searchParams, theme, setTheme, navigate]);

  return (
    <div className="w-full min-h-screen bg-[#F8F9FC] text-[#0B1D3A] dark:bg-[#071124] dark:text-slate-100 transition-colors duration-200">
      <FixMyPipeGame />
    </div>
  );
}

export default function App() {
  const theme = usePipeGameStore((s) => s.theme);

  return (
    <HashRouter>
      <Routes>
        {/* Dedicated Route for "Fix my pipe" with theme parameter */}
        <Route path="/fix-my-pipe/:themeParam" element={<FixMyPipeRoute />} />
        <Route path="/fix-my-pipe" element={<FixMyPipeRoute />} />

        {/* Alias routes */}
        <Route path="/fixmypipe/:themeParam" element={<FixMyPipeRoute />} />
        <Route path="/fixmypipe" element={<FixMyPipeRoute />} />
        <Route path="/game/fix-my-pipe/:themeParam" element={<FixMyPipeRoute />} />
        <Route path="/game/fix-my-pipe" element={<FixMyPipeRoute />} />

        {/* Root redirects to the active theme route */}
        <Route path="/" element={<Navigate to={`/fix-my-pipe/${theme}`} replace />} />

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to={`/fix-my-pipe/${theme}`} replace />} />
      </Routes>
    </HashRouter>
  );
}
