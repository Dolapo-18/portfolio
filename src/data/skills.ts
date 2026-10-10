export type SkillIconName = "frontend" | "backend" | "infrastructure" | "power" | "support";

export interface SkillGroup {
  id: string;
  title: string;
  description: string;
  icon: SkillIconName;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    id: "frontend",
    title: "Frontend Development",
    description: "Interfaces for web applications, built to work across screen sizes.",
    icon: "frontend",
    skills: ["React", "JavaScript", "TypeScript", "HTML5", "CSS3", "Tailwind CSS", "Responsive UI development"],
  },
  {
    id: "backend",
    title: "Backend Development",
    description: "Service-side logic, APIs, and the access control around them.",
    icon: "backend",
    skills: ["Node.js", "NestJS", "Express.js", "REST APIs", "API integrations", "Authentication and authorisation"],
  },
  {
    id: "infrastructure",
    title: "Databases and Infrastructure",
    description: "Data stores, application hosting, and the tooling used to ship them.",
    icon: "infrastructure",
    skills: ["MongoDB", "Redis", "Docker", "Nginx", "Linux server administration", "Git and GitHub", "VPS deployment and application hosting"],
  },
  {
    id: "power",
    title: "Microsoft Power Platform",
    description: "Business applications and workflow automation across Microsoft 365.",
    icon: "power",
    skills: ["Power Apps", "Power Automate Cloud", "Power Automate Desktop", "Microsoft 365", "SharePoint", "Business process automation"],
  },
  {
    id: "support",
    title: "IT and Application Support",
    description: "Keeping applications, services, and the people using them moving.",
    icon: "support",
    skills: [
      "Application troubleshooting",
      "Incident management",
      "Root-cause analysis",
      "Network troubleshooting",
      "Microsoft 365 administration",
      "IT service management",
      "User support and technical documentation",
    ],
  },
];
