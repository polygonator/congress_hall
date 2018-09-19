import React, {PureComponent} from 'react';
import styles from './CongressAndMice.css';
import CongressHall from 'app/components/Modules/CongressHall';

const data = {
	title: 'Congress hall & MICE',
	subTitle: 'Бизнес-центр ПРИМОРЬЕ КОНГРЕСС-ХОЛ',
	desc: 'Одним из крупнейших центров делового туризма на Черноморском побережье Краснодарского края и специализируется на организации MICE (Meetings, Incentives, Conferences, Exhibitions) мероприятий на море.'
};

class CongressAndMice extends PureComponent {
	render() {
		return (
			<section className={styles.root}>
				<CongressHall title={data.title} subTitle={data.subTitle} desc={data.desc} knowMore/>
			</section>
		);
	}
}

export default CongressAndMice;
