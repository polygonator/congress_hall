import match from 'switch-match';

/**
 * Constants
 */
export const constants = {
	SET: 'MODALS/SET'
};

/**
 * Initial state
 */
export const initialState = {
	show: false,
	options: {}
};

/**
 * Initial state
 */
export const actions = {
	set: (value = false, options) => ({
		type: constants.SET,
		value,
		options: options ? options : undefined
	})
};

/**
 * Reducer
 */
export default (state = initialState, action) => match(action.type, {
	[constants.SET]: () => ({...state, show: action.value, options: action.options ? action.options : state.options})
}, state);
