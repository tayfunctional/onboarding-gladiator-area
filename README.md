# Gladiator Area 76 — Member Onboarding V2

Aktualisiert am 28.09.2026: heller Look, eigene Wahl und Beratung getrennt, evidenzbasierte Grundlagen, Antwortübersicht und PDF-Druckansicht.

## Eigene Wahl und Empfehlung
Die Kampfsportfrage bietet „Überspringen – aktuell nicht relevant“. Danach entfallen die Altersfrage und Kampfsportvorschläge sowie zugehörige Einstiegsschritte. Die ursprünglichen Antworten bleiben in der Antwortübersicht nachvollziehbar, die spätere Entscheidung wird im Ergebnis erklärt.

Die freiwilligen Altersgruppen sind 18–24, 25–39, 40–59, 60+ und „Keine Angabe“. Nur die beiden Gruppen ab 40 erlauben zusätzlich Boxing Legends; reguläre Angebote bleiben verfügbar. Ohne Altersangabe wird kein Alter angenommen.

Die letzte Frage legt fest, ob das Mitglied eine Empfehlung möchte oder Unterstützung bei seiner eigenen Auswahl. Das Ergebnis zeigt zuerst „Das ist deine Wahl“. Nur im Empfehlungsmodus folgen Vorschläge und ein Beispiel-Trainingsmix. Ein Wechsel zur Empfehlung bleibt möglich.

Allgemeine Vorlieben für Kurse oder Gruppen dürfen keine fachfremden Angebote freischalten. HYROX braucht ausdrücklich HYROX als Ziel oder Interesse. Kampfsport braucht Kampfsportinteresse; Boxing Legends zusätzlich die Angabe 40+. Seventy Sixpack wird nur bei ausdrücklich gewähltem Interesse angeboten. PT bleibt eine kostenpflichtige Zusatzoption nur bei 1:1-Wunsch. Es werden bis zu drei passende Angebote gezeigt, nicht zwangsläufig drei. Bei ungeklärten Einschränkungen erscheinen keine Trainingsempfehlungen.

Krafttraining kann bei Beweglichkeitszielen als Ergänzung berücksichtigt werden. Die wissenschaftlichen Grundlagen stehen in der App; die Studio-Zuordnung ist eine transparente, nicht klinisch validierte Beratungsregel. Details und Grenzen: `EVIDENZ.md`.

## PDF und Antworten
Vor der Checkliste erscheinen alle aktuell relevanten Fragen und die ausgewählten Antworten. „Ändern“ springt zur betreffenden Frage. Bedingte, nicht mehr relevante Antworten werden nicht angezeigt oder für Kampfsport gewertet.

„PDF / Drucken“ öffnet den Druckdialog. Dort als PDF speichern; auf dem iPad die Druckvorschau öffnen und über Teilen in Dateien sichern. Der Browser muss Drucken unterstützen (Safari/Chrome); eingebettete App-Browser unterstützen dies nicht immer. Quellen werden in der Druckansicht aufgeklappt, Checklisten-Haken übernommen, Bedienknöpfe ausgeblendet. Die konkrete Gesundheitsantwort wird standardmäßig ausgelassen und kann bewusst eingeschlossen werden. Allgemeine Sicherheitshinweise und der Hinweis auf erforderliche Klärung bleiben enthalten.

Die App lädt für diesen Export keine externe Bibliothek und sendet keine Antworten an einen PDF-Dienst. Die bewusst gespeicherte PDF bleibt erhalten, auch wenn die Antworten in der App zurückgesetzt werden.

Eine vollständig clientseitige Web-App für das Member-Onboarding an der Theke, optimiert für iPad im Querformat.

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
- speichert Antworten nicht automatisch dauerhaft (ausgenommen ein bewusst vom Nutzer gespeichertes PDF),
- hält den Zustand nur im aktuell geöffneten Browser-Tab,
- verwirft alles beim Neustart des Onboardings bzw. Neuladen.

## GitHub Pages
1. Neues GitHub-Repository erstellen.
2. `index.html`, `styles.css`, `app.js`, `README.md` und `EVIDENZ.md` ins Root-Verzeichnis hochladen.
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
`isRelevantProgram()` prüft davor bzw. bei der Auswahl den inhaltlichen Bezug. `recommendationList()` trennt reguläre Trainingsangebote von Zusatzoptionen. `renderFoundations()` enthält den belegten Hinweisblock.

## Hinweis
Gesundheitliche Einschränkungen werden nicht diagnostiziert. Bei ungeklärten Beschwerden blockiert die App die normalen Kurs-Empfehlungen und verweist zuerst auf ein Gespräch mit einem Trainer.
