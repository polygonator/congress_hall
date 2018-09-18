import match from 'switch-match';
import ismobile from 'ismobilejs';

/**
 * Constants
 */
export const constants = {
	MENU: {
		TOGGLE: 'COMMON/MENU/TOGGLE'
	},
	ISMOBILE: 'COMMON/ISMOBILE',
	SAVE_SCROLL_TOP: 'COMMON/SAVE_SCROLL_TOP',
	SET_INIT_SCREEN_HEIGHT: 'COMMON/SET_INIT_SCREEN_HEIGHT'
};

/**
 * Actions
 */
export const actions = {
	toggleMenu: () => (dispatch, getState) => {
		const {common} = getState();
		dispatch({
			type: constants.MENU.TOGGLE,
			menu: !common.menu
		});
	},
	setInitScreenHeight: height => ({
		type: constants.SET_INIT_SCREEN_HEIGHT,
		height
	}),
	isMobile: userAgent => dispatch => {
		dispatch({
			type: constants.ISMOBILE,
			payload: {
				isMobile: ismobile(userAgent).phone,
				isTablet: ismobile(userAgent).tablet
			}
		});
	},
	saveScrollTop: value => ({
		type: constants.SAVE_SCROLL_TOP,
		value
	})
};

/**
 * Initial state
 */
export const initialState = {
	isMobile: false,
	isTablet: false,
	height: undefined,
	menu: false
};

/**
 * Reducer
 */
export default (state = initialState, action) => match(action.type, {
	[constants.ISMOBILE]: () => ({...state, ...action.payload}),
	[constants.SET_INIT_SCREEN_HEIGHT]: () => ({...state, height: action.height}),
	[constants.MENU.TOGGLE]: () => ({...state, menu: action.menu}),
	[constants.SAVE_SCROLL_TOP]: () => ({...state, scrollTop: action.value})
}, state);
