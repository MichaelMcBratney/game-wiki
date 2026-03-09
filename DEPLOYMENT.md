# Hosting the Game Wiki

Use this process to deploy the app to the web. **Vercel** is recommended (free tier, built for Next.js).

---

## 1. Push your code to GitHub

If you haven’t already:

```powershell
cd "c:\Users\Michael\Documents\operation-2dgame\Game Wiki"
git init
git add .
git commit -m "Initial Game Wiki"
```

Create a new repository on [github.com](https://github.com/new), then:

```powershell
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

---

## 2. Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in (e.g. with GitHub).
2. Click **Add New…** → **Project**.
3. Import your **Game Wiki** repo. Leave **Framework Preset** as Next.js and **Root Directory** as `.`.
4. **Environment variables:** open **Environment Variables** and add:
   - **Name:** `DATABASE_URL`  
   - **Value:** your **Neon pooled** connection string (see below — do not use the direct connection on Vercel).
   - Apply to **Production**, **Preview**, and **Development**.
5. Click **Deploy**.

**Important (Neon + Vercel):** Use Neon’s **pooled** connection string so serverless functions don’t exhaust connections. In the [Neon Dashboard](https://console.neon.tech) → your project → **Connection details**, choose the **Pooled** or **Connection pooling** option and copy that URL (it often has `-pooler` in the hostname, or a different port). Use that full URL as `DATABASE_URL`.

Vercel will run `npm install`, `prisma generate` (via `postinstall`), and `next build`. When the build finishes, you get a URL like `https://your-project.vercel.app`.

---

## 3. Database (Neon) for production

- Use the **same** Neon project/database as in `.env`, or create a separate Neon project for production.
- Schema is applied when you run **`npm run db:push`** (you already did this for your current DB).
- To seed production once (categories + “Getting Started” page), run from your **local** machine with production URL:
  - Temporarily set `DATABASE_URL` in `.env` to your production Neon URL, then:
  ```powershell
  npx prisma db seed
  ```
  - Or use Neon’s SQL editor / Prisma Studio with the production connection string.

---

## 4. Updates (re-deploy)

After you change code:

```powershell
git add .
git commit -m "Your message"
git push
```

Vercel will automatically build and deploy from the latest push. No need to run `db:push` again unless you change `prisma/schema.prisma`; then run `db:push` locally (or in a one-off script) against the same Neon DB.

---

## Other hosts (optional)

- **Railway:** New Project → Deploy from GitHub → select repo. Add `DATABASE_URL`, set build command to `npm run build`, start command to `npm start`.
- **Netlify:** Import repo, build command `npm run build`, publish directory `.next` (or use Netlify’s Next.js runtime). Add `DATABASE_URL` in Site settings → Environment variables.

The app expects `DATABASE_URL` to be set in the environment; the rest of the hosting process is the same.

---

## Fixing “Application error” on Vercel

If you see **Application error: a server-side exception has occurred**:

1. **Check the real error**  
   Vercel Dashboard → your project → **Logs** (or **Functions** → select a function → **Logs**). Open a failed request and read the exception message (e.g. “Can’t reach database”, “Invalid `prisma.page.findMany()`”, “DATABASE_URL is not defined”).

2. **Set `DATABASE_URL` for Production**  
   Project → **Settings** → **Environment Variables**. Ensure `DATABASE_URL` exists and is enabled for **Production** (and Preview if you use it). Redeploy after changing env vars.

3. **Use Neon’s pooled connection**  
   On serverless (Vercel), use the **pooled** connection string from Neon, not the direct one. In Neon: Connection details → **Pooled connection** (or similar). The host often looks like `ep-xxx-pooler.region.aws.neon.tech`. Replace your current `DATABASE_URL` in Vercel with this pooled URL and redeploy.
