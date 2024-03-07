import { normalizeInput } from './index.js';

describe('normalizeInput', () => {
	it('converts the input to lowercase', () => {
		expect(normalizeInput('APPLE')).toBe('apple');
	});

	it('only returns alphanumeric characters', () => {
		expect(normalizeInput('banana123!')).toBe('banana123');
	});

	it('strips whitespace', () => {
		expect(normalizeInput('o r ange')).toBe('orange');
	});

	it('will not return punctuation', () => {
		expect(normalizeInput('bread,')).not.toBe('bread,');
	});
});
