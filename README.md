# ClaimsManagement

Demo-Applikation für Claim-Management im Bauwesen als statische Web-App.

## Enthaltene Demo-Funktionen

- Prozessdarstellung entlang der bereitgestellten Claim-Management-Schritte
- Je Prozessschritt:
  - Prozess-Schritt im farbigen Kasten
  - Details darunter
  - zugeordnete Rolle(n)
  - relevante Unterlagen
- Azure OpenAI Demo-Anbindung direkt im Frontend:
  - Endpoint
  - Deployment Name
  - API-Version
  - API-Key
  - Auswahl eines Prozess-Schritts + optionale Zusatzanweisung

> Hinweis: Es gibt in dieser Demo bewusst keine persistente Datenhaltung.

## Projektstruktur

- `index.html`: UI-Struktur für Prozessdarstellung und Azure-OpenAI-Konfiguration
- `styles.css`: Styling für Karten, Prozessschritte und Konfigurationsformular
- `app.js`: Rendering der Prozessdaten und Azure OpenAI Aufruflogik
- `.github/workflows/deploy-pages.yml`: GitHub Pages Deployment auf Push nach `main`

## Lokale Vorschau

Öffne `index.html` im Browser.

## GitHub Pages

Das Repository enthält bereits einen GitHub Actions Workflow, der die statische Seite auf GitHub Pages deployed.

## Azure OpenAI Konfiguration (Demo)

1. Azure OpenAI Endpoint eintragen (z. B. `https://<resource>.openai.azure.com`)
2. Deployment Name eintragen
3. API-Version eintragen
4. API-Key eintragen
5. Prozess-Schritt auswählen und „AI-Demo ausführen“ klicken

Die Konfiguration erfolgt vollständig im Frontend und wird nicht dauerhaft gespeichert.
