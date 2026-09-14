# R2PRO

Padel academy platform. Runs R2PRO in Willemstad, Curacao today, and is built so other
academies can run their club on the same software with their own branding, coaches,
points rules and kantine menu.

Live: https://a3dprintingcw-cyber.github.io/r2pro/

Static site. No build step, no dependencies, no framework. Open `index.html` and it runs.

## Pages

| File | What it is |
|---|---|
| `index.html` | Home: hero, sample player card, the six app screens |
| `academies.html` | One login, many clubs, and what each academy controls |
| `programs.html` | Kids Academy, privates, squad, camps, and the points loop |
| `coaches.html` | Eight coach profiles |
| `pricing.html` | Club licence plans, switchable between XCG, USD and EUR, monthly or yearly |
| `app.html` | The logged-in app, hash routed |
| `404.html` | Served by GitHub Pages on a bad URL |

## The app

Three roles over the same local state, switched from the bar at the top:

**Player** — dashboard with the next session and a week goal, schedule with yes/no and
an `.ics` download, development (hexagon radar, shot silhouettes, nine skill cards),
points and kantine, at-home drills, squad standings and badges, coach profiles.

**Coach** — check the squad in from the court, score any skill on a slider and the
player sees it in Development immediately, publish a new home drill.

**Kantine staff** — type or scan a redemption code, see what was bought and by whom,
confirm it. Scanning the player's QR with a phone camera opens this screen with the
code already filled, because the QR encodes `app.html#verify-CODE`.

## Files

| File | Job |
|---|---|
| `assets/styles.css` | Everything visual. One dark theme, by choice. |
| `assets/data.js` | Sample data. Sessions are generated from today so the demo never goes stale. |
| `assets/store.js` | Local state in `localStorage`, kept per academy. Points, RSVPs, completed drills, redemptions, coach edits. |
| `assets/i18n.js` | English, Papiamentu, Dutch and Spanish. Mark up with `data-i18n="key"`. |
| `assets/qr.js` | QR encoder, byte mode, error correction M, versions 1 to 10. Verified byte for byte against a reference encoder. |
| `assets/figure.js` | The hexagon radar and the shot silhouettes. |
| `assets/app.js` | The app itself. |
| `assets/site.js` | Shared chrome: menu, toasts, language picker, install prompt, service worker. |
| `assets/pricing.js` | Currency and billing switching on the pricing page. |
| `sw.js` + `manifest.webmanifest` | Installs to the home screen and keeps working when the court wifi drops. |

## Still to build

- Google OAuth and real accounts. The sign-in button opens the app.
- A backend. Every number lives in `data.js` and every change lives in `localStorage`.
- Video hosting for the drills. The thumbnails are gradients.
- Billing for academy subscriptions.
- Multi-tenant data separation on the server. The client already keeps one record per club.

## Notes

- Prices are in XCG, the Caribbean guilder that replaced the Antillean guilder in 2025.
  USD and EUR on the pricing page are converted for readability and invoiced in XCG.
- Reset the demo from the browser console: `r2store.reset()` then reload.
