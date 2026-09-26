Philipo Inzaghi Glass

Next.js web application for Philipo Inzaghi Glass, migrated from the original React Native/Expo project.

## Development

```bash
npm install
npm run dev
```

Open http://localhost:3000 in a browser.

The app uses the Next.js App Router. Business pages live under `app/`, shared UI lives under `components/`, and project images are served from `public/images/`.

## Gallery administration

Copy `.env.example` to `.env.local` and set a long, unique `ADMIN_PASSWORD` before starting the app. Set `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, and `SUPABASE_STORAGE_BUCKET` to a public Supabase Storage bucket named `gallery` (or your chosen bucket name). Open `http://localhost:3000/admin` to sign in. Authenticated administrators can add JPG, PNG, and WebP images to a category or delete gallery images.

New image changes are stored in Supabase Storage. Existing images in `public/images/` remain available alongside the Supabase images. Keep `SUPABASE_SERVICE_ROLE_KEY` server-only; do not expose it to browser code or commit it.

## Production

```bash
npm run build
npm start
```
