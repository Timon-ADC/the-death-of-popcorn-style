// ============================================
// CONFIG
// ============================================
const TEAM_MEMBERS = [
    'Alinda', 'Elianne', 'Lisette', 'Harm', 'Laurent', 'Jochem', 'Timon'
];

const QUESTIONS = [
    // Originele vragen
    "Wat is je schoenmaat?",
    "Wat zijn de eerste 4 cijfers van je postcode?",
    "Wat is je lengte in centimeters?",
    "Hoeveel meetings heb je vandaag?",
    "Wat is je gemiddelde schermtijd per dag op je telefoon (in minuten)?",
    "Wat was je CITO-score?",
    "Hoeveel ongelezen mails zitten er in je mailbox?",
    "In hoeveel Slack-groepen zit je?",
    "Hoeveel connecties heb je op LinkedIn?",
    "Hoe vaak ben je verhuisd?",
    "Hoe laat ging vandaag je wekker? (bijv. 730 voor 07:30)",
    "Wat zijn de laatste twee cijfers van je telefoonnummer?",
    "Hoeveel vakanties heb je gepland dit jaar?",
    // Extra vragen
    "Hoeveel koppen koffie of thee heb je vandaag al gedronken?",
    "Hoeveel tabbladen heb je nu open in je browser?",
    "Hoeveel stappen heb je vandaag al gezet?",
    "Hoeveel kilometer woon je van kantoor?",
    "Hoeveel uur heb je vannacht geslapen?",
    "Hoeveel boeken heb je dit jaar gelezen?",
    "Hoeveel paar schoenen heb je in huis?",
    "Hoeveel planten heb je thuis?",
    "Hoeveel abonnementen heb je lopen (Netflix, Spotify, etc.)?",
    "Hoeveel wekkers moet je zetten voordat je écht opstaat?",
    "Hoeveel keer ben je deze maand naar de supermarkt geweest?",
    "Hoeveel procent batterij heeft je telefoon nu?",
    "Hoeveel foto's staan er op je telefoon (x1000)?",
    "Hoe oud was je toen je je eerste mobiel kreeg?",
    "Hoeveel landen heb je bezocht?",
    "Hoeveel verschillende banen heb je al gehad?",
    "Hoeveel jaar zit je al in het vak?",
    "Hoeveel broers en zussen heb je in totaal?",
    "Hoeveel verjaardagen vergeet je gemiddeld per jaar?",
    "Hoeveel minuten duurde je woon-werk reis vandaag?",
    "Wat was je leeftijd toen je voor het eerst ging werken?",
    "Hoeveel podcasts luister je regelmatig?",
    "Hoeveel keer per week sport je?",
    "Hoeveel pennen liggen er op je bureau?",
    "Wat zijn de laatste 3 cijfers van je bankrekeningnummer?",
    "Hoeveel emoji's heb je gisteren gebruikt (schatting)?",
    "Hoeveel keer heb je vandaag op snooze gedrukt?",
    "Hoeveel minuten stond je vandaag onder de douche?",
    "Hoeveel keer heb je deze week &quot;sorry ik was gemute&quot; gezegd?",
    "Hoeveel notificaties heb je nu openstaan op je telefoon?"
];

// Elmo moods: blij maar sarcastisch
const ELMO_LINES = {
    welcome: [
        "Hoi hoi! Elmo is er klaar voor. Jullie ook, hopelijk.",
        "Welkom! Elmo vindt het SUPER leuk dat je er bent. Echt waar. Serieus.",
        "Hallo! Elmo heeft je al uren gemist. Oké, vijf minuten. Oké, nu pas.",
        "Elmo is blij! Elmo is ALTIJD blij. Of Elmo doet alsof. Wie zal het zeggen?"
    ],
    askParticipants: [
        "Klik op wie er is! Elmo telt niet zelf, dat is te veel werk.",
        "Vink even aan wie er zit. Elmo kan niet door beeldschermen kijken. Nog niet.",
        "Selecteer de aanwezigen! Degene die weer 'vergeten' waren hoeven niet.",
        "Wie is er vandaag? Elmo hoopt iedereen, maar Elmo is ook realistisch."
    ],
    fewParticipants: [
        "Oké... maar één iemand? Dan is de volgorde wel heel spannend.",
        "Twee deelnemers? Dat wordt een nek-aan-nek race!"
    ],
    showQuestion: [
        "Tadaa! De vraag van de week! Elmo heeft er niet over nagedacht hoor.",
        "Hier is 'm! Elmo vindt het een prima vraag. Niet geweldig. Prima.",
        "De vraag! Neem je tijd. Nou ja, niet TE veel tijd alsjeblieft.",
        "Deze vraag! Elmo weet het antwoord niet. Elmo heeft geen schoenmaat."
    ],
    newQuestion: [
        "Geen fan van deze vraag? Prima, Elmo is niet beledigd. Echt niet.",
        "Nieuwe vraag op komst! Hopelijk vind je deze beter.",
        "Oké oké, een andere. Elmo is flexibel. Soort van."
    ],
    askAnswers: [
        "Vul allemaal je getal in! Eerlijk blijven hè, Elmo kijkt mee.",
        "Typen maar! Elmo wacht geduldig. Elmo heeft niks anders te doen.",
        "Getallen invullen! Geen letters, Elmo raakt daar in de war van.",
        "Iedereen zijn nummertje! Geen valsspelen. Elmo ziet alles. Ongeveer."
    ],
    result: [
        "TADA! Hier is de volgorde. Elmo heeft SUPER hard gerekend. Met een computer.",
        "Daar is 'ie! De volgorde. Elmo had het ook gewoon kunnen raden, maar goed.",
        "De uitslag! Nummer 1 mag beginnen. De rest moet wachten. Hihi.",
        "Volgorde bepaald! Elmo is trots op zichzelf. Elmo is altijd trots op zichzelf."
    ],
    tie: [
        "Oeh! Gelijke getallen! Elmo heeft willekeurig gekozen. Niet zeuren.",
        "Ties! Elmo heeft een muntje opgegooid. In Elmo's hoofd.",
        "Gelijkspel! Elmo loste het op met willekeur. Professioneel hoor."
    ],
    restart: [
        "Opnieuw?! Oké prima. Elmo vindt het leuk. Voor de derde keer.",
        "Nog een keer! Elmo had niks beters te doen toch."
    ]
};

// ============================================
// STATE
// ============================================
const state = {
    selectedParticipants: [],
    currentQuestion: '',
    usedQuestionsThisSession: [],
    answers: {}
};

// ============================================
// HELPERS
// ============================================
function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function setElmo(lineKey, extra) {
    const lines = ELMO_LINES[lineKey];
    const line = Array.isArray(lines) ? pickRandom(lines) : lines;
    document.getElementById('elmo-text').textContent = extra ? `${line} ${extra}` : line;
}

function showStep(id) {
    document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

function pickQuestion() {
    // Tries to avoid repeating the same question twice in one session
    let available = QUESTIONS.filter(q => !state.usedQuestionsThisSession.includes(q));
    if (available.length === 0) {
        state.usedQuestionsThisSession = [];
        available = QUESTIONS;
    }
    // Also store in localStorage so weekly use avoids recently-used questions
    let recent = [];
    try {
        recent = JSON.parse(localStorage.getItem('recentQuestions') || '[]');
    } catch (e) { recent = []; }
    const fresh = available.filter(q => !recent.includes(q));
    const pool = fresh.length > 0 ? fresh : available;
    const q = pickRandom(pool);
    state.usedQuestionsThisSession.push(q);
    // Keep last 10 in localStorage
    recent.unshift(q);
    recent = recent.slice(0, 10);
    localStorage.setItem('recentQuestions', JSON.stringify(recent));
    return q;
}

// ============================================
// STEP 1: PARTICIPANTS
// ============================================
function renderParticipants() {
    const list = document.getElementById('participants-list');
    list.innerHTML = '';
    TEAM_MEMBERS.forEach(name => {
        const label = document.createElement('label');
        label.className = 'participant-item';
        label.innerHTML = `
            <input type="checkbox" value="${name}" />
            <span>${name}</span>
        `;
        const cb = label.querySelector('input');
        cb.addEventListener('change', () => {
            label.classList.toggle('selected', cb.checked);
            updateParticipantsButton();
        });
        list.appendChild(label);
    });
}

function updateParticipantsButton() {
    const checked = document.querySelectorAll('#participants-list input:checked');
    document.getElementById('to-question').disabled = checked.length < 1;
}

// ============================================
// STEP 2: QUESTION
// ============================================
function showQuestionStep() {
    state.currentQuestion = pickQuestion();
    document.getElementById('question-text').textContent = state.currentQuestion;
    setElmo('showQuestion');
    showStep('step-question');
}

// ============================================
// STEP 3: ANSWERS
// ============================================
function renderAnswers() {
    const list = document.getElementById('answers-list');
    list.innerHTML = '';
    document.getElementById('answer-question-label').textContent = state.currentQuestion;
    state.selectedParticipants.forEach(name => {
        const row = document.createElement('div');
        row.className = 'answer-row';
        row.innerHTML = `
            <label for="ans-${name}">${name}</label>
            <input type="number" id="ans-${name}" step="any" placeholder="getal" />
        `;
        list.appendChild(row);
    });
}

// ============================================
// STEP 4: RESULT
// ============================================
function calculateOrder() {
    const entries = state.selectedParticipants.map(name => {
        const input = document.getElementById(`ans-${name}`);
        const val = input.value.trim();
        return {
            name,
            value: val === '' ? null : Number(val),
            random: Math.random() // tiebreaker
        };
    });

    const missing = entries.filter(e => e.value === null || isNaN(e.value));
    if (missing.length > 0) {
        alert('Iedereen moet een getal invullen! Elmo is streng maar rechtvaardig.');
        return;
    }

    // Sort ascending by value, use random as tiebreaker
    entries.sort((a, b) => {
        if (a.value !== b.value) return a.value - b.value;
        return a.random - b.random;
    });

    // Detect ties
    const hasTies = entries.some((e, i) =>
        i > 0 && e.value === entries[i - 1].value
    );

    renderResult(entries, hasTies);
    showStep('step-result');
}

function renderResult(entries, hasTies) {
    const list = document.getElementById('result-list');
    list.innerHTML = '';
    entries.forEach(e => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="name">${e.name}</span>
            <span class="answer-value">(${e.value})</span>
        `;
        list.appendChild(li);
    });
    setElmo(hasTies ? 'tie' : 'result');
}

// ============================================
// INIT
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    renderParticipants();
    setElmo('welcome');

    document.getElementById('to-question').addEventListener('click', () => {
        const checked = Array.from(document.querySelectorAll('#participants-list input:checked'));
        state.selectedParticipants = checked.map(cb => cb.value);
        if (state.selectedParticipants.length <= 2) {
            setElmo('fewParticipants');
            setTimeout(showQuestionStep, 1200);
        } else {
            showQuestionStep();
        }
    });

    document.getElementById('new-question').addEventListener('click', () => {
        setElmo('newQuestion');
        setTimeout(() => {
            state.currentQuestion = pickQuestion();
            document.getElementById('question-text').textContent = state.currentQuestion;
        }, 400);
    });

    document.getElementById('to-answers').addEventListener('click', () => {
        renderAnswers();
        setElmo('askAnswers');
        showStep('step-answers');
    });

    document.getElementById('calculate').addEventListener('click', calculateOrder);

    document.getElementById('restart').addEventListener('click', () => {
        state.selectedParticipants = [];
        state.answers = {};
        renderParticipants();
        setElmo('restart');
        showStep('step-participants');
        document.getElementById('to-question').disabled = true;
    });

    // Update Elmo when showing participants step initially
    setTimeout(() => setElmo('askParticipants'), 2500);
});
