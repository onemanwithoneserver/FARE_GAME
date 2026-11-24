import { create } from 'zustand';
import {
  Language,
  Theme,
  GameMode,
  StageId,
  CardItem,
  DecisionRecord,
  PlayerProfile,
} from './types';
import {
  STAGES,
  RAW_CASES,
  PROCESS_SOLUTIONS,
  HELP_TEXT,
  SHORT_TRAITS,
  CANDIDATE_POOL,
  RX_Y_MAP,
  RX_N_MAP,
  PY_MAP,
  PN_MAP,
  translateText,
} from './data';
import { soundEngine } from './sound';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const NQ = 3; 
const ND = 8; 

export interface PipeGameState {
  lang: Language;
  theme: Theme;
  sound: boolean;
  song: boolean;
  mode: GameMode;
  screen: 'home' | 'play' | 'result';
  startedAt: number | null;
  finishedAt: number | null;
  sealedCount: number;
  bestScore: number;

  showOnboarding: boolean;
  showBriefing: boolean;
  showRoundEnd: boolean;
  showSectionCta: boolean;
  showCta: boolean;
  showRoster: boolean;
  showQuitConfirm: boolean;

  caseOrder: number[];
  caseIndex: number;
  deck: CardItem[];
  cardIndex: number;
  leak: number; 
  score: number;
  combo: number;
  maxCombo: number;
  goodCount: number;
  totalDecisions: number;
  history: DecisionRecord[];
  hiredTeam: CardItem[];
  player: PlayerProfile | null;
  busy: boolean;
  awaitingNext: boolean;
  lastFeedback: {
    text: string;
    type: 'clamp' | 'tape' | 'fall' | 'crack' | 'reject_good' | 'reject_bad';
    scoreDelta: number;
    leakDelta: number;
    quality: 'ideal' | 'part' | 'bad';
    accepted: boolean;
  } | null;

  setLang: (lang: Language) => void;
  setTheme: (theme: Theme) => void;
  setSound: (on: boolean) => void;
  setSong: (on: boolean) => void;
  savePlayer: (name: string, mobile: string) => void;
  startOrPrompt: (mode: GameMode) => void;
  startGame: (mode: GameMode) => void;
  startRound: () => void;
  dismissBriefing: () => void;
  decide: (accepted: boolean) => void;
  advanceCard: () => void;
  nextCase: () => void;
  openSectionCta: () => void;
  closeSectionCta: () => void;
  proceedFromSectionCta: () => void;
  openCta: () => void;
  closeCta: () => void;
  openRoster: () => void;
  closeRoster: () => void;
  cancelOnboarding: () => void;
  openQuitConfirm: () => void;
  closeQuitConfirm: () => void;
  quitGame: () => void;
  returnHome: () => void;
}

function buildDeckForCase(caseObj: typeof RAW_CASES[0], mode: GameMode): CardItem[] {
  if (mode === 1) {
    
    const rawOptions = caseObj.p;
    const goodCandidates = rawOptions.filter((x: any) => x[2] >= 6);
    const otherCandidates = shuffle(rawOptions.filter((x: any) => x[2] < 6));
    const rawDeck = shuffle([
      ...goodCandidates.slice(0, 3),
      ...otherCandidates.slice(0, ND - Math.min(3, goodCandidates.length)),
    ]);

    return rawDeck.map((opt: any, idx: number) => {
      const name = opt[1];
      const poolItem = CANDIDATE_POOL.find((p) => p.n === name);
      const traits = SHORT_TRAITS[name];
      return {
        id: `cand-${idx}-${name}`,
        type: 'candidate',
        emoji: opt[0],
        name: name,
        scoreCode: opt[2],
        reason: opt[3],
        detail: HELP_TEXT[name] || poolItem?.who || '',
        group: poolItem?.g || 'field',
        model: poolItem?.model || 'Commission',
        pros: traits ? traits[0] : poolItem?.plus,
        cons: traits ? traits[1] : poolItem?.minus,
        fit: poolItem?.fit || [4, 4, 4, 4, 4],
      };
    });
  } else {
    
    const stageSolutions = PROCESS_SOLUTIONS[caseObj.leak];
    const topPicks = shuffle(stageSolutions.filter((x) => x[2] === 10)).slice(0, 3);
    const otherPicks = shuffle(stageSolutions.filter((x) => x[2] !== 10)).slice(0, ND - 3);
    const rawDeck = shuffle([...topPicks, ...otherPicks]);

    return rawDeck.map((item: any, idx: number) => {
      return {
        id: `proc-${idx}-${item[1]}`,
        type: 'process',
        emoji: item[0],
        name: item[1],
        scoreCode: item[2],
        reason: item[3],
        detail: item[3],
      };
    });
  }
}

export const usePipeGameStore = create<PipeGameState>((set, get) => {
  
  const savedTheme = (typeof localStorage !== 'undefined' && (localStorage.getItem('fare_game_theme') as Theme)) || 'dark';
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }
  const savedLang = (typeof localStorage !== 'undefined' && (localStorage.getItem('fare_game_lang') as Language)) || 'en';
  const savedSound =
    typeof localStorage !== 'undefined' && localStorage.getItem('fare_game_sound') !== null
      ? localStorage.getItem('fare_game_sound') === '1'
      : true;
  const savedSong =
    typeof localStorage !== 'undefined' && localStorage.getItem('fare_game_song') !== null
      ? localStorage.getItem('fare_game_song') === '1'
      : true;
  soundEngine.setMuted(!savedSound);
  const savedPlayerStr = typeof localStorage !== 'undefined' ? localStorage.getItem('fare_player') : null;
  const savedPlayer: PlayerProfile | null = savedPlayerStr ? JSON.parse(savedPlayerStr) : null;

  return {
    lang: savedLang,
    theme: savedTheme,
    sound: savedSound,
    song: savedSong,
    mode: 1,
    screen: 'home',
    startedAt: null,
    finishedAt: null,
    sealedCount: 0,
    bestScore: Number((typeof localStorage !== 'undefined' && localStorage.getItem('fare_best_score')) || 0),

    showOnboarding: false,
    showBriefing: false,
    showRoundEnd: false,
    showSectionCta: false,
    showCta: false,
    showRoster: false,
    showQuitConfirm: false,

    caseOrder: [],
    caseIndex: 0,
    deck: [],
    cardIndex: 0,
    leak: 1.0,
    score: 0,
    combo: 0,
    maxCombo: 0,
    goodCount: 0,
    totalDecisions: 0,
    history: [],
    hiredTeam: [],
    player: savedPlayer,
    busy: false,
    awaitingNext: false,
    lastFeedback: null,

    setLang: (lang) => {
      try {
        localStorage.setItem('fare_game_lang', lang);
      } catch (_) {}
      set({ lang });
    },

    setTheme: (theme) => {
      try {
        localStorage.setItem('fare_game_theme', theme);
      } catch (_) {}
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-theme', theme);
        document.documentElement.classList.toggle('dark', theme === 'dark');
      }
      set({ theme });
    },

    setSound: (on) => {
      try {
        localStorage.setItem('fare_game_sound', on ? '1' : '0');
      } catch (_) {}
      soundEngine.setMuted(!on);
      set({ sound: on });
    },

    setSong: (on) => {
      try {
        localStorage.setItem('fare_game_song', on ? '1' : '0');
      } catch (_) {}
      soundEngine.setSongEnabled(on);
      set({ song: on });
    },

    savePlayer: (name, mobile) => {
      const p: PlayerProfile = {
        name,
        mobile,
        at: new Date().toISOString(),
      };
      try {
        localStorage.setItem('fare_player', JSON.stringify(p));
      } catch (_) {}
      set({ player: p, showOnboarding: false });
    },

    startOrPrompt: (mode) => {
      const { player } = get();
      if (!player) {
        set({ mode, showOnboarding: true });
      } else {
        get().startGame(mode);
      }
    },

    startGame: (mode) => {
      const allCaseIndices = RAW_CASES.map((_, i) => i);
      const caseOrder = shuffle(allCaseIndices).slice(0, NQ);
      soundEngine.setSongEnabled(get().song);
      set({
        mode,
        screen: 'play',
        caseOrder,
        caseIndex: 0,
        startedAt: Date.now(),
        finishedAt: null,
        sealedCount: 0,
        score: 0,
        combo: 0,
        maxCombo: 0,
        goodCount: 0,
        totalDecisions: 0,
        history: [],
        hiredTeam: [],
        showRoundEnd: false,
        showSectionCta: false,
        showCta: false,
        showRoster: false,
        showOnboarding: false,
        awaitingNext: false,
        lastFeedback: null,
      });

      get().startRound();
    },

    startRound: () => {
      const { caseOrder, caseIndex, mode } = get();
      const currentCase = RAW_CASES[caseOrder[caseIndex]];
      const deck = buildDeckForCase(currentCase, mode);

      set({
        deck,
        cardIndex: 0,
        leak: 1.0,
        busy: false,
        awaitingNext: false,
        showBriefing: true,
        showRoundEnd: false,
        showSectionCta: false,
        lastFeedback: null,
      });
    },

    dismissBriefing: () => {
      soundEngine.playClick();
      set({ showBriefing: false, busy: false, awaitingNext: false });
    },

    decide: (accepted) => {
      const state = get();
      if (state.busy || state.awaitingNext || state.cardIndex >= state.deck.length) return;

      const item = state.deck[state.cardIndex];
      const isPerson = state.mode === 1;
      const lang = state.lang;
      const code = item.scoreCode;

      let scoreDelta = 0;
      let leakDelta = 0;
      let feedback = '';
      let feedbackType: DecisionRecord['feedbackType'] = 'tape';

      if (accepted) {
        if (isPerson) {
          const map = (RX_Y_MAP as any)[lang] || (RX_Y_MAP as any)['en'];
          const entry = map[code] || ['Solution added', 'tape', 0.1, 5];
          feedback = entry[0];
          feedbackType = entry[1];
          leakDelta = -entry[2];
          scoreDelta = entry[3];
        } else {
          const map = (PY_MAP as any)[lang] || (PY_MAP as any)['en'];
          const entry = map[code] || ['Process applied', 'tape', 0.1, 5];
          feedback = entry[0];
          feedbackType = entry[1];
          leakDelta = -entry[2];
          scoreDelta = entry[3];
        }

        if (feedbackType === 'clamp') {
          soundEngine.playClamp();
        } else if (feedbackType === 'tape') {
          soundEngine.playTape();
        } else if (feedbackType === 'fall') {
          soundEngine.playFall();
        } else {
          soundEngine.playCrack();
        }
      } else {
        
        if (isPerson) {
          const map = (RX_N_MAP as any)[lang] || (RX_N_MAP as any)['en'];
          const entry = map[code] || ['Passed', 1];
          feedback = entry[0];
          scoreDelta = entry[1];
        } else {
          const map = (PN_MAP as any)[lang] || (PN_MAP as any)['en'];
          const entry = map[code] || ['Passed', 1];
          feedback = entry[0];
          scoreDelta = entry[1];
        }
        leakDelta = 0;
        feedbackType = scoreDelta >= 0 ? 'reject_good' : 'reject_bad';

        if (scoreDelta >= 0) {
          soundEngine.playRejectGood();
        } else {
          soundEngine.playRejectBad();
        }
      }

      const nextLeak = Math.max(0, Math.min(1.0, state.leak + leakDelta));
      const isSuccess = scoreDelta > 0;
      const newCombo = isSuccess ? state.combo + 1 : 0;
      const maxCombo = Math.max(state.maxCombo, newCombo);

      if (nextLeak <= 0.08) {
        setTimeout(() => soundEngine.playCoin(), 120);
      }

      const rec: DecisionRecord = {
        caseIndex: state.caseIndex,
        item,
        decision: accepted ? 'yes' : 'no',
        scoreDelta,
        leakDelta,
        feedback,
        feedbackType,
      };

      const newHistory = [...state.history, rec];
      const newHired = accepted ? [...state.hiredTeam, item] : state.hiredTeam;
      const newScore = Math.max(0, state.score + scoreDelta);
      const newGood = isSuccess ? state.goodCount + 1 : state.goodCount;
      const newTotal = state.totalDecisions + 1;

      const quality: 'ideal' | 'part' | 'bad' = accepted
        ? code === 10
          ? 'ideal'
          : code === 6 || code === 4
          ? 'part'
          : 'bad'
        : code <= 2
        ? 'ideal'
        : code === 4
        ? 'part'
        : 'bad';

      set({
        busy: false,
        awaitingNext: true,
        leak: nextLeak,
        score: newScore,
        combo: newCombo,
        maxCombo,
        goodCount: newGood,
        totalDecisions: newTotal,
        history: newHistory,
        hiredTeam: newHired,
        lastFeedback: {
          text: feedback,
          type: feedbackType,
          scoreDelta,
          leakDelta,
          quality,
          accepted,
        },
      });
    },

    advanceCard: () => {
      const state = get();
      if (!state.awaitingNext) return;
      soundEngine.playClick();
      const nextCardIndex = state.cardIndex + 1;
      if (nextCardIndex >= state.deck.length) {
        soundEngine.playWin();
        set({
          awaitingNext: false,
          busy: false,
          cardIndex: nextCardIndex,
          showRoundEnd: true,
          lastFeedback: null,
          sealedCount: state.sealedCount + (state.leak <= 0.08 ? 1 : 0),
        });
      } else {
        set({
          awaitingNext: false,
          busy: false,
          cardIndex: nextCardIndex,
          lastFeedback: null,
        });
      }
    },

    nextCase: () => {
      // Transition from round end evaluation to the section CTA card ("the above card")
      soundEngine.playClick();
      set({
        showRoundEnd: false,
        showSectionCta: true,
      });
    },

    openSectionCta: () => set({ showRoundEnd: false, showSectionCta: true }),
    closeSectionCta: () => set({ showSectionCta: false }),

    proceedFromSectionCta: () => {
      const { caseIndex, caseOrder } = get();
      soundEngine.playClick();
      if (caseIndex + 1 < caseOrder.length) {
        set({
          caseIndex: caseIndex + 1,
          showSectionCta: false,
          showRoundEnd: false,
          showCta: false,
        });
        get().startRound();
      } else {
        soundEngine.playWin();
        const { score, bestScore } = get();
        const best = Math.max(score, bestScore);
        try {
          localStorage.setItem('fare_best_score', String(best));
        } catch (_) {}
        set({
          bestScore: best,
          finishedAt: Date.now(),
          screen: 'result',
          showSectionCta: false,
          showRoundEnd: false,
          showCta: false,
        });
      }
    },

    openCta: () => set({ showCta: true }),
    closeCta: () => set({ showCta: false }),
    openRoster: () => set({ showRoster: true }),
    closeRoster: () => set({ showRoster: false }),
    cancelOnboarding: () => {
      soundEngine.playClick();
      set({ showOnboarding: false });
    },
    openQuitConfirm: () => {
      soundEngine.playClick();
      set({ showQuitConfirm: true });
    },
    closeQuitConfirm: () => {
      soundEngine.playClick();
      set({ showQuitConfirm: false });
    },
    quitGame: () => {
      soundEngine.playClick();
      set({
        screen: 'home',
        showOnboarding: false,
        showBriefing: false,
        showRoundEnd: false,
        showSectionCta: false,
        showCta: false,
        showRoster: false,
        showQuitConfirm: false,
        caseOrder: [],
        caseIndex: 0,
        deck: [],
        cardIndex: 0,
        leak: 1.0,
        score: 0,
        combo: 0,
        goodCount: 0,
        totalDecisions: 0,
        history: [],
        hiredTeam: [],
        startedAt: null,
        finishedAt: null,
        sealedCount: 0,
        busy: false,
        awaitingNext: false,
        lastFeedback: null,
      });
    },
    returnHome: () => {
      soundEngine.playClick();
      const { finishedAt, startedAt } = get();
      set({
        screen: 'home',
        showRoundEnd: false,
        showSectionCta: false,
        showCta: false,
        showRoster: false,
        showBriefing: false,
        showQuitConfirm: false,
        finishedAt: startedAt && !finishedAt ? Date.now() : finishedAt,
      });
    },
  };
});
