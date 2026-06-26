import { generateAlphaNumString } from './crypto';

const DEVICE_IDENTIFIER_KEY = 'LOK_DEVICE_IDENTIFIER';
const DEVICE_IDENTIFIER_LENGTH = 20;

export const getOrCreateDeviceIdentifier = () => {
	const deviceIdentifier = window.localStorage.getItem(DEVICE_IDENTIFIER_KEY);
	if (deviceIdentifier !== null) {
		return deviceIdentifier;
	}

	const newDeviceIdentifier = generateAlphaNumString(DEVICE_IDENTIFIER_LENGTH);
	window.localStorage.setItem(DEVICE_IDENTIFIER_KEY, newDeviceIdentifier);
	return newDeviceIdentifier;
};
