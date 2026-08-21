export interface ClinicImage {
  src: string;
  alt: string;
  category: "exterior" | "reception" | "treatment" | "gallery";
}

export const clinicImages: ClinicImage[] = [
  { src: "/images/clinic/exterior/clinic-front.webp", alt: "Mukhija Dental & Implant Centre exterior", category: "exterior" },
  { src: "/images/clinic/exterior/main-gate.webp", alt: "Clinic main gate entrance", category: "exterior" },
  { src: "/images/clinic/exterior/clinic-main-gate.webp", alt: "Clinic entrance gate", category: "exterior" },
  { src: "/images/clinic/exterior/clinic-board.webp", alt: "Mukhija Dental clinic signage", category: "exterior" },
  { src: "/images/clinic/exterior/entry-gate.jpeg", alt: "Clinic entry gate", category: "exterior" },
  { src: "/images/clinic/exterior/front-door.webp", alt: "Clinic front door", category: "exterior" },
  { src: "/images/clinic/exterior/entry-gate-new.jpeg", alt: "Clinic glass entrance with logo", category: "exterior" },
  { src: "/images/clinic/reception/reception-1.jpeg", alt: "Clinic reception and waiting area", category: "reception" },
  { src: "/images/clinic/reception/reception-2.png", alt: "Reception desk at Mukhija Dental", category: "reception" },
  { src: "/images/clinic/reception/reception-3.jpeg", alt: "Modern clinic reception with patients", category: "reception" },
  { src: "/images/clinic/reception/waiting-area-1.webp", alt: "Patient waiting area", category: "reception" },
  { src: "/images/clinic/reception/waiting-area-2.webp", alt: "Comfortable waiting room", category: "reception" },
  { src: "/images/clinic/reception/waiting-area-3.webp", alt: "Waiting area with patients", category: "reception" },
  { src: "/images/clinic/reception/waiting-area-4.webp", alt: "Spacious modern waiting area", category: "reception" },
  { src: "/images/clinic/reception/reception-legacy.png", alt: "Clinic reception area with dental implant banner", category: "reception" },
  { src: "/images/clinic/treatment/doctor-desk.jpeg", alt: "Doctor consultation desk", category: "treatment" },
  { src: "/images/clinic/treatment/doctor-table.webp", alt: "Modern treatment room", category: "treatment" },
  { src: "/images/clinic/treatment/patient-chair-1.png", alt: "Dental chair and equipment", category: "treatment" },
  { src: "/images/clinic/treatment/patient-chair-2.png", alt: "Patient treatment area", category: "treatment" },
  { src: "/images/clinic/treatment/consultation-desk.jpeg", alt: "Doctor consulting with patients", category: "treatment" },
  { src: "/images/clinic/treatment/treatment-room-1.png", alt: "Treatment room with dental equipment", category: "treatment" },
  { src: "/images/clinic/treatment/treatment-room-2.png", alt: "Modern multi-chair treatment room", category: "treatment" },
  { src: "/images/clinic/treatment/modern-treatment-room.jpeg", alt: "State-of-the-art treatment room", category: "treatment" },
  ...Array.from({ length: 22 }, (_, i) => ({
    src: `/images/clinic/gallery/clinic-${String(i + 1).padStart(2, "0")}.jpeg`,
    alt: `Mukhija Dental Clinic - Treatment photo ${i + 1}`,
    category: "gallery" as const,
  })),
  ...Array.from({ length: 21 }, (_, i) => ({
    src: `/images/clinic/gallery/clinic-${String(i + 23).padStart(2, "0")}.jpeg`,
    alt: `Mukhija Dental Clinic - Patient case ${i + 23}`,
    category: "gallery" as const,
  })),
];

export const heroSlides = [
  {
    image: "/images/clinic/exterior/clinic-front.webp",
    title: "Welcome to Mukhija Dental & Implant Centre",
    subtitle: "Best Dental Clinic in Sonipat — Model Town",
    description: "Comprehensive dental care for your whole family. Implants, braces, RCT & cosmetic dentistry under one roof.",
    cta: "Book Appointment",
    ctaLink: "/contact-us/",
  },
  {
    image: "/images/clinic/reception/reception-3.jpeg",
    title: "Modern, Patient-Friendly Clinic",
    subtitle: "Comfortable Waiting & Reception Area",
    description: "A clean, welcoming environment with wheelchair-accessible facilities and a team focused on your comfort.",
    cta: "Clinic Tour",
    ctaLink: "/clinic-tour/",
  },
  {
    image: "/images/clinic/treatment/modern-treatment-room.jpeg",
    title: "Advanced Dental Technology",
    subtitle: "Digital X-Rays & Microscopic Dentistry",
    description: "Precision diagnostics and minimally invasive treatments for the best possible results.",
    cta: "Our Technology",
    ctaLink: "/technology/",
  },
];

export const clinicVideo = "/images/clinic/video/clinic-tour.mp4";

export function getImagesByCategory(category: ClinicImage["category"]) {
  return clinicImages.filter((img) => img.category === category);
}

export const galleryCategories = [
  { id: "all", label: "All Photos" },
  { id: "exterior", label: "Exterior" },
  { id: "reception", label: "Reception & Waiting" },
  { id: "treatment", label: "Treatment Rooms" },
  { id: "gallery", label: "Procedures" },
] as const;
