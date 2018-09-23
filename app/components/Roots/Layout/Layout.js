import React, {Component} from 'react';
import T from 'prop-types';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import Transition from 'react-transition-group/Transition';
import styles from './Layout.css';
import Header from 'Modules/Header';
import Footer from 'Modules/Footer';
import Popup from 'Modules/Popup';
import {actions as commonActions} from 'reducers/common';
import {safeGet} from 'utils/safeGet';

class Layout extends Component {
	static propTypes = {
		common: T.object.isRequired,
		title: T.string.isRequired,
		children: T.element.isRequired,
		setInitScreenHeight: T.func.isRequired,
		location: T.object.isRequired,
		popups: T.object.isRequired
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

	handleWaitNextTick = node => {
		return node.offsetHeight;
	};

	render() {
		const {title, children, location, popups} = this.props;
		return (
			<div className={styles.root}>
				<Helmet titleTemplate="%s">
					<title>{title}</title>
				</Helmet>
				<Transition
					mountOnEnter
					unmountOnExit
					in={popups.show}
					timeout={{
						enter: safeGet(popups, 'animationTimeouts.enter', 1),
						exit: safeGet(popups, 'animationTimeouts.exit', 1)
					}}
					onEnter={this.handleWaitNextTick}
				>
					{status => (
						<Popup
							location={location}
							status={status}
						/>
					)}
				</Transition>
				<Header location={location}/>
				{children}
				<Footer/>
			</div>
		);
	}
}

const mapStateToProps = ({common, popups}) => ({
	common,
	popups,
	title: 'default title' // get title from state, for example from settings
});

const mapDispatchToProps = dispatch => ({
	setInitScreenHeight: height => dispatch(commonActions.setInitScreenHeight(height))
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
