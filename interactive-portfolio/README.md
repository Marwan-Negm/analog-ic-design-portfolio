# Interactive Analog IC Portfolio

[Open the live portfolio](https://marwan-negm.github.io/analog-ic-design-portfolio/) · [Browse the lab archive](https://marwan-negm.github.io/analog-ic-design-portfolio/labs/)

A responsive engineering portfolio organized around two OTA mini projects, two design challenges, and a separate archive of thirteen supporting labs.

## Experience

- Featured Miller OTA, fully differential folded-cascode OTA, bandgap reference, and Monticelli class-AB designs.
- Direct viewing and downloading of all 17 PDF reports.
- Interactive result explorer with original plots and source-specific conditions.
- Lab archive with topic, simulation-flow, and text filters.
- Navy, blue, and white electronics-oriented visual design.

## Development

Requires Node.js 22.13 or later and pnpm 11.19.

```sh
pnpm install
pnpm dev
```

Build with `pnpm build` and inspect the production output with `pnpm preview`.

## GitHub Pages hosting

The website is a standalone React + TypeScript application built with Vite. It needs no server, login, API key, or proprietary hosting service.

Pushing website changes to `main` triggers the [GitHub Pages workflow](../.github/workflows/deploy-portfolio.yml). It type-checks and builds the project, then publishes only `dist/` to GitHub Pages.

The Vite base path is `/analog-ic-design-portfolio/`. Navigation, report downloads, and plot URLs all use that base path. Both the main page and `labs/` have real HTML entrypoints, so direct links and refreshes work on static hosting.

## Project structure

```text
interactive-portfolio/
  index.html             Main page
  labs/index.html        Lab archive page
  src/Portfolio.tsx      Content, cards, result explorer, and filters
  src/main.tsx           React entrypoint
  src/styles.css         Shared responsive styles
  public/reports/        All 17 downloadable PDFs
  public/results/        Original simulation plots and schematics
  vite.config.ts         Static build and repository base path
```

The canonical project summaries, reports, and Monte Carlo datasets are in the [main repository](https://github.com/Marwan-Negm/analog-ic-design-portfolio). Report mirrors preserve the supplied PDFs, including the better-formatted Lab 10 report. No simulations were rerun.
