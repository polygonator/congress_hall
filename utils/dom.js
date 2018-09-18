/**
 * Checks if browser supports css property
 * @param {Array} array of properties you wanna check
 * example: ['transform', 'MozTransform', 'WebkitTransform', 'msTransform', 'OTransform']
 * @return {String} string of supported property
 */
import isMobile from 'ismobilejs';

export function getSupportedCSSProperty(arr) {
	const doc = document.documentElement;
	const len = arr.length;

	for (let i = 0; i < len; i++) {
		if (arr[i] in doc.style) {
			return arr[i];
		}
	}
}

export const scrollUp = () => {
	window.scrollTo(0, 0);
	const e = document.createEvent('UIEvents');
	e.initUIEvent('scroll', true, true, window, 1);
	window.dispatchEvent(e);
};

export function getRangeObject(win) { // Gets the first range object
	win = win || window;

	if (win.getSelection) { // Firefox/Chrome/Safari/Opera/IE9
		try {
			return win.getSelection().getRangeAt(0); // W3C DOM Range Object
		} catch (err) { /* If no text is selected an exception might be thrown */ } // eslint-disable-line  unicorn/catch-error-name
	}

	return null;
}

export function animate(speed, easing, callback) {
	const bezier = require('bezier-easing');
	bezier.css = {
		ease: bezier(0.25, 0.1, 0.25, 1.0), // eslint-disable-line new-cap
		linear: bezier(0.00, 0.0, 1.00, 1.0), // eslint-disable-line new-cap
		'ease-in': bezier(0.42, 0.0, 1.00, 1.0), // eslint-disable-line new-cap
		'ease-out': bezier(0.00, 0.0, 0.58, 1.0), // eslint-disable-line new-cap
		'ease-in-out': bezier(0.42, 0.0, 0.58, 1.0) // eslint-disable-line new-cap
	};
	const startTime = Date.now();
	let raf;

	(function loop() {
		const now = Date.now();
		const diff = now - startTime;
		const percent = diff / speed;

		if (percent > 1) {
			callback(1);
			cancelAnimationFrame(raf);
		} else {
			callback(bezier.css[easing](percent));
			raf = requestAnimationFrame(loop.bind(this));
		}
	})();
}

export const scrollTo = (where, node) => {
	const doc = document.documentElement;
	const scrollTop = node ? node.scrollTop : (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
	const dest = where - scrollTop;
	return new Promise(resolve => animate(750, 'ease', percent => {
		if (node) {
			node.scrollTop = scrollTop + (dest * percent);
		} else {
			window.scrollTo(0, scrollTop + (dest * percent));
		}
		if (percent === 1) {
			resolve();
		}
	}));
};

export const getScrollTop = () => {
	if (typeof window === 'undefined') {
		return 0;
	}
	return (window.pageYOffset || document.documentElement.scrollTop) - (document.documentElement.clientTop || 0);
};

export const overflowY = isOn => {
	const isMobileOrTablet = isMobile.phone || isMobile.tablet;
	document.body.style.overflow = isOn ? 'hidden' : '';
	document.body.style.position = (isMobileOrTablet && isOn) ? 'fixed' : '';
	document.body.style.height = (isMobileOrTablet && isOn) ? '100vh' : '';
};

export const scrollToId = (id, cb) => {
	const node = document.getElementById(id);
	if (!node) {
		return;
	}
	const isMobileOrTablet = isMobile.phone || isMobile.tablet;
	const doc = document.documentElement;
	const WW = doc.clientWidth || window.innerWidth;
	const rect = node.getBoundingClientRect();
	const offset = (WW > 768) ? 90 : 60;
	const currentScrollTop = getScrollTop();
	let newPosition = rect.top + currentScrollTop;

	if (isMobileOrTablet || (currentScrollTop !== newPosition && currentScrollTop >= newPosition - offset)) {
		newPosition -= offset;
	}
	scrollTo(newPosition);
	if (cb) {
		cb();
	}
};
