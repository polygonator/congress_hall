import match from 'react-router/lib/match';
import history from 'react-router/lib/browserHistory';

export default ({location}, routes) =>
	new Promise((resolve, reject) => {
		return match({routes, location, history}, (err, _, props) =>
			err ? reject(err) : resolve(props)
		);
	});
