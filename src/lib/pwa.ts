export const isPWA = () => {
	if (window.matchMedia('(display-mode: standalone)').matches) {
		return true;
	}
	// Detect on iOS Safari https://developer.mozilla.org/en-US/docs/Web/API/Navigator#navigator.standalone
	if ('standalone' in window.navigator && window.navigator.standalone) {
		return true;
	}
	return false;
};
