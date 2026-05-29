// ─────────────────────────────────────────────────────────────────────
// Process step definitions
// ─────────────────────────────────────────────────────────────────────
const processSteps = [
  {
    id: "claimpruefung",
    title: "Formale Prüfung",
    type: "core",
    details: [
      "Formale Prüfung",
      "Prüfung gem. Checkliste",
      "Vorausgehende Ereignisse, Anzeigen etc.",
    ],
    role: ["Claim Manager"],
    documents: ["Eingegangener Schriftsatz", "Nachtragsangebot", "Historie/Anlagen"],
  },
  {
    id: "fachtechnische-pruefung",
    title: "(Fach-) Technische Prüfung",
    type: "check",
    details: [
      "Fachlich inhaltliche Prüfung, inkl. Beschreibung der Leistung richtig",
      "Alternative Lösungen",
      "Gründe, warum Leistung urspr. nicht beauftragt wurde",
      "Prüfung, ob Leistung bereits in Teilen oder vollständig erbracht",
    ],
    role: ["Technischer Fachbereich"],
    documents: [
      "Leistungsverzeichnis",
      "Techn. Pläne",
      "Baugrundgutachten",
      "Vor-Ort-Begehungen",
      "Zertifizierungsvorgaben",
      "Normen, techn. Standards, anerkannte Regeln der Technik",
      "Einschlägige öff. Vorschriften",
    ],
  },
  {
    id: "kostenverfolgung",
    title: "Kostenverfolgung",
    type: "check",
    details: [
      "Prüfung, ob Verwendung von Projektbudget, Contingency, Risikobudget",
      "Ggfs. Budgetantrag",
      "z. B. DIN276 oder gewerke-spezifische Prüfung",
    ],
    role: ["Kostenplaner/Controlling"],
    documents: ["GAEB-Datei", "Budgetübersichten"],
  },
  {
    id: "pruefung-dem-grunde",
    title: "Prüfung dem Grunde nach",
    type: "core",
    details: [
      "Prüfung dem Grunde nach: Hat der Lieferant einen zusätzlichen Vergütungsanspruch",
      "Vertragliche Prüfung unter Einbeziehung und Bewertung der technischen Prüfung",
    ],
    role: ["Contract Manager", "Rechtliche Beratung"],
    documents: ["Eingegangener Schriftsatz", "Nachtragsangebot", "Vertrag im Ganzen"],
  },
  {
    id: "terminliche-pruefung",
    title: "Terminliche Prüfung",
    type: "check",
    details: [
      "Hinweise auf terminl. Verschiebungen im Nachtragsangebot",
      "Prüfung von Abweichungen auf wesentliche Meilensteine, betroffene Terminpläne",
    ],
    role: ["Terminplaner"],
    documents: ["Eingegangener Schriftsatz", "Nachtragsangebot", "Terminpläne"],
  },
  {
    id: "pruefung-hoehe",
    title: "Prüfung der Höhe nach",
    type: "check",
    details: [
      "Entscheidung der Prüfung nach vorkalkulatorischer Preisfortschreibung oder tatsächlichen Kosten oder marktüblichen Preisen",
      "Prüfung der vorherigen Bewertungen der Teilprüfungen",
      "Zusammenfassung und Empfehlung ggf. Handlungsalternativen",
      "Ggf. Auseinandersetzung mit üblichen Zuschlägen für AGK",
    ],
    role: ["Claim Manager", "Einkauf"],
    documents: ["Vertrag", "Bestellungen", "Stammdaten", "Dokumentation in Claimtool"],
  },
  {
    id: "risikoangaben",
    title: "Risikobewertung",
    type: "check",
    details: [
      "Abgleich mit Risikoregister",
      "Passendes Risiko finden und eintragen",
    ],
    role: ["Risikomanager"],
    documents: ["Risikoregister"],
  },
  {
    id: "verhandlung",
    title: "Verhandlung",
    type: "check",
    optional: "AG-spezifisch",
    details: [
      "Zu verhandelnde Punkte identifizieren",
      "Verhandlungsstrategie festlegen",
      "Informationen zusammenstellen",
      "Verhandlung vorbereiten",
    ],
    role: ["Claim Manager"],
    documents: ["Nachtragsangebot", "Vertrag", "Nachtrags-/Bestellhistorie", "Dokumentation"],
  },
  {
    id: "annahme-ablehnung",
    title: "Annahme-/ Ablehnungsschreiben",
    type: "core",
    details: [
      "Freigabe durch Auftraggeber",
      "Erstellung Annahme-/Ablehnungsschreiben",
      "Fortschreibung in der Kostenverfolgung (durch Bestellung des Nachtrags)",
    ],
    role: ["Claim Manager", "Contract Manager", "Techn. Fachbereich"],
    documents: ["Dokumentation in Claimtool"],
  },
];

// ─────────────────────────────────────────────────────────────────────
// KI-Unterstützung je Prozessschritt
// (basierend auf dem KI-Unterstützungskonzept für das Claim-Management)
// ─────────────────────────────────────────────────────────────────────
const aiStepSupport = {
  "claimpruefung": {
    title: "KI-gestützte Erstprüfung",
    description:
      "Die KI analysiert den eingegangenen Schriftsatz, identifiziert relevante " +
      "Vertragsklauseln und prüft die formale Vollständigkeit des Claims. Sie gibt " +
      "eine erste Einschätzung zur möglichen Anspruchsgrundlage.",
    capabilities: [
      "Analyse des Claim-Schriftsatzes auf formale Vollständigkeit",
      "Identifikation relevanter Vertragsklauseln und Verweise",
      "Erste Einschätzung zur Berechtigung des Anspruchs dem Grunde nach",
    ],
  },
  "fachtechnische-pruefung": {
    title: "KI-gestützter Normenabgleich",
    description:
      "Die KI gleicht die Leistungsbeschreibung mit technischen Normen (EN, DIN), " +
      "öffentlich-rechtlichen Vorschriften und gängigen Verordnungen ab. Ziel ist " +
      "die Prüfung, ob es sich um Nebenleistungen (im Rahmen der Vergütung) oder " +
      "besondere Leistungen (nachtragsfähig) handelt.",
    capabilities: [
      "Abgleich mit DIN/EN-Normen und anerkannten Regeln der Technik",
      "Prüfung auf einschlägige öffentlich-rechtliche Vorschriften",
      "Einordnung: Nebenleistung vs. besondere (nachtragsfähige) Leistung",
    ],
  },
  "kostenverfolgung": {
    title: "KI-gestützte Kostenbewertung",
    description:
      "Die KI prüft die aufgerufenen Einheitspreise gegen den Vertrag und " +
      "Preisblatt und bewertet die Plausibilität der Mengenansätze. Bei Anbindung " +
      "einer Preisdatenbank erfolgt ein Benchmarking gegen Marktpreise.",
    capabilities: [
      "Preisabgleich mit Vertrag, Leistungsverzeichnis und Preisblatt",
      "Benchmarking gegen BKI, Sirados und Mittag-Baupreistabellen",
      "Plausibilitätsprüfung der angesetzten Mengen und Kostenpositionen",
    ],
  },
  "pruefung-dem-grunde": {
    title: "KI-gestützte Vertragsprüfung",
    description:
      "Die KI erstellt im ersten Schritt einen Abgleich des Nachtrags mit dem " +
      "Vertrag/der Bestellung und prüft im zweiten Schritt anhand von Normen und " +
      "Vorschriften, ob ein zusätzlicher Vergütungsanspruch dem Grunde nach " +
      "besteht oder ob die Leistung vertraglich geschuldet ist.",
    capabilities: [
      "Abgleich Nachtragsangebot vs. Vertrag und Leistungsverzeichnis",
      "Identifikation vertraglich geschuldeter Leistungsumfänge",
      "Einschätzung: Vergütungsanspruch berechtigt / Nebenleistung / besondere Leistung",
    ],
  },
  "terminliche-pruefung": {
    title: "KI-gestützte Terminanalyse",
    description:
      "Die KI analysiert die vorliegenden Terminpläne und identifiziert potenzielle " +
      "Auswirkungen des Claims auf den kritischen Pfad sowie auf wesentliche " +
      "Vertragsmeilensteine.",
    capabilities: [
      "Automatische Identifikation betroffener Meilensteine",
      "Analyse kritischer Pfad-Auswirkungen anhand aktueller Terminpläne",
      "Soll-/Ist-Vergleich der Terminplanung",
    ],
  },
  "pruefung-hoehe": {
    title: "KI-gestützte Preisfortschreibung",
    description:
      "Die KI gleicht aufgerufene Preise pro Einheit mit dem Vertrag und Preisblatt " +
      "ab und gibt hierzu eine Einschätzung. Bei Anbindung einer Preisdatenbank " +
      "prüft die KI zusätzlich, ob die aufgerufenen Mengen im Vergleich zu " +
      "üblichen Marktpreisen plausibel sind (z. B. Preis je Meter Zufahrtsstraße).",
    capabilities: [
      "Vorkalkulatorische Preisfortschreibung auf Basis des Vertrags",
      "Marktpreisabgleich: BKI, Sirados, Baupreisindex, Baugerätelisten",
      "Bewertung AGK-Zuschläge, Wagnis und Gewinn",
    ],
  },
  "risikoangaben": {
    title: "KI-gestützter Risikoabgleich",
    description:
      "Die KI gleicht den Claim gegen das Risikoregister ab und unterbreitet dem " +
      "Risikomanager Vorschläge, welche Risikopositionen betroffen sein könnten. " +
      "Der Risikomanager trifft die endgültige Auswahl und Bewertung.",
    capabilities: [
      "Automatischer Abgleich mit dem Projektrisiko-Register",
      "Vorschläge zu betroffenen Risikopositionen (Lessons Learned-Datenbank)",
      "Voreinschätzung Eintrittswahrscheinlichkeit und Schadenshöhe",
    ],
  },
  "verhandlung": {
    title: "KI-gestützte Verhandlungsvorbereitung",
    description:
      "Die KI fasst die Ergebnisse aller vorgelagerten Prüfschritte zusammen und " +
      "erarbeitet auf dieser Basis eine Verhandlungsstrategie sowie einen " +
      "akzeptablen Verhandlungskorridor.",
    capabilities: [
      "Zusammenfassung der Prüfergebnisse aus allen vorherigen Schritten",
      "Ableitung einer Verhandlungsstrategie und Positionierung",
      "Identifikation akzeptabler Verhandlungskorridore",
    ],
  },
  "annahme-ablehnung": {
    title: "KI-gestützter Schriftenentwurf",
    description:
      "Die KI erstellt auf Basis der vollständigen Prüfergebnisse einen Entwurf " +
      "für das Annahme- oder Ablehnungsschreiben, der vom Contract Manager " +
      "geprüft und freigegeben wird.",
    capabilities: [
      "Automatischer Entwurf des Annahme-/Ablehnungsschreibens",
      "Begründung auf Basis der dokumentierten Prüfergebnisse",
      "Anpassung an Vertragssprache und relevante Klauseln",
    ],
  },
};

// ─────────────────────────────────────────────────────────────────────
// Detail field configuration
// ─────────────────────────────────────────────────────────────────────
const detailFieldConfig = {
  claimpruefung: [
    { name: "eingangDatum", label: "Eingangsdatum", type: "date", required: true },
    { name: "claimReferenz", label: "Claim-Referenz", type: "text", required: true },
    {
      name: "claimArt", label: "Claim-Art", type: "select", required: true,
      options: ["Nachtrag", "Schadensersatz", "Behinderung", "Verlängerung", "Sonstiges"],
    },
    {
      name: "anzeigeGeprueft", label: "Anzeige vollständig geprüft",
      type: "checkbox", required: true, fullWidth: true,
    },
    {
      name: "formalKommentar", label: "Kommentar zur formalen Prüfung",
      type: "textarea", required: true, fullWidth: true, rows: 3,
    },
  ],
  "fachtechnische-pruefung": [
    { name: "fachbereich", label: "Fachbereich", type: "text", required: true },
    {
      name: "leistungsbeschreibung", label: "Leistungsbeschreibung plausibel",
      type: "select", required: true, options: ["Ja", "Teilweise", "Nein"],
    },
    {
      name: "leistungsart", label: "Leistungseinordnung", type: "select", required: true,
      options: ["Nebenleistung (vertraglich geschuldet)", "Besondere Leistung (nachtragsfähig)", "Unklar – weitere Prüfung erforderlich"],
    },
    {
      name: "alternativen", label: "Alternative Lösungen / Anmerkungen",
      type: "textarea", required: true, fullWidth: true, rows: 3,
    },
    {
      name: "technischerKommentar", label: "Technischer Prüfkommentar",
      type: "textarea", required: true, fullWidth: true, rows: 3,
    },
  ],
  kostenverfolgung: [
    {
      name: "budgetTopf", label: "Budgetquelle", type: "select", required: true,
      options: ["Projektbudget", "Contingency", "Risikobudget", "Budgetantrag erforderlich"],
    },
    { name: "geschaetzteKosten", label: "Geschätzte Mehrkosten (EUR)", type: "number", required: true },
    { name: "budgetantrag", label: "Budgetantrag erforderlich", type: "checkbox", fullWidth: true },
    {
      name: "kostenkommentar", label: "Kommentar zur Kostenverfolgung",
      type: "textarea", required: true, fullWidth: true, rows: 3,
    },
  ],
  "pruefung-dem-grunde": [
    {
      name: "anspruch", label: "Vergütungsanspruch dem Grunde nach", type: "select", required: true,
      options: ["Bestätigt", "Teilweise bestätigt", "Abgelehnt – Nebenleistung", "Abgelehnt – Sonstige Gründe"],
    },
    { name: "vertragsklausel", label: "Relevante Vertragsklausel / Position", type: "text", required: true },
    {
      name: "rechtlicherHinweis", label: "Rechtlicher Prüfkommentar",
      type: "textarea", required: true, fullWidth: true, rows: 3,
    },
  ],
  "terminliche-pruefung": [
    { name: "betroffenerMeilenstein", label: "Betroffener Meilenstein", type: "text", required: true },
    { name: "terminverschiebung", label: "Verschiebung in Arbeitstagen", type: "number", required: true },
    {
      name: "kritPfadBewertung", label: "Kritischer-Pfad-Bewertung", type: "select", required: true,
      options: ["Kritischer Pfad betroffen", "Puffer vorhanden – kein Einfluss", "Weitere Analyse erforderlich"],
    },
    {
      name: "terminKommentar", label: "Kommentar zur Terminprüfung",
      type: "textarea", required: true, fullWidth: true, rows: 3,
    },
  ],
  "pruefung-hoehe": [
    {
      name: "bewertungsmethode", label: "Bewertungsmethode", type: "select", required: true,
      options: ["Vorkalkulatorische Preisfortschreibung", "Tatsächliche Kosten (Nachkalkulation)", "Marktübliche Preise (Benchmarking)"],
    },
    { name: "empfohlenerBetrag", label: "Empfohlener anerkannter Betrag (EUR)", type: "number", required: true },
    { name: "agkBewertet", label: "AGK-Zuschläge bewertet und berücksichtigt", type: "checkbox", fullWidth: true },
    {
      name: "handlungsempfehlung", label: "Handlungsempfehlung / Alternativen",
      type: "textarea", required: true, fullWidth: true, rows: 3,
    },
  ],
  risikoangaben: [
    { name: "risikoId", label: "Risikoregister-ID", type: "text", required: true },
    {
      name: "eintritt", label: "Eintrittswahrscheinlichkeit", type: "select", required: true,
      options: ["Niedrig (< 25 %)", "Mittel (25–60 %)", "Hoch (> 60 %)"],
    },
    {
      name: "auswirkung", label: "Auswirkung (Schadenshöhe)", type: "select", required: true,
      options: ["Niedrig", "Mittel", "Hoch", "Kritisch"],
    },
    {
      name: "massnahme", label: "Risikomaßnahme / Gegensteuerung",
      type: "textarea", required: true, fullWidth: true, rows: 3,
    },
  ],
  verhandlung: [
    { name: "verhandlungstermin", label: "Verhandlungstermin", type: "date", required: true },
    {
      name: "verhandlungsposition", label: "Verhandlungsposition", type: "select", required: true,
      options: ["Volle Anerkennung anstreben", "Kompromiss anstreben", "Ablehnung – Gegenangebot vorbereiten"],
    },
    {
      name: "strategie", label: "Verhandlungsstrategie",
      type: "textarea", required: true, fullWidth: true, rows: 3,
    },
    {
      name: "verhandlungsziele", label: "Verhandlungsziele und akzeptabler Korridor",
      type: "textarea", required: true, fullWidth: true, rows: 3,
    },
  ],
  "annahme-ablehnung": [
    {
      name: "entscheidung", label: "Entscheidung", type: "select", required: true,
      options: ["Annahme", "Teilannahme mit Kürzung", "Ablehnung"],
    },
    { name: "anerkannterBetrag", label: "Anerkannter Betrag (EUR)", type: "number", required: true },
    { name: "freigabeDatum", label: "Freigabedatum", type: "date", required: true },
    { name: "schreibenVersendet", label: "Schreiben erstellt und versendet", type: "checkbox", required: true, fullWidth: true },
    {
      name: "abschlussnotiz", label: "Abschlussnotiz / Begründung",
      type: "textarea", required: true, fullWidth: true, rows: 3,
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────
// State
// ─────────────────────────────────────────────────────────────────────
const aiModelTemperature = 0.2;
let aiConfigData = { endpoint: "", deployment: "", apiVersion: "2024-10-21", apiKey: "" };

let currentDetailStepIndex = 0;
let highestUnlockedDetailStepIndex = 0;
const detailCompletedSteps = new Set();
const detailValuesByStepId = {};
const uploadedFilesList = [];

// ─────────────────────────────────────────────────────────────────────
// DOM references
// ─────────────────────────────────────────────────────────────────────
const detailStepper        = document.getElementById("detail-stepper");
const detailForm           = document.getElementById("detail-form");
const detailStepTitle      = document.getElementById("detail-step-title");
const detailStepRole       = document.getElementById("detail-step-role");
const detailStepStatus     = document.getElementById("detail-step-status");
const stepRequiredDocs     = document.getElementById("step-required-docs");
const detailPrevButton     = document.getElementById("detail-prev");
const detailNextButton     = document.getElementById("detail-next");
const aiStepSelect         = document.getElementById("ai-step-select");
const aiOutput             = document.getElementById("ai-output");
const aiRunButton          = document.getElementById("ai-run");
const aiCopyButton         = document.getElementById("ai-copy-btn");
const aiStepInfo           = document.getElementById("ai-step-info");
const aiInstruction        = document.getElementById("ai-instruction");
const aiConfigForm         = document.getElementById("ai-config-form");
const settingsTrigger      = document.getElementById("settings-trigger");
const settingsPanel        = document.getElementById("settings-panel");
const settingsClose        = document.getElementById("settings-close");
const uploadTrigger        = document.getElementById("upload-trigger");
const uploadPanel          = document.getElementById("upload-panel");
const uploadPanelClose     = document.getElementById("upload-panel-close");
const uploadDropZone       = document.getElementById("upload-drop-zone");
const fileInput            = document.getElementById("file-input");
const fileBrowseBtn        = document.getElementById("file-browse-btn");
const uploadedFilesEl      = document.getElementById("uploaded-files");

// ─────────────────────────────────────────────────────────────────────
// Settings panel
// ─────────────────────────────────────────────────────────────────────
function openSettings() {
  settingsPanel.hidden = false;
  settingsTrigger.setAttribute("aria-expanded", "true");
}

function closeSettings() {
  settingsPanel.hidden = true;
  settingsTrigger.setAttribute("aria-expanded", "false");
}

settingsTrigger.addEventListener("click", () => {
  if (settingsPanel.hidden) { openSettings(); } else { closeSettings(); }
});

settingsClose.addEventListener("click", closeSettings);

document.addEventListener("click", (event) => {
  if (
    !settingsPanel.hidden &&
    !settingsTrigger.contains(event.target) &&
    !settingsPanel.contains(event.target)
  ) {
    closeSettings();
  }
});

aiConfigForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const fd = new FormData(aiConfigForm);
  aiConfigData.endpoint   = String(fd.get("azure-endpoint")    || "").trim();
  aiConfigData.deployment = String(fd.get("azure-deployment")  || "").trim();
  aiConfigData.apiVersion = String(fd.get("azure-api-version") || "").trim();
  aiConfigData.apiKey     = String(fd.get("azure-api-key")     || "").trim();
  closeSettings();
});

// ─────────────────────────────────────────────────────────────────────
// Document upload
// ─────────────────────────────────────────────────────────────────────
uploadTrigger.addEventListener("click", () => { uploadPanel.hidden = false; });
uploadPanelClose.addEventListener("click", () => { uploadPanel.hidden = true; });
fileBrowseBtn.addEventListener("click", () => fileInput.click());

function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function addFilesToList(files) {
  Array.from(files).forEach((file) => {
    if (file.size > 25 * 1024 * 1024) {
      alert(`"${file.name}" überschreitet das Limit von 25 MB und wurde nicht hinzugefügt.`);
      return;
    }
    uploadedFilesList.push({ name: file.name, size: file.size });
    renderFileList();
  });
}

function renderFileList() {
  uploadedFilesEl.replaceChildren();
  uploadedFilesList.forEach((file, index) => {
    const li = document.createElement("li");
    li.className = "file-list-item";

    const nameSpan = document.createElement("span");
    nameSpan.className = "file-list-item-name";
    nameSpan.textContent = file.name;
    nameSpan.title = file.name;

    const sizeSpan = document.createElement("span");
    sizeSpan.className = "file-list-item-size";
    sizeSpan.textContent = formatFileSize(file.size);

    const removeBtn = document.createElement("button");
    removeBtn.className = "file-remove-btn";
    removeBtn.textContent = "×";
    removeBtn.title = "Entfernen";
    removeBtn.type = "button";
    removeBtn.addEventListener("click", () => {
      uploadedFilesList.splice(index, 1);
      renderFileList();
    });

    li.appendChild(nameSpan);
    li.appendChild(sizeSpan);
    li.appendChild(removeBtn);
    uploadedFilesEl.appendChild(li);
  });
}

fileInput.addEventListener("change", () => {
  if (fileInput.files.length > 0) {
    addFilesToList(fileInput.files);
    fileInput.value = "";
  }
});

uploadDropZone.addEventListener("dragover", (e) => {
  e.preventDefault();
  uploadDropZone.classList.add("dragover");
});

uploadDropZone.addEventListener("dragleave", () => {
  uploadDropZone.classList.remove("dragover");
});

uploadDropZone.addEventListener("drop", (e) => {
  e.preventDefault();
  uploadDropZone.classList.remove("dragover");
  addFilesToList(e.dataTransfer.files);
});

// ─────────────────────────────────────────────────────────────────────
// AI step select (hidden, synced with active form step)
// ─────────────────────────────────────────────────────────────────────
function initAiStepSelect() {
  aiStepSelect.replaceChildren();
  processSteps.forEach((step) => {
    const option = document.createElement("option");
    option.value = step.id;
    option.textContent = step.title;
    aiStepSelect.appendChild(option);
  });
}

function syncAiStepSelect() {
  aiStepSelect.value = processSteps[currentDetailStepIndex].id;
}

// ─────────────────────────────────────────────────────────────────────
// AI step info panel
// ─────────────────────────────────────────────────────────────────────
function renderAiStepInfo() {
  const support = aiStepSupport[processSteps[currentDetailStepIndex].id];
  aiStepInfo.replaceChildren();
  if (!support) return;

  const title = document.createElement("p");
  title.className = "ai-step-info-title";
  title.textContent = support.title;
  aiStepInfo.appendChild(title);

  const desc = document.createElement("p");
  desc.className = "ai-step-info-desc";
  desc.textContent = support.description;
  aiStepInfo.appendChild(desc);

  const capList = document.createElement("ul");
  capList.className = "ai-capabilities";
  support.capabilities.forEach((cap) => {
    const item = document.createElement("li");
    item.className = "ai-capability-item";
    item.textContent = cap;
    capList.appendChild(item);
  });
  aiStepInfo.appendChild(capList);
}

// ─────────────────────────────────────────────────────────────────────
// Field creation helpers
// ─────────────────────────────────────────────────────────────────────
function saveFieldValue(stepId, fieldName, value) {
  if (!detailValuesByStepId[stepId]) detailValuesByStepId[stepId] = {};
  detailValuesByStepId[stepId][fieldName] = value;
}

function getFieldValue(stepId, fieldName, fallback) {
  return detailValuesByStepId[stepId]?.[fieldName] ?? fallback;
}

function createFieldInput(step, field) {
  if (field.type === "textarea") {
    const textarea = document.createElement("textarea");
    textarea.id = `detail-${step.id}-${field.name}`;
    textarea.name = field.name;
    textarea.rows = field.rows || 3;
    textarea.required = Boolean(field.required);
    textarea.value = getFieldValue(step.id, field.name, "");
    textarea.addEventListener("input", () => saveFieldValue(step.id, field.name, textarea.value));
    return textarea;
  }

  if (field.type === "select") {
    const select = document.createElement("select");
    select.id = `detail-${step.id}-${field.name}`;
    select.name = field.name;
    select.required = Boolean(field.required);

    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = "Bitte auswählen …";
    placeholder.disabled = true;
    placeholder.selected = !getFieldValue(step.id, field.name, "");
    select.appendChild(placeholder);

    (field.options || []).forEach((optionValue) => {
      const option = document.createElement("option");
      option.value = optionValue;
      option.textContent = optionValue;
      if (getFieldValue(step.id, field.name, "") === optionValue) option.selected = true;
      select.appendChild(option);
    });

    select.addEventListener("change", () => saveFieldValue(step.id, field.name, select.value));
    return select;
  }

  const input = document.createElement("input");
  input.id = `detail-${step.id}-${field.name}`;
  input.type = field.type;
  input.name = field.name;
  input.required = Boolean(field.required);

  if (field.type === "checkbox") {
    input.checked = Boolean(getFieldValue(step.id, field.name, false));
    input.addEventListener("change", () => saveFieldValue(step.id, field.name, input.checked));
    return input;
  }

  input.value = getFieldValue(step.id, field.name, "");
  input.addEventListener("input", () => saveFieldValue(step.id, field.name, input.value));
  return input;
}

// ─────────────────────────────────────────────────────────────────────
// Step navigation helpers
// ─────────────────────────────────────────────────────────────────────
function getDetailStepStatusText(step, index) {
  if (detailCompletedSteps.has(step.id)) return "Abgeschlossen";
  if (index <= highestUnlockedDetailStepIndex) return "Freigegeben";
  return "Gesperrt";
}

// ─────────────────────────────────────────────────────────────────────
// Render step navigation tabs
// ─────────────────────────────────────────────────────────────────────
function renderDetailStepper() {
  detailStepper.replaceChildren();

  processSteps.forEach((step, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "step-nav-btn";
    button.disabled = index > highestUnlockedDetailStepIndex;
    if (index === currentDetailStepIndex) button.classList.add("current");
    if (detailCompletedSteps.has(step.id)) button.classList.add("completed");
    button.ariaLabel = `${step.title} – ${getDetailStepStatusText(step, index)}`;
    button.title = step.title;

    const numSpan = document.createElement("span");
    numSpan.className = "step-num";
    numSpan.textContent = detailCompletedSteps.has(step.id) ? "✓" : String(index + 1);
    button.appendChild(numSpan);

    const titleSpan = document.createElement("span");
    const short = step.title.length > 16 ? step.title.substring(0, 14) + "…" : step.title;
    titleSpan.textContent = short;
    button.appendChild(titleSpan);

    button.addEventListener("click", () => {
      currentDetailStepIndex = index;
      renderDetailScreen();
    });

    detailStepper.appendChild(button);
  });
}

// ─────────────────────────────────────────────────────────────────────
// Render detail screen
// ─────────────────────────────────────────────────────────────────────
function renderDetailScreen() {
  const step = processSteps[currentDetailStepIndex];
  const fields = detailFieldConfig[step.id] || [];

  detailStepTitle.textContent = `${currentDetailStepIndex + 1}. ${step.title}`;
  detailStepRole.textContent = `Verantwortlich: ${step.role.join(" / ")}`;

  if (detailCompletedSteps.has(step.id)) {
    detailStepStatus.textContent = "Abgeschlossen";
    detailStepStatus.className = "detail-status completed";
  } else {
    detailStepStatus.textContent = "In Bearbeitung";
    detailStepStatus.className = "detail-status";
  }

  if (step.documents && step.documents.length > 0) {
    stepRequiredDocs.hidden = false;
    stepRequiredDocs.replaceChildren();

    const docsTitle = document.createElement("p");
    docsTitle.className = "required-docs-title";
    docsTitle.textContent = "Erforderliche Unterlagen";
    stepRequiredDocs.appendChild(docsTitle);

    const list = document.createElement("ul");
    list.className = "required-docs-list";
    step.documents.forEach((doc) => {
      const li = document.createElement("li");
      li.textContent = doc;
      list.appendChild(li);
    });
    stepRequiredDocs.appendChild(list);
  } else {
    stepRequiredDocs.hidden = true;
  }

  detailForm.replaceChildren();
  fields.forEach((field) => {
    if (field.type === "checkbox") {
      const checkboxLabel = document.createElement("label");
      checkboxLabel.classList.add("detail-checkbox");
      if (field.fullWidth) checkboxLabel.classList.add("full-width");
      const checkbox = createFieldInput(step, field);
      checkboxLabel.htmlFor = checkbox.id;
      checkboxLabel.appendChild(checkbox);
      checkboxLabel.append(field.label);
      detailForm.appendChild(checkboxLabel);
      return;
    }

    const label = document.createElement("label");
    if (field.fullWidth) label.classList.add("full-width");
    label.textContent = field.label;
    const input = createFieldInput(step, field);
    label.htmlFor = input.id;
    label.appendChild(input);
    detailForm.appendChild(label);
  });

  detailPrevButton.disabled = currentDetailStepIndex === 0;
  detailNextButton.textContent =
    currentDetailStepIndex === processSteps.length - 1
      ? "Prozess abschließen"
      : "Abschließen & weiter →";

  syncAiStepSelect();
  renderAiStepInfo();
  renderDetailStepper();
}

// ─────────────────────────────────────────────────────────────────────
// Step navigation actions
// ─────────────────────────────────────────────────────────────────────
function goToPreviousDetailStep() {
  if (currentDetailStepIndex === 0) return;
  currentDetailStepIndex -= 1;
  renderDetailScreen();
}

function completeAndAdvanceDetailStep() {
  if (!detailForm.reportValidity()) return;

  const currentStep = processSteps[currentDetailStepIndex];
  detailCompletedSteps.add(currentStep.id);

  if (currentDetailStepIndex < processSteps.length - 1) {
    highestUnlockedDetailStepIndex = Math.max(
      highestUnlockedDetailStepIndex,
      currentDetailStepIndex + 1,
    );
    currentDetailStepIndex += 1;
    renderDetailScreen();
    return;
  }

  renderDetailScreen();
}

// ─────────────────────────────────────────────────────────────────────
// Azure OpenAI integration
// ─────────────────────────────────────────────────────────────────────
async function runAzureOpenAIDemo() {
  const { endpoint, deployment, apiVersion, apiKey } = aiConfigData;
  const instruction = aiInstruction.value.trim();
  const selectedStep =
    processSteps.find((s) => s.id === aiStepSelect.value) ||
    processSteps[currentDetailStepIndex];

  if (!endpoint || !deployment || !apiVersion || !apiKey) {
    aiOutput.textContent =
      "Bitte zunächst die Azure OpenAI Konfiguration über das Zahnrad-Symbol (oben rechts) einrichten.";
    return;
  }

  let normalizedEndpoint;
  try {
    const parsedEndpoint = new URL(endpoint);
    if (parsedEndpoint.pathname && parsedEndpoint.pathname !== "/") {
      aiOutput.textContent =
        "Der Endpoint darf keinen zusätzlichen Pfad enthalten (nur https://<resource>.openai.azure.com).";
      return;
    }
    normalizedEndpoint = parsedEndpoint.origin;
  } catch {
    aiOutput.textContent = "Der Azure OpenAI Endpoint ist keine gültige URL.";
    return;
  }

  const userPrompt = [
    "Erstelle eine kurze fachliche Einschätzung für diesen Claim-Prozessschritt:",
    `Prozess-Schritt: ${selectedStep.title}`,
    `Details: ${selectedStep.details.join("; ")}`,
    `Rolle(n): ${selectedStep.role.join(", ")}`,
    `Unterlagen: ${selectedStep.documents.join(", ")}`,
    instruction ? `Zusätzliche Anweisung: ${instruction}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  aiRunButton.disabled = true;
  aiRunButton.textContent = "Analyse läuft …";
  aiOutput.textContent = "Anfrage wird an Azure OpenAI gesendet …";
  aiCopyButton.hidden = true;

  try {
    const response = await fetch(
      `${normalizedEndpoint}/openai/deployments/${encodeURIComponent(deployment)}/chat/completions?api-version=${encodeURIComponent(apiVersion)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", "api-key": apiKey },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content:
                "Du bist ein Assistent für Claim-Management im Bauwesen. Antworte präzise und praxisnah auf Deutsch.",
            },
            { role: "user", content: userPrompt },
          ],
          temperature: aiModelTemperature,
        }),
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      aiOutput.textContent = `Azure OpenAI Fehler (${response.status}): ${errorText}`;
      return;
    }

    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content;

    if (typeof content === "string" && content.trim()) {
      aiOutput.textContent = content.trim();
      aiCopyButton.hidden = false;
    } else {
      aiOutput.textContent = "Keine verwertbare Ausgabe vom Modell erhalten.";
    }
  } catch (error) {
    aiOutput.textContent = `Anfrage fehlgeschlagen: ${error instanceof Error ? error.message : "Unbekannter Fehler"}`;
  } finally {
    aiRunButton.disabled = false;
    aiRunButton.textContent = "KI-Analyse starten";
  }
}

aiRunButton.addEventListener("click", runAzureOpenAIDemo);

aiCopyButton.addEventListener("click", () => {
  navigator.clipboard.writeText(aiOutput.textContent).catch(() => {});
});

// ─────────────────────────────────────────────────────────────────────
// Initialise
// ─────────────────────────────────────────────────────────────────────
initAiStepSelect();
renderDetailScreen();
detailPrevButton.addEventListener("click", goToPreviousDetailStep);
detailNextButton.addEventListener("click", completeAndAdvanceDetailStep);
