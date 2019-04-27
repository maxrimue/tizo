import timezones, {timezonesType} from "./timezones";

interface formattedTime {
  hours: number;
  minutes: number;
  amOrPm: string;
  timezone: string;
}

interface tizoResult {
  original: [number, number];
  utc: [number, number];
  local: [number, number];
  timezones: timezonesType;
  inputTimezone: {offset: number | [number, number]; name: string};
}

/** Get Date()'s local offset and translate Date()'s answer from minutes to hours */
function getLocalOffset(): [number, number] {
  const tmpDate = new Date();
  tmpDate.setHours(0, 0);
  tmpDate.setMinutes(tmpDate.getMinutes() + tmpDate.getTimezoneOffset());
  return [tmpDate.getHours(), tmpDate.getMinutes()];
}

/** Apply any timezone specific offset to existing date */
function applyOffset(dateObj: Date, offset: number | [number, number]) {
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();

  // Perform timezone adjustment
  // And let's watch out for uneven offsets
  // (Looking at you, Australia)
  if (Array.isArray(offset)) {
    dateObj.setHours(hours - (Number(offset[0]) || 0));
    dateObj.setMinutes(minutes - (Number(offset[1]) || 0));
  } else {
    dateObj.setHours(hours - Number(offset));
  }
}

function fetchTimezone(
  key: string
): {offset: number | [number, number]; name: string} {
  if (key === undefined) {
    return {offset: 0, name: ""};
  }

  if (timezones[key]) {
    return timezones[key];
  } else {
    throw new Error(`Timezone not found: ${key}`);
  }
}

function converter(input: formattedTime): tizoResult {
  let hours = 0;

  switch (input.amOrPm) {
    case "am":
      if (Number(input.hours) === 12) {
        hours = 0;
      } else {
        hours = input.hours;
      }

      break;
    case "pm":
      if (Number(input.hours) === 12) {
        hours = 12;
      } else {
        hours = input.hours + 12;
      }

      break;
    default:
      hours = input.hours;
  }

  const minutes = input.minutes;
  const inputTimezone = fetchTimezone(input.timezone);

  const timeObj = new Date();
  timeObj.setHours(hours);
  timeObj.setMinutes(minutes);

  const timeObjUTC = new Date(timeObj.getTime());
  applyOffset(timeObjUTC, inputTimezone.offset);

  const timeObjLocal = new Date(timeObjUTC.getTime());
  applyOffset(timeObjLocal, getLocalOffset());

  return {
    original: [timeObj.getHours(), timeObj.getMinutes()],
    utc: [timeObjUTC.getHours(), timeObjUTC.getMinutes()],
    local: [timeObjLocal.getHours(), timeObjLocal.getMinutes()],
    timezones,
    inputTimezone,
  };
}

export default (input: string): tizoResult => {
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

  return converter(formattedInput);
};
