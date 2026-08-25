export interface VideoTestimonial {
  name: string;
  treatment: string;
  location: string;
  videoSrc: string;
  poster: string;
  duration: string;
}

export const videoTestimonials: VideoTestimonial[] = [
  {
    name: "Arna",
    treatment: "Braces & Smile Transformation",
    location: "Model Town, Sonipat",
    videoSrc: "/images/clinic/video/testimonials/braces-patient.mp4",
    poster: "/images/clinic/video/testimonials/braces-patient.jpg",
    duration: "0:26",
  },
  {
    name: "Mr. Sandeep Chawla",
    treatment: "Comfortable, Fear-Free Dentistry",
    location: "Model Town, Sonipat",
    videoSrc: "/images/clinic/video/testimonials/happy-patient.mp4",
    poster: "/images/clinic/video/testimonials/happy-patient.jpg",
    duration: "1:11",
  },
];
