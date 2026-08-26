import { dev } from '$app/env';
import {
  LOK_AUTH_COOKIE_NAME,
  LOK_DEVICE_IDENTIFIER_KEY,
  LOK_DEVICE_IDENTIFIER_LENGTH
} from '$lib/std/auth';
import type { Temporal } from '@js-temporal/polyfill';
import type { Cookies } from '@sveltejs/kit';
import { generateAlphaNumString } from './crypto';

export const getDeviceIdentifier = () => {
  const deviceIdentifier = window.localStorage.getItem(LOK_DEVICE_IDENTIFIER_KEY);
  if (deviceIdentifier !== null) {
    return deviceIdentifier;
  }
};

export const getOrCreateDeviceIdentifier = () => {
  const deviceIdentifier = window.localStorage.getItem(LOK_DEVICE_IDENTIFIER_KEY);
  if (deviceIdentifier !== null) {
    return deviceIdentifier;
  }

  const newDeviceIdentifier = generateAlphaNumString(LOK_DEVICE_IDENTIFIER_LENGTH);
  window.localStorage.setItem(LOK_DEVICE_IDENTIFIER_KEY, newDeviceIdentifier);
  return newDeviceIdentifier;
};

/** Set correct auth cookie options based on environment */
export const setAuthCookie = (cookies: Cookies, token: string, expiresAt: Temporal.Instant) => {
  cookies.set(LOK_AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: !dev,
    sameSite: true,
    expires: new Date(expiresAt.epochMilliseconds),
    path: '/'
  });
};
