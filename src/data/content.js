import { User, Phone, Mail, Globe, Instagram, Linkedin, Facebook, Video, PenTool, Monitor, Image, FileText, Layers, Palette, Film, Scissors, Type, Camera, Zap, Star } from 'lucide-react';

export const personalInfo = {
  name: "anoircherif.com",
  fullName: "Anoir Cherif",
  tagline: "Visual Creator & Motion Designer",
  location: "Nabeul, Tunisia",
  phone: "+216 25776900",
  email: "cherifanoir8@gmail.com",
  yearsExperience: 7,
  projectsDelivered: 50,
  clientsServed: 20,
  bio: `Creative professional with over 7 years of experience in design and branding. Dedicated to contributing to dynamic and innovative teams through high-quality visual production, motion design, and creative direction.

From branding to motion design, from concept to delivery, I bring ideas to life with precision and creativity. My work spans international festivals, multinational corporations, and ambitious startups.`,
  bioShort: "Visual Creator & Motion Designer with 7+ years crafting compelling visual experiences for brands, festivals, and organizations across Tunisia and beyond.",
  socials: [
    { name: "Website", url: "https://www.anoircherif.com", icon: Globe },
    { name: "Instagram", url: "https://www.instagram.com/anoir.cherif", icon: Instagram },
    { name: "LinkedIn", url: "https://tn.linkedin.com/in/anoir-cherif-768b89131", icon: Linkedin },
    { name: "Facebook", url: "https://www.facebook.com/anoir.cherif", icon: Facebook },
  ]
};

export const aboutMe = `Creative professional with over 7 years of experience in design and branding. Dedicated to contributing to dynamic and innovative teams through high-quality visual production, motion design, and creative direction.`;

export const experience = {
  current: [
    {
      company: "Novo Nordisk (Morocco)",
      role: "Motion Designer & Video Editor",
      period: "Oct 2025 – March 2026",
      description: "Developed high-end internal communications and event openers using a hybrid AI-manual pipeline.\n\n• Directed AI tools including Kling and Google Veo to produce hyper-realistic video sequences.\n• Designed dynamic opening sequences in After Effects and performed final assembly in Premiere Pro.\n• Executed advanced retouching in Photoshop to maintain strict brand alignment and visual precision.",
      category: "motion",
      highlight: true
    },
    {
      company: "Freelance / Various Clients",
      role: "Director & Video Editor",
      period: "2021 – 2025",
      description: "Co-directed and edited multiple professional music videos and video clips.\n\n• Managed end-to-end post-production workflows, including color grading and rhythmic assembly.",
      category: "video",
      highlight: true
    },
    {
      company: "Monoprix Tunisie",
      role: "Motion Designer",
      period: "Ramadan 2025",
      description: "Conceived motion graphics, transitions, and visuals for a featured culinary web-series.\n\n• Ensured visual consistency with identity and marketing campaigns.",
      category: "motion",
      highlight: true
    },
    {
      company: "Al Maraii Aliments",
      role: "Branding & Logo Designer",
      period: "2025",
      description: "Developed complete visual identity and logo for a Tunisian food manufacturing company.\n\n• Created visual assets for packaging, distribution, and digital presence.",
      category: "branding"
    },
    {
      company: "E3mar Libya",
      role: "Motion Designer & Video Editor",
      period: "Sept 2024 – Jan 2025",
      description: "Produced motion graphics and videos illustrating reconstruction projects in Libya.\n\n• Created content for social media, official reports, and stakeholder presentations.",
      category: "motion"
    }
  ],
  past: [
    {
      company: "Journées Chorégraphiques de Carthage (Carthage Dance)",
      role: "Motion Designer",
      period: "2023",
      description: "Designed motion assets and promotional visuals for the international dance festival.",
      category: "motion",
      highlight: true
    },
    {
      company: "Festival International de Hammamet",
      role: "Motion Designer",
      period: "2022 – 2023",
      description: "Produced motion graphics and visual content for festival promotions and stage displays.",
      category: "motion",
      highlight: true
    },
    {
      company: "Phenaks Media",
      role: "Co-Founder & CEO",
      period: "2022 – 2024",
      description: "Directed creative projects and managed a team of designers for diverse clients.",
      category: "leadership",
      highlight: true
    },
    {
      company: "Beppi Tunisie",
      role: "Graphic & Motion Designer",
      period: "Feb 2020 – Jan 2021",
      description: "Created dynamic visuals and managed digital presence across various supports.",
      category: "design"
    },
    {
      company: "Lupus Dev",
      role: "Graphic & Motion Designer",
      period: "May 2019 – Feb 2020",
      description: "Developed creative concepts and produced video content under strict deadlines.",
      category: "video"
    },
    {
      company: "Retina Production",
      role: "Graphic Designer & Video Editor",
      period: "Oct 2017 – Apr 2018",
      description: "Created social media visuals and edited advertising videos in a collaborative environment.",
      category: "design"
    },
    {
      company: "Société Imprimerie Walid",
      role: "Graphic Designer",
      period: "May 2017 – Aug 2017",
      description: "Designed invitations, logos, business cards, and posters for print.",
      category: "design"
    }
  ],
  education: [
    {
      company: "Certificat en Cinématographie",
      role: "Elite Formation, Nabeul",
      period: "2019",
      description: "Education in cinematography.",
      category: "education",
      highlight: true
    },
    {
      company: "BTP en Multimédia",
      role: "Elite Formation, Tunis",
      period: "2017 – 2019",
      description: "Education in multimedia.",
      category: "education"
    }
  ]
};

// All experience items flattened for timeline
export const allExperience = [
  ...experience.current.map(e => ({ ...e, section: 'current' })),
  ...experience.past.map(e => ({ ...e, section: 'past' })),
  ...experience.education.map(e => ({ ...e, section: 'education' })),
];

export const services = [
  { id: 1, name: "Motion Design", icon: Video, description: "Bringing ideas to life through animation and visual storytelling" },
  { id: 2, name: "Video Editing", icon: Scissors, description: "Professional editing for commercials, social media, and events" },
  { id: 3, name: "Branding & Identity", icon: PenTool, description: "Creating memorable brand identities from logo to full guidelines" },
  { id: 4, name: "Graphic Design", icon: Layers, description: "Print and digital design that communicates and captivates" },
  { id: 5, name: "Web Design (UI/UX)", icon: Monitor, description: "Modern, user-centered web interfaces and experiences" },
];

export const skills = {
  software: [
    { name: "Adobe After Effects", level: 95, icon: "ae", category: "Motion" },
    { name: "Adobe Premiere Pro", level: 90, icon: "pr", category: "Video" },
    { name: "Adobe Photoshop", level: 88, icon: "ps", category: "Design" },
    { name: "Adobe Illustrator", level: 85, icon: "ai", category: "Design" },
    { name: "Figma", level: 80, icon: "fg", category: "UI/UX" },
    { name: "Kling / Google Veo", level: 85, icon: "ai", category: "AI Tools" },
    { name: "Gemini / Generative AI", level: 85, icon: "ai", category: "AI Tools" }
  ],
  expertise: [
    { name: "Motion Design", level: 95 },
    { name: "Video Production & Editing", level: 90 },
    { name: "Visual Identity & Branding", level: 88 },
    { name: "Logo Design", level: 85 },
    { name: "Typography", level: 82 },
    { name: "Web Design", level: 80 },
    { name: "Post-Production", level: 88 },
    { name: "Rhythmic Editing", level: 90 },
    { name: "AI Video Production", level: 85 },
    { name: "Generative AI Pipelines", level: 85 }
  ]
};

export const portfolioProjects = [
  {
    id: "proj-1",
    title: "Novo Nordisk Campaign",
    client: "Novo Nordisk",
    category: "motion",
    year: "2025",
    description: "Internal campaign motion graphics and storyboard animations for the pharmaceutical leader.",
    tags: ["Motion Design", "Storyboard", "Corporate"],
    color: "#0066cc",
  },
  {
    id: "proj-2",
    title: "Monoprix Ramadan Series",
    client: "Monoprix Tunisie",
    category: "motion",
    year: "2025",
    description: "Motion graphics and animated visuals for a culinary web series broadcast during Ramadan.",
    tags: ["Motion Design", "Social Media", "Food"],
    color: "#e63946",
  },
  {
    id: "proj-3",
    title: "Carthage Dance Festival",
    client: "Festival de la Danse de Carthage",
    category: "motion",
    year: "2023",
    description: "Logo animation, transitions, and animated assets for Tunisia's premier contemporary dance festival.",
    tags: ["Motion Design", "Festival", "Broadcast"],
    color: "#8338ec",
  },
  {
    id: "proj-4",
    title: "Hammamet Festival",
    client: "Festival International de Hammamet",
    category: "motion",
    year: "2022–2023",
    description: "Two consecutive editions of motion graphics for one of Tunisia's most prestigious cultural events.",
    tags: ["Motion Design", "Festival", "Culture"],
    color: "#ff6b35",
  },
  {
    id: "proj-5",
    title: "E3mar Libya",
    client: "E3mar Libya",
    category: "video",
    year: "2024–2025",
    description: "Documentary-style video content and infographic animations for reconstruction projects.",
    tags: ["Video Editing", "Infographics", "Documentary"],
    color: "#06d6a0",
  },
  {
    id: "proj-6",
    title: "Porcelaine Chocolate",
    client: "Porcelaine Chocolate",
    category: "branding",
    year: "2025",
    description: "Premium brand identity, logo design, and packaging concepts for a luxury chocolate brand.",
    tags: ["Branding", "Logo", "Packaging"],
    color: "#6d4c41",
  },
  {
    id: "proj-7",
    title: "CréaKids Identity",
    client: "CréaKids",
    category: "branding",
    year: "2024",
    description: "Playful and engaging brand identity for a children's creativity brand.",
    tags: ["Branding", "Logo", "Children"],
    color: "#ffd166",
  },
  {
    id: "proj-8",
    title: "Lock&Key Identity",
    client: "Lock&Key",
    category: "branding",
    year: "2024",
    description: "Modern, trustworthy brand identity with clever logo symbolism.",
    tags: ["Branding", "Logo", "Security"],
    color: "#2d3436",
  },
];

export const testimonials = [
  {
    id: 1,
    name: "International Festival of Hammamet",
    role: "Festival Organization",
    text: "Anoir delivered exceptional motion graphics across two consecutive editions. His work elevated our broadcast quality and visual identity significantly.",
    rating: 5,
  },
  {
    id: 2,
    name: "Monoprix Tunisie",
    role: "Marketing Department",
    text: "Working with Anoir on our Ramadan series was a fantastic experience. He consistently delivered high-quality content under tight daily deadlines.",
    rating: 5,
  },
  {
    id: 3,
    name: "Phenaks Media Client",
    role: "Startup Founder",
    text: "Anoir's creative vision transformed our brand from concept to reality. His attention to detail and understanding of our vision was remarkable.",
    rating: 5,
  },
];

export const notableClients = [
  "Novo Nordisk",
  "Monoprix Tunisie",
  "Carthage Dance Festival",
  "Festival of Hammamet",
  "E3mar Libya",
  "Porcelaine Chocolate",
  "CréaKids",
  "Lock&Key",
  "Edlala",
  "Syla Concept",
];

export const stats = [
  { label: "Years Experience", value: "7+" },
  { label: "Projects Delivered", value: "50+" },
  { label: "Clients Served", value: "20+" },
  { label: "Brands Created", value: "15+" },
];

export const videoWork = [
  {
    id: "vid-1",
    title: "Promotional Instagram Reel",
    youtubeId: "aZS3t-fw5Vw",
    category: "motion",
    description: "Short-form promotional content crafted for Instagram, combining dynamic motion design with brand storytelling.",
    tags: ["Motion Design", "Social Media", "Promo"],
  },
  {
    id: "vid-2",
    title: "Aroris Capital Explainer",
    youtubeId: "N3xym4u6Ubo",
    category: "explainer",
    description: "Animated explainer video breaking down complex financial concepts into clear, engaging visuals.",
    tags: ["Explainer", "Corporate", "Animation"],
  },
  {
    id: "vid-3",
    title: "Intro et Outro Monoprix",
    youtubeId: "Xlr9oY9w0w4",
    category: "motion",
    description: "Animated intro and outro sequences designed for Monoprix Tunisie's branded content series.",
    tags: ["Motion Design", "Branding", "Broadcast"],
  },
  {
    id: "vid-4",
    title: "Monoprix Intro Recette",
    youtubeId: "XxvAsyVhDhw",
    category: "motion",
    description: "Animated intro for Monoprix's Ramadan culinary web series, setting the tone for each episode.",
    tags: ["Motion Design", "Food", "Series"],
  },
  {
    id: "vid-5",
    title: "Showreel — Motion Graphics",
    youtubeId: "m4H-wXA1mFw",
    category: "motion",
    description: "Compilation reel showcasing a range of motion graphics work across different projects and styles.",
    tags: ["Showreel", "Motion Design", "Compilation"],
  },
  {
    id: "vid-6",
    title: "Archidoc Work Process & Logo Animation",
    youtubeId: "W3pPr5VVM2w",
    category: "motion",
    description: "Behind-the-scenes look at the creative process, paired with a polished logo animation for Archidoc.",
    tags: ["Logo Animation", "Process", "Branding"],
  },
  {
    id: "vid-7",
    title: "Documentary — Mosque of Derna",
    youtubeId: "yhLQ1bCxuLo",
    category: "documentary",
    description: "Documentary-style video covering the Mosque of Derna, combining cinematic footage with motion graphics.",
    tags: ["Documentary", "Cinematic", "Cultural"],
  },
  {
    id: "vid-8",
    title: "My Revium",
    youtubeId: "Lu5hpY0WhNg",
    category: "editing",
    description: "Video editing project showcasing creative cutting and visual storytelling techniques.",
    tags: ["Video Editing", "Creative", "Showcase"],
  },
  {
    id: "vid-9",
    title: "Libya Mini-Foot Tournament Opening",
    youtubeId: "qeF0kZk8xsw",
    category: "editing",
    description: "High-energy opening match video for a mini-football tournament in Libya, featuring dynamic transitions and graphics.",
    tags: ["Video Editing", "Sports", "Event"],
  },
  {
    id: "vid-10",
    title: "Hotel Royal Hammamet Promo",
    youtubeId: "zKXyA8Tz8to",
    category: "editing",
    description: "Promotional video for Hotel Royal Hammamet, blending elegant visuals with smooth editing.",
    tags: ["Video Editing", "Hospitality", "Promo"],
  },
  {
    id: "vid-11",
    title: "Kepler Agency — Company Presentation",
    youtubeId: "9XalLHVegk8",
    category: "explainer",
    description: "Corporate presentation video for Kepler Agency, communicating brand values through motion and design.",
    tags: ["Explainer", "Corporate", "Presentation"],
  },
  {
    id: "vid-12",
    title: "Key Challenges in Reimbursing Depositors",
    youtubeId: "_tkpNMW1Vko",
    category: "explainer",
    description: "Informational video addressing complex financial topics with clear, accessible visual communication.",
    tags: ["Explainer", "Financial", "Informative"],
  },
  {
    id: "vid-13",
    title: "Video Clip Editing",
    youtubeId: "OSyu4mbnBN4",
    category: "editing",
    description: "Creative video clip editing showcase demonstrating pacing, transitions, and visual rhythm.",
    tags: ["Video Editing", "Creative", "Montage"],
  },
  {
    id: "vid-14",
    title: "Amina Dachrawi Interview",
    youtubeId: "2XrTJ732jGY",
    category: "editing",
    description: "Interview video with Amina Dachrawi, professionally edited with clean cuts and polished audio.",
    tags: ["Video Editing", "Interview", "Documentary"],
  },
  {
    id: "vid-15",
    title: "Spot Neapolis — Edition 35",
    youtubeId: "OfYpdafYtt0",
    category: "motion",
    description: "Broadcast spot for Neapolis Edition 35, combining motion graphics with event promotion.",
    tags: ["Motion Design", "Broadcast", "Event"],
  },
  {
    id: "vid-16",
    title: "Kmar Congress Hammamet",
    youtubeId: "vMZOfA6OqQA",
    category: "editing",
    description: "Event coverage video for the Kmar Congress in Hammamet, capturing key moments with professional editing.",
    tags: ["Video Editing", "Event", "Conference"],
  },
  {
    id: "vid-17",
    title: "HUSTLE x Defame",
    youtubeId: "vPVd3nvDxxs",
    category: "editing",
    description: "Collaborative video project blending creative editing with bold visual style.",
    tags: ["Video Editing", "Collaboration", "Creative"],
  },
];

export const videoCategories = [
  { key: 'all', label: 'All Videos' },
  { key: 'motion', label: 'Motion Design' },
  { key: 'editing', label: 'Video Editing' },
  { key: 'explainer', label: 'Explainer / Corporate' },
  { key: 'documentary', label: 'Documentary' },
];
