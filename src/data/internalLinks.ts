/**
 * Internal linking map.
 *
 * Every entry is an EDITORIAL link decision: which page should point at which,
 * and with what descriptive anchor text. Kept as data (not scattered HTML) so
 * the structure can be reviewed and changed in one place, and so the audit can
 * verify it stays complete.
 *
 * Rules applied throughout:
 *   - links are contextual, never forced into unrelated copy
 *   - anchor text is descriptive and varies per page (no "click here", no
 *     repeated exact-match stuffing)
 *   - a page never links to itself
 *   - targets always exist (verified against the generated route table)
 */

export interface RelatedLink {
  href: string;
  label: string;
  /** Optional one-line note shown under the label. */
  note?: string;
}

export interface ServiceCluster {
  slug: string;
  /** Shown as the heading of the related-services block on service pages. */
  relatedServices: RelatedLink[];
  /** A blog post that supports this service, for topical depth. */
  relatedPosts: RelatedLink[];
}

/* ------------------------------------------------------------------ *
 * Service pages -> sibling services + a supporting article
 * ------------------------------------------------------------------ */

export const SERVICE_CLUSTERS: Record<string, ServiceCluster> = {
  "dental-implants": {
    slug: "dental-implants",
    relatedServices: [
      { href: "/services/crowns-bridges/", label: "Crowns & bridges", note: "The alternative when an implant isn't the right call" },
      { href: "/services/gums-treatment/", label: "Gums treatment", note: "Gum health has to be stable before an implant goes in" },
      { href: "/services/maxillofacial-surgery/", label: "Maxillofacial surgery", note: "For jaw and facial concerns, including grafts" },
      { href: "/services/oral-cancer-detection/", label: "Oral cancer screening", note: "Routine screening catches problems early" },
    ],
    relatedPosts: [
      { href: "/blog/dental-implant-cost-in-india-what-affects-price/", label: "What actually affects dental implant cost in India" },
      { href: "/blog/tooth-extraction-sonipat/", label: "What to expect before and after a tooth removal" },
    ],
  },
  "cosmetic-dentistry": {
    slug: "cosmetic-dentistry",
    relatedServices: [
      { href: "/services/crowns-bridges/", label: "Crowns & bridges", note: "Restoring damaged or missing teeth" },
      { href: "/services/orthodontics-treatment/", label: "Braces and aligners", note: "Alignment corrected before cosmetic work" },
      { href: "/services/teeth-cleaning/", label: "Teeth cleaning", note: "The groundwork for any smile makeover" },
      { href: "/services/kids-dentistry/", label: "Kids' dentistry", note: "Gentle care for younger patients" },
    ],
    relatedPosts: [
      { href: "/blog/braces-invisalign-smile-makeovers-sonipat/", label: "Braces, Invisalign and smile makeovers compared" },
    ],
  },
  "gums-treatment": {
    slug: "gums-treatment",
    relatedServices: [
      { href: "/services/teeth-cleaning/", label: "Ultrasonic teeth cleaning", note: "Removes the buildup that drives gum disease" },
      { href: "/services/root-canal/", label: "Root canal treatment", note: "For infection that has reached the tooth" },
      { href: "/services/crowns-bridges/", label: "Crowns & bridges", note: "Where a tooth needs rebuilding after gum treatment" },
      { href: "/services/oral-cancer-detection/", label: "Oral cancer screening", note: "Part of every thorough examination" },
    ],
    relatedPosts: [
      { href: "/blog/bleeding-gums-treatment-sonipat/", label: "Why bleeding gums are worth taking seriously" },
    ],
  },
  "kids-dentistry": {
    slug: "kids-dentistry",
    relatedServices: [
      { href: "/services/orthodontics-treatment/", label: "Braces for children", note: "Alignment and bite development" },
      { href: "/services/teeth-cleaning/", label: "Teeth cleaning", note: "Gentle cleaning for young teeth" },
      { href: "/services/emergency-dentistry/", label: "Emergency dentistry", note: "When a child hurts or knocks a tooth" },
      { href: "/services/oral-cancer-detection/", label: "Oral cancer screening", note: "Included in routine check-ups" },
    ],
    relatedPosts: [
      { href: "/blog/pediatric-dentist-sonipat/", label: "A practical guide to children's dental visits" },
    ],
  },
  "teeth-cleaning": {
    slug: "teeth-cleaning",
    relatedServices: [
      { href: "/services/gums-treatment/", label: "Gums treatment", note: "For bleeding or inflamed gums" },
      { href: "/services/root-canal/", label: "Root canal treatment", note: "When cleaning isn't enough" },
      { href: "/services/orthodontics-treatment/", label: "Braces and aligners", note: "Clean before and after orthodontic work" },
      { href: "/services/crowns-bridges/", label: "Crowns & bridges", note: "Protective restorations after cleaning" },
    ],
    relatedPosts: [
      { href: "/blog/tooth-sensitivity-sonipat/", label: "What causes sensitivity to hot and cold" },
    ],
  },
  "orthodontics-treatment": {
    slug: "orthodontics-treatment",
    relatedServices: [
      { href: "/services/cosmetic-dentistry/", label: "Cosmetic dentistry", note: "Whitening and veneers alongside alignment" },
      { href: "/services/kids-dentistry/", label: "Kids' dentistry", note: "Early checks on bite development" },
      { href: "/services/teeth-cleaning/", label: "Teeth cleaning", note: "Hygiene through long treatment" },
      { href: "/services/crowns-bridges/", label: "Crowns & bridges", note: "For teeth worn down over time" },
    ],
    relatedPosts: [
      { href: "/blog/braces-invisalign-smile-makeovers-sonipat/", label: "Which orthodontic option fits your life" },
    ],
  },
  "maxillofacial-surgery": {
    slug: "maxillofacial-surgery",
    relatedServices: [
      { href: "/services/emergency-dentistry/", label: "Emergency dentistry", note: "Trauma and urgent dental injuries" },
      { href: "/services/dental-implants/", label: "Dental implants", note: "Replacing a tooth lost to extraction" },
      { href: "/services/oral-cancer-detection/", label: "Oral cancer screening", note: "Checked before and after surgery" },
      { href: "/services/painless-dental-treatment/", label: "Comfort-focused treatment", note: "For anxious patients" },
    ],
    relatedPosts: [
      { href: "/blog/tooth-extraction-sonipat/", label: "What happens during a tooth extraction" },
    ],
  },
  "emergency-dentistry": {
    slug: "emergency-dentistry",
    relatedServices: [
      { href: "/services/root-canal/", label: "Root canal treatment", note: "The usual answer to severe tooth pain" },
      { href: "/services/maxillofacial-surgery/", label: "Maxillofacial surgery", note: "For fractures and complex oral injuries" },
      { href: "/services/crowns-bridges/", label: "Crowns & bridges", note: "Repairing a broken tooth properly" },
      { href: "/services/painless-dental-treatment/", label: "Comfort-focused treatment", note: "If you're anxious in an emergency" },
    ],
    relatedPosts: [
      { href: "/blog/urgent-everyday-dental-care-sonipat/", label: "What to do in a dental emergency" },
    ],
  },
  "crowns-bridges": {
    slug: "crowns-bridges",
    relatedServices: [
      { href: "/services/dental-implants/", label: "Dental implants", note: "The other way to replace a missing tooth" },
      { href: "/services/root-canal/", label: "Root canal treatment", note: "Often done before a crown is fitted" },
      { href: "/services/cosmetic-dentistry/", label: "Cosmetic dentistry", note: "Shade-matching for a natural look" },
      { href: "/services/gums-treatment/", label: "Gums treatment", note: "Gums need to be healthy first" },
    ],
    relatedPosts: [
      { href: "/blog/dental-treatment-cost-sonipat/", label: "What dental treatment costs in Sonipat" },
    ],
  },
  "root-canal": {
    slug: "root-canal",
    relatedServices: [
      { href: "/services/crowns-bridges/", label: "Crowns & bridges", note: "Protecting the treated tooth" },
      { href: "/services/emergency-dentistry/", label: "Emergency dentistry", note: "When the pain can't wait" },
      { href: "/services/painless-dental-treatment/", label: "Comfort-focused treatment", note: "For nervous patients" },
      { href: "/services/gums-treatment/", label: "Gums treatment", note: "If infection has spread" },
    ],
    relatedPosts: [
      { href: "/blog/root-canal-treatment-sonipat-symptoms-procedure-cost/", label: "Signs you need a root canal, and what it involves" },
    ],
  },
  "oral-cancer-detection": {
    slug: "oral-cancer-detection",
    relatedServices: [
      { href: "/services/maxillofacial-surgery/", label: "Maxillofacial surgery", note: "For anything that needs treating" },
      { href: "/services/gums-treatment/", label: "Gums treatment", note: "Sore gums and ulcers checked alongside" },
      { href: "/services/root-canal/", label: "Root canal treatment", note: "Dental infection is a separate concern" },
      { href: "/services/teeth-cleaning/", label: "Teeth cleaning", note: "Oral hygiene lowers risk" },
    ],
    relatedPosts: [
      { href: "/blog/bleeding-gums-treatment-sonipat/", label: "Mouth symptoms that should never be ignored" },
    ],
  },
  "painless-dental-treatment": {
    slug: "painless-dental-treatment",
    relatedServices: [
      { href: "/services/root-canal/", label: "Root canal treatment", note: "Single-sitting RCT under anaesthesia" },
      { href: "/services/emergency-dentistry/", label: "Emergency dentistry", note: "Urgent cases handled the same way" },
      { href: "/services/kids-dentistry/", label: "Kids' dentistry", note: "Building comfort early" },
      { href: "/services/maxillofacial-surgery/", label: "Maxillofacial surgery", note: "Surgical cases, explained first" },
    ],
    relatedPosts: [
      { href: "/blog/urgent-everyday-dental-care-sonipat/", label: "Coping with dental anxiety" },
    ],
  },
};

/* ------------------------------------------------------------------ *
 * Supporting pages that sit outside the main patient journey and need
 * their own pathways in, so they are not reachable only from site nav.
 * ------------------------------------------------------------------ */

export const SUPPORTING_PAGES: Record<string, RelatedLink[]> = {
  "/articles/": [
    { href: "/blog/", label: "Dental health blogs with cover images", note: "The same articles, with dates and photography." },
    { href: "/services/", label: "Every treatment we offer", note: "Start here if you are not sure which treatment applies." },
    { href: "/locations/", label: "Areas we serve", note: "Find the clinic closest to Sonipat, Murthal or Kundli." },
  ],
  "/locations/": [
    { href: "/services/", label: "All dental treatments", note: "What we treat, from cleaning to oral surgery." },
    { href: "/clinic-tour/", label: "Take a clinic tour", note: "See the facilities before you travel in." },
    { href: "/blog/best-dentist-in-sonipat/", label: "How to find the best dentist in Sonipat", note: "What to check when choosing a clinic." },
  ],
  "/smile-analysis/": [
    { href: "/services/cosmetic-dentistry/", label: "Cosmetic dentistry", note: "Where a smile analysis leads to treatment." },
    { href: "/cases/", label: "Real patient cases", note: "See comparable work before booking." },
    { href: "/blog/braces-invisalign-smile-makeovers-sonipat/", label: "Choosing a smile makeover option", note: "Compare aligners, braces and cosmetic work." },
  ],
  "/virtual-smile-makeover/": [
    { href: "/services/cosmetic-dentistry/", label: "Cosmetic dentistry", note: "The treatments a makeover preview can lead to." },
    { href: "/patient-gallery/", label: "Patient gallery", note: "Before and after results from real patients." },
    { href: "/cases/", label: "Real patient cases", note: "Detailed clinical work with privacy respected." },
  ],
  "/cases/": [
    { href: "/patient-gallery/", label: "Patient gallery", note: "Smile transformations in a single view." },
    { href: "/services/dental-implants/", label: "Dental implant cases", note: "What implant treatment involves." },
    { href: "/services/cosmetic-dentistry/", label: "Cosmetic dentistry", note: "Veneers, whitening and smile design." },
  ],
  "/clinic-tour/": [
    { href: "/technology/", label: "The technology we use", note: "Digital X-rays, OPG and rotary systems." },
    { href: "/services/", label: "Treatments available here", note: "What happens in each treatment room." },
    { href: "/contact-us/", label: "Book a visit", note: "Check hours and book an appointment." },
  ],
  "/patient-gallery/": [
    { href: "/cases/", label: "Detailed clinical cases", note: "Full case notes, not just photographs." },
    { href: "/services/orthodontics-treatment/", label: "Braces and aligners", note: "Alignment results from our orthodontic work." },
    { href: "/blog/braces-invisalign-smile-makeovers-sonipat/", label: "What to expect with braces or aligners", note: "Timelines and what fits your life." },
  ],
  "/services/": [
    { href: "/technology/", label: "Technology behind each treatment", note: "Imaging and systems used on site." },
    { href: "/team-of-specialists/", label: "Who performs which treatment", note: "Endodontist, periodontist and implantologist." },
    { href: "/blog/dental-treatment-cost-sonipat/", label: "What treatment costs", note: "How estimates work, before you commit." },
  ],
};

/* ------------------------------------------------------------------ *
 * Blog posts -> sibling articles + the service they support
 * ------------------------------------------------------------------ */

export interface BlogCluster {
  slug: string;
  relatedPosts: RelatedLink[];
  relatedServices: RelatedLink[];
}

export const BLOG_CLUSTERS: Record<string, BlogCluster> = {
  "dental-implant-cost-in-india-what-affects-price": {
    slug: "dental-implant-cost-in-india-what-affects-price",
    relatedPosts: [
      { href: "/blog/dental-treatment-cost-sonipat/", label: "A wider look at dental treatment costs in Sonipat" },
      { href: "/blog/dental-implant-cost-india/", label: "What you're actually paying for an implant in India" },
      { href: "/blog/tooth-extraction-sonipat/", label: "What to expect if a tooth has to come out" },
    ],
    relatedServices: [
      { href: "/services/dental-implants/", label: "Our dental implant service" },
      { href: "/team-of-specialists/", label: "The specialists who place implants" },
    ],
  },
  "root-canal-treatment-sonipat-symptoms-procedure-cost": {
    slug: "root-canal-treatment-sonipat-symptoms-procedure-cost",
    relatedPosts: [
      { href: "/blog/root-canal-treatment-sonipat/", label: "Why the fear of root canals is outdated" },
      { href: "/blog/dental-treatment-cost-sonipat/", label: "What dental treatment costs in Sonipat" },
      { href: "/blog/tooth-sensitivity-sonipat/", label: "Tooth sensitivity: causes and treatment" },
    ],
    relatedServices: [
      { href: "/services/root-canal/", label: "Our root canal treatment service" },
      { href: "/team-of-specialists/", label: "Meet the endodontist who performs RCT" },
    ],
  },
  "choose-best-dentist-sonipat": {
    slug: "choose-best-dentist-sonipat",
    relatedPosts: [
      { href: "/blog/best-dentist-in-sonipat/", label: "What to actually look for in a dentist" },
      { href: "/blog/dental-treatment-cost-sonipat/", label: "Understanding dental treatment costs" },
      { href: "/blog/bleeding-gums-treatment-sonipat/", label: "Bleeding gums: causes and when to see a dentist" },
    ],
    relatedServices: [
      { href: "/services/", label: "All the treatments we offer" },
      { href: "/team-of-specialists/", label: "Our team of specialists" },
    ],
  },
  "best-dentist-in-sonipat": {
    slug: "best-dentist-in-sonipat",
    relatedPosts: [
      { href: "/blog/choose-best-dentist-sonipat/", label: "A complete guide to choosing a dental clinic" },
      { href: "/blog/urgent-everyday-dental-care-sonipat/", label: "Urgent and everyday dental care" },
    ],
    relatedServices: [
      { href: "/technology/", label: "The technology we use" },
      { href: "/credibility/", label: "Why patients trust this clinic" },
    ],
  },
  "bleeding-gums-treatment-sonipat": {
    slug: "bleeding-gums-treatment-sonipat",
    relatedPosts: [
      { href: "/blog/tooth-sensitivity-sonipat/", label: "Sensitive teeth: causes and fixes" },
      { href: "/blog/urgent-everyday-dental-care-sonipat/", label: "Everyday dental care and what needs a dentist" },
      { href: "/blog/tooth-sensitivity-sonipat/", label: "Sensitive teeth and other early warnings" },
    ],
    relatedServices: [
      { href: "/services/gums-treatment/", label: "Gum disease treatment in Sonipat" },
      { href: "/services/teeth-cleaning/", label: "Ultrasonic teeth cleaning" },
    ],
  },
  "tooth-sensitivity-sonipat": {
    slug: "tooth-sensitivity-sonipat",
    relatedPosts: [
      { href: "/blog/bleeding-gums-treatment-sonipat/", label: "Bleeding gums: causes and treatment" },
      { href: "/blog/root-canal-treatment-sonipat/", label: "When sensitivity points to a deeper problem" },
    ],
    relatedServices: [
      { href: "/services/teeth-cleaning/", label: "Teeth cleaning and gum care" },
      { href: "/services/root-canal/", label: "Root canal treatment" },
    ],
  },
  "dental-treatment-cost-sonipat": {
    slug: "dental-treatment-cost-sonipat",
    relatedPosts: [
      { href: "/blog/dental-implant-cost-in-india-what-affects-price/", label: "What drives dental implant cost" },
      { href: "/blog/root-canal-treatment-sonipat-symptoms-procedure-cost/", label: "What affects root canal cost" },
      { href: "/blog/braces-invisalign-smile-makeovers-sonipat/", label: "Braces and Invisalign costs compared" },
    ],
    relatedServices: [
      { href: "/services/", label: "Every treatment we offer" },
      { href: "/contact-us/", label: "Book an examination for a written estimate" },
    ],
  },
  "urgent-everyday-dental-care-sonipat": {
    slug: "urgent-everyday-dental-care-sonipat",
    relatedPosts: [
      { href: "/blog/tooth-extraction-sonipat/", label: "What to expect from a tooth extraction" },
      { href: "/blog/pediatric-dentist-sonipat/", label: "Helping nervous children at the dentist" },
      { href: "/blog/bleeding-gums-treatment-sonipat/", label: "Bleeding gums and when to act" },
    ],
    relatedServices: [
      { href: "/services/emergency-dentistry/", label: "Emergency dentistry in Sonipat" },
      { href: "/services/kids-dentistry/", label: "Kids' dentistry" },
    ],
  },
  "braces-invisalign-smile-makeovers-sonipat": {
    slug: "braces-invisalign-smile-makeovers-sonipat",
    relatedPosts: [
      { href: "/blog/dental-treatment-cost-sonipat/", label: "What braces and aligners cost in Sonipat" },
      { href: "/blog/pediatric-dentist-sonipat/", label: "Orthodontics for growing children" },
    ],
    relatedServices: [
      { href: "/services/orthodontics-treatment/", label: "Braces and clear aligners" },
      { href: "/services/cosmetic-dentistry/", label: "Cosmetic dentistry and smile makeovers" },
    ],
  },
  "dental-implant-cost-india": {
    slug: "dental-implant-cost-india",
    relatedPosts: [
      { href: "/blog/dental-implant-cost-in-india-what-affects-price/", label: "A clearer breakdown of what sets the price" },
      { href: "/blog/dental-treatment-cost-sonipat/", label: "Sonipat treatment costs in context" },
    ],
    relatedServices: [
      { href: "/services/dental-implants/", label: "Dental implants at Mukhija Dental" },
      { href: "/locations/model-town-sonipat/", label: "Our Model Town clinic" },
    ],
  },
  "root-canal-treatment-sonipat": {
    slug: "root-canal-treatment-sonipat",
    relatedPosts: [
      { href: "/blog/root-canal-treatment-sonipat-symptoms-procedure-cost/", label: "The full guide to root canal treatment" },
      { href: "/blog/tooth-sensitivity-sonipat/", label: "Sensitivity before it becomes infection" },
      { href: "/blog/dental-treatment-cost-sonipat/", label: "What root canal treatment costs" },
    ],
    relatedServices: [
      { href: "/services/root-canal/", label: "Single sitting root canal treatment" },
      { href: "/locations/murthal-sonipat/", label: "Treatments for Murthal patients" },
    ],
  },
  "pediatric-dentist-sonipat": {
    slug: "pediatric-dentist-sonipat",
    relatedPosts: [
      { href: "/blog/braces-invisalign-smile-makeovers-sonipat/", label: "Braces for teenagers and adults" },
      { href: "/blog/urgent-everyday-dental-care-sonipat/", label: "Helping a scared child through a visit" },
    ],
    relatedServices: [
      { href: "/services/kids-dentistry/", label: "Kids' dentistry" },
      { href: "/services/orthodontics-treatment/", label: "Children's orthodontics" },
    ],
  },
  "tooth-extraction-sonipat": {
    slug: "tooth-extraction-sonipat",
    relatedPosts: [
      { href: "/blog/dental-implant-cost-in-india-what-affects-price/", label: "Replacing a tooth with an implant" },
      { href: "/blog/urgent-everyday-dental-care-sonipat/", label: "When an extraction can't wait" },
    ],
    relatedServices: [
      { href: "/services/maxillofacial-surgery/", label: "Maxillofacial surgery and extractions" },
      { href: "/services/dental-implants/", label: "Replacing a missing tooth" },
    ],
  },
};

/* ------------------------------------------------------------------ *
 * Location pages -> the services and articles that serve that area
 * ------------------------------------------------------------------ */

export interface LocationCluster {
  slug: string;
  relatedServices: RelatedLink[];
  relatedPosts: RelatedLink[];
  /** Nearby/other location pages, for multi-location context. */
  nearbyLocations: RelatedLink[];
}

export const LOCATION_CLUSTERS: Record<string, LocationCluster> = {
  sonipat: {
    slug: "sonipat",
    relatedServices: [
      { href: "/services/dental-implants/", label: "Dental implants in Sonipat" },
      { href: "/services/root-canal/", label: "Root canal treatment in Sonipat" },
      { href: "/services/orthodontics-treatment/", label: "Braces and aligners in Sonipat" },
      { href: "/services/kids-dentistry/", label: "Kids' dentistry in Sonipat" },
    ],
    relatedPosts: [
      { href: "/blog/best-dentist-in-sonipat/", label: "How to find the best dentist in Sonipat" },
      { href: "/blog/dental-treatment-cost-sonipat/", label: "What dental treatment costs in Sonipat" },
    ],
    nearbyLocations: [
      { href: "/locations/model-town-sonipat/", label: "Model Town" },
      { href: "/locations/murthal-sonipat/", label: "Murthal" },
      { href: "/locations/kundli-sonipat/", label: "Kundli" },
    ],
  },
  "model-town-sonipat": {
    slug: "model-town-sonipat",
    relatedServices: [
      { href: "/services/dental-implants/", label: "Dental implants in Model Town" },
      { href: "/services/gums-treatment/", label: "Gum treatment in Model Town" },
      { href: "/services/teeth-cleaning/", label: "Teeth cleaning in Model Town" },
    ],
    relatedPosts: [
      { href: "/blog/choose-best-dentist-sonipat/", label: "Choosing a dentist in Sonipat" },
      { href: "/blog/bleeding-gums-treatment-sonipat/", label: "Bleeding gums treatment" },
    ],
    nearbyLocations: [
      { href: "/locations/sonipat/", label: "Sonipat" },
      { href: "/locations/murthal-sonipat/", label: "Murthal" },
      { href: "/locations/sector-12-sonipat/", label: "Sector 12" },
    ],
  },
  "murthal-sonipat": {
    slug: "murthal-sonipat",
    relatedServices: [
      { href: "/services/kids-dentistry/", label: "Kids' dentistry for Murthal families" },
      { href: "/services/orthodontics-treatment/", label: "Braces for Murthal students" },
      { href: "/services/dental-implants/", label: "Dental implants in Murthal" },
      { href: "/services/crowns-bridges/", label: "Crowns & bridges in Murthal" },
    ],
    relatedPosts: [
      { href: "/blog/root-canal-treatment-sonipat-symptoms-procedure-cost/", label: "Root canal treatment explained" },
      { href: "/blog/urgent-everyday-dental-care-sonipat/", label: "Urgent dental care for Murthal" },
    ],
    nearbyLocations: [
      { href: "/locations/sonipat/", label: "Sonipat" },
      { href: "/locations/kundli-sonipat/", label: "Kundli" },
      { href: "/locations/model-town-sonipat/", label: "Model Town" },
    ],
  },
  "kundli-sonipat": {
    slug: "kundli-sonipat",
    relatedServices: [
      { href: "/services/dental-implants/", label: "Dental implants for Kundli patients" },
      { href: "/services/root-canal/", label: "Root canal treatment in Kundli" },
      { href: "/services/maxillofacial-surgery/", label: "Oral surgery without a Delhi detour" },
      { href: "/services/painless-dental-treatment/", label: "Comfort-focused dentistry" },
    ],
    relatedPosts: [
      { href: "/blog/choose-best-dentist-sonipat/", label: "Choosing a dentist near Kundli" },
      { href: "/blog/dental-implant-cost-in-india-what-affects-price/", label: "What implants cost in India" },
    ],
    nearbyLocations: [
      { href: "/locations/sonipat/", label: "Sonipat" },
      { href: "/locations/murthal-sonipat/", label: "Murthal" },
      { href: "/locations/sector-14-sonipat/", label: "Sector 14" },
    ],
  },
  "sector-8-sonipat": {
    slug: "sector-8-sonipat",
    relatedServices: [
      { href: "/services/kids-dentistry/", label: "Kids' dentistry in Sector 8" },
      { href: "/services/dental-implants/", label: "Dental implants in Sector 8" },
      { href: "/services/root-canal/", label: "Root canal treatment in Sector 8" },
    ],
    relatedPosts: [
      { href: "/blog/pediatric-dentist-sonipat/", label: "A parent's guide to children's dentistry" },
      { href: "/blog/choose-best-dentist-sonipat/", label: "Choosing a dentist in Sonipat" },
    ],
    nearbyLocations: [
      { href: "/locations/sector-9-sonipat/", label: "Sector 9" },
      { href: "/locations/sector-12-sonipat/", label: "Sector 12" },
      { href: "/locations/sonipat/", label: "Sonipat" },
    ],
  },
  "sector-9-sonipat": {
    slug: "sector-9-sonipat",
    relatedServices: [
      { href: "/services/gums-treatment/", label: "Gum care for Sector 9 seniors" },
      { href: "/services/teeth-cleaning/", label: "Teeth cleaning in Sector 9" },
      { href: "/services/emergency-dentistry/", label: "Emergency dentistry in Sector 9" },
    ],
    relatedPosts: [
      { href: "/blog/bleeding-gums-treatment-sonipat/", label: "Bleeding gums and gum disease" },
      { href: "/blog/tooth-sensitivity-sonipat/", label: "Sensitive teeth explained" },
    ],
    nearbyLocations: [
      { href: "/locations/sector-8-sonipat/", label: "Sector 8" },
      { href: "/locations/sector-12-sonipat/", label: "Sector 12" },
      { href: "/locations/sonipat/", label: "Sonipat" },
    ],
  },
  "sector-12-sonipat": {
    slug: "sector-12-sonipat",
    relatedServices: [
      { href: "/services/kids-dentistry/", label: "Kids' dentistry in Sector 12" },
      { href: "/services/teeth-cleaning/", label: "Preventive cleaning for Sector 12 families" },
      { href: "/services/orthodontics-treatment/", label: "Braces for Sector 12 teenagers" },
    ],
    relatedPosts: [
      { href: "/blog/pediatric-dentist-sonipat/", label: "Healthy teeth for growing children" },
      { href: "/blog/bleeding-gums-treatment-sonipat/", label: "Gum health at every age" },
    ],
    nearbyLocations: [
      { href: "/locations/sector-14-sonipat/", label: "Sector 14" },
      { href: "/locations/sector-15-sonipat/", label: "Sector 15" },
      { href: "/locations/sonipat/", label: "Sonipat" },
    ],
  },
  "sector-14-sonipat": {
    slug: "sector-14-sonipat",
    relatedServices: [
      { href: "/services/orthodontics-treatment/", label: "Orthodontic treatment in Sector 14" },
      { href: "/services/kids-dentistry/", label: "Kids' dentistry in Sector 14" },
      { href: "/services/cosmetic-dentistry/", label: "Cosmetic dentistry in Sector 14" },
    ],
    relatedPosts: [
      { href: "/blog/braces-invisalign-smile-makeovers-sonipat/", label: "Choosing between braces and aligners" },
      { href: "/blog/dental-treatment-cost-sonipat/", label: "What treatment costs in Sonipat" },
    ],
    nearbyLocations: [
      { href: "/locations/sector-12-sonipat/", label: "Sector 12" },
      { href: "/locations/sector-15-sonipat/", label: "Sector 15" },
      { href: "/locations/sonipat/", label: "Sonipat" },
    ],
  },
  "sector-15-sonipat": {
    slug: "sector-15-sonipat",
    relatedServices: [
      { href: "/services/kids-dentistry/", label: "Kids' dentistry in Sector 15" },
      { href: "/services/emergency-dentistry/", label: "Emergency dentistry in Sector 15" },
      { href: "/services/dental-implants/", label: "Dental implants in Sector 15" },
    ],
    relatedPosts: [
      { href: "/blog/urgent-everyday-dental-care-sonipat/", label: "Urgent dental care explained" },
      { href: "/blog/pediatric-dentist-sonipat/", label: "Making children's visits easier" },
    ],
    nearbyLocations: [
      { href: "/locations/sector-14-sonipat/", label: "Sector 14" },
      { href: "/locations/sector-23-sonipat/", label: "Sector 23" },
      { href: "/locations/sonipat/", label: "Sonipat" },
    ],
  },
  "sector-23-sonipat": {
    slug: "sector-23-sonipat",
    relatedServices: [
      { href: "/services/dental-implants/", label: "Dental implants in Sector 23" },
      { href: "/services/gums-treatment/", label: "Gum treatment in Sector 23" },
      { href: "/services/maxillofacial-surgery/", label: "Oral surgery in Sector 23" },
    ],
    relatedPosts: [
      { href: "/blog/root-canal-treatment-sonipat-symptoms-procedure-cost/", label: "Signs you need root canal treatment" },
      { href: "/blog/dental-implant-cost-in-india-what-affects-price/", label: "Comparing implant quotes" },
    ],
    nearbyLocations: [
      { href: "/locations/sector-15-sonipat/", label: "Sector 15" },
      { href: "/locations/sector-35-sonipat/", label: "Sector 35" },
      { href: "/locations/sonipat/", label: "Sonipat" },
    ],
  },
  "sector-35-sonipat": {
    slug: "sector-35-sonipat",
    relatedServices: [
      { href: "/services/dental-implants/", label: "Dental implants in Sector 35" },
      { href: "/services/cosmetic-dentistry/", label: "Cosmetic dentistry in Sector 35" },
      { href: "/services/teeth-cleaning/", label: "Teeth cleaning in Sector 35" },
    ],
    relatedPosts: [
      { href: "/blog/braces-invisalign-smile-makeovers-sonipat/", label: "Smile makeovers in Sonipat" },
      { href: "/blog/dental-implant-cost-in-india-what-affects-price/", label: "Understanding implant pricing" },
    ],
    nearbyLocations: [
      { href: "/locations/sector-23-sonipat/", label: "Sector 23" },
      { href: "/locations/omaxe-city-sonipat/", label: "Omaxe City" },
      { href: "/locations/sonipat/", label: "Sonipat" },
    ],
  },
  "bayanpur-sonipat": {
    slug: "bayanpur-sonipat",
    relatedServices: [
      { href: "/services/teeth-cleaning/", label: "Teeth cleaning in Bayanpur" },
      { href: "/services/painless-dental-treatment/", label: "Gentle dentistry for nervous patients" },
      { href: "/services/root-canal/", label: "Root canal treatment in Bayanpur" },
    ],
    relatedPosts: [
      { href: "/blog/bleeding-gums-treatment-sonipat/", label: "Gum disease and how it's treated" },
      { href: "/blog/urgent-everyday-dental-care-sonipat/", label: "Making a first dental visit easier" },
    ],
    nearbyLocations: [
      { href: "/locations/sonipat/", label: "Sonipat" },
      { href: "/locations/kundli-sonipat/", label: "Kundli" },
      { href: "/locations/jeevan-nagar-sonipat/", label: "Jeevan Nagar" },
    ],
  },
  "omaxe-city-sonipat": {
    slug: "omaxe-city-sonipat",
    relatedServices: [
      { href: "/services/dental-implants/", label: "Dental implants in Omaxe City" },
      { href: "/services/orthodontics-treatment/", label: "Braces and aligners in Omaxe City" },
      { href: "/services/kids-dentistry/", label: "Kids' dentistry in Omaxe City" },
      { href: "/services/crowns-bridges/", label: "Crowns & bridges in Omaxe City" },
    ],
    relatedPosts: [
      { href: "/blog/pediatric-dentist-sonipat/", label: "Dental care for families" },
      { href: "/blog/bleeding-gums-treatment-sonipat/", label: "Preventive gum care" },
    ],
    nearbyLocations: [
      { href: "/locations/jeevan-nagar-sonipat/", label: "Jeevan Nagar" },
      { href: "/locations/sector-35-sonipat/", label: "Sector 35" },
      { href: "/locations/sonipat/", label: "Sonipat" },
    ],
  },
  "jeevan-nagar-sonipat": {
    slug: "jeevan-nagar-sonipat",
    relatedServices: [
      { href: "/services/dental-implants/", label: "Dental implants in Jeevan Nagar" },
      { href: "/services/root-canal/", label: "Root canal treatment in Jeevan Nagar" },
      { href: "/services/gums-treatment/", label: "Gum treatment in Jeevan Nagar" },
    ],
    relatedPosts: [
      { href: "/blog/dental-implant-cost-in-india-what-affects-price/", label: "Implant costs explained" },
      { href: "/blog/tooth-extraction-sonipat/", label: "What to expect from an extraction" },
    ],
    nearbyLocations: [
      { href: "/locations/omaxe-city-sonipat/", label: "Omaxe City" },
      { href: "/locations/sonipat/", label: "Sonipat" },
      { href: "/locations/bayanpur-sonipat/", label: "Bayanpur" },
    ],
  },
};
