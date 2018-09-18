import React, {Component} from 'react';
import T from 'prop-types';
import {provideHooks} from 'redial';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import styles from './Layout.css';
import {actions as commonActions} from 'reducers/common';
import {actions as settingsActions} from 'reducers/settings';

class Layout extends Component {
	static propTypes = {
		common: T.object.isRequired,
		title: T.string.isRequired,
		children: T.element.isRequired,
		setInitScreenHeight: T.func.isRequired
	};

	constructor(...args) {
		super(...args);
		const {common} = this.props;
		this.handleScreenHeight = ::this.handleScreenHeight;
		if (__BROWSER__ && (common.isMobile || common.isTablet)) { // eslint-disable-line no-undef
			this.handleScreenHeight();
		}
	}

	componentDidMount() {
		const {common} = this.props;
		if (common.isMobile || common.isTablet) {
			const supportsOrientationChange = 'onorientationchange' in window;
			this.orientationEvent = supportsOrientationChange ? 'orientationchange' : 'resize';
			window.addEventListener(this.orientationEvent, this.handleScreenHeight);
		}
	}

	componentWillUnmount() {
		if (this.orientationEvent) {
			window.removeEventListener(this.orientationEvent, this.handleScreenHeight);
		}
	}

	handleScreenHeight() {
		this.props.setInitScreenHeight(Math.min(document.documentElement.clientHeight, window.innerHeight));
	}

	render() {
		const {title, children} = this.props;
		return (
			<div className={styles.root}>
				<Helmet titleTemplate="%s">
					<title>{title}</title>
				</Helmet>
				{children}
			</div>
		);
	}
}

const mapStateToProps = ({common}) => ({
	common,
	title: 'default title' // get title from state, for example from settings
});

const mapDispatchToProps = dispatch => ({
	setInitScreenHeight: height => dispatch(commonActions.setInitScreenHeight(height))
});

export default provideHooks({
	fetch: ({dispatch}) => Promise.all([
		dispatch(settingsActions.fetch())
	])
})(connect(mapStateToProps, mapDispatchToProps)(Layout));
