import { AnimatePresence, motion, useMotionValue, useTransform } from 'framer-motion';
import Backdrop from './components/Backdrop';
import Hud from './components/Hud';
import TitleBanner from './components/TitleBanner';
import StageStrip from './components/StageStrip';
import RulesCard from './components/RulesCard';
import ModeButtons from './components/ModeButtons';
import CaseBanner from './components/CaseBanner';
import FeedbackToast from './components/FeedbackToast';
import DossierCard from './components/DossierCard';
import BigButton from './components/BigButton';
import { Check3DIcon, Cross3DIcon } from './components/Icons3D';
import ResultScreen from './components/ResultScreen';
import GameModals from './components/GameModals';
import FooterSection from './components/FooterSection';
import Pipe3D from './Pipe3D';
import { usePipeGameStore } from './store';
import { RAW_CASES, translateText } from './data';
import type { CardItem, Language, StageId } from './types';

function SwipeableCard({
  item,
  lang,
  onSwipeRight,
  onSwipeLeft,
}: {
  item: CardItem;
  lang: Language;
  onSwipeRight: () => void;
  onSwipeLeft: () => void;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-14, 14]);
  const opacity = useTransform(x, [-220, -140, 0, 140, 220], [0.55, 1, 1, 1, 0.55]);
  const hireOpacity = useTransform(x, [15, 85], [0, 1]);
  const passOpacity = useTransform(x, [-15, -85], [0, 1]);
  const isPerson = item.type === 'candidate';

  return (
    <motion.div
      style={{ x, rotate, opacity }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.65}
      onDragEnd={(_, info) => {
        if (info.offset.x > 85) onSwipeRight();
        else if (info.offset.x < -85) onSwipeLeft();
      }}
      className="relative cursor-grab touch-none select-none active:cursor-grabbing"
    >
      <motion.div
        style={{ opacity: hireOpacity }}
        className="pointer-events-none absolute right-4 top-4 z-20 rotate-12 rounded-[6px] border-2 border-[#16A34A] bg-emerald-500/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300"
      >
        {lang === 'en' ? (isPerson ? 'HIRE' : 'IMPLEMENT') : isPerson ? 'నియమించు' : 'అమలు'}
      </motion.div>
      <motion.div
        style={{ opacity: passOpacity }}
        className="pointer-events-none absolute left-4 top-4 z-20 -rotate-12 rounded-[6px] border-2 border-[#DC2626] bg-rose-500/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-rose-700 dark:text-rose-300"
      >
        {lang === 'en' ? 'PASS' : 'వద్దు'}
      </motion.div>
      <DossierCard item={item} lang={lang} showActions={false} dense={true} />
    </motion.div>
  );
}

export default function MobileView() {
  const {
    lang,
    mode,
    screen,
    caseOrder,
    caseIndex,
    deck,
    cardIndex,
    leak,
    score,
    maxCombo,
    goodCount,
    totalDecisions,
    lastFeedback,
    hiredTeam,
    startGame,
    decide,
    openCta,
    returnHome,
  } = usePipeGameStore();

  const currentCase = caseOrder.length > 0 ? RAW_CASES[caseOrder[caseIndex]] : null;
  const currentCard = deck.length > 0 && cardIndex < deck.length ? deck[cardIndex] : null;
  const isPerson = mode === 1;
  const en = lang === 'en';

  return (
    <div className="relative min-h-dvh w-full overflow-x-hidden font-sans text-[#0B1D3A] dark:text-slate-100 selection:bg-amber-500 selection:text-slate-950">
      <Backdrop compact={true} />

      <div className="relative z-10 mx-auto flex min-h-dvh w-full max-w-md flex-col gap-2 px-3 py-2.5">
        <Hud compact={true} />

        {screen === 'home' && (
          <div className="flex flex-col gap-2.5 pb-2">
            <div>
              <TitleBanner compact={true} />
            </div>

            <div className="space-y-1.5">
              <div className="relative h-[128px] w-full">
                <Pipe3D activeLeakStage="all" leakLevel={0.65} isFixed={false} lang={lang} flow={0.25} />
              </div>
              <StageStrip lang={lang} leakStage="all" fixed={false} />
            </div>

            <div className="space-y-2.5">
              <RulesCard compact={true} />
              <ModeButtons stacked={true} />
            </div>
          </div>
        )}

        {screen === 'play' && currentCase && currentCard && (
          <div className="flex flex-col gap-2 pb-2">
            <div className="space-y-1">
              <div className="relative h-[122px] w-full">
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

            <CaseBanner
              title={currentCase.t}
              quote={currentCase.q}
              leak={currentCase.leak}
              caseIndex={caseIndex}
              totalCases={caseOrder.length || 3}
              deckLength={deck.length}
              cardIndex={cardIndex}
              lang={lang}
              compact={true}
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={currentCard.id}
                initial={{ opacity: 0, y: 12, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <SwipeableCard
                  item={currentCard}
                  lang={lang}
                  onSwipeRight={() => decide(true)}
                  onSwipeLeft={() => decide(false)}
                />
              </motion.div>
            </AnimatePresence>

            <div className="space-y-2">
              {lastFeedback && (
                <div className="fare-card-3d rounded-[8px] px-3 py-1.5 text-center text-[11px]">
                  <span className={`mr-1.5 font-bold ${lastFeedback.scoreDelta >= 0 ? 'text-[#16A34A]' : 'text-[#DC2626]'}`}>
                    {lastFeedback.scoreDelta >= 0 ? `+${lastFeedback.scoreDelta}` : lastFeedback.scoreDelta}
                  </span>
                  <span className="text-[#0B1D3A] dark:text-slate-200">{translateText(lastFeedback.text, lang)}</span>
                </div>
              )}

              <div className="grid grid-cols-2 gap-2.5">
                <BigButton
                  tone="red"
                  size="sm"
                  trailing={false}
                  iconNode={<Cross3DIcon size={16} />}
                  title={isPerson ? (en ? 'Reject' : 'వద్దు') : en ? 'Pass' : 'వద్దు'}
                  onClick={() => decide(false)}
                />
                <BigButton
                  tone="green"
                  size="sm"
                  trailing={false}
                  iconNode={<Check3DIcon size={16} />}
                  title={isPerson ? (en ? 'Hire' : 'నియమించు') : en ? 'Implement' : 'అమలు'}
                  onClick={() => decide(true)}
                />
              </div>
            </div>
          </div>
        )}

        {screen === 'result' && (
          <div className="flex flex-1 items-center justify-center py-2">
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

        <FooterSection compact={true} />
      </div>

      <GameModals />
    </div>
  );
}
