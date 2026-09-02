# Proofreading & Content QA Report — Mukhija Dental Clinic Website

**Date:** 29 Aug 2026 · **Scope:** all 50 built pages, 43 page bodies in `src/data/page-content.json`, 5 blog posts in `src/data/blogs.ts`/`blog-body.json`, shared data (`site.ts`, `homepage.ts`, `pages.ts`, `serviceDetails.ts`, `videoTestimonials.ts`), and all page/component templates.
**Method:** per-page close reading (parallel reviewers), automated checks (doubled words, spacing, placeholders, misspellings, NAP facts), renderer analysis, and verification against the production build output in `dist/`.

---

## 1. Executive summary

| Area | Result |
|---|---|
| Spelling / typos | **Clean.** Zero doubled words, zero misspellings, no stray spaces before/after punctuation, no `[Insert…]` placeholders, no duplicated paragraphs found on any page. |
| Grammar / style | Mostly strong, conversational copy. ~60 isolated nits (see §5); no page-level problems. |
| **Structural rendering bugs** | **2 systemic issues corrupt how the content appears on the live site (§2).** Highest priority. |
| Factual claims | Several unverifiable/overreaching claims need owner confirmation (§3). |
| Consistency | Sonipat/Sonepat, UK/US spellings, and "clinic vs dental hospital" naming are mixed site-wide (§4). |
| Content gaps | Awards/Accreditation/Team pages make promises their copy doesn't keep (§6). |

Overall quality: the writing itself is in the top decile for local-business sites. The problems are almost entirely **rendering mechanics, claim verification, and consistency hygiene**, not prose.

---

## 2. Critical — content breaks before it reaches the reader

### C1. Every written FAQ is being silently dropped or rendered as raw scaffolding

The renderer (`src/utils/content.ts:29-48`) requires: section header exactly `Frequently Asked Questions`, question on its **own line ending in `?`**, answer on exactly **one following line**.

- **Variant A — 14 pages** (homepage + all 12 service pages + services overview): each FAQ line packs Q and A together (`"How long do composite veneers last compared to porcelain? Composite veneers typically last 5-7 years…"`). No line ends with `?`, so **all ~70 carefully written FAQs are dropped from the built HTML** and replaced on service pages by the generic homepage FAQs via fallback (`src/pages/services/[slug].astro:32`), which are then marked up as FAQPage schema **while not being visible on the page** — a Google FAQ-rich-result guideline violation (schema/visible-content mismatch).
- **Variant B — 14 location pages + `/locations/` + `/locations/sonipat/`**: headers say `Service FAQs` / `Location FAQs` (never detected), so raw `Q1: … A: …` text renders as ordinary paragraphs — **10 occurrences per page verified in `dist/`**. No accordion, no schema.

**Fix:** put every question on its own line ending `?`, answer on the next single line; use the exact header `Frequently Asked Questions` (or extend the parser); strip `Qn:/A:` prefixes.

### C2. Bullet and lead-in lines are being converted into bogus H2 headings

The heading heuristic (`content.ts:66-72`) makes any line <80 chars, starting uppercase, containing no `.`, an `<h2>` — **unless the line literally starts with `•` or `-`**, which most list lines in `page-content.json` do not. Every service-list item, triage bullet, symptom bullet and colon-ended lead-in becomes a stray heading (e.g. `"Dental Implants — a permanent, durable solution for missing teeth"`, `"Murthal"`, `"A few factors that shape the final cost of your veneer treatment:"`). Verified inflation in build output: cosmetic-dentistry renders 24 `<h2>`s, sector-15 renders 23. Affects ~30 pages, 80–100 lines.

**Fix:** prefix all list lines with `- ` (parser already handles it) and end colon-lead-ins with a period. Alternatively, make the heuristic require an explicit heading marker.

### C3. `src/data/blog-body.json` is a dead, stale, corrupted copy of the blog content

Nothing imports it (blogs render from `blogs.ts`), but it diverges dangerously from live content: blog 1 still contains the old capitalized service list; blogs 3–5 are truncated (closing sections + all FAQs lost; one FAQ stored with a broken `<li>properly.</li>`). Anyone proofreading or regenerating from this file will silently reintroduce dead copy.

**Fix:** delete it or regenerate it from `blogs.ts` as a build artifact.

---

## 3. Claims that need owner verification before publication

1. **"Dental hospital"** — used on homepage ("What Makes Us a Dental Hospital, Not Just a Clinic", "We use the term 'dental hospital' deliberately"), service overview, emergency, oral-cancer, clinic-tour, contact, technology, Sonipat + blog 1. Registered name is "Mukhija Dental & Implant Centre". If licensure doesn't support "hospital", standardize on **"full-service dental clinic"** (it also conflicts with the site's own FAQ copy "dental hospital in Sonipat" vs nav/footer "Clinic").
2. **Specialist coverage** — listed doctors are an **Endodontist** (Dr. Bhupesh) and a **Periodontist & Implantologist** (Dr. Shikha). Yet copy claims: "full maxillofacial surgery provider" (max-fax page, emergency page), "trusted as a **pediatric dentist** in Sonipat" (kids page), "a reliable **orthodontist** in Sonipat" (ortho page), "specialists across implants, orthodontics, maxillofacial surgery, pediatric care" (team page), "multispeciality setup… experts in dental surgery" (homepage). Confirm visiting specialists exist or soften each to "in-house team / with our orthodontic collaborators" style wording.
3. **Blog metadata overclaims** — blog 4 metaDescription says "from the **best orthodontist in Sonipat**" (see #2); blog 3 metaDescription promises "**Painless, single-sitting RCT**" while the article body itself warns "not every case qualifies for single sitting". Fix the meta to match the body's honesty.
4. **Teledentistry** — homepage has a full "Teledentistry Now Available" section (`index.astro:304`) with no supporting page anywhere. Confirm it's live, or add a landing page / remove.
5. **Laser dentistry tension** — homepage and services advertise "Laser Gum Treatment" and "laser dentistry", while the painless-treatment page refuses to confirm specific technology ("it's worth checking directly… techniques and available equipment can vary"). One of these is wrong.
6. **"Sector 35, Sonipat"** — the entire locality page describes a residential area ("technology-aware residential pockets", "Sector 35's many young families"). Verify this locality exists as searched; if not, the page is an optimized page for nothing.
7. **Awards & Accreditation specifics** — see §6; both pages hedge around naming anything.
8. **Google rating 4.8 / 150 reviews** (`site.ts:11-12`) — used in footer/homepage; keep refreshed.

---

## 4. Site-wide consistency

### 4.1 Sonipat vs Sonepat (369 occurrences in page copy)
Page bodies: **259 × Sonipat / 110 × Sonepat**. Convention that emerged: "Sonepat" in the physical address string ("Model Town, Sonepat, Haryana"), "Sonipat" in keyword prose — but the two are mixed **within single paragraphs** (e.g. homepage: "what people in Sonipat actually need… families across Sonepat, Murthal…"), and components clash too: `site.ts:10` address = Sonepat, footer = Sonipat, `GoogleMap.astro` = Sonepat, `index.astro:120-121` both spellings back-to-back.
**Recommendation:** one spelling in address/NAP (must match Google Business Profile exactly); if the alternate is kept for SEO, restrict it to one defined context (e.g. "also spelled Sonepat" once) — never mid-paragraph.

### 4.2 British vs American spellings
Service pages + blogs: dominant **US** (color, anesthesia, pediatric, recognize). Location-page boilerplate: **UK-leaning with US intrusions in the same file** — "travelling/neighbourhood" alongside "customized, minimize, recognizing, afterward, travel". Site-level split too: page-27/42 (neighbours, favour, décor) vs page-01 (sterilization, recognized).
**Recommendation:** pick Indian-English house style (UK forms: customise, minimise, travelling) and normalize the shared FAQ/boilerplate blocks once.

### 4.3 Recurring ungrammatical boilerplate (fix once, everywhere)
- **"Is there a nearest dental clinic option for [X] residents…"** — malformed superlative, on all 14 location pages. → "Is there a dental clinic near [X]…"
- **"Being a genuine family dentist [X] Sonipat residents can rely on…"** — keyword noun-pile (Jeevan Nagar, Omaxe, sectors 12/23/9/35…). → "a family dentist that [X] residents can rely on".
- **"a dentist/clinic near me" used in the clinic's own voice** (cases, clinic-tour, gallery, credibility, locations, technology, contact). A clinic cannot be "near me" to itself → "near you" or "in Sonipat".
- Title pattern drift on locality pages: some include ", Sonipat" in the H1 (15/20/22), others don't (04/17/21).

### 4.4 Data-layer nits
- `site.ts:131+135` — technologies list contains **"OPG Imaging" and "Panoramic Imaging" as separate items** with near-identical descriptions (also "Full-mouth" vs "Full mouth"). Dedupe.
- `site.ts:10` address is just "Model Town, Sonepat, Haryana, India" — no street line; fine if matching GBP, but `schema` NAP should include street + PIN.
- `videoTestimonials.ts` posters reference `…/braces-patient.jpg` & `happy-patient.jpg`; verify posters exist in the assets move (only `.mp4` files were in `public/images`; build succeeded, so posters likely resolve, but confirm they aren't blank).

---

## 5. Per-page copy issues (grammar / wording / rendering)

No spelling errors found anywhere. Items marked [R] = renderer misfire (C2) rather than a writing error.

### Service pages
| Page | Issues |
|---|---|
| Cosmetic Dentistry | [major] "color, shape, size, or **alignment appearance**" — garbled; [minor] "compromise **in** quality" → "on"; [R] ~10 bullet/lead-in lines become headings; ranges "5 to 7 years" vs "5-7" inconsistent. |
| Crowns & Bridges | [minor] "replaces a tooth (or teeth) that **are** already missing"; [minor] "buying a damaged tooth a second life" mixed metaphor; [R] bullets→headings. |
| Dental Implants | [minor] "The healing period afterward is **quiet**" → "uneventful"; [minor] "without a drop in quality" — unhedged overclaim vs cosmetic page's hedge; [R] bullets→headings. |
| Emergency Dentistry | [critical-claim] "Being a full-service **dental hospital**"; [major] maxillofacial capability claim (§3.2); [minor] "if you can… if possible" double hedge run-on; title "What **To** Do" title-case slip; [R] worst heading-misfire page (triage lists become 9 fake H2s). |
| Gum Treatment | [minor] "most **under-treated warning signs**" → "under-recognized warning signs"; [minor] "For early-stage gum disease (gingivitis): **This** usually…" ×3 resumptive structure; [R] 10 bullet→heading lines. |
| Kids Dentistry | [major] "trusted as a **pediatric dentist** in Sonipat" (§3.2); [minor] "a five **or** eight-year-old" → "five- or eight-year-old"; [major] FAQ Q contains a mid-question period ("…anxious about the dentist. Can you still treat them?"); [R] 6 bullets→headings. |
| Maxillofacial Surgery | [major] "As a **full maxillofacial surgery provider**" (§3.2); [minor] "prescribe appropriate pain **management**" → "medication"; [R] heaviest misfire exposure (~13 lines). |
| Oral Cancer Detection | [major] medical disclaimer sits **inside** FAQ block with no question — orphan; [minor] "the **roof and back of your throat**" → "roof of your mouth and back of your throat"; [minor] "full-service dental hospital" again; [R] all 9 symptom bullets→headings. |
| Orthodontics | [major] "a reliable **orthodontist** in Sonipat" (§3.2); [minor] "get treated as a cosmetic issue" → "are often treated as merely cosmetic"; "upfront"→"up front"; "easier to plan **for** precisely"; [minor] "20-22 hours" hyphen vs en dash. |
| Painless Dental Treatment | [major] "A Note on Technology and Comfort" paragraph is a pure hedge that refuses to say what the clinic uses — reads like unfinished copy (§3.5); [minor] single vs double quote marks mixed ('I forgot' vs "terrible root canal"); [minor] raw search queries unquoted ("searching for a painless dentist near me"); [minor] "RCT" used before first expansion. |
| Root Canal | [major] "we use modern root canal systems…, which **supports**" → "support"; [major] "Compared to many **countries**, treatment in India…" — faulty comparison → "than in most countries"; [minor] repeated "in these cases"; [R] symptom list→headings. |
| Teeth Cleaning | [minor] "it's **rarely** the uncomfortable experience people **sometimes** expect" — stacked hedges; [minor] "**maybe** some temporary sensitivity"; [note] title line is 95 chars — only page whose title escapes H2 render by length (fragile). |

### Core & practice pages
| Page | Issues |
|---|---|
| Homepage | [critical-claim] "Dental Hospital, Not Just a Clinic" section (§3.1); [major] "Root Canal Systems" listed as a *service* (it's equipment — also on services page); [major] areas list "Murthal / Kundli / Sector 35…" renders as 6 stray H2s; [minor] "sometimes literally in the same afternoon … all in one visit" — contradiction; [minor] "Whether you need a routine cleaning, **you're** dealing with…" broken parallelism; "A six-monthly checkup" (BrE intrusion); Sonipat/Sonepat 10/5. |
| Services overview | [major] "full-service dental hospital" ×2 + FAQ; [major] "Root Canal Systems" service again; [minor] "Gums Treatment & Bleeding Gums Treatment" — ungrammatical duplicate "Treatment" (also on homepage list); [minor] "Being recognized as a family dentist… isn't something we advertise **lightly**" — tangled logic; [minor] check-up/checkup drift. |
| Locations overview | [major] dangling modifier "As a dentist in Sonipat, our core patient base comes…"; [major] "making us a practical **dental clinic near me option nearby**" — garbled + redundant; both FAQ blocks raw-rendered (§2 B); mixed -ize vs neighbourhood/travelling. |
| Team of Specialists | [critical] body copy names **no doctors** and cites no credentials — reads as placeholder ("team members", "clinicians"); the two doctor cards render above it via component, but body must match (add bios, BDS/MDS, specialities); [major] "specialists across implants, orthodontics, maxillofacial surgery, pediatric care…" (§3.2); [major] "This structure means whatever brings you in … you're seeing someone" — missing "that,"; [minor] "modern anesthesia technique" → "techniques". |
| Technology | [major] "recommended as a reliable option **for** a genuinely painless RCT clinic" — garbled keyword sentence; [minor] "as much as the skill performing it" → "the clinician performing it"; [minor] "Being recognized as a proper dental hospital… comes down to the equipment" — backwards logic (same on clinic-tour). |
| Clinic Tour | [minor] "recognized as a dental hospital… rather than a small single-room clinic comes down to the equipment" — same backwards construction; "near me" POV clash ×2. |
| Cases | [minor] "searching for a trusted dentist **near me**"; [R] bullet-intro becomes heading. |
| Patient Gallery | [minor] "the same team and technology you'd be **working with**" → "receiving care with"; "near me" ×1. |
| Smile Analysis | [R] bullets starting "Are considering…" / "Haven't had…" become headings; otherwise clean. |
| Virtual Smile Makeover | [R] 3-line preview list becomes 3 fake headings; otherwise clean and the "not a binding promise" disclaimer is well handled. |
| Contact Us | [major] body copy contains **no phone/email/hours** — component renders them from `site.ts`, so not broken, but the copy's "feel free to call" works only thanks to the component; [major] NAP: "Model Town, **Sonepat**… from central **Sonipat**" mixed in one sentence; [minor] page body opens with no heading line. |
| Accreditation | [major] lists no verifiable registration numbers despite its own line about "real registration numbers" (§6); [minor] SEO-insider sentence "Here's where E-E-A-T comes in directly. Google's ranking systems…" — remove from patient-facing copy; [minor] favour/sterilization mix. |
| Awards & Recognition | [major] page claims "a growing list of recognitions" while refusing to list any — self-contradicting (§6); [minor] "a swollen jaw at 9 PM" example conflicts with posted hours (9:30–7:00). |
| Patient Testimonials | [major] "read the reviews below" — satisfied only by the TestimonialGrid component (6 static quotes); consider citing the actual "4.8★ / 150+ Google reviews" for credibility; [minor] "from first-time patients who put off visits**,** to families" — spurious comma; UK forms (neighbours, practising) differ from rest of site. |
| Video Testimonials | [minor] consent claim "every clip includes their first name and the locality" — verify both current clips do ("Arna" has no locality shown?); [minor] "getting their child comfortable with a dental clinic" — clunky. |

### Locality pages (14)
All are ~50–60% shared boilerplate (services list, first-visit section, "Choosing the Best Dental Clinic" questions, 10 FAQs) with genuinely localized intros and one or two local sections. Near-duplicate cluster: sectors 12/14/15/35 are closest clones; Jeevan Nagar ↔ Omaxe next. Risk: thin-content dilution; consider stronger per-area differentiation (landmarks, travel routes, community references) before scaling further.

Specific: **Murthal** — FAQ "Is there a nearest dental clinic option for Murthal **without travelling into Delhi**?" is a copy-paste leftover from the Kundli page (Murthal is north of Sonipat; Delhi angle is Kundli-specific). **[critical wrong-locality leftover — only one found]**
Other recurring: check-up/checkup drift within pages; "From/from" heading capitalization drift across the set; page-31 "the relationship built gradually, appointment by appointment" — missing auxiliary; page-34 "we don't refer patients out for anything beyond our scope" — logic inverted; page-35 "treated gently, **not efficiently**" — accidentally dismisses efficiency → "not just efficiently"; page-17 Kundli intro sentence never completes ("are realizing that once they find their way to us…" — realizing *what*?); page-20 "a clinic a few **sectors** away" — sector idiom doesn't fit Model Town.

### Blog posts (5)
Copy is well written and medically sound (avulsed-tooth "in milk, 30–60 min", first visit by age one, single-sitting caveats all correct). No prices quoted anywhere except blog 2's Rs. 20k–45k FAQ example (plausible, internally consistent). Real errors:
- blog 3 [major] metaDescription contradicts article's own caveat (§3.3). blog 4 [critical] meta "best orthodontist" (§3.3).
- blog 5 [major] same maxillofacial in-house claim (§3.2); [minor] "why an X-ray and in-person exam **matters**" → "matter" (real error, present in live `blogs.ts`); "bad breath that doesn't **go with** better brushing" → "doesn't improve despite".
- blog 2 [minor] comma splice "affordability shouldn't mean lower quality**,** it should mean…"; metaTitle lacks clinic brand; title promises "what you're actually paying" but body never anchors a price range.
- blog 1 [minor] "EEAT" → "E-E-A-T"; "wasn't fear of losing teeth it was finally finding…" comma splice (txt artifact only — check `blogs.ts`); repeated "dental hospital" ×2.
- All five: keyword-inserted phrasing "Teeth cleaning **cost near you** will vary" / "Crown and bridge **pricing near you**" reads machine-inserted → "in Sonipat".
- Metadata [minor] no `imageAlt` field; listing falls back to 90-char titles as alt text (`blog/index.astro:30`). Dates (Jul 10 – Aug 23, 2026) all sane.

---

## 6. Content gaps (pages that don't deliver their promise)

1. **Accreditation** — retitle or add real specifics (DCI/Haryana State Dental Council registration no., membership bodies, sterilization protocol standard). As written it claims verification but contains none, and even criticizes "self-declared" claims.
2. **Awards & Recognition** — either list actual awards or reframe as "Why patients recognize us" and change the page name; a recognition page with zero recognitions invites distrust.
3. **Team of Specialists body copy** — add both doctors by name, BDS/MDS, specialities, training, years; the page currently outsources its whole job to a shared component.
4. **Articles page** — promises "browse below"; confirm the blog index actually renders at/under it.
5. **Homepage "Root Canal Systems" / services overview service card** — equipment presented as a bookable service; merge into RCT.

---

## 7. Prioritized action list

| # | Action | Effort | Impact |
|---|---|---|---|
| 1 | Fix FAQ formatting (split Q lines; standardize header; strip `Qn:/A:`) across `page-content.json` | Medium | Restores ~200 FAQs + correct schema on 28 pages |
| 2 | Prefix list lines with `- ` / add terminal punctuation to bullet & lead-in lines | Medium | Removes 80–100 bogus H2s; fixes document outline |
| 3 | Resolve "dental hospital" + specialist/teledentistry/laser claims with the clinic (§3) | Low | Legal/trust risk |
| 4 | Decide Sonipat-vs-Sonepat rule; apply to `site.ts`, components, and mixed paragraphs | Low | NAP/local SEO consistency |
| 5 | Pick UK vs US house spelling; normalize location boilerplate + fix recurring ungrammatical sentences (§4.3) | Medium | Polish, one pass |
| 6 | Delete/regenerate `src/data/blog-body.json` | Trivial | Removes stale source of truth |
| 7 | Rewrite blog 3/4 metaDescriptions; blog 2 metaTitle; add `imageAlt` to posts | Low | SERP accuracy |
| 8 | Flesh out Team/Awards/Accreditation with real facts | Medium | E-E-A-T |
| 9 | Fix Murthal Delhi leftover; Sector 35 plausibility check; differentiate near-duplicate locality pages | Medium | Quality + rankings |
| 10 | Dedupe `technologies` in `site.ts` (OPG vs Panoramic); verify video posters | Low | Hygiene |
