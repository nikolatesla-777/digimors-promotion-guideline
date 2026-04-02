let bonusData = null;

async function loadBonusData() {
  const basePath = window.location.pathname.includes("/pages/") ? "../data/bonuses.json" : "data/bonuses.json";
  const resp = await fetch(basePath);
  bonusData = await resp.json();
  return bonusData;
}

function renderBonusCards(categoryId, containerId) {
  const container = document.getElementById(containerId);
  if (!container || !bonusData || !bonusData[categoryId]) return;

  const category = bonusData[categoryId];
  container.innerHTML = "";

  category.bonuses.forEach((bonus, index) => {
    const card = document.createElement("div");
    card.className = "bonus-card";
    card.id = bonus.id;

    const badgeHTML = bonus.badge ? `<span class="bonus-card-badge badge-${bonus.badge}">${t("badge" + bonus.badge.charAt(0).toUpperCase() + bonus.badge.slice(1))}</span>` : "";

    const rulesArray = getLocalizedField(bonus.rules);
    const rulesHTML = rulesArray.length ? rulesArray.map(r => `<li>${r}</li>`).join("") : "";

    card.innerHTML = `
      <div class="bonus-card-header" onclick="toggleCard('${bonus.id}')">
        <div class="bonus-card-header-left">
          <span class="bonus-number">${index + 1}</span>
          <span class="bonus-card-title">${getLocalizedField(bonus.name)}</span>
        </div>
        ${badgeHTML}
        <span class="bonus-toggle">&#9660;</span>
      </div>
      <div class="bonus-card-body">
        <div class="bonus-detail">
          <p class="bonus-description">${getLocalizedField(bonus.description)}</p>
          <div class="bonus-info-grid">
            <div class="bonus-info-item">
              <div class="bonus-info-label">${t("rate")}</div>
              <div class="bonus-info-value">${getLocalizedField(bonus.details.rate)}</div>
            </div>
            <div class="bonus-info-item">
              <div class="bonus-info-label">${t("minDeposit")}</div>
              <div class="bonus-info-value">${getLocalizedField(bonus.details.minDeposit)}</div>
            </div>
            <div class="bonus-info-item">
              <div class="bonus-info-label">${t("maxBonus")}</div>
              <div class="bonus-info-value">${getLocalizedField(bonus.details.maxBonus)}</div>
            </div>
            <div class="bonus-info-item">
              <div class="bonus-info-label">${t("wagering")}</div>
              <div class="bonus-info-value">${getLocalizedField(bonus.details.wagering)}</div>
            </div>
            <div class="bonus-info-item">
              <div class="bonus-info-label">${t("validity")}</div>
              <div class="bonus-info-value">${getLocalizedField(bonus.details.validity)}</div>
            </div>
            <div class="bonus-info-item">
              <div class="bonus-info-label">${t("eligibility")}</div>
              <div class="bonus-info-value">${getLocalizedField(bonus.details.eligibility)}</div>
            </div>
          </div>
          <div class="bonus-example">
            <h4>${t("exampleCalc")}</h4>
            <p>${getLocalizedField(bonus.example)}</p>
          </div>
          <div class="bonus-rules">
            <h4>${t("importantRules")}</h4>
            <ul>${rulesHTML}</ul>
          </div>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

function toggleCard(id) {
  const card = document.getElementById(id);
  if (card) card.classList.toggle("open");
}

function onLanguageChange(lang) {
  const page = document.body.dataset.page;
  if (page && bonusData) {
    renderBonusCards(page, "bonus-container");
  }
  if (page === "home") {
    renderLandingCards();
  }
}

function renderLandingCards() {
  const grid = document.getElementById("categories-grid");
  if (!grid || !bonusData) return;

  const categories = [
    { id: "sports", page: "sports.html", cssClass: "sports", icon: "&#9917;" },
    { id: "slots", page: "slots.html", cssClass: "slots", icon: "&#127920;" },
    { id: "casino", page: "casino.html", cssClass: "casino", icon: "&#127183;" },
    { id: "happyhour", page: "happy-hour.html", cssClass: "happy-hour", icon: "&#9200;" },
    { id: "promotions", page: "promotions.html", cssClass: "promotions", icon: "&#127873;" },
    { id: "system", page: "system.html", cssClass: "system", icon: "&#9881;" }
  ];

  grid.innerHTML = "";
  const catNameKeys = {
    sports: "sportsBonuses",
    slots: "slotBonuses",
    casino: "casinoBonuses",
    happyhour: "happyHour",
    promotions: "generalPromotions",
    system: "systemPromotions"
  };

  categories.forEach(cat => {
    const data = bonusData[cat.id];
    if (!data) return;
    const count = data.bonuses.length;
    const preview = data.bonuses.slice(0, 3).map(b => `<li>${getLocalizedField(b.name)}</li>`).join("");

    const card = document.createElement("a");
    card.href = "pages/" + cat.page;
    card.className = "category-card " + cat.cssClass;
    card.innerHTML = `
      <div class="category-icon">${cat.icon}</div>
      <h3>${t(catNameKeys[cat.id])}</h3>
      <div class="bonus-count">${t("bonusCount", { count: count })}</div>
      <ul class="bonus-preview">${preview}</ul>
      <span class="view-all">${t("viewAll")}</span>
    `;
    grid.appendChild(card);
  });
}

async function initPage() {
  await loadBonusData();
  initLang();
  const page = document.body.dataset.page;
  if (page === "home") {
    renderLandingCards();
  } else if (page && bonusData[page]) {
    renderBonusCards(page, "bonus-container");
  }
}

document.addEventListener("DOMContentLoaded", initPage);
