import React, {PureComponent} from 'react';
import styles from './MainPage.css'; // eslint-disable-line import/order
import CongressAndMice from './SubModules/CongressAndMice';
import Services from './SubModules/Services';
import Configurator from './SubModules/Configurator';
import ContactUs from './SubModules/ContactUs';
import TitleSection from './SubModules/TitleSection';

class MainPage extends PureComponent {
	render() {
		return (
			<main className={styles.root}>
				<TitleSection/>
				<CongressAndMice/>
				<Services/>
				<Configurator/>
				<ContactUs/>
			</main>
		);
	}
}

export default MainPage;
