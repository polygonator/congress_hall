import React, {PureComponent} from 'react';
import T from 'prop-types';
import styles from './Hamburger.css';

class Hamburger extends PureComponent {
	static propTypes = {
		toggleMenu: T.func.isRequired
	};

	render() {
		const {toggleMenu} = this.props;
		return (
			<div
				className={styles.root}
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
