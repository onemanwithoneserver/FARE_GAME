import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Backdrop from '../components/Backdrop';
import Hud from '../components/Hud';
import TitleBanner from '../components/TitleBanner';
import ModeButtons from '../components/ModeButtons';
import Advisor from '../components/Advisor';
import FooterSection from '../components/FooterSection';
import HomeInfoCard from '../components/HomeInfoCard';
import FeedbackToast from '../components/FeedbackToast';
import DossierCard from '../components/DossierCard';
import { CandidateCharacter } from '../components/CharacterAvatars';
import PressureGauge from '../components/PressureGauge';
import ResultScreen from '../components/ResultScreen';
import GameModals from '../components/GameModals';
import Pipe3D from '../Pipe3D';
import { usePipeGameStore } from '../store';
import { RAW_CASES, STAGES, translateText } from '../data';
import type { StageId } from '../types';

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

      {/* Main Desktop/Laptop Container — Fits Standard Laptop Viewports Comfortably without Scrolling */}
      <div
        className={`relative z-10 mx-auto flex min-h-screen w-full max-w-[1140px] xl:max-w-[1200px] flex-col px-4 py-2 lg:px-6 lg:py-2.5 ${
          screen === 'result' ? 'justify-between' : 'justify-between'
        }`}
      >
        <Hud
          compact={false}
          center={
            screen === 'home' ? (
              <TitleBanner compact={false} />
            ) : screen === 'result' ? (
              <TitleBanner compact={false} subtitle={en ? 'Performance Report' : 'మీ ఫలితాలు'} />
            ) : null
          }
        />

        {/* HOME SCREEN — Centered Stage with 3D Pipe & Balanced Action Console */}
        {screen === 'home' && (
          <div className="my-auto flex w-full flex-col items-center gap-3 lg:gap-4 py-1">
            {/* Hero 3D Pipeline Canvas */}
            <div className="relative mx-auto h-[215px] sm:h-[230px] lg:h-[245px] xl:h-[260px] max-h-[32vh] w-full max-w-4xl xl:max-w-5xl">
              <Pipe3D activeLeakStage="all" leakLevel={0.65} isFixed={false} lang={lang} flow={0.25} />
            </div>

            {/* Unified Lower Console — 3-Column Layout: Coach (Left), Actions & Share (Center), Stats & Guide (Right) */}
            <div className="mx-auto grid w-full max-w-4xl xl:max-w-5xl grid-cols-1 lg:grid-cols-[235px_minmax(0,1fr)_260px] xl:grid-cols-[255px_minmax(0,1fr)_280px] items-center gap-3 lg:gap-4">
              {/* Left Column: FARE Coach Mentor */}
              <div className="w-full">
                <Advisor
                  characterType="coach"
                  layout="horizontal"
                  name={en ? 'FARE Coach' : 'FARE కోచ్'}
                  role={en ? 'Executive Mentor' : 'ఎగ్జిక్యూటివ్ మెంటార్'}
                  message={
                    en
                      ? 'Your sales funnel has revenue leaks! Pick a mode to hire talent or upgrade systems.'
                      : 'మీ సేల్స్ ఫన్నెల్‌లో లీక్‌లు ఉన్నాయి! సరైన మోడ్ ఎంచుకుని పరిష్కరించండి.'
                  }
                  messageKey={`home-${lang}`}
                  compact={false}
                />
              </div>

              {/* Center Column: Mode Buttons + Single Row Footer with Share at Start */}
              <div className="flex w-full flex-col gap-2">
                <ModeButtons compact={false} />
                <FooterSection compact={true} className="!mt-0 !pt-0" />
              </div>

              {/* Right Column: Game Stats & How to Play Guide */}
              <div className="w-full flex justify-center lg:justify-end">
                <HomeInfoCard compact={false} />
              </div>
            </div>
          </div>
        )}

        {/* PLAY SCREEN — Balanced 3-Column Arena */}
        {screen === 'play' && currentCase && currentCard && (
          <div className="my-auto flex flex-1 flex-col justify-center gap-2 lg:gap-3 py-1">
            <div className="relative mx-auto h-[195px] sm:h-[210px] lg:h-[225px] max-h-[27vh] w-full max-w-4xl xl:max-w-5xl">
              <FeedbackToast />
              <Pipe3D
                activeLeakStage={currentCase.leak as StageId}
                leakLevel={leak}
                isFixed={leak <= 0.08}
                lang={lang}
              />
            </div>

            <div className="mx-auto grid w-full max-w-5xl grid-cols-[190px_minmax(0,1fr)_190px] lg:grid-cols-[210px_minmax(0,1fr)_210px] xl:grid-cols-[225px_minmax(0,1fr)_225px] items-end gap-3 lg:gap-4">
              <div className="justify-self-start w-full">
                <Advisor
                  characterType="tl"
                  name={player?.name ? `${player.name} (TL)` : en ? 'Pipeline TL' : 'పైప్‌లైన్ TL'}
                  role={STAGES[currentCase.leak]?.name[lang]}
                  message={advisorMessage}
                  messageKey={lastFeedback ? `fb-${totalDecisions}-${lang}` : `case-${caseIndex}-${lang}`}
                  tone={advisorTone}
                  compact={false}
                />
              </div>

              <div className="mx-auto w-full max-w-2xl xl:max-w-[680px]">
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
                      dense={false}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex flex-col items-center gap-2 justify-self-end w-full">
                <PressureGauge leakLevel={leak} score={score} combo={combo} lang={lang} compact={false} />
                <CandidateCharacter
                  item={currentCard}
                  isPerson={isPerson}
                  lang={lang}
                  reactionKey={totalDecisions}
                  compact={false}
                />
              </div>
            </div>
          </div>
        )}

        {/* RESULT SCREEN */}
        {screen === 'result' && (
          <div className="my-auto flex flex-1 flex-col items-center justify-center gap-3 py-2">
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

        {/* Subtle bottom spacer for vertical symmetry on home */}
        {screen === 'home' && <div className="h-1 shrink-0" />}
      </div>

      <GameModals />
    </div>
  );
}
