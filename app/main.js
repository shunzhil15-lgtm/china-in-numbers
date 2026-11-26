// China in Numbers — router, controls and canvas charts.
// No network requests: everything is drawn from the site's own data.
import { ECONOMY, PROVINCES, POPULATION } from "./data.js";
import { renderOverview, renderPopulation, renderEconomy, renderProvinces, renderTrade, provinceRows } from "./views.js";

const app = document.getElementById("app");

const ROUTES = {
  "": renderOverview,
  overview: renderOverview,
  population: renderPopulation,
  economy: renderEconomy,
  provinces: renderProvinces,
  trade: renderTrade
};

function currentRoute() {
  const hash = window.location.hash.replace(/^#\/?/, "");
  return ROUTES[hash] ? hash : "";
}

function setActiveNav(route) {
  const key = route === "" ? "overview" : route;
  document.querySelectorAll(".main-nav a").forEach((a) => {
    a.classList.toggle("active", a.dataset.route === key);
  });
}

// ---- Canvas line chart for the GDP trend ---------------------------------
function drawGdpChart(canvas) {
  const mode = canvas.dataset.mode || "total";
  const points = ECONOMY.gdpTrend.map((r) => ({
    year: r.year,
    value: mode === "perCapita" ? r.perCapita : r.total
  }));
  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  if (!w || !h) return;
  canvas.width = Math.round(w * dpr);
  canvas.height = Math.round(h * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, w, h);

  const padL = 58, padR = 14, padT = 16, padB = 30;
  const max = Math.max(...points.map((p) => p.value)) * 1.08;
  const min = 0;
  const x = (i) => padL + (i * (w - padL - padR)) / (points.length - 1);
  const y = (v) => padT + (1 - (v - min) / (max - min)) * (h - padT - padB);

  ctx.font = "12px -apple-system, 'Segoe UI', Roboto, Arial, sans-serif";
  ctx.fillStyle = "#5b6b7a";
  ctx.strokeStyle = "#dfe4e8";
  ctx.lineWidth = 1;
  // Gridlines and y labels (4 ticks)
  for (let t = 0; t <= 4; t++) {
    const v = (max / 4) * t;
    const yy = y(v);
    ctx.beginPath();
    ctx.moveTo(padL, yy);
    ctx.lineTo(w - padR, yy);
    ctx.stroke();
    const label = mode === "perCapita" ? "¥" + Math.round(v).toLocaleString("en-US") : "¥" + v.toFixed(0) + "T";
    ctx.textAlign = "right";
    ctx.fillText(label, padL - 8, yy + 4);
  }
  // Line
  ctx.strokeStyle = "#14304d";
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  points.forEach((p, i) => (i === 0 ? ctx.moveTo(x(i), y(p.value)) : ctx.lineTo(x(i), y(p.value))));
  ctx.stroke();
  // Points and labels
  points.forEach((p, i) => {
    ctx.beginPath();
    ctx.fillStyle = i === points.length - 1 ? "#c0392b" : "#14304d";
    ctx.arc(x(i), y(p.value), 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#5b6b7a";
    ctx.textAlign = "center";
    ctx.fillText(String(p.year), x(i), h - 10);
  });
  // Value labels on first and last point
  ctx.fillStyle = "#14304d";
  ctx.font = "bold 13px -apple-system, 'Segoe UI', Roboto, Arial, sans-serif";
  ctx.textAlign = "left";
  const first = points[0];
  const last = points[points.length - 1];
  ctx.fillText(mode === "perCapita" ? "¥" + first.value.toLocaleString("en-US") : "¥" + first.value.toFixed(2) + "T", x(0) + 6, y(first.value) - 10);
  ctx.textAlign = "right";
  ctx.fillText(mode === "perCapita" ? "¥" + last.value.toLocaleString("en-US") : "¥" + last.value.toFixed(2) + "T", x(points.length - 1) - 6, y(last.value) - 10);
}

function drawCharts() {
  document.querySelectorAll("canvas[data-chart='gdp']").forEach(drawGdpChart);
}

// ---- Provinces controls ----------------------------------------------------
function initProvinces() {
  const search = document.getElementById("province-search");
  const rows = document.getElementById("province-rows");
  const count = document.getElementById("province-count");
  if (!search || !rows) return;
  let sortKey = "population";
  function refresh() {
    const q = search.value.trim().toLowerCase();
    const filtered = PROVINCES.filter((p) =>
      q === "" || p.name.toLowerCase().includes(q) || p.capital.toLowerCase().includes(q)
    );
    rows.innerHTML = filtered.length
      ? provinceRows(filtered, sortKey)
      : `<tr><td colspan="5" class="empty">No province matches “${search.value.trim()}”.</td></tr>`;
    count.textContent = `Showing ${filtered.length} of ${PROVINCES.length} provinces`;
  }
  document.querySelectorAll("[data-sort]").forEach((btn) => {
    btn.addEventListener("click", () => {
      sortKey = btn.dataset.sort;
      document.querySelectorAll("[data-sort]").forEach((b) => b.classList.toggle("on", b === btn));
      refresh();
    });
  });
  search.addEventListener("input", refresh);
  refresh();
}

// ---- GDP toggle -------------------------------------------------------------
function initGdpToggle() {
  const canvas = document.querySelector("canvas[data-chart='gdp']");
  if (!canvas) return;
  document.querySelectorAll("[data-gdp-mode]").forEach((btn) => {
    btn.addEventListener("click", () => {
      canvas.dataset.mode = btn.dataset.gdpMode;
      document.querySelectorAll("[data-gdp-mode]").forEach((b) => b.classList.toggle("on", b === btn));
      drawGdpChart(canvas);
    });
  });
}

// ---- Router ------------------------------------------------------------------
function render() {
  const route = currentRoute();
  app.innerHTML = ROUTES[route]();
  setActiveNav(route);
  drawCharts();
  initGdpToggle();
  initProvinces();
  window.scrollTo(0, 0);
}

window.addEventListener("hashchange", render);
window.addEventListener("resize", drawCharts);
render();
