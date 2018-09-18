import get from 'lodash/get';

export const EMPTY_ARRAY = [];
export const EMPTY_OBJECT = {};
export function safeGet(src, path, defaultValue = undefined) { // eslint-disable-line import/prefer-default-export
	if (defaultValue !== undefined) {
		return get(src, path, defaultValue) || defaultValue;
	}
	return get(src, path);
}
