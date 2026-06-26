import { getOrCreateDeviceIdentifier } from './auth';

export const callApi = {
	get: async <R = unknown>(input: URL) => {
		const headers = new Headers();
		headers.append('authorization', getOrCreateDeviceIdentifier());
		headers.append('content-type', 'application/json');

		const res = await fetch(input, {
			method: 'GET',
			headers
		});

		if (!res.ok) {
			return {
				status: res.status,
				statusText: res.statusText,
				body: await res.json()
			};
		}

		return (await res.json()) as unknown;
	},
	post: async <T extends BodyInit, R = unknown>(input: URL, body: T) => {
		const headers = new Headers();
		headers.append('authorization', getOrCreateDeviceIdentifier());
		headers.append('content-type', 'application/json');

		const res = await fetch(input, {
			method: 'POST',
			headers,
			body
		});

		if (!res.ok) {
		}

		return (await res.json()) as R;
	}
};
