import { getDaysBetweenDates } from './index.js';

const date1 = new Date('January 1, 2024 03:24:00');
const date2 = new Date('January 8, 2024 03:24:00');

const date1Milliseconds = date1.getTime();
const date2Milliseconds = date2.getTime();

describe('getDaysBetweenDates', () => {
	it('returns a natural number', () => {
		expect(getDaysBetweenDates(date1, date2)).toEqual(7);
	});

	it('returns 0 if there is no date1', () => {
		const date1null = '';
		expect(getDaysBetweenDates(date1null, date2)).toEqual(0);
	});

	it('returns 0 if there is no date2', () => {
		const date2null = '';
		expect(getDaysBetweenDates(date1, date2null)).toEqual(0);
	});

	it('calculates the difference in milliseconds between the dates', () => {
		const milliDiff = Math.abs(date2Milliseconds - date1Milliseconds);
		expect(milliDiff).toEqual(604800000);
	});

	it('returns the days between an earlier and a later date', () => {
		expect(getDaysBetweenDates(date1, date2)).toEqual(7);
	});

	it('returns the days between a later and an earlier date', () => {
		expect(getDaysBetweenDates(date2, date1)).toEqual(7);
	});

	it('returns 0 if there is less than 24 hours between the dates', () => {
		const date3 = new Date('January 1, 2024 10:24:00');
		expect(getDaysBetweenDates(date1, date3)).toEqual(0);
	});
});
