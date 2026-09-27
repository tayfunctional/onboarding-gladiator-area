# Gladiator Area 76 — Member Onboarding

Eine vollständig clientseitige Web-App für das Member-Onboarding an der Theke.

## Ziel
Das Tool führt ein neues Mitglied durch wenige, große Touch-Fragen und gibt anschließend:
- mehrere passende Empfehlungen,
- eine kurze Begründung,
- einen Beispiel-Trainingsmix,
- eine konkrete SOP-Checkliste für den nächsten Schritt.

## Enthaltene Angebote
- Geräte- & Krafttraining
- HYBRID
- HYROX
- Boxen
- Boxing Legends
- Kickboxen
- Yoga
- Rückengymnastik
- Seventy Sixpack
- Personal Training nur bei explizitem Wunsch nach 1:1-Betreuung

Nicht enthalten:
Box & Burn, Booty Camp, Runners Fitness/Athletik, Faszien Training, Performance Class, HYROX365, MMA, BJJ/Grappling, Ringen, Kinder/Teenies.

## Datenschutz
Die App:
- fragt keinen Namen, keine E-Mail, kein Geburtsdatum und keine Telefonnummer ab,
- nutzt keine Datenbank,
- sendet keine Antworten an einen Server,
- speichert keine Antworten dauerhaft,
- hält den Zustand nur im aktuell geöffneten Browser-Tab,
- verwirft alles beim Neustart des Onboardings bzw. Neuladen.

## GitHub Pages
1. Neues GitHub-Repository erstellen.
2. `index.html`, `styles.css`, `app.js` und `logo.svg` ins Root-Verzeichnis hochladen.
3. In GitHub: **Settings → Pages**.
4. Source: **Deploy from a branch**.
5. Branch: `main`, Folder: `/ (root)`.
6. Speichern.

Nach kurzer Zeit ist die App über GitHub Pages erreichbar.

## iPad
Die Oberfläche ist für Landscape optimiert. Für ein App-ähnliches Erlebnis:
1. Seite in Safari öffnen.
2. Teilen → **Zum Home-Bildschirm**.
3. Danach über das Icon starten.

## Inhalt ändern
Die Fragen stehen in `app.js` im Array `questions`.
Die Kursbeschreibungen stehen in `programs`.
Die Empfehlung wird in `scorePrograms()` gewichtet.

## Hinweis
Gesundheitliche Einschränkungen werden nicht diagnostiziert. Bei ungeklärten Beschwerden blockiert die App die normalen Kurs-Empfehlungen und verweist zuerst auf ein Gespräch mit einem Trainer.
