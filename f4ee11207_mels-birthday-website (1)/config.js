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
  finalPin: "016",        // ← the 3-digit code she'll use on the real lock


  /* ────────────────────────────────────────────────
     MUSIC (optional — she taps play herself, nothing autoplays)
     • type: "spotify"  → paste a Spotify track link
     • type: "mp3"      → paste a direct .mp3 file URL
     • set enabled to false to hide the music button entirely
     ──────────────────────────────────────────────── */
  music: {
  enabled: true,
  type: "mp3",
  url: "https://archive.org/download/somi-birthday-mp3/SOMI%20%28%E1%84%8C%E1%85%A5%E1%86%AB%E1%84%89%E1%85%A9%E1%84%86%E1%85%B5%29%20-%20BIRTHDAY%20%5BHANROMENG%20Color%20Coded%20Lyrics%5D.mp3",
  autoplay: true,
  loop: true,
  volume: 0.4
},



  /* ────────────────────────────────────────────────
     WRONG-ANSWER MESSAGES
     These rotate one by one each time she gets one wrong.
     (A question can also override this with its own "customWrong".)
     ──────────────────────────────────────────────── */
  wrongMessages: [
    "👎🏻👎🏻👎🏻👎🏻👎🏻",
    "❌❌❌❌",
    "NO.",
    "wtf",
    "cmon mel",
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
      title: "Level: Moderate",
      question: "What do I save your contact name as?",
      options: [
        "mel",            // ← EDIT: put the real answer here (this is the correct one)
        "Mel",
        "Melody",
        "Mel👛",
      ],
      correct: 0,                  // ← 0 = the first option is correct
      correctMessage: "Not bad not bad",
      customWrong: "BOooooo",
      progressNote: "We're just starting",
    },

    /* ── QUESTION 2 — INSIDE JOKE ──────────────────── */
    {
      type: "text",
      title: "Level: Easy",
      question: "What is the name of the movie we recently watch together?",
      placeholder: "type the name of movie",
    submitLabel: "Submit",

    answer: "Colony",
      correctMessage: "this is a giveaway question anyway",
      progressNote: "NEXTTTTT",
    },

    /* ── QUESTION 3 — MEMORY TEST (PHOTOS) ───────────
       Replace each photo's "src" with either:
         • a link to a photo (Google Drive/Imgur/Dropbox direct link, or
           any https://...jpg / .png / .webp URL), or
         • a base64 data URI if you want zero external links.
       Put the OLDEST photo's number in "correct" below.
       They're shown in random order every time, so no cheating. */
      {
    type: "text",
    title: "Level: EXTREMELY HARD",
    question: "Spell out my FULL NAME.",
    placeholder: "type my government name",
    submitLabel: "Submit",

    answer: "Duong Pham Khanh Linh",

    customWrong: "u suck",
    correctMessage: "i know you probably checked your contact for it",

    extraLines: [
      "Moving on.."
    ]
  },
    /* ── QUESTION 4 — BEST FRIEND AUTHENTICATION ───── */
    {
      type: "text",
      title: "Level: SUPPOSEDLY easy",
      question: "What's my postal code",
      placeholder: "######",
      submitLabel: "Submit",

      answer: "537475",        // ← 3 = "100%" (correct answer only)
      correctMessage: "Now you know where to crash",
                  // ← shows the cute VERIFIED seal
      progressNote: "LAST QUESTION",
    },

    /* ── QUESTION 5 — FINAL QUESTION ───────────────── */
    {
      type: "text",
    title: "Level: Hard",
    question: "What is the song that's playing?",
    placeholder: "paste Spotify link here",
    submitLabel: "Submit",

    answer: "https://open.spotify.com/track/5XcM0eD1lsWZibqJ9AUTFq?si=L4-sEzc5SOW9FTX8nNCqSw&utm_source=copy-link",

    customWrong: "DO BETTER",
    correctMessage: "Not bad..",
    stamp: true, 

    extraLines: [
      "CONGRATS"
    ],
      hearts: true,                // ← gentle floating hearts
      progressNote: "You are VERIFIED ✓",
    },
  ],


  /* ────────────────────────────────────────────────
     VERIFICATION SEQUENCE (before the PIN reveal)
     These appear one at a time with cute loading dots.
     ──────────────────────────────────────────────── */
  verifyMessages: [
    "Wait a sec...",
    "Be patience...",
    "Wait la",
    "Not ragebaiting",
    "Ok done ✓",
  ],
  retrieveMessage: "Retrieving your birthday access code...",


  /* ────────────────────────────────────────────────
     FINAL PAGE TEXTS
     ──────────────────────────────────────────────── */
  finalTitle: "Here is your PIN",
  finalSub: "You may now open your present.",
  openedButton: "Click here after you open",
  finalMessages: {
    title: "Happy 22nd birthday, Mel.",                              // ← the very last message
    line: "I hope this captures all the memories you're about to make next.",
    instax: "Now go put that Instax to use.",
    pending: "byeeeee",
  },
};
