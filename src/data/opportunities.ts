import { contactEmail, contactHref } from "./connect";

export const careerPaths = [
  {
    teamId: "cmac",
    skills: [
      "Cyber communication",
      "Campus outreach",
      "Event planning",
      "Marketing and brand strategy",
      "Stakeholder coordination",
    ],
    connections:
      "Cybersecurity communications, project coordination, awareness programs, marketing, and governance-oriented roles.",
  },
  {
    teamId: "psat",
    skills: [
      "Phishing analysis",
      "Training design",
      "GoPhish use",
      "NIST Phish Scale application",
      "Awareness communication",
    ],
    connections:
      "Security operations and analysis, security-awareness programs, defensive cybersecurity, and technical training.",
  },
  {
    teamId: "ctmr",
    skills: [
      "Threat research",
      "Mitigation analysis",
      "Technical writing",
      "Research synthesis",
      "Student-oriented security guidance",
    ],
    connections:
      "Threat intelligence, cybersecurity analysis, security research, incident support, and technical writing.",
  },
];

export const transferableSkills = [
  {
    title: "Lead",
    description:
      "Practice leadership, planning, teamwork, and execution across technical and nontechnical work.",
  },
  {
    title: "Present",
    description:
      "Communicate research, training, and outreach ideas to different audiences.",
  },
  {
    title: "Document",
    description:
      "Build habits around clear technical and project documentation.",
  },
  {
    title: "Collaborate",
    description:
      "Work across disciplines and connect Cyber Flyers projects to campus and community needs.",
  },
];

export const learningSteps = [
  {
    title: "Understand the basics",
    description:
      "Learn about cybersecurity, risk, threats, vulnerabilities, and the confidentiality–integrity–availability model.",
  },
  {
    title: "Recognize common threats",
    description:
      "Explore phishing, credential theft, malware, social engineering, and unsafe online behavior.",
  },
  {
    title: "Practice defensive habits",
    description:
      "Use multifactor authentication, strong passwords, software updates, backups, and appropriate reporting.",
  },
  {
    title: "Keep learning",
    description:
      "Continue with Cyber Flyers articles, university learning material, and reference guides from NIST.",
  },
];

// Illustrative formats from the page proposal, not completed project claims.
export const projectExamples = [
  {
    category: "training",
    label: "Training",
    teamId: "psat",
    programId: "phishing",
    title: "Phishing awareness & cybermindfulness",
    problem: "Help participants recognize and respond to phishing attempts.",
    approach:
      "Training design, cybermindfulness concepts, and assessment methods.",
    deliverable: "Training material, documentation, or awareness resources.",
  },
  {
    category: "research",
    label: "Research",
    teamId: "ctmr",
    programId: "research",
    title: "Emerging threat research brief",
    problem: "Translate a current cyber threat into student-oriented guidance.",
    approach:
      "Research synthesis, mitigation analysis, and technical writing suitable for public release.",
    deliverable:
      "A brief, article, white paper, or related educational resource.",
  },
  {
    category: "outreach",
    label: "Outreach",
    teamId: "cmac",
    programId: "outreach",
    title: "Campus cybersecurity awareness",
    problem: "Make cybersecurity relevant and approachable across campus.",
    approach:
      "Events, tabling, social outreach, and collaboration across teams.",
    deliverable:
      "Awareness material, event resources, and aggregate impact summaries.",
  },
];

export interface FAQItem {
  question: string;
  answer: string;
  href?: string;
  label?: string;
}

export const commonFAQs: FAQItem[] = [
  {
    question: "Is Cyber Flyers only for technical majors?",
    answer:
      "Cyber Flyers includes students from technical and nontechnical majors, working across communication, training, and research.",
  },
  {
    question: "Can interests overlap across teams?",
    answer: "Yes. Some current members contribute to more than one team.",
  },
  {
    question: "How do I join?",
    answer: `Fill out our interest form to join the mailing list and tell us if you'd like to join Cyber Flyers in the future. The form records your interest; it does not enroll you as a member. For questions about joining, email ${contactEmail}.`,
    href: "/get-involved/#students",
    label: "Find the signup form",
  },
];

export const allFAQs: FAQItem[] = [
  ...commonFAQs,
  {
    question: "Do I need previous cybersecurity experience?",
    answer:
      "Cyber Flyers includes technical and nontechnical work. Explore the teams and foundational resources, and contact us to discuss the experience needed for a role that interests you.",
    href: "/start-here/",
    label: "Start here in cybersecurity",
  },
  {
    question: "Can first-year students participate?",
    answer:
      "Contact our team to ask about current opportunities for first-year students. You can also use the interest form to join the mailing list and express interest in future participation.",
    href: contactHref,
    label: "Ask about participation",
  },
  {
    question: "How much time should members expect to commit?",
    answer:
      "Contact our team for the current meeting schedule and time expectations for the work you're interested in.",
    href: contactHref,
    label: "Ask about the schedule",
  },
  {
    question: "Which team is the best fit for my interests?",
    answer:
      "Use the team finder as a starting point, then explore the CMAC, PSAT, and CTMR descriptions.",
    href: "/get-involved/#find-your-place",
    label: "Find your place in cyber",
  },
  {
    question:
      "Does Cyber Flyers guarantee certifications, internships, or employment?",
    answer:
      "Participation does not guarantee certifications, internships, or employment. Career pathways illustrate how the skills you practice can connect to professional interests.",
    href: "/career/",
    label: "Explore career connections",
  },
  {
    question: "How can an organization collaborate with Cyber Flyers?",
    answer: `Potential collaborations include guest speaking, events, educational campaigns, and training or research projects. Email ${contactEmail} to discuss your idea.`,
    href: "/get-involved/#partners",
    label: "Partnership opportunities",
  },
];
