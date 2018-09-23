import React, {PureComponent} from 'react';
import T from 'prop-types';
import {connect} from 'react-redux';
import styles from './MenuPopup.css';
import Link from 'Base/Elements/Link';
import {mediaBPs, mainNavigation} from 'app/shared/data';
import attachEventListener from 'components/HOC/eventListener';

class MenuPopup extends PureComponent {
	static propTypes = {
		onClose: T.func.isRequired,
		common: T.object.isRequired,
		location: T.object.isRequired
		// options: T.object.isRequired
	};

	state ={
		isMobile: this.isMobileAndIsTablet
	};

	isMobileAndIsTablet =() => {
		const {common} = this.props;
		return __BROWSER__ ? window.matchMedia(mediaBPs.bp1).matches || window.matchMedia(mediaBPs.bp2).matches : common.isMobile || common.isTablet; // eslint-disable-line no-undef
	};

	resize = () => {
		this.setState({isMobile: this.isMobileAndIsTablet()}, () => {
			if (!this.state.isMobile) {
				this.props.onClose();
			}
		});
	};

	componentDidUpdate(prevProps) {
		if (prevProps.location !== this.props.location) {
			this.props.onClose();
		}
	}

	render() {
		return (
			<div className={styles.root}>
				<div className={styles.menu_navigation}>
					{mainNavigation.map(({url, title}) => {
						return (
							<Link
								key={url}
								to={url}
								className={styles.nav_item}
							>
								{title}
							</Link>
						);
					})}
				</div>
			</div>
		);
	}
}

export default connect(({common}) => ({common}))(attachEventListener(MenuPopup, 'resize'));
