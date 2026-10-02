# Bharatyatra Tourism

Lightweight tourism website with a Node.js backend and a local JSON database. No MongoDB or heavy installation is required.

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

The database is created automatically at `backend/data.json` when the server first saves a trip.

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

The free service may sleep when idle and take a little time to wake. Saved trips currently use `backend/data.json`; on a free host, that file is not durable across service replacements or restarts. Use persistent storage or a database before relying on cloud-saved trips.
