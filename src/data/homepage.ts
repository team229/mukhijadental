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
    image: "/images/doctors/dr-bhupesh-mukhija.jpg?v=2",
    bio: "Specialist in Single Sitting Root Canal Treatment, Crowns, Bridges and Full Mouth Rehabilitation with precision planning and care.",
  },
  {
    name: "Dr. Shikha Mukhija",
    credentials: "B.D.S., M.D.S.",
    specialty: "Periodontist & Implantologist",
    image: "/images/doctors/dr-shikha-mukhija.jpg?v=2",
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
  { title: "Dental Implants", description: "Permanent tooth replacement with precision-planned implant treatment.", href: "/services/dental-implants/", image: "/images/services/dental-implants.jpg?v=2", alt: "Dental implants — dentist placing a titanium implant in a modern operatory" },
  { title: "Cosmetic Dentistry", description: "Smile makeovers, veneers, and teeth whitening for a confident smile.", href: "/services/cosmetic-dentistry/", image: "/images/services/cosmetic-dentistry.jpg?v=2", alt: "Cosmetic dentistry — dentist applying a porcelain veneer" },
  { title: "Gums Treatment", description: "Expert care for bleeding gums, gum disease, and laser gum procedures.", href: "/services/gums-treatment/", image: "/images/services/gums-treatment.jpg?v=2", alt: "Gums treatment — laser gum procedure" },
  { title: "Kids Dentistry", description: "Gentle pediatric dental care for children of all ages.", href: "/services/kids-dentistry/", image: "/images/services/kids-dentistry.jpg?v=2", alt: "Kids dentistry — dentist showing a child a tooth model" },
  { title: "Teeth Cleaning", description: "Professional scaling, polishing, and ultrasonic teeth cleaning.", href: "/services/teeth-cleaning/", image: "/images/services/teeth-cleaning.jpg?v=2", alt: "Teeth cleaning — ultrasonic scaling procedure" },
  { title: "Orthodontics Treatment", description: "Braces, clear aligners, and Invisalign for straighter teeth.", href: "/services/orthodontics-treatment/", image: "/images/services/orthodontics-treatment-sonipat.jpg?v=1", alt: "Orthodontics — clear aligner fitting" },
  { title: "Maxillofacial Surgery", description: "Wisdom tooth removal and complex oral surgical procedures.", href: "/services/maxillofacial-surgery/", image: "/images/services/maxillofacial-surgery.jpg?v=2", alt: "Maxillofacial surgery — oral surgical procedure" },
  { title: "Emergency Dentistry", description: "Urgent care for broken teeth, injuries, and dental emergencies.", href: "/services/emergency-dentistry/", image: "/images/services/emergency-dentistry.jpg?v=2", alt: "Emergency dentistry — examining a broken tooth" },
  { title: "Crowns & Bridges", description: "Metal-free zirconia crowns and bridges for lasting restoration.", href: "/services/crowns-bridges/", image: "/images/services/crowns-bridges.jpg?v=2", alt: "Crowns and bridges — placing a ceramic crown" },
  { title: "Root Canal Treatment", description: "Painless single-sitting RCT with modern root canal systems.", href: "/services/root-canal/", image: "/images/services/root-canal.jpg?v=2", alt: "Root canal treatment — endodontic procedure" },
  { title: "Oral Cancer Detection", description: "Early screening and detection for better treatment outcomes.", href: "/services/oral-cancer-detection/", image: "/images/services/oral-cancer-detection.jpg?v=2", alt: "Oral cancer detection — mouth screening" },
  { title: "Painless Dental Treatment", description: "Comfort-first dentistry including painless root canal procedures.", href: "/services/painless-dental-treatment/", image: "/images/services/painless-dental-treatment.jpg?v=2", alt: "Painless dental treatment — relaxed patient consultation" },
];

export interface TechnologyItem {
  title: string;
  description: string;
  image: string;
  alt?: string;
}

export const technologyItems: TechnologyItem[] = [
  { title: "Digital X-Rays", description: "In-house digital dental and oral X-rays for faster, accurate diagnoses.", image: "/images/technology/digital-diagnostics.jpg?v=2", alt: "Digital intraoral X-ray sensor with instant image on monitor" },
  { title: "OPG Imaging", description: "Full-mouth digital panoramic imaging for comprehensive treatment planning.", image: "/images/technology/panoramic-xray.jpg?v=2", alt: "Digital OPG panoramic X-ray machine" },
  { title: "Root Canal Systems", description: "Modern root canal systems for precise, comfortable single-sitting RCT.", image: "/images/services/root-canal.jpg?v=2", alt: "Modern root canal treatment system" },
  { title: "Ultrasonic Cleaning", description: "Comfortable, thorough teeth cleaning with ultrasonic technology.", image: "/images/technology/ultrasonic-cleaning.jpg?v=2", alt: "Ultrasonic scaler gently cleaning teeth" },
];

export const whyChooseUsPoints = [
  { title: "Comprehensive care under one roof", description: "From routine cleanings to complex maxillofacial surgery — all handled here." },
  { title: "Technology that actually matters", description: "Digital X-rays, OPG, root canal systems, and ultrasonic cleaning for precise care." },
  { title: "Accessibility first", description: "Wheelchair-accessible parking and facilities for every patient." },
  { title: "Family dentist for all ages", description: "From toddlers to grandparents — care for every generation." },
];

export const mapEmbedUrl = "https://maps.google.com/maps?q=Mukhija+Dental+Clinic+Model+Town+Sonipat&output=embed";

export const smileMakeoverImage = "/images/clinic/gallery/clinic-19.jpeg";
