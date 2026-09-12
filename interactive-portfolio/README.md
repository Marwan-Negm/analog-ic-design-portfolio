# Interactive Analog IC Portfolio

A responsive portfolio organized around two OTA mini projects, two design challenges, and a separate archive of 13 supporting labs.

## Experience

- Main page: Miller OTA, fully differential folded-cascode OTA, bandgap reference, and Monticelli class-AB op amp.
- Direct viewing and downloading of all 17 PDF reports.
- Result explorer with original simulation plots and source-specific conditions.
- Separate lab archive with topic, simulation-flow, and text filters.
- Professional navy, blue, and white electronics-oriented visual design.

## Local development

Requires Node.js 22.13 or later and pnpm.

```sh
pnpm install
pnpm dev
```

Open the local address printed by the development server. Build with `pnpm build`.

## Source and report organization

The app uses React with the Vinext starter provided by Sites. The two routes are `/` and `/labs`.

The `public/reports` directory mirrors the portfolio's PDFs so the hosted site can serve reports independently. The canonical project summaries, reports, and Monte Carlo datasets are in the [main repository](https://github.com/Marwan-Negm/analog-ic-design-portfolio).

The site retains original simulation evidence. No simulations were rerun while assembling the portfolio.
