import { AnimatePresence, motion } from 'framer-motion';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BigButton from './BigButton';
import { Check3DIcon, Cross3DIcon } from './Icons3D';
import RoundEndModal from './RoundEndModal';
import OnboardingModal from './OnboardingModal';
import CtaModal from './CtaModal';
import TeamRosterModal from './TeamRosterModal';
import { usePipeGameStore } from '../store';
import { RAW_CASES, STAGES, translateText } from '../data';

function BriefingModal() {
  const { showBriefing, caseOrder, caseIndex, mode, lang, deck, dismissBriefing, quitGame } = usePipeGameStore();
  const currentCase = caseOrder.length ? RAW_CASES[caseOrder[caseIndex]] : null;
  const en = lang === 'en';
  const isPerson = mode === 1;

  return (
    <AnimatePresence>
      {showBriefing && currentCase && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 grid place-items-center bg-[#0B1D3A]/55 p-4 backdrop-blur-sm dark:bg-black/70"
        >
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fare-card-3d relative max-h-[88vh] w-full max-w-lg overflow-y-auto rounded-[10px] p-6 md:p-7"
          >
            <span className="absolute inset-x-0 top-0 h-1" style={{ background: STAGES[currentCase.leak].color }} />
            <button
              type="button"
              onClick={quitGame}
              aria-label={en ? 'Cancel game' : 'రద్దు చేయండి'}
              className="fare-icon-3d absolute right-4 top-4 grid h-8 w-8 cursor-pointer place-items-center rounded-[6px] bg-[#0B1D3A] text-white transition hover:bg-[#DC2626] dark:bg-[#1A3463] dark:hover:bg-[#DC2626]"
            >
              <CloseIcon sx={{ fontSize: 17, color: '#FFFFFF' }} />
            </button>

            <div className="mb-3 flex items-center gap-2 pr-10 text-[11px] font-bold uppercase tracking-[0.14em]">
              <span className="fare-icon-3d flex items-center gap-1 rounded-[4px] px-2 py-0.5 text-white" style={{ background: STAGES[currentCase.leak].color }}>
                <WarningAmberIcon sx={{ fontSize: 13, color: '#FFFFFF' }} />
                {STAGES[currentCase.leak].name[lang]}
              </span>
              <span className="text-[#C99A2E]">
                {en ? 'Case briefing' : 'సమస్య వివరణ'} · {caseIndex + 1}/{caseOrder.length}
              </span>
            </div>
            <h3 className="mb-2 text-xl font-bold leading-snug text-[#0B1D3A] dark:text-white md:text-2xl">{translateText(currentCase.t, lang)}</h3>
            <p className="mb-5 text-sm italic text-[#475569] dark:text-slate-300">“{translateText(currentCase.q, lang)}”</p>
            <div className="mb-6 space-y-2.5 rounded-[8px] border border-[#DBE4FA] bg-[#F5F8FF] p-3.5 text-sm text-[#475569] dark:border-white/10 dark:bg-[#071124]/60 dark:text-slate-300">
              <div className="flex items-start gap-2.5">
                <span className="fare-icon-3d mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-[4px] bg-[#16A34A] text-white">
                  <Check3DIcon size={13} />
                </span>
                <span>
                  {isPerson
                    ? en ? 'Hire candidates with proven strength in this stage.' : 'ఈ దశలో అనుభవం ఉన్నవారిని నియమించండి.'
                    : en ? 'Implement systems that permanently fix this stage.' : 'ఈ దశను శాశ్వతంగా సరిచేసే సిస్టమ్స్ అమలు చేయండి.'}
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="fare-icon-3d mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-[4px] bg-[#DC2626] text-white">
                  <Cross3DIcon size={13} />
                </span>
                <span>{en ? "Reject anything that doesn't address this bottleneck." : 'ఈ సమస్యకు సరిపోని వాటిని తిరస్కరించండి.'}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
              <motion.button
                type="button"
                whileHover={{ y: -1.5 }}
                whileTap={{ scale: 0.98 }}
                onClick={quitGame}
                className="group relative flex cursor-pointer items-center gap-2 rounded-[8px] border border-[#DBE4FA] bg-gradient-to-b from-white to-[#F8FAFC] px-3 py-2.5 text-left shadow-[0_6px_16px_-6px_rgba(29,78,216,0.1),0_2px_0_#D5DFF6] transition-all hover:border-rose-300 hover:from-white hover:to-rose-50/60 hover:text-rose-700 dark:border-white/10 dark:from-[#0E1E38] dark:to-[#091528] dark:hover:border-rose-500/40 dark:hover:from-[#0E1E38] dark:hover:to-rose-950/25 sm:gap-2.5"
              >
                <span className="fare-icon-3d grid h-8 w-8 shrink-0 place-items-center rounded-[6px] bg-[#F1F5F9] text-[#64748B] transition-colors group-hover:bg-[#DC2626] group-hover:text-white dark:bg-[#1A2C4B] dark:text-slate-300 dark:group-hover:bg-[#DC2626]">
                  <ArrowBackIcon sx={{ fontSize: 18 }} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-bold text-[#0B1D3A] transition-colors group-hover:text-rose-700 dark:text-white dark:group-hover:text-rose-300">
                    {en ? 'Cancel & Return' : 'రద్దు చేయండి'}
                  </span>
                  <span className="block truncate text-[11px] text-[#64748B] dark:text-slate-400">
                    {en ? 'Back to lobby' : 'హోమ్‌కి వెళ్లండి'}
                  </span>
                </span>
              </motion.button>

              <BigButton
                tone="navy"
                size="md"
                icon={PlayArrowIcon}
                title={en ? 'Begin Round' : 'రౌండ్ ప్రారంభించండి'}
                subtitle={`${deck.length} ${isPerson ? (en ? 'candidates to interview' : 'అభ్యర్థులు') : en ? 'ideas to evaluate' : 'ఐడియాలు'}`}
                onClick={dismissBriefing}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function QuitConfirmModal() {
  const { showQuitConfirm, lang, closeQuitConfirm, quitGame } = usePipeGameStore();
  const en = lang === 'en';

  return (
    <AnimatePresence>
      {showQuitConfirm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 grid place-items-center bg-[#0B1D3A]/55 p-4 backdrop-blur-sm dark:bg-black/70"
        >
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="fare-card-3d relative max-h-[88vh] w-full max-w-sm overflow-y-auto rounded-[10px] p-6 text-center"
          >
            <button
              type="button"
              onClick={closeQuitConfirm}
              aria-label={en ? 'Close' : 'మూసివేయండి'}
              className="fare-icon-3d absolute right-3.5 top-3.5 grid h-8 w-8 cursor-pointer place-items-center rounded-[6px] bg-[#0B1D3A] text-white transition hover:bg-[#1A3463] dark:bg-[#1A3463]"
            >
              <CloseIcon sx={{ fontSize: 16, color: '#FFFFFF' }} />
            </button>

            <div className="fare-icon-3d mx-auto mb-3 grid h-11 w-11 place-items-center rounded-[8px] bg-[#DC2626] text-white">
              <LogoutIcon sx={{ fontSize: 22, color: '#FFFFFF' }} />
            </div>
            <h3 className="text-lg font-bold text-[#0B1D3A] dark:text-white">
              {en ? 'Quit Current Game?' : 'ప్రస్తుత గేమ్ ఆపాలా?'}
            </h3>
            <p className="mt-1 text-xs text-[#64748B] dark:text-slate-400">
              {en
                ? 'Your current round progress will be discarded and you will return to the main lobby.'
                : 'ప్రస్తుత రౌండ్ పురోగతి పోతుంది మరియు మీరు హోమ్ స్క్రీన్‌కు వెళతారు.'}
            </p>
            <div className="mt-5 grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={closeQuitConfirm}
                className="fare-card-3d cursor-pointer rounded-[8px] py-2.5 text-xs font-bold text-[#0B1D3A] transition hover:brightness-98 dark:text-white"
              >
                {en ? 'Cancel' : 'కొనసాగించండి'}
              </button>
              <button
                type="button"
                onClick={quitGame}
                className="cursor-pointer rounded-[8px] bg-[#DC2626] py-2.5 text-xs font-bold text-white shadow-[0_3px_0_#991B1B] transition hover:bg-[#B91C1C]"
              >
                {en ? 'Quit Game' : 'గేమ్ ఆపండి'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function GameModals() {
  const {
    showRoundEnd,
    caseIndex,
    caseOrder,
    mode,
    lang,
    leak,
    history,
    nextCase,
    showOnboarding,
    savePlayer,
    startGame,
    cancelOnboarding,
    showCta,
    closeCta,
    showRoster,
    hiredTeam,
    closeRoster,
    quitGame,
  } = usePipeGameStore();

  return (
    <>
      <BriefingModal />
      <QuitConfirmModal />
      <RoundEndModal
        isOpen={showRoundEnd}
        caseIndex={caseIndex}
        caseOrder={caseOrder}
        mode={mode}
        lang={lang}
        leakLevel={leak}
        history={history}
        onContinue={nextCase}
        onQuit={quitGame}
      />
      <OnboardingModal
        isOpen={showOnboarding}
        lang={lang}
        onSubmit={(name, mobile) => {
          savePlayer(name, mobile);
          startGame(mode);
        }}
        onSkip={() => startGame(mode)}
        onCancel={cancelOnboarding}
      />
      <CtaModal isOpen={showCta} lang={lang} onClose={closeCta} />
      <TeamRosterModal isOpen={showRoster} hiredTeam={hiredTeam} lang={lang} onClose={closeRoster} />
    </>
  );
}
