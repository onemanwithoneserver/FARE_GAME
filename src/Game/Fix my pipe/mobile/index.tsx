import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Backdrop from '../components/Backdrop';
import Hud from '../components/Hud';
import TitleBanner from '../components/TitleBanner';
import ModeButtons from '../components/ModeButtons';
import FeedbackToast from '../components/FeedbackToast';
import DossierCard from '../components/DossierCard';
import { CandidateCharacter, TlCharacter } from '../components/CharacterAvatars';
import SelectedTeamRow from '../components/SelectedTeamRow';
import PressureGauge from '../components/PressureGauge';
import ResultScreen from '../components/ResultScreen';
import FooterSection from '../components/FooterSection';
import FloatingShare from '../components/FloatingShare';
import GameModals from '../components/GameModals';
import Pipe3D from '../Pipe3D';
import Advisor from '../components/Advisor';
import BigButton from '../components/BigButton';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Cross3DIcon, Check3DIcon } from '../components/Icons3D';
import { usePipeGameStore } from '../store';
import { RAW_CASES, STAGES, translateText } from '../data';
import { soundEngine } from '../sound';
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

  const currentCase = caseOrder.length > 0 ? RAW_CASES[caseOrder[caseIndex]] : null;
  const currentCard = deck.length > 0 && cardIndex < deck.length ? deck[cardIndex] : null;
  const isPerson = mode === 1;
  const en = lang === 'en';
  const roundSelected = history
    .filter((r) => r.caseIndex === caseIndex && r.decision === 'yes' && r.scoreDelta > 0)
    .map((r) => r.item);

  useEffect(() => {
    if (currentCard?.id) {
      soundEngine.playClick();
    }
  }, [currentCard?.id]);

  const [scorePop, setScorePop] = useState<{ id: number; delta: number } | null>(null);
  const [activeFeedback, setActiveFeedback] = useState<{ id: number; scoreDelta: number; text: string } | null>(null);

  useEffect(() => {
    if (!lastFeedback) return;
    setScorePop({
      id: Date.now(),
      delta: lastFeedback.scoreDelta,
    });
    setActiveFeedback({
      id: Date.now(),
      scoreDelta: lastFeedback.scoreDelta,
      text: lastFeedback.text,
    });
    const timer = setTimeout(() => {
      setScorePop(null);
      setActiveFeedback(null);
    }, 1000);
    return () => clearTimeout(timer);
  }, [lastFeedback]);

  useEffect(() => {
    setActiveFeedback(null);
  }, [cardIndex, caseIndex, screen]);

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

  if (isLandscape) {
    return (
      <div className="relative h-dvh max-h-dvh w-full overflow-hidden font-sans text-[#0B1D3A] dark:text-slate-100 selection:bg-amber-500 selection:text-slate-950">
        <Backdrop compact={true} />

        <div className="relative z-10 mx-auto flex h-dvh max-h-dvh w-full max-w-[800px] sm:max-w-[860px] flex-col justify-between px-2 py-0.5 sm:px-3 sm:py-1">
          
          <Hud
            compact={true}
            center={
              screen === 'home' ? (
                <TitleBanner compact={true} />
              ) : screen === 'result' ? (
                <TitleBanner compact={true} subtitle={en ? 'Performance Report' : 'మీ ఫలితాలు'} />
              ) : screen === 'play' ? (
                <div className="flex items-center gap-1.5 rounded-[8px] border border-[#DBE4FA] bg-white/95 px-2.5 py-0.5 text-xs font-bold shadow-xs dark:border-white/15 dark:bg-[#0E1E3D]/95">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {en ? 'Score' : 'స్కోర్'}
                  </span>
                  <motion.span
                    key={`land-score-${score}`}
                    initial={{ scale: 1.25 }}
                    animate={{ scale: 1 }}
                    className="text-sm font-bold text-[#C99A2E] dark:text-[#E2C068]"
                  >
                    {score}
                  </motion.span>
                  {combo > 1 && (
                    <span className="rounded-[4px] bg-amber-500/20 px-1 py-0.2 text-[9px] font-bold text-amber-600 dark:text-amber-400">
                      {combo}x
                    </span>
                  )}
                </div>
              ) : null
            }
          />

          {screen === 'home' && (
            <div className="my-auto flex flex-1 flex-col justify-evenly gap-1 py-0.5">
              
              <div className="relative mx-auto h-[130px] sm:h-[150px] max-h-[38dvh] w-full max-w-5xl">
                <Pipe3D activeLeakStage="all" leakLevel={0.65} isFixed={false} lang={lang} flow={0.25} hero={true} />
              </div>

              <div className="mx-auto flex w-full max-w-4xl items-center justify-between gap-2 sm:gap-3">
                <div className="w-[220px] sm:w-[240px] shrink-0">
                  <Advisor
                    characterType="coach"
                    layout="horizontal"
                    name={en ? 'FARE Coach' : 'FARE కోచ్'}
                    role={en ? 'Mentor' : 'మెంటార్'}
                    message={
                      <div className="flex flex-col gap-0.5">
                        <div className="font-bold text-[#0B1D3A] dark:text-amber-300 text-xs">
                          🎮 {en ? "Let's play a Game!" : "Let's play a Game · రండి గేమ్ ఆడదాం!"}
                        </div>
                        <div className="text-[9.5px] text-[#475569] dark:text-slate-300">
                          {en
                            ? 'Plug the revenue leaks in your sales funnel.'
                        : 'మీ సేల్స్ ఫన్నెల్ లీక్‌లను సరిచేయండి. కింద ఉన్న ఛాలెంజ్ ఎంచుకోండి!'}
                        </div>
                      </div>
                    }
                    messageKey={`mobile-land-home-${lang}`}
                    compact={true}
                  />
                </div>

                <div className="w-[235px] sm:w-[255px] shrink-0">
                  <ModeButtons stacked={true} compact={true} />
                </div>

                <div className="flex items-end justify-end shrink-0 self-end">
                  <FloatingShare inline={true} />
                </div>
              </div>
            </div>
          )}

          {screen === 'play' && currentCase && currentCard && (
            <div className="my-auto flex flex-1 flex-col justify-between gap-1 py-0.5">
              
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

                <div className="mx-auto w-full max-w-[360px] sm:max-w-[400px] flex flex-col gap-1.5">
                  {roundSelected.length > 0 && (
                    <div className="flex justify-center">
                      <SelectedTeamRow items={roundSelected} isPerson={isPerson} lang={lang} compact={true} />
                    </div>
                  )}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${currentCard.id}-${awaitingNext ? 'fb' : 'q'}`}
                      initial={{ opacity: 0, y: 6, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.98 }}
                      transition={{ duration: 0.18 }}
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

  return (
    <div className="relative min-h-dvh w-full overflow-x-hidden font-sans text-[#0B1D3A] dark:text-slate-100 selection:bg-amber-500 selection:text-slate-950">
      <Backdrop compact={true} />

      <div className="relative z-10 mx-auto flex min-h-dvh w-full max-w-md flex-col justify-between gap-2 px-3 py-2">
        <Hud
          compact={true}
          center={
            screen === 'play' ? (
              <div className="flex items-center gap-1.5 rounded-[8px] border border-[#DBE4FA] bg-white/95 px-2.5 py-0.5 text-xs font-bold shadow-xs dark:border-white/15 dark:bg-[#0E1E3D]/95">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {en ? 'Score' : 'స్కోర్'}
                </span>
                <motion.span
                  key={`score-${score}`}
                  initial={{ scale: 1.25 }}
                  animate={{ scale: 1 }}
                  className="text-sm font-bold text-[#C99A2E] dark:text-[#E2C068]"
                >
                  {score}
                </motion.span>
                {combo > 1 && (
                  <span className="rounded-[4px] bg-amber-500/20 px-1 py-0.2 text-[9px] font-bold text-amber-600 dark:text-amber-400">
                    {combo}x
                  </span>
                )}
              </div>
            ) : null
          }
        />

        {screen === 'home' && (
          <div className="my-auto flex flex-col gap-2.5 py-1">
            <TitleBanner compact={true} />

            <div className="relative mx-auto h-[32dvh] min-h-[235px] max-h-[310px] w-full">
              <Pipe3D
                activeLeakStage="all"
                leakLevel={0.65}
                isFixed={false}
                lang={lang}
                flow={0.25}
                hero={true}
              />
            </div>

            <div className="w-full">
              <Advisor
                characterType="coach"
                layout="horizontal"
                name={en ? 'FARE Coach' : 'FARE కోచ్'}
                role={en ? 'Executive Mentor' : 'ఎగ్జిక్యూటివ్ మెంటార్'}
                message={
                  <div className="flex flex-col gap-0.5">
                    <div className="font-bold text-[#0B1D3A] dark:text-amber-300 text-xs sm:text-sm">
                      🎮 {en ? "Let's play a Game!" : "Let's play a Game · రండి గేమ్ ఆడదాం!"}
                    </div>
                    <div className="text-[10px] sm:text-[11px] text-[#475569] dark:text-slate-300">
                      {en
                        ? 'Plug the revenue leaks in your sales funnel. Choose your challenge below!'
                        : 'మీ సేల్స్ ఫన్నెల్ లీక్‌లను సరిచేయండి. కింద ఉన్న ఛాలెంజ్ ఎంచుకోండి!'}
                    </div>
                  </div>
                }
                messageKey={`mobile-portrait-coach-${lang}`}
                compact={true}
              />
            </div>

            <div className="w-full max-w-[260px] mx-auto">
              <ModeButtons stacked={true} compact={false} />
            </div>

            <div className="flex justify-center mt-2.5 pb-1">
              <FloatingShare inline={true} />
            </div>
          </div>
        )}

        {screen === 'play' && currentCase && currentCard && (
          <div className="my-auto flex flex-col gap-2 py-1">
            <div className="relative mx-auto h-[20dvh] min-h-[145px] max-h-[195px] w-full max-w-md">
              <FeedbackToast />
              <Pipe3D
                activeLeakStage={currentCase.leak as StageId}
                leakLevel={leak}
                isFixed={leak <= 0.08}
                lang={lang}
              />
            </div>

            <div className="mx-auto flex w-full max-w-md flex-col gap-2">
              
              <div className="relative w-full">
                  <AnimatePresence>
                    {scorePop && (
                      <motion.div
                        key={scorePop.id}
                        initial={{ y: 0, scale: 0.6, opacity: 0 }}
                        animate={{ y: -32, scale: 1.25, opacity: 1 }}
                        exit={{ y: -50, scale: 1.05, opacity: 0 }}
                        transition={{ duration: 0.65, ease: 'easeOut' }}
                        className={`pointer-events-none absolute left-1/2 -translate-x-1/2 -top-2 z-40 font-bold text-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)] ${
                          scorePop.delta > 0 ? 'text-emerald-500' : 'text-rose-500'
                        }`}
                      >
                        {scorePop.delta > 0 ? `+${scorePop.delta}` : `${scorePop.delta}`}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${currentCard.id}-${awaitingNext ? 'fb' : 'q'}`}
                      initial={{ opacity: 0, y: 10, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.97 }}
                      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
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
                        showActions={false}
                        dense={true}
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="fare-card-3d relative flex items-center justify-between rounded-[10px] sm:rounded-[12px] border border-slate-200/80 bg-gradient-to-b from-white/90 via-slate-50/80 to-slate-100/90 px-3 py-1.5 sm:px-4 sm:py-2 shadow-xs dark:border-white/10 dark:from-[#0B1D3A]/90 dark:via-[#0E2244]/80 dark:to-[#071328]/90">
                  
                  <motion.div
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center"
                  >
                    <TlCharacter
                      name={player?.name ? `${player.name} (TL)` : en ? 'Pipeline TL' : 'పైప్‌లైన్ TL'}
                      role={STAGES[currentCase.leak]?.name[lang]}
                      tone={advisorTone}
                      reactionKey={totalDecisions}
                      compact={true}
                    />
                  </motion.div>

                  <div className="flex flex-col items-center gap-0.5 px-1">
                    <div className="grid h-6 w-6 place-items-center rounded-full border border-slate-200 bg-white text-[10px] font-bold shadow-xs dark:border-white/10 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      VS
                    </div>
                    <span className="text-[8px] font-bold uppercase tracking-wider text-slate-400">
                      {en ? 'Interview' : 'ఇంటర్వ్యూ'}
                    </span>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`cand-person-${currentCard.id}`}
                      initial={{ opacity: 0, x: 15, scale: 0.94 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -12, scale: 0.94 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="flex flex-col items-center"
                    >
                      <CandidateCharacter
                        item={currentCard}
                        isPerson={isPerson}
                        lang={lang}
                        reactionKey={totalDecisions}
                        compact={true}
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {roundSelected.length > 0 && (
                  <div className="flex items-center justify-center -my-0.5">
                    <SelectedTeamRow items={roundSelected} isPerson={isPerson} lang={lang} compact={true} />
                  </div>
                )}

                {awaitingNext ? (
                  <div className="flex justify-center w-full pt-1">
                    <BigButton
                      tone="gold"
                      size="sm"
                      compactWidth={true}
                      trailing={false}
                      iconNode={<ArrowForwardIcon sx={{ fontSize: 15, color: '#FFFFFF' }} />}
                      title={
                        cardIndex + 1 >= deck.length
                          ? en
                            ? 'See problem summary'
                            : 'సమస్య సారాంశం చూడండి'
                          : isPerson
                          ? en
                            ? 'Next candidate'
                            : 'తర్వాతి అభ్యర్థి'
                          : en
                          ? 'Next Idea'
                          : 'తర్వాతి ఐడియా'
                      }
                      onClick={() => advanceCard()}
                      className="!px-4 !py-1.5"
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-3 w-full pt-1">
                    <BigButton
                      tone="red"
                      size="sm"
                      compactWidth={false}
                      trailing={false}
                      iconNode={<Cross3DIcon size={14} />}
                      title={isPerson ? (en ? 'Reject' : 'వద్దు') : en ? 'Pass' : 'వద్దు'}
                      onClick={() => decide(false)}
                      className="flex-1 max-w-[138px] justify-center !py-1.5 !px-3 !text-xs font-bold"
                    />

                    <BigButton
                      tone="green"
                      size="sm"
                      compactWidth={false}
                      trailing={false}
                      iconNode={<Check3DIcon size={15} />}
                      title={isPerson ? (en ? 'Hire' : 'నియమించు') : en ? 'Implement' : 'అమలు చేయండి'}
                      onClick={() => decide(true)}
                      className="flex-1 max-w-[138px] justify-center !py-1.5 !px-3 !text-xs font-bold"
                    />
                  </div>
                )}
              </div>
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
