import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Backdrop from './components/Backdrop';
import Hud from './components/Hud';
import TitleBanner from './components/TitleBanner';
import RulesCard from './components/RulesCard';
import ModeButtons from './components/ModeButtons';
import Advisor from './components/Advisor';
import HomeInfoCard from './components/HomeInfoCard';
import CaseBanner from './components/CaseBanner';
import FeedbackToast from './components/FeedbackToast';
import DossierCard from './components/DossierCard';
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

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1440px] flex-col justify-between px-6 py-5 lg:px-8">
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
          <div className="flex flex-1 flex-col justify-end gap-4 pb-2 pt-2">
            <div className="relative h-[240px] w-full xl:h-[300px]">
              <Pipe3D activeLeakStage={null} leakLevel={0} isFixed={false} lang={lang} flow={1} />
            </div>

            <div className="grid grid-cols-[260px_minmax(0,1fr)_260px] items-end gap-6 xl:grid-cols-[280px_minmax(0,1fr)_280px]">
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

              <div className="mx-auto w-full max-w-2xl space-y-4">
                <RulesCard />
                <ModeButtons />
              </div>

              <div className="justify-self-end">
                <HomeInfoCard />
              </div>
            </div>
          </div>
        )}

        {screen === 'play' && currentCase && currentCard && (
          <div className="flex flex-1 flex-col justify-end gap-4 pb-2 pt-2">
            <div className="relative h-[230px] w-full xl:h-[280px]">
              <FeedbackToast />
              <Pipe3D
                activeLeakStage={currentCase.leak as StageId}
                leakLevel={leak}
                isFixed={leak <= 0.08}
                lang={lang}
              />
            </div>

            <div className="grid grid-cols-[260px_minmax(0,1fr)_280px] items-end gap-6">
              <div className="justify-self-start">
                <Advisor
                  name={player?.name || (en ? 'FARE Coach' : 'FARE కోచ్')}
                  role={STAGES[currentCase.leak]?.name[lang]}
                  message={advisorMessage}
                  messageKey={lastFeedback ? `fb-${totalDecisions}-${lang}` : `case-${caseIndex}-${lang}`}
                  tone={advisorTone}
                />
              </div>

              <div className="mx-auto w-full max-w-2xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentCard.id}
                    initial={{ opacity: 0, y: 14, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -12, scale: 0.98 }}
                    transition={{ duration: 0.22 }}
                  >
                    <DossierCard
                      item={currentCard}
                      lang={lang}
                      onAccept={() => decide(true)}
                      onReject={() => decide(false)}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="space-y-3 justify-self-end w-full">
                <PressureGauge leakLevel={leak} score={score} combo={combo} lang={lang} />
                <div className="fare-card-3d rounded-[10px] p-4 text-xs">
                  <div className="mb-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#C99A2E]">
                    {isPerson ? (en ? 'Mode 1 · Hiring' : 'మోడ్ 1 · హైరింగ్') : en ? 'Mode 2 · Systems' : 'మోడ్ 2 · సిస్టమ్స్'}
                  </div>
                  <p className="leading-relaxed text-[#475569] dark:text-slate-300">
                    {STAGES[currentCase.leak]?.desc[lang]}
                  </p>
                </div>
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

        <FooterSection />
      </div>

      <GameModals />
    </div>
  );
}
