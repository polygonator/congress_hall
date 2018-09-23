import React, {PureComponent} from 'react';
import T from 'prop-types';
import cx from 'classnames';
import take from 'lodash/take';
import takeRight from 'lodash/takeRight';
import Logo from '../Logo';
import styles from './Navigation.css';
import {mainNavigation} from 'app/shared/data';

class Navigation extends PureComponent {
	static propTypes = {
		icon: T.string,
		className: T.string,
		onMainPage: T.bool.isRequired
	};

	static defaultProps = {
		icon: '',
		className: ''
	};

	render() {
		const {icon, className, onMainPage} = this.props;
		return (
			<nav className={cx(styles.root, {[className]: className})}>
				<div className={cx(styles.nav_left)}>
					{take(mainNavigation, 2).map(({url, title}) => {
						return (
							<a
								key={url}
								href={url}
								className={cx(styles.nav_item, {[styles.on_main_page]: onMainPage})}
							>
								{title}
							</a>
						);
					})}
				</div>
				<Logo typeIcon={icon} className={styles.logo}/>
				<div className={styles.nav_right}>
					{takeRight(mainNavigation, 2).map(({url, title}) => {
						return (
							<a
								key={url}
								href={url}
								className={cx(styles.nav_item, {[styles.on_main_page]: onMainPage})}
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

export default Navigation;
