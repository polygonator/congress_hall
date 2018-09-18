import React, {PureComponent} from 'react';
import T from 'prop-types';
import omit from 'lodash/omit';
import cx from 'classnames';
import styles from './VerticalAlignContainer.css';

class VerticalAlignContainer extends PureComponent {
	static propTypes = {
		tag: T.string,
		className: T.string,
		childrenWrapperClassName: T.string,
		inheritHeight: T.bool,
		fixPosition: T.bool,
		fixToBottom: T.bool,
		children: T.any
	};

	static defaultProps = {
		tag: 'div',
		className: '',
		childrenWrapperClassName: '',
		inheritHeight: false,
		fixPosition: false,
		fixToBottom: false,
		children: null
	};

	constructor(...args) {
		super(...args);
		this.saveChildren = this.saveNode.bind(this, 'children');
		this.state = {position: undefined};
		this.omittedKeys = ['childrenWrapperClassName', 'fixPosition', 'fixToBottom', 'inheritHeight', 'children'];
	}

	render() {
		const {tag: Tag, className, ...other} = this.props;
		const classes = cx(styles.root, {[className]: Boolean(className)});

		return (
			<Tag className={classes} {...omit(other, this.omittedKeys)}>
				<div {...this.getChildrenOptions()}/>
			</Tag>
		);
	}

	componentDidMount() {
		const {fixPosition} = this.props;
		if (fixPosition && this.$children) {
			const position = (this.$children && this.$children.offsetTop) || 0;
			this.setState({position});
		}
	}

	saveNode(name, node) {
		this[`$${name}`] = node;
	}

	getChildrenOptions() {
		const {childrenWrapperClassName, fixPosition, fixToBottom, inheritHeight, children} = this.props;
		const options = {
			children,
			className: cx(styles.children, {
				[childrenWrapperClassName]: Boolean(childrenWrapperClassName),
				[styles.inheritHeight]: inheritHeight,
				[styles.fixToBottom]: fixToBottom
			})
		};

		if (fixPosition) {
			options.ref = this.saveChildren;
			options.style = {marginTop: this.state.position};
		}

		return options;
	}
}

export default VerticalAlignContainer;
