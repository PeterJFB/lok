export const generateAlphaNumString = (length: number) => {
	if (!window.isSecureContext) {
		throw new Error('Cannot register user in an insecure context');
	}
	const array = new Uint32Array(length);
	window.crypto.getRandomValues(array);
	const alphaNumLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
	let output = '';
	for (const num of array) {
		output += alphaNumLetters[num % alphaNumLetters.length];
	}
	return output;
};
