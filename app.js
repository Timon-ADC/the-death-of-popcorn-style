/* ============================================
   CHECK-IN ROULETTE — App Logic
============================================ */

// -------- Team (Vashti toegevoegd) --------
const TEAM = [
  { name: 'Alinda',  color: '#58EB81' },
  { name: 'Elianne', color: '#FF9BFC' },
  { name: 'Lisette', color: '#A187FF' },
  { name: 'Harm',    color: '#2BEBCB' },
  { name: 'Laurent', color: '#E5C574' },
  { name: 'Jochem',  color: '#FFF347' },
  { name: 'Timon',   color: '#58EB81' },
  { name: 'Vashti',  color: '#A187FF' },
];

// -------- i18n: UI text --------
const I18N = {
  nl: {
    // Intro
    eyebrow: 'Wekelijkse check-in · v1.0',
    headlineA: 'Wie mag',
    headlineEm: 'eerst',
    headlineB: '?',
    headlineAccent: 'Laat Elmo beslissen.',
    lede: 'Een eerlijke, willekeurige, en vooral onnodig ingewikkelde manier om de volgorde van sprekers te bepalen. Met ondersteuning van een rode, pluizige coach.',
    startBtn: 'Start de roulette',
    // Participants
    pTitle: 'Wie is er vandaag?',
    pSub: 'Tik op iedereen die meedoet aan de check-in.',
    selected: 'geselecteerd',
    back: '← Terug',
    next: 'Volgende',
    // Question
    qTitle: 'De vraag van deze week',
    qSub: 'Iedereen geeft een getal. Antwoord eerlijk. Of niet. Elmo ziet het toch niet.',
    qLabel: 'VRAAG VAN DE WEEK',
    loading: 'Laden...',
    otherQuestion: 'Andere vraag',
    reveal: 'Onthul de volgorde',
    answerPlaceholder: 'getal',
    // Reveal
    rTitle: 'De volgorde van vandaag',
    rSub: 'Tromgeroffel... gesorteerd op laagste naar hoogste waarde.',
    restart: 'Nog een keer',
    newQuestion: 'Nieuwe vraag, zelfde team',
    tied: 'Gelijk → Elmo heeft gegokt',
    // Footer
    footer: 'Gemaakt voor Public & Society · Powered by willekeur & Elmo',
  },
  en: {
    // Intro
    eyebrow: 'Weekly check-in · v1.0',
    headlineA: 'Who goes',
    headlineEm: 'first',
    headlineB: '?',
    headlineAccent: 'Let Elmo decide.',
    lede: 'A fair, random, and utterly over-engineered way to determine the speaking order. Now with support from a red, fuzzy coach.',
    startBtn: 'Start the roulette',
    // Participants
    pTitle: 'Who\u2019s here today?',
    pSub: 'Tap everyone joining the check-in.',
    selected: 'selected',
    back: '← Back',
    next: 'Next',
    // Question
    qTitle: 'This week\u2019s question',
    qSub: 'Everyone gives a number. Answer honestly. Or don\u2019t. Elmo can\u2019t tell.',
    qLabel: 'QUESTION OF THE WEEK',
    loading: 'Loading...',
    otherQuestion: 'Another question',
    reveal: 'Reveal the order',
    answerPlaceholder: 'number',
    // Reveal
    rTitle: 'Today\u2019s speaking order',
    rSub: 'Drumroll... sorted from lowest to highest value.',
    restart: 'Do it again',
    newQuestion: 'New question, same team',
    tied: 'Tied → Elmo rolled the dice',
    // Footer
    footer: 'Made for Public & Society · Powered by randomness & Elmo',
  }
};

// -------- Questions (with translations) --------
const QUESTIONS = [
  { nl: "Wat is je schoenmaat?", en: "What's your shoe size?" },
  { nl: "Wat zijn de laatste vier cijfers van je postcode?", en: "What are the last four digits of your postal code?" },
  { nl: "Wat is je lengte in cm?", en: "What's your height in cm?" },
  { nl: "Hoeveel meetings heb je vandaag?", en: "How many meetings do you have today?" },
  { nl: "Wat is je gemiddelde schermtijd per dag op je telefoon (in minuten)?", en: "What's your average daily phone screen time (in minutes)?" },
  { nl: "Wat was je CITO-score?", en: "What was your CITO score? (Or SAT/ACT if you're not Dutch.)" },
  { nl: "Hoeveel ongelezen mails zitten er nu in je mailbox?", en: "How many unread emails are in your inbox right now?" },
  { nl: "In hoeveel Slack-groepen zit je?", en: "How many Slack channels are you in?" },
  { nl: "Hoeveel connecties heb je op LinkedIn?", en: "How many LinkedIn connections do you have?" },
  { nl: "Hoe vaak ben je verhuisd in je leven?", en: "How many times have you moved house in your life?" },
  { nl: "Hoe laat ging vandaag je wekker? (in 24-uurs cijfers, bv. 0715)", en: "What time did your alarm go off today? (24-hour, e.g. 0715)" },
  { nl: "Wat zijn de laatste twee cijfers van je telefoonnummer?", en: "What are the last two digits of your phone number?" },
  { nl: "Hoeveel vakanties heb je dit jaar gepland?", en: "How many holidays have you planned this year?" },
  { nl: "Hoeveel kopjes koffie/thee heb je vandaag al gedronken?", en: "How many cups of coffee/tea have you had today?" },
  { nl: "Hoeveel tabs heb je nu open in je browser?", en: "How many tabs do you have open in your browser?" },
  { nl: "Hoeveel stappen heb je vandaag al gezet?", en: "How many steps have you taken today?" },
  { nl: "Hoeveel uur heb je vannacht geslapen?", en: "How many hours did you sleep last night?" },
  { nl: "Hoeveel minuten duurde je woon-werk-verkeer vandaag?", en: "How many minutes was your commute today?" },
  { nl: "Hoeveel boeken heb je dit jaar gelezen?", en: "How many books have you read this year?" },
  { nl: "Hoeveel foto's heb je afgelopen week gemaakt?", en: "How many photos did you take last week?" },
  { nl: "Hoeveel landen heb je bezocht in je leven?", en: "How many countries have you visited in your life?" },
  { nl: "Hoeveel planten staan er bij jou thuis?", en: "How many plants do you have at home?" },
  { nl: "Op hoeveel streamingdiensten ben je geabonneerd?", en: "How many streaming services are you subscribed to?" },
  { nl: "Hoeveel apps heb je op je telefoon staan?", en: "How many apps do you have on your phone?" },
  { nl: "Hoeveel keer per week doe je aan sport?", en: "How many times a week do you exercise?" },
  { nl: "Hoeveel alarmen heb je ingesteld op je telefoon?", en: "How many alarms have you set on your phone?" },
  { nl: "Hoeveel concerten of festivals heb je dit jaar bezocht?", en: "How many concerts or festivals have you been to this year?" },
  { nl: "Hoeveel jaren werk je al bij deze organisatie?", en: "How many years have you worked at this organisation?" },
  { nl: "Hoeveel restaurants heb je afgelopen maand bezocht?", en: "How many restaurants did you visit last month?" },
  { nl: "Hoeveel kilometer woon je van kantoor?", en: "How many kilometres do you live from the office?" },
  { nl: "Hoeveel huisdieren heb je (ooit) gehad?", en: "How many pets have you (ever) had?" },
  { nl: "Hoeveel keer heb je afgelopen week buiten gegeten?", en: "How many times did you eat out last week?" },
  { nl: "Hoeveel uur spendeer je gemiddeld per week aan social media?", en: "How many hours a week do you spend on social media on average?" },
  { nl: "Hoeveel verjaardagen staan er deze maand in je agenda?", en: "How many birthdays are in your calendar this month?" },
  { nl: "Op welke leeftijd ben je voor het eerst op vakantie geweest zonder ouders?", en: "At what age did you first go on holiday without your parents?" },
  { nl: "Hoeveel jaar zit je op je huidige fiets/auto?", en: "How many years have you had your current bike/car?" },
  { nl: "Hoeveel podcasts luister je regelmatig?", en: "How many podcasts do you listen to regularly?" },
  { nl: "Hoeveel keer per week kook je zelf?", en: "How many times a week do you cook yourself?" },
  { nl: "Hoeveel toetsenbordaanslagen denk je vandaag gemaakt te hebben (gok maar)?", en: "How many keystrokes do you think you've made today (just guess)?" },
  { nl: "Wat is het aantal cijfers in je vaste huisnummer + postcode samen?", en: "How many digits are in your house number + postal code combined?" },
  { nl: "Hoeveel keer heb je deze week de snooze-knop ingedrukt?", en: "How many times did you hit snooze this week?" },
  { nl: "Hoeveel boodschappen staan er op je lijstje?", en: "How many items are on your shopping list?" },
  { nl: "Hoeveel emoji's heb je gisteren gestuurd?", en: "How many emojis did you send yesterday?" },
];

// -------- Elmo quips (with translations) --------
const ELMO_INTROS = {
  nl: [
    "Hoi! Elmo is er weer. Elmo gaat vandaag beslissen wie mag praten. Dat is vast heel spannend.",
    "Welkom terug. Elmo had eigenlijk andere plannen maar vooruit.",
    "Oh, alweer een check-in. Wat leuk. Zegt Elmo. Zonder sarcasme. Echt niet.",
    "Elmo is blij jullie te zien! Nou ja. Blij. Elmo is er in ieder geval.",
    "Hé team! Klaar om de volgorde aan Elmo over te laten? Prima, want Elmo doet het toch al."
  ],
  en: [
    "Hi! Elmo is back. Elmo will decide who talks today. Very thrilling, no doubt.",
    "Welcome back. Elmo had other plans but fine.",
    "Oh, another check-in. How lovely. Says Elmo. Without sarcasm. Really.",
    "Elmo is happy to see you! Well. Happy. Elmo is at least here.",
    "Hey team! Ready to let Elmo pick the order? Great, because Elmo is doing it anyway."
  ]
};

const ELMO_PARTICIPANTS = {
  nl: [
    "Wauw, selecteren. Heel geavanceerd. Elmo is onder de indruk.",
    "Tik tik tik. Iedereen die er is moet je aantikken. Niet te moeilijk hè?",
    "Elmo hoopt dat je niemand vergeet. Dat zou best awkward zijn.",
    "Denk eraan: alleen wie er écht is. Geen spookcollega's.",
    "Elmo vindt het schattig hoe serieus jullie dit nemen."
  ],
  en: [
    "Wow, tapping. Very advanced. Elmo is impressed.",
    "Tap tap tap. Everyone present gets a tap. Not too hard right?",
    "Elmo hopes you don't forget anyone. That would be awkward.",
    "Remember: only who's actually here. No ghost colleagues.",
    "Elmo thinks it's cute how seriously you take this."
  ]
};

const ELMO_QUESTIONS = {
  nl: [
    "Getallen. Leuk. Elmo kan tellen tot tien. Soms.",
    "Gewoon invullen. Niemand checkt het. Behalve Elmo. Maar Elmo vergeet het meteen.",
    "Eerlijk invullen hè. Of niet. Elmo ziet het toch niet.",
    "Kom op, zo moeilijk is het niet. Een getal. Eentje maar.",
    "Elmo wacht. Elmo heeft alle tijd. Elmo heeft letterlijk niets anders te doen."
  ],
  en: [
    "Numbers. Fun. Elmo can count to ten. Sometimes.",
    "Just type it in. Nobody's checking. Except Elmo. But Elmo forgets immediately.",
    "Answer honestly, okay? Or don't. Elmo can't see anyway.",
    "Come on, it's not that hard. One number. Just one.",
    "Elmo waits. Elmo has all the time. Elmo has literally nothing else to do."
  ]
};

const ELMO_REVEAL = {
  nl: [
    "Klaar! Elmo gaat nu even liggen.",
    "Tada. Wie eerst mag is eerst. Wie laatst is is laatst. Logisch.",
    "De willekeur heeft gesproken. Oftewel: Elmo.",
    "En nu praten! Elmo luistert. Misschien.",
    "Veel succes met de check-in. Elmo duimt voor jullie. Zonder duimen."
  ],
  en: [
    "Done! Elmo is going to lie down now.",
    "Ta-da. Who's first is first. Who's last is last. Logical.",
    "Randomness has spoken. Aka: Elmo.",
    "Now talk! Elmo is listening. Maybe.",
    "Good luck with the check-in. Elmo's rooting for you. Without thumbs."
  ]
};

const ELMO_SHUFFLE = {
  nl: [
    "Andere vraag? Prima. Elmo vindt alles best.",
    "Oh we kiezen weer. Typisch.",
    "Nieuwe vraag aangevraagd. Elmo bladert even."
  ],
  en: [
    "Another question? Fine. Elmo doesn't care.",
    "Oh we're re-picking. Typical.",
    "New question requested. Elmo flips through."
  ]
};

// -------- State --------
let selectedParticipants = [];
let currentQuestion = null; // {nl, en}
let usedQuestions = [];
let currentLang = 'nl';

// -------- Elements --------
const $ = (id) => document.getElementById(id);

// -------- Init --------
document.addEventListener('DOMContentLoaded', () => {
  // Restore language from localStorage
  const saved = localStorage.getItem('checkin_lang');
  if (saved === 'en' || saved === 'nl') currentLang = saved;
  applyLang();

  renderParticipants();
  pickNewQuestion();
  refreshElmoTexts();
});

// -------- Language --------
function setLang(lang) {
  if (lang !== 'nl' && lang !== 'en') return;
  currentLang = lang;
  localStorage.setItem('checkin_lang', lang);
  applyLang();
  // Update dynamic bits
  refreshQuestionDisplay();
  refreshAnswersPlaceholders();
  refreshElmoTexts();
  refreshSelectionCount();
  // Update <html lang>
  document.documentElement.lang = lang;
}

function applyLang() {
  const t = I18N[currentLang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (t[key] !== undefined) el.textContent = t[key];
  });
  // Update lang-btn active state
  document.querySelectorAll('.lang-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === currentLang);
  });
  document.documentElement.lang = currentLang;
}

// -------- Navigation --------
function goTo(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  $(screenId).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function goToQuestion() {
  if (selectedParticipants.length < 2) return;
  renderAnswers();
  goTo('screen-question');
}

// -------- Participants --------
function renderParticipants() {
  const grid = $('participantsGrid');
  grid.innerHTML = '';
  TEAM.forEach((person, idx) => {
    const card = document.createElement('div');
    card.className = 'participant-card';
    card.style.setProperty('--card-color', person.color);
    card.dataset.name = person.name;
    card.innerHTML = `
      <div class="participant-check">
        <svg viewBox="0 0 24 24" fill="none" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </div>
      <div class="participant-avatar">${person.name[0]}</div>
      <div class="participant-name">${person.name}</div>
    `;
    card.style.animationDelay = (idx * 60) + 'ms';
    card.addEventListener('click', () => toggleParticipant(person, card));
    grid.appendChild(card);
  });
}

function toggleParticipant(person, card) {
  const idx = selectedParticipants.findIndex(p => p.name === person.name);
  if (idx === -1) {
    selectedParticipants.push(person);
    card.classList.add('selected');
  } else {
    selectedParticipants.splice(idx, 1);
    card.classList.remove('selected');
  }
  refreshSelectionCount();
}

function refreshSelectionCount() {
  const count = selectedParticipants.length;
  const label = I18N[currentLang].selected;
  $('selectionCount').innerHTML = `${count} <span data-i18n="selected">${label}</span>`;
  $('toQuestionBtn').disabled = count < 2;
}

// -------- Questions --------
function pickNewQuestion() {
  if (usedQuestions.length >= QUESTIONS.length) usedQuestions = [];
  const available = QUESTIONS.filter((_, i) => !usedQuestions.includes(i));
  const indices = available.length
    ? QUESTIONS.map((_, i) => i).filter(i => !usedQuestions.includes(i))
    : QUESTIONS.map((_, i) => i);
  const pickIdx = indices[Math.floor(Math.random() * indices.length)];
  usedQuestions.push(pickIdx);
  currentQuestion = QUESTIONS[pickIdx];
  refreshQuestionDisplay();
}

function refreshQuestionDisplay() {
  if (!currentQuestion) return;
  if ($('questionText')) $('questionText').textContent = currentQuestion[currentLang];
}

function shuffleQuestion() {
  const textEl = $('questionText');
  textEl.style.opacity = '0';
  textEl.style.transform = 'scale(0.95)';
  textEl.style.transition = 'all 0.2s ease';
  setTimeout(() => {
    pickNewQuestion();
    textEl.style.opacity = '1';
    textEl.style.transform = 'scale(1)';
    $('elmoFloatingBubbleQ').textContent = pickRandom(ELMO_SHUFFLE[currentLang]);
    showElmoBubble('q', 2500);
  }, 200);
}

// -------- Answers --------
function renderAnswers() {
  const list = $('answersList');
  list.innerHTML = '';
  const placeholder = I18N[currentLang].answerPlaceholder;
  selectedParticipants.forEach((p) => {
    const row = document.createElement('div');
    row.className = 'answer-row';
    row.innerHTML = `
      <div class="answer-avatar" style="background:${p.color}">${p.name[0]}</div>
      <div class="answer-name">${p.name}</div>
      <input type="number" class="answer-input" data-name="${p.name}"
             placeholder="${placeholder}" inputmode="decimal" step="any" />
    `;
    list.appendChild(row);
  });
  list.querySelectorAll('.answer-input').forEach(input => {
    input.addEventListener('input', validateAnswers);
  });
  validateAnswers();
}

function refreshAnswersPlaceholders() {
  const placeholder = I18N[currentLang].answerPlaceholder;
  document.querySelectorAll('.answer-input').forEach(i => i.placeholder = placeholder);
}

function validateAnswers() {
  const inputs = document.querySelectorAll('.answer-input');
  const allFilled = Array.from(inputs).every(i => i.value.trim() !== '' && !isNaN(parseFloat(i.value)));
  $('revealBtn').disabled = !allFilled;
}

// -------- Reveal --------
function reveal() {
  const inputs = document.querySelectorAll('.answer-input');
  const entries = Array.from(inputs).map(i => ({
    name: i.dataset.name,
    color: TEAM.find(t => t.name === i.dataset.name).color,
    value: parseFloat(i.value)
  }));

  const byValue = {};
  entries.forEach(e => {
    if (!byValue[e.value]) byValue[e.value] = [];
    byValue[e.value].push(e);
  });

  const sortedValues = Object.keys(byValue).map(Number).sort((a, b) => a - b);

  const ordered = [];
  sortedValues.forEach(v => {
    const group = shuffle(byValue[v]);
    const isTied = group.length > 1;
    group.forEach(e => ordered.push({ ...e, tied: isTied }));
  });

  renderRanking(ordered);
  $('revealQuestion').textContent = currentQuestion[currentLang];
  $('elmoFloatingBubbleR').textContent = pickRandom(ELMO_REVEAL[currentLang]);
  goTo('screen-reveal');
  setTimeout(() => showElmoBubble('r', 3500), 800);
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function renderRanking(ordered) {
  const ol = $('ranking');
  ol.innerHTML = '';
  const tiedLabel = I18N[currentLang].tied;
  ordered.forEach((e, idx) => {
    const li = document.createElement('li');
    li.className = 'rank-item' + (idx === 0 ? ' first' : '');
    li.style.animationDelay = (idx * 120) + 'ms';
    const position = idx + 1;
    const ordinalIcon = idx === 0 ? '🎤' : '';
    li.innerHTML = `
      <div class="rank-number">${position}</div>
      <div>
        <div class="rank-name">${e.name} ${ordinalIcon}</div>
        ${e.tied ? `<span class="rank-tied">${tiedLabel}</span>` : ''}
      </div>
      <div class="rank-value">${formatValue(e.value)}</div>
    `;
    ol.appendChild(li);
  });
}

function formatValue(v) {
  if (Number.isInteger(v)) return v.toString();
  return v.toFixed(2).replace(/\.?0+$/, '');
}

// -------- Restart --------
function restart() {
  selectedParticipants = [];
  document.querySelectorAll('.participant-card.selected').forEach(c => c.classList.remove('selected'));
  refreshSelectionCount();
  pickNewQuestion();
  refreshElmoTexts();
  goTo('screen-intro');
}

function newQuestion() {
  pickNewQuestion();
  renderAnswers();
  goTo('screen-question');
}

// -------- Elmo bubbles --------
function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function refreshElmoTexts() {
  if ($('elmoText')) $('elmoText').textContent = pickRandom(ELMO_INTROS[currentLang]);
  if ($('elmoFloatingBubbleP')) $('elmoFloatingBubbleP').textContent = pickRandom(ELMO_PARTICIPANTS[currentLang]);
  if ($('elmoFloatingBubbleQ')) $('elmoFloatingBubbleQ').textContent = pickRandom(ELMO_QUESTIONS[currentLang]);
  if ($('elmoFloatingBubbleR')) $('elmoFloatingBubbleR').textContent = pickRandom(ELMO_REVEAL[currentLang]);
}

const bubbleTimers = {};
function toggleElmoBubble(key) {
  const id = 'elmoFloatingBubble' + key.toUpperCase();
  const bubble = $(id);
  if (!bubble) return;
  if (bubble.classList.contains('show')) {
    bubble.classList.remove('show');
  } else {
    showElmoBubble(key, 3500);
  }
}

function showElmoBubble(key, duration = 3000) {
  const id = 'elmoFloatingBubble' + key.toUpperCase();
  const bubble = $(id);
  if (!bubble) return;
  bubble.classList.add('show');
  if (bubbleTimers[key]) clearTimeout(bubbleTimers[key]);
  bubbleTimers[key] = setTimeout(() => {
    bubble.classList.remove('show');
  }, duration);
}

document.addEventListener('click', (e) => {
  const card = e.target.closest('.participant-card');
  if (card && Math.random() < 0.25) showElmoBubble('p', 2500);
});
