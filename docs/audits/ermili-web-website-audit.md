# Ermili Web — Website Audit

> Audit date: 27 August 2026
> Audited by: Claude (UX & Content Audit)
> Pages reviewed: 7 (EN home, FR home, EN projects, FR projects, robots/sitemap, plus `/privacy`, `/terms`, and a 404 probe)
> Site URL: https://ermiliweb.com

**Brief used for this audit**

- Product: personal freelance / studio portfolio
- Focal users: small and mid-size businesses hiring a designer-developer
- Desired perception: premium, craft-led, high-end digital studio
- Languages: English + French
- Deadline: none (quality pass, not a launch countdown)

---

## Executive Summary

The site already has a coherent premium *look*: a strong homepage arc (promise → person → work → process → FAQ → contact), bilingual copy, and a working contact form. That is more structure than most freelance portfolios.

Credibility is the real risk. The live domain is **ermiliweb.com**, but every page tells search engines and social platforms that the canonical site is **ermili.dev** — a hostname that does not resolve. Project cards promise a “Live Demo” and then go nowhere. One project is an empty frame. Screenshots include Logoipsum placeholders and visible typos. Brand naming jumps between Ermili Web, ermili.dev, and lowercase “ermili”. For an SMB buyer shopping a high-end studio, that reads as unfinished work, not craft.

Fix identity, proof, and conversion mechanics before polishing more motion. The design already sells “premium”; the content does not yet earn it.

---

## Critical Issues (fix before launch)

### 🔴 CRITICAL — Canonical and Open Graph URLs point at a dead domain

Every live page canonicalizes to `https://ermili.dev` (and `/fr`, `/projects`, `/fr/projects`). `ermili.dev` does not resolve in DNS. Sitemap and robots correctly use `ermiliweb.com`.

**Why it matters:** Google may treat ermiliweb.com as a duplicate of a missing site. Link previews send people to a broken URL. You are actively harming your own SEO and shareability.

**Fix:** Use one public brand domain everywhere (`https://ermiliweb.com`). Align `generateMetadata` in `app/[locale]/page.tsx` and `app/[locale]/projects/page.tsx` with the layout (`https://ermiliweb.com`). Keep email `@ermili.dev` if you want — that can stay a mail identity — but never as the canonical web origin unless the domain is live and redirected.

---

### 🔴 CRITICAL — “Selected projects” do not behave like real client work

Homepage shows four cards; `/projects` adds a fifth empty slot. Every card overlay says **Live Demo →**. None of the projects have a destination URL (they link to `#`). Atlas Studio has no screenshot — only a blank white rectangle.

The four screenshots look like concept / template heroes, not shipped products:

- SwiftForm includes **Logoipsum** partner marks and a badge reading **“Formation Complited”**.
- Qural’s logo strip is also Logoipsum.
- DevMode hero copy in the screenshot trails off at **“and drive.”**
- Meta description claims **corporate, e-commerce, and healthcare** work. None of the visible projects clearly match e-commerce or healthcare.

**Why it matters:** Premium buyers judge the portfolio in 10 seconds. Fake logos + “Live Demo” that does nothing is the fastest way to lose the positioning you want.

**Fix (pick one, then be consistent):**

1. **Best:** Only show work you can stand behind. Real URL, or a case-study page with problem / approach / result. No Logoipsum in the hero crop.
2. If these are personal concepts, label them honestly: “Concept” / “Spec work” — and **remove “Live Demo”** until a demo exists.
3. Rewrite the projects meta description to match what is actually on the page.

Suggested card treatment when a live URL exists:

- Overlay: `View live site →` (opens in a new tab with `rel="noopener noreferrer"`)
- Supporting line under the name: sector + one outcome, e.g. `Clinic website · enquiry form live in 3 weeks`

When there is no URL yet, do not use a link. Use a case-study page or omit the overlay.

---

### 🔴 CRITICAL — Brand name is not one brand

| Surface | What the visitor sees |
| --- | --- |
| Browser title / Open Graph | Ermili Web |
| Live domain | ermiliweb.com |
| Footer copyright | Ermili.dev |
| Portrait `alt` | ermili.dev |
| About bio (EN) | “my name is ermili” |
| Contact email | hello@ermili.dev |
| Mail subjects (internal) | ermili.dev |

**Why it matters:** High-end studios feel inevitable and named. This feels like two abandoned rebrands.

**Fix:** Choose a public name and stick to it.

Recommended public system:

- **Brand:** Ermili Web
- **Person:** Ermili (capital E) or your full name on About
- **Email:** can remain hello@ermili.dev if that inbox is what you monitor
- **Footer:** `© 2026 Ermili Web` — not Ermili.dev
- **Image alt:** `Portrait of Ermili, founder of Ermili Web`

If you prefer ermili.dev as the consumer brand, then the live domain, titles, and footer should all say that — and ermiliweb.com should 301 there. Do not mix.

---

### 🔴 CRITICAL — “Book a call” does not book a call

Nav, hero, and contact all use call language:

- Hero: **Book a Strategy Call**
- Nav: **Book a call**
- Contact secondary: **Book a call** → `#contactForm`

Clicking it scrolls to a message form. There is no calendar, no times, no confirmation of a call.

**Why it matters:** SMB owners click that button expecting a Calendly-style slot. Landing on a textarea feels like bait-and-switch and increases drop-off.

**Fix:** Either

- **A.** Wire the CTA to a real scheduler (Cal.com / Calendly) and keep the form as “Prefer to write?”, or
- **B.** Rename every instance to match the form.

If you keep the form-only flow:

| Original | Corrected |
| --- | --- |
| Book a Strategy Call | Start a project |
| Book a call | Send a message |
| Contact secondary “Book a call” | Jump to the form *(or remove it — the form is already beside the button)* |

Hero primary should still be the one conversion action. Do not offer two labels for the same scroll.

---

### 🔴 CRITICAL — Contact form collects personal data with no privacy policy

`/privacy` and `/terms` are 404. Footer has no legal links. French locale implies EU/Francophone visitors. The form collects name, email, optional phone, and a message.

**Why it matters:** This is both a trust gap and, for EU/UK/CA visitors, a compliance gap. Premium buyers notice missing legal pages.

**Fix:** Add short, real pages (not lorem):

- Privacy: what you collect, why, where it is emailed, how long you keep it, how to request deletion
- Optional: a one-line consent under the submit button — `By sending this form you agree to the privacy policy.`

Footer: Privacy · Email · LinkedIn. The footer currently only has a tagline and “Back to top”.

---

## Content & Copy Issues

### Homepage — English

**Hero H1**

- Original: `Your Website Should` / `Win You Clients.`
- Assessment: Clear and conversion-led. Keep the idea.
- 🟢 Tighten if you want more craft, without losing the promise:

| Original | Suggested |
| --- | --- |
| Your Website Should Win You Clients. | Your website should win the next client. |

**Hero body**

- Original: `I partner with growing businesses to replace outdated websites with premium digital experiences that build instant credibility and turn visitors into customers.`
- 🟡 IMPORTANT — “digital experiences” is agency filler. SMB owners hear “website”.

| Original | Suggested |
| --- | --- |
| …replace outdated websites with premium digital experiences that build instant credibility and turn visitors into customers. | …replace outdated sites with a sharp, credible website that makes the right people enquire. |

**Hero social line**

- Original: `Trusted by startups, clinics & growing businesses`
- 🔴 If you cannot name them, this reads as invented. There are no logos, quotes, or case metrics on the page.
- 💡 Either add 2–3 real names (with permission) or drop the line. Honest alternative: `Now booking a limited number of website projects`

**About bio**

- Original: `Hey, my name is ermili, website specialist and developer. I create high-end websites for businesses that want to look credible and grow online.`
- ⚠️ Grammar / casing: “ermili” should be a name. Missing article (“a website specialist”). Comma splice.

| Original | Suggested (same voice, first person) |
| --- | --- |
| my name is ermili, website specialist and developer. I create high-end websites for businesses that want to look credible and grow online. | I’m Ermili — a designer and developer. I build high-end websites for businesses that need to look credible and grow online. |

**About experience + CTA stack**

- Original experience: `With experience across design and development, I combine technical expertise with a strong design sensibility to build digital experiences that truly stand out.`
- Original closer: `Let's make your website something extraordinary!`
- 🟡 The two paragraphs say the same thing as the bio. “Truly stand out” / “extraordinary!” undercut the premium tone (exclamation + superlative).

| Original | Suggested |
| --- | --- |
| With experience across design and development… that truly stand out. | I design and build the site myself, so the look and the engineering stay in one pair of hands. |
| Let's make your website something extraordinary! | If your current site is costing you trust, let’s replace it. |

**About link**

- Original: `Learn more` → `/#contact`
- 🟡 That is not “more”. It is contact.

| Original | Suggested |
| --- | --- |
| Learn more | Get in touch |

**Projects heading**

- Original: `Websites crafted for brands that want to stand out.`
- 🟢 Fine, but it repeats “stand out” from About. Variant: `Recent work — sites built to look expensive and convert.`

**Project overlay**

- Original: `Live Demo`
- ⚠️ US-English “Demo” plus a `#` link. For this audience use `View site` only when a URL exists.

**Process**

- Copy is clear and matches a premium freelance process. Keep it.
- 🟢 The five steps never mention what *they* need to provide (brand assets, copy, access). One sentence under the subtitle would reduce “how much work is this for me?” anxiety:

> You stay involved at two checkpoints — direction and final review. I handle the rest.

**FAQ subtitle**

- Original: `Clear and helpful answers to all your inquiries.`
- ⚠️ “Inquiries” is stiff; “all your” overclaims (five questions).

| Original | Suggested |
| --- | --- |
| Clear and helpful answers to all your inquiries. | Straight answers before we start. |

**FAQ — CMS question**

- Original: `Absolutely. If your website includes a content management system (CMS), you'll be able to edit…`
- 🟡 “If” makes the yes feel like a maybe. SMB owners care about WordPress vs “you have to call me”.

| Original | Suggested |
| --- | --- |
| Absolutely. If your website includes a CMS… | Yes, when the project includes a CMS. You’ll edit pages, images, and posts yourself. If we agree on a static site instead, I’ll handle updates for you. |

**FAQ gaps (missing objections)**

SMB buyers typically ask: **What does it cost?** **Do you work with my industry?** **What do you need from me?** **Are you a team or one person?** None of these are answered.

**Contact title / subtitle**

- Original title: `Ready to move forward?` — assumes intent they may not have yet. Fine as a closer.
- Original subtitle: `If you're exploring a new website or want expert guidance, I'm here to help you make the right decision.`
- 🟡 “Expert guidance” / “the right decision” is coach-speak. They came to hire a website.

| Original | Suggested |
| --- | --- |
| If you're exploring a new website or want expert guidance, I'm here to help you make the right decision. | Tell me what the site needs to do. I’ll reply with whether I’m the right fit, a rough timeline, and next steps. |

**Contact form placeholder**

- `+1 (555) 000-0000` signals a US dummy. If you sell in French/North Africa/Europe, use a neutral hint: `Optional — include country code`

**Footer**

- Tagline `Built with Intent` — 🟢 on-brand, slightly cryptic. Keep if the rest of the identity is cleaned up.
- Statement: `Designing modern websites that help businesses grow.` — generic. Stronger: `Independent designer & developer. High-end websites for growing businesses.`

**Metadata description (EN)**

- Original: `High-end websites for brands that want to look credible, modern, and grow online.`
- ⚠️ Broken parallelism (adjectives + verb).

| Original | Suggested |
| --- | --- |
| …look credible, modern, and grow online. | High-end websites for businesses that need to look credible, feel modern, and grow online. |

---

### Homepage — French

Voice is mostly vous-to-reader / je-for-self, which is correct for FR-FR professional. Problems are title case (English habit), a broken trust line, and a few calques.

**Hero H1**

- Original: `Votre Site Devrait Vous` / `Faire Gagner des Clients`
- ⚠️ French does not title-case every word.

| Original | Suggested |
| --- | --- |
| Votre Site Devrait Vous Faire Gagner des Clients | Votre site devrait vous ramener des clients. |

**Hero body**

- Original: `Je m'associe aux entreprises en croissance pour remplacer les sites web obsolètes par des expériences numériques premium…`
- ⚠️ “Je m’associe” is a calque of “I partner”. “Expériences numériques” is the same filler as EN.

| Original | Suggested |
| --- | --- |
| Je m'associe aux entreprises en croissance pour remplacer les sites web obsolètes par des expériences numériques premium qui inspirent confiance et convertissent les visiteurs en clients. | J’aide les entreprises en croissance à remplacer un site daté par un site premium, crédible dès la première visite, conçu pour transformer les visiteurs en clients. |

**Hero trust line**

- Original: `La confiance des startups, cliniques et entreprises en croissance`
- ⚠️ This does not mean “Trusted by…”. It means “The trust of startups…”.

| Original | Suggested |
| --- | --- |
| La confiance des startups, cliniques et entreprises en croissance | Des startups, des cliniques et des PME en croissance me font confiance. |

(Only if true. Otherwise: `Places disponibles pour de nouveaux projets.`)

**CTAs (FR title case)**

| Original | Suggested |
| --- | --- |
| Réserver un Appel Stratégique | Réserver un appel (only if a calendar exists) / Démarrer un projet |
| Voir les Projets | Voir les projets |
| Projets Sélectionnés | Projets sélectionnés |

**About**

- Original: `Je m'appelle Ermili, spécialiste en développement de sites web.`
- 🟢 Name is correctly capitalised in FR (unlike EN). Good.
- 🟡 “spécialiste en développement” undersells design, which the English version claims.

| Original | Suggested |
| --- | --- |
| …spécialiste en développement de sites web. Je crée des sites web haut de gamme… | …designer et développeur. Je crée des sites haut de gamme… |

**About closer**

- Original: `Faisons de votre site web quelque chose d'extraordinaire !`
- Same premium-tone issue as EN.

| Original | Suggested |
| --- | --- |
| Faisons de votre site web quelque chose d'extraordinaire ! | Si votre site actuel vous coûte de la confiance, remplaçons-le. |

**Projects meta (FR)**

- Original: `sites corporate, e-commerce et plateformes santé`
- ⚠️ “Corporate” is an anglicism. And the grid does not show e-commerce or santé.

| Original | Suggested |
| --- | --- |
| Projets web sélectionnés par Ermili Web — sites corporate, e-commerce et plateformes santé conçus pour les marques ambitieuses. | Projets web d’Ermili Web — sites vitrine et plateformes conçus pour des marques exigeantes. |

(Update again once the actual industries are accurate.)

**Process / FAQ FR** are generally solid. Small polish:

| Original | Suggested |
| --- | --- |
| Des réponses claires et utiles à toutes vos interrogations. | Des réponses directes, avant de commencer. |
| Quel type de sites web construisez-vous ? | Quels types de sites concevez-vous ? *(matches “je conçois et développe” in the answer)* |

---

### Projects page (EN + FR)

**H1:** `Projects` / `Projets` — 🟡 too thin for a premium portfolio index. The homepage teaser heading is stronger than the dedicated page.

| Original | Suggested EN | Suggested FR |
| --- | --- | --- |
| Projects | Selected work | Projets sélectionnés |

Add a one-sentence sub: what kind of work, who it was for, what “selected” means.

**FAQ repeated** on `/projects` with **no contact section**. After the fifth empty-looking project, the page ends on accordion questions. 🟡 Dead end. Either add the contact block or a single CTA: `Start a project →` to `/#contact`.

**See all projects** on the homepage reveals one extra card (Atlas Studio) with no image. That CTA currently *reduces* perceived depth. Hide it until there are 6+ complete case studies, or make Atlas a real case.

---

## UX & Structure Issues

### Homepage narrative

The arc is right: promise → person → proof → method → objections → ask. Do not add more sections until proof is real.

Gaps in the arc:

1. **Proof is visual only** — no problem, constraint, or result. Cards are screenshots of heroes, so the visitor cannot tell if anything below the fold was designed.
2. **No self-selection.** “Startups, clinics & growing businesses” is a list, not a path. A clinic owner and a SaaS founder need different reassurance. Even two lines under the hero (“Company sites · clinics · local services”) would help.
3. **About vs Contact.** “Learn more” trains people that secondary links are decorative.
4. **Projects page** is a longer grid + the same FAQ. It does not deepen the story.

### Navigation

Clear. About / Process / FAQ / Contact are in-page anchors; Projects is a real route. That is fine.

Watchouts:

- From `/projects`, Process / FAQ / Contact jump back to the homepage hashes. Contact is easy to miss if the user expected a contact page.
- There is no way to reach Process from the projects URL without going home first (except the header). Acceptable, but the projects page should still offer a close.

### Footer

No sitemap, no legal, no secondary nav. On a one-page site this is a missed trust strip, not a directory problem.

### Mobile / cognitive load

Long motion-heavy sections (hero logo morph, process opacity, meet card fade) plus a custom cursor. Premium if it performs; risky if it jank-scrolls on mid-range phones. That is a production concern more than a copy concern: **test the About card** — text opacity is tied to scroll. If someone scrolls fast or prefers reduced motion off but has a short screen, they can miss the bio.

### 404

Default Next.js `404: This page could not be found.` No brand, no nav, no path home. Anyone hitting a bad share link leaves.

💡 Custom 404: short line + button to home + button to contact.

### Missing standard pages

No blog, no login (correct). Missing privacy (critical, above). No individual project routes (`/projects/swiftform` etc.).

---

## Conversion Issues

| Issue | Severity | Why |
| --- | --- | --- |
| CTA label ≠ destination | 🔴 | “Book a call” → form |
| No pricing signal at all | 🟡 | SMB buyers often bounce without a range. You do not need a table — a FAQ line is enough: “Most marketing sites land between X and Y. I’ll quote after a short call.” |
| Social proof has no evidence | 🔴 | “Trusted by…” with zero names |
| No testimonials / outcomes | 🟡 | Premium studios show one metric or one quote near the work |
| Objection “what does it cost / who is this for” missing | 🟡 | FAQ is all delivery mechanics |
| Projects page has no final CTA | 🟡 | Page stops on FAQ |
| Duplicate contact actions that do the same thing | 🟢 | Email button + form + “book call” to form |
| Phone field | 🟢 | Good that it is optional. Placeholder should not look fake. |

**Urgency / scarcity:** none used. Good — do not add fake “only 2 slots” unless it is true.

**Trust at the form:** Turnstile is present (good). Missing: response-time expectation (`I reply within one business day`), location/timezone, and privacy.

Suggested contact microcopy under the submit button:

> I read every message myself. You’ll get a reply within one business day — not a sales sequence.

FR:

> Je lis chaque message. Réponse sous un jour ouvré — pas de séquence commerciale.

---

## Content Improvements by Page

### Home

1. Lock the name (Ermili Web) and the one primary CTA.
2. Replace the trust ticker with either real proof or availability.
3. Rewrite About to one bio + one proof of working style (solo, design + code) + one link that means what it says.
4. Give each featured project a one-line caption (industry + what shipped).
5. Add two FAQ items: investment range, and “I am one person, not an agency” (that is a selling point for this brief).
6. Make the last screen: form + calendar *or* form only with honest labels.
7. Footer: legal + email.

### Projects

1. H1 + 40-word intro.
2. Kill empty Atlas card or finish it.
3. Case-study pages *or* honest “concept” labels; never “Live Demo” to `#`.
4. Close with contact CTA.
5. Stop repeating the full FAQ unless you add project-specific questions (`Can you match this style for my clinic?`).

### French locale

1. Sentence case on headings and buttons.
2. Fix the trust line translation before any other FR polish.
3. Keep vous for UI, je for About — already correct.

### Global chrome

1. Custom branded 404.
2. `og:image` — Twitter card is `summary_large_image` with **no image**. Shares will look empty.
3. Portrait `alt` text should describe the person, not the old domain.

---

## Technical Issues

| Item | Severity | Detail |
| --- | --- | --- |
| Canonical / hreflang / og:url → ermili.dev | 🔴 | Domain does not resolve. Sitemap still lists ermiliweb.com. Conflicting signals. |
| No `og:image` | 🟡 | `summary_large_image` without an image |
| `/privacy`, `/terms` | 🔴 / 🟡 | 404 (privacy is the serious one) |
| Project links `href="#"` | 🔴 | Overlay claims Live Demo |
| Atlas Studio missing `image` | 🟡 | Empty frame in the “full” portfolio |
| H1 split across two spans with no space | 🟡 | Source heading can read `Your Website ShouldWin You Clients` to assistive tech. Add a space or `aria-label` on the `h1`. Same for the About split heading. |
| Default Next 404 | 🟡 | Unbranded, though `noindex` is correct |
| Unused `content/faq.ts` vs `messages/*.json` | 🟢 | Duplicate source of truth; will drift |
| `content/site.ts` still branded ermili.dev | 🟡 | Titles/descriptions there can leak into mail or future pages |
| LinkedIn | ⚠️ | URL format looks valid (`/in/ermilimohamed/`). Automated fetch is blocked by LinkedIn (HTTP 999). Click-test it yourself. |
| Logo files | 🟢 | `/logo.png` and `/me-logo-origin.png` 200 on production (not in the git `public/` listing locally — confirm they are deployed on purpose, not only on Netlify). |
| Analytics + form | 🟢 | GA and Turnstile wired; out of copy scope |

**SEO titles:** Home title is strong. Projects title `Projects \| Ermili Web` is weak — include the promise: `Selected websites | Ermili Web`.

**hreflang:** Present but pointed at the dead host. After the domain fix, add `x-default` on the HTML head to match the sitemap.

**Duplicate content:** FAQ HTML is repeated on home and projects (intentional). Not a crawler disaster on a two-page site, but thin.

---

## Priority Action Plan

| Priority | Action | Type | Page |
| --- | --- | --- | --- |
| 🔴 1 | Point canonical, hreflang, and og:url at `https://ermiliweb.com` (or 301 the real domain to one live host) | Technical | All |
| 🔴 2 | Pick one public name; update footer, alts, bio, titles | Content | All |
| 🔴 3 | Remove “Live Demo” / `#` links; drop or finish Atlas; crop out Logoipsum / typos or relabel as concept | Portfolio | Home, Projects |
| 🔴 4 | Make “Book a call” true (calendar) or rename CTAs to the form | Conversion | Header, Home |
| 🔴 5 | Add privacy page + footer link; one consent line on the form | Legal / trust | Footer, Contact |
| 🟡 6 | Fix EN bio grammar; fix FR trust line and title case | Copy | Home EN/FR |
| 🟡 7 | Add `og:image`; branded 404; space/`aria-label` on split headings | Technical / a11y | Global |
| 🟡 8 | FAQ: price range + “solo specialist”; rewrite CMS “if” | Conversion | Home, Projects |
| 🟡 9 | Projects page intro + closing CTA; hide “See all” until the fifth project is real | UX | Projects, Home |
| 🟡 10 | Honest social proof or remove “Trusted by…” | Conversion | Hero |
| 🟢 11 | Project captions (industry + outcome); case-study URLs | Content | Projects |
| 🟢 12 | Footer tagline/statement polish; form response-time line | Copy | Footer, Contact |
| 🟢 13 | Delete or wire unused `content/faq.ts` | Hygiene | Codebase |

---

## What is already working

Do not throw these away while fixing the above.

- Homepage order is a real sales narrative, not a Dribbble dump.
- Process steps are specific and calm — they match a craft studio.
- Bilingual structure is in place; FR is not an afterthought dump of untranslated keys.
- Primary form is labelled, validated, and bot-protected.
- Visual hierarchy (eyebrow → heading → muted body) is consistent across sections.
- “Available” + pulse is a good freelance signal *if* it stays true.

The job is not to add more sections. It is to make the identity, the work, and the CTAs as considered as the layout.
