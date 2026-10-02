*This is a submission for the [Hacktoberfest Weekend Challenge: Build for a Friend](https://dev.to/challenges/hacktoberfest-weekend-2026-10-01)*

# StudyBuddy — The Intelligent Focus, Flashcard & Quiz Companion

## What I Built

I built **StudyBuddy** for my close friend Alex, who has been preparing for tech certifications and university exams while juggling a busy schedule. Alex constantly faced two major obstacles:
1. **Focus fragmentation & tab overload:** Juggling three separate tools for a Pomodoro timer, Quizlet for flashcards, and random online quiz sites — each loaded with paywalls, ads, and login prompts.
2. **Passive vs. Active Recall:** Alex often fell into the trap of passively reading notes instead of actively testing knowledge with practice questions.

**StudyBuddy** solves this by unifying Alex's entire study loop into a single, cohesive, distraction-free web application:

- ⏱️ **Customizable Pomodoro Clock:** Features an animated circular SVG countdown, quick +/- 1m and 5m adjusters, configurable focus and break durations, and a built-in **Web Audio ambient noise generator** (gentle rain, deep oceanic brown noise, and white noise) running 100% locally in the browser with zero external audio assets.
- 🗂️ **Interactive 3D Flashcards:** Built with spatial 3D CSS perspective flips. Alex can switch between curated decks (Web Development, Biology & Science) or create custom decks with an intuitive card manager. Supports quick keyboard shortcuts (`Space` to flip, `Arrow` keys to navigate, `M` for Mastered, and `R` for Review).
- 📝 **Dual-Engine Quiz Platform:**
  - **Instant Deck-to-Quiz:** Converts any flashcard deck into a dynamic multiple-choice quiz on the fly, smartly generating distractors from other cards in the deck.
  - **Custom Quiz Builder:** Allows Alex to create bespoke exams with custom options, designated correct answers, and instant explanations upon answering.
  - **Post-Quiz Review:** Displays mastery percentage, letter grade badges, question-by-question breakdown of mistakes, and encouragement from the mascot.
- 🤖 **Pixel Buddy Mascot:** An animated, expressive companion widget with blinking eyes, a glowing halo, and mood shifts that cheers Alex on, shares science-backed study tips (the Feynman Technique, Interleaving, Active Recall), and celebrates milestone quiz scores.
- 🔒 **Privacy-First & Zero Friction:** Everything runs client-side with `localStorage` persistence, zero account logins required, and full JSON backup export/import capabilities.

---

## Demo

- **Live Local Demo:** Open [`index.html`](file:///f:/dev/index.html) in any modern browser.
- **Quick Preview & Workflow:**
  1. **Focus:** Start a 25-minute Pomodoro block, toggle ambient rain sounds, and set your target milestone.
  2. **Review:** Flip through high-yield flashcards with 3D animation, marking items as mastered.
  3. **Test:** Click "Quiz This Deck" to immediately test retention under test-like conditions with real-time feedback and explanations.
  4. **Track:** Check daily streak, total focus minutes, and cards mastered in the Stats panel.

*(You can also view a live deployed version hosted on GitHub Pages: `https://innovatorcloudy.github.io/studdybuddy`)*

---

## Code

The complete source code is lightweight, modular, and dependency-free:

- **Repository:** [https://github.com/Innovatorcloudy/studdybuddy](https://github.com/Innovatorcloudy/studdybuddy)

### Architecture Highlights:
- **`index.html`**: Clean semantic HTML5 structure with accessible ARIA tab patterns and accessible modal dialogs.
- **`style.css`**: Modern dark-mode aesthetic inspired by twilight nebulae, featuring glassmorphism (`backdrop-filter: blur`), smooth 3D CSS transforms (`rotateY(180deg)`), and fluid responsive layout grids.
- **`app.js`**: Pure Vanilla ES6+ featuring:
  - Web Audio API synthesizer for harmonic completion chimes and procedural ambient sound buffers.
  - State management engine syncing with `localStorage`.
  - Dynamic distractor generator for automatic quiz creation from flashcard decks.

---

## How I Built It

StudyBuddy was designed and developed through an agentic AI pair-programming workflow:

1. **Iterative Problem Framing:** I collaborated with an AI coding assistant to break Alex's study pain points down into a unified single-page architecture (Timer + Flashcards + Quiz + Mascot).
2. **Zero-Dependency Sound Synthesis:** Rather than bundling heavy MP3 audio files or relying on external CDNs that could fail offline, we used the browser's native **Web Audio API** to procedurally synthesize harmonic bell chimes and continuous Brownian/rain noise filters.
3. **Adaptive Quiz Generation Algorithm:** We engineered an automated quiz constructor that analyzes flashcard decks and dynamically pairs each prompt with randomized distractor answers drawn from the deck, ensuring instant quizzes with zero manual setup.
4. **Accessible Micro-Interactions:** The AI agent assisted in fine-tuning 3D card flips, SVG progress-ring math (`stroke-dashoffset` transitions), keyboard event listeners, and animated mascot state reactions.

---

## Why Does Open Innovation Matter?

Open innovation and open-source tooling fundamentally democratize learning:

1. **Education Without Paywalls:** Essential learning tools shouldn't lock basic features like spaced repetition or custom quizzes behind expensive monthly subscriptions. By building on open web standards, anyone with a browser can study effectively for free.
2. **Data Ownership & Privacy:** Students' study habits, notes, and quiz histories shouldn't be harvested for ads or walled inside proprietary ecosystems. StudyBuddy stores everything locally on the user's device with easy JSON export/import.
3. **Community Extensibility:** Open innovation empowers students and educators to fork the codebase, adapt the mascot, integrate specialized medical or language flashcard decks, and tailor the experience to neurodiverse learning styles without corporate gatekeeping.

---

## My Agent Session

- **Workspace:** `f:\dev`
- **Agent Harness:** Antigravity Agentic Assistant / Gemini 3.8
- **Session Highlights:** Autonomous scaffolding of semantic HTML, responsive CSS design system with 3D flip dynamics, Web Audio API sound generator, interactive custom quiz builder, and live browser validation.

---

## Prize Categories

- **Primary:** Hacktoberfest Weekend Challenge: Build for a Friend
- **Categories:**
  - *Build for a Friend* (Personalized study buddy for Alex)
  - *Open Innovation / Open-Source AI* (Accessible, privacy-first educational tool)
  - *Best Design & User Experience* (Sleek dark mode, 3D card flipping, and animated companion)

---

*Built with ❤️ for Alex and curious minds everywhere!*
