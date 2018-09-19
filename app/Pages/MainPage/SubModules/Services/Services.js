import React, {PureComponent} from 'react';
import styles from './Services.css';
import CongressHall from 'app/components/Modules/CongressHall';
import ServicesCard from 'app/components/Modules/Cards/ServicesCard';
import Container from 'app/components/Grid/Container';

const data = {
	title: 'Сервисы',
	desc: 'К услугам гостей SPA-центр, медицинский центр, крытый и открытый бассейны, тренажерный зал, боулинг, теннисный корт, площадка для тенниса. Доступ к WiFi',
	cards: [
		{
			id: 1,
			text: 'Корпоративные встречи, презентации, переговоры и подобное',
			iconType: 'collaboration'
		},
		{
			id: 2,
			text: 'Мотивационные туры и программы, тимбилдинги, обучение персонала, корпоративные праздники',
			iconType: 'itinerary'
		},
		{
			id: 3,
			text: 'Конференции, конгрессы, съезды, форумы, семинары',
			iconType: 'speaker'
		},
		{
			id: 4,
			text: 'Выставки, имиджевые мероприятия фестивали, благотворительные концерты',
			iconType: 'sportlight'
		}
	]

};

class Services extends PureComponent {
	render() {
		return (
			<section className={styles.root}>
				<CongressHall title={data.title} desc={data.desc}/>
				<Container className={styles.cardsContainer}>
					{data.cards.map(card => (
						<ServicesCard key={card.id} {...card}/>
					))}
				</Container>
			</section>
		);
	}
}

export default Services;
