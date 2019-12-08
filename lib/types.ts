export interface formattedTime {
  hours: number;
  minutes: number;
  amOrPm: string;
  timezone: string;
}

export interface tizoResult {
  original: [number, number];
  utc: [number, number];
  local: [number, number];
  timezones: timezoneType;
  inputTimezone: {offset: number | [number, number]; name: string};
}

export interface timezoneType {
  [timezone: string]: {offset: number | [number, number]; name: string};
}
