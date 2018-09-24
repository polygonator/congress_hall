import React, {PureComponent} from 'react';
import T from 'prop-types';
import {YMaps, Map, Placemark} from 'react-yandex-maps';
import styles from './ContactPage.css';
import FeedbackForm from './SubModules/FeedbackForm';
import Container from 'app/components/Grid/Container';

const mapState = {center: [44.566191, 38.076648], zoom: 17, controls: []};

const Cards = ({title, text}) => (
	<div className={styles.card}>
		<h5 className={styles.titleCard}>{title}</h5>
		<p className={styles.textCard}>{text}</p>
	</div>
);

Cards.defaultProps = {
	title: '',
	text: ''
};

Cards.propTypes = {
	title: T.string,
	text: T.string
};

const cards = [
	{
		id: 1,
		title: 'Бронирование:',
		text: 'bron@primore.ru'
	}, {
		id: 2,
		title: 'Маркетинговый отдел:',
		text: 'marketing@primore.ru'
	}, {
		id: 3,
		title: 'Отдел снабжения:',
		text: 'zakup@primore.ru'
	}, {
		id: 4,
		title: 'Размещение:',
		text: '+7 (86141) 72 111'
	}, {
		id: 5,
		title: 'Call - центр',
		text: '8 (800) 2000 760'
	}
];

class ContactPage extends PureComponent {
	render() {
		return (
			<main className={styles.root}>
				<section className={styles.map}>
					<YMaps>
						<Map state={mapState} width="100%" height="380px">
							<Placemark
								geometry={{
									coordinates: [44.5658570, 38.076423]
								}}
								properties={{
									hintContent: 'улица Мира, 21'
								}}
								options={{
									iconLayout: 'default#image',
									iconImageHref: 'public/geo.png',
									iconImageSize: [32, 32],
									hasBalloon: false
								}}
							/>
						</Map>
					</YMaps>
				</section>
				<Container className={styles.contacts}>
					<div className={styles.address}>
						<h5 className={styles.title}>Адрес</h5>
						<p className={styles.text}>353460, РФ, Краснодарский край, г. Геленджик, ул. Мира, 21</p>
					</div>
					<div className={styles.additionally}>
						<div className={styles.cards}>
							{cards.map(card => (
								<Cards key={card.id} {...card}/>
							))}
						</div>
					</div>
				</Container>
				<FeedbackForm/>
			</main>
		);
	}
}

export default ContactPage;
