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
    href: "/resources/#learning",
    label: "Explore foundational resources",
  },
  {
    title: "Recognize common threats",
    description:
      "Explore phishing, credential theft, malware, social engineering, and unsafe online behavior.",
    href: "/resources/#learning",
    label: "Find learning material",
  },
  {
    title: "Practice defensive habits",
    description:
      "Use multifactor authentication, strong passwords, software updates, backups, and appropriate reporting.",
    href: "/resources/#learning",
    label: "Explore cybermindfulness",
  },
  {
    title: "Keep learning",
    description:
      "Continue with Cyber Flyers articles, university learning material, and reference guides from NIST.",
    href: "/resources/",
    label: "Browse the resource library",
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
    answer:
      "Student joining information will be posted here when it is available.",
    href: "/get-involved/#students",
    label: "Student participation",
  },
];

export const allFAQs: FAQItem[] = [
  ...commonFAQs,
  {
    question: "Do I need previous cybersecurity experience?",
    answer:
      "Start by exploring foundational resources, team descriptions, and current programs. Specific participation requirements will be shared with joining information.",
    href: "/start-here/",
    label: "Start here in cybersecurity",
  },
  {
    question: "Can first-year students participate?",
    answer:
      "First-year participation details will be posted with the joining information when available.",
  },
  {
    question: "How much time should members expect to commit?",
    answer:
      "Meeting schedules and time commitments will be posted when confirmed.",
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
    answer:
      "Potential collaborations include guest speaking, events, educational campaigns, and training or research projects. Official contact information is coming soon.",
    href: "/get-involved/#partners",
    label: "Partnership opportunities",
  },
];
