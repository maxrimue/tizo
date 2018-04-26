import test from 'ava';
import tizo from '.';

const localOffset = new Date().getTimezoneOffset();
const addOffset = ([hours, minutes]) => {
	const tmpDate = new Date();
	tmpDate.setHours(hours);
	tmpDate.setMinutes(minutes - localOffset);
	return [tmpDate.getHours(), tmpDate.getMinutes()];
};

test('original', t => {
	const res = tizo('19:30 CET');
	t.deepEqual(res.original, [19, 30]);
});

test('utc', t => {
	const res = tizo('19:30 PDT');
	t.deepEqual(res.utc, [2, 30]);
});

test('local', t => {
	const res = tizo('19:30 AWST');
	t.deepEqual(res.local, addOffset([11, 30]));
});

test('complicated timezones', t => {
	const res = tizo('2:15 ACDT');
	t.deepEqual(res.utc, [15, 45]);
});

test('no timezone', t => {
	const res = tizo('2:15');
	t.deepEqual(res.utc, [2, 15]);
});

test('weird format', t => {
	const res = tizo(' dfae:§ 04 30 pM pDt ssss');
	t.deepEqual(res.utc, [23, 30]);
});

test('wrong arg', t => {
	t.throws(() => tizo(['lol']));
});

test('am/pm', t => {
	const res1 = tizo('11am');
	t.deepEqual(res1.utc, [11, 0]);
	const res2 = tizo('12am');
	t.deepEqual(res2.utc, [0, 0]);
	const res3 = tizo('11pm');
	t.deepEqual(res3.utc, [23, 0]);
	const res4 = tizo('12pm');
	t.deepEqual(res4.utc, [12, 0]);
});
