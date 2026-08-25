export interface Doctor {
  name: string;
  credentials: string;
  specialty: string;
  image: string;
  bio: string;
}

export const doctors: Doctor[] = [
  {
    name: "Dr. Bhupesh Mukhija",
    credentials: "B.D.S., M.D.S.",
    specialty: "Endodontist",
    image: "/images/doctors/dr-bhupesh-mukhija.jpg",
    bio: "Specialist in Single Sitting Root Canal Treatment, Crowns, Bridges and Full Mouth Rehabilitation with precision planning and care.",
  },
  {
    name: "Dr. Shikha Mukhija",
    credentials: "B.D.S., M.D.S.",
    specialty: "Periodontist & Implantologist",
    image: "/images/doctors/dr-shikha-mukhija.jpg",
    bio: "Specializes in Gum Care, Implants and Smile Makeover with a gentle patient-first approach.",
  },
];

export interface ServiceItem {
  title: string;
  description: string;
  href: string;
  image: string;
  alt?: string;
}

export const allServices: ServiceItem[] = [
  { title: "Dental Implants", description: "Permanent tooth replacement with precision-planned implant treatment.", href: "/services/dental-implants/", image: "/images/clinic/gallery/dental-implants-before-after.jpeg", alt: "Dental implants before and after — full-arch dental implant treatment" },
  { title: "Cosmetic Dentistry", description: "Smile makeovers, veneers, and teeth whitening for a confident smile.", href: "/services/cosmetic-dentistry/", image: "/images/clinic/gallery/cosmetic-treatment.jpeg" },
  { title: "Gums Treatment", description: "Expert care for bleeding gums, gum disease, and laser gum procedures.", href: "/services/gums-treatment/", image: "/images/clinic/gallery/gum-treatment.jpeg" },
  { title: "Kids Dentistry", description: "Gentle pediatric dental care for children of all ages.", href: "/services/kids-dentistry/", image: "/images/clinic/gallery/paediatric-dentistry.jpeg" },
  { title: "Teeth Cleaning", description: "Professional scaling, polishing, and ultrasonic teeth cleaning.", href: "/services/teeth-cleaning/", image: "/images/clinic/gallery/teeth-cleaning-procedure.jpeg" },
  { title: "Orthodontics Treatment", description: "Braces, clear aligners, and Invisalign for straighter teeth.", href: "/services/orthodontics-treatment/", image: "/images/clinic/gallery/orthodontics.jpeg" },
  { title: "Maxillofacial Surgery", description: "Wisdom tooth removal and complex oral surgical procedures.", href: "/services/maxillofacial-surgery/", image: "/images/clinic/treatment/modern-treatment-room.jpeg" },
  { title: "Emergency Dentistry", description: "Urgent care for broken teeth, injuries, and dental emergencies.", href: "/services/emergency-dentistry/", image: "/images/clinic/gallery/treatment-broken-teeth.jpeg" },
  { title: "Crowns & Bridges", description: "Metal-free zirconia crowns and bridges for lasting restoration.", href: "/services/crowns-bridges/", image: "/images/clinic/gallery/crown-bridges-treatment.jpeg" },
  { title: "Root Canal Treatment", description: "Painless single-sitting RCT with microscopic precision.", href: "/services/root-canal/", image: "/images/clinic/gallery/single-sitting-rct.jpeg" },
  { title: "Oral Cancer Detection", description: "Early screening and detection for better treatment outcomes.", href: "/services/oral-cancer-detection/", image: "/images/clinic/gallery/oral-cancer-diagnosis.jpeg" },
  { title: "Painless Dental Treatment", description: "Comfort-first dentistry including painless root canal procedures.", href: "/services/painless-dental-treatment/", image: "/images/clinic/treatment/consultation-desk.jpeg" },
];

export interface TechnologyItem {
  title: string;
  description: string;
  image: string;
}

export const technologyItems: TechnologyItem[] = [
  { title: "Digital Panoramic X-Ray", description: "Full-mouth digital imaging for precise diagnosis and treatment planning.", image: "/images/clinic/gallery/single-sitting-rct.jpeg" },
  { title: "Modern Treatment Units", description: "State-of-the-art dental chairs with advanced instrument delivery systems.", image: "/images/clinic/treatment/modern-treatment-room.jpeg" },
  { title: "Digital Diagnostics", description: "In-house digital X-rays and OPG for faster, accurate diagnoses.", image: "/images/clinic/gallery/clinic-05.jpeg" },
  { title: "Microscopic Dentistry", description: "Precision root canal and restorative work under magnification.", image: "/images/clinic/gallery/clinic-10.jpeg" },
  { title: "Ultrasonic Cleaning", description: "Comfortable, thorough teeth cleaning with ultrasonic technology.", image: "/images/clinic/gallery/teeth-cleaning-procedure.jpeg" },
  { title: "Advanced Implant Planning", description: "Detailed imaging for precise dental implant placement.", image: "/images/clinic/gallery/clinic-08.jpeg" },
];

export const whyChooseUsPoints = [
  { title: "Comprehensive care under one roof", description: "From routine cleanings to complex maxillofacial surgery — all handled here." },
  { title: "Technology that actually matters", description: "Digital X-rays, microscopic dentistry, and ultrasonic cleaning for precise care." },
  { title: "Accessibility first", description: "Wheelchair-accessible parking and facilities for every patient." },
  { title: "Family dentist for all ages", description: "From toddlers to grandparents — care for every generation." },
];

export const mapEmbedUrl = "https://maps.google.com/maps?q=Mukhija+Dental+Clinic+Model+Town+Sonipat&output=embed";

export const smileMakeoverImage = "/images/clinic/gallery/clinic-19.jpeg";
