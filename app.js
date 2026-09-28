
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
    subtitle: "Wenn Kampfsport für dich gerade kein Thema ist, kannst du diese Frage überspringen.",
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
      ["unsure", "Noch unsicher", "Ich möchte mir beides anschauen."],
      ["skip", "Überspringen – aktuell nicht relevant", "Für meinen Einstieg möchte ich Kampfsport nicht weiterverfolgen."]
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
      return state.answers.combatPreference !== "skip" && (goals.includes("combat") || interests.includes("boxing") || interests.includes("kickboxing"));
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
        <span>Rund 10 kurze Fragen</span>
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
              <button type="button" class="option-btn ${selected ? "selected" : ""}" data-value="${value}">
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
  const hasCombatInterest = a.combatPreference !== "skip" && (goals.includes("combat") || interests.some(k => ["boxing", "kickboxing"].includes(k)));
  const age = hasCombatInterest ? a.ageband : undefined;
  const combat = hasCombatInterest ? a.combatPreference : undefined;

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

  // Combat preference
  if (combat === "hands") { add(s,"boxing",8,"Du bevorzugst Training nur mit den Händen."); add(s,"kickboxing",-3); }
  if (combat === "handsfeet") { add(s,"kickboxing",8,"Du möchtest Hände und Füße einsetzen."); add(s,"boxing",-2); }
  if (combat === "both" || combat === "unsure") { add(s,"boxing",3); add(s,"kickboxing",3); }
  if (["40to59", "60plus"].includes(age) && hasCombatInterest) {
    add(s,"legends",10,"Boxing Legends ist ein zusätzliches Kampfsportangebot ab 40, das du kennenlernen kannst. Die regulären Kurse stehen dir ebenfalls offen.");
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

// Studio matching rules, not a clinically validated score. General preferences
// may order suitable programs, but cannot make an unrelated sport suitable.
function isRelevantProgram(key) {
  const a = state.answers;
  const goals = a.goals || [];
  const interests = a.interests || [];
  const combat = a.combatPreference !== "skip" && (goals.includes("combat") || interests.some(k => ["boxing", "kickboxing"].includes(k)));
  if (a.health === "unclear") return false;
  if (key === "pt") return a.support === "oneone";
  if (key === "hyrox") return goals.includes("hyroxgoal") || interests.includes("hyrox");
  if (key === "legends") return combat && ["40to59", "60plus"].includes(a.ageband);
  if (key === "boxing" || key === "kickboxing") {
    if (!combat) return false;
    if (a.combatPreference === "hands") return key === "boxing";
    if (a.combatPreference === "handsfeet") return key === "kickboxing";
    return goals.includes("combat") || interests.includes(key) || a.combatPreference === "both";
  }
  if (key === "sixpack") return interests.includes("sixpack");
  if (key === "backclass") return goals.includes("back") || interests.includes("backclass");
  if (key === "yoga") return goals.some(k => ["mobility", "stress"].includes(k)) || interests.includes("yoga");
  if (key === "hybrid") return interests.includes("hybrid") || goals.some(k => ["strength", "muscle", "fitness", "endurance", "bodycomp", "hyroxgoal"].includes(k));
  return key === "gym";
}

function recommendationList() {
  if (state.answers.health === "unclear") return [];
  const score = scorePrograms();
  const sorted = Object.entries(score)
    .filter(([key, data]) => data.points > 0 && isRelevantProgram(key))
    .sort((a,b) => b[1].points - a[1].points);
  const regular = sorted.filter(([key]) => !["pt", "sixpack"].includes(key));
  const extras = sorted.filter(([key]) => ["pt", "sixpack"].includes(key));
  // PT and short Core sessions supplement a training basis; never replace it.
  return [...regular.slice(0, 3 - extras.length), ...extras].slice(0, 3);
}

function buildMix(recs) {
  const commitment = parseInt(state.answers.commitment || "2", 10);
  const keys = recs.map(([k]) => k).filter(k => !["pt", "sixpack"].includes(k));
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

  if (!keys.length) return [["Gemeinsam", "Deine Trainingsbasis im Gespräch festlegen"]];

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

  if (recs.some(([key]) => key === "sixpack") && commitment >= 3) rows.push(["optional", "Seventy Sixpack als 30-min Core-Add-on"]);
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
  if (["pt", "sixpack"].includes(key)) return "Optional für dich";
  if (i === 0) return "Deine Basis";
  if (i === 1 && key !== "sixpack") return "Deine Ergänzung";
  return "Optional für dich";
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
  const keys = (state.answers.interests || []).filter(key => programs[key] &&
    !(state.answers.combatPreference === "skip" && ["boxing", "kickboxing"].includes(key)));
  if (state.answers.support === "oneone") keys.push("pt");
  return keys.map(key => [key, { reasons: [] }]);
}

function answerLabels(q) {
  const answer = state.answers[q.id];
  const values = Array.isArray(answer) ? answer : [answer];
  return q.options.filter(([key]) => values.includes(key)).map(([, label]) => label);
}

function renderChoice() {
  const skippedCombat = state.answers.combatPreference === "skip" && visibleQuestions().some(q => q.id === "combatPreference");
  const interests = questions.find(q => q.id === "interests").options
    .filter(([key]) => (state.answers.interests || []).includes(key) && !(skippedCombat && ["boxing", "kickboxing"].includes(key)))
    .map(([, label]) => label);
  const goals = answerLabels(questions.find(q => q.id === "goals"));
  const undecided = !chosenPrograms().some(([key]) => key !== "pt");
  return `<section class="choice-section" aria-labelledby="choiceTitle">
    <div class="section-kicker">DEINE ZIELE. DEINE INTERESSEN.</div>
    <h2 id="choiceTitle">Das ist deine Wahl.</h2>
    <p class="section-lead">${undecided ? "Bei den Angeboten bist du noch offen. Deine Ziele geben uns Orientierung." : "Diese Angebote sprechen dich an. Das ist dein Ausgangspunkt, noch kein fester Trainingsplan."}</p>
    <div class="choice-offers">${interests.map(label => `<span>${label}</span>`).join("")}</div>
    ${skippedCombat ? "<p>Kampfsport hast du anschließend übersprungen. Wir berücksichtigen ihn für deinen Einstieg nicht weiter.</p>" : ""}
    <p><strong>Das möchtest du erreichen:</strong> ${goals.join(" · ")}</p>
    ${state.answers.support === "oneone" ? `<p>Du wünschst dir zusätzlich intensive 1:1-Betreuung. Personal Training ist eine kostenpflichtige Zusatzoption.</p>` : ""}
  </section>`;
}

function renderFoundations() {
  const mobility = (state.answers.goals || []).includes("mobility");
  return `
    <section class="foundations" aria-labelledby="foundationsTitle">
      <div class="section-kicker">GUT ZU WISSEN</div>
      <h2 id="foundationsTitle">Warum wir Krafttraining mitdenken.</h2>
      <p class="section-lead">${mobility ? "Du möchtest beweglicher werden. Dazu kann auch angepasstes Krafttraining beitragen." : "Krafttraining unterstützt Muskelkraft und körperliche Leistungsfähigkeit – auch ohne Muskelaufbau als Hauptziel."} Diese Grundlagen ergänzen deine Wahl.</p>
      <div class="foundation-grid">
        <article><h3>Regelmäßig statt perfekt</h3>
          <p>Für Erwachsene empfiehlt die WHO Muskelkräftigung aller großen Muskelgruppen an mindestens zwei Tagen pro Woche. Dazu kommen 150–300 Minuten moderate oder 75–150 Minuten intensive Ausdaueraktivität pro Woche, auch außerhalb des Studios. <a href="#source-1">[1]</a></p>
          <p>Ein realistischer Einstieg darf kleiner sein. Umfang und Belastung werden schrittweise angepasst. Die ACSM betont regelmäßiges, individuell passendes Training. <a href="#source-2">[2]</a></p>
        </article>
        <article><h3>Kraft & Beweglichkeit</h3>
          <p>Krafttraining kann den Bewegungsumfang verbessern. Eine Übersicht von 2025 zeigt positive Effekte, weist aber auf deutliche Unterschiede und methodische Schwächen der Studien hin. Es gibt keine Garantie für einzelne Personen oder Übungen. <a href="#source-3">[3]</a></p>
        </article>
        <article><h3>Menopause & Knochen</h3>
          <p>Der Östrogenabfall nach der Menopause erhöht das Osteoporoserisiko. <a href="#source-4">[4]</a> Geeignete Kombinationen aus Krafttraining und gewichtsbelastender Bewegung können den Knochenverlust nach der Menopause vermindern. Ein sicherer Schutz vor Knochenbrüchen ist damit nicht garantiert. <a href="#source-5">[5]</a></p>
        </article>
      </div>
      <p class="foundation-note">Bei bekannter Osteoporose oder früheren Knochenbrüchen das Training mit ärztlicher bzw. physiotherapeutischer Unterstützung anpassen. Dies sind allgemeine Informationen. Wir erheben keinen Menopausenstatus und leiten kein persönliches Osteoporoserisiko ab.</p>
      <details class="sources">
        <summary>Quellen & Einordnung · Recherche 28.09.2026</summary>
        <div class="source-content"><p>Die Grundlagen beruhen auf Leitlinien und Übersichtsarbeiten. Die Zuordnung zu unseren Studioangeboten ist eine Beratungshilfe, kein wissenschaftlich validierter Test.</p>
        <ol>${evidenceSources.map(([title, url], i) => `<li id="source-${i + 1}"><a href="${url}" target="_blank" rel="noopener noreferrer">${title}</a></li>`).join("")}</ol></div>
      </details>
    </section>`;
}

function renderAnswerSummary() {
  return `<section class="answer-summary" aria-labelledby="summaryTitle">
    <div class="section-kicker">DAS HAST DU UNS MITGEGEBEN</div>
    <h2 id="summaryTitle">Deine Antworten.</h2>
    <dl class="answer-list">${visibleQuestions().map((q, index) => `
      <div class="answer-row ${q.id === "health" ? "health-answer" : ""}">
        <dt>${q.title}</dt><dd>${answerLabels(q).join(" · ") || "Noch nicht beantwortet"}</dd>
        <button class="link-btn answer-edit" data-step="${index}" aria-label="Antwort ändern: ${q.title}">Ändern</button>
      </div>`).join("")}</dl>
  </section>`;
}

function renderResults() {
  window.scrollTo({ top: 0, behavior: "auto" });
  progressWrap.hidden = true;
  resetBtn.hidden = false;
  const wantsAdvice = state.answers.guidance === "advice";
  const recs = wantsAdvice ? recommendationList() : [];
  const mix = buildMix(recs);
  const steps = nextSteps(wantsAdvice ? recs : chosenPrograms());
  const healthWarning = state.answers.health === "unclear";

  app.innerHTML = `
    <section class="results-screen">
      <div class="results-head">
        <div>
          <div class="eyebrow">DEIN PERSÖNLICHER EINSTIEG</div>
          <h1>Dein Start<br>in der Area.</h1>
          <p>Wir haben deine Ziele, deine Erfahrung und deinen Alltag berücksichtigt.</p>
        </div>
        <button class="secondary-btn" id="adjustBtn">Antworten anpassen</button>
      </div>

      ${renderChoice()}

      ${healthWarning ? `
        <div class="health-alert">
          <strong>Bitte zuerst kurz mit einem Trainer sprechen.</strong>
          Du hast angegeben, dass aktuell eine gesundheitliche Einschränkung besteht und du nicht sicher bist, was du belasten darfst. Deshalb empfehlen wir vor dem ersten Training ein kurzes Trainer-Gespräch. Danach kann der passende Einstieg gemeinsam festgelegt werden.
        </div>` : ""}

      ${wantsAdvice || healthWarning ? `<section class="mix-stage">
        <div class="section-kicker">${healthWarning ? "DEIN ERSTER SCHRITT" : "UNSERE EMPFEHLUNG · DEIN WOCHENSTART"}</div>
        <h2>${healthWarning ? "Zuerst gemeinsam klären." : "Unsere Empfehlung."}</h2>
        <div class="mix-display">
          ${mix.map(([n, text], i) => `
            ${i ? `<span class="mix-plus" aria-hidden="true">${healthWarning ? "→" : "+"}</span>` : ""}
            <div class="mix-item ${n.length > 5 ? "mix-item-guidance" : ""}"><strong>${n}</strong><span>${displayMixText(text)}</span></div>
          `).join("")}
        </div>
        <p>${healthWarning ? "Bis zur Klärung geben wir keine Trainingsempfehlung aus." : "Ein Vorschlag auf Basis deiner Antworten – kein starrer Wochenplan. Den Kursplan prüfen wir gemeinsam."}</p>
      </section>` : `<section class="support-stage"><div class="section-kicker">WIR UNTERSTÜTZEN DEINE WAHL</div>
        <h2>Dein Weg. Gemeinsam starten.</h2>
        <p>Wir schauen uns deine ausgewählten Angebote an, klären deine Fragen und planen die ersten Schritte mit dir.${chosenPrograms().length ? "" : " Da du bei den Angeboten noch offen bist, wählen wir sie im Gespräch gemeinsam aus."}</p>
        <button class="secondary-btn" id="showAdviceBtn">Ich möchte doch eine Empfehlung</button>
      </section>`}

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

      ${renderFoundations()}
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
