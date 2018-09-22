import React, {PureComponent} from 'react';
import cx from 'classnames';
import partial from 'lodash/partial';
import get from 'lodash/get';
import styles from './ContactUs.css';
import CongressHall from 'app/components/Modules/CongressHall';
import Input from 'app/components/Base/Elements/Input';
import Container from 'app/components/Grid/Container';

const data = {
	title: 'СВЯЖИТЕСЬ С НАМИ',
	desc: 'Если у Вас возникли вопросы или вы хотите проконсультироваться с нами - воспользуйтесь формой обратной связи приведенной ниже в любое время суток.'
};

class ContactUs extends PureComponent {
	constructor(...args) {
		super(...args);
		this.state = {
			name: '',
			email: '',
			phone: '',
			// text: '',
			errors: {name: '', email: '', phone: ''},
			shouldClear: false,
			subscribe: false,
			personal_data: false
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

	isFormComplete = () => {
		const {name, email, phone} = this.state;
		return name && email && phone;
	};

	handleOnChange = (name, value) => {
		const {errors} = this.state;
		this.setState({[name]: value, errors: {...errors, [name]: ''}});
	};

	handleSubmit = e => {
		e.preventDefault();
		/* add validation */
		/* const data = _.omit(this.state, ['errors', 'shouldClear']) */
		/* console.log(data); */
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
		const {subscribe, personal_data} = this.state;
		return (
			<section className={styles.root}>
				<CongressHall title={data.title} desc={data.desc} className={styles.congress}/>
				<Container block>
					<form className={styles.form} onSubmit={this.handleSubmit}>
						{this.fields.map(this.renderField)}
					</form>
					<Input textarea className={styles.message} labelText="Сообщение"/>
					<div className={styles.labelContainer}>
						<div className={styles.label}>
							<label className={cx(styles.checkboxLabel, {[styles.checked]: subscribe})}>
								<input
									type="checkbox"
									value={subscribe}
									onChange={this.handleSubscribeToggle}
									className={styles.checkbox}
								/>
								<span className={styles.text}>Подписаться на рассылку последних новостей и спецпредложений</span>
							</label>
							<label className={cx(styles.checkboxLabel, {[styles.checked]: personal_data})}>
								<input
									type="checkbox"
									value={personal_data}
									onChange={this.handlePersonalDataToggle}
									className={styles.checkbox}
								/>
								<span className={styles.text}>Согласен с обработкой персональных данных</span>
							</label>
						</div>
						<button type="submit" className={styles.submit} onClick={this.handleSubmit}>Отправить</button>
					</div>
				</Container>
			</section>
		);
	}
}

export default ContactUs;
