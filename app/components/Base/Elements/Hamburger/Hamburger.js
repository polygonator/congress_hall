import React, {PureComponent} from 'react';
import T from 'prop-types';
import cx from 'classnames';
import styles from './Hamburger.css';

class Hamburger extends PureComponent {
	static propTypes = {
		toggleMenu: T.func.isRequired,
		onMainPage: T.bool.isRequired
	};

	render() {
		const {toggleMenu, onMainPage} = this.props;
		return (
			<div
				className={cx(styles.root, {[styles.on_main_page]: onMainPage})}
				onClick={toggleMenu}
			>
				<button
					type="button"
					className={styles.buttonRoot}
				>
					<i/><i/><i/>
				</button>
			</div>
		);
	}
}

export default Hamburger;
