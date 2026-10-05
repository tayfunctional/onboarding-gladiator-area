/* In-memory, explicit-click handoff. No CORS, credentials, URL payload or Web Storage. */
(() => {
  "use strict";
  const origin = "https://api.gladiator76.de";
  let pending = null, popup = null, interval = null, nonce = null;
  const random = () => Array.from(crypto.getRandomValues(new Uint8Array(16)), b => b.toString(16).padStart(2, "0")).join("");
  const status = text => { const el = document.getElementById("magiclineStatus"); if (el) el.textContent = text; };
  const stop = () => { clearInterval(interval); interval = null; };
  window.Area76Transfer = {
    reset() {
      stop();
      if (popup && !popup.closed && nonce) popup.postMessage({ type: "area76-cancel", nonce }, origin);
      pending = null; nonce = null;
    },
    bind(build) {
      document.getElementById("magiclineBtn").onclick = () => {
        const sections = build();
        if (!pending || JSON.stringify(pending.sections) !== JSON.stringify(sections)) {
          pending = { version: 1, id: random(), date: new Date().toISOString().slice(0, 10), sections };
        }
        stop(); nonce = random();
        // Unique new tab: an old result must not silently switch its draft.
        popup = window.open(origin + "/handoff-start.html", "_blank");
        if (!popup) { status("Bitte erlaube das Öffnen des Übergabefensters und klicke erneut. Es wurde nichts übertragen."); return; }
        status("Die Übergabe ist geöffnet. Falls nötig, dort einmal mit deinem Mitarbeiterzugang anmelden.");
        const until = Date.now() + 10 * 60 * 1000;
        const ping = () => {
          if (!popup || popup.closed || Date.now() > until) { stop(); status("Übergabe geschlossen oder abgelaufen. Du kannst sie erneut öffnen; eine frühere Ablage wird geprüft."); return; }
          popup.postMessage({ type: "area76-ping", nonce }, origin);
        };
        ping(); interval = setInterval(ping, 1000);
      };
    }
  };
  window.addEventListener("message", event => {
    if (event.origin !== origin || event.source !== popup || !pending || event.data?.nonce !== nonce) return;
    if (event.data.type === "area76-ready") {
      // Send to the exact authenticated service window, never to '*'.
      popup.postMessage({ type: "area76-report", nonce, report: pending }, origin);
    } else if (event.data.type === "area76-received") {
      status("Auswertung übernommen. Wähle im Übergabefenster das richtige Mitglied.");
    } else if (event.data.type === "area76-saved") {
      stop(); status("PDF-Ablage in der Magicline-Sandbox bestätigt. Es wurde keine Notiz angelegt.");
    }
  });
  window.addEventListener("pagehide", () => window.Area76Transfer.reset());
})();
