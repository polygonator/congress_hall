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
		className: T.string
	};

	static defaultProps = {
		icon: '',
		className: ''
	};

	render() {
		const {icon, className} = this.props;
		return (
			<nav className={cx(styles.root, {[className]: className})}>
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
				<Logo typeIcon={icon} className={styles.logo}/>
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

export default Navigation;
