# Agent Script, easy as Force

A free, no-login web app for learning Salesforce **Agentforce Agent Script** the
way it actually sticks: one small card at a time, typing every answer from
memory, rating yourself A / B / C. Cards you haven't mastered keep coming back
until you can produce them cold.

It's a pure static site — HTML, CSS, and a little JavaScript. No build step, no
server, no database. Progress is saved per-device in the browser.

## Try it locally

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8080
# then visit http://localhost:8080
```

## Structure

```
index.html              Home / hub — lists every pack
pack.html               One template that runs any deck via ?p=<deck-id>
assets/
  style.css             Shared styling
  store.js              localStorage with in-memory fallback
  engine.js             The trainer: type -> reveal -> rate A/B/C, repeat until C
  home.js               Renders the hub from the manifest
data/
  manifest.js           The deck registry (drives the hub + routing)
  <deck-id>.js          One file per deck = its cards
  SCHEMA.md             Card format + how to author content
ROADMAP.md              The full two-level curriculum plan
```

## How it works

- The **hub** reads `data/manifest.js` and shows a tile per deck with your
  progress ring.
- A **pack** page reads `?p=<deck-id>`, loads that deck's data file, and the
  **engine** runs the cards. Anything rated A or B is rescheduled; C retires it.
  When every card is C, the deck is mastered.
- Progress lives in `localStorage` under `asc_<deck-id>_v1`, per device. No
  account, nothing leaves the browser.

## Add a deck

No engine or markup changes needed:

1. Create `data/<deck-id>.js` (copy an existing deck; see `data/SCHEMA.md`).
2. Add one line to `data/manifest.js`.

The hub lists it and `pack.html?p=<deck-id>` runs it automatically.

## Deploy free on Cloudflare Pages

Static-asset requests on Cloudflare Pages are free and unlimited, with no card
required. Two ways:

**A. Drag and drop**
1. Sign in at the Cloudflare dashboard → **Workers & Pages** → **Create** →
   **Pages** → **Upload assets**.
2. Drag this whole folder in and **Deploy**.
3. You get a `https://<project>.pages.dev` URL.

**B. Git (auto-deploy on every push)**
1. Push this folder to a GitHub/GitLab repo.
2. Cloudflare Pages → **Create** → **Pages** → **Connect to Git** → pick the repo.
3. Framework preset: **None**. Build command: *(leave empty)*. Build output
   directory: `/` (the repo root).
4. **Save and Deploy**. Every push redeploys.

A custom domain is optional and free to connect under the project's **Custom
domains** tab.

## License / content

Card content is original, written to teach the publicly documented Agent Script
language. Verify syntax against the official Agentforce developer guide as the
language evolves.
