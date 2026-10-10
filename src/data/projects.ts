export type ProjectStatus = "Completed" | "In Development" | "Concept";
export type CapabilityState = "implemented" | "in-development" | "planned";

export interface ProjectCapability {
  label: string;
  state: CapabilityState;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  summary: string;
  description: string;
  capabilities: ProjectCapability[];
  stack: string[];
  image?: string;
  imageAlt: string;
  githubUrl?: string;
  liveUrl?: string;
  status: ProjectStatus;
}

export const capabilityStateLabel: Record<CapabilityState, string> = {
  implemented: "Implemented",
  "in-development": "In development",
  planned: "Planned",
};

export const projects: Project[] = [
  {
    id: "diaspora-care-plus",
    title: "Diaspora Care Plus",
    category: "Insurance Technology / Full-Stack Development",
    summary: "A digital insurance platform for Nigerians living abroad and their families in Nigeria.",
    description:
      "Diaspora Care Plus is a full-stack insurance platform that simplifies access to insurance products for Nigerians in the diaspora and their families at home. It supports product journeys from application through payment and policy processing, with an API-driven backend.",
    capabilities: [
      { label: "Multiple insurance product journeys", state: "implemented" },
      { label: "Policy application workflows", state: "implemented" },
      { label: "Payment integration using Paystack", state: "implemented" },
      { label: "Integration with an external travel insurance provider", state: "implemented" },
      { label: "Automated customer onboarding and policy processing", state: "implemented" },
      { label: "Document and certificate generation", state: "implemented" },
      { label: "API-driven backend architecture", state: "implemented" },
    ],
    stack: ["React", "Vite", "Tailwind CSS", "NestJS", "MongoDB", "Redis", "Paystack API"],
    image: "/images/projects/diaspora-care-plus.svg",
    imageAlt: "Abstract cover art for Diaspora Care Plus, an insurance technology project.",
    liveUrl: "https://diaspora.linkageassurance.com",
    status: "Completed",
  },
  {
    id: "inventory-management",
    title: "Inventory Management System",
    category: "Business Software / Full-Stack Development",
    summary: "An inventory system for products, orders, approvals, and reporting.",
    description:
      "An inventory management system for creating brands, categories, and products, placing orders, and moving those orders through approval. It also includes reporting for the people managing stock.",
    capabilities: [
      { label: "Brand, category, and product management", state: "implemented" },
      { label: "Order placement", state: "implemented" },
      { label: "First-level and inventory-manager approval", state: "implemented" },
      { label: "Reporting", state: "implemented" },
    ],
    stack: ["React", "Chakra UI", "NestJS", "MongoDB"],
    image: "/images/projects/inventory-management.svg",
    imageAlt: "Abstract cover art for the inventory management system.",
    liveUrl: "https://inventory-manager-client-frontend.onrender.com/",
    status: "Completed",
  },
  {
    id: "learn2drive",
    title: "Learn2Drive",
    category: "Mobility Technology / Mobile App",
    summary: "A mobile driving-school app scheduled for deployment in Q4 2026.",
    description:
      "Learn2Drive is a mobile app for connecting learners with driving schools and giving parents or guardians visibility of trips. It is still in development and is scheduled for deployment in Q4 2026. The capabilities below are not live yet.",
    capabilities: [
      { label: "Learner, guardian, instructor, and driving-school roles", state: "in-development" },
      { label: "Driving-school discovery", state: "in-development" },
      { label: "Vehicle and instructor information", state: "in-development" },
      { label: "Trip tracking and trip history", state: "in-development" },
      { label: "Notifications and role-based dashboards", state: "in-development" },
    ],
    stack: ["React Native", "Expo", "TypeScript", "React Navigation", "Zustand", "TanStack Query", "Socket.IO", "Maps integration"],
    image: "/images/projects/learn2drive.svg",
    imageAlt: "Abstract cover art for Learn2Drive, a mobile driving-school app in development.",
    status: "In Development",
  },
  {
    id: "pastorly",
    title: "Pastorly",
    category: "Mobile App",
    summary: "A mobile app that is still under development.",
    description: "Pastorly is a mobile application. It is still under development, so it does not have a public release yet.",
    capabilities: [{ label: "Mobile app", state: "in-development" }],
    stack: [],
    image: "/images/projects/pastorly.svg",
    imageAlt: "Abstract cover art for Pastorly, a mobile app still under development.",
    status: "In Development",
  },
  {
    id: "fleet-management",
    title: "Fleet Management System",
    category: "Operations Software",
    summary: "A fleet management system that is still under development.",
    description: "A fleet management system. It is still under development and does not have a public release yet.",
    capabilities: [{ label: "Fleet management system", state: "in-development" }],
    stack: [],
    image: "/images/projects/fleet-management.svg",
    imageAlt: "Abstract cover art for the fleet management system, which is still under development.",
    status: "In Development",
  },
  {
    id: "power-platform",
    title: "Microsoft Power Platform Solutions",
    category: "Business Process Automation",
    summary: "Business applications and workflow automation built with Microsoft Power Platform.",
    description:
      "A collection of business process automation and enterprise productivity solutions using Microsoft Power Platform. The work covers business applications, cloud and desktop flows, and Microsoft 365 integrations. Specific business outcomes are added only when verified details are available.",
    capabilities: [
      { label: "Power Apps for business applications", state: "implemented" },
      { label: "Power Automate Cloud workflows", state: "implemented" },
      { label: "Power Automate Desktop for desktop automation", state: "implemented" },
      { label: "SharePoint and Microsoft 365 integrations", state: "implemented" },
      { label: "Workflow automation aimed at reducing manual processing", state: "implemented" },
    ],
    stack: ["Power Apps", "Power Automate Cloud", "Power Automate Desktop", "SharePoint", "Microsoft 365"],
    image: "/images/projects/power-platform.svg",
    imageAlt: "Abstract cover art for Microsoft Power Platform automation work.",
    status: "Completed",
  },
];

/*
  Copy this object into the projects array to add another card.
  Leave githubUrl and liveUrl unset until you have a public URL.
  Do not link private repositories or add confidential screenshots.

  {
    id: "project-id",
    title: "Project title",
    category: "Category",
    summary: "One sentence summary.",
    description: "A longer description for the details dialog.",
    capabilities: [{ label: "Capability", state: "implemented" }],
    stack: ["React", "TypeScript"],
    image: "/images/projects/your-image.svg",
    imageAlt: "Describe the image for screen readers.",
    githubUrl: "https://github.com/your-account/your-repo",
    liveUrl: "https://your-demo.example",
    status: "In Development",
  }
*/
