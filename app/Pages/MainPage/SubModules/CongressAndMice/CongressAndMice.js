import React, {PureComponent} from 'react';
import styles from './CongressAndMice.css';
import CongressHall from 'Modules/CongressHall';
import Gallery from 'Modules/Gallery';

const data = {
	title: 'Congress hall & MICE',
	subTitle: 'Бизнес-центр ПРИМОРЬЕ КОНГРЕСС-ХОЛ',
	desc: 'Одним из крупнейших центров делового туризма на Черноморском побережье Краснодарского края и специализируется на организации MICE (Meetings, Incentives, Conferences, Exhibitions) мероприятий на море.',
	images: [
		{
			id: 0,
			url: 'public/gallery1.png'
		},
		{
			id: 1,
			url: 'public/gallery2.png'
		},
		{
			id: 2,
			url: 'public/gallery3.png'
		},
		{
			id: 3,
			url: 'public/gallery4.png'
		},
		{
			id: 4,
			url: 'public/gallery5.png'
		},
		{
			id: 5,
			url: 'public/gallery1.png'
		},
		{
			id: 6,
			url: 'public/gallery2.png'
		},
		{
			id: 7,
			url: 'public/gallery3.png'
		},
		{
			id: 8,
			url: 'public/gallery4.png'
		},
		{
			id: 9,
			url: 'public/gallery5.png'
		},
		{
			id: 10,
			url: 'public/gallery1.png'
		}
	]
};

class CongressAndMice extends PureComponent {
	render() {
		return (
			<section className={styles.root}>
				<CongressHall title={data.title} subTitle={data.subTitle} desc={data.desc} knowMore className={styles.congress}/>
				<Gallery images={data.images}/>
			</section>
		);
	}
}

export default CongressAndMice;
