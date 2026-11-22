# FARE GAME

"Fix Your Sales Funnel" - a real-estate sales simulation by FARE (Finishing Academy for Real Estate). Players act as a team leader, find where the sales pipeline leaks (Lead, Follow-up, Visit, Close, Referral) and hire the right person or apply the right process to fix it. Available in English and Telugu, with light/dark themes and separate desktop and mobile layouts.

Live site: https://onemanwithoneserver.github.io/FARE_GAME/

## Tech Stack

| Purpose          | Technology                                   |
| ---------------- | -------------------------------------------- |
| Frontend         | React 19                                     |
| Build tool       | Vite                                         |
| 3D pipe scene    | React Three Fiber, Drei, Three.js            |
| Animations       | Framer Motion, GSAP                          |
| Styling          | Tailwind CSS 4, custom CSS (`index.css`)     |
| Icons            | MUI Icons (`@mui/icons-material`)            |
| State management | Zustand                                      |
| Sound            | Howler.js, generated music (`sound.ts`)      |
| Language         | TypeScript                                   |

## Project Structure

```
index.html            Vite entry
Game.html             Standalone single-file version of the game
src/
  main.tsx, App.tsx   App bootstrap
  index.css           Theme, 3D card styles, footer animations
  Game/
    index.tsx         Game export
    Fix my pipe/
      index.tsx       Chooses desktop or mobile layout
      desktop.tsx     Desktop layout
      mobile.tsx      Mobile (swipe card) layout
      Pipe3D.tsx      3D pipeline scene
      store.ts        Zustand game state
      data.ts         Cases, candidates, translations, FARE_LINKS
      types.ts        Shared types
      sound.ts        Sound effects and music
      components/     HUD, modals, cards, footer, etc.
```

## Scripts

- `npm run dev` - start the dev server
- `npm run build` - type-check and build
- `npm run preview` - preview the production build
- `npm run deploy` - build and push `main` to trigger GitHub Pages deployment

## Deployment

Pushes to `main` build and deploy to GitHub Pages through `.github/workflows/deploy.yml`. In the repository settings, set Pages source to "GitHub Actions". `vite.config.ts` uses `base: './'` for this.

Commit your changes to `main` before running `npm run deploy`. The command pushes committed changes only; GitHub Actions performs the actual deployment. If `main` is already up to date, no new deployment is triggered.

## Configuration

Share, course, WhatsApp and session links are in `FARE_LINKS` in `src/Game/Fix my pipe/data.ts`. The Twitter link is set in `components/FooterSection.tsx`.
