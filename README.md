# OracleSteps portfolio

Nuxt 3 / Vue 3 with SSR and Tailwind CSS. Lucide is used only for navigation controls.

## Local development

```sh
npm ci
npm run dev
```

## Production

```sh
npm run build
```

Nuxt uses the hosting provider’s Nitro preset (Node locally and on Vercel). The contact endpoint requires a Node runtime with outbound SMTP access; do not deploy this SMTP implementation to a Cloudflare Worker.

## Content

- Shared project data: `data/projects.ts`
- Design tokens and responsive styles: `assets/css/main.css`
- Homepage, work, and enquiry routes: `pages/`
- Project screenshot component: `components/ProjectVisual.vue`

## Before public launch

- Configure the Zoho environment variables below and redeploy before testing live delivery.
- Review the draft privacy and terms information with the business owner.
- Replace the specified `https://oraclesteps.com/og-image.jpg` metadata URL with an available production image.
- Budget options currently use USD and can be changed in `pages/contact.vue`.
- Nuxt 3 was explicitly requested. Official Nuxt documentation states that it reached end of life on July 31, 2026. Plan a supported-version upgrade before a long-term public production launch.

The layout follows the supplied Figma template with Sansation and Lato. Project cards use browser screenshots of the actual websites. See DESIGN-STATUS.md for image sources and outstanding content.

## Zoho contact form

The form posts to `/api/contact`. Messages are sent to `contact@oraclesteps.com`; the visitor is the Reply-To, never the sender. Success means the SMTP server accepted the recipient, not a guarantee of inbox placement.

In your hosting project's environment settings (Vercel: Settings → Environment Variables), add these **server-only** values for Production and any Preview environment that should send mail:

- `NUXT_SMTP_HOST`: the exact outgoing SMTP host shown in Zoho Mail → Settings → Mail Accounts → SMTP. It depends on your plan and data centre. US paid domain accounts commonly use `smtppro.zoho.com`; free accounts commonly use `smtp.zoho.com`.
- `NUXT_SMTP_PORT`: `465` (TLS), or `587` (mandatory STARTTLS).
- `NUXT_SMTP_USER`: `contact@oraclesteps.com` (must be a Zoho-authenticated mailbox).
- `NUXT_SMTP_PASSWORD`: a Zoho app-specific password for that mailbox. Generate it in Zoho Accounts → Security → App Passwords. Never put it in source code or a public Nuxt config field.

Redeploy after setting the variables. Locally copy `.env.example` to `.env`, fill it privately and restart Nuxt. `.env` and its variants are ignored by Git. Production Node servers require environment variables from the host; they do not automatically read `.env`.

Reference: https://www.zoho.com/mail/help/zoho-smtp.html

Validation, a honeypot, an origin check and a bounded per-instance throttle are included. For a multi-instance/serverless deployment, also configure a hosting firewall rate limit on POST `/api/contact`; the in-memory throttle is not shared across instances. No automatic acknowledgement is sent to arbitrary visitor addresses.

Run `node --test tests/enquiry.test.mjs` for validation and message-routing checks. Live SMTP delivery requires the private credentials and should be verified with one enquiry after deployment. Failed submissions retain the visitor’s form details and never show success.
