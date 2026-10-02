/**
 * ============================================================================
 * STUDYBUDDY - CORE APPLICATION LOGIC
 * ============================================================================
 */

(function () {
  'use strict';

  // LocalStorage Key
  const STORAGE_KEY = 'study_buddy_v1_data';

  // Default Initial Data
  const DEFAULT_DATA = {
    settings: {
      pomodoroTime: 25,
      shortBreakTime: 5,
      longBreakTime: 15,
      soundEnabled: true,
      autoStartBreaks: false,
      ambientVolume: 40,
    },
    stats: {
      pomodorosCompleted: 0,
      studyMinutes: 0,
      streakDays: 1,
      cardsMastered: 0,
      quizzesCompleted: 0,
      lastActiveDate: new Date().toISOString().slice(0, 10),
    },
    decks: [
      {
        id: 'deck-web-dev',
        name: 'Web Development Basics',
        description: 'Core concepts in modern web architecture, JavaScript, and CSS.',
        cards: [
          {
            id: 'c-1',
            front: 'What is a JavaScript Closure?',
            back: 'A closure is the combination of a function bundled together with references to its lexical environment, allowing it to remember variables from outer scopes even after the outer function has finished executing.',
            mastered: false,
          },
          {
            id: 'c-2',
            front: 'What is the Event Loop in JavaScript?',
            back: 'The mechanism that coordinates the execution of code, collecting and processing events, and executing queued sub-tasks from the Call Stack, Microtask Queue (Promises), and Macrotask Queue (setTimeout).',
            mastered: false,
          },
          {
            id: 'c-3',
            front: 'What is the difference between "==" and "==="?',
            back: '"==" performs type coercion before comparison, whereas "===" strictly checks both value and type without converting types.',
            mastered: false,
          },
          {
            id: 'c-4',
            front: 'What is CSS Flexbox best used for?',
            back: 'One-dimensional layouts (either a single row or a single column) for aligning, distributing space, and ordering items dynamically.',
            mastered: false,
          },
          {
            id: 'c-5',
            front: 'What is the DOM in browser environments?',
            back: 'The Document Object Model (DOM) is an object-oriented tree representation of the HTML document that scripts can query and manipulate.',
            mastered: false,
          },
          {
            id: 'c-6',
            front: 'What is the purpose of HTTP status code 404?',
            back: 'Not Found: The server cannot find the requested resource or endpoint.',
            mastered: false,
          }
        ]
      },
      {
        id: 'deck-science',
        name: 'General Science & Biology',
        description: 'Fundamental principles of biology, chemistry, and physics.',
        cards: [
          {
            id: 'c-10',
            front: 'What is the primary function of the Mitochondria?',
            back: 'The powerhouse of the cell: generates most of the chemical energy needed to power biochemical reactions via cellular respiration (ATP production).',
            mastered: false,
          },
          {
            id: 'c-11',
            front: 'What is Photosynthesis and its chemical formula?',
            back: 'The process plants use to convert light energy into chemical energy: 6CO2 + 6H2O + light -> C6H12O6 + 6O2.',
            mastered: false,
          },
          {
            id: 'c-12',
            front: 'What are the four nucleotide bases in DNA?',
            back: 'Adenine (A), Thymine (T), Cytosine (C), and Guanine (G). A pairs with T, and C pairs with G.',
            mastered: false,
          },
          {
            id: 'c-13',
            front: 'What is Newton’s First Law of Motion?',
            back: 'An object at rest stays at rest, and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an unbalanced external force.',
            mastered: false,
          }
        ]
      }
    ],
    customQuizzes: [
      {
        id: 'quiz-js-essentials',
        title: 'JavaScript Essentials Challenge',
        description: 'Test your understanding of scopes, types, and asynchronous JS.',
        questions: [
          {
            question: 'Which method converts a JSON string into a JavaScript object?',
            options: ['JSON.stringify()', 'JSON.parse()', 'JSON.toObject()', 'JSON.decode()'],
            correctIndex: 1,
            explanation: 'JSON.parse() takes a valid JSON string and transforms it into the corresponding JavaScript value or object.'
          },
          {
            question: 'What is the output of typeof null in JavaScript?',
            options: ['"null"', '"undefined"', '"object"', '"boolean"'],
            correctIndex: 2,
            explanation: 'Due to a historical quirk in JavaScript from its earliest days, typeof null returns "object".'
          },
          {
            question: 'Which keyword creates a block-scoped variable that cannot be reassigned?',
            options: ['var', 'let', 'const', 'static'],
            correctIndex: 2,
            explanation: 'const creates a block-scoped variable whose identifier cannot be reassigned.'
          },
          {
            question: 'What will Promise.all() do if one of the promises rejects?',
            options: [
              'It waits for all others to finish',
              'It rejects immediately with that error',
              'It returns undefined for failed promises',
              'It retries the rejected promise'
            ],
            correctIndex: 1,
            explanation: 'Promise.all() exhibits "fail-fast" behavior; as soon as any input promise rejects, the entire returned promise rejects.'
          }
        ]
      },
      {
        id: 'quiz-speed-science',
        title: 'Science & Cosmos Trivia',
        description: 'A quick 4-question sprint through physics, astronomy, and nature.',
        questions: [
          {
            question: 'What is the speed of light in a vacuum approximately?',
            options: ['30,000 km/s', '300,000 km/s', '3,000,000 km/s', '3,000 km/s'],
            correctIndex: 1,
            explanation: 'Light travels at approximately 299,792 kilometers per second (about 300,000 km/s) in a vacuum.'
          },
          {
            question: 'Which planet has the strongest magnetic field in our solar system?',
            options: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
            correctIndex: 2,
            explanation: 'Jupiter possesses the most powerful magnetic field of any planet, roughly 20,000 times stronger than Earth’s.'
          },
          {
            question: 'What gas makes up the largest percentage of Earth’s atmosphere?',
            options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Argon'],
            correctIndex: 2,
            explanation: 'Nitrogen makes up roughly 78% of Earth’s atmosphere, while Oxygen is around 21%.'
          }
        ]
      }
    ]
  };

  // Buddy Quotes & Tips Repository
  const BUDDY_QUOTES = [
    "Small steps every single day add up to massive achievements!",
    "Your brain is like a muscle: the more you challenge it, the stronger it grows.",
    "Don't worry about being perfect. Focus on being 1% better than yesterday.",
    "Consistency beats intensity. Keep this momentum rolling!",
    "Deep focus is a superpower in the modern world. You're doing it right now!",
    "Mistakes are just data points on the road to mastery. Keep exploring!",
    "You are capable of absorbing and understanding far more than you realize."
  ];

  const STUDY_TIPS = [
    "Active Recall: Test yourself without looking at the answer before flipping the card!",
    "Spaced Repetition: Review tough flashcards tomorrow, then in 3 days, then next week.",
    "Feynman Technique: Try explaining the concept out loud in plain words as if to a 10-year-old.",
    "Interleaving: Alternate between two different subjects to sharpen problem-solving agility.",
    "During short breaks, stand up, stretch, and look at something 20 feet away to rest your eyes."
  ];

  // Application State
  let appState = loadState();

  /**
   * ============================================================================
   * PERSISTENCE & STORAGE HELPERS
   * ============================================================================
   */
  function loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Merge with defaults to ensure missing keys are filled
        return {
          settings: { ...DEFAULT_DATA.settings, ...(parsed.settings || {}) },
          stats: { ...DEFAULT_DATA.stats, ...(parsed.stats || {}) },
          decks: parsed.decks && parsed.decks.length ? parsed.decks : DEFAULT_DATA.decks,
          customQuizzes: parsed.customQuizzes && parsed.customQuizzes.length ? parsed.customQuizzes : DEFAULT_DATA.customQuizzes,
        };
      }
    } catch (e) {
      console.warn('Error reading from localStorage, using default data:', e);
    }
    return JSON.parse(JSON.stringify(DEFAULT_DATA));
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
    } catch (e) {
      console.error('Error saving state to localStorage:', e);
      showToast('Storage quota reached or error saving data', 'warning');
    }
  }

  /**
   * ============================================================================
   * SYNTHESIZED WEB AUDIO (SOUND EFFECTS & AMBIENT GENERATOR)
   * ============================================================================
   */
  let audioCtx = null;
  let ambientNoiseNode = null;
  let ambientGainNode = null;
  let activeAmbientType = 'none';

  function initAudioContext() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  // Play pleasant chime on Pomodoro completion
  function playCompletionChime() {
    if (!appState.settings.soundEnabled) return;
    initAudioContext();
    if (!audioCtx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime + idx * 0.12);

      gain.gain.setValueAtTime(0, audioCtx.currentTime + idx * 0.12);
      gain.gain.linearRampToValueAtTime(0.2, audioCtx.currentTime + idx * 0.12 + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + idx * 0.12 + 0.9);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(audioCtx.currentTime + idx * 0.12);
      osc.stop(audioCtx.currentTime + idx * 0.12 + 1.0);
    });
  }

  // Play quick subtle click / whoosh for card flips & navigation
  function playCardFlipSound() {
    if (!appState.settings.soundEnabled) return;
    initAudioContext();
    if (!audioCtx) return;

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(350, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(700, audioCtx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.09);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.1);
  }

  // Play quiz correct sound (uplifting ding)
  function playQuizCorrectSound() {
    if (!appState.settings.soundEnabled) return;
    initAudioContext();
    if (!audioCtx) return;

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
    osc.frequency.setValueAtTime(880.00, audioCtx.currentTime + 0.1); // A5

    gain.gain.setValueAtTime(0.18, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.45);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.45);
  }

  // Play quiz incorrect sound (soft low buzz)
  function playQuizIncorrectSound() {
    if (!appState.settings.soundEnabled) return;
    initAudioContext();
    if (!audioCtx) return;

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(180, audioCtx.currentTime);
    osc.frequency.linearRampToValueAtTime(120, audioCtx.currentTime + 0.25);

    gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.26);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.27);
  }

  // Ambient Noise Generator (Rain, Brown, White)
  function setAmbientSound(type) {
    initAudioContext();
    if (!audioCtx) return;

    if (ambientNoiseNode) {
      try {
        ambientNoiseNode.stop();
        ambientNoiseNode.disconnect();
      } catch (e) {}
      ambientNoiseNode = null;
    }

    activeAmbientType = type;
    if (type === 'none') return;

    const bufferSize = audioCtx.sampleRate * 2;
    const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      if (type === 'white') {
        output[i] = white * 0.15;
      } else if (type === 'brown') {
        // Brownian noise (integrated white noise)
        lastOut = (lastOut + 0.02 * white) / 1.02;
        output[i] = lastOut * 1.5;
      } else if (type === 'rain') {
        // Filtered soft rain texture
        lastOut = (lastOut + 0.08 * white) / 1.08;
        output[i] = lastOut * 0.7;
      }
    }

    const whiteNoise = audioCtx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Filter node for smoothing sound
    const filter = audioCtx.createBiquadFilter();
    if (type === 'rain') {
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1200, audioCtx.currentTime);
    } else if (type === 'brown') {
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(400, audioCtx.currentTime);
    } else {
      filter.type = 'allpass';
    }

    if (!ambientGainNode) {
      ambientGainNode = audioCtx.createGain();
      ambientGainNode.connect(audioCtx.destination);
    }

    const vol = (appState.settings.ambientVolume || 40) / 100 * 0.3;
    ambientGainNode.gain.setValueAtTime(vol, audioCtx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(ambientGainNode);
    whiteNoise.start();
    ambientNoiseNode = whiteNoise;
  }

  function updateAmbientVolume(val) {
    appState.settings.ambientVolume = val;
    saveState();
    if (ambientGainNode && audioCtx) {
      const vol = (val / 100) * 0.3;
      ambientGainNode.gain.setValueAtTime(vol, audioCtx.currentTime);
    }
  }

  /**
   * ============================================================================
   * TOAST NOTIFICATIONS & MASCOT COMPANION
   * ============================================================================
   */
  function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span>${message}</span>`;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 320);
    }, 3200);
  }

  function setBuddySpeech(text) {
    const bubble = document.getElementById('buddySpeechBubble');
    const pillText = document.getElementById('companionPillText');
    if (bubble) {
      bubble.style.opacity = '0';
      setTimeout(() => {
        bubble.textContent = `"${text}"`;
        bubble.style.opacity = '1';
      }, 150);
    }
    if (pillText) {
      pillText.textContent = text;
    }
  }

  function triggerBuddyExcitement() {
    const face = document.getElementById('buddyFace');
    const mouth = document.getElementById('buddyMouth');
    if (face) {
      face.style.transform = 'scale(1.15) rotate(5deg)';
      setTimeout(() => {
        face.style.transform = 'scale(1) rotate(0deg)';
      }, 400);
    }
    if (mouth) {
      mouth.style.height = '10px';
      mouth.style.borderRadius = '0 0 14px 14px';
      setTimeout(() => {
        mouth.style.height = '6px';
        mouth.style.borderRadius = '0 0 10px 10px';
      }, 1500);
    }
  }

  /**
   * ============================================================================
   * TAB NAVIGATION SYSTEM
   * ============================================================================
   */
  function initNavigation() {
    const tabs = document.querySelectorAll('.nav-tab');
    const views = document.querySelectorAll('.tab-view');

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const targetTab = tab.getAttribute('data-tab');

        tabs.forEach((t) => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        views.forEach((v) => v.classList.remove('active'));

        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');

        const activeView = document.getElementById(`view-${targetTab}`);
        if (activeView) {
          activeView.classList.add('active');
        }

        // Trigger view-specific refreshes
        if (targetTab === 'flashcards') {
          renderFlashcardDeckSelect();
          updateFlashcardView();
        } else if (targetTab === 'quiz') {
          renderQuizList();
        } else if (targetTab === 'settings') {
          updateStatsAndSettingsView();
        }
      });
    });
  }

  /**
   * ============================================================================
   * 1. POMODORO TIMER ENGINE
   * ============================================================================
   */
  const pomodoroState = {
    mode: 'pomodoro', // 'pomodoro' | 'shortBreak' | 'longBreak'
    isRunning: false,
    timerInterval: null,
    totalSeconds: 25 * 60,
    remainingSeconds: 25 * 60,
  };

  const timerDisplay = document.getElementById('timerDisplay');
  const timerStatusLabel = document.getElementById('timerStatusLabel');
  const timerProgressRing = document.getElementById('timerProgressRing');
  const btnTimerToggle = document.getElementById('btnTimerToggle');
  const btnTimerToggleText = document.getElementById('btnTimerToggleText');
  const playIcon = document.getElementById('playIcon');
  const pauseIcon = document.getElementById('pauseIcon');
  const btnTimerReset = document.getElementById('btnTimerReset');
  const btnTimerSkip = document.getElementById('btnTimerSkip');
  const btnMinusMinute = document.getElementById('btnMinusMinute');
  const btnAddMinute = document.getElementById('btnAddMinute');
  const btnAddFive = document.getElementById('btnAddFive');

  // Ring Circumference = 2 * PI * r = 2 * Math.PI * 136 = ~854.51
  const RING_CIRCUMFERENCE = 2 * Math.PI * 136;

  function initPomodoro() {
    setTimerMode('pomodoro', false);

    // Mode Buttons
    const modeButtons = document.querySelectorAll('.mode-btn');
    modeButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const mode = btn.getAttribute('data-mode');
        setTimerMode(mode, false);
      });
    });

    // Control Buttons
    btnTimerToggle.addEventListener('click', toggleTimer);
    btnTimerReset.addEventListener('click', resetTimer);
    btnTimerSkip.addEventListener('click', skipSession);

    // Quick minute adjusters
    btnMinusMinute.addEventListener('click', () => adjustRemainingTime(-60));
    btnAddMinute.addEventListener('click', () => adjustRemainingTime(60));
    btnAddFive.addEventListener('click', () => adjustRemainingTime(300));

    // Ambient sound chips
    const soundChips = document.querySelectorAll('.sound-chip');
    soundChips.forEach((chip) => {
      chip.addEventListener('click', () => {
        soundChips.forEach((c) => c.classList.remove('active'));
        chip.classList.add('active');
        const soundType = chip.getAttribute('data-sound');
        setAmbientSound(soundType);
      });
    });

    const ambientVolume = document.getElementById('ambientVolume');
    if (ambientVolume) {
      ambientVolume.value = appState.settings.ambientVolume || 40;
      ambientVolume.addEventListener('input', (e) => {
        updateAmbientVolume(parseInt(e.target.value, 10));
      });
    }

    // Goal input save
    const btnSaveTask = document.getElementById('btnSaveTask');
    const currentFocusTask = document.getElementById('currentFocusTask');
    if (btnSaveTask && currentFocusTask) {
      btnSaveTask.addEventListener('click', () => {
        const taskVal = currentFocusTask.value.trim();
        if (taskVal) {
          showToast(`Target set: "${taskVal}"! Let's lock in.`, 'success');
          setBuddySpeech(`Locked in on: "${taskVal}". You've got this!`);
        }
      });
    }

    renderStatsPills();
  }

  function setTimerMode(mode, autoStart = false) {
    if (pomodoroState.isRunning) {
      pauseTimer();
    }

    pomodoroState.mode = mode;

    let minutes = 25;
    if (mode === 'pomodoro') {
      minutes = appState.settings.pomodoroTime || 25;
      timerStatusLabel.textContent = 'Time to focus!';
    } else if (mode === 'shortBreak') {
      minutes = appState.settings.shortBreakTime || 5;
      timerStatusLabel.textContent = 'Short Break - Recharge!';
    } else if (mode === 'longBreak') {
      minutes = appState.settings.longBreakTime || 15;
      timerStatusLabel.textContent = 'Long Break - Unwind!';
    }

    pomodoroState.totalSeconds = minutes * 60;
    pomodoroState.remainingSeconds = minutes * 60;

    // Update Mode Buttons UI
    document.querySelectorAll('.mode-btn').forEach((btn) => {
      btn.classList.toggle('active', btn.getAttribute('data-mode') === mode);
    });

    updateTimerDisplay();

    if (autoStart) {
      startTimer();
    }
  }

  function adjustRemainingTime(seconds) {
    pomodoroState.remainingSeconds = Math.max(10, pomodoroState.remainingSeconds + seconds);
    if (pomodoroState.remainingSeconds > pomodoroState.totalSeconds) {
      pomodoroState.totalSeconds = pomodoroState.remainingSeconds;
    }
    updateTimerDisplay();
  }

  function updateTimerDisplay() {
    const mins = Math.floor(pomodoroState.remainingSeconds / 60);
    const secs = pomodoroState.remainingSeconds % 60;
    const formatted = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

    timerDisplay.textContent = formatted;

    // Update document title for background tracking
    const modeName = pomodoroState.mode === 'pomodoro' ? 'Focus' : 'Break';
    document.title = `(${formatted}) ${modeName} • StudyBuddy`;

    // Circular progress
    const progressFraction = (pomodoroState.totalSeconds - pomodoroState.remainingSeconds) / pomodoroState.totalSeconds;
    const offset = RING_CIRCUMFERENCE - progressFraction * RING_CIRCUMFERENCE;
    timerProgressRing.style.strokeDasharray = `${RING_CIRCUMFERENCE}`;
    timerProgressRing.style.strokeDashoffset = `${offset}`;
  }

  function toggleTimer() {
    initAudioContext();
    if (pomodoroState.isRunning) {
      pauseTimer();
    } else {
      startTimer();
    }
  }

  function startTimer() {
    pomodoroState.isRunning = true;
    playIcon.classList.add('hidden');
    pauseIcon.classList.remove('hidden');
    btnTimerToggleText.textContent = 'Pause';
    btnTimerToggle.style.background = 'linear-gradient(135deg, #f59e0b, #ef4444)';

    if (pomodoroState.mode === 'pomodoro') {
      setBuddySpeech("Timer started! Put your phone away and enter the flow zone.");
    } else {
      setBuddySpeech("Enjoy your break! Hydrate, look away from screens, or take a quick stretch.");
    }

    clearInterval(pomodoroState.timerInterval);
    pomodoroState.timerInterval = setInterval(() => {
      pomodoroState.remainingSeconds--;

      if (pomodoroState.remainingSeconds <= 0) {
        onTimerComplete();
      } else {
        updateTimerDisplay();
      }
    }, 1000);
  }

  function pauseTimer() {
    pomodoroState.isRunning = false;
    clearInterval(pomodoroState.timerInterval);
    playIcon.classList.remove('hidden');
    pauseIcon.classList.add('hidden');
    btnTimerToggleText.textContent = 'Resume';
    btnTimerToggle.style.background = 'linear-gradient(135deg, #8b5cf6, #3b82f6)';
  }

  function resetTimer() {
    pauseTimer();
    pomodoroState.remainingSeconds = pomodoroState.totalSeconds;
    btnTimerToggleText.textContent = 'Start Session';
    updateTimerDisplay();
  }

  function skipSession() {
    pauseTimer();
    if (pomodoroState.mode === 'pomodoro') {
      setTimerMode('shortBreak', false);
    } else {
      setTimerMode('pomodoro', false);
    }
    showToast('Skipped to next session', 'info');
  }

  function onTimerComplete() {
    clearInterval(pomodoroState.timerInterval);
    pomodoroState.isRunning = false;
    playCompletionChime();
    triggerBuddyExcitement();

    if (pomodoroState.mode === 'pomodoro') {
      const minutesSpent = Math.round(pomodoroState.totalSeconds / 60);
      appState.stats.pomodorosCompleted++;
      appState.stats.studyMinutes += minutesSpent;
      saveState();
      renderStatsPills();

      showToast('🎉 Focus block completed! Awesome discipline.', 'success');
      setBuddySpeech("Session complete! You crushed that study block. Time to rest!");

      // Transition to break
      const nextBreak = appState.stats.pomodorosCompleted % 4 === 0 ? 'longBreak' : 'shortBreak';
      setTimerMode(nextBreak, appState.settings.autoStartBreaks);
    } else {
      showToast('⚡ Break is over! Ready to focus again?', 'info');
      setBuddySpeech("Break over! Let's get right back to learning.");
      setTimerMode('pomodoro', false);
    }
  }

  function renderStatsPills() {
    const statPomoCount = document.getElementById('statPomoCount');
    const statStudyMinutes = document.getElementById('statStudyMinutes');
    const statStreakDays = document.getElementById('statStreakDays');

    if (statPomoCount) statPomoCount.textContent = appState.stats.pomodorosCompleted;
    if (statStudyMinutes) statStudyMinutes.textContent = `${appState.stats.studyMinutes}m`;
    if (statStreakDays) statStreakDays.textContent = `${appState.stats.streakDays} 🔥`;
  }

  /**
   * ============================================================================
   * 2. FLASHCARDS ENGINE (3D FLIP, DECKS, ASSESSMENTS)
   * ============================================================================
   */
  const flashcardState = {
    activeDeckId: '',
    cardIndex: 0,
    isFlipped: false,
  };

  const deckSelect = document.getElementById('deckSelect');
  const deckCardCount = document.getElementById('deckCardCount');
  const flashcardScene = document.getElementById('flashcardScene');
  const activeFlashcard = document.getElementById('activeFlashcard');
  const cardFrontText = document.getElementById('cardFrontText');
  const cardBackText = document.getElementById('cardBackText');
  const cardIndexLabel = document.getElementById('cardIndexLabel');
  const cardMasteryRate = document.getElementById('cardMasteryRate');
  const flashcardProgressBar = document.getElementById('flashcardProgressBar');
  const cardStatusBadge = document.getElementById('cardStatusBadge');

  const btnPrevCard = document.getElementById('btnPrevCard');
  const btnNextCard = document.getElementById('btnNextCard');
  const btnFlipCard = document.getElementById('btnFlipCard');
  const btnMarkNeedsReview = document.getElementById('btnMarkNeedsReview');
  const btnMarkMastered = document.getElementById('btnMarkMastered');
  const btnShuffleDeck = document.getElementById('btnShuffleDeck');
  const btnResetMastery = document.getElementById('btnResetMastery');
  const btnQuizFromDeck = document.getElementById('btnQuizFromDeck');

  function initFlashcards() {
    if (!appState.decks.length) {
      appState.decks = JSON.parse(JSON.stringify(DEFAULT_DATA.decks));
      saveState();
    }

    flashcardState.activeDeckId = appState.decks[0].id;
    renderFlashcardDeckSelect();
    updateFlashcardView();

    // Event listeners
    deckSelect.addEventListener('change', (e) => {
      flashcardState.activeDeckId = e.target.value;
      flashcardState.cardIndex = 0;
      flashcardState.isFlipped = false;
      updateFlashcardView();
    });

    // Flip card interactions (scene click or spacebar)
    flashcardScene.addEventListener('click', flipActiveCard);
    btnFlipCard.addEventListener('click', flipActiveCard);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      const flashcardsTabActive = document.getElementById('view-flashcards').classList.contains('active');
      const noModalsOpen = document.querySelectorAll('.modal-backdrop:not(.hidden)').length === 0;

      if (!flashcardsTabActive || !noModalsOpen) return;

      if (e.code === 'Space') {
        e.preventDefault();
        flipActiveCard();
      } else if (e.code === 'ArrowRight') {
        goToNextCard();
      } else if (e.code === 'ArrowLeft') {
        goToPrevCard();
      } else if (e.key === 'm' || e.key === 'M') {
        markCardAssessment(true);
      } else if (e.key === 'r' || e.key === 'R') {
        markCardAssessment(false);
      }
    });

    btnNextCard.addEventListener('click', goToNextCard);
    btnPrevCard.addEventListener('click', goToPrevCard);

    btnMarkMastered.addEventListener('click', () => markCardAssessment(true));
    btnMarkNeedsReview.addEventListener('click', () => markCardAssessment(false));

    btnShuffleDeck.addEventListener('click', shuffleCurrentDeck);
    btnResetMastery.addEventListener('click', resetDeckMastery);

    btnQuizFromDeck.addEventListener('click', startQuizFromCurrentDeck);

    // Modals
    initFlashcardModals();
  }

  function getActiveDeck() {
    return appState.decks.find((d) => d.id === flashcardState.activeDeckId) || appState.decks[0];
  }

  function renderFlashcardDeckSelect() {
    deckSelect.innerHTML = '';
    const cardDeckAssign = document.getElementById('cardDeckAssign');
    if (cardDeckAssign) cardDeckAssign.innerHTML = '';

    appState.decks.forEach((deck) => {
      const opt = document.createElement('option');
      opt.value = deck.id;
      opt.textContent = deck.name;
      if (deck.id === flashcardState.activeDeckId) {
        opt.selected = true;
      }
      deckSelect.appendChild(opt);

      if (cardDeckAssign) {
        const assignOpt = document.createElement('option');
        assignOpt.value = deck.id;
        assignOpt.textContent = deck.name;
        if (deck.id === flashcardState.activeDeckId) {
          assignOpt.selected = true;
        }
        cardDeckAssign.appendChild(assignOpt);
      }
    });
  }

  function updateFlashcardView() {
    const deck = getActiveDeck();
    if (!deck || !deck.cards.length) {
      cardFrontText.textContent = 'This deck is currently empty. Click "+ Add Card" above to get started!';
      cardBackText.textContent = 'Add cards with key terms, formulas, or concepts!';
      deckCardCount.textContent = '0 cards';
      cardIndexLabel.textContent = 'Card 0 of 0';
      cardMasteryRate.textContent = 'Mastered: 0%';
      flashcardProgressBar.style.width = '0%';
      activeFlashcard.classList.remove('flipped');
      flashcardState.isFlipped = false;
      return;
    }

    if (flashcardState.cardIndex >= deck.cards.length) {
      flashcardState.cardIndex = 0;
    }

    const card = deck.cards[flashcardState.cardIndex];
    deckCardCount.textContent = `${deck.cards.length} cards`;
    cardIndexLabel.textContent = `Card ${flashcardState.cardIndex + 1} of ${deck.cards.length}`;

    // Calculate mastery %
    const masteredCount = deck.cards.filter((c) => c.mastered).length;
    const masteryPercent = Math.round((masteredCount / deck.cards.length) * 100);
    cardMasteryRate.textContent = `Mastered: ${masteryPercent}% (${masteredCount}/${deck.cards.length})`;
    flashcardProgressBar.style.width = `${((flashcardState.cardIndex + 1) / deck.cards.length) * 100}%`;

    // Populate card faces
    cardFrontText.textContent = card.front;
    cardBackText.textContent = card.back;

    if (card.mastered) {
      cardStatusBadge.textContent = '✓ Mastered';
      cardStatusBadge.style.color = 'var(--success)';
    } else {
      cardStatusBadge.textContent = 'Needs Practice';
      cardStatusBadge.style.color = 'var(--cyan)';
    }

    // Reset flip orientation
    activeFlashcard.classList.remove('flipped');
    flashcardState.isFlipped = false;
  }

  function flipActiveCard() {
    flashcardState.isFlipped = !flashcardState.isFlipped;
    activeFlashcard.classList.toggle('flipped', flashcardState.isFlipped);
    playCardFlipSound();
  }

  function goToNextCard() {
    const deck = getActiveDeck();
    if (!deck || !deck.cards.length) return;

    flashcardState.cardIndex = (flashcardState.cardIndex + 1) % deck.cards.length;
    updateFlashcardView();
    playCardFlipSound();
  }

  function goToPrevCard() {
    const deck = getActiveDeck();
    if (!deck || !deck.cards.length) return;

    flashcardState.cardIndex = (flashcardState.cardIndex - 1 + deck.cards.length) % deck.cards.length;
    updateFlashcardView();
    playCardFlipSound();
  }

  function markCardAssessment(isMastered) {
    const deck = getActiveDeck();
    if (!deck || !deck.cards.length) return;

    const card = deck.cards[flashcardState.cardIndex];
    const previousMastery = card.mastered;
    card.mastered = isMastered;

    if (isMastered && !previousMastery) {
      appState.stats.cardsMastered++;
      showToast('Card mastered! Great memory retention.', 'success');
      playQuizCorrectSound();
      triggerBuddyExcitement();
    } else if (!isMastered && previousMastery) {
      appState.stats.cardsMastered = Math.max(0, appState.stats.cardsMastered - 1);
      showToast('Marked for review.', 'info');
    }

    saveState();
    updateFlashcardView();

    // Auto advance to next card after a brief moment
    setTimeout(() => {
      goToNextCard();
    }, 350);
  }

  function shuffleCurrentDeck() {
    const deck = getActiveDeck();
    if (!deck || deck.cards.length <= 1) return;

    for (let i = deck.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck.cards[i], deck.cards[j]] = [deck.cards[j], deck.cards[i]];
    }

    flashcardState.cardIndex = 0;
    saveState();
    updateFlashcardView();
    showToast('Deck shuffled!', 'info');
  }

  function resetDeckMastery() {
    const deck = getActiveDeck();
    if (!deck || !deck.cards.length) return;

    if (confirm(`Reset mastery progress for all cards in "${deck.name}"?`)) {
      deck.cards.forEach((c) => (c.mastered = false));
      saveState();
      updateFlashcardView();
      showToast('Deck mastery reset.', 'info');
    }
  }

  function initFlashcardModals() {
    // Add Card Modal
    const btnAddCardModal = document.getElementById('btnAddCardModal');
    const modalAddCard = document.getElementById('modalAddCard');
    const formAddCard = document.getElementById('formAddCard');

    btnAddCardModal.addEventListener('click', () => {
      renderFlashcardDeckSelect();
      modalAddCard.classList.remove('hidden');
      document.getElementById('cardFrontInput').focus();
    });

    formAddCard.addEventListener('submit', (e) => {
      e.preventDefault();
      const targetDeckId = document.getElementById('cardDeckAssign').value;
      const front = document.getElementById('cardFrontInput').value.trim();
      const back = document.getElementById('cardBackInput').value.trim();

      if (!front || !back) return;

      const deck = appState.decks.find((d) => d.id === targetDeckId);
      if (deck) {
        deck.cards.push({
          id: 'card-' + Date.now(),
          front,
          back,
          mastered: false,
        });
        saveState();
        modalAddCard.classList.add('hidden');
        formAddCard.reset();

        flashcardState.activeDeckId = targetDeckId;
        flashcardState.cardIndex = deck.cards.length - 1;
        renderFlashcardDeckSelect();
        updateFlashcardView();
        showToast('New flashcard created successfully!', 'success');
      }
    });

    // Create Deck Modal
    const btnNewDeck = document.getElementById('btnNewDeck');
    const modalNewDeck = document.getElementById('modalNewDeck');
    const formNewDeck = document.getElementById('formNewDeck');

    btnNewDeck.addEventListener('click', () => {
      modalNewDeck.classList.remove('hidden');
      document.getElementById('newDeckTitle').focus();
    });

    formNewDeck.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('newDeckTitle').value.trim();
      const desc = document.getElementById('newDeckDescription').value.trim();

      if (!title) return;

      const newDeckObj = {
        id: 'deck-' + Date.now(),
        name: title,
        description: desc || 'Custom study deck',
        cards: [],
      };

      appState.decks.push(newDeckObj);
      saveState();

      modalNewDeck.classList.add('hidden');
      formNewDeck.reset();

      flashcardState.activeDeckId = newDeckObj.id;
      flashcardState.cardIndex = 0;
      renderFlashcardDeckSelect();
      updateFlashcardView();
      showToast(`Created new deck: "${title}"`, 'success');
    });

    // Manage Deck Modal
    const btnManageDeck = document.getElementById('btnManageDeck');
    const modalManageDeck = document.getElementById('modalManageDeck');
    const btnDeleteCurrentDeck = document.getElementById('btnDeleteCurrentDeck');

    btnManageDeck.addEventListener('click', () => {
      renderManageDeckContent();
      modalManageDeck.classList.remove('hidden');
    });

    btnDeleteCurrentDeck.addEventListener('click', () => {
      const deck = getActiveDeck();
      if (!deck) return;

      if (appState.decks.length <= 1) {
        alert('You must keep at least one deck in your collection.');
        return;
      }

      if (confirm(`Are you sure you want to permanently delete "${deck.name}" and all its cards?`)) {
        appState.decks = appState.decks.filter((d) => d.id !== deck.id);
        flashcardState.activeDeckId = appState.decks[0].id;
        flashcardState.cardIndex = 0;
        saveState();

        modalManageDeck.classList.add('hidden');
        renderFlashcardDeckSelect();
        updateFlashcardView();
        showToast(`Deck deleted`, 'info');
      }
    });

    // Close buttons on all modals
    document.querySelectorAll('[data-close-modal]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const modalId = btn.getAttribute('data-close-modal');
        const modal = document.getElementById(modalId);
        if (modal) modal.classList.add('hidden');
      });
    });

    // Click outside modal card to close
    document.querySelectorAll('.modal-backdrop').forEach((backdrop) => {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) {
          backdrop.classList.add('hidden');
        }
      });
    });
  }

  function renderManageDeckContent() {
    const deck = getActiveDeck();
    const titleEl = document.getElementById('manageDeckTitle');
    const listEl = document.getElementById('manageCardsList');
    if (!deck || !listEl) return;

    titleEl.textContent = `Manage: ${deck.name} (${deck.cards.length} cards)`;
    listEl.innerHTML = '';

    if (!deck.cards.length) {
      listEl.innerHTML = '<div style="color: var(--text-muted); padding: 1.5rem; text-align: center;">No cards yet in this deck. Add some to get started!</div>';
      return;
    }

    deck.cards.forEach((card, idx) => {
      const row = document.createElement('div');
      row.className = 'card-item-row';
      row.innerHTML = `
        <div class="card-row-info">
          <div class="card-row-front">${idx + 1}. ${escapeHTML(card.front)}</div>
          <div class="card-row-back">${escapeHTML(card.back)}</div>
        </div>
        <button class="btn btn-danger-outline btn-sm btn-delete-single-card" data-card-id="${card.id}">Delete</button>
      `;
      listEl.appendChild(row);
    });

    listEl.querySelectorAll('.btn-delete-single-card').forEach((delBtn) => {
      delBtn.addEventListener('click', () => {
        const cardId = delBtn.getAttribute('data-card-id');
        deck.cards = deck.cards.filter((c) => c.id !== cardId);
        saveState();
        renderManageDeckContent();
        updateFlashcardView();
        showToast('Card deleted', 'info');
      });
    });
  }

  /**
   * ============================================================================
   * 3. QUIZ ENGINE (AUTO-GENERATED & CUSTOM QUIZZES)
   * ============================================================================
   */
  const quizState = {
    activeQuiz: null,
    currentQuestionIndex: 0,
    score: 0,
    streak: 0,
    userAnswers: [], // { question, selected, correct, isCorrect, explanation }
    answeredCurrent: false,
  };

  const quizSelectPanel = document.getElementById('quizSelectPanel');
  const quizPlayPanel = document.getElementById('quizPlayPanel');
  const quizResultsPanel = document.getElementById('quizResultsPanel');
  const quizListContainer = document.getElementById('quizListContainer');

  const currentQuizTitle = document.getElementById('currentQuizTitle');
  const currentQuizSubtitle = document.getElementById('currentQuizSubtitle');
  const liveQuizScore = document.getElementById('liveQuizScore');
  const liveQuizStreak = document.getElementById('liveQuizStreak');
  const quizProgressBar = document.getElementById('quizProgressBar');
  const questionNumberTag = document.getElementById('questionNumberTag');
  const quizQuestionText = document.getElementById('quizQuestionText');
  const quizOptionsContainer = document.getElementById('quizOptionsContainer');
  const quizFeedbackBox = document.getElementById('quizFeedbackBox');
  const feedbackStatus = document.getElementById('feedbackStatus');
  const feedbackExplanation = document.getElementById('feedbackExplanation');
  const btnNextQuizQuestion = document.getElementById('btnNextQuizQuestion');
  const btnExitQuiz = document.getElementById('btnExitQuiz');

  const resultScorePct = document.getElementById('resultScorePct');
  const resultGradeText = document.getElementById('resultGradeText');
  const resultSummaryText = document.getElementById('resultSummaryText');
  const resultBuddyFeedback = document.getElementById('resultBuddyFeedback');
  const quizReviewList = document.getElementById('quizReviewList');
  const btnRetakeQuiz = document.getElementById('btnRetakeQuiz');
  const btnBackToQuizList = document.getElementById('btnBackToQuizList');

  function initQuizModule() {
    renderQuizList();

    btnExitQuiz.addEventListener('click', () => {
      if (confirm('Leave current quiz? Your progress for this attempt will be lost.')) {
        showQuizSelection();
      }
    });

    btnNextQuizQuestion.addEventListener('click', proceedToNextQuizQuestion);
    btnRetakeQuiz.addEventListener('click', () => startQuiz(quizState.activeQuiz));
    btnBackToQuizList.addEventListener('click', showQuizSelection);

    initCustomQuizBuilder();
  }

  function renderQuizList() {
    quizListContainer.innerHTML = '';

    // 1. "Quiz from Flashcard Decks" Cards
    appState.decks.forEach((deck) => {
      const cardCount = deck.cards.length;
      const cardEl = document.createElement('div');
      cardEl.className = 'quiz-card-item';
      cardEl.innerHTML = `
        <div class="quiz-card-top">
          <span class="quiz-badge">Flashcards Deck</span>
          <h3>${escapeHTML(deck.name)}</h3>
          <p class="quiz-card-desc">${escapeHTML(deck.description || 'Auto-generated quiz from your flashcards!')}</p>
        </div>
        <div class="quiz-card-bottom">
          <span class="quiz-q-count">${cardCount} ${cardCount === 1 ? 'Card' : 'Cards'}</span>
          <button class="btn btn-primary btn-sm btn-start-deck-quiz" data-deck-id="${deck.id}">
            Start Quiz
          </button>
        </div>
      `;
      quizListContainer.appendChild(cardEl);
    });

    // 2. Custom Quizzes
    appState.customQuizzes.forEach((quiz) => {
      const qCount = quiz.questions.length;
      const cardEl = document.createElement('div');
      cardEl.className = 'quiz-card-item';
      cardEl.innerHTML = `
        <div class="quiz-card-top">
          <span class="quiz-badge" style="color: #a78bfa; border-color: rgba(167, 139, 250, 0.4); background: rgba(167, 139, 250, 0.15);">Custom Quiz</span>
          <h3>${escapeHTML(quiz.title)}</h3>
          <p class="quiz-card-desc">${escapeHTML(quiz.description || 'Custom multiple-choice test')}</p>
        </div>
        <div class="quiz-card-bottom">
          <span class="quiz-q-count">${qCount} Questions</span>
          <button class="btn btn-primary btn-sm btn-start-custom-quiz" data-quiz-id="${quiz.id}">
            Start Quiz
          </button>
        </div>
      `;
      quizListContainer.appendChild(cardEl);
    });

    // Attach click listeners to cards
    document.querySelectorAll('.btn-start-deck-quiz').forEach((btn) => {
      btn.addEventListener('click', () => {
        const deckId = btn.getAttribute('data-deck-id');
        const deck = appState.decks.find((d) => d.id === deckId);
        if (deck) generateAndStartDeckQuiz(deck);
      });
    });

    document.querySelectorAll('.btn-start-custom-quiz').forEach((btn) => {
      btn.addEventListener('click', () => {
        const quizId = btn.getAttribute('data-quiz-id');
        const quiz = appState.customQuizzes.find((q) => q.id === quizId);
        if (quiz) startQuiz(quiz);
      });
    });
  }

  function startQuizFromCurrentDeck() {
    const deck = getActiveDeck();
    if (!deck || !deck.cards.length) {
      showToast('Deck needs at least 1 card to quiz!', 'warning');
      return;
    }

    // Switch to quiz tab
    document.querySelectorAll('.nav-tab').forEach((t) => t.classList.remove('active'));
    document.querySelectorAll('.tab-view').forEach((v) => v.classList.remove('active'));

    const quizTab = document.getElementById('tab-quiz');
    const quizView = document.getElementById('view-quiz');
    if (quizTab) quizTab.classList.add('active');
    if (quizView) quizView.classList.add('active');

    generateAndStartDeckQuiz(deck);
  }

  function generateAndStartDeckQuiz(deck) {
    if (!deck.cards.length) {
      showToast('This deck has no cards to quiz yet.', 'warning');
      return;
    }

    // Convert deck cards into multiple-choice questions
    const questions = [];
    const allAnswers = deck.cards.map((c) => c.back);

    // Shuffle cards for variety
    const shuffledCards = [...deck.cards].sort(() => Math.random() - 0.5);

    shuffledCards.forEach((card) => {
      const correctAnswer = card.back;
      // Pick 3 distractors from other cards, or create sensible generic options if deck is small
      let distractors = allAnswers.filter((ans) => ans !== correctAnswer);
      distractors.sort(() => Math.random() - 0.5);

      const options = [correctAnswer];
      for (let i = 0; i < Math.min(3, distractors.length); i++) {
        options.push(distractors[i]);
      }

      // If fewer than 4 options, pad with plausible study distractors
      while (options.length < 4) {
        options.push(`Alternative hypothesis #${options.length}`);
      }

      // Shuffle options
      options.sort(() => Math.random() - 0.5);
      const correctIndex = options.indexOf(correctAnswer);

      questions.push({
        question: card.front,
        options,
        correctIndex,
        explanation: `Answer: ${card.back}`,
      });
    });

    const generatedQuiz = {
      id: 'gen-' + deck.id,
      title: `${deck.name} Quiz`,
      description: `Auto-generated test from ${deck.cards.length} flashcards`,
      questions,
    };

    startQuiz(generatedQuiz);
  }

  function startQuiz(quiz) {
    if (!quiz || !quiz.questions || !quiz.questions.length) {
      showToast('No questions found in this quiz.', 'warning');
      return;
    }

    quizState.activeQuiz = quiz;
    quizState.currentQuestionIndex = 0;
    quizState.score = 0;
    quizState.streak = 0;
    quizState.userAnswers = [];
    quizState.answeredCurrent = false;

    currentQuizTitle.textContent = quiz.title;

    quizSelectPanel.classList.add('hidden');
    quizResultsPanel.classList.add('hidden');
    quizPlayPanel.classList.remove('hidden');

    setBuddySpeech("Quiz session started! Read each question carefully and trust your preparation.");
    renderCurrentQuizQuestion();
  }

  function renderCurrentQuizQuestion() {
    const quiz = quizState.activeQuiz;
    const qIndex = quizState.currentQuestionIndex;
    const currentQ = quiz.questions[qIndex];

    quizState.answeredCurrent = false;
    quizFeedbackBox.classList.add('hidden');

    currentQuizSubtitle.textContent = `Question ${qIndex + 1} of ${quiz.questions.length}`;
    questionNumberTag.textContent = `Question ${qIndex + 1}`;
    quizQuestionText.textContent = currentQ.question;
    liveQuizScore.textContent = quizState.score;
    liveQuizStreak.textContent = quizState.streak;

    const progressPct = ((qIndex + 1) / quiz.questions.length) * 100;
    quizProgressBar.style.width = `${progressPct}%`;

    quizOptionsContainer.innerHTML = '';
    const letters = ['A', 'B', 'C', 'D'];

    currentQ.options.forEach((optText, idx) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-option-btn';
      btn.innerHTML = `
        <span class="option-letter">${letters[idx] || idx + 1}</span>
        <span class="option-label">${escapeHTML(optText)}</span>
      `;

      btn.addEventListener('click', () => handleOptionSelection(idx));
      quizOptionsContainer.appendChild(btn);
    });
  }

  function handleOptionSelection(selectedIndex) {
    if (quizState.answeredCurrent) return;
    quizState.answeredCurrent = true;

    const currentQ = quizState.activeQuiz.questions[quizState.currentQuestionIndex];
    const isCorrect = selectedIndex === currentQ.correctIndex;
    const allButtons = quizOptionsContainer.querySelectorAll('.quiz-option-btn');

    // Disable all options and highlight
    allButtons.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === currentQ.correctIndex) {
        btn.classList.add('correct');
      } else if (idx === selectedIndex) {
        btn.classList.add('incorrect');
      }
    });

    if (isCorrect) {
      quizState.score += 100;
      quizState.streak++;
      playQuizCorrectSound();
      triggerBuddyExcitement();
      feedbackStatus.textContent = 'Correct! 🎉';
      feedbackStatus.className = 'feedback-status correct';
    } else {
      quizState.streak = 0;
      playQuizIncorrectSound();
      feedbackStatus.textContent = 'Not quite! Keep going.';
      feedbackStatus.className = 'feedback-status incorrect';
    }

    liveQuizScore.textContent = quizState.score;
    liveQuizStreak.textContent = quizState.streak;

    // Record review entry
    quizState.userAnswers.push({
      question: currentQ.question,
      selected: currentQ.options[selectedIndex],
      correct: currentQ.options[currentQ.correctIndex],
      isCorrect,
      explanation: currentQ.explanation || '',
    });

    feedbackExplanation.textContent = currentQ.explanation || (isCorrect ? 'Great job identifying the right answer!' : `The correct answer was: ${currentQ.options[currentQ.correctIndex]}`);
    quizFeedbackBox.classList.remove('hidden');

    if (quizState.currentQuestionIndex === quizState.activeQuiz.questions.length - 1) {
      btnNextQuizQuestion.innerHTML = '<span>Finish &amp; See Results</span>';
    } else {
      btnNextQuizQuestion.innerHTML = '<span>Next Question</span> <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>';
    }
  }

  function proceedToNextQuizQuestion() {
    quizState.currentQuestionIndex++;
    if (quizState.currentQuestionIndex < quizState.activeQuiz.questions.length) {
      renderCurrentQuizQuestion();
    } else {
      showQuizResults();
    }
  }

  function showQuizResults() {
    quizPlayPanel.classList.add('hidden');
    quizResultsPanel.classList.remove('hidden');

    const totalQuestions = quizState.activeQuiz.questions.length;
    const correctCount = quizState.userAnswers.filter((a) => a.isCorrect).length;
    const percent = Math.round((correctCount / totalQuestions) * 100);

    resultScorePct.textContent = `${percent}%`;
    resultSummaryText.textContent = `You answered ${correctCount} out of ${totalQuestions} questions correctly!`;

    // Grade and mascot feedback
    let grade = 'Needs Practice';
    let feedback = "Every attempt builds stronger neural connections. Review the missed questions below and try again!";

    if (percent === 100) {
      grade = 'Flawless 100%!';
      feedback = "Absolute perfection! You have thoroughly mastered this material.";
      triggerBuddyExcitement();
    } else if (percent >= 80) {
      grade = 'Outstanding Mastery!';
      feedback = "Excellent grasp of the concepts! Just a few minor points to solidify.";
      triggerBuddyExcitement();
    } else if (percent >= 60) {
      grade = 'Good Effort!';
      feedback = "Solid foundation! A quick review of the explanations will get you to top tier.";
    }

    resultGradeText.textContent = grade;
    resultBuddyFeedback.innerHTML = `<span class="buddy-quote">"${feedback}"</span>`;
    setBuddySpeech(feedback);

    // Update global study stats
    appState.stats.quizzesCompleted++;
    saveState();

    // Render answer breakdown list
    quizReviewList.innerHTML = '';
    quizState.userAnswers.forEach((ans, idx) => {
      const item = document.createElement('div');
      item.className = `review-item ${ans.isCorrect ? 'was-correct' : 'was-incorrect'}`;
      item.innerHTML = `
        <div class="review-q-text">${idx + 1}. ${escapeHTML(ans.question)}</div>
        <div class="review-answers-grid">
          <div class="review-user-pick">Your choice: <span style="color: ${ans.isCorrect ? 'var(--success)' : '#f87171'}">${escapeHTML(ans.selected)}</span></div>
          ${!ans.isCorrect ? `<div class="review-correct-pick">Correct answer: ${escapeHTML(ans.correct)}</div>` : '<div></div>'}
        </div>
        ${ans.explanation ? `<div style="font-size: 0.82rem; color: var(--text-dim); margin-top: 0.4rem;">${escapeHTML(ans.explanation)}</div>` : ''}
      `;
      quizReviewList.appendChild(item);
    });
  }

  function showQuizSelection() {
    quizPlayPanel.classList.add('hidden');
    quizResultsPanel.classList.add('hidden');
    quizSelectPanel.classList.remove('hidden');
    renderQuizList();
  }

  /**
   * ============================================================================
   * 4. CUSTOM QUIZ BUILDER MODAL
   * ============================================================================
   */
  function initCustomQuizBuilder() {
    const btnCreateCustomQuiz = document.getElementById('btnCreateCustomQuiz');
    const modalCustomQuiz = document.getElementById('modalCustomQuiz');
    const formCustomQuiz = document.getElementById('formCustomQuiz');
    const btnAddQuizQuestionRow = document.getElementById('btnAddQuizQuestionRow');
    const builderQuestionsList = document.getElementById('builderQuestionsList');
    const builderQuestionCount = document.getElementById('builderQuestionCount');

    btnCreateCustomQuiz.addEventListener('click', () => {
      builderQuestionsList.innerHTML = '';
      addBuilderQuestionRow();
      modalCustomQuiz.classList.remove('hidden');
    });

    btnAddQuizQuestionRow.addEventListener('click', () => {
      addBuilderQuestionRow();
    });

    function addBuilderQuestionRow() {
      const qIndex = builderQuestionsList.children.length;
      const qRow = document.createElement('div');
      qRow.className = 'builder-q-item';
      qRow.innerHTML = `
        <div class="builder-q-header">
          <span>Question ${qIndex + 1}</span>
          ${qIndex > 0 ? `<button type="button" class="btn btn-danger-outline btn-sm btn-remove-q-row">Remove</button>` : ''}
        </div>
        <div class="form-group" style="margin-bottom: 0.75rem;">
          <input type="text" class="styled-input builder-q-text" placeholder="Enter question..." required>
        </div>
        <label style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 0.4rem; display: block;">Options (Select radio for correct answer):</label>
        <div class="builder-options-container">
          <div class="builder-opt-row">
            <input type="radio" name="correct_${qIndex}" value="0" checked class="builder-opt-radio">
            <input type="text" class="styled-input builder-opt-input" placeholder="Option A" required>
          </div>
          <div class="builder-opt-row">
            <input type="radio" name="correct_${qIndex}" value="1" class="builder-opt-radio">
            <input type="text" class="styled-input builder-opt-input" placeholder="Option B" required>
          </div>
          <div class="builder-opt-row">
            <input type="radio" name="correct_${qIndex}" value="2" class="builder-opt-radio">
            <input type="text" class="styled-input builder-opt-input" placeholder="Option C">
          </div>
          <div class="builder-opt-row">
            <input type="radio" name="correct_${qIndex}" value="3" class="builder-opt-radio">
            <input type="text" class="styled-input builder-opt-input" placeholder="Option D">
          </div>
        </div>
        <div class="form-group" style="margin-top: 0.5rem;">
          <input type="text" class="styled-input builder-q-exp" placeholder="Explanation or helpful hint (optional)">
        </div>
      `;

      const removeBtn = qRow.querySelector('.btn-remove-q-row');
      if (removeBtn) {
        removeBtn.addEventListener('click', () => {
          qRow.remove();
          builderQuestionCount.textContent = builderQuestionsList.children.length;
        });
      }

      builderQuestionsList.appendChild(qRow);
      builderQuestionCount.textContent = builderQuestionsList.children.length;
    }

    formCustomQuiz.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('customQuizTitle').value.trim();
      const desc = document.getElementById('customQuizDescription').value.trim();

      const qItems = builderQuestionsList.querySelectorAll('.builder-q-item');
      if (!qItems.length) {
        alert('Please add at least one question.');
        return;
      }

      const questions = [];
      qItems.forEach((item, qIdx) => {
        const qText = item.querySelector('.builder-q-text').value.trim();
        const expText = item.querySelector('.builder-q-exp').value.trim();
        const optInputs = item.querySelectorAll('.builder-opt-input');
        const radioChecked = item.querySelector(`input[name="correct_${qIdx}"]:checked`);
        const correctIndex = radioChecked ? parseInt(radioChecked.value, 10) : 0;

        const options = [];
        optInputs.forEach((inp) => {
          const val = inp.value.trim();
          if (val) options.push(val);
        });

        if (qText && options.length >= 2) {
          questions.push({
            question: qText,
            options,
            correctIndex: Math.min(correctIndex, options.length - 1),
            explanation: expText,
          });
        }
      });

      if (!questions.length) {
        alert('Each question needs at least 2 valid options.');
        return;
      }

      const newQuiz = {
        id: 'quiz-' + Date.now(),
        title,
        description: desc,
        questions,
      };

      appState.customQuizzes.push(newQuiz);
      saveState();

      modalCustomQuiz.classList.add('hidden');
      formCustomQuiz.reset();
      renderQuizList();
      showToast(`Custom quiz "${title}" created!`, 'success');
    });
  }

  /**
   * ============================================================================
   * 5. SETTINGS, STATS & BACKUP ENGINE
   * ============================================================================
   */
  function initSettingsAndStats() {
    const timerSettingsForm = document.getElementById('timerSettingsForm');
    const settingPomoDuration = document.getElementById('settingPomoDuration');
    const settingShortBreak = document.getElementById('settingShortBreak');
    const settingLongBreak = document.getElementById('settingLongBreak');
    const settingSoundToggle = document.getElementById('settingSoundToggle');
    const settingAutoStartBreaks = document.getElementById('settingAutoStartBreaks');

    // Populate current values
    settingPomoDuration.value = appState.settings.pomodoroTime || 25;
    settingShortBreak.value = appState.settings.shortBreakTime || 5;
    settingLongBreak.value = appState.settings.longBreakTime || 15;
    settingSoundToggle.checked = appState.settings.soundEnabled !== false;
    settingAutoStartBreaks.checked = !!appState.settings.autoStartBreaks;

    timerSettingsForm.addEventListener('submit', (e) => {
      e.preventDefault();
      appState.settings.pomodoroTime = parseInt(settingPomoDuration.value, 10) || 25;
      appState.settings.shortBreakTime = parseInt(settingShortBreak.value, 10) || 5;
      appState.settings.longBreakTime = parseInt(settingLongBreak.value, 10) || 15;
      appState.settings.soundEnabled = settingSoundToggle.checked;
      appState.settings.autoStartBreaks = settingAutoStartBreaks.checked;

      saveState();
      setTimerMode(pomodoroState.mode, false);
      showToast('Timer preferences saved!', 'success');
    });

    // Backup & Export JSON
    const btnExportData = document.getElementById('btnExportData');
    btnExportData.addEventListener('click', () => {
      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(appState, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', dataStr);
      downloadAnchor.setAttribute('download', `studybuddy_backup_${new Date().toISOString().slice(0, 10)}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      showToast('Backup JSON downloaded!', 'success');
    });

    // Import JSON
    const importDataInput = document.getElementById('importDataInput');
    importDataInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const imported = JSON.parse(event.target.result);
          if (imported && (imported.decks || imported.settings)) {
            appState = {
              settings: { ...DEFAULT_DATA.settings, ...(imported.settings || {}) },
              stats: { ...DEFAULT_DATA.stats, ...(imported.stats || {}) },
              decks: imported.decks || DEFAULT_DATA.decks,
              customQuizzes: imported.customQuizzes || DEFAULT_DATA.customQuizzes,
            };
            saveState();
            location.reload();
          } else {
            alert('Invalid StudyBuddy backup format.');
          }
        } catch (err) {
          alert('Failed to parse backup JSON file.');
        }
      };
      reader.readAsText(file);
    });

    // Reset All Data
    const btnResetAllData = document.getElementById('btnResetAllData');
    btnResetAllData.addEventListener('click', () => {
      if (confirm('Warning: This will reset all your flashcards, decks, quizzes, and study stats back to factory defaults. Continue?')) {
        localStorage.removeItem(STORAGE_KEY);
        appState = JSON.parse(JSON.stringify(DEFAULT_DATA));
        saveState();
        location.reload();
      }
    });

    updateStatsAndSettingsView();
  }

  function updateStatsAndSettingsView() {
    const statsTotalPomos = document.getElementById('statsTotalPomos');
    const statsTotalMinutes = document.getElementById('statsTotalMinutes');
    const statsCardsMastered = document.getElementById('statsCardsMastered');
    const statsQuizzesCompleted = document.getElementById('statsQuizzesCompleted');

    if (statsTotalPomos) statsTotalPomos.textContent = appState.stats.pomodorosCompleted;
    if (statsTotalMinutes) {
      const hrs = Math.floor(appState.stats.studyMinutes / 60);
      const mins = appState.stats.studyMinutes % 60;
      statsTotalMinutes.textContent = `${hrs}h ${mins}m`;
    }
    if (statsCardsMastered) statsCardsMastered.textContent = appState.stats.cardsMastered;
    if (statsQuizzesCompleted) statsQuizzesCompleted.textContent = appState.stats.quizzesCompleted;
  }

  /**
   * ============================================================================
   * 6. COMPANION MASCOT INTERACTIONS
   * ============================================================================
   */
  function initMascotCompanion() {
    const btnNudgeBuddy = document.getElementById('btnNudgeBuddy');
    const btnBuddyTip = document.getElementById('btnBuddyTip');
    const companionPill = document.getElementById('companionPill');
    const buddyAvatar = document.getElementById('mascotAvatar');

    function sayRandomMotivation() {
      const quote = BUDDY_QUOTES[Math.floor(Math.random() * BUDDY_QUOTES.length)];
      setBuddySpeech(quote);
      triggerBuddyExcitement();
    }

    function sayRandomTip() {
      const tip = STUDY_TIPS[Math.floor(Math.random() * STUDY_TIPS.length)];
      setBuddySpeech(tip);
      triggerBuddyExcitement();
    }

    if (btnNudgeBuddy) btnNudgeBuddy.addEventListener('click', sayRandomMotivation);
    if (btnBuddyTip) btnBuddyTip.addEventListener('click', sayRandomTip);
    if (companionPill) companionPill.addEventListener('click', sayRandomMotivation);
    if (buddyAvatar) buddyAvatar.addEventListener('click', sayRandomMotivation);
  }

  /**
   * Helper: Escape HTML strings
   */
  function escapeHTML(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /**
   * ============================================================================
   * INITIALIZATION
   * ============================================================================
   */
  document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initPomodoro();
    initFlashcards();
    initQuizModule();
    initSettingsAndStats();
    initMascotCompanion();
  });

})();
