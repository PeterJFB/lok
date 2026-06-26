import type { Temporal } from '@js-temporal/polyfill';

export type LokAsWeek = [LokDay, LokDay, LokDay, LokDay, LokDay, LokDay, LokDay];

export type LokDay = { day: Temporal.Instant; available: [] };
