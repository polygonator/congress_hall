import match from 'switch-match';

/**
 * Constants
 */
export const constants = {
	SET: 'SEO/SET',
	SET_PATHNAME: 'SEO/SET_PATHNAME'
};

/**
 * Actions
 */
export const actions = {
	set: seo => ({type: constants.SET, seo})
};

/**
 * Initial state
 */
export const initialState = {};

/**
 * Reducer
 */
export default (state = initialState, action) => match(action.type, {
	[constants.SET]: () => ({...state, ...action.seo})
}, state);
