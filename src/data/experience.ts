export interface ExperienceRole {
  id: string;
  focus: string;
  title: string;
  employer: string;
  dates: string;
  responsibilities: string[];
  achievements: string[];
}

export const experienceIntro =
  "Job titles and employment dates stay off the page until they are added. Responsibilities describe the kind of work in each area.";

export const experience: ExperienceRole[] = [
  {
    id: "software-engineering",
    focus: "Software engineering",
    title: "[ADD JOB TITLE]",
    employer: "Linkage Assurance Plc",
    dates: "[ADD EMPLOYMENT DATES]",
    responsibilities: [
      "Develop and maintain business applications used in day-to-day operations.",
      "Build and integrate APIs that connect internal tools and external services.",
      "Collaborate with business stakeholders and technical teams on practical software changes.",
    ],
    achievements: ["Inventory management system", "Diaspora Care Plus"],
  },
  {
    id: "application-support",
    focus: "Application support",
    title: "[ADD JOB TITLE]",
    employer: "Linkage Assurance Plc",
    dates: "[ADD EMPLOYMENT DATES]",
    responsibilities: [
      "Support enterprise applications and Microsoft 365.",
      "Troubleshoot technical issues and trace them to a root cause.",
      "Improve application reliability and the experience of the people using those systems.",
    ],
    achievements: [
      "Supported end users and resolved software issues so critical applications stayed available.",
      "Identified and resolved software issues before they disrupted business processes.",
      "Designed SharePoint sites with business teams, improving document retrieval efficiency by 40%.",
    ],
  },
  {
    id: "it-support",
    focus: "IT support",
    title: "[ADD JOB TITLE]",
    employer: "Linkage Assurance Plc",
    dates: "[ADD EMPLOYMENT DATES]",
    responsibilities: [
      "Provide user support, incident management, and technical documentation.",
      "Troubleshoot network and endpoint issues.",
      "Administer Microsoft 365 services and follow IT service management practices.",
    ],
    achievements: [
      "Resolved technical issues for employees and kept system downtime low.",
      "Diagnosed hardware and software problems and restored a working setup for staff.",
      "Documented standard operating procedures and user guides for support staff and end users.",
    ],
  },
  {
    id: "automation",
    focus: "Business process automation",
    title: "[ADD JOB TITLE]",
    employer: "Linkage Assurance Plc",
    dates: "[ADD EMPLOYMENT DATES]",
    responsibilities: [
      "Automate manual business workflows with the Microsoft Power Platform.",
      "Connect SharePoint, Microsoft 365, and other business systems.",
      "Turn operational processes into tools that staff can actually use.",
    ],
    achievements: [
      "Automated HR approvals, claims settlement, procurement, visitor registration, and executive approvals.",
      "Built Power Apps that replaced manual forms and cut paper-based processes by 35%.",
      "Automated cross-department workflows in Power Automate, saving more than 10 staff hours each week.",
      "Built Power Automate Desktop flows for legacy systems, reducing manual errors by 50%.",
    ],
  },
];
