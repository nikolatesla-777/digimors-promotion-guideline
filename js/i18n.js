const translations = {
  en: {
    siteTitle: "NexBet",
    siteSubtitle: "Comprehensive Bonuses & Promotions Guide",
    totalBonuses: "Total: 49 Bonuses & Promotions",
    sportsBonuses: "Sports Bonuses",
    slotBonuses: "Slot Bonuses",
    casinoBonuses: "Live Casino Bonuses",
    happyHour: "Happy Hour",
    generalPromotions: "General Promotions",
    systemPromotions: "System Promotions",
    systemFeatures: "System Features",
    bonusCount: "{count} Bonuses",
    viewAll: "View Details →",
    backToHome: "← Back to All Categories",
    rate: "Bonus Rate",
    minDeposit: "Minimum Deposit",
    maxBonus: "Maximum Bonus",
    wagering: "Wagering Requirement",
    validity: "Validity Period",
    eligibility: "Eligibility",
    exampleCalc: "Example Calculation",
    importantRules: "Important Rules & Conditions",
    happyHourActive: "Currently Active",
    happyHourInactive: "Currently Inactive",
    happyHourNote: "Happy Hour bonuses are available during specific time periods only. Check the schedule for active hours.",
    footer: "© 2026 NexBet - All Rights Reserved",
    badgeNew: "NEW",
    badgeVip: "VIP",
    badgeHot: "HOT",
    badgePopular: "POPULAR",
    claimBonus: "Claim Bonus"
  },
  he: {
    siteTitle: "NexBet",
    siteSubtitle: "מדריך מקיף לבונוסים ומבצעים",
    totalBonuses: "סה\"כ: 49 בונוסים ומבצעים",
    sportsBonuses: "בונוסי ספורט",
    slotBonuses: "בונוסי סלוטים",
    casinoBonuses: "בונוסי קזינו חי",
    happyHour: "שעת שמחה",
    generalPromotions: "מבצעים כלליים",
    systemPromotions: "מבצעי מערכת",
    systemFeatures: "תכונות מערכת",
    bonusCount: "{count} בונוסים",
    viewAll: "צפה בפרטים ←",
    backToHome: "חזרה לכל הקטגוריות →",
    rate: "אחוז בונוס",
    minDeposit: "הפקדה מינימלית",
    maxBonus: "בונוס מקסימלי",
    wagering: "דרישת מחזור",
    validity: "תקופת תוקף",
    eligibility: "זכאות",
    exampleCalc: "דוגמת חישוב",
    importantRules: "כללים ותנאים חשובים",
    happyHourActive: "פעיל כעת",
    happyHourInactive: "לא פעיל כעת",
    happyHourNote: "בונוסי שעת שמחה זמינים בתקופות זמן ספציפיות בלבד. בדוק את לוח הזמנים לשעות פעילות.",
    footer: "© 2026 NexBet - כל הזכויות שמורות",
    badgeNew: "חדש",
    badgeVip: "VIP",
    badgeHot: "חם",
    badgePopular: "פופולרי",
    claimBonus: "תבע בונוס"
  }
};

let currentLang = "en";

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("nexbet-lang", lang);
  document.documentElement.setAttribute("dir", lang === "he" ? "rtl" : "ltr");
  document.documentElement.setAttribute("lang", lang);
  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });
  if (typeof onLanguageChange === "function") {
    onLanguageChange(lang);
  }
}

function t(key, replacements) {
  let text = translations[currentLang][key] || translations["en"][key] || key;
  if (replacements) {
    Object.keys(replacements).forEach(k => {
      text = text.replace(`{${k}}`, replacements[k]);
    });
  }
  return text;
}

function getLocalizedField(obj) {
  if (!obj) return "";
  return obj[currentLang] || obj["en"] || "";
}

function initLang() {
  const saved = localStorage.getItem("nexbet-lang");
  if (saved && translations[saved]) {
    setLanguage(saved);
  } else {
    setLanguage("en");
  }
}
