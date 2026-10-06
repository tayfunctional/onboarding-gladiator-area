/* In-memory, explicit-click handoff. No CORS, credentials, URL payload or Web Storage. */
(() => {
  "use strict";
  const origin = "https://api.gladiator76.de";
  let pending = null, popup = null, interval = null, nonce = null;
  let pendingNotes = [], notesVisible = false, notesRevision = 0;
  const random = () => Array.from(crypto.getRandomValues(new Uint8Array(16)), b => b.toString(16).padStart(2, "0")).join("");
  const status = text => { const el = document.getElementById("magiclineStatus"); if (el) el.textContent = text; };
  const stop = () => { clearInterval(interval); interval = null; };
  const clearNotes = () => {
    notesVisible = false; notesRevision++;
    const panel = document.getElementById("magiclineNotes");
    if (panel) panel.hidden = true;
    const message = document.getElementById("magiclineCopyStatus");
    if (message) message.textContent = "";
    for (let i = 0; i < 2; i++) {
      const field = document.getElementById("magiclineNote" + i);
      if (field) field.value = "";
      const button = document.getElementById("copyMagiclineNote" + i);
      if (button) button.disabled = false;
    }
  };
  const showNotes = () => {
    if (pendingNotes.length !== 2) return;
    const panel = document.getElementById("magiclineNotes");
    if (!panel) return;
    pendingNotes.forEach((text, i) => { document.getElementById("magiclineNote" + i).value = text; });
    notesVisible = true; panel.hidden = false;
  };
  const copyNote = async i => {
    if (!notesVisible || !pendingNotes[i]) return;
    const revision = notesRevision;
    const field = document.getElementById("magiclineNote" + i);
    const button = document.getElementById("copyMagiclineNote" + i);
    const message = document.getElementById("magiclineCopyStatus");
    button.disabled = true;
    try {
      // Only an explicit click copies these drafts. Never send them to an API.
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(pendingNotes[i]);
      if (revision === notesRevision) message.textContent = "Notiz " + (i + 1) + " kopiert. Jetzt in Magicline als Info einfügen und speichern. Kopieren hat dort keine Notiz angelegt.";
    } catch {
      if (revision === notesRevision) {
        field.focus(); field.select(); field.setSelectionRange(0, field.value.length);
        message.textContent = "Automatisches Kopieren ist nicht möglich. Der Text ist markiert: Bitte manuell kopieren und in Magicline als Info einfügen und speichern.";
      }
    } finally { if (revision === notesRevision) button.disabled = false; }
  };
  window.Area76Transfer = {
    reset() {
      stop();
      if (popup && !popup.closed && nonce) popup.postMessage({ type: "area76-cancel", nonce }, origin);
      pending = null; nonce = null; pendingNotes = []; clearNotes();
    },
    bind(build, buildNotes = () => []) {
      // Re-rendering/answer edits must invalidate receipts from the old result.
      window.Area76Transfer.reset();
      for (let i = 0; i < 2; i++) {
        const button = document.getElementById("copyMagiclineNote" + i);
        if (button) button.onclick = () => copyNote(i);
      }
      document.getElementById("magiclineBtn").onclick = () => {
        const sections = build();
        if (!pending || JSON.stringify(pending.sections) !== JSON.stringify(sections)) {
          pending = { version: 1, id: random(), date: new Date().toISOString().slice(0, 10), sections };
        }
        // Separate in-memory snapshot; the existing server/PDF schema is unchanged.
        pendingNotes = buildNotes().slice(); clearNotes();
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
      showNotes();
      if (notesVisible) status("PDF-Ablage in der Magicline-Sandbox bestätigt. Die zwei Info-Notizen unten sind zum Kopieren bereit, aber noch nicht in Magicline gespeichert.");
    }
  });
  window.addEventListener("pagehide", () => window.Area76Transfer.reset());
})();
