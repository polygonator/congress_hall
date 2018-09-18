import React, {Component} from 'react';
import RouterLink from 'react-router/lib/Link';

class Link extends Component {
	render() {
		return <RouterLink {...this.props}/>;
	}
}

export default Link;
