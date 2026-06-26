export const sleep = async (milliSeconds: number) => {
	return new Promise((resolve) => setTimeout(resolve, milliSeconds));
};
