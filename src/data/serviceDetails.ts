export interface SubTreatment {
  title: string;
  description: string;
  image: string;
}

export const serviceSubTreatments: Record<string, SubTreatment[]> = {
  "dental-implants": [
    { title: "Single Tooth Implant", description: "Replace one missing tooth with a natural-looking implant.", image: "/images/clinic/gallery/single-tooth-implant.jpg" },
    { title: "Multiple Teeth Implants", description: "Restore several missing teeth with implant-supported solutions.", image: "/images/clinic/gallery/multiple-teeth-implants.jpg" },
    { title: "Full Arch Implants", description: "Complete smile restoration with full-arch implant treatment.", image: "/images/clinic/gallery/full-arch-implants.jpg" },
  ],
  "cosmetic-dentistry": [
    { title: "Smile Makeover", description: "Complete aesthetic transformation of your smile.", image: "/images/clinic/gallery/cosmetic-treatment.jpeg" },
    { title: "Teeth Whitening", description: "Professional whitening for a brighter, whiter smile.", image: "/images/clinic/gallery/Dental-Veneers.jpg" },
    { title: "Dental Veneers", description: "Thin porcelain shells for a flawless smile.", image: "/images/clinic/gallery/Teeth-Whitening.jpg" },
    { title: "Gap Closure", description: "Close unwanted spaces between teeth.", image: "/images/clinic/gallery/Gap-Closure.png" },
  ],
  "gums-treatment": [
    { title: "Deep Cleaning", description: "Remove plaque and tartar below the gum line.", image: "/images/clinic/gallery/Gum-Cleaning.webp" },
    { title: "Gum Surgery", description: "Surgical treatment for advanced gum disease.", image: "/images/services/gums-surgery-sonipat.jpg" },
    { title: "Electrocautery Gum Treatment", description: "Minimally invasive electrocautery gum procedures.", image: "/images/clinic/gallery/Electrocautery-Gum-Treatment.jpg" },
  ],
  "root-canal": [
    { title: "Single Sitting RCT", description: "Complete root canal in one comfortable visit.", image: "/images/clinic/gallery/single-sitting-rct.jpeg" },
    { title: "Re-RCT", description: "Retreatment of previously treated root canals.", image: "/images/clinic/gallery/single-sitting-rct.jpeg" },
    { title: "Rotary RCT", description: "Precision treatment with modern root canal systems.", image: "/images/clinic/treatment/modern-treatment-room.jpeg" },
  ],
};

export const defaultSubTreatments: SubTreatment[] = [
  { title: "Consultation", description: "Detailed examination and treatment planning.", image: "/images/clinic/treatment/consultation-desk.jpeg" },
  { title: "Diagnosis", description: "Digital X-rays and comprehensive assessment.", image: "/images/clinic/gallery/single-sitting-rct.jpeg" },
  { title: "Treatment", description: "Expert care using modern dental technology.", image: "/images/clinic/treatment/modern-treatment-room.jpeg" },
];

export function getSubTreatments(slug: string): SubTreatment[] {
  return serviceSubTreatments[slug] ?? defaultSubTreatments;
}

export const caseImages = [
  { src: "/images/clinic/gallery/cases/case-1.png", alt: "Dental treatment case 1" },
  { src: "/images/clinic/gallery/cases/case-2.png", alt: "Dental treatment case 2" },
  { src: "/images/clinic/gallery/cases/case-3.png", alt: "Dental treatment case 3" },
  { src: "/images/clinic/gallery/cases/case-4.png", alt: "Dental treatment case 4" },
  { src: "/images/clinic/gallery/cases/case-5.png", alt: "Dental treatment case 5" },
  { src: "/images/clinic/gallery/cases/case-6.png", alt: "Dental treatment case 6" },
  { src: "/images/clinic/gallery/cases/case-7.png", alt: "Dental treatment case 7" },
];

export const caseImagesByService: Record<string, { src: string; alt: string }[]> = {
  "dental-implants": [
    { src: "/images/clinic/gallery/clinic-18.jpeg", alt: "Missing and damaged teeth before implant treatment" },
    { src: "/images/clinic/gallery/clinic-19.jpeg", alt: "Teeth restored after implant treatment" },
    { src: "/images/clinic/gallery/clinic-21.jpeg", alt: "Gap from a missing tooth before implant placement" },
    { src: "/images/clinic/gallery/clinic-22.jpeg", alt: "Gap closed after implant-supported restoration" },
  ],
};

export function getCaseImages(slug: string) {
  return caseImagesByService[slug] ?? caseImages;
}
