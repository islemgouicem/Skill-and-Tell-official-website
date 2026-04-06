import { memberErrorKey } from "./config";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const algerianPhonePattern = /^0[5-7]\d{8}$/;

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
    } else if (!algerianPhonePattern.test(data.leaderNumber.trim())) {
      nextErrors.leaderNumber = "Please enter a valid number";
    }
    if (!data.leaderYear.trim()) {
      nextErrors.leaderYear = "Leader year is required.";
    } else if (!isValidStudyYear(data.leaderYear.trim())) {
      nextErrors.leaderYear = "Year must be between 1 and 5";
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
      } else if (!algerianPhonePattern.test(member.number.trim())) {
        nextErrors[memberErrorKey(index, "number")] = "Please enter a valid number";
      }
      if (!member.year.trim()) {
        nextErrors[memberErrorKey(index, "year")] = "Member year is required.";
      } else if (!isValidStudyYear(member.year.trim())) {
        nextErrors[memberErrorKey(index, "year")] = "Year must be between 1 and 5.";
      }
    });
  }

  if (stepIndex === 2) {
    if (data.pastParticipation === null) {
      nextErrors.pastParticipation = "Please choose Yes or No.";
    }
    if (!data.motivation.trim()) {
      nextErrors.motivation = "Motivation is required.";
    }
  }

  return nextErrors;
};
