import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import Scene from "@/components/Scene";
import { Button } from "@/components/ui/button";
import { useGameStore } from "@/store/useGameStore";
import { setMuted } from "@/lib/sound";

export default function App() {
  const { score, muted, addScore, toggleMute } = useGameStore();

  return (
    <div className="relative h-screen w-screen">
      <Scene />
      <motion.div
        className="absolute left-4 top-4 flex items-center gap-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className="text-lg font-semibold">Score: {score}</span>
        <Button onClick={() => addScore(1)}>+1</Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            toggleMute();
            setMuted(!muted);
          }}
        >
          {muted ? <VolumeX /> : <Volume2 />}
        </Button>
      </motion.div>
    </div>
  );
}
