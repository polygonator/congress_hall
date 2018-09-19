import React, {PureComponent} from 'react';
import T from 'prop-types';
import cx from 'classnames';
import styles from './Logo.css';
import Icons from 'app/components/Base/Elements/Icons';
import Link from 'app/components/Base/Elements/Link';

class Logo extends PureComponent {
	static propTypes = {
		className: T.string,
		onMainPage: T.bool,
		typeIcon: T.string
	};

	static defaultProps = {
		className: '',
		onMainPage: false,
		typeIcon: ''
	};

	render() {
		const {className, onMainPage, typeIcon} = this.props;
		return (
			<div className={styles.root}>
				<Link
					to="/"
					className={className}
					activeClassName={styles.active}
				>
					<Icons type={typeIcon} className={cx(styles.icon, {[styles.on_main_page]: onMainPage})}/>
				</Link>
			</div>
		);
	}
}

export default Logo;
