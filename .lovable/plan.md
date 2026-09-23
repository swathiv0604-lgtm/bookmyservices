# Catalog Image and Provider Integrity Fix

## Scope
- Preserve all 18 category cards and their existing category photography.
- Fix all 78 current service and sub-service listings without changing names, prices, ratings, reviews, durations, featured status, booking, payment, search, or navigation behavior.
- Keep the existing card and detail-page design unchanged.

## Implementation
1. Extract the previously generated service-specific scenes into 78 individual, consistently sized image assets in catalog order.
2. Add a centralized, typed service-slug-to-image mapping so each listing deterministically receives its own image instead of inheriting its category image.
3. Add development-time catalog integrity checks that fail clearly for a missing mapping, duplicate service slug, duplicate service image assignment, or missing category lookup.
4. Replace every fake provider value at the catalog source with the exact shared label `bookyourserviceconnect`; update generated descriptions so old provider names do not remain on detail pages or in search-visible data.
5. Keep category imagery separate from service imagery, ensuring main category cards and their service cards do not share image assets.
6. Retain lazy loading and `object-cover` behavior on cards; add explicit image dimensions to remaining catalog image renderers where needed to reduce layout movement without changing their visual layout.

## Verification
- Programmatically verify all 78 services have 78 distinct existing image files and the exact provider label.
- Search the full source tree for every former provider name and category-image fallback assignment.
- Exercise home featured cards, all-services, search, category, detail, related-services, and booking navigation in the live preview.
- Check desktop, tablet, and mobile sizes for broken images, overflow, cropping, and unchanged controls.
- Confirm no new console or runtime errors.

## Technical Details
- The four existing 1920×1920 contact sheets contain 21 square scenes each in a 5-column grid. Crops will be exported as optimized JPEGs with stable filenames derived from service slugs.
- `src/components/site/data.ts` remains the source of truth. Images will be assigned through one explicit mapping rather than `cat.image` fallback logic.
- Category images remain unique category-level assets; service detail pages and every `ServiceCard` consumer already read `service.image`, so fixing the source of truth updates every rendering path globally.
