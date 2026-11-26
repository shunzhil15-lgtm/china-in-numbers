// China in Numbers — all figures are real and sourced.
// Sources: National Bureau of Statistics of China, Statistical Communique
// on the 2024 National Economic and Social Development (28 Feb 2025);
// NBS Statistical Yearbook 2025; General Administration of Customs
// (GAC) trade release, 13 Jan 2025. All figures are for mainland China
// and for the year 2024 unless a different year is stated.

export const SOURCES = {
  population: "National Bureau of Statistics, Statistical Communiqué on the 2024 National Economic and Social Development, 28 Feb 2025",
  gdp: "National Bureau of Statistics, Statistical Yearbook 2025 and 2024 Statistical Communiqué",
  provinces: "National Bureau of Statistics provincial releases, 2024; population figures are 2024 year-end estimates",
  cities: "2024 Statistical Communiqués of each city",
  trade: "General Administration of Customs, 13 Jan 2025"
};

export const OVERVIEW = {
  country: "China",
  capital: "Beijing",
  areaKm2: 9600000,
  areaNote: "9.60 million km²",
  currency: "Yuan (CNY)",
  divisions: "31 provincial-level divisions",
  populationRank: "2nd most populous country in the world",
  gdpRank: "2nd largest economy in the world"
};

export const POPULATION = {
  year: 2024,
  totalMillion: 1408.28,
  changeMillion: -1.39,
  changeNote: "third straight annual decline",
  urbanMillion: 943.50,
  urbanShare: 67.0,
  ruralMillion: 464.78,
  ruralShare: 33.0,
  maleMillion: 719.09,
  maleShare: 51.1,
  femaleMillion: 689.19,
  femaleShare: 48.9,
  birthsMillion: 9.54,
  birthRate: 6.77,
  deathsMillion: 10.93,
  deathRate: 7.76,
  naturalGrowthRate: -0.99,
  // NBS age bands at year-end 2024 (65+ is a subset of 60+)
  ageBands: [
    { label: "Aged 0–15", million: 239.99, share: 17.1 },
    { label: "Aged 16–59", million: 857.98, share: 60.9 },
    { label: "Aged 60 and over", million: 310.31, share: 22.0 }
  ],
  aged65Million: 220.23,
  aged65Share: 15.6
};

export const ECONOMY = {
  year: 2024,
  gdpBillionYuan: 134908.4,
  gdpTrillionYuan: 134.91,
  gdpGrowth: 5.0,
  gdpUsdTrillion: 18.8,
  gdpPerCapitaYuan: 95749,
  gdpPerCapitaUsd: 13391,
  retailSalesTrillionYuan: 48.79,
  retailGrowth: 3.5,
  sectors: [
    { name: "Primary (farming, forestry, fishing, mining)", billionYuan: 9141.4, share: 6.8 },
    { name: "Secondary (manufacturing, construction)", billionYuan: 49208.7, share: 36.5 },
    { name: "Tertiary (services)", billionYuan: 76558.3, share: 56.7 }
  ],
  // GDP in trillion yuan, current prices, NBS Statistical Yearbook 2025
  gdpTrend: [
    { year: 2015, total: 68.89, perCapita: 49922 },
    { year: 2016, total: 74.64, perCapita: 53783 },
    { year: 2017, total: 83.20, perCapita: 59592 },
    { year: 2018, total: 91.93, perCapita: 65534 },
    { year: 2019, total: 98.65, perCapita: 70078 },
    { year: 2020, total: 101.36, perCapita: 71828 },
    { year: 2021, total: 114.92, perCapita: 81370 },
    { year: 2022, total: 120.47, perCapita: 85358 },
    { year: 2023, total: 129.43, perCapita: 91746 },
    { year: 2024, total: 134.91, perCapita: 95749 }
  ]
};

// Provinces by 2024 year-end population. GDP is the 2024 preliminary
// figure in trillion yuan where our sources state one; Hebei's GDP is
// left blank rather than guessed.
export const PROVINCES = [
  { name: "Guangdong", capital: "Guangzhou", populationMillion: 127.06, gdpTrillionYuan: 14.16 },
  { name: "Shandong", capital: "Jinan", populationMillion: 101.53, gdpTrillionYuan: 9.86 },
  { name: "Henan", capital: "Zhengzhou", populationMillion: 98.72, gdpTrillionYuan: 6.36 },
  { name: "Jiangsu", capital: "Nanjing", populationMillion: 85.26, gdpTrillionYuan: 13.70 },
  { name: "Sichuan", capital: "Chengdu", populationMillion: 83.74, gdpTrillionYuan: 6.47 },
  { name: "Hebei", capital: "Shijiazhuang", populationMillion: 74.61, gdpTrillionYuan: null },
  { name: "Zhejiang", capital: "Hangzhou", populationMillion: 66.27, gdpTrillionYuan: 9.01 },
  { name: "Hunan", capital: "Changsha", populationMillion: 65.68, gdpTrillionYuan: 5.32 }
];

// Largest cities by 2024 permanent population (whole municipality /
// city area, not just the built-up core).
export const CITIES = [
  { name: "Chongqing", populationMillion: 32.13 },
  { name: "Shanghai", populationMillion: 24.88 },
  { name: "Beijing", populationMillion: 21.84 },
  { name: "Chengdu", populationMillion: 21.47 },
  { name: "Guangzhou", populationMillion: 18.98 },
  { name: "Shenzhen", populationMillion: 17.99 }
];

export const TRADE = {
  year: 2024,
  totalTrillionYuan: 43.85,
  totalGrowth: 5.0,
  totalUsdTrillion: 6.1,
  exportsTrillionYuan: 25.45,
  exportsGrowth: 7.1,
  exportsUsdTrillion: 3.55,
  importsTrillionYuan: 18.39,
  importsGrowth: 2.3,
  surplusTrillionYuan: 7.06,
  worldShareExports: 14.5,
  worldShareImports: 10.5,
  machineryShareOfExports: 59.4,
  briShare: 50.3,
  partners: [
    { name: "ASEAN", note: "China's largest trading partner", valueTrillionYuan: null },
    { name: "European Union", note: "Second-largest partner", valueTrillionYuan: 5.59 },
    { name: "United States", note: "Third-largest partner", valueTrillionYuan: 4.90 }
  ],
  // Export mix, 2023, UN Comtrade via Business Wales trade profile
  exportMix2023: [
    { item: "Telephone sets, incl. mobile phones", share: 7.6 },
    { item: "Computers and data-processing machines", share: 4.4 },
    { item: "Electronic integrated circuits", share: 4.0 },
    { item: "Motor vehicles", share: 2.3 },
    { item: "Electric batteries", share: 2.1 }
  ]
};
