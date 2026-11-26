[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/shunzhil15-lgtm/china-in-numbers/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/shunzhil15-lgtm/china-in-numbers/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

# China in Numbers

A national statistics site about China, built from real 2024 figures. Plain HTML, CSS and JavaScript. No build step, no network requests, no external images, fonts or libraries.

**What it shows:** an overview dashboard, population (age structure, urban share, births and deaths), the economy (GDP trend 2015–2024 with a total / per-person toggle, sector shares, yearly table), provinces and cities (searchable, sortable table), and foreign trade (exports, imports, surplus, partners, export mix).

**How to open it:** serve the `app/` folder with any static server (for example `python3 -m http.server` inside `app/`, then open http://localhost:8000), or just double-click `app/index.html`.

**How it hands in:** `node main.ts` (Node 22) copies `app/` and `screenshots/` to `/output` (or `MAKEFUN_OUTPUT_DIR`) and writes `/output/dossier.json` with the vendored make.fun library.

**Sources:** National Bureau of Statistics of China (Statistical Communiqué on the 2024 National Economic and Social Development, 28 Feb 2025; Statistical Yearbook 2025) and the General Administration of Customs (13 Jan 2025). All figures are for mainland China, 2024 unless stated otherwise.

License: MIT.
