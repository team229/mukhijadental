# Mukhija Dental & Implant Centre Website

A modern dental clinic website built with **Astro** and **React**, inspired by [delhidental.com](https://www.delhidental.com/).

## Tech Stack

- [Astro 7](https://astro.build) — static site generation with island architecture
- [React](https://react.dev) — interactive components (forms, carousels, sliders)
- [Tailwind CSS v4](https://tailwindcss.com) — styling

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321) in your browser.

## Build

```bash
npm run build
npm run preview
```

## Site Structure

| Section | URL |
|---------|-----|
| Homepage | `/` |
| Services | `/services/` |
| Service pages | `/services/[slug]/` |
| Team | `/team-of-specialists/` |
| Clinic Tour | `/clinic-tour/` |
| Technology | `/technology/` |
| Cases & Gallery | `/cases/`, `/patient-gallery/` |
| Credibility | `/credibility/` |
| Locations | `/locations/` |
| Contact | `/contact-us/` |

## Interactive React Components

- `HeroCarousel` — homepage hero slider
- `AppointmentForm` — booking form with procedure selection
- `TestimonialCarousel` — patient reviews carousel
- `BeforeAfterSlider` — drag-to-compare treatment results
- `MobileNav` — responsive mobile navigation

## Content

Page content is sourced from the provided Word documents in `reference/website-pages/` and stored in `src/data/page-content.json`. SEO meta tags are configured in `src/data/pages.ts`.

## Brand

- Primary: `#6b584c` (Dr. Mukhija's brown)
- Accent: `#0e7490` (teal)
- Logo: `public/logo.svg`
