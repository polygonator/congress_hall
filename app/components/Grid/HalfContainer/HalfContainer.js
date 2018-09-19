import React, {PureComponent} from 'react';
import T from 'prop-types';
import cx from 'classnames';
import styles from './HalfContainer.css';

class HalfContainer extends PureComponent {
	static propTypes = {
		className: T.string,
		pureHalf: T.bool,
		wrap: T.bool,
		block: T.bool,
		column: T.bool,
		justifyContentCenter: T.bool,
		alignItemsCenter: T.bool,
		tag: T.string,
		marginRight: T.bool
	};

	static defaultProps = {
		tag: 'div',
		className: '',
		pureHalf: false,
		wrap: false,
		column: false,
		justifyContentCenter: false,
		alignItemsCenter: false,
		block: false,
		marginRight: false
	};

	render() {
		const {tag: Tag, className, pureHalf, wrap, block, column, justifyContentCenter, alignItemsCenter, marginRight, ...other} = this.props;
		const classes = cx(styles.root, {
			[className]: Boolean(className),
			[styles.pureHalf]: pureHalf,
			[styles.wrap]: wrap,
			[styles.block]: block,
			[styles.column]: column,
			[styles.justifyContentCenter]: justifyContentCenter,
			[styles.alignItemsCenter]: alignItemsCenter,
			[styles.marginRight]: marginRight
		});

		return (
			<Tag className={classes} {...other}/>
		);
	}
}

export default HalfContainer;
