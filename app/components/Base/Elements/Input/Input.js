import React, {PureComponent} from 'react';
import T from 'prop-types';
import cx from 'classnames';
import omit from 'lodash/omit';
import styles from './Input.css';

class Input extends PureComponent {
	static propTypes = {
		className: T.string,
		labelClass: T.string,
		id: T.string,
		labelText: T.string,
		defaultValue: T.string,
		onChange: T.func,
		pattern: T.string,
		onClear: T.func,
		shouldClear: T.bool,
		textarea: T.bool,
		autoresize: T.bool,
		error: T.oneOfType([T.string, T.array])
	};

	static defaultProps = {
		id: '',
		labelText: '',
		className: '',
		labelClass: '',
		defaultValue: '',
		error: '',
		pattern: '',
		onChange: null,
		onClear: null,
		shouldClear: false,
		textarea: false,
		autoresize: false
	};

	constructor(...args) {
		super(...args);
		this.state = {
			value: this.props.defaultValue
		};

		this.clear = ::this.clear;
		this.saveNode = ::this.saveNode;
		this.autoresize = ::this.autoresize;
		this.handleOnChange = ::this.handleOnChange;
		this.omittedFields = ['defaultValue', 'onChange', 'optionId', 'onClear', 'shouldClear', 'autoresize', 'labelClass', 'pattern'];
	}

	handleOnChange(e) {
		const {target} = e;
		const {value} = target;
		const {pattern} = this.props;
		let isValid = true;
		if (value && pattern) {
			const regExp = new RegExp(pattern);
			isValid = regExp.test(value);
		}
		if (!isValid) {
			target.value = this.state.value;
			return;
		}
		const {onChange} = this.props;

		if (onChange) {
			onChange(value);
		}

		this.setState({value});
	}

	clear() {
		const {onClear, onChange} = this.props;
		this.setState({value: ''}, () => {
			if (this.$field) {
				this.$field.value = '';
			}
			if (onChange) {
				onChange('');
			}
			if (onClear) {
				onClear();
			}
		});
	}

	componentDidMount() {
		if (this.$field) {
			this.$field.addEventListener('input', this.handleOnChange);
			this.$field.addEventListener('change', this.handleOnChange);
		}
		if (this.props.autoresize) {
			this.autoresize();
		}
	}

	UNSAFE_componentWillReceiveProps(newProps) {
		if (newProps.shouldClear !== this.props.shouldClear && newProps.shouldClear) {
			this.clear();
		}
	}

	componentDidUpdate() {
		if (this.props.autoresize) {
			this.autoresize();
		}
	}

	componentWillUnmount() {
		if (this.$field) {
			this.$field.addEventListener('input', this.handleOnChange);
			this.$field.removeEventListener('change', this.handleOnChange);
		}
	}

	autoresize() {
		const {$field} = this;
		if ($field) {
			$field.style.height = 'auto';
			$field.style.height = ($field.scrollHeight) + 'px';
		}
	}

	saveNode(node) {
		this.$field = node;
	}

	render() {
		const {labelText, labelClass, className, textarea, error, id, ...rest} = this.props;
		const rootOptions = id ? {id} : {};
		const newRest = omit(rest, this.omittedFields);
		const {value} = this.state;
		const rootClasses = cx(styles.root, {[className]: className, [styles.error]: error});
		const TextComponent = textarea ? 'textarea' : 'input';
		return (
			<div className={rootClasses} {...rootOptions}>
				<label className={cx({[labelClass]: labelClass})}>
					{labelText ? <span className={styles.labelText}>{labelText}</span> : null}
					<div className={styles.inputWrapper}>
						<TextComponent ref={this.saveNode} defaultValue={value} {...newRest}/>
					</div>
				</label>
			</div>
		);
	}
}

export default Input;
