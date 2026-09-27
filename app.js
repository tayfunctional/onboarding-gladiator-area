
const app = document.getElementById("app");
const progressWrap = document.getElementById("progressWrap");
const progressBar = document.getElementById("progressBar");
const progressPercent = document.getElementById("progressPercent");
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
    title: "Wie oft kannst du dich realistisch pro Woche zum Training committen?",
    subtitle: "Nicht das Maximum – sondern das, was langfristig wirklich in deinen Alltag passt.",
    type: "single",
    info: "Regelmäßigkeit ist wichtiger als ein perfekter Plan. Wir möchten dir etwas empfehlen, das du dauerhaft umsetzen kannst.",
    options: [
      ["1", "1× pro Woche", "Ein fester Termin, der wirklich klappt."],
      ["2", "2× pro Woche", "Sehr gute Basis für kontinuierlichen Fortschritt."],
      ["3", "3× pro Woche", "Optimal für viele kombinierte Trainingsmodelle."],
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
    id: "combatPreference",
    title: "Falls Kampfsport für dich interessant ist: Was spricht dich mehr an?",
    subtitle: "Diese Frage erscheint nur, wenn Boxen oder Kickboxen relevant ist.",
    type: "single",
    conditional: () => {
      const goals = state.answers.goals || [];
      const interests = state.answers.interests || [];
      return goals.includes("combat") || interests.includes("boxing") || interests.includes("kickboxing");
    },
    info: "Boxen arbeitet ausschließlich mit den Händen. Beim Kickboxen kommen zusätzlich Kicks dazu.",
    options: [
      ["hands", "Boxen", "Nur Hände."],
      ["handsfeet", "Kickboxen", "Hände + Füße."],
      ["both", "Beides klingt gut", "Ich möchte offen starten."],
      ["unsure", "Noch unsicher", "Ich möchte mir beides anschauen."]
    ]
  },
  {
    id: "ageband",
    title: "Welche Altersgruppe trifft auf dich zu?",
    subtitle: "Wir brauchen kein Geburtsdatum und kein genaues Alter.",
    type: "single",
    conditional: () => {
      const goals = state.answers.goals || [];
      const interests = state.answers.interests || [];
      return goals.includes("combat") || interests.includes("boxing") || interests.includes("kickboxing");
    },
    info: "Ab 40 kann Boxing Legends eine zusätzliche passende Option sein.",
    options: [
      ["under40", "Unter 40", ""],
      ["40plus", "40 oder älter", ""]
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
  }
];

function visibleQuestions() {
  return questions.filter(q => !q.conditional || q.conditional());
}

function renderStart() {
  state.step = -1;
  state.answers = {};
  progressWrap.hidden = true;
  resetBtn.hidden = true;
  app.innerHTML = `
    <section class="hero">
      <div class="hero-card">
        <div class="eyebrow">DEIN START BEI GLADIATOR AREA 76</div>
        <h1>Finde den Trainingsweg, der wirklich zu dir passt.</h1>
        <p class="lead">Um dir die bestmögliche Empfehlung zu geben, möchten wir dir ein paar kurze Fragen stellen. Am Ende bekommst du einen sinnvollen Einstieg – passend zu deinem Ziel, deiner Erfahrung und deinem Alltag.</p>
        <div class="hero-actions">
          <button class="primary-btn" id="startBtn">Onboarding starten →</button>
        </div>
      </div>
      <aside class="side-card">
        <h2>Was du am Ende bekommst</h2>
        <div class="feature-list">
          <div class="feature"><div class="feature-icon">1</div><div><strong>Klare Empfehlung</strong><span>Mehrere passende Trainingsmöglichkeiten statt nur ein einzelner Kurs.</span></div></div>
          <div class="feature"><div class="feature-icon">2</div><div><strong>Sinnvoller Trainingsmix</strong><span>Zum Beispiel HYBRID + Geräte-/Krafttraining – passend zu deinem Commitment.</span></div></div>
          <div class="feature"><div class="feature-icon">3</div><div><strong>Konkreter nächster Schritt</strong><span>Damit du nach der Anmeldung nicht alleine gelassen wirst.</span></div></div>
        </div>
        <div class="small-note">Keine Namen, E-Mail-Adressen oder sonstigen persönlichen Daten. Nach „Neu starten“ werden alle Antworten verworfen.</div>
      </aside>
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
  stepLabel.textContent = `Frage ${current} von ${qs.length}`;
  progressPercent.textContent = `${pct}%`;
  progressBar.style.width = `${pct}%`;
}

function renderQuestion() {
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
      <div class="question-card">
        <div class="question-number">Frage ${state.step + 1}</div>
        <h2 class="question-title">${q.title}</h2>
        <div class="question-subtitle">${q.subtitle || ""}</div>
        <div class="option-grid ${q.type === "multi" ? "multi" : ""}" id="options">
          ${q.options.map(([value, label, desc]) => {
            const selected = q.type === "multi" ? current.includes(value) : current === value;
            return `
              <button type="button" class="option-btn ${selected ? "selected" : ""}" data-value="${value}">
                <span class="option-dot"></span>
                <span class="option-copy">
                  <strong>${label}</strong>
                  ${desc ? `<span>${desc}</span>` : ""}
                </span>
              </button>`;
          }).join("")}
        </div>
        <div class="question-actions">
          <button class="secondary-btn" id="backBtn">← Zurück</button>
          <button class="primary-btn" id="nextBtn" ${isAnswered(q) ? "" : "disabled"}>${state.step === qs.length - 1 ? "Empfehlung anzeigen →" : "Weiter →"}</button>
        </div>
      </div>
      <aside class="info-panel">
        <div class="info-icon">i</div>
        <h3>Gut zu wissen</h3>
        <p>${q.info}</p>
        ${q.id === "style" ? `<p class="micro">Kurse haben ein Teilnehmerlimit, damit Betreuung und Trainingsqualität gewährleistet bleiben.</p>` : ""}
      </aside>
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

function scorePrograms() {
  const a = state.answers;
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
  const age = a.ageband;
  const combat = a.combatPreference;

  // Goal weighting
  if (goals.includes("strength")) { add(s,"gym",4,"Du möchtest stärker werden."); add(s,"hybrid",4,"Kraft ist ein zentraler Teil deines Ziels."); }
  if (goals.includes("muscle")) { add(s,"gym",5,"Muskelaufbau lässt sich flexibel im Kraftbereich steuern."); add(s,"hybrid",2,"Strukturiertes Krafttraining unterstützt deine Basis."); }
  if (goals.includes("fitness")) { add(s,"hybrid",5,"Du möchtest Kraft und Kondition gemeinsam verbessern."); add(s,"gym",2,"Krafttraining kann deine allgemeine Fitness ergänzen."); add(s,"hyrox",2,"Ausdauerorientiertes Training kann ebenfalls passen."); }
  if (goals.includes("endurance")) { add(s,"hyrox",5,"Ausdauer ist ein zentrales Trainingsziel."); add(s,"hybrid",3,"Conditioning ergänzt die Kraftarbeit."); }
  if (goals.includes("bodycomp")) { add(s,"gym",4,"Krafttraining ist eine starke Basis für Körperkomposition."); add(s,"hybrid",4,"Kraft + Conditioning schafft einen guten Gesamtmix."); add(s,"sixpack",1,"Als zusätzliche Core-Einheit kann Seventy Sixpack passen."); }
  if (goals.includes("mobility")) { add(s,"yoga",6,"Beweglichkeit und Körpergefühl stehen im Vordergrund."); }
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

  // Combat preference
  if (combat === "hands") { add(s,"boxing",8,"Du bevorzugst Training nur mit den Händen."); add(s,"kickboxing",-3); }
  if (combat === "handsfeet") { add(s,"kickboxing",8,"Du möchtest Hände und Füße einsetzen."); add(s,"boxing",-2); }
  if (combat === "both" || combat === "unsure") { add(s,"boxing",3); add(s,"kickboxing",3); }
  if (age === "40plus" && (goals.includes("combat") || interests.includes("boxing") || interests.includes("kickboxing"))) {
    add(s,"legends",10,"Du interessierst dich für Kampfsport und bist 40 oder älter.");
  }

  // Back / yoga / sixpack add-on nuance
  if (interests.includes("sixpack")) add(s,"sixpack",3);
  if (goals.includes("bodycomp") && Number(a.commitment || 0) >= 3) add(s,"sixpack",1,"Du hast genügend Trainingsfrequenz für eine zusätzliche kurze Core-Einheit.");

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

function recommendationList() {
  const score = scorePrograms();
  const sorted = Object.entries(score)
    .filter(([key, data]) => data.points > 0)
    .sort((a,b) => b[1].points - a[1].points);

  let result = [];
  for (const item of sorted) {
    const [key] = item;
    // Seventy Sixpack should almost never be primary
    if (result.length === 0 && key === "sixpack") continue;
    result.push(item);
    if (result.length >= 3) break;
  }
  if (!result.length) {
    result = [["hybrid", score.hybrid], ["gym", score.gym]];
  }

  // Add sixpack as optional if relevant and not present, but keep total 3
  const wantsSixpack = (state.answers.interests || []).includes("sixpack") || (state.answers.goals || []).includes("bodycomp");
  if (wantsSixpack && !result.some(([k]) => k === "sixpack")) {
    if (result.length >= 3) result[result.length - 1] = ["sixpack", score.sixpack];
    else result.push(["sixpack", score.sixpack]);
  }
  return result;
}

function buildMix(recs) {
  const commitment = parseInt(state.answers.commitment || "2", 10);
  const keys = recs.map(([k]) => k);
  const rows = [];

  const primary = keys[0];
  const hasGym = keys.includes("gym");
  const classKeys = keys.filter(k => ["hybrid","hyrox","boxing","kickboxing","legends","yoga","backclass"].includes(k));

  if (state.answers.health === "unclear") {
    return [
      ["1. Schritt", "Trainer-Gespräch vor dem ersten Training"],
      ["Danach", "Passenden Einstieg gemeinsam festlegen"]
    ];
  }

  if (primary === "hybrid") {
    if (commitment === 1) rows.push(["1×", "HYBRID"]);
    else if (commitment === 2) rows.push(["1–2×", "HYBRID"]);
    else rows.push(["2×", "HYBRID"]);
    if (commitment >= 3) rows.push([`${Math.max(1, commitment-2)}×`, "Geräte-/Krafttraining oder passende Ergänzung"]);
  } else if (primary === "hyrox") {
    rows.push([commitment >= 3 ? "2×" : "1×", "HYROX"]);
    if (commitment >= 2) rows.push(["1×", keys.includes("hybrid") ? "HYBRID als Kraftbasis" : "Geräte-/Krafttraining"]);
    if (commitment >= 4) rows.push(["1×", "flexible zusätzliche Einheit"]);
  } else if (["boxing","kickboxing","legends"].includes(primary)) {
    rows.push([commitment >= 2 ? "1–2×" : "1×", programs[primary].title]);
    if (commitment >= 3) rows.push(["1–2×", "Geräte-/Krafttraining oder HYBRID"]);
  } else if (primary === "gym") {
    rows.push([`${Math.max(1, commitment - (classKeys.length ? 1 : 0))}×`, "Geräte-/Krafttraining"]);
    if (classKeys.length && commitment >= 2) rows.push(["1×", programs[classKeys[0]].title]);
  } else if (primary === "yoga" || primary === "backclass") {
    rows.push(["1×", programs[primary].title]);
    if (commitment >= 2) rows.push([`${commitment-1}×`, "Geräte-/Krafttraining oder weitere passende Einheit"]);
  } else {
    rows.push([`${commitment}×`, programs[primary]?.title || "Training"]);
  }

  if (keys.includes("sixpack") && commitment >= 3) rows.push(["optional", "Seventy Sixpack als 30-min Core-Add-on"]);
  return rows.slice(0,4);
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
  if (key === "sixpack") return "Optional interessant";
  if (i === 0) return "Hauptempfehlung";
  if (i === 1) return "Sinnvolle Ergänzung";
  return "Weitere passende Option";
}

function renderResults() {
  progressWrap.hidden = true;
  resetBtn.hidden = false;
  const recs = recommendationList();
  const mix = buildMix(recs);
  const steps = nextSteps(recs);
  const healthWarning = state.answers.health === "unclear";

  app.innerHTML = `
    <section class="results-screen">
      <div class="results-head">
        <div>
          <div class="eyebrow">DEIN START BEI GLADIATOR AREA 76</div>
          <h1>Unsere Empfehlung an dich</h1>
        </div>
        <button class="secondary-btn" id="adjustBtn">Antworten anpassen</button>
      </div>

      ${healthWarning ? `
        <div class="health-alert">
          <strong>Bitte zuerst kurz mit einem Trainer sprechen.</strong>
          Du hast angegeben, dass aktuell eine gesundheitliche Einschränkung besteht und du nicht sicher bist, was du belasten darfst. Deshalb empfehlen wir vor dem ersten Training ein kurzes Trainer-Gespräch. Danach kann der passende Einstieg gemeinsam festgelegt werden.
        </div>` : ""}

      <div class="results-grid">
        <div class="recommendations">
          ${recs.map(([key, data], i) => {
            const p = programs[key];
            const reasons = data.reasons.slice(0,3).join(" ");
            return `
              <article class="result-card ${i===0 ? "primary" : ""}">
                <div class="result-top">
                  <div>
                    <div class="rank">${labelForRank(i, key)}</div>
                    <h2 class="result-title">${p.title}</h2>
                  </div>
                  <span class="badge ${p.included ? "included" : "extra"}">${p.included ? "In Mitgliedschaft enthalten" : "Kostenpflichtige Zusatzoption"}</span>
                </div>
                <p>${p.desc}</p>
                <div class="why-box">
                  <strong>Warum haben wir das für dich ausgewählt?</strong>
                  <span>${reasons || "Diese Option passt zu deinen ausgewählten Zielen und deiner gewünschten Trainingsform."}</span>
                </div>
              </article>`;
          }).join("")}
        </div>

        <aside class="sop-column">
          <section class="sop-card">
            <h3>Beispiel für deinen Einstieg</h3>
            <div class="mix">
              ${mix.map(([n, text]) => `<div class="mix-row"><strong>${n}</strong><span>${text}</span></div>`).join("")}
            </div>
            <p class="small-note" style="margin-top:14px">Das ist ein möglicher Start, kein starrer Wochenplan. Der aktuelle Kursplan wird separat geprüft.</p>
          </section>

          <section class="sop-card">
            <h3>Dein nächster Schritt</h3>
            <div class="checklist">
              ${steps.map((s, idx) => `
                <label class="check-row">
                  <input type="checkbox" />
                  <span>${s}</span>
                </label>`).join("")}
            </div>
            <button class="primary-btn" id="finishBtn" style="width:100%; margin-top:18px">Onboarding abschließen</button>
          </section>
        </aside>
      </div>
    </section>
  `;

  document.getElementById("adjustBtn").onclick = () => {
    state.step = Math.max(0, visibleQuestions().length - 1);
    renderQuestion();
  };
  document.getElementById("finishBtn").onclick = () => {
    const ok = confirm("Onboarding abschließen und alle Antworten für das nächste Mitglied löschen?");
    if (ok) renderStart();
  };
}

resetBtn.onclick = () => {
  const ok = state.step === -1 || confirm("Neu starten? Alle aktuellen Antworten werden verworfen.");
  if (ok) renderStart();
};

renderStart();
