import {timezoneType} from "./types";

export function fetchTimezone(
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

/** Get the offset of a timezone (key) in hours or [hours, minutes], and the name */
export const timezones: timezoneType = {
  idlw: {offset: -12, name: "International Date Line West"},
  hast: {offset: -10, name: "Hawaii-Aleutian Standard Time"},
  hdt: {offset: -9, name: "Hawai Daylight Time"},
  akst: {offset: -9, name: "Alaska Standard Time"},
  yst: {offset: -9, name: "Yukon Standard Time"},
  akdt: {offset: -8, name: "Alaska Daylight Time"},
  ydt: {offset: -8, name: "Yukon Daylight Time"},
  pst: {offset: -8, name: "Pacific Standard Time"},
  pt: {offset: -8, name: "Pacific Time"},
  pdt: {offset: -7, name: "Pacific Daylight Time"},
  mst: {offset: -7, name: "Mountain Standard Time"},
  mdt: {offset: -6, name: "Mountain Daylight Time"},
  cst: {offset: -6, name: "Central Standard Time"},
  cdt: {offset: -5, name: "Central Daylight Time"},
  est: {offset: -5, name: "Eastern Standard Time"},
  edt: {offset: -4, name: "Eastern Daylight Time"},
  ast: {offset: -4, name: "Atlantic Standard Time"},
  adt: {offset: -3, name: "Atlantic Daylight Time"},
  nst: {offset: [-3, -30], name: "Newfoundland Standard Time"},
  ndt: {offset: [-2, -30], name: "Newfoundland Daylight Time"},
  wet: {offset: 0, name: "West European Time"},
  utc: {offset: 0, name: "Coordinated Universal Time"},
  gmt: {offset: 0, name: "Greenwhich Mean Time"},
  west: {offset: 1, name: "West European Summer Time"},
  wedt: {offset: 1, name: "West European Daylight Time"},
  bst: {offset: 1, name: "British Summer Time"},
  cet: {offset: 1, name: "Central European Time"},
  met: {offset: 1, name: "Middle European Time"},
  cest: {offset: 2, name: "Central European Summer Time"},
  cedt: {offset: 2, name: "Central European Daylight Time"},
  mest: {offset: 2, name: "Middle European Summer Time"},
  wast: {offset: 2, name: "West Africa Summer Time"},
  eet: {offset: 2, name: "East European Time"},
  cat: {offset: 2, name: "Central Africa Time"},
  sast: {offset: 2, name: "South Africa Standard Time"},
  eest: {offset: 3, name: "East European Summer Time"},
  eedt: {offset: 3, name: "East European Daylight Time"},
  bt: {offset: 3, name: "Baghdad Time"},
  msk: {offset: 3, name: "Moscow Time"},
  eat: {offset: 3, name: "East African Time"},
  irt: {offset: [3, 30], name: "Iran Time"},
  irst: {offset: [4, 30], name: "Iran Summer Time"},
  ist: {offset: [5, 30], name: "Indian Standard Time"},
  ict: {offset: 7, name: "Indochina Time"},
  cnst: {offset: 8, name: "China Standard Time"},
  awst: {offset: 8, name: "Australian Western Standard Time"},
  jst: {offset: 9, name: "Japan/Korea Standard Time"},
  awdt: {offset: 9, name: "Australian Western Daylight Time"},
  acst: {offset: [9, 30], name: "Australian Central Standard Time"},
  acdt: {offset: [10, 30], name: "Australian Central Daylight Time"},
  aest: {offset: 10, name: "Australian Eastern Standard Time"},
  aedt: {offset: 11, name: "Australian Eastern Daylight Time"},
  nft: {offset: 11, name: "Norfolk Time"},
  idle: {offset: 12, name: "International Date Line East"},
  nzst: {offset: 12, name: "New Zealand Standard Time"},
  nzdt: {offset: 13, name: "New Zealand Daylight Time"},
};
