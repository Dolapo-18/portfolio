export interface WorkStep {
  step: string;
  title: string;
  description: string;
}

export const workSteps: WorkStep[] = [
  {
    step: "01",
    title: "Understand the business problem",
    description: "Talk to the people affected and map how the work happens today.",
  },
  {
    step: "02",
    title: "Define the requirements",
    description: "Agree the scope, constraints, and what a useful outcome looks like.",
  },
  {
    step: "03",
    title: "Design a practical technical solution",
    description: "Choose an approach that fits the systems already in place and can be supported.",
  },
  {
    step: "04",
    title: "Build maintainable and secure software",
    description: "Implement it with readable code, sensible access control, and integrations that fail visibly.",
  },
  {
    step: "05",
    title: "Test and troubleshoot",
    description: "Check the paths people actually take and trace failures to the root cause.",
  },
  {
    step: "06",
    title: "Deploy, document, and continuously improve",
    description: "Release with enough documentation for the next person, then improve it from real use.",
  },
];
