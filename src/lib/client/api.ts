import { err, ok, type Result } from '$lib/std/result';

export type ReqErr =
  | {
      type: 'bad-request';
      status: 400;
      statusText: string;
      body: unknown;
    }
  | {
      type: 'unauthorized';
      status: 401;
      statusText: string;
      body: unknown;
    }
  | {
      type: 'not-found';
      status: 404;
      statusText: string;
      body: unknown;
    }
  | {
      type: 'server-error';
      status: 500;
      statusText: string;
      body: unknown;
    }
  | {
      type: 'unknown';
      status: number;
      statusText: string;
      body: unknown;
    };

export const using = (fetchOverride: typeof fetch) => ({
  get: async <R = unknown>(input: URL): Promise<Result<R, ReqErr>> => {
    const headers = new Headers();
    headers.append('content-type', 'application/json');

    const res = await fetchOverride(input, {
      method: 'GET',
      headers
    });

    if (!res.ok) {
      switch (res.status) {
        case 400:
          return err({
            type: 'bad-request',
            status: res.status,
            statusText: res.statusText,
            body: res.bodyUsed ? await res.json() : undefined
          });
        case 401:
          return err({
            type: 'unauthorized',
            status: res.status,
            statusText: res.statusText,
            body: res.bodyUsed ? await res.json() : undefined
          });
        case 404:
          return err({
            type: 'not-found',
            status: res.status,
            statusText: res.statusText,
            body: res.bodyUsed ? await res.json() : undefined
          });
        case 500:
          return err({
            type: 'server-error',
            status: res.status,
            statusText: res.statusText,
            body: res.bodyUsed ? await res.json() : undefined
          });
        default:
          return err({
            type: 'unknown',
            status: res.status,
            statusText: res.statusText,
            body: res.bodyUsed ? await res.json() : undefined
          });
      }
    }

    return ok(res.bodyUsed ? await res.json() : undefined);
  },
  post: async <T extends object, R = unknown>(
    input: URL | string,
    body: T
  ): Promise<Result<R, ReqErr>> => {
    const headers = new Headers();
    headers.append('content-type', 'application/json');

    const res = await fetchOverride(input, {
      method: 'POST',
      headers,
      credentials: 'same-origin',
      body: JSON.stringify(body)
    });

    if (!res.ok) {
      switch (res.status) {
        case 400:
          return err({
            type: 'bad-request',
            status: res.status,
            statusText: res.statusText,
            body: res.bodyUsed ? await res.json() : undefined
          });
        case 401:
          return err({
            type: 'unauthorized',
            status: res.status,
            statusText: res.statusText,
            body: res.bodyUsed ? await res.json() : undefined
          });
        case 404:
          return err({
            type: 'not-found',
            status: res.status,
            statusText: res.statusText,
            body: res.bodyUsed ? await res.json() : undefined
          });
        case 500:
          return err({
            type: 'server-error',
            status: res.status,
            statusText: res.statusText,
            body: res.bodyUsed ? await res.json() : undefined
          });
        default:
          return err({
            type: 'unknown',
            status: res.status,
            statusText: res.statusText,
            body: res.bodyUsed ? await res.json() : undefined
          });
      }
    }

    return ok(res.bodyUsed ? await res.json() : undefined);
  }
});

export const callApi = {
  ...using(fetch),
  using: using
};
