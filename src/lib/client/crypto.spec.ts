import { describe, expect, test } from 'vitest';
import { generateAlphaNumString } from './crypto';

describe('generateAlphaNumString', () => {
	test(' creates expected length', () => {
		const length = 500;
		const generated = generateAlphaNumString(length);
		console.debug(`Generated: ${generated}`);
		expect(generated.length).toBe(length);
		expect(Math.sqrt(0)).toBe(0);
	});
	test('creates unique output', () => {
		const length = 10;
		const generated1 = generateAlphaNumString(length);
		const generated2 = generateAlphaNumString(length);
		console.debug('Generated nr. 1:', generated1);
		console.debug('Generated nr. 2:', generated2);

		expect(generated1).not.toBe(generated2);
	});
});
