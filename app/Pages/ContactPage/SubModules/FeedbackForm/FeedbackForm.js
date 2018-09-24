import React, {PureComponent} from 'react';
import partial from 'lodash/partial';
import get from 'lodash/get';
import omit from 'lodash/omit';
import styles from './FeedbackForm.css';
import Container from 'app/components/Grid/Container';
import Input from 'Base/Elements/Input';
import {validate} from 'utils/validation';

class FeedbackForm extends PureComponent {
	constructor(...args) {
		super(...args);
		this.state = {
			name: '',
			email: '',
			phone: '',
			text: '',
			errors: {name: '', email: '', phone: ''},
			shouldClear: false
		};
		this.fields = [
			{type: 'text', title: 'name', labelText: 'Имя', isRequired: true, validation: ['isRequired']},
			{type: 'email', title: 'email', labelText: 'Email', isRequired: true, validation: ['isEmail', 'isRequired']},
			{type: 'text', title: 'phone', labelText: 'Телефон', isRequired: true, validation: ['isRequired']}
		];
		this.clean = this.fields.length;
	}

	handleSubscribeToggle = () => {
		this.setState({subscribe: !this.state.subscribe}); // eslint-disable-line  react/no-access-state-in-setstate
	};

	handlePersonalDataToggle = () => {
		this.setState({personal_data: !this.state.personal_data}); // eslint-disable-line  react/no-access-state-in-setstate
	};

	handleClear = () => {
		this.clean = this.clean - 1;
		if (this.clean <= 0) {
			this.setState({shouldClear: false});
			this.clean = this.clean.length;
		}
	};

	handleOnChange = (name, value) => {
		const {errors} = this.state;
		this.setState({[name]: value, errors: {...errors, [name]: ''}});
	};

	handleSubmit = e => {
		e.preventDefault();
		const {isValid, validateErrors} = validate(this.fields, this.state); // validate
		if (!isValid) {
			this.setState(prevState => ({errors: {...prevState.errors, ...validateErrors}}));
		}
		const data = omit(this.state, ['errors', 'shouldClear']);
		console.log(data);
	};

	renderField = field => {
		const {errors, shouldClear} = this.state;
		return (
			<Input
				key={field.title}
				id={field.title}
				type={field.type}
				name={field.name}
				className={styles[field.title]}
				required={field.isRequired}
				values={field.values}
				labelText={field.labelText}
				defaultValue={field.defaultValue}
				onChange={partial(this.handleOnChange, field.title)}
				shouldClear={shouldClear}
				onClear={this.handleClear}
				error={get(errors, field.title, '')}
			/>
		);
	};

	render() {
		const {text} = this.state;
		return (
			<Container className={styles.root} block>
				<h3 className={styles.title}>Форма обратной связи</h3>
				<form className={styles.form} onSubmit={this.handleSubmit}>
					{this.fields.map(this.renderField)}
					<Input textarea className={styles.message} labelText="Сообщение" id="text" values={text} onChange={partial(this.handleOnChange, 'text')}/>
					<button type="submit" className={styles.submit} onClick={this.handleSubmit}>Отправить</button>
				</form>
			</Container>
		);
	}
}

export default FeedbackForm;
