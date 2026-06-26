import { Temporal } from '@js-temporal/polyfill';
import type { LokAsWeek, LokDay } from './lok';

export const generateLokWeek = () => {
	let instant = Temporal.Now.instant();
	const lokWeek = [];
	for (let index = 0; index < 7; index++) {
		lokWeek.push({ day: instant, available: [] as [] });
		instant = instant.add({ hours: 24 });
	}
	assertLokWeek(lokWeek);
	return lokWeek;
};

function assertLokWeek(arr: LokDay[]): asserts arr is LokAsWeek {
	if (arr.length !== 7) throw new Error(`Expected exactly 7 elements, but got ${arr.length}`);
}
