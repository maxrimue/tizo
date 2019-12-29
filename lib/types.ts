export interface tizoInput {
  hours: number;
  minutes: number;
  amOrPm: string;
  sourceTimezone: string;
}

export interface tizoResult {
  original: [number, number];
  utc: [number, number];
  local: [number, number];
  timezones: timezoneType;
  sourceTimezone: {offset: number | [number, number]; name: string};
}

export interface timezoneType {
  [timezone: string]: {offset: number | [number, number]; name: string};
}
