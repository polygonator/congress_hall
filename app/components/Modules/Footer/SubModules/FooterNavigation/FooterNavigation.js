import React, {PureComponent} from 'react';
import take from 'lodash/take';
import takeRight from 'lodash/takeRight';
import styles from './FooterNavigation.css';
import Logo from 'Modules/Header/SubModules/Logo';
import {mainNavigation} from 'app/shared/data';

class FooterNavigation extends PureComponent {
	render() {
		return (
			<nav className={styles.root}>
				<div className={styles.nav_left}>
					{take(mainNavigation, 2).map(({url, title}) => {
						return (
							<a
								key={url}
								href={url}
								className={styles.nav_item}
							>
								{title}
							</a>
						);
					})}
				</div>
				<Logo typeIcon="logoGold" className={styles.logo}/>
				<div className={styles.nav_right}>
					{takeRight(mainNavigation, 2).map(({url, title}) => {
						return (
							<a
								key={url}
								href={url}
								className={styles.nav_item}
							>
								{title}
							</a>
						);
					})}
				</div>
			</nav>
		);
	}
}

export default FooterNavigation;
