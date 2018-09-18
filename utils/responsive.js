import {mediaBPs} from 'app/shared/data';

export function getLayout() { // eslint-disable-line import/prefer-default-export
	for (const key in mediaBPs) {
		if (!mediaBPs.hasOwnProperty(key)) { // eslint-disable-line no-prototype-builtins
			continue;
		}

		if (window.matchMedia(mediaBPs[key]).matches) {
			return key;
		}
	}
}
