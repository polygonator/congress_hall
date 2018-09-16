<?php
defined('BASEPATH') OR exit('No direct script access allowed'); ?>

<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Main Page</title>
    <script src="https://unpkg.com/react@16/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
    <script	src="https://unpkg.com/prop-types@15.6/prop-types.js"></script>
   	<script src="https://cdn.jsdelivr.net/npm/lodash@4.17.10/lodash.js"></script>

    <link href="/assets/styles/style.css" rel="stylesheet">

    <link href="/assets/normalize/normalize.css" rel="stylesheet">

   <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,700" rel="stylesheet">

   <link href="https://fonts.googleapis.com/css?family=Noto+Sans:400,700" rel="stylesheet">

    <!-- Не для production -->
    <script src="https://unpkg.com/babel-standalone@6.15.0/babel.min.js"></script>

  </head>

  <body>
    <div id="root"></div>
    <script type="text/babel">

    const mainNavigation =[
    	{
        	url: '/',
        	title: 'главная'
        },
        {
        	url: '/config',
        	title: 'конфигуратор'
        },
        {
        	url: '/blog',
        	title: 'блог'
        },
        {
        	url: '/contacts',
        	title: 'контакты'
        }
    ];

    const langButton = [
    	{
    		id: 1,
    		title: 'ru'
    	},
    	{
    		id: 2,
    		title: 'eng'
    	},
    	{
    		id:3,
    		title: 'ger'
    	},
    	{
    		id:4,
    		title: 'fr'
    	},
    	{
    		id: 5,
    		title: 'sp'
    	},
    	{
    		id: 6,
    		title: 'chi'
    	},
    	{
    		id: 7,
    		title: 'jap'
    	}
    ]

    const servicesCard = [
    	{
    		id:1,
    		text: 'Корпоративные встречи, презентации, переговоры и подобное',
    		image: '/assets/images/collaboration.png'
    	},
    	{
    		id: 2,
    		text: 'Мотивационные туры и программы, тимбилдинги, обучение персонала, корпоративные праздники',
    		image: '/assets/images/003-itinerary.png'
    	},
    	{
    		id: 3,
    		text: 'Конференции, конгрессы, съезды, форумы, семинары',
    		image: '/assets/images/002-speaker.png'
    	},
    	{
    		id: 4,
    		text: 'Выставки, имиджевые мероприятия фестивали, благотворительные концерты',
    		image: '/assets/images/sportlights.png'
    	}
    ]

	class ServicesCard extends React.Component {

		render(){
			const {text, image} = this.props;
			return(
				<div className='cardRoot'>
					<img src={image} className='cardImage'/>
					<p className= 'cardText'>{text}</p>
				</div>
			)
		}
	}

	ServicesCard.propTypes ={
		text: PropTypes.string.isRequired,
		image: PropTypes.string.isRequired
	}

	class Input extends React.Component {
		constructor(...args){
			super(...args);
			this.state = {
				value: this.props.defaultValue
			};
			this.omittedFields = ['defaultValue', 'onChange', 'optionId', 'onClear', 'shouldClear', 'autoresize', 'labelClass', 'pattern'];
		};

		handleOnChange = e =>{
			const target = e.target;
			const {value} = this.state;
			const {pattern} = this.props;
			let isValid = true;
			if (value && pattern){
				const regExp = new RegExp(pattern);
				isValid  = regExp.test(value);
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
		};

		clear = () => {
			const {onClear, onChange} = this.props;
			this.setState({value: ''}, () => {
				if (this.$field) {
					this.$field.value = "";
				}
				if (onChange) {
					onChange("");
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

		autoresize = () => {
        	const {$field} = this;
        	if ($field) {
        		$field.style.height = 'auto';
        		$field.style.height = ($field.scrollHeight) + 'px';
        	}
        }

        saveNode = node => {
        	this.$field = node;
        }

        render(){
        	const {labelText, withoutTick, showTick, labelClass, className, textarea, error, id, ...rest} = this.props;
            const rootOptions = id ? {id} : {};
            const newRest = _.omit(rest, this.omittedFields);
            const {value} = this.state;
            const TextComponent = textarea ? 'textarea' : 'input';

        	return(
        	<div className={'rootInput' , (className ? className : '')} {...rootOptions}>
            	<label className='labelClass'>
            		{labelText ? <span className='labelText'>{labelText}</span> : null}
            			<div className='inputWrapper'>
            				<TextComponent ref={this.saveNode} defaultValue={value} {...newRest} className={TextComponent}/>
            			</div>
            	</label>
            </div>
        	)
        }
	}

	Input.propTypes = {
		className: PropTypes.string,
		id: PropTypes.string,
		labelClass: PropTypes.string,
		labelText: PropTypes.string,
        defaultValue: PropTypes.string,
        onChange: PropTypes.func,
        pattern: PropTypes.string,
        onClear: PropTypes.func,
        withoutTick: PropTypes.bool,
        shouldClear: PropTypes.bool,
        textarea: PropTypes.bool,
        autoresize: PropTypes.bool,
        showTick: PropTypes.bool,
        error: PropTypes.oneOfType([ PropTypes.string,  PropTypes.array])
	}

    class Header extends React.Component  {

    	render() {
    		const {mainNavigation} = this.props;

     		return(
    			<nav className = "header_root">
    				<div className='nav_left'>
    					{_.take(mainNavigation, 2).map(({url, title}) => {
    						return(
    							<a
    								key={url}
    								href={url}
    								className='nav_item'
    							>
    								{title}
    							</a>
    						);
    					})}
    				</div>
    				<img src='/assets/images/logotype.png' className='header_logo'/>
    				<div className='nav_right'>
    					{_.takeRight(mainNavigation, 2).map(({url, title}) => {
    						return(
    							<a
    								key={url}
    								href={url}
    								className='nav_item'
    							>
    								{title}
    							</a>
    						);
    					})}
    				</div>
    			</nav>
    		)
    	}

    }

    Header.propTypes ={
    	mainNavigation: PropTypes.array.isRequired
    }

    class CongressHall extends React.Component {

    	render() {

    		return(
    			<section className="congressRoot">
    				<div className="congress_title">
    					<h3 className="componentTitle">Congress hall & MICE</h3>
    				</div>
    				<div className='congress_text'>
    					<h5 className="congress_titleText">Бизнес-центр ПРИМОРЬЕ КОНГРЕСС-ХОЛ </h5>
    					<p className="componentText">Одним из крупнейших центров делового туризма на Черноморском побережье Краснодарского края и специализируется на организации MICE (Meetings, Incentives, Conferences, Exhibitions) мероприятий на море.</p>
    					<a className="know_more">Узнать больше</a>
    				</div>
    			</section>
    		);
    	}
    }

    class Services extends React.Component {

    	render(){
			const {cards} = this.props;
    		return(
    			<section className='servicesRoot'>
    				<div className='contentText'>
    					<div className="services_title">
                   			<h3 className="componentTitle">Сервисы</h3>
                		</div>
                    	<div className='services_text'>
                    		<p className="componentText">К услугам гостей SPA-центр, медицинский центр, крытый и открытый бассейны, тренажерный зал, боулинг, теннисный корт, площадка для тенниса. Доступ к WiFi.</p>
                    		<div className='underline'/>
                    	</div>
                    </div>
                    <div className='cardContainer'>
                    	{cards.map(card => (
                    		<ServicesCard key={card.id} {...card}/>
                    	))
                    	}

                    </div>
    			</section>
    		)
    	}
    }
	Services.propTypes ={
		cards: PropTypes.array.isRequired
	}

	class Configurator extends React.Component {
		render(){
			return(
				<section className='configRoot'>
					<div className= "configContent">
						<h3 className= 'configTitle'>КОНФИГУРАТОР</h3>
                    	<p className= 'configText'>Подобрать зал для Вашего события</p>
                    	<button className="createEventConfig">создать свой event</button>
					</div>
				</section>
			)
		}
	}

	class ContactUs extends React.Component {

		constructor(...args){
			super(...args);
			this.state = {
				name: "",
				email: "",
				phone: "",
				text: "",
				errors: {name: '', email: '', phone: ''},
				shouldClear: false,
			};
			this.fields = [
            	{type: 'text', title: 'name', labelText: 'Имя', isRequired: true, validation: ['isRequired']},
            	{type: 'email', title: 'email', labelText: 'Email', isRequired: true, validation: ['isEmail', 'isRequired']},
            	{type: 'text', title: 'phone', labelText: 'Телефон', isRequired: true, validation: ['isRequired']},
            ];
            this.clean = this.fields.length;
		}

		handleClear = () => {
			this.clean = this.clean - 1;
			if (this.clean <= 0) {
				this.setState({shouldClear: false})
				this.clean = this.clean.length;
			}
		}

		isFormComplete = () => {
			const {name, email, phone} = this.state;
			return name && email && phone;
		}

		handleOnChange = (name, value) => {
			const {errors} = this.state;
			this.setState({[name]: value, errors: {...errors, [name]: ''}});
		}

		handleSubmit = e => {
			e.preventDefault();
			/*add validation*/
			/*const data = _.omit(this.state, ['errors', 'shouldClear'])*/
			/*console.log(data);*/
		}

		renderField = field => {
			const {errors, shouldClear} = this.state;
			return(
				<Input
					key={field.title}
					id={field.title}
					type={field.type}
					name={field.name}
					className={field.title}
					required={field.isRequired}
					values={field.values}
					labelText={field.labelText}
					defaultValue={field.defaultValue}
                    onChange={_.partial(this.handleOnChange, field.title)}
                    shouldClear={shouldClear}
                    onClear={this.handleClear}
                    error={_.get(errors, field.title, '')}
				/>
			)
		}

		render(){
			const{subscribe} = this.state;
			return(
				<div className="contactRoot">
					<div className= "contactText">
						<div className="contact_title">
                         	<h3 className="componentTitle">СВЯЖИТЕСЬ С НАМИ</h3>
                        </div>
                        <div className='contact_text'>
                             <p className="componentText">Если у Вас возникли вопросы или вы хотите проконсультироваться с нами - воспользуйтесь формой обратной связи приведенной ниже в любое время суток.</p>
                             <div className='underline'/>
                        </div>
					</div>
					<form className= 'form' onSubmit= {this.handleSubmit}>
						{this.fields.map(this.renderField)}
						<Input textarea className='textareaContact' labelText='Сообщение'/>
						<div className='labelContainer'>
							<div className='contactLabel'>
                        		<label className='checkboxLabel'>
                                     <input type="checkbox" name="subscribe" className='checkboxInput' checked={subscribe} onChange={this.handleSubscribe}/>
                                     <span className='checkboxText'>Подписаться на рассылку последних новостей и спецпредложений</span>
                                </label>
                                <label className='checkboxLabel'>
                                     <input type="checkbox" name="subscribe" className='checkboxInput' checked={subscribe} onChange={this.handleSubscribe}/>
                                     <span className='checkboxText'>Согласен с обработкой персональных данных</span>
                                </label>
                        	</div>
                            <button className = 'submit' onClick={this.handleSubmit}>Отправить</button>
						</div>

					</form>
                </div>
			)
		}

	}


    class Content extends React.Component {

    	render() {

    		const {langButtons} = this.props;

    		return(
    			<main className='content_root'>
    				<section className= 'titleContainer'>
    					<div className='title_block'>
                        	<h1 className="title">MICE с Конгресс-Холл</h1>
                        	<button className="createEvent">создать свой event</button>
                        </div>
                        <div className='button_container'>
                        	{langButton.map(button => (
                        		<button key={button.id} className= 'buttonLang'>
                        			{button.title}
                        		</button>
                       			))
                        	}
                        </div>
                        <button className='scrollButton'/>
	   				</section>
	   				<CongressHall/>
	   				<Services cards={servicesCard}/>
	   				<Configurator/>
	   				<ContactUs/>
    			</main>
    		);
    	}
    }

    Content.propTypes = {
    	langButtons: PropTypes.array.isRequired
    }

    const App = () => {
    	return (
    		<div className='page_root'>
    			<Header mainNavigation={mainNavigation}/>
    			<Content langButtons={langButton}/>
    		</div>
    	)
    }

     ReactDOM.render(
       <App/>,
        document.getElementById('root')
     );

    </script>

  </body>
</html>
 <!-- <script src="/assets/js/like_button.js"></script> --!>
