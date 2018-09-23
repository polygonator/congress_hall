import React, {PureComponent} from 'react';
import T from 'prop-types';
import {connect} from 'react-redux';
import cx from 'classnames';
import styles from './Header.css';
import Navigation from './SubModules/Navigation';
import Hamburger from 'Base/Elements/Hamburger';
import {actions as popupsActions} from 'reducers/popups';

class Header extends PureComponent {
	static propTypes = {
		location: T.object.isRequired,
		showMenuPopup: T.func.isRequired
	};

	render() {
		const {location, showMenuPopup} = this.props;
		const reg = /^\/*\/?$/;
		const onMainPage = reg.test(location.pathname);
		const rootStyles = cx(styles.root, {
			[styles.on_main_page]: onMainPage
		});
		const logoColor = onMainPage ? 'logoWhite' : 'logoGold';

		return (
			<header id="header" className={rootStyles}>
				<div className={styles.wrapper}>
					<Hamburger toggleMenu={showMenuPopup}/>
					<Navigation icon={logoColor} onMainPage={onMainPage}/>
				</div>
			</header>
		);
	}
}

export default connect((null),
	dispatch => ({
		showMenuPopup: options => dispatch(popupsActions.set(true, {
			...options,
			popup: 'menuPopup',
			inheritHeight: true
		}))
	}))(Header);
