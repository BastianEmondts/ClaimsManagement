const processSteps = [
  {
    id: "claimpruefung",
    title: "Claimprüfung durchführen",
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
    title: "(Fach-)Technische Prüfung durchführen",
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
    title: "Terminliche Prüfung durchführen",
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
    title: "Risikoangaben eintragen",
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
    title: "Verhandlung durchführen",
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
    title: "Annahme-/Ablehnungsschreiben",
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
const aiModelTemperature = 0.2;

const processStepsContainer = document.getElementById("process-steps");
const detailStepper = document.getElementById("detail-stepper");
const detailForm = document.getElementById("detail-form");
const detailStepTitle = document.getElementById("detail-step-title");
const detailStepStatus = document.getElementById("detail-step-status");
const detailPrevButton = document.getElementById("detail-prev");
const detailNextButton = document.getElementById("detail-next");
const aiConfigForm = document.getElementById("ai-config-form");
const aiStepSelect = document.getElementById("ai-step-select");
const aiOutput = document.getElementById("ai-output");
const aiRunButton = document.getElementById("ai-run");
const detailFieldConfig = {
  claimpruefung: [
    { name: "eingangDatum", label: "Eingangsdatum", type: "date", required: true },
    { name: "claimReferenz", label: "Claim-Referenz", type: "text", required: true },
    { name: "anzeigeGeprueft", label: "Anzeigen vollständig geprüft", type: "checkbox", required: true, fullWidth: true },
    { name: "formalKommentar", label: "Kommentar zur formalen Prüfung", type: "textarea", required: true, fullWidth: true, rows: 3 },
  ],
  "fachtechnische-pruefung": [
    { name: "fachbereich", label: "Fachbereich", type: "text", required: true },
    { name: "leistungsbeschreibung", label: "Leistungsbeschreibung plausibel", type: "select", required: true, options: ["Ja", "Teilweise", "Nein"] },
    { name: "alternativen", label: "Alternative Lösungen", type: "textarea", required: true, fullWidth: true, rows: 3 },
    { name: "technischerKommentar", label: "Technischer Kommentar", type: "textarea", required: true, fullWidth: true, rows: 3 },
  ],
  kostenverfolgung: [
    { name: "budgetTopf", label: "Budgetquelle", type: "select", required: true, options: ["Projektbudget", "Contingency", "Risikobudget"] },
    { name: "geschaetzteKosten", label: "Geschätzte Mehrkosten (EUR)", type: "number", required: true },
    { name: "budgetantrag", label: "Budgetantrag erforderlich", type: "checkbox", fullWidth: true },
    { name: "kostenkommentar", label: "Kommentar zur Kostenverfolgung", type: "textarea", required: true, fullWidth: true, rows: 3 },
  ],
  "pruefung-dem-grunde": [
    { name: "anspruch", label: "Vergütungsanspruch dem Grunde nach", type: "select", required: true, options: ["Bestätigt", "Teilweise", "Abgelehnt"] },
    { name: "vertragsklausel", label: "Relevante Vertragsklausel", type: "text", required: true },
    { name: "rechtlicherHinweis", label: "Rechtlicher Hinweis", type: "textarea", required: true, fullWidth: true, rows: 3 },
  ],
  "terminliche-pruefung": [
    { name: "betroffenerMeilenstein", label: "Betroffener Meilenstein", type: "text", required: true },
    { name: "terminverschiebung", label: "Verschiebung in Tagen", type: "number", required: true },
    { name: "kritischerPfad", label: "Kritischer Pfad betroffen", type: "checkbox", fullWidth: true },
    { name: "terminKommentar", label: "Kommentar zur Terminprüfung", type: "textarea", required: true, fullWidth: true, rows: 3 },
  ],
  "pruefung-hoehe": [
    { name: "bewertungsmethode", label: "Bewertungsmethode", type: "select", required: true, options: ["Vorkalkulatorisch", "Tatsächliche Kosten", "Marktüblich"] },
    { name: "empfohlenerBetrag", label: "Empfohlener Betrag (EUR)", type: "number", required: true },
    { name: "agkBewertet", label: "AGK-Zuschläge berücksichtigt", type: "checkbox", fullWidth: true },
    { name: "handlungsempfehlung", label: "Handlungsempfehlung", type: "textarea", required: true, fullWidth: true, rows: 3 },
  ],
  risikoangaben: [
    { name: "risikoId", label: "Risikoregister-ID", type: "text", required: true },
    { name: "eintritt", label: "Eintrittswahrscheinlichkeit", type: "select", required: true, options: ["Niedrig", "Mittel", "Hoch"] },
    { name: "auswirkung", label: "Auswirkung", type: "select", required: true, options: ["Niedrig", "Mittel", "Hoch"] },
    { name: "massnahme", label: "Maßnahme", type: "textarea", required: true, fullWidth: true, rows: 3 },
  ],
  verhandlung: [
    { name: "verhandlungstermin", label: "Verhandlungstermin", type: "date", required: true },
    { name: "strategie", label: "Verhandlungsstrategie", type: "textarea", required: true, fullWidth: true, rows: 3 },
    { name: "verhandlungsziele", label: "Verhandlungsziele", type: "textarea", required: true, fullWidth: true, rows: 3 },
  ],
  "annahme-ablehnung": [
    { name: "entscheidung", label: "Entscheidung", type: "select", required: true, options: ["Annahme", "Teilannahme", "Ablehnung"] },
    { name: "freigabeDatum", label: "Freigabedatum", type: "date", required: true },
    { name: "schreibenVersendet", label: "Schreiben versendet", type: "checkbox", required: true, fullWidth: true },
    { name: "abschlussnotiz", label: "Abschlussnotiz", type: "textarea", required: true, fullWidth: true, rows: 3 },
  ],
};
let currentDetailStepIndex = 0;
let highestUnlockedDetailStepIndex = 0;
const completedDetailSteps = new Set();
const detailValuesByStepId = {};

function createList(items) {
  const list = document.createElement("ul");

  items.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.textContent = item;
    list.appendChild(listItem);
  });

  return list;
}

function renderProcessSteps() {
  processStepsContainer.replaceChildren();
  aiStepSelect.replaceChildren();

  processSteps.forEach((step) => {
    const stepCard = document.createElement("article");
    stepCard.className = "process-step";

    const title = document.createElement("h3");
    title.className = `step-title ${step.type === "core" ? "step-core" : "step-check"}`;
    title.textContent = step.title;

    if (step.optional) {
      const optionalTag = document.createElement("span");
      optionalTag.className = "step-optional";
      optionalTag.textContent = step.optional;
      title.appendChild(optionalTag);
    }

    const content = document.createElement("div");
    content.className = "step-content";

    const detailsTitle = document.createElement("strong");
    detailsTitle.textContent = "Details";
    content.appendChild(detailsTitle);
    content.appendChild(createList(step.details));

    const roleText = document.createElement("p");
    roleText.className = "step-meta";
    const roleLabel = document.createElement("strong");
    roleLabel.textContent = "Rolle: ";
    roleText.appendChild(roleLabel);
    roleText.append(step.role.join(" / "));
    content.appendChild(roleText);

    const docsTitle = document.createElement("strong");
    docsTitle.textContent = "Unterlagen";
    content.appendChild(docsTitle);
    content.appendChild(createList(step.documents));

    stepCard.appendChild(title);
    stepCard.appendChild(content);
    processStepsContainer.appendChild(stepCard);

    const option = document.createElement("option");
    option.value = step.id;
    option.textContent = step.title;
    aiStepSelect.appendChild(option);
  });
}

function getDetailFields(stepId) {
  return detailFieldConfig[stepId] || [];
}

function saveFieldValue(stepId, fieldName, value) {
  if (!detailValuesByStepId[stepId]) {
    detailValuesByStepId[stepId] = {};
  }
  detailValuesByStepId[stepId][fieldName] = value;
}

function getFieldValue(stepId, fieldName, fallbackValue = "") {
  return detailValuesByStepId[stepId]?.[fieldName] ?? fallbackValue;
}

function createFieldInput(step, field) {
  if (field.type === "textarea") {
    const textarea = document.createElement("textarea");
    textarea.name = field.name;
    textarea.rows = field.rows || 3;
    textarea.required = Boolean(field.required);
    textarea.value = getFieldValue(step.id, field.name, "");
    textarea.addEventListener("input", () => saveFieldValue(step.id, field.name, textarea.value));
    return textarea;
  }

  if (field.type === "select") {
    const select = document.createElement("select");
    select.name = field.name;
    select.required = Boolean(field.required);
    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = "Bitte auswählen";
    placeholder.disabled = true;
    placeholder.selected = !getFieldValue(step.id, field.name, "");
    select.appendChild(placeholder);

    (field.options || []).forEach((optionValue) => {
      const option = document.createElement("option");
      option.value = optionValue;
      option.textContent = optionValue;
      if (getFieldValue(step.id, field.name, "") === optionValue) {
        option.selected = true;
      }
      select.appendChild(option);
    });

    select.addEventListener("change", () => saveFieldValue(step.id, field.name, select.value));
    return select;
  }

  const input = document.createElement("input");
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

function renderDetailStepper() {
  detailStepper.replaceChildren();

  processSteps.forEach((step, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "detail-step-button";
    button.disabled = index > highestUnlockedDetailStepIndex;
    if (index === currentDetailStepIndex) {
      button.classList.add("current");
    }
    if (completedDetailSteps.has(step.id)) {
      button.classList.add("completed");
    }

    const title = document.createElement("span");
    title.textContent = `${index + 1}. ${step.title}`;
    button.appendChild(title);

    const marker = document.createElement("strong");
    marker.textContent = completedDetailSteps.has(step.id) ? "✓" : index <= highestUnlockedDetailStepIndex ? "→" : "🔒";
    button.appendChild(marker);

    button.addEventListener("click", () => {
      currentDetailStepIndex = index;
      renderDetailScreen();
    });

    detailStepper.appendChild(button);
  });
}

function renderDetailScreen() {
  const step = processSteps[currentDetailStepIndex];
  const fields = getDetailFields(step.id);

  detailStepTitle.textContent = `${currentDetailStepIndex + 1}. ${step.title}`;
  if (completedDetailSteps.has(step.id)) {
    detailStepStatus.textContent = "Abgeschlossen";
    detailStepStatus.className = "detail-status completed";
  } else {
    detailStepStatus.textContent = "In Bearbeitung";
    detailStepStatus.className = "detail-status";
  }

  detailForm.replaceChildren();

  fields.forEach((field) => {
    if (field.type === "checkbox") {
      const checkboxLabel = document.createElement("label");
      checkboxLabel.className = `detail-checkbox${field.fullWidth ? " full-width" : ""}`;
      const checkbox = createFieldInput(step, field);
      checkboxLabel.appendChild(checkbox);
      checkboxLabel.append(field.label);
      detailForm.appendChild(checkboxLabel);
      return;
    }

    const label = document.createElement("label");
    if (field.fullWidth) {
      label.classList.add("full-width");
    }
    label.textContent = field.label;
    label.appendChild(createFieldInput(step, field));
    detailForm.appendChild(label);
  });

  detailPrevButton.disabled = currentDetailStepIndex === 0;
  detailNextButton.textContent =
    currentDetailStepIndex === processSteps.length - 1
      ? "Prozess abschließen"
      : "Schritt abschließen & weiter";
  renderDetailStepper();
}

function goToPreviousDetailStep() {
  if (currentDetailStepIndex === 0) {
    return;
  }
  currentDetailStepIndex -= 1;
  renderDetailScreen();
}

function completeAndAdvanceDetailStep() {
  if (!detailForm.reportValidity()) {
    return;
  }

  const currentStep = processSteps[currentDetailStepIndex];
  completedDetailSteps.add(currentStep.id);

  if (currentDetailStepIndex < processSteps.length - 1) {
    highestUnlockedDetailStepIndex = Math.max(highestUnlockedDetailStepIndex, currentDetailStepIndex + 1);
    currentDetailStepIndex += 1;
    renderDetailScreen();
    return;
  }

  renderDetailScreen();
}

function getSelectedStep() {
  return processSteps.find((step) => step.id === aiStepSelect.value);
}

async function runAzureOpenAIDemo(event) {
  event.preventDefault();

  const formData = new FormData(aiConfigForm);
  const endpoint = String(formData.get("azure-endpoint") || "").trim();
  const deployment = String(formData.get("azure-deployment") || "").trim();
  const apiVersion = String(formData.get("azure-api-version") || "").trim();
  const apiKey = String(formData.get("azure-api-key") || "").trim();
  const instruction = String(formData.get("ai-instruction") || "").trim();
  const selectedStep = getSelectedStep();

  if (!endpoint || !deployment || !apiVersion || !apiKey || !selectedStep) {
    aiOutput.textContent = "Bitte alle Azure OpenAI Felder und einen Prozess-Schritt ausfüllen.";
    return;
  }

  let normalizedEndpoint;
  let endpointPathname = "";
  try {
    const parsedEndpoint = new URL(endpoint);
    normalizedEndpoint = parsedEndpoint.origin;
    endpointPathname = parsedEndpoint.pathname;
  } catch {
    aiOutput.textContent = "Der Azure OpenAI Endpoint ist keine gültige URL.";
    return;
  }

  if (endpointPathname && endpointPathname !== "/") {
    aiOutput.textContent =
      "Der Endpoint darf keinen zusätzlichen Pfad enthalten (nur https://<resource>.openai.azure.com).";
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
  aiRunButton.textContent = "Läuft...";
  aiOutput.textContent = "Anfrage wird an Azure OpenAI gesendet...";

  try {
    const response = await fetch(
      `${normalizedEndpoint}/openai/deployments/${encodeURIComponent(deployment)}/chat/completions?api-version=${encodeURIComponent(apiVersion)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": apiKey,
        },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content:
                "Du bist ein Assistent für Claim-Management im Bauwesen. Antworte präzise und praxisnah auf Deutsch.",
            },
            {
              role: "user",
              content: userPrompt,
            },
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

    aiOutput.textContent =
      typeof content === "string" && content.trim()
        ? content.trim()
        : "Keine verwertbare Ausgabe vom Modell erhalten.";
  } catch (error) {
    aiOutput.textContent = `Anfrage fehlgeschlagen: ${error instanceof Error ? error.message : "Unbekannter Fehler"}`;
  } finally {
    aiRunButton.disabled = false;
    aiRunButton.textContent = "AI-Demo ausführen";
  }
}

renderProcessSteps();
renderDetailScreen();
detailPrevButton.addEventListener("click", goToPreviousDetailStep);
detailNextButton.addEventListener("click", completeAndAdvanceDetailStep);
aiConfigForm.addEventListener("submit", runAzureOpenAIDemo);
