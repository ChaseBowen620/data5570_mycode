# Quick Start: Cloudflare Tunnel

## ✅ Installation Complete

`cloudflared` is installed and ready to use!

## Fastest Way to Get Started

### Option 1: Use the Helper Script (Recommended)

```bash
cd /home/ubuntu/data5570_mycode/backend
./start_with_tunnel.sh
```

This will:
- Start your Django server
- Start a Cloudflare tunnel
- Give you an HTTPS URL to access your backend

**Note:** The URL will be displayed in the terminal. Copy it and update your frontend's `app.json` with this URL.

### Option 2: Manual Start

If Django is already running:

```bash
cloudflared tunnel --url http://localhost:8000
```

You'll get a URL like: `https://xxxx-xxxx-xxxx.trycloudflare.com`

## Update Your Frontend

Once you have the tunnel URL, update `app.json`:

```json
"extra": {
  "apiUrl": "https://your-tunnel-url.trycloudflare.com/api"
}
```

Then restart your frontend.

## Important Notes

- **Temporary tunnels** (what we're using) generate a new URL each time
- For a **permanent URL**, you'll need to:
  1. Create a Cloudflare account
  2. Set up a named tunnel
  3. Configure a custom domain

See `CLOUDFLARE_TUNNEL_SETUP.md` for detailed instructions.

## Stopping

Press `Ctrl+C` to stop the tunnel and Django server.


