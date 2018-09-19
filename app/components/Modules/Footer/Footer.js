import React, {PureComponent} from 'react';
import styles from './Footer.css';
import Navigation from 'app/components/Modules/Header/SubModules/Navigation';
import Container from 'app/components/Grid/Container';

const sitelinks = [
	{
		url: '/corporative_clients',
		title: 'Корпоративным клиентам'
	},
	{
		url: '/careers',
		title: 'Карьера'
	},
	{
		url: '/history',
		title: 'История'
	},
	{
		url: '/privacy_policy',
		title: 'Политика обработки персональных данных'
	}
];

class Footer extends PureComponent {
	render() {
		return (
			<footer id="footer" className={styles.root}>
				<Container block className={styles.footer}>
					<Navigation icon="logoGold" className={styles.navigation}/>
					<div className={styles.credits}>
						<h6 className={styles.creditText}>© ПАО Пансионат “Приморье”» все права защищены Законом РФ.</h6>
						<div className={styles.footerLinks}>
							{sitelinks.map(({url, title}) => {
								return (
									<a
										key={url}
										href={url}
										className={styles.footerItems}
									>
										{title}
									</a>
								);
							})}
						</div>
					</div>
				</Container>
			</footer>
		);
	}
}

export default Footer;
