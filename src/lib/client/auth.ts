import { generateAlphaNumString } from './crypto';

export const LOK_AUTH_COOKIE_NAME = 'lok_auth_cookie';

export const LOK_DEVICE_IDENTIFIER_KEY = 'LOK_DEVICE_IDENTIFIER';
export const LOK_DEVICE_IDENTIFIER_LENGTH = 20;

export const getOrCreateDeviceIdentifier = () => {
  const deviceIdentifier = window.localStorage.getItem(LOK_DEVICE_IDENTIFIER_KEY);
  if (deviceIdentifier !== null) {
    return deviceIdentifier;
  }

  const newDeviceIdentifier = generateAlphaNumString(LOK_DEVICE_IDENTIFIER_LENGTH);
  window.localStorage.setItem(LOK_DEVICE_IDENTIFIER_KEY, newDeviceIdentifier);
  return newDeviceIdentifier;
};

export const getDeviceIdentifier = () => {
  const deviceIdentifier = window.localStorage.getItem(LOK_DEVICE_IDENTIFIER_KEY);
  if (deviceIdentifier !== null) {
    return deviceIdentifier;
  }
};
