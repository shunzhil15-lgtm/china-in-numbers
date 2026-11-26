// Views for China in Numbers. Each view returns an HTML string;
// charts are drawn by main.js after the HTML is inserted.
import { SOURCES, OVERVIEW, POPULATION, ECONOMY, PROVINCES, CITIES, TRADE } from "./data.js";

export function fmt(n, decimals = 2) {
  return n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}
export function fmtInt(n) {
  return n.toLocaleString("en-US");
}

function sourceLine(text) {
  return `<p class="source">Source: ${text}</p>`;
}

export function renderOverview() {
  const topByGdp = [...PROVINCES]
    .filter((p) => p.gdpTrillionYuan !== null)
    .sort((a, b) => b.gdpTrillionYuan - a.gdpTrillionYuan)
    .slice(0, 5);
  const maxGdp = topByGdp[0].gdpTrillionYuan;
  return `
    <h1>China in Numbers</h1>
    <p class="lede">The essential statistics of China in 2024 — population, economy, provinces, cities and foreign trade — each figure with its source.</p>
    <div class="kpis">
      <div class="kpi accent"><div class="value">1,408.28<small> million</small></div><div class="label">Population, end-2024</div><div class="note">Down 1.39 million on 2023</div></div>
      <div class="kpi teal"><div class="value">¥134.91<small> trillion</small></div><div class="label">GDP, 2024</div><div class="note">Up 5.0% in real terms</div></div>
      <div class="kpi gold"><div class="value">¥95,749</div><div class="label">GDP per person, 2024</div><div class="note">About US$13,391</div></div>
      <div class="kpi"><div class="value">¥43.85<small> trillion</small></div><div class="label">Goods trade, 2024</div><div class="note">World's largest goods trader</div></div>
    </div>
    <div class="card">
      <h2>GDP, 2015–2024</h2>
      <p>China's economy nearly doubled in ten years, from ¥68.89 trillion in 2015 to ¥134.91 trillion in 2024.</p>
      <div class="chart-wrap"><canvas id="gdp-mini" class="chart" data-chart="gdp" data-mode="total" aria-label="Line chart of China's GDP, 2015 to 2024"></canvas></div>
      <p class="chart-note">Trillion yuan, current prices. <a href="#/economy">See the full economy section →</a></p>
    </div>
    <div class="two-col">
      <div class="card">
        <h2>Largest provincial economies, 2024</h2>
        ${topByGdp.map((p) => `
          <div class="hbar-row"><span>${p.name}</span><span class="hbar-track"><span class="hbar-fill" style="display:block;width:${((p.gdpTrillionYuan / maxGdp) * 100).toFixed(1)}%"></span></span><span class="hbar-val">¥${fmt(p.gdpTrillionYuan)}T</span></div>`).join("")}
        <p class="chart-note"><a href="#/provinces">All provinces and cities →</a></p>
      </div>
      <div class="card">
        <h2>China at a glance</h2>
        <ul class="fact-list">
          <li><strong>Capital:</strong> ${OVERVIEW.capital}</li>
          <li><strong>Area:</strong> ${OVERVIEW.areaNote} (9,596,961 km²)</li>
          <li><strong>Currency:</strong> ${OVERVIEW.currency}</li>
          <li><strong>Divisions:</strong> ${OVERVIEW.divisions} — 22 provinces, 5 autonomous regions, 4 municipalities</li>
          <li><strong>Population:</strong> ${OVERVIEW.populationRank}</li>
          <li><strong>Economy:</strong> ${OVERVIEW.gdpRank}</li>
        </ul>
      </div>
    </div>
    <div class="callout"><p><strong>Three years of decline.</strong> China's population fell for a third straight year in 2024, by 1.39 million people, as 9.54 million births were outnumbered by 10.93 million deaths.</p></div>
    ${sourceLine(SOURCES.population + "; " + SOURCES.gdp + ".")}
  `;
}

export function renderPopulation() {
  const p = POPULATION;
  const maxBand = Math.max(...p.ageBands.map((b) => b.million));
  return `
    <h1>Population</h1>
    <p class="lede">1,408.28 million people at the end of 2024 — down 1.39 million on the year before, the third annual fall in a row.</p>
    <div class="kpis">
      <div class="kpi accent"><div class="value">1,408.28<small> million</small></div><div class="label">Total population</div><div class="note">End of 2024</div></div>
      <div class="kpi teal"><div class="value">67.0<small>% urban</small></div><div class="label">Urban population</div><div class="note">943.50 million people</div></div>
      <div class="kpi gold"><div class="value">22.0<small>% aged 60+</small></div><div class="label">Older population</div><div class="note">310.31 million people</div></div>
      <div class="kpi"><div class="value">9.54<small> million</small></div><div class="label">Births in 2024</div><div class="note">Birth rate 6.77 per 1,000</div></div>
    </div>
    <div class="card">
      <h2>Age structure, end-2024</h2>
      ${p.ageBands.map((b) => `
        <div class="hbar-row"><span>${b.label}</span><span class="hbar-track"><span class="hbar-fill teal" style="display:block;width:${((b.million / maxBand) * 100).toFixed(1)}%"></span></span><span class="hbar-val">${fmt(b.million)}m · ${fmt(b.share, 1)}%</span></div>`).join("")}
      <p>Of the 310.31 million people aged 60 and over, <strong>${fmt(p.aged65Million)} million (${fmt(p.aged65Share, 1)}% of everyone)</strong> were aged 65 and over.</p>
    </div>
    <div class="two-col">
      <div class="card">
        <h2>Men and women</h2>
        <div class="hbar-row"><span>Men</span><span class="hbar-track"><span class="hbar-fill" style="display:block;width:100%"></span></span><span class="hbar-val">${fmt(p.maleMillion)}m</span></div>
        <div class="hbar-row"><span>Women</span><span class="hbar-track"><span class="hbar-fill red" style="display:block;width:${((p.femaleMillion / p.maleMillion) * 100).toFixed(1)}%"></span></span><span class="hbar-val">${fmt(p.femaleMillion)}m</span></div>
        <p>Men were ${fmt(p.maleShare, 1)}% of the population and women ${fmt(p.femaleShare, 1)}% — 104.34 men for every 100 women.</p>
      </div>
      <div class="card">
        <h2>Births and deaths, 2024</h2>
        <ul class="fact-list">
          <li><strong>Births:</strong> ${fmt(p.birthsMillion)} million — ${fmt(p.birthRate)} per 1,000 people, up from 9.02 million in 2023</li>
          <li><strong>Deaths:</strong> ${fmt(p.deathsMillion)} million — ${fmt(p.deathRate)} per 1,000 people</li>
          <li><strong>Natural growth:</strong> ${fmt(p.naturalGrowthRate)} per 1,000 — more deaths than births</li>
          <li><strong>Rural population:</strong> ${fmt(p.ruralMillion)} million (${fmt(p.ruralShare, 1)}%)</li>
        </ul>
      </div>
    </div>
    ${sourceLine(SOURCES.population + ".")}
  `;
}

export function renderEconomy() {
  const e = ECONOMY;
  return `
    <h1>Economy</h1>
    <p class="lede">GDP reached ¥134.91 trillion (about US$18.8 trillion) in 2024, growing 5.0% in real terms — the world's second-largest economy.</p>
    <div class="kpis">
      <div class="kpi accent"><div class="value">¥134.91<small> trillion</small></div><div class="label">GDP, 2024</div><div class="note">Growth 5.0% year on year</div></div>
      <div class="kpi teal"><div class="value">¥95,749</div><div class="label">GDP per person</div><div class="note">About US$13,391</div></div>
      <div class="kpi gold"><div class="value">56.7<small>% services</small></div><div class="label">Tertiary sector share</div><div class="note">¥76.56 trillion</div></div>
      <div class="kpi"><div class="value">¥48.79<small> trillion</small></div><div class="label">Retail sales</div><div class="note">Up 3.5% on 2023</div></div>
    </div>
    <div class="card">
      <h2>GDP trend, 2015–2024</h2>
      <div class="toggle-row" role="group" aria-label="Choose what the chart shows">
        <button class="btn on" data-gdp-mode="total">Total GDP (¥ trillion)</button>
        <button class="btn" data-gdp-mode="perCapita">GDP per person (¥)</button>
      </div>
      <div class="chart-wrap"><canvas id="gdp-main" class="chart" data-chart="gdp" data-mode="total" aria-label="Line chart of China's GDP, 2015 to 2024"></canvas></div>
      <p class="chart-note">Current prices. GDP almost doubled in ten years, from ¥68.89 trillion in 2015 to ¥134.91 trillion in 2024.</p>
    </div>
    <div class="card">
      <h2>What makes up GDP, 2024</h2>
      ${e.sectors.map((s) => `
        <div class="hbar-row"><span>${s.name.split(" (")[0]}</span><span class="hbar-track"><span class="hbar-fill ${s.share > 50 ? "teal" : s.share > 30 ? "" : "red"}" style="display:block;width:${s.share.toFixed(1)}%"></span></span><span class="hbar-val">¥${fmt(s.billionYuan / 1000)}T · ${fmt(s.share, 1)}%</span></div>`).join("")}
      <p>Services passed half of the economy: the tertiary sector produced ¥76,558.3 billion, industry ¥49,208.7 billion and farming, forestry and fishing ¥9,141.4 billion.</p>
    </div>
    <div class="card">
      <h2>GDP by year</h2>
      <table>
        <thead><tr><th>Year</th><th class="num">GDP (¥ trillion)</th><th class="num">GDP per person (¥)</th></tr></thead>
        <tbody>
          ${[...e.gdpTrend].reverse().map((r) => `<tr><td>${r.year}</td><td class="num">${fmt(r.total)}</td><td class="num">${fmtInt(r.perCapita)}</td></tr>`).join("")}
        </tbody>
      </table>
    </div>
    ${sourceLine(SOURCES.gdp + ".")}
  `;
}

export function provinceRows(list, sortKey) {
  const total = POPULATION.totalMillion;
  const rows = [...list].sort((a, b) => {
    if (sortKey === "name") return a.name.localeCompare(b.name);
    if (sortKey === "gdp") return (b.gdpTrillionYuan ?? -1) - (a.gdpTrillionYuan ?? -1);
    return b.populationMillion - a.populationMillion;
  });
  return rows.map((p) => `
    <tr>
      <td><strong>${p.name}</strong></td>
      <td>${p.capital}</td>
      <td class="num">${fmt(p.populationMillion)}</td>
      <td class="num">${fmt((p.populationMillion / total) * 100, 1)}%</td>
      <td class="num">${p.gdpTrillionYuan === null ? "—" : "¥" + fmt(p.gdpTrillionYuan) + "T"}</td>
    </tr>`).join("");
}

export function renderProvinces() {
  return `
    <h1>Provinces &amp; Cities</h1>
    <p class="lede">The most populous provinces and the biggest cities in 2024. Guangdong alone has 127.06 million people — more than most countries.</p>
    <div class="card">
      <h2>Most populous provinces</h2>
      <div class="search-row">
        <input type="search" id="province-search" placeholder="Search provinces…" aria-label="Search provinces">
        <span class="count" id="province-count"></span>
      </div>
      <div class="toggle-row" role="group" aria-label="Sort provinces">
        <button class="btn on" data-sort="population">By population</button>
        <button class="btn" data-sort="gdp">By GDP</button>
        <button class="btn" data-sort="name">By name</button>
      </div>
      <table>
        <thead><tr><th>Province</th><th>Capital</th><th class="num">Population (million)</th><th class="num">Share of China</th><th class="num">GDP 2024</th></tr></thead>
        <tbody id="province-rows">${provinceRows(PROVINCES, "population")}</tbody>
      </table>
      <p class="chart-note">Population is the 2024 year-end estimate. A dash means the source used here does not state that province's GDP — no figure is guessed.</p>
    </div>
    <div class="card">
      <h2>Largest cities, 2024</h2>
      <p>Permanent population of the whole municipality or city area.</p>
      ${CITIES.map((c) => `
        <div class="hbar-row"><span>${c.name}</span><span class="hbar-track"><span class="hbar-fill red" style="display:block;width:${((c.populationMillion / CITIES[0].populationMillion) * 100).toFixed(1)}%"></span></span><span class="hbar-val">${fmt(c.populationMillion)}m</span></div>`).join("")}
      <p class="chart-note">Chongqing's 32.13 million covers a municipality the size of a province; Shanghai, at 24.88 million, is the largest urban area.</p>
    </div>
    ${sourceLine(SOURCES.provinces + "; " + SOURCES.cities + ".")}
  `;
}

export function renderTrade() {
  const t = TRADE;
  const maxFlow = Math.max(t.exportsTrillionYuan, t.importsTrillionYuan);
  return `
    <h1>Foreign Trade</h1>
    <p class="lede">China was the world's largest goods trader in 2024: ¥43.85 trillion of imports and exports, up 5.0% on 2023.</p>
    <div class="kpis">
      <div class="kpi accent"><div class="value">¥43.85<small> trillion</small></div><div class="label">Total goods trade</div><div class="note">About US$6.1 trillion</div></div>
      <div class="kpi teal"><div class="value">¥25.45<small> trillion</small></div><div class="label">Exports</div><div class="note">Up 7.1% on 2023</div></div>
      <div class="kpi gold"><div class="value">¥18.39<small> trillion</small></div><div class="label">Imports</div><div class="note">Up 2.3% on 2023</div></div>
      <div class="kpi"><div class="value">¥7.06<small> trillion</small></div><div class="label">Trade surplus</div><div class="note">Exports minus imports</div></div>
    </div>
    <div class="card">
      <h2>Exports vs imports, 2024</h2>
      <div class="hbar-row"><span>Exports</span><span class="hbar-track"><span class="hbar-fill teal" style="display:block;width:100%"></span></span><span class="hbar-val">¥${fmt(t.exportsTrillionYuan)}T</span></div>
      <div class="hbar-row"><span>Imports</span><span class="hbar-track"><span class="hbar-fill" style="display:block;width:${((t.importsTrillionYuan / maxFlow) * 100).toFixed(1)}%"></span></span><span class="hbar-val">¥${fmt(t.importsTrillionYuan)}T</span></div>
      <p>China's exports were 14.5% of the world's total exports and its imports 10.5% of the world's total imports in the first three quarters of 2024 (World Trade Organization data, via the General Administration of Customs).</p>
    </div>
    <div class="two-col">
      <div class="card">
        <h2>Main trading partners, 2024</h2>
        <table>
          <thead><tr><th>Partner</th><th class="num">Trade (¥ trillion)</th></tr></thead>
          <tbody>
            ${t.partners.map((p) => `<tr><td><strong>${p.name}</strong><br><span style="color:var(--muted);font-size:13px">${p.note}</span></td><td class="num">${p.valueTrillionYuan === null ? "largest" : "¥" + fmt(p.valueTrillionYuan) + "T"}</td></tr>`).join("")}
          </tbody>
        </table>
        <p class="chart-note">Trade with Belt and Road countries was 50.3% of China's total foreign trade in 2024 — over half for the first time.</p>
      </div>
      <div class="card">
        <h2>What China sells most, 2023</h2>
        <p>Share of all exports, by product (UN Comtrade).</p>
        ${t.exportMix2023.map((m) => `
          <div class="hbar-row"><span>${m.item}</span><span class="hbar-track"><span class="hbar-fill" style="display:block;width:${((m.share / 7.6) * 100).toFixed(1)}%"></span></span><span class="hbar-val">${fmt(m.share, 1)}%</span></div>`).join("")}
        <p class="chart-note">Machinery and electrical products were 59.4% of all exports in 2024.</p>
      </div>
    </div>
    ${sourceLine(SOURCES.trade + ".")}
  `;
}
