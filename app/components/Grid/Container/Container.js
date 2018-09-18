import React, {PureComponent} from 'react';
import T from 'prop-types';
import cx from 'classnames';
import styles from './Container.css';

class Container extends PureComponent {
	static propTypes = {
		className: T.string,
		noDefaultPaddings: T.bool,
		wrap: T.bool,
		block: T.bool,
		column: T.bool,
		justifyContentCenter: T.bool,
		alignItemsCenter: T.bool,
		tag: T.string
	};

	static defaultProps = {
		tag: 'div',
		className: '',
		column: false,
		noDefaultPaddings: false,
		justifyContentCenter: false,
		alignItemsCenter: false,
		wrap: false,
		block: false
	};

	render() {
		const {tag: Tag, className, wrap, column, justifyContentCenter, alignItemsCenter, noDefaultPaddings, block, ...other} = this.props;
		const classes = cx(styles.root, {
			[className]: Boolean(className),
			[styles.wrap]: wrap,
			[styles.block]: block,
			[styles.column]: column,
			[styles.justifyContentCenter]: justifyContentCenter,
			[styles.alignItemsCenter]: alignItemsCenter,
			[styles.noDefaultPaddings]: noDefaultPaddings
		});

		return (
			<Tag className={classes} {...other}/>
		);
	}
}

export default Container;
