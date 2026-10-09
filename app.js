
const app = document.getElementById("app");
const progressWrap = document.getElementById("progressWrap");
const progressBar = document.getElementById("progressBar");
const stepLabel = document.getElementById("stepLabel");
const resetBtn = document.getElementById("resetBtn");

const state = {
  step: -1,
  answers: {}
};

const questions = [
  {
    id: "goals",
    title: "Was möchtest du mit deinem Training hauptsächlich erreichen?",
    subtitle: "Mehrfachauswahl möglich.",
    type: "multi",
    info: "Deine Ziele bestimmen, welche Trainingsformen für deinen Einstieg am meisten Sinn machen.",
    options: [
      ["strength", "Stärker werden", "Mehr Kraft und Leistungsfähigkeit aufbauen."],
      ["muscle", "Muskeln aufbauen", "Gezielt Muskelmasse entwickeln."],
      ["fitness", "Allgemein fitter werden", "Kraft, Kondition und Belastbarkeit verbessern."],
      ["endurance", "Ausdauer verbessern", "Kardiovaskuläre Fitness steigern."],
      ["bodycomp", "Körperkomposition verbessern", "Körperfett reduzieren / athletischer aussehen."],
      ["mobility", "Beweglicher werden", "Mehr Beweglichkeit und Körpergefühl."],
      ["back", "Rücken stärken", "Rücken und Rumpf gezielt kräftigen."],
      ["stress", "Stress abbauen / Ausgleich", "Training als festen Ausgleich zum Alltag nutzen."],
      ["hyroxgoal", "Für HYROX trainieren", "Gezielt auf die Sportart HYROX vorbereiten."],
      ["combat", "Boxen oder Kickboxen lernen", "Kampfsport-Technik, Fitness und Koordination."]
    ]
  },
  {
    id: "experience",
    title: "Wie viel Trainingserfahrung bringst du mit?",
    subtitle: "Wähle die Antwort, die am besten passt.",
    type: "single",
    info: "Erfahrung hilft uns einzuschätzen, wie viel Struktur und Begleitung für deinen Start sinnvoll ist.",
    options: [
      ["new", "Ich starte komplett neu", "Bisher keine regelmäßige Trainingserfahrung."],
      ["return", "Ich steige wieder ein", "Schon trainiert, aber aktuell längere Pause."],
      ["lt1", "Unter 1 Jahr regelmäßig", "Grundlagen sind teilweise vorhanden."],
      ["1to3", "1–3 Jahre regelmäßig", "Solide Trainingserfahrung."],
      ["3plus", "Mehr als 3 Jahre regelmäßig", "Viel Erfahrung und meist gute Selbstständigkeit."]
    ]
  },
  {
    id: "commitment",
    title: "Wie oft kannst du Training realistisch in deine Woche einplanen?",
    subtitle: "Nicht das Maximum – sondern das, was langfristig wirklich in deinen Alltag passt.",
    type: "single",
    info: "Regelmäßigkeit ist wichtiger als ein perfekter Plan. Wir möchten dir etwas empfehlen, das du dauerhaft umsetzen kannst.",
    options: [
      ["1", "1× pro Woche", "Ein fester Termin, der wirklich klappt."],
      ["2", "2× pro Woche", "Zwei Termine, die in meinen Alltag passen."],
      ["3", "3× pro Woche", "Raum für regelmäßiges Training und einen passenden Mix."],
      ["4", "4× pro Woche", "Mehr Spielraum für Kraft + Kurse."],
      ["5", "5× oder häufiger", "Hohe Trainingsfrequenz und viel Flexibilität."]
    ]
  },
  {
    id: "style",
    title: "Wie möchtest du am liebsten trainieren?",
    subtitle: "Auch eine Kombination ist ausdrücklich möglich.",
    type: "single",
    info: "Viele Mitglieder kombinieren geführte Kurse mit flexiblem Training im Geräte- und Kraftbereich.",
    options: [
      ["solo", "Hauptsächlich selbstständig", "Geräte, freie Gewichte oder Training nach einem klaren Plan. Besonders sinnvoll mit Erfahrung oder guter Einweisung."],
      ["classes", "Hauptsächlich in geführten Kursen", "Der Coach führt durch die komplette Einheit. Begrenzte Kursgrößen sichern Qualität und Betreuung."],
      ["mix", "Eine Kombination aus beidem", "Struktur durch Kurse und gleichzeitig flexible selbstständige Einheiten."],
      ["unsure", "Ich weiß es noch nicht", "Wir helfen dir dabei, einen sinnvollen Einstieg zu finden."]
    ]
  },
  {
    id: "interests",
    title: "Welche Trainingsarten sprechen dich spontan an?",
    subtitle: "Mehrfachauswahl möglich. Es geht nur darum, was dich grundsätzlich interessiert.",
    type: "multi",
    info: "Interesse ist wichtig: Ein Trainingsmodell funktioniert nur dann langfristig, wenn du es auch gerne machst.",
    options: [
      ["gym", "Geräte- & Krafttraining", "Flexibel und selbstständig trainieren."],
      ["hybrid", "HYBRID", "Strukturiertes Full-Body-Krafttraining + Conditioning."],
      ["hyrox", "HYROX", "Sportartspezifisches Training mit höherem Ausdaueranteil."],
      ["boxing", "Boxen", "Technik und Training mit den Händen."],
      ["kickboxing", "Kickboxen", "Hände + Füße."],
      ["yoga", "Yoga", "Beweglichkeit, Körpergefühl und Ausgleich."],
      ["backclass", "Rückengymnastik", "Rücken und Rumpf gezielt stärken."],
      ["sixpack", "Seventy Sixpack", "30 Minuten Bauch/Core als Zusatztraining."],
      ["unsure", "Noch unsicher", "Die Empfehlung soll mir Orientierung geben."]
    ]
  },
  {
    id: "motivation",
    title: "Was hilft dir am meisten dabei, langfristig dranzubleiben?",
    subtitle: "Wähle bis zu zwei Punkte.",
    type: "multi",
    max: 2,
    info: "Nicht nur das Trainingsziel zählt. Entscheidend ist auch, welche Art von Struktur dich wirklich regelmäßig ins Training bringt.",
    options: [
      ["plan", "Ein klarer Plan", "Ich möchte genau wissen, was zu tun ist."],
      ["coach", "Ein Coach führt mich", "Ich möchte nicht jede Einheit selbst planen."],
      ["group", "Eine Gruppe / Atmosphäre", "Gemeinsam fällt mir Training leichter."],
      ["flex", "Maximale Flexibilität", "Ich möchte meine Einheiten frei legen können."],
      ["progress", "Messbare Fortschritte", "Ich möchte Entwicklung nachvollziehen können."],
      ["variety", "Abwechslung", "Ich möchte nicht immer dasselbe machen."],
      ["unsure", "Weiß ich noch nicht", "Ich möchte erst einmal ausprobieren."]
    ]
  },
  {
    id: "time",
    title: "Wann kannst du normalerweise am besten trainieren?",
    subtitle: "Mehrfachauswahl möglich.",
    type: "multi",
    info: "Wir speichern keine Kurszeiten im Tool. Deine zeitliche Flexibilität beeinflusst aber, ob ein Mix aus Kursen und freiem Training sinnvoll sein kann.",
    options: [
      ["early", "Früh morgens", "Vor dem normalen Arbeitstag."],
      ["morning", "Vormittags", "Später Morgen."],
      ["midday", "Mittags", "Rund um die Mittagspause."],
      ["afternoon", "Nachmittags", "Nach Arbeit / Schule oder flexibel."],
      ["evening", "Abends", "Klassische Kurs- und Trainingszeit."],
      ["shift", "Sehr unterschiedlich / Schichtarbeit", "Meine verfügbaren Zeiten wechseln."]
    ]
  },
  {
    id: "health",
    title: "Gibt es aktuell Verletzungen, Beschwerden oder gesundheitliche Einschränkungen, die dein Training beeinflussen könnten?",
    subtitle: "Wir stellen keine Diagnose. Die Antwort hilft nur dabei, den Einstieg sinnvoll zu gestalten.",
    type: "single",
    info: "Bei relevanten oder ungeklärten Einschränkungen ist ein kurzes Gespräch mit einem Trainer vor dem ersten Training der beste nächste Schritt.",
    options: [
      ["none", "Nein", "Aktuell keine relevanten Einschränkungen."],
      ["cleared", "Ja, aber ärztlich abgeklärt", "Sport wurde freigegeben und ich kenne meine aktuellen Grenzen."],
      ["unclear", "Ja, und ich bin mir nicht sicher", "Ich weiß aktuell nicht genau, was ich belasten oder trainieren darf."]
    ]
  },
  {
    id: "startEase",
    title: "Was würde dir den Start leichter machen?",
    subtitle: "Freiwillig. Wähle, was dir gerade am meisten helfen würde – oder geh direkt weiter.",
    type: "single",
    optional: true,
    info: "Es geht um deinen ersten Schritt, nicht um ein zusätzliches Angebot. Wir besprechen mit dir, was davon möglich ist.",
    options: [
      ["appointment", "Ein fester erster Termin", "Gemeinsam einen passenden Zeitpunkt finden."],
      ["intro", "Eine gute Einweisung", "Erst verstehen, wie alles funktioniert."],
      ["company", "Nicht allein starten", "Besprechen, welche Begleitung beim Einstieg möglich ist."],
      ["explore", "Erst einmal kennenlernen", "Ablauf und Möglichkeiten in Ruhe anschauen."],
      ["none", "Ich bin startklar", "Ich brauche gerade keine zusätzliche Starthilfe."]
    ]
  },
  {
    id: "ageband",
    title: "Welche Altersgruppe trifft auf dich zu?",
    subtitle: "Eine grobe Einordnung reicht. Du kannst auch ohne Altersangabe weitermachen.",
    type: "single",
    conditional: () => {
      const goals = state.answers.goals || [];
      const interests = state.answers.interests || [];
      return goals.includes("combat") || interests.includes("boxing") || interests.includes("kickboxing");
    },
    info: "Dein Alter sagt uns nicht, wie fit du bist. Die Angabe hilft nur, Angebote mit Altersbezug wie Boxing Legends ab 40 zu berücksichtigen. Du kannst weiterhin die regulären Angebote wählen.",
    options: [
      ["18to24", "18–24 Jahre", ""],
      ["25to39", "25–39 Jahre", ""],
      ["40to59", "40–59 Jahre", ""],
      ["60plus", "60+ Jahre", ""],
      ["unspecified", "Keine Angabe", "Ohne Altersangabe weitermachen."]
    ]
  },
  {
    id: "support",
    title: "Wie viel persönliche Betreuung wünschst du dir?",
    subtitle: "Damit wir einschätzen können, ob die regulären Angebote reichen oder 1:1-Betreuung interessant sein könnte.",
    type: "single",
    info: "Alle regulären Trainingsangebote sind in der Mitgliedschaft enthalten. Personal Training ist eine zusätzliche, kostenpflichtige Option.",
    options: [
      ["normal", "Die reguläre Betreuung reicht mir", "Kurse, Einweisung und normale Trainerunterstützung sind für mich passend."],
      ["some", "Ich möchte öfter Rückmeldung", "Ich hätte gerne etwas mehr Unterstützung und Feedback."],
      ["oneone", "Ich wünsche mir intensive 1:1-Betreuung", "Ein individueller, eng begleiteter Trainingsweg ist mir wichtig."]
    ]
  },
  {
    id: "guidance",
    title: "Wie können wir dich bei deinem Start unterstützen?",
    subtitle: "Deine Wahl steht im Mittelpunkt. Du entscheidest, ob du zusätzlich einen Vorschlag möchtest.",
    type: "single",
    info: "Wir zeigen dir zuerst deine eigenen Ziele und Interessen. Eine zusätzliche Trainingsempfehlung bekommst du nur, wenn du sie möchtest.",
    options: [
      ["advice", "Ich wünsche mir eure Empfehlung", "Zeigt mir einen passenden Einstieg auf Basis meiner Antworten."],
      ["support", "Ich habe eine Wahl getroffen – helft mir beim Einstieg", "Unterstützt mich bei meinen gewählten Angeboten und den nächsten Schritten."]
    ]
  }
];

function visibleQuestions() {
  return questions.filter(q => !q.conditional || q.conditional());
}

function renderStart() {
  window.Area76Transfer?.reset();
  document.body.classList.remove("result-view", "print-health");
  window.scrollTo({ top: 0, behavior: "auto" });
  state.step = -1;
  state.answers = {};
  progressWrap.hidden = true;
  resetBtn.hidden = true;
  app.innerHTML = `
    <section class="hero">
      <div class="hero-copy">
        <div class="eyebrow">WILLKOMMEN BEI GLADIATOR AREA 76</div>
        <h1>Dein Start<br>in der Area.</h1>
        <p class="lead">Wir finden gemeinsam den Trainingsweg, der zu deinen Zielen, deinem Alltag und deiner Erfahrung passt.</p>
        <button class="primary-btn hero-cta" id="startBtn">Los geht’s <span aria-hidden="true">→</span></button>
      </div>
      <div class="hero-meta" aria-label="Das erwartet dich">
        <span>11–12 kurze Fragen · eine freiwillig</span>
        <span>Persönliche Empfehlung</span>
        <span>Antworten bleiben in diesem Tab</span>
      </div>
    </section>
  `;
  document.getElementById("startBtn").onclick = () => {
    state.step = 0;
    renderQuestion();
  };
}

function updateProgress() {
  const qs = visibleQuestions();
  const current = Math.min(state.step + 1, qs.length);
  const pct = Math.round((current / qs.length) * 100);
  progressWrap.hidden = false;
  stepLabel.textContent = `${String(current).padStart(2, "0")} / ${String(qs.length).padStart(2, "0")}`;
  progressBar.style.width = `${pct}%`;
}

function renderQuestion() {
  window.Area76Transfer?.reset();
  document.body.classList.remove("result-view", "print-health");
  window.scrollTo({ top: 0, behavior: "auto" });
  const qs = visibleQuestions();
  if (state.step >= qs.length) {
    renderResults();
    return;
  }
  updateProgress();
  resetBtn.hidden = false;
  const q = qs[state.step];
  const current = state.answers[q.id] ?? (q.type === "multi" ? [] : null);

  app.innerHTML = `
    <section class="question-screen">
      <div class="question-focus">
        <div class="question-number">DEIN START · FRAGE ${String(state.step + 1).padStart(2, "0")}</div>
        <h2 class="question-title">${q.title}</h2>
        <div class="question-subtitle">${q.subtitle || ""}</div>
        <div class="option-grid ${q.type === "multi" ? "multi" : ""}" id="options">
          ${q.options.map(([value, label, desc]) => {
            const selected = q.type === "multi" ? current.includes(value) : current === value;
            return `
              <button type="button" class="option-btn ${selected ? "selected" : ""}" data-value="${value}" aria-pressed="${selected}">
                <span class="option-dot" aria-hidden="true"></span>
                <span class="option-copy">
                  <strong>${label}</strong>
                  ${desc ? `<span>${desc}</span>` : ""}
                </span>
              </button>`;
          }).join("")}
        </div>
        <aside class="info-card">
          <span class="info-mark" aria-hidden="true">i</span>
          <div>
            <strong>Gut zu wissen</strong>
            <p>${q.info}</p>
            ${q.id === "style" ? `<p class="micro">Kurse haben ein Teilnehmerlimit, damit Betreuung und Trainingsqualität gewährleistet bleiben.</p>` : ""}
          </div>
        </aside>
        <div class="question-actions">
          <button class="secondary-btn" id="backBtn">← Zurück</button>
          ${q.optional ? '<button class="link-btn" id="skipBtn">Überspringen</button>' : ""}
          <button class="primary-btn" id="nextBtn" ${isAnswered(q) ? "" : "disabled"}>${state.step === qs.length - 1 ? "Meinen Start zeigen →" : "Weiter →"}</button>
        </div>
      </div>
    </section>
  `;

  document.querySelectorAll(".option-btn").forEach(btn => {
    btn.onclick = () => selectOption(q, btn.dataset.value);
  });

  document.getElementById("backBtn").onclick = () => {
    if (state.step === 0) renderStart();
    else {
      state.step -= 1;
      renderQuestion();
    }
  };

  document.getElementById("nextBtn").onclick = () => {
    if (!isAnswered(q)) return;
    state.step += 1;
    renderQuestion();
  };
  const skipBtn = document.getElementById("skipBtn");
  if (q.optional && skipBtn) skipBtn.onclick = () => {
    delete state.answers[q.id];
    state.step += 1;
    renderQuestion();
  };
}

function selectOption(q, value) {
  if (q.type === "single") {
    state.answers[q.id] = value;
  } else {
    const arr = [...(state.answers[q.id] || [])];
    const idx = arr.indexOf(value);
    if (idx >= 0) arr.splice(idx, 1);
    else {
      if (q.max && arr.length >= q.max) arr.shift();
      if (value === "unsure") {
        arr.splice(0, arr.length, "unsure");
      } else {
        const unsure = arr.indexOf("unsure");
        if (unsure >= 0) arr.splice(unsure, 1);
        arr.push(value);
      }
    }
    state.answers[q.id] = arr;
  }
  renderQuestion();
}

function isAnswered(q) {
  if (q.optional) return true;
  const a = state.answers[q.id];
  if (q.type === "multi") return Array.isArray(a) && a.length > 0;
  return !!a;
}

const programs = {
  gym: {
    title: "Geräte- & Krafttraining",
    included: true,
    desc: "Flexibles Krafttraining an Geräten und mit freien Gewichten. Besonders passend, wenn du selbstständig trainieren möchtest oder deine Kurswoche flexibel ergänzen willst."
  },
  hybrid: {
    title: "HYBRID",
    included: true,
    desc: "Strukturiertes Full-Body-Training mit Kraft + Conditioning. Die Woche rotiert über Squat, Press & Pull und Hinge. Durch 4-Wochen-Mesocyclen entsteht ein klarer Progressionsrahmen – auch bei 1–2 Einheiten pro Woche."
  },
  hyrox: {
    title: "HYROX",
    included: true,
    desc: "Sportartspezifisches Training mit längeren kardiovaskulären Belastungen und moderaten Gewichten. Besonders sinnvoll, wenn HYROX selbst dein Ziel ist."
  },
  boxing: {
    title: "Boxen",
    included: true,
    desc: "Kampfsporttraining mit Fokus auf Hände, Technik, Koordination und Kondition."
  },
  kickboxing: {
    title: "Kickboxen",
    included: true,
    desc: "Kampfsporttraining mit Händen und Füßen – Technik, Koordination, Kondition und Belastbarkeit."
  },
  legends: {
    title: "Boxing Legends",
    included: true,
    desc: "Boxen bzw. Kickboxen für Mitglieder ab 40 – als altersgerechte Kampfsportoption in der Gruppe."
  },
  yoga: {
    title: "Yoga",
    included: true,
    desc: "Beweglichkeit, Körpergefühl und Ausgleich als eigenständiges Training oder als Ergänzung zu Kraft- und Kursarbeit."
  },
  backclass: {
    title: "Rückengymnastik",
    included: true,
    desc: "Gezieltes Training für Rücken und Rumpf. Besonders interessant, wenn du deinen Rücken stärken und kontrolliert belastbarer werden möchtest."
  },
  sixpack: {
    title: "Seventy Sixpack",
    included: true,
    desc: "30-minütiges Bauch- und Core-Workout als zusätzliche Einheit – ideal, wenn du noch gezielt etwas extra machen möchtest."
  },
  pt: {
    title: "Personal Training",
    included: false,
    desc: "Optionale 1:1-Betreuung für einen besonders individuellen und eng begleiteten Trainingsweg. Kostenpflichtige Zusatzleistung."
  }
};

function add(score, key, val, reason) {
  score[key] = score[key] || { points: 0, reasons: [] };
  score[key].points += val;
  if (reason && !score[key].reasons.includes(reason)) score[key].reasons.push(reason);
}

function scorePrograms(a = state.answers) {
  const s = {};
  Object.keys(programs).forEach(k => s[k] = { points: 0, reasons: [] });

  const goals = a.goals || [];
  const interests = a.interests || [];
  const motivation = a.motivation || [];
  const exp = a.experience;
  const style = a.style;
  const health = a.health;
  const support = a.support;
  const time = a.time || [];
  const hasCombatInterest = goals.includes("combat") || interests.some(k => ["boxing", "kickboxing"].includes(k));
  const age = hasCombatInterest ? a.ageband : undefined;
  const combatInterests = interests.filter(k => ["boxing", "kickboxing"].includes(k));
  const combat = combatInterests.length === 2 ? "both" : combatInterests[0] === "boxing" ? "hands" : combatInterests[0] === "kickboxing" ? "handsfeet" : undefined;

  // Goal weighting
  if (goals.includes("strength")) { add(s,"gym",4,"Du möchtest stärker werden."); add(s,"hybrid",4,"Kraft ist ein zentraler Teil deines Ziels."); }
  if (goals.includes("muscle")) { add(s,"gym",5,"Muskelaufbau lässt sich flexibel im Kraftbereich steuern."); add(s,"hybrid",2,"Strukturiertes Krafttraining unterstützt deine Basis."); }
  if (goals.includes("fitness")) { add(s,"hybrid",5,"Du möchtest Kraft und Kondition gemeinsam verbessern."); add(s,"gym",2,"Krafttraining kann deine allgemeine Fitness ergänzen."); add(s,"hyrox",2,"Ausdauerorientiertes Training kann ebenfalls passen."); }
  if (goals.includes("endurance")) { add(s,"hyrox",5,"Ausdauer ist ein zentrales Trainingsziel."); add(s,"hybrid",3,"Conditioning ergänzt die Kraftarbeit."); }
  if (goals.includes("bodycomp")) { add(s,"gym",4,"Krafttraining ist eine starke Basis für Körperkomposition."); add(s,"hybrid",4,"Kraft + Conditioning schafft einen guten Gesamtmix."); add(s,"sixpack",1,"Als zusätzliche Core-Einheit kann Seventy Sixpack passen."); }
  if (goals.includes("mobility")) {
    add(s,"yoga",6,"Beweglichkeit und Körpergefühl stehen im Vordergrund.");
    add(s,"gym",3,"Angepasstes Krafttraining kann auch deine Beweglichkeit unterstützen. Übungen und Bewegungsumfang stimmen wir mit dir ab.");
  }
  if (goals.includes("back")) { add(s,"backclass",6,"Du möchtest deinen Rücken gezielt stärken."); add(s,"gym",2,"Gezieltes Krafttraining kann ergänzend sinnvoll sein."); }
  if (goals.includes("stress")) { add(s,"yoga",3,"Yoga kann als Ausgleich zum Alltag passen."); add(s,"boxing",2,"Boxtraining kann ein aktiver Ausgleich sein."); add(s,"kickboxing",2,"Kickboxen kann ein aktiver Ausgleich sein."); }
  if (goals.includes("hyroxgoal")) { add(s,"hyrox",10,"HYROX selbst ist dein konkretes Trainingsziel."); add(s,"hybrid",4,"HYBRID kann eine starke Kraftbasis ergänzen."); }
  if (goals.includes("combat")) { add(s,"boxing",4,"Du möchtest Kampfsport lernen."); add(s,"kickboxing",4,"Du möchtest Kampfsport lernen."); }

  // Interests
  const interestMap = { gym:"gym", hybrid:"hybrid", hyrox:"hyrox", boxing:"boxing", kickboxing:"kickboxing", yoga:"yoga", backclass:"backclass", sixpack:"sixpack" };
  interests.forEach(i => {
    if (interestMap[i]) add(s, interestMap[i], 6, "Diese Trainingsform interessiert dich ausdrücklich.");
  });

  // Style
  if (style === "solo") { add(s,"gym",6,"Du möchtest hauptsächlich selbstständig trainieren."); }
  if (style === "classes") {
    ["hybrid","hyrox","boxing","kickboxing","yoga","backclass"].forEach(k => add(s,k,3,"Du bevorzugst geführte Kurse."));
    add(s,"gym",-2);
  }
  if (style === "mix") {
    add(s,"gym",5,"Du möchtest flexible Einheiten mit Kursen kombinieren.");
    ["hybrid","hyrox","boxing","kickboxing","yoga","backclass"].forEach(k => add(s,k,2,"Du möchtest Kurse sinnvoll ergänzen."));
  }
  if (style === "unsure") {
    add(s,"hybrid",2,"HYBRID bietet einen klaren, geführten Einstieg.");
    add(s,"gym",1,"Der Kraftbereich bleibt eine flexible Ergänzung.");
  }

  // Motivation
  if (motivation.includes("plan")) { add(s,"hybrid",4,"Ein klarer Trainingsplan hilft dir dranzubleiben."); add(s,"gym",2,"Mit einem strukturierten Plan kann freies Training gut funktionieren."); }
  if (motivation.includes("coach")) { ["hybrid","hyrox","boxing","kickboxing","yoga","backclass"].forEach(k => add(s,k,3,"Du möchtest durch die Einheit geführt werden.")); }
  if (motivation.includes("group")) { ["hybrid","hyrox","boxing","kickboxing","yoga","backclass"].forEach(k => add(s,k,3,"Gruppenatmosphäre motiviert dich.")); }
  if (motivation.includes("flex")) { add(s,"gym",6,"Flexible Trainingszeiten sind dir wichtig."); }
  if (motivation.includes("progress")) { add(s,"hybrid",4,"HYBRID arbeitet strukturiert über aufeinander aufbauende Mesocyclen."); add(s,"gym",3,"Krafttraining lässt sich gut messbar progressiv aufbauen."); }
  if (motivation.includes("variety")) { add(s,"hybrid",3,"HYBRID verbindet unterschiedliche Kraftschwerpunkte mit Conditioning."); add(s,"kickboxing",2,"Technik und Kondition sorgen für Abwechslung."); add(s,"boxing",2,"Technik und Kondition sorgen für Abwechslung."); }

  // Experience logic
  if (exp === "new") {
    add(s,"hybrid",4,"Als Einsteiger bekommst du Struktur und Betreuung.");
    add(s,"gym",1,"Mit Einweisung kann der Kraftbereich ergänzend sinnvoll sein.");
    if (!goals.includes("hyroxgoal")) add(s,"hyrox",-3);
  }
  if (exp === "return") { add(s,"hybrid",3,"Der strukturierte Rahmen eignet sich gut für den Wiedereinstieg."); add(s,"gym",2); }
  if (exp === "1to3" || exp === "3plus") { add(s,"gym",3,"Deine Erfahrung spricht für mehr Selbstständigkeit."); add(s,"hyrox",2,"Grundlegende Trainingserfahrung erleichtert den Einstieg in längere Belastungen."); }

  // Time flexibility
  if (time.includes("shift")) { add(s,"gym",5,"Wechselnde Zeiten sprechen für flexible freie Einheiten."); if (style !== "solo") add(s,"hybrid",1,"Ein Mix aus Kurs und freiem Training kann trotz wechselnder Zeiten funktionieren."); }

  // Combat preference comes from the existing training-interest question.
  if (combat === "hands") { add(s,"boxing",8,"Du bevorzugst Training nur mit den Händen."); add(s,"kickboxing",-3); }
  if (combat === "handsfeet") { add(s,"kickboxing",8,"Du möchtest Hände und Füße einsetzen."); add(s,"boxing",-2); }
  if (combat === "both" || combat === "unsure") { add(s,"boxing",3); add(s,"kickboxing",3); }
  if (["40to59", "60plus"].includes(age) && hasCombatInterest) {
    add(s,"legends",10,"Boxing Legends ist ein zusätzliches Kampfsportangebot ab 40, das du kennenlernen kannst. Die regulären Kurse stehen dir ebenfalls offen.");
  }

  // Back / yoga / sixpack add-on nuance
  if (interests.includes("sixpack")) add(s,"sixpack",3);
  if (goals.includes("bodycomp") && Number(a.commitment || 0) >= 3) add(s,"sixpack",1,"Ob die kurze Core-Ergänzung in deinen Wochenrahmen passt, besprechen wir gemeinsam – sie kommt nicht automatisch obendrauf.");

  // Personal training only on explicit desire
  if (support === "oneone") add(s,"pt",12,"Du wünschst dir ausdrücklich intensive 1:1-Betreuung.");
  else add(s,"pt",-20);

  // Health guardrails
  if (health === "unclear") {
    ["hybrid","hyrox","boxing","kickboxing","legends"].forEach(k => add(s,k,-100));
    add(s,"gym",-3);
    add(s,"backclass",-2);
    add(s,"pt",2,"Bei ungeklärten Einschränkungen kann individuelle Betreuung interessant sein – nach einem Trainer-Gespräch.");
  }

  return s;
}

// Studio matching rules, not a clinically validated score. General preferences
// may order suitable programs, but cannot make an unrelated sport suitable.
function isRelevantProgram(key, a = state.answers) {
  const goals = a.goals || [];
  const interests = a.interests || [];
  const combat = goals.includes("combat") || interests.some(k => ["boxing", "kickboxing"].includes(k));
  if (a.health === "unclear") return false;
  if (key === "pt") return a.support === "oneone";
  if (key === "hyrox") return goals.includes("hyroxgoal") || interests.includes("hyrox");
  if (key === "legends") return combat && ["40to59", "60plus"].includes(a.ageband);
  if (key === "boxing" || key === "kickboxing") {
    if (!combat) return false;
    const explicitCombat = interests.filter(k => ["boxing", "kickboxing"].includes(k));
    return explicitCombat.length ? explicitCombat.includes(key) : goals.includes("combat");
  }
  if (key === "sixpack") return interests.includes("sixpack");
  if (key === "backclass") return goals.includes("back") || interests.includes("backclass");
  if (key === "yoga") return goals.some(k => ["mobility", "stress"].includes(k)) || interests.includes("yoga");
  if (key === "hybrid") return interests.includes("hybrid") || goals.some(k => ["strength", "muscle", "fitness", "endurance", "bodycomp", "hyroxgoal"].includes(k));
  return key === "gym";
}

function recommendationList() {
  return createTrainingPlan().recommendations;
}

// Editorial studio rules, not clinical thresholds or validated effect sizes.
const planningPolicy = { maxOffersPerWeek: 3 };
const goalPrograms = {
  strength: ["gym", "hybrid"], muscle: ["gym", "hybrid"],
  fitness: ["hybrid", "gym", "hyrox"], endurance: ["hyrox", "hybrid"],
  bodycomp: ["gym", "hybrid"], mobility: ["yoga", "gym"], back: ["backclass", "gym"],
  stress: ["yoga", "boxing", "kickboxing"], hyroxgoal: ["hyrox"], combat: ["boxing", "kickboxing"]
};

function createTrainingPlan(a = state.answers) {
  const result = { status: "ready", basis: null, weeks: [], recommendations: [], alternatives: [], notes: [], available: Number(a.commitment), sessions: 0 };
  if (a.health === "unclear") return { ...result, status: "health" };
  if (a.guidance === "support") return { ...result, status: "support" };
  // Fail closed on incomplete/invalid mandatory answers; no silent two-day default.
  const required = questions.filter(q => !q.optional && !q.conditional);
  const complete = required.every(q => {
    const values = q.type === "multi" ? a[q.id] : [a[q.id]];
    return Array.isArray(values) && values.length > 0 && new Set(values).size === values.length && (!q.max || values.length <= q.max)
      && !(values.includes("unsure") && values.length > 1) && values.every(value => q.options.some(([key]) => key === value));
  });
  if (!complete) return { ...result, status: "incomplete", notes: ["Bitte beantworte zuerst die noch offenen Fragen."] };
  const score = scorePrograms(a);
  const interests = a.interests || [];
  const goals = a.goals || [];
  const variety = (a.motivation || []).includes("variety");
  const eligible = Object.keys(programs).filter(key => score[key].points > 0 && isRelevantProgram(key, a));
  // An age-based alternative must not displace someone's chosen regular course.
  const pool = eligible.filter(key => !["pt", "sixpack", "legends"].includes(key))
    .sort((x, y) => score[y].points - score[x].points || x.localeCompare(y));
  const matchesGoal = key => goals.some(goal => (goalPrograms[goal] || []).includes(key));
  const sportGoals = goals.filter(goal => ["hyroxgoal", "combat"].includes(goal));
  const sportPool = pool.filter(key => sportGoals.some(goal => goalPrograms[goal].includes(key)));
  const basisPool = sportPool.length ? sportPool : pool.filter(matchesGoal);
  const basis = (basisPool.length ? basisPool : pool)[0];
  if (!basis) return { ...result, status: "conversation", notes: ["Deine Trainingsbasis legen wir im Gespräch gemeinsam fest."] };
  result.basis = basis;
  const available = Number(a.commitment);
  // Frequency is selected together with staff. Experience must not silently
  // replace that agreed availability with an arbitrary numerical cap.
  const sessions = available;
  result.sessions = sessions;
  const ordered = [basis, ...pool.filter(key => key !== basis).sort((x, y) =>
    Number(interests.includes(y)) - Number(interests.includes(x)) || Number(matchesGoal(y)) - Number(matchesGoal(x)) || score[y].points - score[x].points || x.localeCompare(y))];
  const strengthGoal = goals.some(goal => ["strength", "muscle"].includes(goal));
  const hasStrength = pool.some(key => ["gym", "hybrid"].includes(key));
  const maxDistinct = a.experience === "new" ? 2 : planningPolicy.maxOffersPerWeek;
  const feasible = [];
  // Enumerate the small, bounded set of integer week allocations. Every returned
  // week satisfies the same guardrails; variation never bypasses them.
  function enumerate(index, remaining, entries) {
    if (index === ordered.length) {
      if (remaining || !entries.some(e => e.key === basis) || entries.length > maxDistinct) return;
      const count = key => entries.find(e => e.key === key)?.count || 0;
      if (strengthGoal && hasStrength && count("gym") + count("hybrid") < Math.min(2, sessions)) return;
      if (a.style === "mix" && sessions >= 2 && pool.includes("gym") && pool.some(key => key !== "gym") && (!count("gym") || !entries.some(e => e.key !== "gym"))) return;
      if (a.style === "solo" && pool.includes("gym") && count("gym") < Math.ceil(sessions / 2)) return;
      if (sportGoals.length <= sessions && sportGoals.some(goal => !entries.some(e => goalPrograms[goal].includes(e.key)))) return;
      feasible.push(entries);
      return;
    }
    for (let n = 0; n <= remaining; n++) {
      if (n && entries.length === maxDistinct) continue;
      enumerate(index + 1, remaining - n, n ? [...entries, { key: ordered[index], count: n }] : entries);
    }
  }
  enumerate(0, sessions, []);
  if (!feasible.length) return { ...result, status: "conversation", basis: null, notes: ["Deine Ziele, Trainingsvorlieben und dein Zeitrahmen lassen sich gerade nicht eindeutig zusammenbringen. Lass uns zuerst festlegen, welcher Schwerpunkt beim Einstieg Vorrang hat."] };
  const signature = entries => entries.map(e => `${e.key}:${e.count}`).sort().join("|");
  const chosen = [];
  const modes = variety && sessions > 1 ? (pool.length > 2 ? ["basis", "wechsel", "vielfalt"] : ["basis", "wechsel"]) : ["basis"];
  for (const mode of modes) {
    const targetDistinct = Math.min(sessions, pool.length, mode === "vielfalt" ? maxDistinct : 2);
    const targetBasis = mode === "wechsel" ? Math.max(1, Math.floor(sessions / 2)) : Math.max(1, sessions - targetDistinct + 1);
    const ranked = feasible.filter(entries => !chosen.some(previous => signature(previous) === signature(entries))
      && (!chosen.length || entries.length >= chosen[0].length)).map(entries => {
      const basisCount = entries.find(e => e.key === basis).count;
      const goalCoverage = goals.filter(goal => entries.some(e => (goalPrograms[goal] || []).includes(e.key))).length;
      const interestCoverage = entries.filter(e => interests.includes(e.key)).length;
      const newOffers = entries.filter(e => !chosen.some(previous => previous.some(p => p.key === e.key))).length;
      const quality = goalCoverage * 60 + interestCoverage * 20 + entries.reduce((sum, e) => sum + score[e.key].points * e.count, 0) / sessions
        - Math.abs(entries.length - targetDistinct) * 30 - Math.abs(basisCount - targetBasis) * 18
        + (mode === "vielfalt" ? newOffers * 24 : 0);
      return { entries, quality };
    }).sort((x, y) => y.quality - x.quality || signature(x.entries).localeCompare(signature(y.entries)));
    if (ranked.length) chosen.push(ranked[0].entries);
  }
  result.weeks = chosen.map((entries, i) => ({
    label: chosen.length > 1 ? `Woche ${String.fromCharCode(65 + i)}` : "Deine Beispielwoche",
    entries, rows: entries.map(({key, count}) => [`${count}×`, key === "gym" ? "Freies Training" : programs[key].title])
  }));
  const used = [...new Set(chosen.flatMap(entries => entries.map(e => e.key)))];
  result.recommendations = [...used, ...eligible.filter(key => ["pt", "sixpack"].includes(key))].map(key => [key, score[key]]);
  result.alternatives = eligible.filter(key => key === "legends" || (interests.includes(key) && !used.includes(key) && !["pt", "sixpack"].includes(key)));
  if (["new", "return"].includes(a.experience)) result.notes.push("Wir übernehmen die gemeinsam gewählte Trainingshäufigkeit. Gerade beim Einstieg stimmen wir Dauer, Belastung und Erholung mit einem Trainer ab und steigern passend zu deinem aktuellen Stand.");
  if (strengthGoal) result.notes.push("Dein Kraft- oder Muskelaufbauziel bleibt auch bei wechselnden Wochen im Plan. Die passenden Übungen und den Trainingsumfang legen wir mit dir fest.");
  if (variety && chosen.length === 1) result.notes.push("Dein Wochenrahmen bleibt bewusst einfach. Abwechslung kannst du mit dem Coach innerhalb der passenden Einheit planen – wir erfinden dafür keine zusätzlichen Trainingstage.");
  if ((a.time || []).includes("shift")) result.notes.push("Deine Zeiten wechseln. Wir prüfen passende Kursplätze und eine Ersatzlösung mit dir; das Tool kennt keine freien Termine.");
  const uncovered = goals.filter(goal => !chosen.some(entries => entries.some(e => (goalPrograms[goal] || []).includes(e.key))));
  if (uncovered.length) result.notes.push("Nicht alle deine Ziele sind im ersten Wochenvorschlag abgedeckt. Lass uns gemeinsam priorisieren, statt immer mehr Einheiten hinzuzufügen.");
  if (sportGoals.length > sessions) result.notes.push("Für mehrere Sportziele ist dein aktueller Wochenrahmen knapp. Welcher Schwerpunkt zuerst kommt, entscheiden wir gemeinsam.");
  result.notes.push("Die Einheiten sind noch keine Vorgabe für Intensität, Dauer oder Trainingstage. Belastung, Erholung und Kursverfügbarkeit stimmen wir vor dem Start ab.");
  return result;
}

function buildWeeklyPlan() { return createTrainingPlan().weeks; }

function buildMix() {
  if (state.answers.health === "unclear") return [
    ["1. Schritt", "Trainer-Gespräch vor dem ersten Training"],
    ["Danach", "Passenden Einstieg gemeinsam festlegen"]
  ];
  return buildWeeklyPlan()[0]?.rows || [["Gemeinsam", "Deine Trainingsbasis im Gespräch festlegen"]];
}

function weeklyPrograms(weeks) {
  const score = scorePrograms();
  return [...new Set(weeks.flatMap(week => week.entries.map(entry => entry.key)))].map(key => [key, score[key]]);
}

function renderMixRows(rows, healthWarning = false) {
  return `<div class="mix-display">${rows.map(([n, text], i) => `
    ${i ? `<span class="mix-plus" aria-hidden="true">${healthWarning ? "→" : "+"}</span>` : ""}
    <div class="mix-item ${n.length > 5 ? "mix-item-guidance" : ""}"><strong>${n}</strong><span>${displayMixText(text)}</span></div>
  `).join("")}</div>`;
}

function nextSteps(recs) {
  if (state.answers.health === "unclear") {
    return [
      "Vor dem ersten Training ein kurzes Gespräch mit einem Trainer vereinbaren",
      "Aktuelle Einschränkungen und mögliche Belastungen mit dem Trainer klären",
      "Danach passenden Trainingsbereich zeigen",
      "Bei Bedarf Geräteeinweisung vereinbaren",
      "Offene Fragen klären"
    ];
  }
  const keys = recs.map(([k]) => k);
  const steps = [];
  if (keys.includes("hybrid") || keys.includes("hyrox")) {
    steps.push("Functional-Bereich zeigen");
    if (keys.includes("hybrid")) steps.push("HYBRID kurz erklären: Kraftfokus + ergänzendes Conditioning");
    if (keys.includes("hyrox")) steps.push("HYROX kurz erklären: sportartspezifisch, ausdauerorientierter und längere Belastungen");
  }
  if (keys.includes("gym")) {
    steps.push("Geräte- & Kraftbereich zeigen");
    if (["new","return"].includes(state.answers.experience)) steps.push("Bei Bedarf Geräteeinweisung mit einem Trainer vereinbaren");
  }
  if (keys.some(k => ["boxing","kickboxing","legends"].includes(k))) {
    steps.push("Kampfsportbereich zeigen und passenden Kurs kurz erklären");
  }
  if (keys.includes("yoga") || keys.includes("backclass") || keys.includes("sixpack")) {
    steps.push("Passendes Zusatzangebot kurz erklären");
  }
  steps.push("Aktuellen Kursplan gemeinsam anschauen");
  steps.push("Erklären, wie Kurse gebucht werden");
  steps.push("Offene Fragen klären");
  return [...new Set(steps)];
}

function labelForRank(i, key) {
  if (["pt", "sixpack"].includes(key)) return "Optional für dich";
  if (i === 0) return "Deine Basis";
  if (i === 1 && key !== "sixpack") return "Deine Ergänzung";
  return (state.answers.motivation || []).includes("variety") ? "Deine Abwechslung" : "Weitere Ergänzung";
}

function displayMixText(text) {
  const [title, alternative] = text.split(" oder ");
  return title.replace("Geräte-/Krafttraining", "KRAFTTRAINING") +
    (alternative ? `<small>oder ${alternative}</small>` : "");
}

const evidenceSources = [
  ["WHO: Bewegungsempfehlungen für Erwachsene", "https://www.who.int/europe/news-room/fact-sheets/item/physical-activity"],
  ["ACSM: Krafttraining, Position Stand 2026", "https://acsm.org/resistance-training-guidelines-update-2026/"],
  ["Favro et al. 2025: Krafttraining und Beweglichkeit, systematische Übersicht", "https://pmc.ncbi.nlm.nih.gov/articles/PMC11841725/"],
  ["NIAMS: Osteoporose und Risikofaktoren", "https://www.niams.nih.gov/health-topics/osteoporosis"],
  ["NOGG 2024: Bewegung und Knochengesundheit", "https://www.nogg.org.uk/full-guideline/section-5-non-pharmacological-management-osteoporosis"]
];

function chosenPrograms() {
  const keys = (state.answers.interests || []).filter(key => programs[key]);
  if (state.answers.support === "oneone") keys.push("pt");
  return keys.map(key => [key, { reasons: [] }]);
}

function answerLabels(q) {
  const answer = state.answers[q.id];
  const values = Array.isArray(answer) ? answer : [answer];
  return q.options.filter(([key]) => values.includes(key)).map(([, label]) => label);
}

function renderChoice() {
  const interests = questions.find(q => q.id === "interests").options
    .filter(([key]) => (state.answers.interests || []).includes(key))
    .map(([, label]) => label);
  const undecided = !chosenPrograms().some(([key]) => key !== "pt");
  return `<section class="choice-section" aria-labelledby="choiceTitle">
    <div class="section-kicker">DEINE ZIELE. DEINE INTERESSEN.</div>
    <h2 id="choiceTitle">Das ist deine Wahl.</h2>
    <p class="section-lead">${undecided ? "Bei den Angeboten bist du noch offen. Deine Ziele geben uns Orientierung." : "Diese Angebote sprechen dich an. Das ist dein Ausgangspunkt, noch kein fester Trainingsplan."}</p>
    <div class="choice-offers">${interests.map(label => `<span>${label}</span>`).join("")}</div>
    ${state.answers.support === "oneone" ? `<p>Du wünschst dir zusätzlich intensive 1:1-Betreuung. Personal Training ist eine kostenpflichtige Zusatzoption.</p>` : ""}
  </section>`;
}

// Deterministic editorial matching: goals first, then experience and routine.
// Identical answers produce identical information, including in the PDF.
function foundationBlocks(a = state.answers) {
  const goals = a.goals || [];
  const interests = a.interests || [];
  const motivation = a.motivation || [];
  const hasGoal = (...keys) => keys.some(key => goals.includes(key));
  const hasInterest = (...keys) => keys.some(key => interests.includes(key));
  const block = (id, title, context, text, sources = []) => ({ id, title, context, text, sources });
  const goalBlocks = [];
  const routineBlocks = [];
  const selected = [];

  if (a.health === "unclear") {
    return [
      block("clarify", "Erst klären, dann planen", "Für deinen sicheren Einstieg",
        "Wenn unklar ist, welche Belastungen möglich sind, klären wir zuerst die nächsten Schritte. Eine nötige medizinische Abklärung kann das Gespräch im Studio nicht ersetzen."),
      block("prepare", "Deine Fragen mitbringen", "Zur Vorbereitung auf das Gespräch",
        "Was möchtest du wieder können? Welche Bewegungen verunsichern dich? Diese Fragen helfen uns im Gespräch. Medizinische Details musst du hier nicht eintragen."),
      block("later", "Deine Wahl bleibt der Ausgangspunkt", "Für die Zeit nach der Klärung",
        "Wir behalten deine Ziele und Interessen im Blick. Umfang, Übungen und Belastungen legen wir erst fest, wenn die offenen Fragen geklärt sind.")
    ];
  }
  if (a.health === "cleared") selected.push(block("limits", "Deine Freigabe als Rahmen", "Du hast abgeklärte Einschränkungen angegeben",
    "Besprich deine bekannten Belastungsgrenzen vor dem Einstieg mit dem Coach. Eine Freigabe bedeutet nicht automatisch, dass jede Übung oder Intensität zu dir passt."));

  if (hasGoal("mobility") || hasInterest("yoga")) goalBlocks.push(block("mobility", "Kraft & Beweglichkeit", "Passend zu deinem Beweglichkeitsziel oder Yoga-Interesse",
    "Krafttraining kann den Bewegungsumfang verbessern. Eine Übersicht von 2025 zeigt positive Effekte, aber auch erhebliche Unterschiede und methodische Schwächen der Studien. Es ist kein garantierter Effekt jeder Übung.", [3]));
  if (hasGoal("muscle", "strength")) goalBlocks.push(block("strength", "Kraft gezielt aufbauen", "Du möchtest stärker werden oder Muskeln aufbauen",
    "Krafttraining verbessert Kraft und Muskelmasse. Belastung und Trainingsumfang sollten zum Ziel passen. Geräte und freie Gewichte sind mögliche Wege – Regelmäßigkeit zählt.", [2]));
  if (hasGoal("endurance", "fitness", "hyroxgoal") || hasInterest("hyrox", "hybrid")) goalBlocks.push(block("endurance", "Ausdauer & Kraft ergänzen sich", "Passend zu deinem Fitness- oder Ausdauerfokus",
    "Die WHO empfiehlt Erwachsenen wöchentlich 150–300 Minuten moderate oder 75–150 Minuten intensive Ausdaueraktivität sowie Muskelkräftigung an mindestens zwei Tagen. Bewegung außerhalb des Studios zählt mit.", [1]));
  if (hasGoal("back") || hasInterest("backclass")) goalBlocks.push(block("back", "Deinen Rücken mitdenken", "Du möchtest deinen Rücken stärken",
    "Besprich mit uns, welche Bewegungen du im Alltag besser bewältigen möchtest. Daraus planen wir deinen Einstieg. Ein Rückenziel allein sagt nichts über eine Diagnose aus."));
  if (hasGoal("bodycomp") && !hasGoal("muscle", "strength")) goalBlocks.push(block("bodycomp", "Muskelkraft mit einplanen", "Du möchtest deine Körperkomposition verändern",
    "Krafttraining unterstützt den Muskelaufbau. Das ist ein Baustein für dein Ziel; aus den Antworten lässt sich keine bestimmte Gewichts- oder Körperfettveränderung vorhersagen.", [2]));
  if (hasGoal("stress")) goalBlocks.push(block("balance", "Ein Ausgleich, der zu dir passt", "Training soll dir Ausgleich geben",
    "Plane eine Einheit, auf die du dich freuen kannst. Ob ruhig oder aktiv: Besprich mit uns, was dir gefällt und welcher Termin gut in deinen Alltag passt."));
  if (hasGoal("combat") || hasInterest("boxing", "kickboxing")) goalBlocks.push(block("combat", "Deinen Kampfsportstart besprechen", "Du interessierst dich für Kampfsport",
    "Sag dem Coach vor der ersten Einheit, welche Erfahrung du mitbringst. Klärt gemeinsam Kursablauf, Ausrüstung und deinen Einstieg. Du musst noch keine bestimmte Technik beherrschen."));

  if (["new", "return"].includes(a.experience)) routineBlocks.push(block("start", a.experience === "return" ? "Schrittweise wieder einsteigen" : "Dein Einstieg darf einfach sein", a.experience === "return" ? "Du steigst nach einer Pause wieder ein" : "Du startest neu",
    "Wähle zunächst einen gut umsetzbaren Umfang und steigere schrittweise. Regelmäßiges Krafttraining ist wichtiger als ein komplizierter Plan.", [2]));
  if (a.commitment === "1") routineBlocks.push(block("one-day", "Ein Termin ist ein Anfang", "Du hast einen Trainingstag pro Woche eingeplant",
    "Dein fester Termin ist ein sinnvoller Start. Die allgemeine WHO-Empfehlung umfasst Muskelkräftigung an mindestens zwei Tagen; weitere Bewegung kann auch außerhalb des Studios stattfinden.", [1]));
  if ((a.time || []).includes("shift") || motivation.includes("flex")) routineBlocks.push(block("flexibility", "Eine flexible Woche planen", "Wechselnde Zeiten oder Flexibilität sind dir wichtig",
    "Lege mit uns eine machbare Hauptoption und einen Ersatztermin fest. So kannst du deine gewählten Angebote an unterschiedliche Wochen anpassen, ohne jedes Mal neu planen zu müssen."));
  if (a.support === "oneone") routineBlocks.push(block("personal", "Deine 1:1-Betreuung konkret machen", "Du wünschst dir intensive persönliche Begleitung",
    "Besprich, wobei du Unterstützung möchtest: Übungsauswahl, Technik oder Trainingsplanung. Personal Training ist eine kostenpflichtige Zusatzoption; Umfang und Kosten klären wir vorab."));
  else if (motivation.some(key => ["coach", "group"].includes(key)) || a.style === "classes" || a.support === "some") routineBlocks.push(block("coach", "Den Coach mitnehmen", "Begleitung oder Gruppenatmosphäre sind dir wichtig",
    "Erzähle dem Coach beim Einstieg kurz von deinem Ziel und deiner Erfahrung. Klärt gemeinsam, wie du Rückmeldung bekommst und welcher Kurs in deinen Alltag passt."));
  if (motivation.includes("progress") || a.experience === "3plus") routineBlocks.push(block("progress", "Fortschritt passend dosieren", "Du möchtest Entwicklung nachvollziehen oder bringst viel Erfahrung mit",
    "Belastung und Umfang lassen sich an dein Ziel anpassen. Training bis zum Muskelversagen und komplizierte Methoden sind für Fortschritte nicht grundsätzlich erforderlich.", [2]));
  if (motivation.includes("plan") || a.style === "solo") routineBlocks.push(block("plan", "Deinen Plan greifbar machen", "Struktur oder selbstständiges Training passen zu dir",
    "Halte gemeinsam mit uns fest, welche Übungen, Geräte und Termine du zunächst nutzen möchtest. Frag nach einer Einweisung, wenn dir etwas noch nicht vertraut ist."));

  selected.push(...goalBlocks.slice(0, 2), ...routineBlocks.slice(0, 2));
  const fallback = [
    block("weekly", "Dein Wochenrahmen", "Als allgemeine Orientierung für Erwachsene",
      "Die WHO empfiehlt Krafttraining aller großen Muskelgruppen an mindestens zwei Tagen pro Woche. Der Einstieg darf kleiner sein und schrittweise wachsen.", [1]),
    block("routine", "Deinen nächsten Termin festlegen", "Damit dein Start konkret wird",
      "Wähle einen realistischen ersten Termin. Notiere, was du dafür brauchst und welche Frage du vorher noch klären möchtest."),
    block("review", "Nach dem Einstieg kurz zurückschauen", "Für die weitere Planung",
      "Besprich nach deinen ersten Einheiten mit uns: Was hat dir gefallen, was war unklar und was passt zeitlich? Daraus planen wir deine nächsten Schritte.")
  ];
  for (const item of fallback) {
    if (selected.length >= 3) break;
    if (item.id === "weekly" && selected.some(b => ["endurance", "one-day"].includes(b.id))) continue;
    selected.push(item);
  }
  return selected.slice(0, 4);
}

function renderFoundations() {
  const blocks = foundationBlocks();
  const sourceIds = [...new Set(blocks.flatMap(b => b.sources))].sort((a, b) => a - b);
  return `
    <section class="foundations" aria-labelledby="foundationsTitle">
      <div class="section-kicker">GUT ZU WISSEN</div>
      <h2 id="foundationsTitle">Das passt zu deinem Start.</h2>
      <p class="section-lead">Ausgewählt nach deinen Zielen, deiner Erfahrung und deinem Alltag. Diese Hinweise ergänzen deine Wahl.</p>
      <div class="foundation-grid ${blocks.length === 4 ? "four-blocks" : ""}">
        ${blocks.map(b => `<article data-foundation="${b.id}"><h3>${b.title}</h3>
          <p class="foundation-context">${b.context}</p>
          <p>${b.text} ${b.sources.map(id => `<a href="#source-${id}">[${id}]</a>`).join(" ")}</p>
          ${b.sources.length ? "" : '<span class="foundation-tip-label">Tipp für dein Gespräch im Studio</span>'}
        </article>`).join("")}
      </div>
      ${sourceIds.length ? `<details class="sources">
        <summary>Quellen & Einordnung · Geprüft am 29.09.2026</summary>
        <div class="source-content"><p>Die verlinkten Aussagen beruhen auf Leitlinien und Übersichtsarbeiten. Praktische Gesprächstipps sind separat gekennzeichnet. Die Auswahl der Hinweise und Studioangebote ist eine Beratungshilfe, kein wissenschaftlich validierter Test.</p>
        <ol>${sourceIds.map(id => { const [title, url] = evidenceSources[id - 1]; return `<li id="source-${id}" value="${id}"><a href="${url}" target="_blank" rel="noopener noreferrer">${title}</a></li>`; }).join("")}</ol></div>
      </details>` : ""}
    </section>`;
}

function renderAnswerSummary() {
  return `<section class="answer-summary" aria-labelledby="summaryTitle">
    <div class="section-kicker">DAS HAST DU UNS MITGEGEBEN</div>
    <h2 id="summaryTitle">Deine Antworten.</h2>
    <dl class="answer-list">${visibleQuestions().map((q, index) => `
      <div class="answer-row ${q.id === "health" ? "health-answer" : ""}">
        <dt>${q.title}</dt><dd>${answerLabels(q).join(" · ") || (q.optional ? "Keine Angabe – freiwillig" : "Noch nicht beantwortet")}</dd>
        <button class="link-btn answer-edit" data-step="${index}" aria-label="Antwort ändern: ${q.title}">Ändern</button>
      </div>`).join("")}</dl>
  </section>`;
}

function renderPersonalSummary(plan = createTrainingPlan()) {
  const a = state.answers;
  const goalText = {
    strength: "stärker werden", muscle: "Muskeln aufbauen", fitness: "allgemein fitter werden",
    endurance: "deine Ausdauer verbessern", bodycomp: "deine Körperkomposition verändern",
    mobility: "beweglicher werden", back: "deinen Rücken stärken", stress: "einen Ausgleich zum Alltag finden",
    hyroxgoal: "für HYROX trainieren", combat: "Boxen oder Kickboxen lernen"
  };
  const goals = (a.goals || []).map(key => goalText[key]).filter(Boolean);
  const joinedGoals = goals.length > 1 ? `${goals.slice(0, -1).join(", ")} und ${goals.at(-1)}` : goals[0];
  const experience = {
    new: "Du startest neu. Wir besprechen einen Einstieg, bei dem du dich orientieren kannst.",
    return: "Du steigst wieder ein. Wir knüpfen an deine Erfahrung an und besprechen deinen Neustart.",
    lt1: "Du bringst erste Trainingserfahrung mit. Darauf bauen wir gemeinsam auf.",
    "1to3": "Du bringst regelmäßige Trainingserfahrung mit. Dein Einstieg soll daran anknüpfen.",
    "3plus": "Du bringst viel Trainingserfahrung mit. Deine bisherigen Erfahrungen nehmen wir mit in die Planung."
  };
  const rhythm = { "1": "1×", "2": "2×", "3": "3×", "4": "4×", "5": "5× oder öfter" };
  const support = { normal: "Reguläre Betreuung", some: "Mehr Rückmeldung", oneone: "Intensive 1:1-Betreuung" };
  const wantsAdvice = a.guidance === "advice";
  const healthWarning = a.health === "unclear";
  const weeks = plan.weeks;
  const weekText = weeks.length ? weeks.map(week => `<span class="summary-week">${weeks.length > 1 ? `<small>${week.label}</small>` : ""}${week.rows.map(([count, title]) => `${count} ${title}`).join(" + ")}</span>`).join("") : "Deine Trainingsbasis gemeinsam festlegen";
  const ownChoice = chosenPrograms().filter(([key]) => !["pt", "sixpack"].includes(key)).map(([key]) => programs[key].title).join(" + ");
  return `<div class="personal-summary">
    <p class="personal-goals">${joinedGoals ? `Du möchtest ${joinedGoals}.` : "Deine Ziele sind unser Ausgangspunkt."}</p>
    <p class="personal-context">${experience[a.experience] || "Deinen Einstieg besprechen wir gemeinsam."}</p>
    <dl class="start-facts">
      <div><dt>Dein Rhythmus</dt><dd>${rhythm[a.commitment] || "Noch offen"}<small>pro Woche eingeplant</small></dd></div>
      <div><dt>${healthWarning ? "Dein erster Schritt" : wantsAdvice ? "Dein Wochenvorschlag" : "Deine gewählten Angebote"}</dt><dd>${healthWarning ? "Zuerst ein Trainer-Gespräch" : wantsAdvice ? weekText : ownChoice || "Gemeinsam auswählen"}<small>${healthWarning ? "Training erst nach der Klärung planen" : wantsAdvice ? "Gemeinsam abstimmen · noch kein fester Kursplan" : "Die Häufigkeit legen wir gemeinsam fest"}</small></dd></div>
      <div><dt>Deine Begleitung</dt><dd>${support[a.support] || "Noch offen"}${a.support === "oneone" ? "<small>PT ist eine kostenpflichtige Zusatzoption</small>" : ""}</dd></div>
    </dl>
  </div>`;
}

function firstVisit(recs) {
  if (state.answers.health === "unclear") return {
    title: "Dein erster Besuch: erst ins Gespräch.",
    lead: "Bevor wir Training planen, klären wir gemeinsam die nächsten Schritte. Eine nötige medizinische Abklärung ersetzt das Gespräch im Studio nicht.",
    steps: [
      ["Gespräch vereinbaren", "Sprich uns auf ein Trainer-Gespräch vor deinem ersten Training an."],
      ["Fragen mitbringen", "Was möchtest du erreichen, was ist noch unklar? Medizinische Details musst du hier nicht eintragen."],
      ["Danach weiterplanen", "Erst nach der Klärung legen wir passende Angebote und den Einstieg fest."]
    ]
  };
  const keys = recs.map(([key]) => key);
  const primary = keys.find(key => !["pt", "sixpack"].includes(key));
  const intro = {
    gym: ["Den Kraftbereich kennenlernen", "Lass dir den Geräte- und Kraftbereich zeigen. Besprich mit einem Trainer, für welche Geräte und Übungen du eine Einweisung brauchst."],
    hybrid: ["HYBRID kennenlernen", "Lass dir den Functional-Bereich zeigen und den Ablauf erklären: Krafttraining mit ergänzendem Conditioning."],
    hyrox: ["HYROX kennenlernen", "Lass dir den Functional-Bereich und den Kursablauf erklären. Besprich mit dem Coach deine Erfahrung und deinen Einstieg."],
    boxing: ["Deinen Boxstart besprechen", "Lass dir den Kampfsportbereich zeigen. Kläre mit dem Coach den Kursablauf und welche Ausrüstung du brauchst."],
    kickboxing: ["Deinen Kickboxstart besprechen", "Lass dir den Kampfsportbereich zeigen. Kläre mit dem Coach den Kursablauf und welche Ausrüstung du brauchst."],
    legends: ["Boxing Legends kennenlernen", "Schau dir mit uns den Kampfsportbereich an. Besprich Kursablauf und Ausrüstung; auch die regulären Angebote bleiben eine Möglichkeit."],
    yoga: ["Deinen Yoga-Einstieg besprechen", "Schau mit uns nach einem passenden Kurs. Kläre Ablauf und benötigte Ausstattung, bevor du teilnimmst."],
    backclass: ["Rückengymnastik kennenlernen", "Lass dir den Kurs erklären und besprich mit dem Coach dein Ziel und deine Erfahrung."]
  };
  const ease = {
    appointment: ["Deinen ersten Termin finden", "Du möchtest einen festen Termin. Schau mit uns, was in deinen Alltag passt und wie du die erste Einheit vereinbarst oder buchst."],
    intro: ["Die Einweisung absprechen", "Du möchtest zuerst Sicherheit im Ablauf. Kläre mit uns, welche Einweisung du brauchst und wann sie stattfinden kann."],
    company: ["Deine Begleitung besprechen", "Du möchtest nicht allein starten. Besprich mit uns, welche Begleitung beim ersten Besuch möglich ist. Das ist keine automatische Buchung von Personal Training."],
    explore: ["Erst einmal orientieren", "Du möchtest uns in Ruhe kennenlernen. Lass dir die Bereiche zeigen und kläre, welche Möglichkeiten zum Kennenlernen es gibt."],
    none: ["Den Einstieg konkret machen", "Du fühlst dich startklar. Kläre noch deinen ersten Termin und gegebenenfalls die Kursbuchung."]
  };
  return {
    title: "So kann dein erster Besuch aussehen.",
    lead: "Ein Vorschlag für unser Gespräch – noch kein gebuchter Termin. Den Ablauf stimmen wir vor Ort mit dir ab.",
    steps: [
      ease[state.answers.startEase] || ["Kurz miteinander sprechen", "Sprich uns im Studio an und zeig uns auf Wunsch diese Zusammenfassung. So können wir an deinen Antworten anknüpfen."],
      intro[primary] || ["Deine Möglichkeiten anschauen", "Lass dir die Bereiche zeigen, die dich interessieren. Gemeinsam klären wir deine Fragen und den passenden Einstieg."],
      ["Für die erste Einheit vorbereiten", `${keys.some(key => !["gym", "pt"].includes(key)) ? "Schau mit uns in den aktuellen Kursplan und lass dir die Buchung erklären. " : ""}Kläre vorab, welche Kleidung, Schuhe und gegebenenfalls Ausrüstung du brauchst.${keys.includes("pt") ? " Umfang und Kosten für Personal Training besprechen wir separat." : ""}`]
    ]
  };
}

function renderFirstVisit(recs) {
  const visit = firstVisit(recs);
  return `<section class="first-visit" aria-labelledby="visitTitle">
    <div class="section-kicker">VOM VORSCHLAG ZUM ERSTEN SCHRITT</div>
    <h2 id="visitTitle">${visit.title}</h2>
    <p class="section-lead">${visit.lead}</p>
    <ol class="visit-steps">${visit.steps.map(([title, text], i) => `<li>
      <span class="visit-number" aria-hidden="true">0${i + 1}</span><h3>${title}</h3><p>${text}</p>
    </li>`).join("")}</ol>
  </section>`;
}

function renderPlanReasoning(plan) {
  if (plan.status !== "ready" || !plan.basis) return "";
  const motivations = state.answers.motivation || [];
  return `<div class="plan-reasoning">
    <article><span class="reason-number">01</span><h3>Ein Ziel. Eine Basis.</h3>
      <p>${programs[plan.basis].title} ist dein Ausgangspunkt. ${scorePrograms()[plan.basis].reasons[0] || "Wir berücksichtigen deine Ziele und Trainingsvorlieben."}</p></article>
    <article><span class="reason-number">02</span><h3>Dein Alltag zählt.</h3>
      <p>${plan.sessions} ${plan.sessions === 1 ? "Einheit" : "Einheiten"} pro Woche ${plan.sessions === 1 ? "gibt" : "geben"} den Rahmen vor. Wir verteilen deine Zeit – wir packen keine zusätzlichen Trainingstage obendrauf.</p></article>
    <article><span class="reason-number">03</span><h3>${plan.weeks.length > 1 ? "Abwechslung mit Richtung." : "Ein Start, der übersichtlich bleibt."}</h3>
      <p>${plan.weeks.length > 1 ? "Du hast Abwechslung gewählt. Deshalb wechseln Ergänzungen oder Häufigkeiten. Deine Basis bleibt in jeder Woche dabei." : motivations.includes("variety") ? "Für deinen aktuellen Rahmen gibt es keinen weiteren gleich gut passenden Wochenwechsel. Abwechslung bleibt innerhalb der Einheiten möglich." : "Du hast keinen Wochenwechsel gewünscht. Deshalb bekommst du einen klaren, wiederholbaren Vorschlag."}</p></article>
  </div>`;
}

// A plain-text snapshot of the EXISTING result, never a second recommendation engine.
// No health answer, health-specific explanation, member identity, or free-text input.
function buildMagiclineSections() {
  const plan = createTrainingPlan();
  const stopped = state.answers.health === "unclear";
  const advice = state.answers.guidance === "advice";
  const labels = id => answerLabels(questions.find(q => q.id === id)).join(" · ");
  const section = (title, lines) => ({ title, lines: lines.filter(Boolean) });
  const recs = advice ? plan.recommendations : chosenPrograms();
  const sections = [
    section("Dein Start in der Area", ["Deine Ziele: " + labels("goals"), "Dein Rhythmus: " + labels("commitment"), "Deine Erfahrung: " + labels("experience")]),
    section("Das ist deine Wahl", [labels("interests"), "Deine Begleitung: " + labels("support"), state.answers.support === "oneone" ? "Personal Training ist eine kostenpflichtige Zusatzoption." : "Reguläre Trainingsangebote sind in der Mitgliedschaft enthalten."]),
    section("Unser Wochenvorschlag", plan.weeks.length ? [
      ...plan.weeks.map(w => w.label + ": " + w.rows.map(([count, title]) => count + " " + title).join(" + ")),
      ...plan.notes
    ] : [advice ? "Den Trainingsstart legen wir zuerst im persönlichen Gespräch fest. Diese Auswertung enthält keinen Trainingsplan und keine Belastungsfreigabe." : "Du möchtest Unterstützung bei deiner Wahl. Es wurde keine zusätzliche Trainingsempfehlung angefordert."])
  ];
  if (!stopped && advice && recs.length) sections.push(section("Warum das zu dir passt", recs.flatMap(([key, data], i) => [
    labelForRank(i, key) + ": " + programs[key].title + (programs[key].included ? " (inklusive)" : " (kostenpflichtige Zusatzoption)"),
    programs[key].desc, data.reasons.slice(0, 3).join(" ")
  ])));
  if (!stopped) {
    const visit = firstVisit(recs);
    sections.push(section("Dein erster Besuch", [visit.lead, ...visit.steps.map(([title, text]) => title + ": " + text)]));
    const blocks = foundationBlocks().filter(b => b.id !== "limits");
    sections.push(section("Gut zu wissen", blocks.map(b => b.title + ": " + b.text + b.sources.map(id => " [" + id + "]").join(""))));
    const ids = [...new Set(blocks.flatMap(b => b.sources))].sort();
    if (ids.length) sections.push(section("Quellen & Einordnung", ["Redaktionelle Beratungshilfe, kein wissenschaftlich validierter Test. Quellenstand: 29.09.2026.", ...ids.map(id => "[" + id + "] " + evidenceSources[id - 1].join(" - "))]));
  }
  sections.push(section("Deine Antworten", visibleQuestions().filter(q => q.id !== "health").map(q => q.title + "\n" + (answerLabels(q).join(" · ") || "Keine Angabe - freiwillig"))));
  sections.push(section("Bevor du loslegst", stopped ? ["Deinen Einstieg persönlich mit einem Trainer abstimmen. Bis dahin enthält diese Auswertung keine Trainingsempfehlung."] : nextSteps(recs)));
  return sections;
}

// Manual drafts only, based on the explicit care answer — never inferred from
// health, age, training goals or a wish to be accompanied on the first visit.
function buildMagiclineNotes() {
  if (state.answers.support === "some") return [
    "Das Mitglied wünscht zusätzliche Betreuung und häufiger Rückmeldung.",
    "Bitte Mitgliedercode „Betreuung+“ einpflegen."
  ];
  if (state.answers.support === "oneone") return [
    "Das Mitglied wünscht sich intensive 1:1-Betreuung. Interesse an Personal Training, keine Buchung.",
    "Bitte Mitgliedercode „1:1-Interesse“ einpflegen."
  ];
  return [];
}

function renderResults() {
  window.scrollTo({ top: 0, behavior: "auto" });
  progressWrap.hidden = true;
  resetBtn.hidden = false;
  const wantsAdvice = state.answers.guidance === "advice";
  const plan = createTrainingPlan();
  const weeks = plan.weeks;
  const recs = plan.recommendations;
  const mix = buildMix();
  const steps = nextSteps(wantsAdvice ? recs : chosenPrograms());
  const healthWarning = state.answers.health === "unclear";

  app.innerHTML = `
    <section class="results-screen">
      <section class="result-overview" aria-label="Dein Start auf einen Blick">
      <div class="results-head">
        <div>
          <div class="eyebrow">DEIN PERSÖNLICHER EINSTIEG</div>
          <h1>Dein Start<br>in der Area.</h1>
          <p>Dein Ziel. Dein Alltag. Dein Weg in die Area.</p>
        </div>
        <button class="secondary-btn" id="adjustBtn">Antworten anpassen</button>
      </div>

      ${renderPersonalSummary(plan)}

      ${healthWarning ? `
        <div class="health-alert">
          <strong>Bitte zuerst kurz mit einem Trainer sprechen.</strong>
          Du hast angegeben, dass aktuell eine gesundheitliche Einschränkung besteht und du nicht sicher bist, was du belasten darfst. Deshalb empfehlen wir vor dem ersten Training ein kurzes Trainer-Gespräch. Danach kann der passende Einstieg gemeinsam festgelegt werden.
        </div>` : ""}

      ${renderChoice()}

      ${wantsAdvice || healthWarning ? `<section class="mix-stage ${weeks.length > 1 ? "rotating" : ""}">
        <div class="section-kicker">${healthWarning ? "DEIN ERSTER SCHRITT" : "UNSERE EMPFEHLUNG · DEIN WOCHENSTART"}</div>
        <h2>${healthWarning ? "Zuerst gemeinsam klären." : weeks.length ? "Dein Mix. Dein Rhythmus." : "Lass uns deinen Fokus finden."}</h2>
        ${weeks.length ? `<div class="plan-tags"><span>${plan.sessions} ${plan.sessions === 1 ? "Einheit" : "Einheiten"} pro Woche</span><span>${weeks.length > 1 ? "Wechselnde Wochen · gleiche Basis" : "Ein klarer Wochenrhythmus"}</span></div>` : ""}
        ${weeks.length > 1 ? `<p class="rotation-intro">Du wünschst dir Abwechslung. So könnten sich deine Wochen abwechseln – mit konkreten Angeboten und wechselnden Schwerpunkten.</p>` : ""}
        ${weeks.length ? weeks.map(week => `<section class="mix-week" aria-label="${week.label}">
          ${weeks.length > 1 ? `<h3><span>Woche</span>${week.label.at(-1)}</h3>` : ""}${renderMixRows(week.rows)}
        </section>`).join("") : renderMixRows(mix, healthWarning)}
        <p>${healthWarning ? "Bis zur Klärung geben wir keine Trainingsempfehlung aus." : "Ein Vorschlag auf Basis deiner Antworten – kein starrer Wochenplan. Den Kursplan prüfen wir gemeinsam."}</p>
        ${weeks.some(week => week.entries.some(entry => entry.key === "gym")) ? "<p>Freies Training meint den Geräte- und Kraftbereich. Übungen und Einweisung stimmen wir mit dir ab.</p>" : ""}
        ${plan.sessions === 5 && weeks.length ? "<p>Hier zeigen wir ein Beispiel mit fünf Einheiten. Ob mehr sinnvoll und machbar ist, besprechen wir gemeinsam.</p>" : ""}
      </section>` : `<section class="support-stage"><div class="section-kicker">WIR UNTERSTÜTZEN DEINE WAHL</div>
        <h2>Dein Weg. Gemeinsam starten.</h2>
        <p>Wir schauen uns deine ausgewählten Angebote an, klären deine Fragen und planen die ersten Schritte mit dir.${chosenPrograms().length ? "" : " Da du bei den Angeboten noch offen bist, wählen wir sie im Gespräch gemeinsam aus."}</p>
        <button class="secondary-btn" id="showAdviceBtn">Ich möchte doch eine Empfehlung</button>
      </section>`}
      ${plan.notes.length ? `<aside class="plan-notes" aria-label="Für unser Gespräch"><strong>Gemeinsam feinjustieren.</strong><ul>${plan.notes.map(note => `<li>${note}</li>`).join("")}</ul></aside>` : ""}
      </section>

      ${renderFirstVisit(wantsAdvice ? recs : chosenPrograms())}

      <section class="why-section" aria-labelledby="whyTitle">
        <div class="why-heading">
          <div class="section-kicker">DIE GEDANKEN HINTER DEINEM START</div>
          <h2 id="whyTitle">Warum.</h2>
          <p class="section-lead">${healthWarning ? "Warum wir zuerst die offenen Fragen klären – und deine Ziele trotzdem im Blick behalten." : wantsAdvice ? "Hier siehst du, wie deine Antworten zu unserem Vorschlag führen und welche Grundlagen wir mitdenken." : "Deine Wahl bleibt deine Wahl. Diese Grundlagen helfen uns, deinen Einstieg gemeinsam zu gestalten."}</p>
        </div>

      ${renderPlanReasoning(plan)}

      ${wantsAdvice && !healthWarning ? `<section class="recommendation-section">
        <div class="section-kicker">DEIN TRAININGSWEG</div>
        ${!recs.length ? "<p>Deine Trainingsbasis legen wir gemeinsam im Gespräch fest.</p>" : ""}
        <div class="recommendations">
        ${recs.map(([key, data], i) => {
          const p = programs[key];
          const reasons = data.reasons.slice(0,3).join(" ");
          return `
            <article class="result-card ${i===0 ? "primary" : ""}">
              <div class="rank">${labelForRank(i, key)}</div>
              <h2 class="result-title">${p.title}</h2>
              <span class="badge ${p.included ? "included" : "extra"}">${p.included ? "Inklusive" : "Kostenpflichtige Zusatzoption"}</span>
              <p>${p.desc}</p>
              <div class="why-box">
                <strong>Warum das zu dir passt</strong>
                <span>${reasons || "Diese Option passt zu deinen Zielen und zu der Art, wie du trainieren möchtest."}</span>
              </div>
            </article>`;
        }).join("")}
        </div>
      </section>` : ""}

      ${plan.alternatives.length ? `<section class="plan-alternatives"><h3>Auch möglich – ohne deine Woche voller zu machen.</h3><p>Diese Angebote kannst du mit uns als Austauschoption besprechen. Sie sind keine zusätzlichen Pflichttermine.</p>
        <ul>${plan.alternatives.map(key => `<li><strong>${programs[key].title}</strong> — ${key === "legends" ? "Das Angebot ab 40 ist eine Alternative zu regulärem Boxen oder Kickboxen, keine automatische Alterszuordnung." : "Du hast Interesse daran. Wir besprechen, welche Einheit es bei Bedarf ersetzen kann."}</li>`).join("")}</ul></section>` : ""}

      ${renderFoundations()}
      </section>
      ${renderAnswerSummary()}

      <section class="sop-card">
        <div class="sop-intro">
          <div class="section-kicker">DEIN NÄCHSTER SCHRITT</div>
          <h2>Bevor du loslegst.</h2>
          <p>Damit du dich in der Area direkt zurechtfindest.</p>
        </div>
        <div class="checklist">
          ${steps.map(s => `
            <label class="check-row">
              <input type="checkbox" />
              <span>${s}</span>
            </label>`).join("")}
        </div>
        <button class="primary-btn finish-btn" id="finishBtn">Start klar <span aria-hidden="true">✓</span></button>
      </section>
      <section class="export-panel" aria-labelledby="exportTitle">
        <div><h2 id="exportTitle">Deinen Start mitnehmen.</h2>
          <p>Deine Wahl, ${wantsAdvice ? "unsere Empfehlung, " : ""}Grundlagen, Antworten und Checkliste als PDF.</p>
          <label class="export-health"><input type="checkbox" id="includeHealth" /> Gesundheitsantwort im PDF einschließen</label>
          <p class="export-help">„Als PDF speichern“ im Druckdialog wählen. Auf dem iPad die Druckvorschau öffnen und über „Teilen“ in Dateien sichern. Eine gespeicherte PDF bleibt auch nach „Neu starten“ erhalten.</p>
        </div>
        <button class="secondary-btn" id="exportBtn">PDF / Drucken ↓</button>
      </section>
      <section class="magicline-panel" aria-labelledby="magiclineTitle">
        <div class="section-kicker">FÜR UNSER TEAM · MAGICLINE</div>
        <h2 id="magiclineTitle">Beim Mitglied hinterlegen.</h2>
        <p>Übernimmt diese Auswertung als PDF: Ziele, Trainingsvorschlag, Betreuung, Grundlagen und Antworten – ohne Gesundheitsantwort und zugehörige Hinweise. Im nächsten Schritt wählst du das Mitglied und bestätigst die Ablage.</p>
        <p class="export-help">Die Übergabe öffnet unseren geschützten Mitarbeiterzugang. Dort siehst du, ob Sandbox oder Produktion aktiv ist. Prüfe das angezeigte Mitglied vor dem Speichern. In der Sandbox nur erfundene Antworten verwenden. Eine abgelegte PDF bleibt nach „Neu starten“ erhalten.</p>
        <button class="primary-btn" id="magiclineBtn" type="button">In Magicline ablegen →</button>
        <p id="magiclineStatus" role="status" aria-live="polite"></p>
        <section id="magiclineNotes" class="manual-notes" aria-labelledby="magiclineNotesTitle" hidden>
          <div class="section-kicker">NOCH MANUELL ZU ERLEDIGEN</div>
          <h3 id="magiclineNotesTitle">Zwei Info-Notizen für Magicline.</h3>
          <p>Nur die PDF wurde abgelegt. Prüfe das richtige Mitglied und füge diese Texte dort jeweils als neue Notiz der Art „Info“ ein. Der Mitgliedercode muss ebenfalls manuell zugewiesen werden.</p>
          <div class="manual-note-grid">
            <div class="manual-note">
              <label for="magiclineNote0">1 · Betreuungswunsch</label>
              <textarea id="magiclineNote0" rows="4" readonly spellcheck="false"></textarea>
              <button id="copyMagiclineNote0" class="secondary-btn" type="button">Betreuungswunsch kopieren</button>
            </div>
            <div class="manual-note">
              <label for="magiclineNote1">2 · Mitgliedercode einpflegen</label>
              <textarea id="magiclineNote1" rows="4" readonly spellcheck="false"></textarea>
              <button id="copyMagiclineNote1" class="secondary-btn" type="button">Code-Hinweis kopieren</button>
            </div>
          </div>
          <p id="magiclineCopyStatus" role="status" aria-live="polite"></p>
          <p class="export-help">Kopieren speichert keine Notiz in Magicline. Kopierte Texte bleiben auch nach „Neu starten“ in der Zwischenablage.</p>
        </section>
      </section>
    </section>
  `;

  document.body.classList.add("result-view");
  document.body.classList.remove("print-health");
  document.querySelectorAll(".answer-edit").forEach(btn => {
    btn.onclick = () => { state.step = Number(btn.dataset.step); renderQuestion(); };
  });
  document.getElementById("includeHealth").onchange = event => {
    document.body.classList.toggle("print-health", event.target.checked);
  };
  document.getElementById("exportBtn").onclick = () => window.print();
  window.Area76Transfer?.bind(buildMagiclineSections, buildMagiclineNotes);
  const showAdviceBtn = document.getElementById("showAdviceBtn");
  if (showAdviceBtn) showAdviceBtn.onclick = () => { state.answers.guidance = "advice"; renderResults(); };
  document.querySelectorAll('.foundations a[href^="#source-"]').forEach(link => {
    link.onclick = () => { document.querySelector(".sources").open = true; };
  });

  document.getElementById("adjustBtn").onclick = () => {
    state.step = Math.max(0, visibleQuestions().length - 1);
    renderQuestion();
  };
  document.getElementById("finishBtn").onclick = () => {
    const ok = confirm("Start klar? Alle Antworten werden für das nächste Mitglied gelöscht.");
    if (ok) renderStart();
  };
}

resetBtn.onclick = () => {
  const ok = state.step === -1 || confirm("Neu starten? Alle aktuellen Antworten werden verworfen.");
  if (ok) renderStart();
};

let sourceWasOpen = false;
window.addEventListener("beforeprint", () => {
  const sources = document.querySelector(".sources");
  if (sources) { sourceWasOpen = sources.open; sources.open = true; }
});
window.addEventListener("afterprint", () => {
  const sources = document.querySelector(".sources");
  if (sources) sources.open = sourceWasOpen;
});

renderStart();
