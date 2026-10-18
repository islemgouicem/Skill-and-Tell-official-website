// Skill&Tell Missions — the club's hands-on challenge format.
// Edit freely: every Missions section on the site reads from this file.

export const MISSIONS_INTRO =
  "Skill&Tell Missions replace classic workshops with hands-on challenges. Each session starts with learning and guided practice, then turns into a competitive mission — solo or in teams — on problems inspired by the real world.";

export const MISSION_PHASES = [
  { key: "drop", name: "Drop", duration: "Start", body: "You enter the lab, meet your crew and the mission drops: theme, stakes and rules." },
  { key: "ice", name: "Ice Breaker", duration: "Warm-up", body: "A quick, playful warm-up so strangers become teammates in minutes." },
  { key: "brief", name: "Brief", duration: "~30–40 min", body: "The host teaches exactly what you need, and you practise it straight away." },
  { key: "mission", name: "Mission", duration: "~40 min", body: "The clock starts. A competitive challenge, individual or in teams, built around a real problem." },
  { key: "debrief", name: "Debrief", duration: "Wrap-up", body: "Solutions are shared, lessons are drawn, XP is awarded and the leaderboard moves." },
];

export const MISSION_RANKS = [
  { name: "Rookie", xp: 0 },
  { name: "Explorer", xp: 25 },
  { name: "Specialist", xp: 50 },
  { name: "Strategist", xp: 75 },
  { name: "Master", xp: 100 },
];

export const MISSION_TRACKS = [
  { name: "Web", dept: "IT" },
  { name: "Mobile", dept: "IT" },
  { name: "AI", dept: "IT" },
  { name: "Marketing", dept: "Marketing" },
  { name: "Relex", dept: "Relex" },
  { name: "UI/UX", dept: "Design" },
];

export const MISSION_FACTS = [
  { value: "30", label: "Seats per mission, held in labs" },
  { value: "4", label: "Players per team, up to 8 teams" },
  { value: "3", label: "Leaderboards: per track, per department & overall" },
  { value: "∞", label: "Open to everyone — members of any department and non-members" },
];
