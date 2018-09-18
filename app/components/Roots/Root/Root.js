import React, {Component} from 'react';
import T from 'prop-types';
import Provider from 'react-redux/lib/components/Provider';

class Root extends Component {
	static propTypes = {
		children: T.element.isRequired,
		store: T.object.isRequired
	};

	render() {
		return (
			<Provider store={this.props.store}>
				{this.props.children}
			</Provider>
		);
	}
}

export default Root;
