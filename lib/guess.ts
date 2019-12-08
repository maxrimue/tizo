import {formattedTime} from "./types";

export default (input: string): formattedTime => {
  if (typeof input !== "string") {
    throw new TypeError(`Expected a string, got ${typeof input}`);
  }

  const timeAnalyser = /(\d{1,2})(?:[:. ])?(\d{1,2})?(?:[:. ])?(am|pm)?(?:[:. ])?(\w{1,5})?/gi;

  const formattedInputArr = input.toLowerCase().split(timeAnalyser); // Create array using pattern above ↑

  const formattedInput: formattedTime = {
    hours: Number(formattedInputArr[1]),
    minutes: Number(formattedInputArr[2] || 0),
    amOrPm: formattedInputArr[3],
    timezone: formattedInputArr[4],
  };

  if (
    Number.isNaN(formattedInput.hours) ||
    Number.isNaN(formattedInput.minutes)
  ) {
    throw new Error(`Unrecognised time: ${input}`);
  }

  return formattedInput;
};
