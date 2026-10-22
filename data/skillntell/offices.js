// Previous Skill&Tell offices, newest first. Each office lists its members in
// the same shape as managers-info.json (name, role, image under /public, ...).
// The current office always comes from the CMS.
import office2025 from "./managers-info.json";

export const PREVIOUS_OFFICES = [
  {
    mandate: "2025 – 2026",
    members: office2025,
  },
];
