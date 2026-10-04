# Bharatyatra Tourism

Tourism website with a lightweight Node.js backend. Destination browsing works without an account; account registration and saved trip preferences use PostgreSQL.

## Project folders

- `frontend/` contains `index.html`, `css/` stylesheets, and `js/` browser scripts. The page loads its main JavaScript with `defer`, so the HTML can be parsed before the script runs.
- `backend/` contains the Node.js server, API handlers, local trip JSON storage, and the local `.env` file.
- `database/` contains the PostgreSQL schema used to create the account and session tables in Supabase.
- `tests/` contains automated project checks.

## Run on the laptop

Install Node.js 18 or newer, then run:

```powershell
npm start
```

If Windows blocks `npm.ps1`, use this equivalent command:

```powershell
node backend/srever.js
```

Open:

```text
http://localhost:3000
```

The trip planner lets travelers choose destinations, set travel dates and group size, and build an editable day-by-day starter itinerary. If a total trip budget is entered, it shows a rough daily and per-traveler budget split; these figures are planning estimates, not live prices. Saved trips use `backend/data.json`. Account registration also requires a PostgreSQL connection; see **Account database setup** below.

## Account database setup

The email/password account feature stores password hashes, login sessions, and travel preferences in PostgreSQL. It does not store passwords as plain text and does not use browser local storage for authentication.

For a small project, a free Supabase PostgreSQL project can be used:

1. Create a Supabase project and copy its PostgreSQL connection string from the project's database settings.
2. In Render, open the `bharatyatra` service, go to **Environment**, and add `DATABASE_URL` with that connection string. Keep it private; never paste it into source files or GitHub.
3. Save the environment change and redeploy the Render service. The account tables are created automatically the first time an account endpoint is used.
4. For local testing, put `DATABASE_URL=<your connection string>` in `backend/.env` (that file is ignored by Git).

The API uses a small connection pool and stores accounts separately from the existing trip JSON file. Free database providers can pause inactive projects and have usage limits; review the provider's current limits and keep an export/backup if account data matters.

## Open on a phone or another laptop

1. Connect both devices to the same Wi-Fi.
2. Start the server with `npm start`.
3. On Windows, run `ipconfig` and find the laptop's IPv4 Address.
4. On the phone or other laptop, open:

```text
http://YOUR-LAPTOP-IP:3000
```

Example: `http://192.168.1.5:3000`

If Windows Firewall asks, allow Node.js on Private networks. Keep the laptop server running while other devices use the site.

## Optional settings

Create `backend/.env` only when needed:

```text
PORT=3000
HOST=0.0.0.0
OPENAI_API_KEY=your_key_here
```

Without an OpenAI key, the built-in local travel assistant works without extra API cost.

## Deploy to Render

The `render.yaml` Blueprint runs the website and API together, so the laptop does not need to stay on.

1. Push this project to a GitHub repository.
2. In Render, choose **New +** > **Blueprint** and connect that repository.
3. Render will read `render.yaml`; choose **Apply** to create the web service.
4. Open the generated `onrender.com` URL on your phone.

The free web service may sleep when idle and take a little time to wake. Existing trips still use `backend/data.json`; on a free host, that file is not durable across service replacements or restarts. Account profiles use the PostgreSQL service configured with `DATABASE_URL`.
