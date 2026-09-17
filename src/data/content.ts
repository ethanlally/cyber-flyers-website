// Keep each person here once; teams refer to these records by ID.
export const academicYear = "2026-2027";
type Standing = "Sophomore" | "Junior" | "Senior";
export interface Member {
  id: string;
  name: string;
  standing: Standing;
  majors: string;
}
export const members: Member[] = [
  { id: "drew-hall", name: "Drew Hall", standing: "Senior", majors: "CJS" },
  { id: "elise-krier", name: "Elise Krier", standing: "Senior", majors: "MIS" },
  { id: "alan-torres", name: "Alan Torres", standing: "Junior", majors: "CPS" },
  {
    id: "ethan-lally",
    name: "Ethan Lally",
    standing: "Sophomore",
    majors: "CPS",
  },
  {
    id: "yoni-mendez-antonio",
    name: "Yoni Mendez Antonio",
    standing: "Junior",
    majors: "MKT",
  },
  {
    id: "jameir-jackson",
    name: "Jameir Jackson",
    standing: "Senior",
    majors: "GEN",
  },
  {
    id: "owen-cranley",
    name: "Owen Cranley",
    standing: "Sophomore",
    majors: "POL, CMM",
  },
  { id: "carolyn-mix", name: "Carolyn Mix", standing: "Senior", majors: "MKT" },
  {
    id: "patrick-nobes",
    name: "Patrick Nobes",
    standing: "Junior",
    majors: "CJS",
  },
  {
    id: "matthew-zengel",
    name: "Matthew Zengel",
    standing: "Senior",
    majors: "MKT",
  },
  {
    id: "lucas-willison",
    name: "Lucas Willison",
    standing: "Senior",
    majors: "CPS",
  },
  {
    id: "luke-gibbons",
    name: "Luke Gibbons",
    standing: "Sophomore",
    majors: "MIS",
  },
  {
    id: "sai-woon-tip",
    name: "Sai Woon Tip",
    standing: "Junior",
    majors: "CPS",
  },
  {
    id: "allison-estes",
    name: "Allison Estes",
    standing: "Sophomore",
    majors: "MIS, ACC",
  },
  {
    id: "jacob-boeke",
    name: "Jacob Boeke",
    standing: "Sophomore",
    majors: "CPS",
  },
  {
    id: "stephen-krauz",
    name: "Stephen Krauz",
    standing: "Sophomore",
    majors: "MIS",
  },
  {
    id: "maddie-dietrichs",
    name: "Maddie Dietrichs",
    standing: "Junior",
    majors: "MIS, ACC",
  },
  {
    id: "shamaria-barton",
    name: "Sha’maria Barton",
    standing: "Senior",
    majors: "CIS",
  },
  {
    id: "graham-tucker-camou",
    name: "Graham Tucker-Camou",
    standing: "Sophomore",
    majors: "CPS",
  },
  {
    id: "drew-wilson",
    name: "Drew Wilson",
    standing: "Junior",
    majors: "POL, CJS",
  },
  { id: "jose-mendez", name: "Jose Mendez", standing: "Junior", majors: "CPS" },
  {
    id: "oliver-joseph",
    name: "Oliver Joseph",
    standing: "Senior",
    majors: "CIS",
  },
];
export function memberById(id: string): Member {
  const member = members.find((person) => person.id === id);
  if (!member) throw new Error(`Unknown member ID: ${id}`);
  return member;
}
export const executiveDirector = "drew-hall";
export const teams = [
  {
    id: "cmac",
    acronym: "CMAC",
    name: "Campus Marketing and Communication",
    summary:
      "Student outreach, social media, educational campaigns, and campus events.",
    mission:
      "CMAC coordinates Cyber Flyers communications, branding, and campus outreach. The team works with student organizations and university departments on events and educational campaigns.",
    director: "yoni-mendez-antonio",
    memberIds: [
      "elise-krier",
      "owen-cranley",
      "carolyn-mix",
      "patrick-nobes",
      "matthew-zengel",
    ],
    priorities: [
      "Create student-focused social media and educational campaigns.",
      "Collaborate with student organizations and university departments.",
      "Coordinate campus tabling, guest speakers, and outreach events.",
      "Support the communication and promotion of cybersecurity training.",
    ],
    programIds: ["outreach", "cyber-training"],
  },
  {
    id: "psat",
    acronym: "PSAT",
    name: "Phishing Simulation and Training",
    summary:
      "Phishing simulations, cybermindfulness education, and research into training effectiveness.",
    mission:
      "PSAT runs phishing simulation and training campaigns using GoPhish and cybermindfulness principles. The team also researches training effectiveness and documents its procedures.",
    director: "lucas-willison",
    memberIds: [
      "ethan-lally",
      "jameir-jackson",
      "luke-gibbons",
      "sai-woon-tip",
      "allison-estes",
      "jacob-boeke",
      "stephen-krauz",
      "maddie-dietrichs",
      "patrick-nobes",
      "oliver-joseph",
    ],
    priorities: [
      "Develop and run phishing education and simulation campaigns.",
      "Maintain training templates and landing pages for authorized use.",
      "Study training effectiveness, cybermindfulness, and training decay.",
      "Document campaign processes and technical procedures for UDit.",
      "Work toward presenting research at the 2027 Stander Symposium.",
    ],
    programIds: ["phishing"],
  },
  {
    id: "ctmr",
    acronym: "CTMR",
    name: "Cyber Threats and Mitigation Research",
    summary:
      "Research into current cyber threats, mitigation methods, and educational material.",
    mission:
      "CTMR researches current cyber threats and ways to prevent or reduce their impact. Its findings support educational articles, campus outreach, and UDit training material.",
    director: "shamaria-barton",
    memberIds: [
      "alan-torres",
      "graham-tucker-camou",
      "drew-wilson",
      "jose-mendez",
      "sai-woon-tip",
    ],
    priorities: [
      "Research current threats and ways to prevent or reduce their impact.",
      "Develop educational articles, research briefs, and potential white papers.",
      "Maintain cybersecurity training material with CMAC and UDit.",
      "Draw on faculty expertise to strengthen research and educational content.",
    ],
    programIds: ["research", "cyber-training"],
  },
];
export const programs = [
  {
    id: "cyber-training",
    name: "Cybersecurity training",
    teamIds: ["cmac", "ctmr"],
    summary:
      "Updates to UDit training material, with shorter modules and student-focused communication.",
    description:
      "CMAC and CTMR are working with UDit training material to make cybersecurity education shorter, more modular, and relevant to student life.",
    focus: [
      "Short, focused learning modules",
      "Clear communication and student outreach",
      "Research-informed training content",
    ],
    resource: "/resources/#learning",
    resourceLabel: "Learning resources",
  },
  {
    id: "phishing",
    name: "Phishing and cybermindfulness",
    teamIds: ["psat"],
    summary:
      "Phishing education and research into training effectiveness and decay.",
    description:
      "PSAT uses GoPhish and cybermindfulness principles to support phishing education. Research priorities include training effectiveness and how learning holds up over time, with a goal of sharing work at Stander in 2027.",
    focus: [
      "Phishing simulation and education",
      "Training effectiveness and decay research",
      "Campaign documentation and NIST Phish Scale use",
    ],
    resource: "/resources/#educators",
    resourceLabel: "Educator resources",
  },
  {
    id: "outreach",
    name: "Campus outreach",
    teamIds: ["cmac", "psat", "ctmr"],
    summary:
      "Tabling, social media, educational events, and collaborations with campus organizations.",
    description:
      "CMAC coordinates campus outreach with support from PSAT and CTMR. Activities include tabling, student organization collaborations, social media, and educational events.",
    focus: [
      "Up the Orgs and campus tabling",
      "Student organization and department collaborations",
      "Educational campaigns and guest speakers",
    ],
    resource: "/get-involved/",
    resourceLabel: "Collaboration opportunities",
  },
  {
    id: "research",
    name: "Threat research",
    teamIds: ["ctmr"],
    summary:
      "Articles, research briefs, and training content about current threats and mitigation.",
    description:
      "CTMR investigates emerging threats and how people can prevent, mitigate, or respond to them. The team develops student-oriented writing and supports campus education, with faculty expertise contributing where relevant.",
    focus: [
      "Emerging threats and practical mitigation",
      "Student-written articles and research briefs",
      "Training content and potential white papers",
    ],
    resource: "https://cf.therangerpost.com/",
    resourceLabel: "Read the Cyber Flyers blog",
  },
];
export const resourceGroups = [
  {
    id: "learning",
    title: "Student resources",
    description:
      "Cyber Flyers articles and learning material from our university partners.",
    items: [
      {
        title: "Cyber Flyers blog",
        label: "Articles · Texas Cyber Range",
        url: "https://cf.therangerpost.com/",
        description:
          "Student perspectives on cybersecurity, digital habits, and the issues affecting our community.",
      },
      {
        title: "Becoming Cybermindful",
        label: "Learning material",
        url: "https://drive.google.com/file/d/1uBhrDMbG9O8ezu8jly06qhufs4GlYBYz/view",
        description:
          "Cybermindfulness learning material used by the phishing simulation and training team.",
      },
      {
        title: "CCDI resources",
        label: "University of Dayton",
        url: "https://udayton.edu/centers/cybersecurity/resources.php",
        description:
          "Cybersecurity resources from the Center for Cybersecurity and Data Intelligence.",
      },
    ],
  },
  {
    id: "educators",
    title: "For educators and researchers",
    description:
      "Reference material for understanding and designing authorized cybersecurity education.",
    items: [
      {
        title: "GoPhish installation guide",
        label: "PDF · University of Dayton",
        url: "https://udayton.edu/centers/_resources/files/gophish-install-instructions.pdf",
        description:
          "University guidance for setting up GoPhish for authorized phishing simulations.",
      },
      {
        title: "NIST Phish Scale",
        label: "PDF · NIST Technical Note 2276",
        url: "https://nvlpubs.nist.gov/nistpubs/TechnicalNotes/NIST.TN.2276.pdf",
        description:
          "A reference for assessing the human detection difficulty of phishing messages.",
      },
    ],
  },
];
