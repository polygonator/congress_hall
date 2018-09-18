export function clamp(value, min = 0, max = 0) { // eslint-disable-line import/prefer-default-export
	return min === max ? min : Math.max(min, Math.min(value, max));
}
