import React, {PureComponent} from 'react';
import styles from './MainPage.css'; // eslint-disable-line import/order
import CongressAndMice from './SubModules/CongressAndMice';
import Services from './SubModules/Services';
import Configurator from './SubModules/Configurator';
import ContactUs from './SubModules/ContactUs';
import {langButton} from 'app/shared/data';

class MainPage extends PureComponent {
	render() {
		return (
			<main className={styles.root}>
				<section className={styles.titleContainer}>
					<div className={styles.titleBlock}>
						<h1 className={styles.title}>MICE с Конгресс-Холл</h1>
						<button type="button" className={styles.creativeEvent}>создать свой event</button>
					</div>
					<div className={styles.buttonContainer}>
						{langButton.map(button => (
							<button key={button.id} className={styles.buttonLang} type="button">
								{button.title}
							</button>
						))
						}
					</div>
					<button type="button" className={styles.scrollButton}/>
					<CongressAndMice/>
					<Services/>
					<Configurator/>
					<ContactUs/>
				</section>
			</main>
		);
	}
}

export default MainPage;
