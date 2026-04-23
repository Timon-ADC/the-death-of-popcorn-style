// ===== Data =====
const TEAM_MEMBERS = [
    { name: "Alinda",   color: "#58EB81" },
    { name: "Elianne",  color: "#FF9BFC" },
    { name: "Lisette",  color: "#A187FF" },
    { name: "Harm",     color: "#2BEBCB" },
    { name: "Laurent",  color: "#E5C574" },
    { name: "Jochem",   color: "#FFF347" },
    { name: "Timon",    color: "#FF9BFC" }
];

const QUESTIONS = [
    "Wat is je schoenmaat?",
    "Wat is je postcode? (alleen de cijfers)",
    "Wat is je lengte in centimeters?",
    "Hoeveel meetings heb je vandaag?",
    "Wat is je gemiddelde schermtijd per dag op je telefoon? (in minuten)",
    "Wat was je CITO-score?",
    "Hoeveel ongelezen mails zitten er in je mailbox?",
    "In hoeveel Slack-groepen zit je?",
    "Hoeveel connecties heb je op LinkedIn?",
    "Hoe vaak ben je verhuisd?",
    "Hoe laat ging vandaag je wekker? (in uren, bijv. 7.30)",
    "Wat zijn de laatste twee cijfers van je telefoonnummer?",
    "Hoeveel vakanties heb je gepland voor dit jaar?",
    "Hoeveel kopjes koffie heb je vandaag al gedronken?",
    "Hoeveel apps staan er op het startscherm van je telefoon?",
    "Hoeveel tabs heb je nu openstaan in je browser?",
    "Hoeveel uur slaap heb je afgelopen nacht gehad?",
    "Hoeveel stappen heb je vandaag gezet?",
    "Hoeveel jaar werk je al bij deze organisatie?",
    "Hoeveel boeken heb je afgelopen jaar gelezen?",
    "Wat is het laatste cijfer van je huisnummer? (keer tien als het 0 is)",
    "Hoeveel kilometer moest je vandaag reizen om hier te komen?",
    "Hoeveel foto's heb je afgelopen week gemaakt?",
    "Hoeveel minuten duurde je ochtendroutine vandaag?",
    "Hoeveel talen spreek je? (inclusief beetje)",
    "Hoeveel keer heb je vandaag op je telefoon gekeken? (schatting)",
    "Hoeveel planten heb je thuis staan?",
    "Hoeveel verschillende landen heb je bezocht?",
    "Hoeveel streamingdiensten betaal je voor?",
    "Hoeveel paar schoenen heb je in huis?",
    "Hoeveel keer per week sport je?",
    "Hoeveel items staan er op je boodschappenlijst?",
    "Hoeveel chatapps gebruik je dagelijks?",
    "Hoeveel jaren zitten er tussen jou en je oudste broer of zus? (0 als enig kind)",
    "Hoeveel uur heb je deze week nog in je agenda vrij?",
    "Hoeveel euro zit er ongeveer in je portemonnee nu?",
    "Hoeveel abonnementen heb je lopen?",
    "Hoeveel van de laatste 10 mails heb je gearchiveerd?",
    "Hoeveel keer heb je deze maand extern gegeten?",
    "Hoeveel vrijdagen tot de zomervakantie?",
    "Hoeveel keer heb je vandaag &quot;sorry, was op mute&quot; gezegd of gehoord?",
    "Hoeveel kerstkaarten heb je de afgelopen december verstuurd?",
    "Hoeveel passwords gebruik je dagelijks? (schatting)",
    "Hoeveel nummers staan er in je meest beluisterde playlist?",
    "Hoeveel zoekopdrachten heb je vandaag al gedaan?",
    "Hoeveel minuten besteed je gemiddeld aan je lunch?"
];

// ===== Elmo messages (blij + sarcastisch) =====
const ELMO_MESSAGES = {
    stage1: [
        "Hallo hallo! Elmo is er weer. Klaar om te bepalen wie als eerste mag klagen over de maandag?",
        "Elmo is zó blij jullie te zien! Echt waar. Echt echt echt. Zullen we beginnen voordat Elmo van enthousiasme ontploft?",
        "Jippie, weer een meeting! Elmo kan niet wachten. Ook niet sarcastisch bedoeld. Ook wel een beetje."
    ],
    stage2: [
        "Kies maar wie er vandaag is! Elmo hoopt dat het er meer dan twee zijn, anders wordt het een kort rondje.",
        "Wie is er wél? Vink ze aan! Afwezigen krijgen van Elmo een sticker. Of niet.",
        "Vink de dapperen aan die het overleg hebben gehaald. Elmo is trots op ze."
    ],
    stage2warning: [
        "Eh... Elmo telt maar één persoon. Dan heb je geen check-in, dan heb je een monoloog.",
        "Minstens twee mensen graag, anders is er niets te sorteren. Zelfs Elmo snapt dat."
    ],
    stage3: [
        "Vraag van de week! Vul ieder een getal in. Eerlijk, hè. Elmo kijkt mee. Altijd.",
        "Tijd voor getallen! Elmo houdt van getallen. Bijna net zoveel als van koekjes.",
        "Geen trucjes, geen afgeronde getallen om eerste te worden. Elmo zíét dat.",
        "Als je het antwoord niet weet, gok dan maar iets wilds. Elmo vindt dat wel zo spannend."
    ],
    stage3incomplete: [
        "Nog niet iedereen heeft een getal ingevuld. Elmo wacht geduldig. Nou, matig geduldig."
    ],
    stage4: [
        "Tadaa! De volgorde is bepaald. Elmo heeft echt helemaal niets beïnvloed. Echt niet.",
        "Daar is de volgorde! Nummer één mag beginnen. Nummer laatste mag klagen.",
        "Klaar! Ga nu checken en hou het kort, want Elmo heeft nog meer meetings. Grapje, Elmo heeft alle tijd."
    ],
    stage4tie: [
        "Gelijke stand! Elmo heeft met een dobbelsteen gegooid. Niet echt, maar bijna."
    ]
};

// ===== State =====
const state = {
    step: 1,
    selected: new Set(),
    question: null,
    answers: {},
    order: []
};

// ===== Utils =====
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);
const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];

function getStoredQuestion() {
    try {
        const raw = localStorage.getItem("ps_weekly_question");
        if (!raw) return null;
        const { question, week } = JSON.parse(raw);
        if (week === getWeekKey()) return question;
        return null;
    } catch { return null; }
}

function storeQuestion(q) {
    try {
        localStorage.setItem("ps_weekly_question", JSON.stringify({ question: q, week: getWeekKey() }));
    } catch {}
}

function getWeekKey() {
    const d = new Date();
    const onejan = new Date(d.getFullYear(), 0, 1);
    const week = Math.ceil((((d - onejan) / 86400000) + onejan.getDay() + 1) / 7);
    return `${d.getFullYear()}-W${week}`;
}

function pickQuestion(forceNew = false) {
    if (!forceNew) {
        const stored = getStoredQuestion();
        if (stored) return stored;
    }
    const q = rand(QUESTIONS);
    storeQuestion(q);
    return q;
}

function setElmoMessage(key) {
    const pool = ELMO_MESSAGES[key];
    if (!pool) return;
    const msg = rand(pool);
    const el = $("#elmo-message");
    el.style.animation = "none";
    // force reflow for animation restart
    void el.offsetWidth;
    el.style.animation = "";
    el.textContent = msg;
}

// ===== Rendering =====
function renderParticipants() {
    const grid = $("#participants-grid");
    grid.innerHTML = "";
    TEAM_MEMBERS.forEach((m) => {
        const initials = m.name[0].toUpperCase();
        const chip = document.createElement("div");
        chip.className = "participant-chip" + (state.selected.has(m.name) ? " selected" : "");
        chip.dataset.name = m.name;
        chip.innerHTML = `
            <div class="participant-avatar" style="background:${m.color}">${initials}</div>
            <span class="participant-name">${m.name}</span>
            <div class="participant-check"></div>
        `;
        chip.addEventListener("click", () => toggleParticipant(m.name));
        grid.appendChild(chip);
    });
    updateSelectionSummary();
}

function toggleParticipant(name) {
    if (state.selected.has(name)) state.selected.delete(name);
    else state.selected.add(name);
    renderParticipants();
}

function updateSelectionSummary() {
    $("#selection-count").textContent = state.selected.size;
    $("#to-question-btn").disabled = state.selected.size < 2;
}

function renderQuestion() {
    state.question = state.question || pickQuestion();
    $("#weekly-question").textContent = state.question;

    const list = $("#answers-list");
    list.innerHTML = "";
    const selectedMembers = TEAM_MEMBERS.filter(m => state.selected.has(m.name));
    selectedMembers.forEach((m) => {
        const row = document.createElement("div");
        row.className = "answer-row";
        row.innerHTML = `
            <div class="participant-avatar" style="background:${m.color}">${m.name[0].toUpperCase()}</div>
            <span class="participant-name">${m.name}</span>
            <input type="number" class="answer-input" step="any" placeholder="getal" data-name="${m.name}" value="${state.answers[m.name] ?? ""}" />
        `;
        list.appendChild(row);
    });
    list.querySelectorAll(".answer-input").forEach(inp => {
        inp.addEventListener("input", (e) => {
            const v = e.target.value;
            const name = e.target.dataset.name;
            if (v === "") delete state.answers[name];
            else state.answers[name] = parseFloat(v);
            validateAnswers();
        });
    });
    validateAnswers();
}

function validateAnswers() {
    const selected = Array.from(state.selected);
    const allFilled = selected.every(n => typeof state.answers[n] === "number" && !isNaN(state.answers[n]));
    $("#generate-order-btn").disabled = !allFilled;
    if (!allFilled && selected.some(n => state.answers[n] !== undefined)) {
        setElmoMessage("stage3incomplete");
    }
}

function computeOrder() {
    const dir = $("#sort-direction").value;
    const sign = dir === "asc" ? 1 : -1;

    // Group by value to detect ties, then shuffle within groups
    const entries = Array.from(state.selected).map(name => ({ name, value: state.answers[name] }));
    // Group
    const groups = new Map();
    entries.forEach(e => {
        const key = e.value;
        if (!groups.has(key)) groups.set(key, []);
        groups.get(key).push(e);
    });
    // Sort keys
    const sortedKeys = Array.from(groups.keys()).sort((a, b) => (a - b) * sign);
    let hasTie = false;
    const ordered = [];
    sortedKeys.forEach(k => {
        const group = groups.get(k);
        if (group.length > 1) {
            hasTie = true;
            // Fisher-Yates shuffle
            for (let i = group.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [group[i], group[j]] = [group[j], group[i]];
            }
        }
        ordered.push(...group);
    });
    state.order = ordered;
    state.hadTie = hasTie;
}
