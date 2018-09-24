import React, {PureComponent} from 'react';
import T from 'prop-types';
import cx from 'classnames';
import styles from './Container.css';

class Container extends PureComponent {
	static propTypes = {
		className: T.string,
		block: T.bool,
		tag: T.string
	};

	static defaultProps = {
		tag: 'div',
		className: '',
		block: false
	};

	render() {
		const {tag: Tag, className, block, ...other} = this.props;
		const classes = cx(styles.root, {
			[className]: Boolean(className),
			[styles.block]: block
		});

		return (
			<Tag className={classes} {...other}/>
		);
	}
}

export default Container;
