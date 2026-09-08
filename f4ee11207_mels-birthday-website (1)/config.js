/* ══════════════════════════════════════════════════════════════════
   ✿ ✿ ✿  EDIT ME — YOUR BIRTHDAY CONFIGURATION  ✿ ✿ ✿
   ══════════════════════════════════════════════════════════════════

   EVERYTHING you might want to change lives in THIS ONE FILE.
   You never need to touch index.html or app.js.

   Change any of these and the whole website updates automatically:
     • her name, her age, the FINAL PIN
     • every question, its options, and the correct answer
     • the responses after right / wrong answers
     • the photos (question 3)
     • the verification messages + final page texts
     • the music (Spotify link OR an mp3 URL)
   ══════════════════════════════════════════════════════════════════ */

const birthdayConfig = {

  /* ────────────────────────────────────────────────
     THE BASICS
     ──────────────────────────────────────────────── */
  name: "Mel",            // ← her name
  age: 22,                // ← her age
  ageLabel: "22nd",       // ← how the age is written on the card ("22nd", "23rd"...)

  /* ★★★ THE PIN FOR THE PHYSICAL BOX — CHANGE IT HERE ★★★ */
  finalPin: "220",        // ← the 3-digit code she'll use on the real lock


  /* ────────────────────────────────────────────────
     MUSIC (optional — she taps play herself, nothing autoplays)
     • type: "spotify"  → paste a Spotify track link
     • type: "mp3"      → paste a direct .mp3 file URL
     • set enabled to false to hide the music button entirely
     ──────────────────────────────────────────────── */
  music: {
  enabled: true,
  type: "mp3",
  url: "acute-amber-mzxtdwy5.edgeone.dev",
  autoplay: true,
  loop: true,
},



  /* ────────────────────────────────────────────────
     WRONG-ANSWER MESSAGES
     These rotate one by one each time she gets one wrong.
     (A question can also override this with its own "customWrong".)
     ──────────────────────────────────────────────── */
  wrongMessages: [
    "Girl...",
    "Be serious.",
    "After 14 years???",
    "Try that again.",
    "Absolutely not.",
    "This is embarrassing for both of us.",
  ],


  /* ────────────────────────────────────────────────
     THE 5 QUESTIONS
     types:
       • "choice" → normal multiple choice (options + correct index)
       • "photo"  → tap-the-polaroid question (photos + correct index)

     Fields per question:
       title          – the little heading at the top of the screen
       question       – the actual question
       options        – the answers (for "choice")
       correct        – the index of the right answer (0 = first, 1 = second...)
       correctMessage – shown when she gets it right
       customWrong    – (optional) this question's own wrong-answer message
       extraLines     – (optional) extra lines shown after the correct message
       caption        – (photo only) the personal caption under the photos
       stamp          – (optional) true → shows the "VERIFIED" stamp animation
       pause          – (optional) milliseconds of dramatic pause before "correct"
       hearts         – (optional) true → little heart burst animation
       progressNote   – the "Best Friend Verification: XX% complete" line
     ──────────────────────────────────────────────── */
  questions: [

    /* ── QUESTION 1 — WHERE IT STARTED ─────────────── */
    {
      type: "choice",
      title: "Let's start from the beginning.",
      question: "Where did we first become friends?",
      options: [
        "Primary School",            // ← EDIT: put the real answer here (this is the correct one)
        "Tuition",
        "Through mutual friends",
        "Online",
      ],
      correct: 0,                  // ← 0 = the first option is correct
      correctMessage: "Okay good. Memory still functioning ✓",
      customWrong: "Girl... 14 years and this is your answer?",
      progressNote: "Best Friend Verification: 20% complete",
    },

    /* ── QUESTION 2 — INSIDE JOKE ──────────────────── */
    {
      type: "choice",
      title: "You should definitely know this.",
      question: "If I suddenly became rich tomorrow, what is the first irresponsible thing we'd probably do?",
      options: [
        "Save it responsibly",
        "Book a random trip",
        "Clear our entire Taobao/Shopee carts",
        "Buy property",
      ],
      correct: 2,                  // ← 2 = "Clear our entire Taobao/Shopee carts"
      correctMessage: "300+ items are finally coming home.",
      progressNote: "Best Friend Verification: 40% complete",
    },

    /* ── QUESTION 3 — MEMORY TEST (PHOTOS) ───────────
       Replace each photo's "src" with either:
         • a link to a photo (Google Drive/Imgur/Dropbox direct link, or
           any https://...jpg / .png / .webp URL), or
         • a base64 data URI if you want zero external links.
       Put the OLDEST photo's number in "correct" below.
       They're shown in random order every time, so no cheating. */
    {
      type: "photo",
      title: "Memory check.",
      question: "Which one of these happened first?",
      photos: [
        { src: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400'><rect width='400' height='400' fill='rgb(246,214,222)'/><path d='M200 262 C130 215 118 148 156 128 C180 116 196 130 200 142 C204 130 220 116 244 128 C282 148 270 215 200 262 Z' fill='rgb(255,255,255)' opacity='0.85'/><text x='200' y='330' font-family='Georgia,serif' font-size='22' fill='rgb(163,106,127)' text-anchor='middle'>your photo here 1</text></svg>" },
        { src: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400'><rect width='400' height='400' fill='rgb(242,222,232)'/><path d='M200 262 C130 215 118 148 156 128 C180 116 196 130 200 142 C204 130 220 116 244 128 C282 148 270 215 200 262 Z' fill='rgb(255,255,255)' opacity='0.85'/><text x='200' y='330' font-family='Georgia,serif' font-size='22' fill='rgb(163,106,127)' text-anchor='middle'>your photo here 2</text></svg>" },
        { src: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400'><rect width='400' height='400' fill='rgb(236,224,240)'/><path d='M200 262 C130 215 118 148 156 128 C180 116 196 130 200 142 C204 130 220 116 244 128 C282 148 270 215 200 262 Z' fill='rgb(255,255,255)' opacity='0.85'/><text x='200' y='330' font-family='Georgia,serif' font-size='22' fill='rgb(163,106,127)' text-anchor='middle'>your photo here 3</text></svg>" },
        { src: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400'><rect width='400' height='400' fill='rgb(248,232,214)'/><path d='M200 262 C130 215 118 148 156 128 C180 116 196 130 200 142 C204 130 220 116 244 128 C282 148 270 215 200 262 Z' fill='rgb(255,255,255)' opacity='0.85'/><text x='200' y='330' font-family='Georgia,serif' font-size='22' fill='rgb(163,106,127)' text-anchor='middle'>your photo here 4</text></svg>" },
      ],
      correct: 0,                  // ← which photo happened FIRST (0 = the first in the list)
      correctMessage: "Timeline restored ✓",
      caption: "Can't believe we looked like this.",   // ← your personal memory caption
      progressNote: "Best Friend Verification: 60% complete",
    },

    /* ── QUESTION 4 — BEST FRIEND AUTHENTICATION ───── */
    {
      type: "choice",
      title: "Identity verification.",
      question: "How confident are you that I'd choose you too?",
      options: [ "25%", "50%", "75%", "100%" ],
      correct: 3,                  // ← 3 = "100%" (correct answer only)
      correctMessage: "Correct answer only.",
      stamp: true,                 // ← shows the cute VERIFIED seal
      progressNote: "Best Friend Status: VERIFIED ✓",
    },

    /* ── QUESTION 5 — FINAL QUESTION ───────────────── */
    {
      type: "choice",
      title: "One last one.",
      question: "How long do you think you're stuck with me?",
      options: [
        "Until we're 30",
        "Until we're 50",
        "Until one of us gets married",
        "Unfortunately, forever",
      ],
      correct: 3,                  // ← 3 = "Unfortunately, forever"
      correctMessage: "Correct.",
      pause: 900,                  // ← the little dramatic pause before "Correct."
      extraLines: [
        "14–15 years down.",
        "And many more birthdays to go.",
      ],
      hearts: true,                // ← gentle floating hearts
      progressNote: "Best Friend Verification: 100% complete",
    },
  ],


  /* ────────────────────────────────────────────────
     VERIFICATION SEQUENCE (before the PIN reveal)
     These appear one at a time with cute loading dots.
     ──────────────────────────────────────────────── */
  verifyMessages: [
    "Checking answers...",
    "Confirming best friend status...",
    "Searching friendship records...",
    "14+ years found.",
    "Access approved ✓",
  ],
  retrieveMessage: "Retrieving your birthday access code...",


  /* ────────────────────────────────────────────────
     FINAL PAGE TEXTS
     ──────────────────────────────────────────────── */
  finalTitle: "PIN UNLOCKED ♡",
  finalSub: "You may now open your present.",
  openedButton: "I opened it!",
  finalMessages: {
    title: "Happy 22nd birthday, Mel.",                              // ← the very last message
    line: "I hope this captures all the memories we're about to make next.",
    instax: "Now go put that Instax to use.",
    pending: "First photo pending...",
  },
};
