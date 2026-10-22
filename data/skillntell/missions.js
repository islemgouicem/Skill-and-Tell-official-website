// Skill&Tell Missions — the club's hands-on program, inspired by Solo Leveling.
// Every Missions section on the site reads from this file.

// The Missions platform: accounts, mission board, XP, levels and leaderboard.
export const MISSIONS_URL = "https://missions.skillntell.com";

// Short pitch used on the home page.
export const MISSIONS_SOLO_LEVELING =
  "Inspired by Solo Leveling: every hunter is born with a level and stays there, except one, who levels up by clearing the missions his System gives him. Here, that hunter is you. Join hands-on missions, earn XP on the Missions platform, level up and go for the final prize.";

// The concept, told through the anime.
export const MISSIONS_STORY = {
  anime:
    "In Solo Leveling, hunters are born with a level and stay stuck there for life. Except one: Sung Jin-Woo. A mysterious System gives him missions, and every mission he clears makes him stronger, until the weakest hunter becomes the strongest.",
  you: "At Skill&Tell, you are the main character.",
  map: [
    { anime: "The System", club: "The Missions platform, missions.skillntell.com" },
    { anime: "Missions", club: "Hands-on workshops, onsite at school: no lecture, you learn by doing" },
    { anime: "XP", club: "Earned with every mission you complete" },
    { anime: "Level up", club: "Pass an XP threshold and your level goes up" },
    { anime: "The strongest hunter", club: "A prize for the winner at the end of the program" },
  ],
};

// The journey, step by step (the last line is the closing call to action).
export const MISSION_JOURNEY = [
  { key: "awakening", title: "The Awakening", body: "Every hunter starts somewhere. Create your account on the Skill&Tell Missions platform, enter the system and begin your journey." },
  { key: "profile", title: "Your Hunter Profile", body: "Your own profile, your XP, your rank, your achievements. Everything is tracked on the platform, all in one place." },
  { key: "board", title: "The Mission Board", body: "New missions, new challenges, different skills to explore. Browse the available missions, choose yours and accept the quest." },
  { key: "grind", title: "The Real Grind", body: "This is where it gets real. Join onsite missions, solve problems, work with others and learn by doing. No more watching from the sidelines." },
  { key: "complete", title: "Complete the Mission", body: "Face the challenge, put your skills to the test and prove what you're capable of." },
  { key: "xp", title: "Earn XP", body: "Every completed mission earns you experience points. Every step forward brings you closer to your next milestone." },
  { key: "level", title: "Level Up", body: "Watch your hunter profile evolve, collect achievements and keep track of your mission history." },
  { key: "leaderboard", title: "Climb the Leaderboard", body: "The grind doesn't go unnoticed. Your XP sets your place on the leaderboard: compete with other hunters and aim for the top." },
  { key: "rank", title: "Your Journey, Your Rank", body: "From your first registration to your latest achievement: every mission, every XP point, every step forward, in one place." },
];

export const MISSIONS_FINAL_CALL = {
  title: "The Final Call",
  body: "The system is ready. The missions are waiting. Your journey starts with one decision. Will you answer the call, Hunter?",
};

export const MISSIONS_FAQ = [
  {
    value: "m-1",
    question: "Do I need any skills to join?",
    answer: "No, zero skills needed. That's the whole point: from zero to hero. Missions are built in progression, step by step, so nobody jumps ahead. Before each mission you'll be told which tools to download.",
  },
  {
    value: "m-2",
    question: "Can I join missions outside my department?",
    answer: "Yes. You belong to one department in the club, but you can join any mission from any department. Members of a department get priority on that department's missions (a Marketing member, for example, gets priority on Marketing missions).",
  },
  {
    value: "m-3",
    question: "How do I register for a mission?",
    answer: "Create an account on missions.skillntell.com. You'll find the available missions there and register for the ones you want. Seats are limited for each mission, so don't wait.",
  },
  {
    value: "m-4",
    question: "Where do missions take place?",
    answer: "Onsite, at the school (ENSIA).",
  },
  {
    value: "m-5",
    question: "How is it different from a workshop?",
    answer: "Missions aren't lecture-style workshops. Each one has its own structure and you learn by doing: solving problems and working with others, not just watching.",
  },
  {
    value: "m-6",
    question: "What do I get out of it?",
    answer: "XP for every mission you complete, levels as you pass XP thresholds, a place on the leaderboard and, for the winner, a prize at the end of the program.",
  },
];
