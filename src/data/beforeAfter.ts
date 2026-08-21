export interface BeforeAfterCase {
  title: string;
  before: string;
  after: string;
}

/**
 * Before/after pairs from WhatsApp image naming convention:
 *   "(1)" or "(2)" suffix → before photo
 *   base filename (no suffix) → after photo from the same timestamp batch
 */
export const beforeAfterCases: BeforeAfterCase[] = [
  {
    title: "Smile Makeover",
    before: "/images/clinic/gallery/clinic-18.jpeg", // 12.59.55 (2) — chipped front teeth
    after: "/images/clinic/gallery/clinic-19.jpeg",  // 12.59.55 — restored crowns
  },
  {
    title: "Gap Closure",
    before: "/images/clinic/gallery/clinic-21.jpeg", // 13.00.56 (1)
    after: "/images/clinic/gallery/clinic-22.jpeg",  // 13.00.56
  },
  {
    title: "Teeth Whitening",
    before: "/images/clinic/gallery/clinic-06.jpeg", // 12.39.43 (1) — discoloured teeth
    after: "/images/clinic/gallery/clinic-07.jpeg",  // 12.39.43 — improved result
  },
  {
    title: "Teeth Cleaning",
    before: "/images/clinic/gallery/clinic-24.jpeg", // 12.58.13 — heavy staining
    after: "/images/clinic/gallery/clinic-25.jpeg",  // 12.58.14 — cleaned (same session)
  },
];
