export const contactEmail = "cyberflyers@udayton.edu";
export const contactHref = `mailto:${contactEmail}`;
export const emailSignupUrl =
  "https://docs.google.com/forms/d/e/1FAIpQLSe0x3NOXtlQvgkszrFodiGGYHFQqf_SRfUE_1z0HwLQi8m8Sg/viewform";
export const blogUrl = "https://cf.therangerpost.com/";

// Public destinations listed at https://linktr.ee/cyberflyersud.
export const connectLinks = [
  {
    name: "Instagram",
    detail: "@cyberflyersud",
    description: "Follow Cyber Flyers around campus.",
    href: "https://www.instagram.com/cyberflyersud/",
    icon: "instagram",
  },
  {
    name: "LinkedIn",
    detail: "CCDI at the University of Dayton",
    description: "Connect with our University's cybersecurity center.",
    href: "https://www.linkedin.com/company/university-of-dayton-center-for-cybersecurity-data-intelligence/posts/?feedView=all",
    icon: "linkedin",
    compactLabel: "LinkedIn (CCDI)",
  },
  {
    name: "TikTok",
    detail: "@cyberflyersud",
    description: "Explore videos from Cyber Flyers.",
    href: "https://www.tiktok.com/@cyberflyersud",
    icon: "tiktok",
  },
  {
    name: "The Cyber Flyers blog",
    detail: "Hosted by the Texas Cyber Range",
    description: "Read student perspectives on cybersecurity.",
    href: blogUrl,
    icon: "book",
    compactLabel: "Blog",
  },
] as const;
