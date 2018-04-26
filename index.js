'use strict';
const timezones = require('./timezones.js');

// Get Date()'s local offset and
// translate Date()'s answer from minutes
// eg 120 to hours eg 2
function getLocalOffset() {
	const tmpDate = new Date();
	tmpDate.setHours(0, 0);
	tmpDate.setMinutes(tmpDate.getTimezoneOffset());
	return [tmpDate.getHours(), tmpDate.getMinutes()];
}

function applyOffset(obj, offset) {
	const hours = obj.getHours();
	const minutes = obj.getMinutes();

	// Perform timezone adjustment
	// And let's watch out for uneven offsets
	// (Looking at you, Australia)
	if (Array.isArray(offset)) {
		obj.setHours(hours - Number(offset[0]), minutes - Number(offset[1]));
	} else {
		obj.setHours(hours - Number(offset), minutes);
	}

	return obj;
}

class Time {
	constructor(input) {
		switch (input.amOrPm) {
			case 'am':
				if (Number(input.hours) === 12) {
					this.hours = 0;
				} else {
					this.hours = input.hours;
				}
				break;
			case 'pm':
				if (Number(input.hours) === 12) {
					this.hours = 12;
				} else {
					this.hours = input.hours + 12;
				}
				break;
			default:
				this.hours = input.hours;
		}

		this.minutes = input.minutes;

		if (timezones[input.timezone]) {
			this.offset = timezones[input.timezone];
		}

		this.timeObject = new Date();
		this.timeObject.setHours(this.hours);
		this.timeObject.setMinutes(this.minutes);
		this.timeObjectUTC = applyOffset(new Date(this.timeObject), this.offset);
		this.timeObjectLocal = applyOffset(
			new Date(this.timeObjectUTC),
			getLocalOffset()
		);
	}

	respond(result) {
		if (Number.isNaN(result[0])) {
			return new Error('Unrecognised time');
		}

		return result;
	}

	get original() {
		return this.respond([
			this.timeObject.getHours(),
			this.timeObject.getMinutes(),
		]);
	}

	get utc() {
		return this.respond([
			this.timeObjectUTC.getHours(),
			this.timeObjectUTC.getMinutes(),
		]);
	}

	get local() {
		return this.respond([
			this.timeObjectLocal.getHours(),
			this.timeObjectLocal.getMinutes(),
		]);
	}

	get timezones() {
		return timezones;
	}
}

module.exports = input => {
	if (typeof input !== 'string') {
		throw new TypeError(`Expected a string, got ${typeof input}`);
	}

	const timeAnalyser = /(\d{1,2})(?:[:. ])?(\d{1,2})?(?:[:. ])?(am|pm)?(?:[:. ])?(\w{1,5})?/gi;

	const formattedInputArr = input.toLowerCase().split(timeAnalyser); // Create array using pattern above ↑

	const formattedInput = {
		hours: Number(formattedInputArr[1]),
		minutes: Number(formattedInputArr[2] || 0),
		amOrPm: formattedInputArr[3],
		timezone: formattedInputArr[4] || 'utc',
	};

	return new Time(formattedInput);
};
