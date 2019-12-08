import test from "ava";
import tizo from "./index";

const localOffset = new Date().getTimezoneOffset();
const addOffset = (
  [hours, minutes]: [number, number],
  offset: number
): [number, number] => {
  const tmpDate = new Date();
  tmpDate.setHours(hours);
  tmpDate.setMinutes(minutes - localOffset);
  return [tmpDate.getHours(), tmpDate.getMinutes()];
};

test("original", t => {
  t.deepEqual(tizo.guess("19:30 CET").original, [19, 30]);
});

test("utc", t => {
  t.deepEqual(tizo.guess("19:30 PDT").utc, [2, 30]);
});

test("local", t => {
  t.deepEqual(tizo.guess("19:30 AWST").local, addOffset([11, 30], localOffset));
});

test("complicated timezones", t => {
  t.deepEqual(tizo.guess("2:15 ACDT").utc, [15, 45]);
});

test("no timezone", t => {
  t.deepEqual(tizo.guess("2:15").utc, [2, 15]);
});

test("weird format", t => {
  t.deepEqual(tizo.guess(" dfae:§ 04 30 pM pDt ssss").utc, [23, 30]);
});

test("throw if unrecognised", t => {
  t.throws(() => tizo.guess(""));
});

test("am/pm", t => {
  t.deepEqual(tizo.guess("11am").utc, [11, 0]);
  t.deepEqual(tizo.guess("12am").utc, [0, 0]);
  t.deepEqual(tizo.guess("11pm").utc, [23, 0]);
  t.deepEqual(tizo.guess("12pm").utc, [12, 0]);
});

test("get input timezone", t => {
  t.deepEqual(tizo.guess("09 30 pt").inputTimezone, {
    name: "Pacific Time",
    offset: -8,
  });
});

test("default input timezone", t => {
  t.deepEqual(tizo.guess("9").inputTimezone, {
    name: "",
    offset: 0,
  });
});

test("throws if unrecognized timezone", t => {
  t.throws(() => tizo.guess("12 am ooooot"));
});
