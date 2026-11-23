import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Backdrop from '../components/Backdrop';
import Hud from '../components/Hud';
import TitleBanner from '../components/TitleBanner';
import StageStrip from '../components/StageStrip';
import InterviewArena from '../components/InterviewArena';
import ModeButtons from '../components/ModeButtons';
import FeedbackToast from '../components/FeedbackToast';
import DossierCard from '../components/DossierCard';
import { CandidateCharacter } from '../components/CharacterAvatars';
import PressureGauge from '../components/PressureGauge';
import ResultScreen from '../components/ResultScreen';
import GameModals from '../components/GameModals';
import Pipe3D from '../Pipe3D';
import Advisor from '../components/Advisor';
import { usePipeGameStore } from '../store';
import { RAW_CASES, STAGES, translateText } from '../data';
import type { StageId } from '../types';

export default function MobileView() {
  const {
    lang,
    mode,
    screen,
    showOnboarding,
    showBriefing,
    showRoundEnd,
    showSectionCta,
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

  const [isLandscape, setIsLandscape] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth > window.innerHeight;
  });

  useEffect(() => {
    const handleResize = () => {
      if (typeof window === 'undefined') return;
      setIsLandscape(window.innerWidth > window.innerHeight);
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
      if (screen !== 'play' || showBriefing || showRoundEnd || showSectionCta || showCta || showRoster || showOnboarding || showQuitConfirm) {
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
  }, [screen, showBriefing, showRoundEnd, showSectionCta, showCta, showRoster, showOnboarding, showQuitConfirm, decide]);

  const currentCase = caseOrder.length > 0 ? RAW_CASES[caseOrder[caseIndex]] : null;
  const currentCard = deck.length > 0 && cardIndex < deck.length ? deck[cardIndex] : null;
  const isPerson = mode === 1;
  const en = lang === 'en';

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

  // ── 1. MOBILE LANDSCAPE LAYOUT (e.g., Samsung Galaxy A55 800x360) ──
  if (isLandscape) {
    return (
      <div className="relative h-dvh max-h-dvh w-full overflow-hidden font-sans text-[#0B1D3A] dark:text-slate-100 selection:bg-amber-500 selection:text-slate-950">
        <Backdrop compact={true} />

        <div className="relative z-10 mx-auto flex h-dvh max-h-dvh w-full max-w-[800px] sm:max-w-[860px] flex-col justify-between px-2 py-0.5 sm:px-3 sm:py-1">
          {/* Compact Top HUD with Centered Title */}
          <Hud
            compact={true}
            center={
              screen === 'home' ? (
                <TitleBanner compact={true} />
              ) : screen === 'result' ? (
                <TitleBanner compact={true} subtitle={en ? 'Performance Report' : 'మీ ఫలితాలు'} />
              ) : null
            }
          />

          {/* HOME SCREEN — Mobile Landscape (800x360) */}
          {screen === 'home' && (
            <div className="my-auto flex flex-1 flex-col justify-evenly gap-1 py-0.5">
              {/* Prominent Hero 3D Pipeline Canvas — Sized tall for home opening with visible stage names */}
              <div className="relative mx-auto h-[125px] sm:h-[145px] max-h-[38dvh] w-full max-w-4xl">
                <Pipe3D activeLeakStage="all" leakLevel={0.65} isFixed={false} lang={lang} flow={0.25} />
              </div>

              {/* Lower Interactive Console: Coach (Left) + ModeButtons (Right, Reduced Width & Anchored to the Right Edge) */}
              <div className="mx-auto flex w-full max-w-4xl items-center justify-between gap-3 sm:gap-4">
                <div className="w-[230px] sm:w-[250px] shrink-0">
                  <Advisor
                    characterType="coach"
                    layout="horizontal"
                    name={en ? 'FARE Coach' : 'FARE కోచ్'}
                    role={en ? 'Mentor' : 'మెంటార్'}
                    message={
                      en
                        ? 'Your sales funnel has revenue leaks! Pick a mode to hire talent or upgrade systems.'
                        : 'మీ సేల్స్ ఫన్నెల్‌లో లీక్‌లు ఉన్నాయి! సరైన మోడ్ ఎంచుకుని పరిష్కరించండి.'
                    }
                    messageKey={`mobile-land-home-${lang}`}
                    compact={true}
                  />
                </div>

                <div className="ml-auto w-[220px] sm:w-[235px] shrink-0">
                  <ModeButtons stacked={true} compact={true} />
                </div>
              </div>
            </div>
          )}

          {/* PLAY SCREEN — Mobile Landscape */}
          {screen === 'play' && currentCase && currentCard && (
            <div className="my-auto flex flex-1 flex-col justify-between gap-1 py-0.5">
              {/* Increased pipeline canvas height for mobile */}
              <div className="relative mx-auto h-[84px] sm:h-[94px] max-h-[26dvh] w-full max-w-4xl">
                <FeedbackToast />
                <Pipe3D
                  activeLeakStage={currentCase.leak as StageId}
                  leakLevel={leak}
                  isFixed={leak <= 0.08}
                  lang={lang}
                />
              </div>

              <div className="mx-auto grid w-full max-w-4xl grid-cols-[135px_minmax(0,1fr)_135px] sm:grid-cols-[145px_minmax(0,1fr)_145px] items-end gap-2">
                <div className="justify-self-start w-full">
                  <Advisor
                    characterType="tl"
                    name={player?.name ? `${player.name} (TL)` : en ? 'Pipeline TL' : 'పైప్‌లైన్ TL'}
                    role={STAGES[currentCase.leak]?.name[lang]}
                    message={advisorMessage}
                    messageKey={lastFeedback ? `fb-${totalDecisions}-${lang}` : `case-${caseIndex}-${lang}`}
                    tone={advisorTone}
                    compact={true}
                  />
                </div>

                <div className="mx-auto w-full max-w-[360px] sm:max-w-[400px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentCard.id}
                      initial={{ opacity: 0, y: 6, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.98 }}
                      transition={{ duration: 0.18 }}
                    >
                      <DossierCard
                        item={currentCard}
                        lang={lang}
                        onAccept={() => decide(true)}
                        onReject={() => decide(false)}
                        dense={true}
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="flex flex-col items-center gap-1.5 justify-self-end w-full">
                  <PressureGauge leakLevel={leak} score={score} combo={combo} lang={lang} compact={true} />
                  <CandidateCharacter
                    item={currentCard}
                    isPerson={isPerson}
                    lang={lang}
                    reactionKey={totalDecisions}
                    compact={true}
                  />
                </div>
              </div>
            </div>
          )}

          {/* RESULT SCREEN — Mobile Landscape */}
          {screen === 'result' && (
            <div className="my-auto flex flex-1 items-center justify-center overflow-y-auto py-1">
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
        </div>

        <GameModals />
      </div>
    );
  }

  // ── 2. MOBILE PORTRAIT LAYOUT (e.g., 360x800) ──
  return (
    <div className="relative min-h-dvh w-full overflow-x-hidden font-sans text-[#0B1D3A] dark:text-slate-100 selection:bg-amber-500 selection:text-slate-950">
      <Backdrop compact={true} />

      <div className="relative z-10 mx-auto flex min-h-dvh w-full max-w-md flex-col justify-between gap-2 px-3 py-2">
        <Hud compact={true} />

        {screen === 'home' && (
          <div className="my-auto flex flex-col gap-2.5 py-1">
            <TitleBanner compact={true} />

            {/* Pipeline Section — Prominent 3D View */}
            <div className="space-y-1">
              <div className="relative mx-auto h-[25dvh] min-h-[190px] max-h-[245px] w-full max-w-md">
                <Pipe3D activeLeakStage="all" leakLevel={0.65} isFixed={false} lang={lang} flow={0.25} />
              </div>
              <StageStrip lang={lang} leakStage="all" fixed={false} />
            </div>

            {/* Coach Mentor — Horizontal Side-by-Side Layout */}
            <div className="w-full">
              <Advisor
                characterType="coach"
                layout="horizontal"
                name={en ? 'FARE Coach' : 'FARE కోచ్'}
                role={en ? 'Executive Mentor' : 'ఎగ్జిక్యూటివ్ మెంటార్'}
                message={
                  en
                    ? 'Your sales funnel has revenue leaks! Pick a mode below to hire talent or upgrade systems.'
                    : 'మీ సేల్స్ ఫన్నెల్‌లో లీక్‌లు ఉన్నాయి! క్రింద ఉన్న మోడ్ ఎంచుకుని సరిచేయండి.'
                }
                messageKey={`mobile-portrait-coach-${lang}`}
                compact={true}
              />
            </div>

            {/* Mode Buttons — Stacked Top & Bottom with balanced width & spacing */}
            <div className="w-full max-w-[320px] mx-auto">
              <ModeButtons stacked={true} compact={false} />
            </div>

          </div>
        )}

        {screen === 'play' && currentCase && currentCard && (
          <div className="my-auto flex flex-col gap-2 py-1">
            <div className="space-y-1">
              {/* Increased pipeline canvas height for mobile */}
              <div className="relative h-[22dvh] min-h-[160px] max-h-[220px] w-full">
                <FeedbackToast />
                <Pipe3D
                  activeLeakStage={currentCase.leak as StageId}
                  leakLevel={leak}
                  isFixed={leak <= 0.08}
                  lang={lang}
                />
              </div>
              <StageStrip lang={lang} leakStage={currentCase.leak} fixed={leak <= 0.08} />
            </div>

            <InterviewArena
              currentCase={currentCase}
              item={currentCard}
              lang={lang}
              isPerson={isPerson}
              playerName={player?.name}
              hiredTeam={hiredTeam}
              onAccept={() => decide(true)}
              onReject={() => decide(false)}
            />

            {lastFeedback && (
              <div className="fare-card-3d rounded-[8px] px-3 py-1.5 text-center text-[11px]">
                <span className={`mr-1.5 font-bold ${lastFeedback.scoreDelta >= 0 ? 'text-[#16A34A]' : 'text-[#DC2626]'}`}>
                  {lastFeedback.scoreDelta >= 0 ? `+${lastFeedback.scoreDelta}` : lastFeedback.scoreDelta}
                </span>
                <span className="text-[#0B1D3A] dark:text-slate-200">{translateText(lastFeedback.text, lang)}</span>
              </div>
            )}
          </div>
        )}

        {screen === 'result' && (
          <div className="my-auto flex flex-1 flex-col items-center justify-center gap-2.5 py-2">
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
      </div>

      <GameModals />
    </div>
  );
}
