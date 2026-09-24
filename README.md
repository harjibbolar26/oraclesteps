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

Nitro builds a Cloudflare module worker. `scripts/stage.mjs` stages the server and public assets under `dist` for Sites hosting. For other hosting, select a suitable Nitro preset and adapt the staging step.

## Content

- Shared project data: `data/projects.ts`
- Design tokens and responsive styles: `assets/css/main.css`
- Homepage, work, and enquiry routes: `pages/`
- Project screenshot component: `components/ProjectVisual.vue`

## Before public launch

- Connect the form to an email service with server-side validation, spam protection and rate limiting. The current form validates locally and offers an explicit mailto handoff. It never claims to send an enquiry.
- Review the draft privacy and terms information with the business owner.
- Replace the specified `https://oraclesteps.com/og-image.jpg` metadata URL with an available production image.
- Budget options currently use USD and can be changed in `pages/contact.vue`.
- Nuxt 3 was explicitly requested. Official Nuxt documentation states that it reached end of life on July 31, 2026. Plan a supported-version upgrade before a long-term public production launch.

The layout follows the supplied Figma template with Sansation and Lato. Project cards use browser screenshots of the actual websites. See DESIGN-STATUS.md for image sources and outstanding content.
