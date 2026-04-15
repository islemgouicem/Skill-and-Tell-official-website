export const STEPS = ["Team Info", "Member Info"];

export const participationOptions = [
  { value: "0", label: "0" },
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
];

export const memberLabels = ["First", "Second", "Third", "Fourth", "Fifth"];

export const emptyMember = () => ({ name: "", email: "", number: "", year: "", participation: "" });

export const createInitialFormData = () => ({
  teamName: "",
  leaderName: "",
  leaderEmail: "",
  leaderNumber: "",
  leaderYear: "",
  leaderParticipation: "",
  members: [emptyMember(), emptyMember(), emptyMember(), emptyMember(), emptyMember()],
});

export const memberErrorKey = (index, field) => `member_${index}_${field}`;
