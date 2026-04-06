export const STEPS = ["Team Info", "Members info", "Motivation"];

export const memberLabels = ["First", "Second", "Third", "Fourth"];

export const emptyMember = () => ({ name: "", email: "", number: "", year: "" });

export const createInitialFormData = () => ({
  teamName: "",
  leaderName: "",
  leaderEmail: "",
  leaderNumber: "",
  leaderYear: "",
  members: [emptyMember(), emptyMember(), emptyMember(), emptyMember()],
  pastParticipation: null,
  motivation: "",
});

export const memberErrorKey = (index, field) => `member_${index}_${field}`;
