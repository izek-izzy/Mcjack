# McJack — Static Website

This is a simple responsive static website scaffold for McJack built with HTML, Bootstrap 5 and JavaScript.

Quick start:

Open `index.html` in your browser (no server required):

```bash
# macOS / Linux
open index.html

# Windows (PowerShell)
Start-Process index.html
```

Deployment:
- Host on GitHub Pages, Netlify, or Vercel by connecting the repository and pointing to the root.

Notes:
- Contact form is mocked on the client-side; integrate a backend or form provider to receive messages.

Logo export tool:
- Open [tools/export-logo.html](tools/export-logo.html) in your browser and click "Export rounded PNG" to download a circular 240×240 PNG of the logo. This works without installing ImageMagick.
- Use [tools/export-assets.html](tools/export-assets.html) to export high-res PNGs from the new SVG logos (`logo-clean.svg`, `logo-mark.svg`).

Contact form setup (Netlify):

- This project includes a Netlify serverless function at `netlify/functions/send-email.js` that sends contact form messages via SMTP using `nodemailer`.
- To enable it, set these Netlify environment variables:
	- `SMTP_HOST` — your SMTP host (e.g., `smtp.gmail.com`)
	- `SMTP_PORT` — SMTP port (usually `587` or `465`)
	- `SMTP_USER` — SMTP username (your email)
	- `SMTP_PASS` — SMTP password or app password
	- `TO_EMAIL` — (optional) destination email; defaults to `mcjackconstructions@gmail.com`
- Deploy to Netlify and add the variables in Site Settings → Build & deploy → Environment.

If you prefer Vercel or another host, tell me and I'll provide an adapted serverless function.
