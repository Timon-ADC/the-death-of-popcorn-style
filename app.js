/* ============================================
   CHECK-IN ROULETTE — App Logic
============================================ */

// -------- Team --------
const TEAM = [
  { name: 'Alinda',  color: '#58EB81' },
  { name: 'Elianne', color: '#FF9BFC' },
  { name: 'Lisette', color: '#A187FF' },
  { name: 'Harm',    color: '#2BEBCB' },
  { name: 'Laurent', color: '#E5C574' },
  { name: 'Jochem',  color: '#FFF347' },
  { name: 'Timon',   color: '#58EB81' },
];

// -------- Questions --------
const QUESTIONS = [
  // Originele lijst
  "Wat is je schoenmaat?",
  "Wat zijn de laatste vier cijfers van je postcode?",
  "Wat is je lengte in cm?",
  "Hoeveel meetings heb je vandaag?",
  "Wat is je gemiddelde schermtijd per dag op je telefoon (in minuten)?",
  "Wat was je CITO-score?",
  "Hoeveel ongelezen mails zitten er nu in je mailbox?",
  "In hoeveel Slack-groepen zit je?",
  "Hoeveel connecties heb je op LinkedIn?",
  "Hoe vaak ben je verhuisd in je leven?",
  "Hoe laat ging vandaag je wekker? (in 24-uurs cijfers, bv. 0715)",
  "Wat zijn de laatste twee cijfers van je telefoonnummer?",
  "Hoeveel vakanties heb je dit jaar gepland?",

  // Uitgebreide set
  "Hoeveel kopjes koffie/thee heb je vandaag al gedronken?",
  "Hoeveel tabs heb je nu open in je browser?",
  "Hoeveel stappen heb je vandaag al gezet?",
  "Hoeveel uur heb je vannacht geslapen?",
  "Hoeveel minuten duurde je woon-werk-verkeer vandaag?",
  "Hoeveel boeken heb je dit jaar gelezen?",
  "Hoeveel foto's heb je afgelopen week gemaakt?",
  "Hoeveel landen heb je bezocht in je leven?",
  "Hoeveel planten staan er bij jou thuis?",
  "Op hoeveel streamingdiensten ben je geabonneerd?",
  "Hoeveel apps heb je op je telefoon staan?",
  "Hoeveel keer per week doe je aan sport?",
  "Hoeveel alarmen heb je ingesteld op je telefoon?",
  "Hoeveel concerten of festivals heb je dit jaar bezocht?",
  "Hoeveel jaren werk je al bij deze organisatie?",
  "Hoeveel restaurants heb je afgelopen maand bezocht?",
  "Hoeveel kilometer woon je van kantoor?",
  "Hoeveel huisdieren heb je (ooit) gehad?",
  "Hoeveel keer heb je afgelopen week buiten gegeten?",
  "Hoeveel uur spendeer je gemiddeld per week aan social media?",
  "Hoeveel verjaardagen staan er deze maand in je agenda?",
  "Op welke leeftijd ben je voor het eerst op vakantie geweest zonder ouders?",
  "Hoeveel jaar zit je op je huidige fiets/auto?",
  "Hoeveel podcasts luister je regelmatig?",
  "Hoeveel keer per week kook je zelf?",
  "Hoeveel toetsenbordaanslagen denk je vandaag gemaakt te hebben (gok maar)?",
  "Wat is het aantal cijfers in je vaste huisnummer + postcode samen?",
  "Hoeveel keer heb je deze week de snooze-knop ingedrukt?",
  "Hoeveel boodschappen staan er op je lijstje?",
  "Hoeveel emoji's heb je gisteren gestuurd?",
];

// -------- Elmo quips --------
const ELMO_INTROS = [
  "Hoi! Elmo is er weer. Elmo gaat vandaag beslissen wie mag praten. Dat is vast heel spannend.",
  "Welkom terug. Elmo had eigenlijk andere plannen maar vooruit.",
  "Oh, alweer een check-in. Wat leuk. Zegt Elmo. Zonder sarcasme. Echt niet.",
  "Elmo is blij jullie te zien! Nou ja. Blij. Elmo is er in ieder geval.",
  "Hé team! Klaar om de volgorde aan Elmo over te laten? Prima, want Elmo doet het toch al."
];

const ELMO_PARTICIPANTS = [
  "Wauw, selecteren. Heel geavanceerd. Elmo is onder de indruk.",
  "Tik tik tik. Iedereen die er is moet je aantikken. Niet te moeilijk hè?",
  "Elmo hoopt dat je niemand vergeet. Dat zou best awkward zijn.",
  "Denk eraan: alleen wie er écht is. Geen spookcollega's.",
  "Elmo vindt het schattig hoe serieus jullie dit nemen."
];

const ELMO_QUESTIONS = [
  "Getallen. Leuk. Elmo kan tellen tot tien. Soms.",
  "Gewoon invullen. Niemand checkt het. Behalve Elmo. Maar Elmo vergeet het meteen.",
  "Eerlijk invullen hè. Of niet. Elmo ziet het toch niet.",
  "Kom op, zo moeilijk is het niet. Een getal. Eentje maar.",
  "Elmo wacht. Elmo heeft alle tijd. Elmo heeft letterlijk niets anders te doen."
];

const ELMO_REVEAL = [
  "Klaar! Elmo gaat nu even liggen.",
  "Tada. Wie eerst mag is eerst. Wie laatst is is laatst. Logisch.",
  "De willekeur heeft gesproken. Oftewel: Elmo.",
  "En nu praten! Elmo luistert. Misschien.",
  "Veel succes met de check-in. Elmo duimt voor jullie. Zonder duimen."
];

const ELMO_SHUFFLE = [
  "Andere vraag? Prima. Elmo vindt alles best.",
  "Oh we kiezen weer. Typisch.",
  "Nieuwe vraag aangevraagd. Elmo bladert even."
];

// -------- State --------
let selectedParticipants = [];
let currentQuestion = '';
let usedQuestions = [];

// -------- Elements --------
const $ = (id) => document.getElementById(id);

// -------- Init --------
document.addEventListener('DOMContentLoaded', () => {
  renderParticipants();
  pickNewQuestion();
  setRandomElmoText($('elmoText'), ELMO_INTROS);
  setRandomElmoText($('elmoFloatingBubbleP'), ELMO_PARTICIPANTS);
  setRandomElmoText($('elmoFloatingBubbleQ'), ELMO_QUESTIONS);
  setRandomElmoText($('elmoFloatingBubbleR'), ELMO_REVEAL);
});

function setRandomElmoText(el, pool) {
  if (!el) return;
  el.textContent = pool[Math.floor(Math.random() * pool.length)];
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
  updateSelectionCount();
}

function updateSelectionCount() {
  const count = selectedParticipants.length;
  $('selectionCount').textContent = `${count} geselecteerd`;
  $('toQuestionBtn').disabled = count < 2;
}

// -------- Questions --------
function pickNewQuestion() {
  // Reset if we've exhausted
  if (usedQuestions.length >= QUESTIONS.length) usedQuestions = [];
  const available = QUESTIONS.filter(q => !usedQuestions.includes(q));
  const pool = available.length ? available : QUESTIONS;
  const q = pool[Math.floor(Math.random() * pool.length)];
  usedQuestions.push(q);
  currentQuestion = q;
  if ($('questionText')) $('questionText').textContent = q;
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
    setRandomElmoText($('elmoFloatingBubbleQ'), ELMO_SHUFFLE);
    showElmoBubble('q', 2500);
  }, 200);
}

// -------- Answers --------
function renderAnswers() {
  const list = $('answersList');
  list.innerHTML = '';
  selectedParticipants.forEach((p, idx) => {
    const row = document.createElement('div');
    row.className = 'answer-row';
    row.innerHTML = `
      <div class="answer-avatar" style="background:${p.color}">${p.name[0]}</div>
      <div class="answer-name">${p.name}</div>
      <input type="number" class="answer-input" data-name="${p.name}"
             placeholder="getal" inputmode="decimal" step="any" />
    `;
    list.appendChild(row);
  });
  // Listen to inputs
  list.querySelectorAll('.answer-input').forEach(input => {
    input.addEventListener('input', validateAnswers);
  });
  validateAnswers();
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

  // Group by value to detect ties
  const byValue = {};
  entries.forEach(e => {
    if (!byValue[e.value]) byValue[e.value] = [];
    byValue[e.value].push(e);
  });

  // Sort unique values ascending
  const sortedValues = Object.keys(byValue).map(Number).sort((a, b) => a - b);

  // Build ordered list, shuffling tied entries
  const ordered = [];
  sortedValues.forEach(v => {
    const group = shuffle(byValue[v]);
    const isTied = group.length > 1;
    group.forEach(e => ordered.push({ ...e, tied: isTied }));
  });

  renderRanking(ordered);
  $('revealQuestion').textContent = currentQuestion;
  setRandomElmoText($('elmoFloatingBubbleR'), ELMO_REVEAL);
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
        ${e.tied ? '<span class="rank-tied">Gelijk → Elmo heeft gegokt</span>' : ''}
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
  updateSelectionCount();
  pickNewQuestion();
  setRandomElmoText($('elmoText'), ELMO_INTROS);
  goTo('screen-intro');
}

function newQuestion() {
  pickNewQuestion();
  // Keep participants, clear answers
  renderAnswers();
  goTo('screen-question');
}

// -------- Elmo floating bubble --------
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

// Auto-show floating Elmo on screen change (subtle)
document.addEventListener('click', (e) => {
  const card = e.target.closest('.participant-card');
  if (card && Math.random() < 0.25) showElmoBubble('p', 2500);
});
