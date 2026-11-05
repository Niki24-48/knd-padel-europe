# KND Padel Europe — SEO release and growth checklist

Updated 2026-11-05. Source of truth for code: `src/seo/routes.js`. The website is not considered indexed just because a build succeeds.

## Already implemented in code

- React SSG generated from the actual route components, client hydration for public pages, and client-only noindex 3D configurator.
- 47 canonical paths × ES/EN = **94 indexable output URLs** (including nine buying guides and the guide hub).
- Page titles, descriptions, Open Graph, Twitter metadata, canonical, hreflang, sitemap, robots and relevant JSON-LD.
- Contextual product-to-guide links, crawlable main-menu and footer links, accessible deep links and server-rendered bilingual core pages.
- Formspree delivery-confirmed lead events (these only transmit if GA4 / GTM is actually configured).
- Build tests: `npm run build`, `npm run verify:seo`, `npm run verify:journal`, `npm run verify:guides`, `npm run verify:ssg`, `npm run verify:courts`.
- `dist/` is generated on deployment and removed from Git version control.

## Launch blockers outside the repository

1. **Verify the real canonical domain.** Confirm `https://www.kndpadel.com` is the intended domain, resolves, has a valid TLS certificate, and that the apex domain redirects in one hop. Canonical, sitemap and schema use this URL. A successful Vercel deployment does not prove public DNS or indexing.
2. **Check production status codes.** Confirm `/`, `/en`, sample court, turf, roof, guide and Journal URLs return HTTP 200. Confirm aliases return 301/308 once, non-existent URLs return HTTP 404, and configurator returns noindex. Check rendered HTML with JavaScript disabled.
3. **Protect previews and test deployments.** Use Vercel Deployment Protection and/or environment-specific `X-Robots-Tag: noindex` headers. Never add global noindex to production.
4. **Connect Search Console and Bing Webmaster Tools.** Verify the canonical domain property, submit `/sitemap.xml`, review indexed pages, crawled-not-indexed, soft 404, canonical mismatches and international versions.
5. **Configure analytics with permission.** Link GA4 and/or GTM and consent handling as required. Verify `generate_lead` only fires on successful Formspree delivery. Test data in DebugView. Track qualified leads and closed deals separately from raw form submissions.
6. **Review legal disclosures.** The repository does not contain confirmed legal entity details, registration/tax identifiers, business address, DPO/rights contact, exact retention periods or cross-border transfer assessments. Do not fabricate these fields. A qualified reviewer should publish privacy/terms/cookies information reflecting actual processing, including Formspree.
7. **Validate content and visual rights.** Confirm which projects, imagery and technical specifications KND wishes to present as owned work. Do not publish unverified customer endorsements, warranty promises or performance figures.
8. **Measure mobile and desktop field performance.** Use PageSpeed Insights, CrUX and Web Vitals: LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1 at the 75th percentile. The repository includes large image and 3D assets; these are not equivalent to page-transfer measurements.
9. **Perform real browser QA.** Navigate the menus on mobile/desktop; test language switching and direct deep links; test configurator interactions; inspect Console for hydration warnings and route errors. Submit a test Formspree enquiry with test contact details.
10. **Publish editorial proofs.** Complete real ISO publication/update dates, author/reviewer when appropriate, original case-study images and technical evidence. Avoid fake review stars or invented price offers.

## After launch

- Inspect Search Console weekly: indexing changes, clicks, impressions, CTR, queries, countries and pages.
- Check leads weekly: successful Formspree submissions, qualified enquiries by product/country, lead-to-quote and quote-to-sale conversion.
- Review buying-guide intent monthly: cost, construction, panoramic comparison, club operations, hotels, roofs, turf, dimensions and lighting.
- Add external credibility through documented installations, clients' permitted testimonials, technical resources, professional associations and earned editorial links.
- Expand languages only after ES and EN pages are complete and target markets justify translation and support.

## Smoke-test examples

```sh
curl -I https://www.kndpadel.com/
curl -I https://www.kndpadel.com/en
curl -I https://www.kndpadel.com/guides/padel-court-cost
curl -I https://www.kndpadel.com/en/guides/padel-court-cost
curl -I https://www.kndpadel.com/an-unknown-test-path
curl -I https://www.kndpadel.com/why
curl https://www.kndpadel.com/sitemap.xml
curl -I https://www.kndpadel.com/configurator
```

**No external account actions have been completed by these code changes.** Domain activation, Google property verification and analytics account setup require authenticated access.
