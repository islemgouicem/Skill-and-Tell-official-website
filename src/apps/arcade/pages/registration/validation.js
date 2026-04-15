import { memberErrorKey } from "./config";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isValidStudyYear = (value) => {
  const year = Number(value);
  return Number.isInteger(year) && year >= 1 && year <= 5;
};

export const validateArcadeStep = (stepIndex, data) => {
  const nextErrors = {};

  if (stepIndex === 0) {
    if (!data.teamName.trim()) nextErrors.teamName = "Team name is required";
    if (!data.leaderName.trim()) nextErrors.leaderName = "Leader name is required";
    if (!data.leaderEmail.trim()) {
      nextErrors.leaderEmail = "Leader email is required.";
    } else if (!emailPattern.test(data.leaderEmail.trim())) {
      nextErrors.leaderEmail = "Please enter a valid email address";
    }
    if (!data.leaderNumber.trim()) {
      nextErrors.leaderNumber = "Leader number is required.";
    }
    if (!data.leaderYear.trim()) {
      nextErrors.leaderYear = "Leader year is required.";
    } else if (!isValidStudyYear(data.leaderYear.trim())) {
      nextErrors.leaderYear = "Year must be between 1 and 5";
    }
    if (!data.leaderParticipation) {
      nextErrors.leaderParticipation = "Please select how many times you previously participated.";
    }
  }

  if (stepIndex === 1) {
    data.members.forEach((member, index) => {
      if (!member.name.trim()) nextErrors[memberErrorKey(index, "name")] = "Member name is required";
      if (!member.email.trim()) {
        nextErrors[memberErrorKey(index, "email")] = "Member email is required";
      } else if (!emailPattern.test(member.email.trim())) {
        nextErrors[memberErrorKey(index, "email")] = "Please enter a valid email address";
      }
      if (!member.number.trim()) {
        nextErrors[memberErrorKey(index, "number")] = "Member number is required";
      }
      if (!member.year.trim()) {
        nextErrors[memberErrorKey(index, "year")] = "Member year is required.";
      } else if (!isValidStudyYear(member.year.trim())) {
        nextErrors[memberErrorKey(index, "year")] = "Year must be between 1 and 5.";
      }
      if (!member.participation) {
        nextErrors[memberErrorKey(index, "participation")] = "Please select how many times this member previously participated.";
      }
    });
  }

  return nextErrors;
};
