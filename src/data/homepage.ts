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
  { title: "Dental Implants", description: "Permanent tooth replacement with precision-planned implant treatment.", href: "/services/dental-implants/", image: "/images/services/dental-implants.jpg", alt: "Dental implants — dentist placing a titanium implant in a modern operatory" },
  { title: "Cosmetic Dentistry", description: "Smile makeovers, veneers, and teeth whitening for a confident smile.", href: "/services/cosmetic-dentistry/", image: "/images/services/cosmetic-dentistry.jpg", alt: "Cosmetic dentistry — dentist applying a porcelain veneer" },
  { title: "Gums Treatment", description: "Expert care for bleeding gums, gum disease, and laser gum procedures.", href: "/services/gums-treatment/", image: "/images/services/gums-treatment.jpg", alt: "Gums treatment — laser gum procedure" },
  { title: "Kids Dentistry", description: "Gentle pediatric dental care for children of all ages.", href: "/services/kids-dentistry/", image: "/images/services/kids-dentistry.jpg", alt: "Kids dentistry — dentist showing a child a tooth model" },
  { title: "Teeth Cleaning", description: "Professional scaling, polishing, and ultrasonic teeth cleaning.", href: "/services/teeth-cleaning/", image: "/images/services/teeth-cleaning.jpg", alt: "Teeth cleaning — ultrasonic scaling procedure" },
  { title: "Orthodontics Treatment", description: "Braces, clear aligners, and Invisalign for straighter teeth.", href: "/services/orthodontics-treatment/", image: "/images/services/orthodontics.jpg", alt: "Orthodontics — clear aligner fitting" },
  { title: "Maxillofacial Surgery", description: "Wisdom tooth removal and complex oral surgical procedures.", href: "/services/maxillofacial-surgery/", image: "/images/services/maxillofacial-surgery.jpg", alt: "Maxillofacial surgery — oral surgical procedure" },
  { title: "Emergency Dentistry", description: "Urgent care for broken teeth, injuries, and dental emergencies.", href: "/services/emergency-dentistry/", image: "/images/services/emergency-dentistry.jpg", alt: "Emergency dentistry — examining a broken tooth" },
  { title: "Crowns & Bridges", description: "Metal-free zirconia crowns and bridges for lasting restoration.", href: "/services/crowns-bridges/", image: "/images/services/crowns-bridges.jpg", alt: "Crowns and bridges — placing a ceramic crown" },
  { title: "Root Canal Treatment", description: "Painless single-sitting RCT with microscopic precision.", href: "/services/root-canal/", image: "/images/services/root-canal.jpg", alt: "Root canal treatment — endodontic procedure" },
  { title: "Oral Cancer Detection", description: "Early screening and detection for better treatment outcomes.", href: "/services/oral-cancer-detection/", image: "/images/services/oral-cancer-detection.jpg", alt: "Oral cancer detection — mouth screening" },
  { title: "Painless Dental Treatment", description: "Comfort-first dentistry including painless root canal procedures.", href: "/services/painless-dental-treatment/", image: "/images/services/painless-dental-treatment.jpg", alt: "Painless dental treatment — relaxed patient consultation" },
];

export interface TechnologyItem {
  title: string;
  description: string;
  image: string;
  alt?: string;
}

export const technologyItems: TechnologyItem[] = [
  { title: "Digital Panoramic X-Ray", description: "Full-mouth digital imaging for precise diagnosis and treatment planning.", image: "/images/technology/panoramic-xray.jpg", alt: "Digital panoramic X-ray machine imaging a patient" },
  { title: "Modern Treatment Units", description: "State-of-the-art dental chairs with advanced instrument delivery systems.", image: "/images/technology/treatment-units.jpg", alt: "Sleek modern dental treatment chair unit" },
  { title: "Digital Diagnostics", description: "In-house digital X-rays and OPG for faster, accurate diagnoses.", image: "/images/technology/digital-diagnostics.jpg", alt: "Digital intraoral sensor with instant X-ray on monitor" },
  { title: "Microscopic Dentistry", description: "Precision root canal and restorative work under magnification.", image: "/images/technology/microscopic-dentistry.jpg", alt: "Dental operating microscope for precision dentistry" },
  { title: "Ultrasonic Cleaning", description: "Comfortable, thorough teeth cleaning with ultrasonic technology.", image: "/images/technology/ultrasonic-cleaning.jpg", alt: "Ultrasonic scaler gently cleaning teeth" },
  { title: "Advanced Implant Planning", description: "Detailed imaging for precise dental implant placement.", image: "/images/technology/implant-planning.jpg", alt: "3D implant planning software on monitor" },
];

export const whyChooseUsPoints = [
  { title: "Comprehensive care under one roof", description: "From routine cleanings to complex maxillofacial surgery — all handled here." },
  { title: "Technology that actually matters", description: "Digital X-rays, microscopic dentistry, and ultrasonic cleaning for precise care." },
  { title: "Accessibility first", description: "Wheelchair-accessible parking and facilities for every patient." },
  { title: "Family dentist for all ages", description: "From toddlers to grandparents — care for every generation." },
];

export const mapEmbedUrl = "https://maps.google.com/maps?q=Mukhija+Dental+Clinic+Model+Town+Sonipat&output=embed";

export const smileMakeoverImage = "/images/clinic/gallery/clinic-19.jpeg";
