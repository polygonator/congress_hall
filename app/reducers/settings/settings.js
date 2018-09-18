import match from 'switch-match';
import {safeGet} from 'utils/safeGet';
import fetch from 'utils/fetch';
import api from 'app/apiRoutes';

/**
 * Constants
 */
export const constants = {
	FETCH: 'SETTINGS/FETCH'
};

/**
 * Actions
 */
export const actions = {
	fetch: () => async (dispatch, getState) => {
		const {settings} = getState();
		/* !api.settings checking is not universe and it just need to */
		if (settings || !api.settings) {
			return;
		}
		const payload = await fetch.get(api.settings);
		const items = {};
		safeGet(payload, 'settings', []).forEach(data => {
			items[data.code] = data;
		});

		return dispatch({
			type: constants.FETCH,
			payload: {...payload, settings: items}
		});
	}
};

/**
 * Initial state
 */
export const initialState = null;

/**
 * Reducer
 */
export default (state = initialState, action) => match(action.type, {
	[constants.FETCH]: () => action.payload
}, state);
