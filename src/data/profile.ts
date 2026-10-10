import profileImage from "../assets/profile_image.png";

export const profile = {
  name: "Dolapo Ogunyemi",
  monogram: "DO",
  title: "Software Engineer & Application Support Specialist",
  location: "Lagos, Nigeria",
  email: "ogunyemi.dolapo@gmail.com",
  linkedinUrl: "https://www.linkedin.com/in/dolapo-ogunyemi-5a86b3108",
  githubUrl: "https://github.com/Dolapo-18",
  cvPath: "/Resume-Dolapo-Ezekiel-Ogunyemi.pdf",
  image: profileImage,
  imageAlt: "Photograph of Dolapo Ogunyemi.",
  headline: "Building Software That Solves Real Business Problems.",
  summary:
    "I'm Dolapo Ogunyemi, a Software Engineer and Application Support Specialist with 8+ years of experience in IT. I build web applications, automate business processes, integrate enterprise systems, and develop practical technology solutions that improve how businesses operate.",
  credibility: "Software engineering, application support, and business process automation.",
  heroStack: ["React", "TypeScript", "Node.js", "NestJS", "MongoDB", "Power Platform"],
} as const;

export const about = {
  paragraphs: [
    "I am a software engineer and application support specialist with more than eight years in IT. My career has moved through IT support, application support, software development, and business process automation.",
    "I combine hands-on technical implementation with an understanding of business processes and the needs of the people who use a system. I build and integrate software, automate repetitive work, and support the applications an organisation depends on.",
    "I value clear collaboration, careful troubleshooting, and code that another engineer can maintain. I keep learning, and I judge a solution by whether it is genuinely useful to the people who have to use it.",
  ],
  education: [
    {
      credential: "BSc",
      school: "University of Lagos",
      detail: "Undergraduate degree.",
      status: "",
    },
    {
      credential: "MSc, Information Technology",
      school: "University of Lagos",
      detail: "Postgraduate degree currently in progress.",
      status: "In progress",
    },
  ],
  certifications: [
    {
      name: "CompTIA A+",
      note: "",
    },
    {
      name: "ITIL 4 Foundation",
      note: "Exact certificate title to be confirmed.",
    },
  ],
} as const;

export const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
] as const;

export const contactCopy = {
  headline: "Have a Project or Opportunity in Mind?",
  summary:
    "I'm open to software engineering opportunities, application support roles, technical consulting, and collaborations on useful technology products.",
} as const;
