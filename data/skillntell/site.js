// Shared site-wide content for the main Skill&Tell website.

export const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Events", href: "/events" },
  { name: "Missions", href: "/missions" },
  { name: "Team", href: "/team" },
  { name: "Partner", href: "/partner" },
];

export const CONTACT_EMAIL = "skill.and.tell@ensia.edu.dz";
export const CONTACT_PHONE = { label: "+213 561 71 84 75", href: "tel:+213561718475" };
export const CONTACT_PLACE = "ENSIA, Sidi Abdellah — Algiers";

export const SOCIALS = [
  { name: "Instagram", href: "https://www.instagram.com/skillntell.club", icon: "/icons/Instagram.svg" },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/skill-tell-club/", icon: "/icons/Linkedin.svg" },
  { name: "Discord", href: null, icon: "/icons/Discord.svg", note: "Coming soon" },
];

// Headline numbers already used across the site.
export const STATS = [
  { value: 534, suffix: "+", label: "Members", description: "Students who joined the Skill&Tell community." },
  { value: 400, suffix: "+", label: "Participants in events", description: "People who took part in our hackathons, datathons and competitions." },
  { value: 5, suffix: "+", label: "Annual events", description: "From hands-on workshops to national competitions, every single year." },
  { value: 10, suffix: "+", label: "Partner clubs & organizations", description: "Clubs and organizations across Algeria we build with." },
];

export const PILLARS = [
  {
    key: "about",
    title: "About us",
    short: "A dynamic scientific club at ENSIA, now in its fourth year, growing students' soft skills — marketing, multimedia, photography and more.",
    body: "Skill&Tell is a dynamic scientific club at the National Higher School of Artificial Intelligence (ENSIA). Now in its fourth year, it fosters student growth by emphasizing soft skills including marketing, multimedia, and photography—empowering members to express themselves, collaborate effectively, and engage in creative, impactful initiatives.",
  },
  {
    key: "vision",
    title: "Our vision",
    short: "A community where creativity, communication and collaboration thrive — shaping leaders beyond academics.",
    body: "We envision a community where creativity, communication, and collaboration thrive. Skill&Tell aims to inspire students to grow beyond academics, shaping future leaders equipped with essential soft skills for both personal and professional success.",
  },
  {
    key: "specialty",
    title: "Our specialty",
    short: "Hands-on experience that builds confidence, creativity and real-world teamwork.",
    body: "At Skill&Tell, we specialize in nurturing essential soft skills through hands-on experience. From marketing strategies to multimedia production, our focus is on helping members unlock their creative potential, build confidence, and thrive in collaborative, real-world environments.",
  },
  {
    key: "achievements",
    title: "Our achievements",
    short: "Workshops, events and creative projects that left a mark, and partnerships that keep growing.",
    body: "Over the past years, Skill&Tell has organized impactful workshops, engaging events, and creative projects that left a lasting impression. From student-led initiatives to collaborative partnerships, our milestones reflect our commitment to growth, innovation, and excellence in soft skill development.",
  },
];

export const VALUES = ["Skills", "Ideas", "Collaboration", "Creativity", "Growth", "Impact", "Curiosity", "Leadership"];

export const PARTNER_LOGOS = [
  { name: "ENSIA", src: "/images/mobai/ensia.png" },
  { name: "Algérie Télécom", src: "/images/mobai/Logo_Algérie_Télécom.png" },
  { name: "BMS", src: "/images/mobai/bms.png" },
  { name: "NetBeOpen", src: "/images/arcade/logo-netbeopen-red.png" },
  { name: "World AI Week", src: "/images/partners/AI_week_logo.png", dark: true },
  { name: "WSAI", src: "/images/partners/WSAI_logo.png", dark: true },
];

// The club's Chrome extension (new-tab dashboard), built by the IT department.
export const EXTENSION = {
  name: "Skill & Tell extension",
  url: "https://chromewebstore.google.com/detail/Skill%20%26%20Tell%20extension/ieegploffcpecfhiebbihgncgcfflonj",
  tagline: "A polished new tab with search, inspiration, events and daily learning prompts — made for Skill&Tell members.",
  features: [
    { title: "Built-in search", body: "Search the web straight from your new tab." },
    { title: "Quick links hub", body: "Club platforms, repos, workspaces, socials and the website in one click." },
    { title: "Branded & clean", body: "A distraction-free layout in the official Skill&Tell identity." },
    { title: "Lightweight", body: "Lives only on the new tab page — the rest of your browsing is untouched." },
  ],
};
