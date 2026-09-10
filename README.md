# Samyak Jain — portfolio

An after-hours studio with a native-scroll camera journey, built in React, TypeScript, React Three Fiber and Three.js. The near-black, teal, Cabinet Grotesk and Satoshi foundation follows samyak.space.

## Run

```sh
npm install
npm run dev -- --host 127.0.0.1 --port 3001
npm run build
```

Deploy `dist/` to the static host for `3d.samyak.space`. Canonical and Open Graph URLs already use this domain. This task does not change DNS or publish the site.

## Experience

One persistent WebGL canvas connects a working desk, project gallery, server installation, library, and exit portal. Scroll drives the camera along the space. The desk light toggles, the server layers separate, and the project installation opens the corresponding case study. Every scene interaction also has an HTML button. All eight projects, full experience, skills, education, recognition, services and contact form remain available through native dialogs.

Reduced motion uses static chapter camera positions; motion can also be paused manually. Hidden tabs stop continuous rendering. Resolution is capped at 1.5 DPR, drops when sampled frame times are slow, and has a manual lightweight option. Renderer failure leaves the HTML portfolio accessible. No external models or HDRI assets are fetched. Fonts have local fallbacks.

The contact form opens a mailto draft; it does not send mail. Cmd/Ctrl+K opens the terminal.

Main files: `src/App.tsx`, `src/journey.css`, `src/components/3d/WorldScene.tsx`, `src/PortfolioContent.tsx`, and `src/data/portfolioData.ts`.
