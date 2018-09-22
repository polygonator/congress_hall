import React, {PureComponent} from 'react';
import styles from './Configurator.css';
import Container from 'app/components/Grid/Container';

class Configurator extends PureComponent {
	render() {
		return (
			<section className={styles.root}>
				<Container className={styles.content}>
					<h3 className={styles.title}>КОНФИГУРАТОР</h3>
					<p className={styles.text}>Подобрать зал для Вашего события</p>
					<button type="button" className={styles.createEvent}>создать свой event</button>
				</Container>
			</section>
		);
	}
}

export default Configurator;
