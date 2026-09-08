/* ══════════════════════════════════════════════════════════════
   Birthday Quest — app logic
   You don't need to edit anything in here. All content lives
   in config.js. ♥
   ══════════════════════════════════════════════════════════════ */
(function () {
  const cfg = birthdayConfig;

  const $  = (s, el) => (el || document).querySelector(s);
  const $$ = (s, el) => Array.prototype.slice.call((el || document).querySelectorAll(s));
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const esc = (t) => String(t).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[c]));

  const state = { current: 0, locked: false, wrongIdx: 0 };

  /* ───────────────────────── screen transitions ───────────────────────── */
  function goTo(id) {
    $$(".screen").forEach((s) => s.classList.toggle("active", s.id === id));
    const scr = $("#" + id);
    if (scr) scr.scrollTop = 0;
  }

  /* ───────────────────────── progress hearts ───────────────────────── */
  function progressHearts(done, currentIdx) {
    let h = "";
    for (let i = 0; i < cfg.questions.length; i++) {
      h += `<span class="heart${i < done ? " filled" : ""}${i === currentIdx ? " now" : ""}">&#9825;</span>`;
    }
    return `<div class="hearts" aria-hidden="true">${h}</div>`;
  }

  /* ───────────────────────── question rendering ───────────────────────── */
  function renderQuestion(i) {
    state.current = i;
    state.locked = false;
    const q = cfg.questions[i];
    const el = $("#screen-quiz");

    el.innerHTML = `
      <div class="screen-inner">
        <div class="progress-wrap">
          ${progressHearts(i, i)}
          <span class="progress-num">0${i + 1} / 0${cfg.questions.length}</span>
        </div>
        <p class="eyebrow">${esc(q.title)}</p>
        <h2 class="q-text">${esc(q.question)}</h2>
        <div class="answer-area" id="answer-area"></div>
        <div class="feedback" id="feedback" aria-live="polite"></div>
        <div class="after-correct" id="after-correct"></div>
        <button class="btn-primary hidden" id="btn-next">Next</button>
      </div>`;

    const area = $("#answer-area");

      if (q.type === "photo") {
        buildPhotoArea(q, area);
      } else if (q.type === "text") {
        buildTextArea(q, area);
      } else {
        buildChoiceArea(q, area);
      }

    $("#btn-next").addEventListener("click", () => {
      if (i === cfg.questions.length - 1) startVerification();
      else renderQuestion(i + 1);
    });

    goTo("screen-quiz");
  }

  function buildTextArea(q, area) {
  const wrap = document.createElement("div");
  wrap.className = "text-answer-wrap";

  const input = document.createElement("input");
  input.type = "text";
  input.className = "text-answer-input";
  input.placeholder = q.placeholder || "Type your answer...";
  input.autocomplete = "off";
  input.spellcheck = false;

  const submit = document.createElement("button");
  submit.className = "option text-submit";
  submit.textContent = q.submitLabel || "Submit";

  function normalize(text) {
    return String(text)
      .trim()
      .toLowerCase()
      .replace(/\s+/g, " ");
  }

  function checkAnswer() {
    if (state.locked) return;

    const typed = normalize(input.value);

    const acceptedAnswers = Array.isArray(q.answers)
      ? q.answers.map(normalize)
      : [normalize(q.answer)];

    const correct = acceptedAnswers.includes(typed);

    handleAnswer(q, correct, submit, wrap);

    if (!correct) {
      input.focus();
      input.select();
    }
  }

  submit.addEventListener("click", checkAnswer);

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      checkAnswer();
    }
  });

  wrap.appendChild(input);
  wrap.appendChild(submit);
  area.appendChild(wrap);

  setTimeout(() => input.focus(), 100);
}

  function buildChoiceArea(q, area) {
    const wrap = document.createElement("div");
    const long = q.options.some((o) => String(o).length > 14);
    wrap.className = "options" + (long ? " single" : " grid");
    q.options.forEach((opt, idx) => {
      const b = document.createElement("button");
      b.className = "option";
      b.innerHTML =
        (long ? `<span class="option-letter">${String.fromCharCode(65 + idx)}</span>` : "") +
        `<span>${esc(opt)}</span>`;
      b.addEventListener("click", () => handleAnswer(q, idx === q.correct, b, wrap));
      wrap.appendChild(b);
    });
    area.appendChild(wrap);
  }

  function buildPhotoArea(q, area) {
    const order = q.photos
      .map((p, i) => ({ p, i }))
      .sort(() => Math.random() - 0.5); // shuffle so it's never obvious
    const wrap = document.createElement("div");
    wrap.className = "polaroid-grid";
    order.forEach(({ p, i }) => {
      const card = document.createElement("button");
      card.className = "polaroid";
      card.innerHTML =
        `<span class="tape" aria-hidden="true"></span>` +
        `<img src="${p.src}" alt="a memory">` +
        `<span class="polaroid-note">No. ${i + 1}</span>`;
      card.addEventListener("click", () => handleAnswer(q, i === q.correct, card, wrap));
      wrap.appendChild(card);
    });
    area.appendChild(wrap);
  }

  /* ───────────────────────── answering ───────────────────────── */
  function handleAnswer(q, ok, btn, wrap) {
    if (state.locked) return;

    if (!ok) {
      $$(".option, .polaroid", wrap).forEach((o) => o.classList.remove("wrong"));
      btn.classList.add("wrong");
      wrap.classList.remove("shake");
      void wrap.offsetWidth; // restart the animation
      wrap.classList.add("shake");
      const fb = $("#feedback");
      fb.textContent = q.customWrong || cfg.wrongMessages[state.wrongIdx++ % cfg.wrongMessages.length];
      fb.className = "feedback wrong show";
      return;
    }

    state.locked = true;
    $$(".option, .polaroid", wrap).forEach((o) => o.classList.add("dim"));
    btn.classList.remove("dim");
    btn.classList.add("right");

    const fb = $("#feedback");
    const ac = $("#after-correct");

    (async () => {
      if (q.pause) await sleep(q.pause);
      fb.textContent = q.correctMessage;
      fb.className = "feedback correct show";

      for (const line of q.extraLines || []) {
        await sleep(750);
        addLine(ac, line, "extra-line");
      }
      if (q.caption) {
        await sleep(650);
        addLine(ac, "\u2661  " + q.caption, "photo-caption");
      }
      if (q.stamp) {
        await sleep(500);
        ac.insertAdjacentHTML("beforeend",
          `<div class="stamp" aria-hidden="true">Verified<span>best friend</span></div>`);
      }
      if (q.hearts) heartBurst();
      if (q.progressNote) {
        await sleep(q.stamp ? 1000 : 650);
        addLine(ac, q.progressNote, "progress-note");
      }
      await sleep(550);
      const next = $("#btn-next");
      next.classList.remove("hidden");
      next.classList.add("pop");
    })();
  }

  function addLine(container, text, cls) {
    const p = document.createElement("p");
    p.className = cls;
    p.textContent = text;
    container.appendChild(p);
    requestAnimationFrame(() => p.classList.add("in"));
  }

  /* ───────────────────────── verification sequence ───────────────────────── */
  async function startVerification() {
    goTo("screen-verify");
    const list = $("#verify-list");
    const retrieve = $("#verify-retrieve");
    const digits = $("#verify-digits");
    list.innerHTML = "";
    retrieve.classList.add("hidden");
    retrieve.classList.remove("in");
    digits.innerHTML = "";
    digits.classList.remove("show");

    for (const msg of cfg.verifyMessages) {
      const li = document.createElement("li");
      li.className = "verify-line";
      li.innerHTML =
        `<span class="dots"><span></span><span></span><span></span></span>` +
        `<span class="msg">${esc(msg)}</span>`;
      list.appendChild(li);
      requestAnimationFrame(() => li.classList.add("in"));
      await sleep(950 + Math.random() * 450);
      li.classList.add("done");
      li.querySelector(".dots").outerHTML = `<span class="check">&#10003;</span>`;
    }

    await sleep(450);
    retrieve.classList.remove("hidden");
    requestAnimationFrame(() => retrieve.classList.add("in"));
    await sleep(1100);

    const pin = String(cfg.finalPin);
    digits.innerHTML = pin.split("").map(() => `<div class="digit">?</div>`).join("");
    digits.classList.add("show");
    for (let i = 0; i < pin.length; i++) {
      await sleep(850);
      const d = digits.children[i];
      d.textContent = pin[i];
      d.classList.add("revealed");
    }
    await sleep(1800);
    showFinalScreen();
  }

  /* ───────────────────────── final page ───────────────────────── */
  function showFinalScreen() {
    const fin = $("#screen-final");
    const pinSpaced = String(cfg.finalPin).split("").join(" ");

    fin.innerHTML = `
      <div class="screen-inner center">
        <p class="eyebrow">Congratulation</p>
        <h1 class="pin-title">${esc(cfg.finalTitle)}</h1>
        <div class="big-pin">${esc(pinSpaced)}</div>
        <p class="final-sub">${esc(cfg.finalSub)}</p>
        <div class="gift open" aria-hidden="true">
          <div class="gift-lid"><div class="bow"><span class="loop left"></span><span class="loop right"></span><span class="knot"></span></div></div>
          <div class="gift-body"></div>
        </div>
        <button class="btn-primary" id="btn-opened">${esc(cfg.openedButton)}</button>
      </div>`;

    $("#btn-opened").addEventListener("click", showLastMessage);
    goTo("screen-final");
  }

  function showLastMessage() {
    const fin = $("#screen-final");
    const m = cfg.finalMessages;
    fin.innerHTML = `
      <div class="screen-inner center">
        <h1 class="script-title">${esc(m.title)}</h1>
        <p class="final-line">${esc(m.line)}</p>
        <div class="polaroid empty" aria-hidden="true">
          <span class="tape"></span>
          <div class="empty-frame"><span>You can paste our next polaroid in the blank space in the letter</span></div>
        </div>
        <p class="instax-line">${esc(m.instax)}</p>
        <p class="pending-line">${esc(m.pending)}</p>
      </div>`;
    goTo("screen-final");
    setTimeout(heartBurst, 300);
  }

  /* ───────────────────────── floating hearts / confetti ───────────────────────── */
  let burstRunning = false;
  function heartBurst() {
    const canvas = $("#confetti");
    if (burstRunning) return;
    burstRunning = true;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = innerWidth * dpr;
    canvas.height = innerHeight * dpr;
    ctx.scale(dpr, dpr);
    const W = innerWidth, H = innerHeight;
    const colors = ["#f5c3d2", "#ee9fb9", "#e7b7c9", "#dd8aa5", "#f9d9e3"];
    const parts = [];
    for (let i = 0; i < 34; i++) {
      parts.push({
        x: Math.random() * W,
        y: -30 - Math.random() * H * 0.4,
        s: 5 + Math.random() * 8,
        vy: 0.9 + Math.random() * 1.5,
        vx: (Math.random() - 0.5) * 0.7,
        rot: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 0.07,
        c: colors[(Math.random() * colors.length) | 0],
        a: 0.65 + Math.random() * 0.35,
      });
    }
    function heart(ctx2, s) {
      ctx2.beginPath();
      ctx2.moveTo(0, s * 0.35);
      ctx2.bezierCurveTo(-s, -s * 0.5, -s * 0.4, -s * 1.1, 0, -s * 0.4);
      ctx2.bezierCurveTo(s * 0.4, -s * 1.1, s, -s * 0.5, 0, s * 0.35);
      ctx2.fill();
    }
    (function draw() {
      ctx.clearRect(0, 0, W, H);
      let alive = false;
      for (const p of parts) {
        p.x += p.vx; p.y += p.vy; p.rot += p.vr;
        if (p.y < H + 30) alive = true;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = p.a;
        ctx.fillStyle = p.c;
        heart(ctx, p.s);
        ctx.restore();
      }
      if (alive) requestAnimationFrame(draw);
      else { ctx.clearRect(0, 0, W, H); burstRunning = false; }
    })();
  }

  /* ───────────────────────── music (manual play only) ───────────────────────── */
  function setupMusic() {
  const btn = $("#music-btn");
  const panel = $("#music-panel");
  const m = cfg.music;

  if (!m || !m.enabled || !m.url) {
    if (btn) btn.style.display = "none";
    return;
  }

  let audio = null;

  function getAudio() {
    if (!audio) {
      audio = new Audio(m.url);
      audio.loop = m.loop !== false;
      audio.preload = "auto";
      audio.volume = m.volume ?? 0.4;

      audio.addEventListener("error", () => {
        console.error("AUDIO FILE ERROR:", audio.error);
        console.error("Resolved URL:", audio.src);
      });
    }

    return audio;
  }

  async function playMp3() {
    const player = getAudio();

    try {
      await player.play();

      console.log("MUSIC PLAYING:", player.src);

      if (btn) {
        btn.classList.add("playing");
      }

      return true;
    } catch (err) {
      console.warn("MUSIC PLAYBACK FAILED:", err);
      console.warn("Resolved URL:", player.src);

      return false;
    }
  }

  function pauseMp3() {
    if (!audio) return;

    audio.pause();

    if (btn) {
      btn.classList.remove("playing");
    }
  }

  // Make this available to the Begin button.
  window.startBirthdayMusic = function () {
    if (m.type !== "spotify") {
      playMp3();
    }
  };

  // MP3 play / pause button
  if (m.type !== "spotify") {
    if (btn) {
      btn.addEventListener("click", async (e) => {
        e.stopPropagation();

        if (!audio || audio.paused) {
          await playMp3();
        } else {
          pauseMp3();
        }
      });
    }

    return;
  }

  // Spotify
  if (btn) {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();

      const open = panel.classList.toggle("open");

      if (open && !panel.dataset.loaded) {
        const match = m.url.match(/track[/:]([A-Za-z0-9]+)/);

        if (match) {
          panel.innerHTML = `
            <iframe
              style="border-radius:12px"
              src="https://open.spotify.com/embed/track/${match[1]}?utm_source=generator&theme=0"
              width="260"
              height="80"
              frameborder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy">
            </iframe>
          `;

          panel.dataset.loaded = "1";
        }
      }
    });
  }
}


  /* ───────────────────────── init ───────────────────────── */
  function init() {
    document.title = `${cfg.name}'s Birthday`;

    // landing page texts (kept out of the HTML so it's all editable in config.js)
    $("#landing-title").textContent = `${cfg.name}'s ${cfg.ageLabel} Birthday`;
    $("#landing-locked").textContent = "TOO BAD your present is currently LOCKED.";
    $("#landing-note1").textContent =
      "Unfortunately, I can't just give you the PIN THAT easily.";
    $("#landing-note2").textContent =
      "Complete the verification process to EARN your BIRTHDAY PRESENT.";

    // intro texts
    $("#intro-title").textContent = "Before we begin,";
    $("#intro-para1").textContent =
      `Answer these ${cfg.questions.length} questions to show me you EARN it.`;
    $("#intro-para2").textContent = "Hint: The answer is literally everywhere. Start digging through something❤️";
    $("#intro-para3").textContent = "Don't disappoint me";

    $("#btn-begin").addEventListener("click", () => {
  window.startBirthdayMusic?.();
  goTo("screen-intro");
});
    $("#btn-ready").addEventListener("click", () => renderQuestion(0));

    setupMusic();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
