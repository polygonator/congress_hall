import React, {PureComponent} from 'react';
import T from 'prop-types';
import {connect} from 'react-redux';
import {Carousel} from 'react-responsive-carousel';
import styles from './CongressAndMice.css';
import CongressHall from 'Modules/CongressHall';
import Gallery from 'Modules/Gallery';
import {mediaBPs} from 'app/shared/data';
import attachEventListener from 'components/HOC/eventListener';
import Container from 'app/components/Grid/Container';

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
	static propTypes = {
		common: T.object.isRequired
	};

	state ={
		isMobile: this.isMobileAndIsTablet
	};

	isMobileAndIsTablet = () => {
		const {common} = this.props;
		return __BROWSER__ ? window.matchMedia(mediaBPs.bp1).matches || window.matchMedia(mediaBPs.bp2).matches : common.isMobile || common.isTablet; // eslint-disable-line no-undef
	};

	resize = () => {
		this.setState({isMobile: this.isMobileAndIsTablet()});
	};

	render() {
		const {isMobile} = this.state;
		return (
			<section className={styles.root}>
				<CongressHall title={data.title} subTitle={data.subTitle} desc={data.desc} knowMore className={styles.congress}/>
				{isMobile ?
					<Container block>
						<Carousel showThumbs={false} showStatus={false}>
							{data.images.map(image => (
								<img key={image.id} src={image.url} alt=""/>
							))}
						</Carousel>
					</Container>					 :
					<Gallery images={data.images}/>
				}
			</section>
		);
	}
}

export default connect(({common}) => ({common}))(attachEventListener(CongressAndMice, 'resize'));
