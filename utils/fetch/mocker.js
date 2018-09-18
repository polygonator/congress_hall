import mock from 'superagent-mocker';
import apiResponses from './apiResponses';
import api from 'app/apiRoutes';

const mocker = superagent => {
	const mockInstance = mock(superagent);
	mockInstance.get(api.main, apiResponses.main);
};

export default mocker;
