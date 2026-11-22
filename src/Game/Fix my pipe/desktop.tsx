import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Backdrop from './components/Backdrop';
import Hud from './components/Hud';
import TitleBanner from './components/TitleBanner';
import ModeButtons from './components/ModeButtons';
import Advisor from './components/Advisor';
import HomeInfoCard from './components/HomeInfoCard';
import FeedbackToast from './components/FeedbackToast';
import DossierCard from './components/DossierCard';
import { CandidateCharacter } from './components/CharacterAvatars';
import PressureGauge from './components/PressureGauge';
import ResultScreen from './components/ResultScreen';
import GameModals from './components/GameModals';
import FooterSection from './components/FooterSection';
import Pipe3D from './Pipe3D';
import { usePipeGameStore } from './store';
import { RAW_CASES, STAGES, translateText } from './data';
import type { StageId } from './types';

export default function DesktopView() {
  const {
    lang,
    mode,
    screen,
    showOnboarding,
    showBriefing,
    showRoundEnd,
    showCta,
    showRoster,
    showQuitConfirm,
    caseOrder,
    caseIndex,
    deck,
    cardIndex,
    leak,
    score,
    combo,
    maxCombo,
    goodCount,
    totalDecisions,
    lastFeedback,
    hiredTeam,
    player,
    startGame,
    decide,
    openCta,
    returnHome,
  } = usePipeGameStore();

  const currentCase = caseOrder.length > 0 ? RAW_CASES[caseOrder[caseIndex]] : null;
  const currentCard = deck.length > 0 && cardIndex < deck.length ? deck[cardIndex] : null;
  const isPerson = mode === 1;
  const en = lang === 'en';

  const [isShortLandscape, setIsShortLandscape] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.innerHeight <= 520 && window.innerWidth >= window.innerHeight;
  });

  useEffect(() => {
    const handleResize = () => {
      if (typeof window === 'undefined') return;
      const isShort = window.innerHeight <= 520 && window.innerWidth >= window.innerHeight;
      setIsShortLandscape(isShort);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (screen !== 'play' || showBriefing || showRoundEnd || showCta || showRoster || showOnboarding || showQuitConfirm) {
        return;
      }
      if (e.key === 'ArrowRight' || e.key === 'Enter') {
        e.preventDefault();
        decide(true);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        decide(false);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        usePipeGameStore.getState().openQuitConfirm();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [screen, showBriefing, showRoundEnd, showCta, showRoster, showOnboarding, showQuitConfirm, decide]);

  const advisorTone: 'neutral' | 'good' | 'bad' = !lastFeedback
    ? 'neutral'
    : lastFeedback.scoreDelta > 0
    ? 'good'
    : 'bad';

  const advisorMessage = lastFeedback
    ? translateText(lastFeedback.text, lang)
    : en
    ? 'Evaluate each candidate carefully. Plug the leak to maximize conversion!'
    : 'ప్రతి అభ్యర్థిని జాగ్రత్తగా పరిశీలించండి. లీక్ ఆపితే కన్వర్షన్ పెరుగుతుంది!';

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden font-sans text-[#0B1D3A] dark:text-slate-100 selection:bg-amber-500 selection:text-slate-950">
      <Backdrop />

      <div
        className={`relative z-10 mx-auto flex w-full max-w-[1440px] flex-col ${
          isShortLandscape
            ? 'h-dvh max-h-dvh justify-between px-2.5 py-1 sm:px-4 sm:py-1.5 overflow-hidden'
            : 'min-h-screen px-6 py-3 lg:px-8 ' + (screen === 'result' ? 'justify-between' : 'justify-start')
        }`}
      >
        <Hud
          compact={isShortLandscape}
          center={
            screen === 'home' ? (
              <TitleBanner compact={isShortLandscape} />
            ) : screen === 'result' ? (
              <TitleBanner compact={isShortLandscape} subtitle={en ? 'Performance Report' : 'మీ ఫలితాలు'} />
            ) : null
          }
        />

        {screen === 'home' && (
          <div className={`flex flex-col ${isShortLandscape ? 'gap-1.5 pb-0.5 pt-0.5 justify-around flex-1' : 'gap-5 pb-4 pt-1'}`}>
            <div className={`relative mx-auto w-full ${isShortLandscape ? 'h-[22dvh] max-w-5xl' : 'h-[300px] max-w-5xl xl:max-w-6xl'}`}>
              <Pipe3D activeLeakStage="all" leakLevel={0.65} isFixed={false} lang={lang} flow={0.25} />
            </div>

            <div
              className={`grid ${
                isShortLandscape
                  ? 'grid-cols-[180px_minmax(0,1fr)_180px] sm:grid-cols-[200px_minmax(0,1fr)_200px] gap-2.5 items-center'
                  : 'grid-cols-[260px_minmax(0,1fr)_260px] xl:grid-cols-[280px_minmax(0,1fr)_280px] gap-6 items-start'
              }`}
            >
              <div className="justify-self-start">
                <Advisor
                  name={player?.name || (en ? 'FARE Coach' : 'FARE కోచ్')}
                  role={en ? 'Pipeline TL' : 'పైప్‌లైన్ TL'}
                  message={
                    en
                      ? 'Your sales funnel has revenue leaks! Pick a mode below to hire talent or upgrade systems.'
                      : 'మీ సేల్స్ ఫన్నెల్‌లో లీక్‌లు ఉన్నాయి! సరైన మోడ్ ఎంచుకుని పరిష్కరించండి.'
                  }
                  messageKey={`home-${lang}`}
                  compact={isShortLandscape}
                />
              </div>

              <div className="mx-auto flex w-full max-w-2xl flex-col gap-4 md:gap-5">
                <ModeButtons compact={isShortLandscape} />
                {!isShortLandscape && <FooterSection className="!mt-1 !pt-0" />}
              </div>

              <div className="justify-self-end">
                <HomeInfoCard compact={isShortLandscape} />
              </div>
            </div>
          </div>
        )}

        {screen === 'play' && currentCase && currentCard && (
          <div className={`flex flex-1 flex-col justify-start ${isShortLandscape ? 'gap-0.5 pb-0.5 pt-0 -mt-0.5' : 'gap-2.5 pb-3 pt-0'}`}>
            <div className={`relative mx-auto w-full ${isShortLandscape ? 'h-[22dvh] max-w-5xl' : 'h-[280px] lg:h-[300px] max-w-5xl xl:max-w-6xl'}`}>
              <FeedbackToast />
              <Pipe3D
                activeLeakStage={currentCase.leak as StageId}
                leakLevel={leak}
                isFixed={leak <= 0.08}
                lang={lang}
              />
            </div>

            <div
              className={`grid ${
                isShortLandscape
                  ? 'grid-cols-[165px_minmax(0,1fr)_165px] sm:grid-cols-[185px_minmax(0,1fr)_185px] gap-2 items-end'
                  : 'grid-cols-[200px_minmax(0,1fr)_200px] lg:gap-5 xl:grid-cols-[220px_minmax(0,1fr)_220px] gap-4 items-end'
              }`}
            >
              <div className="justify-self-start w-full">
                <Advisor
                  name={player?.name || (en ? 'FARE TL' : 'FARE TL')}
                  role={STAGES[currentCase.leak]?.name[lang]}
                  message={advisorMessage}
                  messageKey={lastFeedback ? `fb-${totalDecisions}-${lang}` : `case-${caseIndex}-${lang}`}
                  tone={advisorTone}
                  compact={isShortLandscape}
                />
              </div>

              <div className="mx-auto w-full max-w-3xl xl:max-w-4xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentCard.id}
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                  >
                    <DossierCard
                      item={currentCard}
                      lang={lang}
                      onAccept={() => decide(true)}
                      onReject={() => decide(false)}
                      dense={isShortLandscape}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className={`flex flex-col items-center ${isShortLandscape ? 'gap-1.5' : 'gap-2.5'} justify-self-end w-full`}>
                <PressureGauge leakLevel={leak} score={score} combo={combo} lang={lang} compact={isShortLandscape} />
                <CandidateCharacter
                  item={currentCard}
                  isPerson={isPerson}
                  lang={lang}
                  reactionKey={totalDecisions}
                  compact={isShortLandscape}
                />
              </div>
            </div>
          </div>
        )}

        {screen === 'result' && (
          <div className="flex flex-1 items-center justify-center py-2 sm:py-4">
            <ResultScreen
              score={score}
              goodCount={goodCount}
              totalDecisions={totalDecisions}
              maxCombo={maxCombo}
              mode={mode}
              lang={lang}
              hiredTeam={hiredTeam}
              onPlayAgain={() => startGame(mode)}
              onSwitchMode={() => startGame(mode === 1 ? 2 : 1)}
              onOpenCta={openCta}
              onHome={returnHome}
            />
          </div>
        )}

        {screen !== 'home' && (!isShortLandscape || screen !== 'play') && <FooterSection />}
      </div>

      <GameModals />
    </div>
  );
}
