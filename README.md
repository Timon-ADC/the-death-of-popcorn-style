# Check-in Roulette 🎤

Een app voor het Public & Society team om wekelijks op een leuke, willekeurige manier de volgorde van sprekers te bepalen tijdens de check-in. Met Elmo als (licht sarcastische) gids.

## Wat zit erin?

- **`index.html`** – De hele app-structuur
- **`styles.css`** – Styling met het template-kleurenpalet
- **`app.js`** – Logica: deelnemers, vragen, sortering, Elmo-quips
- **`README.md`** – Dit bestand

## Hoe werkt het?

1. **Intro** – Elmo verwelkomt je (enigszins tegen z'n zin)
2. **Deelnemers** – Selecteer wie er vandaag bij de check-in is
3. **Vraag** – Krijg een willekeurige vraag, vul voor iedereen een getal in
4. **Onthulling** – Volgorde wordt bepaald van laag naar hoog. Bij gelijke antwoorden gooit Elmo willekeurig

Er zitten 40+ vragen in, die roteren. Elke week heb je dus een nieuwe. Je kunt ook midden in de sessie shuffelen voor een andere vraag.

## Hosten op GitHub Pages

1. Maak een nieuwe GitHub-repository aan (bijv. `checkin-roulette`)
2. Upload de 3 bestanden (`index.html`, `styles.css`, `app.js`) naar de `main`-branch
3. Ga in de repo naar **Settings → Pages**
4. Onder *Source* kies je `Deploy from a branch`
5. Kies branch `main` en folder `/ (root)`, klik **Save**
6. Na ~1 minuut is de app live op:
   `https://<jouw-username>.github.io/<repo-naam>/`

Geen build step, geen framework, geen gedoe. Gewoon statische HTML/CSS/JS.

### Over de Elmo-afbeelding

Elmo wordt geladen vanaf een externe URL (`rbstgearco.com`). Dat werkt, maar als die server ooit offline gaat of de afbeelding verplaatst wordt, verdwijnt Elmo uit je app.

**Aanbevolen:** download de afbeelding zelf en zet 'm in je repo:
1. Rechtermuisklik op Elmo in de live app → *Afbeelding opslaan als…* → sla op als `elmo.png`
2. Upload `elmo.png` naar je GitHub-repo
3. In `index.html` vervang je alle 4 voorkomens van de lange URL door simpelweg `elmo.png`

Dan is je app volledig self-contained.

## Teamleden aanpassen

Open `app.js` en pas de `TEAM`-array bovenaan aan:

```js
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
```

Kleuren zijn uit de template-paletten (`#58EB81`, `#FF9BFC`, `#A187FF`, `#2BEBCB`, `#E5C574`, `#FFF347`).

## Vragen aanpassen

In `app.js` vind je de `QUESTIONS`-array — een lijst met objecten die per vraag zowel de Nederlandse als de Engelse versie bevatten:

```js
const QUESTIONS = [
  { nl: "Wat is je schoenmaat?", en: "What's your shoe size?" },
  // ...
];
```

Voeg gerust nieuwe items toe. Voor elke vraag beide talen invullen. Een vraag herhaalt pas als alle vragen gebruikt zijn.

## Taal wisselen

Rechtsboven in de app zit een `NL / EN`-schakelaar. De keuze wordt in `localStorage` onthouden voor de volgende keer.

Alle UI-teksten, vragen én Elmo's opmerkingen zijn vertaald. De vertalingen staan in `app.js` in het `I18N`-object en in de `ELMO_*`-objecten (elk met `nl` en `en` array's).

## Elmo aanpassen

Elmo's teksten staan ook in `app.js`, opgesplitst in:
- `ELMO_INTROS` – bij het openingsscherm
- `ELMO_PARTICIPANTS` – bij deelnemer-selectie
- `ELMO_QUESTIONS` – bij de vraag
- `ELMO_REVEAL` – bij de onthulling
- `ELMO_SHUFFLE` – bij het wisselen van vraag

Elk object heeft een `nl` en een `en` array. Voeg zo veel quips toe als je wilt in beide talen; de app pakt er willekeurig eentje uit de actieve taal.

---

*Gemaakt voor Public & Society · Powered by willekeur & Elmo*
