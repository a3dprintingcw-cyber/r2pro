# R2PRO

Padel academy platform for Curaçao. Prototype of the player-facing web app, built to run one academy now and be licensed to other clubs later.

## Pages

| File | What it is |
|---|---|
| `index.html` | Home: hero, player card, what's inside the app |
| `academies.html` | One login, many clubs. What each academy controls |
| `programs.html` | Kids Academy, privates, squad, camps + the points loop |
| `coaches.html` | The eight coaches, and what coaches do in the app |
| `pricing.html` | Club licence plans and FAQ |
| `app.html` | The logged-in player app |

## Inside the player app

- **Dashboard** — next session, R2 rating, sessions, streak, points, attendance chart, activity feed
- **Development** — skill radar vs. squad average, nine skill cards scored out of 10 with the change since the last assessment, coach notes, level progression
- **Points & kantine** — balance, how points are earned, kantine shop with a working redeem flow and redemption codes, history
- **At-home training** — drills uploaded by the coaches, level filters, mark-complete for +15 points, coach-only upload tile
- **Coaches** — profiles, specialties, languages, book a private lesson

Deep links work: `app.html#dev`, `app.html#pts`, `app.html#home`, `app.html#coach`.

## Assets

- `assets/styles.css` — all styling, one dark theme, tokens at the top
- `assets/data.js` — every piece of sample data in one place. Swap for API calls
- `assets/site.js` — mobile menu, toasts, coach cards
- `assets/app.js` — the player app

No build step, no dependencies. Fonts come from Google Fonts.

## Roadmap

- Google OAuth and real player accounts
- Multi-tenant: academies sign up, set their own branding, programs, coaches, points rules and kantine menu
- Coach app: tap attendance on court, score assessments, upload drills
- Kantine staff view to confirm redemption codes
- Billing for academy subscriptions

## Run it locally

```
python3 -m http.server 8000
```

Then open http://localhost:8000
