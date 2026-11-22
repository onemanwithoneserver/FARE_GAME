import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Backdrop from './components/Backdrop';
import Hud from './components/Hud';
import TitleBanner from './components/TitleBanner';
import ModeButtons from './components/ModeButtons';
import Advisor from './components/Advisor';
import HomeInfoCard from './components/HomeInfoCard';
import CaseBanner from './components/CaseBanner';
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

      <div className={`relative z-10 mx-auto flex min-h-screen w-full max-w-[1440px] flex-col px-6 py-3 lg:px-8 ${screen === 'result' ? 'justify-between' : 'justify-start'}`}>
        <Hud
          center={
            screen === 'home' ? (
              <TitleBanner />
            ) : screen === 'play' && currentCase ? (
              <CaseBanner
                title={currentCase.t}
                quote={currentCase.q}
                leak={currentCase.leak}
                caseIndex={caseIndex}
                totalCases={caseOrder.length || 3}
                deckLength={deck.length}
                cardIndex={cardIndex}
                lang={lang}
              />
            ) : (
              <TitleBanner subtitle={en ? 'Performance Report' : 'మీ ఫలితాలు'} />
            )
          }
        />

        {screen === 'home' && (
          <div className="flex flex-col gap-4 pb-2 pt-2">
            <div className="relative h-[240px] w-full xl:h-[300px]">
              <Pipe3D activeLeakStage="all" leakLevel={0.65} isFixed={false} lang={lang} flow={0.25} />
            </div>

            <div className="grid grid-cols-[260px_minmax(0,1fr)_260px] items-start gap-6 xl:grid-cols-[280px_minmax(0,1fr)_280px]">
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
                />
              </div>

              <div className="mx-auto flex w-full max-w-2xl flex-col gap-4">
                <ModeButtons />
                <FooterSection className="!mt-0 !pt-0" />
              </div>

              <div className="justify-self-end">
                <HomeInfoCard />
              </div>
            </div>
          </div>
        )}

        {screen === 'play' && currentCase && currentCard && (
          <div className="flex flex-1 flex-col justify-start gap-1 pb-2 pt-0 -mt-1">
            <div className="relative h-[135px] w-full xl:h-[155px]">
              <FeedbackToast />
              <Pipe3D
                activeLeakStage={currentCase.leak as StageId}
                leakLevel={leak}
                isFixed={leak <= 0.08}
                lang={lang}
              />
            </div>

            <div className="grid grid-cols-[200px_minmax(0,1fr)_200px] items-end gap-3 lg:gap-4 xl:grid-cols-[220px_minmax(0,1fr)_220px]">
              <div className="justify-self-start w-full">
                <Advisor
                  name={player?.name || (en ? 'FARE TL' : 'FARE TL')}
                  role={STAGES[currentCase.leak]?.name[lang]}
                  message={advisorMessage}
                  messageKey={lastFeedback ? `fb-${totalDecisions}-${lang}` : `case-${caseIndex}-${lang}`}
                  tone={advisorTone}
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
                      dense={false}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex flex-col items-center gap-2.5 justify-self-end w-full">
                <PressureGauge leakLevel={leak} score={score} combo={combo} lang={lang} />
                <CandidateCharacter
                  item={currentCard}
                  isPerson={isPerson}
                  lang={lang}
                  reactionKey={totalDecisions}
                />
              </div>
            </div>
          </div>
        )}

        {screen === 'result' && (
          <div className="flex flex-1 items-center justify-center py-4">
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

        {screen !== 'home' && <FooterSection />}
      </div>

      <GameModals />
    </div>
  );
}
