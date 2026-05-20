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
const AI_MODEL_TEMPERATURE = 0.2;

const processStepsContainer = document.getElementById("process-steps");
const aiConfigForm = document.getElementById("ai-config-form");
const aiStepSelect = document.getElementById("ai-step-select");
const aiOutput = document.getElementById("ai-output");
const aiRunButton = document.getElementById("ai-run");

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
          temperature: AI_MODEL_TEMPERATURE,
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
aiConfigForm.addEventListener("submit", runAzureOpenAIDemo);
