import React, {PureComponent} from 'react';
import styles from './Header.css';
import Navigation from './SubModules/Navigation';

class Header extends PureComponent {
	render() {
		return (
			<header id="header" className={styles.root}>
				<div className={styles.wrapper}>
					<Navigation icon="logoWhite"/>
				</div>
			</header>
		);
	}
}

export default Header;
