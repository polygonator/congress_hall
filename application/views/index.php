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

   <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400" rel="stylesheet">

   <link href="https://fonts.googleapis.com/css?family=Noto+Sans:400,700" rel="stylesheet">

    <!-- Не для production -->
    <script src="https://unpkg.com/babel-standalone@6.15.0/babel.min.js"></script>

    <style>



    </style>

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
