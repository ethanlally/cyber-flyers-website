import type { ImageMetadata } from "astro";
import conferenceDiscussion from "../assets/photos/conference-discussion.jpg";
import conferenceGroup from "../assets/photos/conference-group.jpg";
import ctfTraining from "../assets/photos/ctf-2026.jpg";
import cybersecurityTeamwork from "../assets/photos/cybersecurity-teamwork.jpg";
import campusOutreach from "../assets/photos/campus-outreach.png";
import guestSpeaker from "../assets/photos/guest-speaker.jpg";

export interface SitePhoto {
  src: ImageMetadata;
  alt: string;
  position: string;
}

export const photos = {
  blog: {
    src: conferenceDiscussion,
    alt: "Conference attendees discussing ideas together over a notebook.",
    position: "50% 43%",
  },
  highlights: {
    src: conferenceGroup,
    alt: "Six Cyber Flyers members at the Ohio Information Security Conference.",
    position: "50% 35%",
  },
  training: {
    src: ctfTraining,
    alt: "Cyber Flyers students working together at laptops during a capture-the-flag competition.",
    position: "50% 34%",
  },
  collaboration: {
    src: cybersecurityTeamwork,
    alt: "Students collaborating on cybersecurity challenges around a table of laptops.",
    position: "50% 35%",
  },
  outreach: {
    src: campusOutreach,
    alt: "A student using a laptop at a campus cybersecurity outreach table.",
    position: "50% 32%",
  },
  research: {
    src: guestSpeaker,
    alt: "A guest speaker discussing cybersecurity work and research with students in a classroom.",
    position: "54% 44%",
  },
} satisfies Record<string, SitePhoto>;
