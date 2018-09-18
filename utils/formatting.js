export function removeLineBreaks(str = '') { // eslint-disable-line import/prefer-default-export
	return str.replace(/\r?\n|\r/g, '');
}
