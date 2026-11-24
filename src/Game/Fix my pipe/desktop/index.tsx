import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Backdrop from '../components/Backdrop';
import Hud from '../components/Hud';
import TitleBanner from '../components/TitleBanner';
import ModeButtons from '../components/ModeButtons';
import Advisor from '../components/Advisor';
import FloatingShare from '../components/FloatingShare';
import FeedbackToast from '../components/FeedbackToast';
import DossierCard from '../components/DossierCard';
import { CandidateCharacter } from '../components/CharacterAvatars';
import SelectedTeamRow from '../components/SelectedTeamRow';
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
    awaitingNext,
    lastFeedback,
    history,
    hiredTeam,
    player,
    startGame,
    decide,
    advanceCard,
    openCta,
    returnHome,
  } = usePipeGameStore();

  const currentCase = caseOrder.length > 0 ? RAW_CASES[caseOrder[caseIndex]] : null;
  const currentCard = deck.length > 0 && cardIndex < deck.length ? deck[cardIndex] : null;
  const isPerson = mode === 1;
  const en = lang === 'en';
  const roundSelected = history
    .filter((r) => r.caseIndex === caseIndex && r.decision === 'yes' && r.scoreDelta > 0)
    .map((r) => r.item);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (screen !== 'play' || showBriefing || showRoundEnd || showSectionCta || showCta || showRoster || showOnboarding || showQuitConfirm) {
        return;
      }
      if (awaitingNext) {
        if (e.key === 'ArrowRight' || e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          advanceCard();
        } else if (e.key === 'Escape') {
          e.preventDefault();
          usePipeGameStore.getState().openQuitConfirm();
        }
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
  }, [screen, showBriefing, showRoundEnd, showSectionCta, showCta, showRoster, showOnboarding, showQuitConfirm, awaitingNext, decide, advanceCard]);

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

        {screen === 'home' && (
          <div className="my-auto flex w-full flex-col items-center gap-3 lg:gap-4 py-1">
            
            <div className="relative mx-auto h-[250px] sm:h-[280px] lg:h-[310px] xl:h-[340px] max-h-[42vh] w-full max-w-5xl xl:max-w-6xl">
              <Pipe3D activeLeakStage="all" leakLevel={0.65} isFixed={false} lang={lang} flow={0.25} hero={true} />
            </div>

            <div className="mx-auto flex w-full max-w-4xl xl:max-w-5xl flex-col lg:flex-row items-center justify-between gap-4 lg:gap-6">
              
              <div className="w-full lg:max-w-[390px] xl:max-w-[410px] shrink-0">
                <Advisor
                  characterType="coach"
                  layout="horizontal"
                  name={en ? 'FARE Coach' : 'FARE కోచ్'}
                  role={en ? 'Executive Mentor' : 'ఎగ్జిక్యూటివ్ మెంటార్'}
                  message={
                    <div className="flex flex-col gap-0.5">
                      <div className="font-bold text-[#0B1D3A] dark:text-amber-300 text-sm sm:text-base">
                        🎮 {en ? "Let's play a Game!" : "రండి గేమ్ ఆడదాం!"}
                      </div>
                      <div className="text-xs text-[#475569] dark:text-slate-300">
                        {en
                          ? 'Plug the revenue leaks in your sales pipeline. Choose your challenge below!'
                          : 'మీ సేల్స్ ఫన్నెల్ లీక్‌లను సరిచేయండి. సరైన మోడ్ ఎంచుకుని పరిష్కరించండి!'}
                      </div>
                    </div>
                  }
                  messageKey={`home-${lang}`}
                  compact={false}
                />
              </div>

              <div className="flex w-full lg:max-w-[530px] xl:max-w-[560px] flex-col gap-2">
                <ModeButtons compact={false} />
              </div>
            </div>
          </div>
        )}

        {screen === 'play' && currentCase && currentCard && (
          <div className="my-auto flex flex-1 flex-col justify-center gap-2 lg:gap-2.5 py-1">
            <div className="relative mx-auto h-[155px] sm:h-[170px] lg:h-[185px] max-h-[23vh] w-full max-w-4xl xl:max-w-5xl">
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

              <div className="mx-auto w-full max-w-2xl xl:max-w-[680px] flex flex-col gap-2">
                {roundSelected.length > 0 && (
                  <div className="flex justify-center">
                    <SelectedTeamRow items={roundSelected} isPerson={isPerson} lang={lang} />
                  </div>
                )}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${currentCard.id}-${awaitingNext ? 'fb' : 'q'}`}
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                  >
                    <DossierCard
                      item={currentCard}
                      lang={lang}
                      stageName={STAGES[currentCase.leak]?.name[lang]}
                      problem={{
                        leakName: STAGES[currentCase.leak]?.name[lang],
                        problemNumber: `${en ? 'Problem' : 'సమస్య'} ${caseIndex + 1}/${caseOrder.length}`,
                        text: translateText(currentCase.t, lang),
                      }}
                      awaitingNext={awaitingNext}
                      feedback={lastFeedback}
                      isLastCard={cardIndex + 1 >= deck.length}
                      onAccept={() => decide(true)}
                      onReject={() => decide(false)}
                      onNext={advanceCard}
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

        {screen === 'home' && <div className="h-1 shrink-0" />}
      </div>

      <FloatingShare />

      <GameModals />
    </div>
  );
}
