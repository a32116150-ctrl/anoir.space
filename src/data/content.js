import { User, Phone, Mail, Globe, Instagram, Linkedin, Facebook, Video, PenTool, Monitor, Image, FileText } from 'lucide-react';

export const personalInfo = {
  name: "anoircherif.com",
  tagline: "Visual Creator & Motion Designer",
  location: "Nabeul, Tunisia",
  phone: "+216 25776900",
  email: "cherifanoir8@gmail.com",
  socials: [
    { name: "Website", url: "https://www.anoircherif.com", icon: Globe },
    { name: "Instagram", url: "https://www.instagram.com/anoir.cherif", icon: Instagram },
    { name: "LinkedIn", url: "https://tn.linkedin.com/in/anoir-cherif-768b89131", icon: Linkedin },
    { name: "Facebook", url: "https://www.facebook.com/anoir.cherif", icon: Facebook },
  ]
};

export const aboutMe = `Creative professional with over 7 years of experience in design and branding. I don't just edit videos; I craft visual experiences. From branding to motion design, I bring concepts to life.`;

export const experience = {
  current: [
    {
      company: "NOVO NORDISK",
      role: "Graphic Design & Motion Graphics",
      period: "2025",
      description: "Internal Campaign\nStoryboards\nAnimation"
    },
    {
      company: "Monoprix Tunisie",
      role: "Motion Designer",
      period: "Ramadan 2025",
      description: "Created motion graphics and visuals for a culinary web series."
    },
    {
      company: "E3mar Libya",
      role: "Motion Designer & Video Editor",
      period: "Sept 2024 - Jan 2025",
      description: "Produced motion graphics illustrating reconstruction projects in Libya."
    },
    {
      company: "Phenaks Media",
      role: "Co-Founder & CEO",
      period: "2022 - 2024",
      description: "Led creative projects and managed a design team."
    }
  ],
  past: [
    {
      company: "Carthage Dance Festival",
      role: "Motion Graphic Designer",
      period: "2023",
      description: "An annual festival celebrating contemporary dance and choreographic art in Tunisia.\nCreated logo animation, transitions, and animated assets for the editors."
    },
    {
      company: "International Festival of Hammamet",
      role: "Motion Designer",
      period: "2022 & 2023",
      description: "Annual festival of music and art held in Hammamet, Tunisia.\nWorked on two consecutive editions (56th & 57th).\nCreated logo animation, transitions, and animated assets for the editors."
    },
    {
      company: "Beppi Tunisie",
      role: "Graphic & Motion Designer",
      description: ""
    },
    {
      company: "Lupus Dev",
      role: "Concept creation and video realization",
      description: ""
    },
    {
      company: "Al Maraii Aliments",
      role: "Full brand identity and logo design",
      description: ""
    }
  ],
  branding: [
    {
      company: "Porcelaine Chocolate",
      role: "Logo & Visual Identity",
      period: "2025",
      description: "Created comprehensive brand identity and logo design."
    },
    {
      company: "Edlala",
      role: "Logo & Visual Identity",
      period: "Early 2025",
      description: "Developed brand visual system and logo."
    },
    {
      company: "Syla Concept",
      role: "Logo & Visual Identity",
      period: "2025",
      description: "Designed logo and visual identity elements."
    },
    {
      company: "CréaKids",
      role: "Logo & Visual Identity",
      period: "2024",
      description: "Crafted playful and engaging brand identity."
    },
    {
      company: "Lock&Key",
      role: "Logo & Visual Identity",
      period: "2024",
      description: "Designed modern and secure brand identity."
    }
  ]
};

export const services = [
  { id: 1, name: "Motion Design", icon: Video },
  { id: 2, name: "Video Editing", icon: Image },
  { id: 3, name: "Branding & Identity", icon: PenTool },
  { id: 4, name: "Graphic Design", icon: FileText },
  { id: 5, name: "Web Design (UI/UX)", icon: Monitor },
];
