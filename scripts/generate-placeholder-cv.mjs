import { writeFileSync } from "node:fs";

function escapePdf(text) {
  return text.replaceAll("\\", "\\\\").replaceAll("(", "\\(").replaceAll(")", "\\)");
}

const lines = [
  { font: "F2", size: 22, x: 56, y: 740, text: "Dolapo Ogunyemi" },
  { font: "F1", size: 12, x: 56, y: 716, text: "Software Engineer & Application Support Specialist" },
  { font: "F1", size: 11, x: 56, y: 698, text: "Nigeria" },
  { font: "F2", size: 11, x: 56, y: 668, text: "Replace this file before publishing" },
  { font: "F1", size: 11, x: 56, y: 650, text: "This starter CV is linked from the portfolio. Replace" },
  { font: "F1", size: 11, x: 56, y: 634, text: "public/dolapo-ogunyemi-cv.pdf with your current resume." },
  { font: "F2", size: 13, x: 56, y: 600, text: "Profile" },
  { font: "F1", size: 11, x: 56, y: 580, text: "Software engineer and application support specialist with 8+ years" },
  { font: "F1", size: 11, x: 56, y: 564, text: "of experience in IT. I build web applications, automate business" },
  { font: "F1", size: 11, x: 56, y: 548, text: "processes, integrate enterprise systems, and support the technology" },
  { font: "F1", size: 11, x: 56, y: 532, text: "people rely on at work." },
  { font: "F2", size: 13, x: 56, y: 498, text: "Education" },
  { font: "F1", size: 11, x: 56, y: 478, text: "BSc, University of Lagos" },
  { font: "F1", size: 11, x: 56, y: 462, text: "MSc, Information Technology, University of Lagos (in progress)" },
  { font: "F2", size: 13, x: 56, y: 428, text: "Certifications" },
  { font: "F1", size: 11, x: 56, y: 408, text: "CompTIA A+" },
  { font: "F1", size: 11, x: 56, y: 392, text: "ITIL 4 Foundation (confirm the exact certificate title)" },
  { font: "F2", size: 13, x: 56, y: 358, text: "Technical focus" },
  { font: "F1", size: 11, x: 56, y: 338, text: "Frontend: React, JavaScript, TypeScript, HTML, CSS, Tailwind CSS" },
  { font: "F1", size: 11, x: 56, y: 322, text: "Backend: Node.js, NestJS, Express.js, REST APIs" },
  { font: "F1", size: 11, x: 56, y: 306, text: "Data and infrastructure: MongoDB, Redis, Docker, Nginx, Linux, Git" },
  { font: "F1", size: 11, x: 56, y: 290, text: "Power Platform: Power Apps, Power Automate, Microsoft 365, SharePoint" },
  { font: "F1", size: 11, x: 56, y: 274, text: "Support: troubleshooting, incident management, IT service management" },
  { font: "F2", size: 13, x: 56, y: 240, text: "Experience" },
  { font: "F1", size: 11, x: 56, y: 220, text: "Add each role's employer, job title, dates, and verified achievements" },
  { font: "F1", size: 11, x: 56, y: 204, text: "before sharing this CV. Practice areas: software engineering," },
  { font: "F1", size: 11, x: 56, y: 188, text: "application support, IT support, and business process automation." },
  { font: "F2", size: 13, x: 56, y: 154, text: "Contact" },
  { font: "F1", size: 11, x: 56, y: 134, text: "Email: add your professional email" },
  { font: "F1", size: 11, x: 56, y: 118, text: "LinkedIn: add your profile URL" },
  { font: "F1", size: 11, x: 56, y: 102, text: "GitHub: add your profile URL" },
  { font: "F1", size: 11, x: 56, y: 86, text: "Location: Nigeria" },
];

let stream = "BT\n";
for (const line of lines) {
  stream += `/${line.font} ${line.size} Tf\n1 0 0 1 ${line.x} ${line.y} Tm\n(${escapePdf(line.text)}) Tj\n`;
}
stream += "ET\n";

const objects = [
  "<< /Type /Catalog /Pages 2 0 R >>",
  "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
  "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> >>",
  `<< /Length ${Buffer.byteLength(stream)} >>\nstream\n${stream}endstream`,
  "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
  "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>",
];

let pdf = "%PDF-1.4\n";
const offsets = [0];

for (let index = 0; index < objects.length; index += 1) {
  offsets.push(Buffer.byteLength(pdf));
  pdf += `${index + 1} 0 obj\n${objects[index]}\nendobj\n`;
}

const xrefStart = Buffer.byteLength(pdf);
pdf += `xref\n0 ${objects.length + 1}\n`;
pdf += "0000000000 65535 f \n";

for (let index = 1; index < offsets.length; index += 1) {
  pdf += `${String(offsets[index]).padStart(10, "0")} 00000 n \n`;
}

pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF\n`;

const output = new URL("../public/dolapo-ogunyemi-cv.pdf", import.meta.url);
writeFileSync(output, pdf);
console.log(`Wrote ${output.pathname}`);
