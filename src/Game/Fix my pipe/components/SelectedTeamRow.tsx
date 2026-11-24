import { motion, AnimatePresence } from 'framer-motion';
import { translateText } from '../data';
import type { CardItem, Language } from '../types';

const GROUP_COLORS: Record<string, string> = {
  field: '#2a9d8f',
  digital: '#4a7fd6',
  site: '#c8992c',
  lead: '#8b6fd6',
};

interface SelectedTeamRowProps {
  items: CardItem[];
  isPerson: boolean;
  lang: Language;
  compact?: boolean;
}

export default function SelectedTeamRow({ items, isPerson, lang, compact = false }: SelectedTeamRowProps) {
  if (items.length === 0) return null;

  return (
    <div className="flex flex-col items-center gap-0.5">
      <div className="flex flex-wrap items-center justify-center gap-1.5">
        <AnimatePresence initial={false}>
          {items.map((item, idx) => {
            const ringColor = isPerson ? GROUP_COLORS[item.group || 'field'] || '#2a9d8f' : '#0F766E';
            const label = translateText(item.name, lang);
            return (
              <motion.div
                key={`${item.id}-${idx}`}
                initial={{ scale: 0, opacity: 0, y: 10 }}
                animate={{ scale: [0, 1.3, 0.94, 1], opacity: 1, y: 0 }}
                exit={{ scale: 0.2, opacity: 0 }}
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.94 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                title={label}
                aria-label={label}
                style={{
                  boxShadow: `0 0 0 2px ${ringColor}, 0 2px 10px -1px ${ringColor}60`,
                }}
                className={`relative grid shrink-0 place-items-center rounded-full bg-[#1B2C52] text-white shadow-sm cursor-pointer select-none transition-shadow ${
                  compact ? 'h-7 w-7 text-xs' : 'h-8 w-8 text-sm'
                }`}
              >
                <motion.span
                  aria-hidden
                  initial={{ scale: 0.8, opacity: 0.9 }}
                  animate={{ scale: 1.7, opacity: 0 }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                  className="pointer-events-none absolute inset-0 rounded-full"
                  style={{ border: `2px solid ${ringColor}` }}
                />
                {isPerson ? (
                  <svg viewBox="0 0 40 40" className="h-full w-full rounded-full" aria-hidden="true">
                    <circle cx="20" cy="15" r="7.2" fill="#d9a77c" />
                    <path
                      d="M20 7.6c-4.3 0-7.4 2.6-7.4 6.4 1.6-2.2 4.4-3.1 7.4-3.1s5.8.9 7.4 3.1c0-3.8-3.1-6.4-7.4-6.4z"
                      fill="#2b1d14"
                    />
                    <path d="M6.5 40c.6-8.6 6.4-13.6 13.5-13.6S32.9 31.4 33.5 40z" fill={ringColor} />
                    <path d="M16.6 26.8 20 31l3.4-4.2" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" opacity=".8" />
                  </svg>
                ) : (
                  <span>{item.emoji}</span>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
