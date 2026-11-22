# Vishal Dental & Implant Centre — website

Static Next.js site (Tailwind v4, framer-motion, Lenis smooth scroll). All content lives in `lib/site.ts`; clinic hours in `lib/hours.ts`.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export to ./out
```

Deploy: Render Blueprint (`render.yaml`) publishes `./out`; every push to `main` redeploys.

## VERIFY before launch
- WhatsApp number (assumed same as +91 70104 01746)
- Sunday closed; emergency availability outside hours
- Final domain (`site.url`)
- Treatment list wording and FAQ answers
