import React, {PureComponent} from 'react';
import styles from './TitleSection.css';
import {langButton} from 'app/shared/data';
import Icons from 'Base/Elements/Icons';
import {scrollTo, getScrollTop} from 'utils/dom';

class TitleSection extends PureComponent {
	saveRoot = node => {
		this.$root = node;
	};

	handleButtonClick = () => {
		if (!(this.$root)) {
			return;
		}
		const {bottom} = this.$root.getBoundingClientRect();
		const scrollTop = getScrollTop();
		scrollTo((bottom + 60) + scrollTop);
	};

	render() {
		return (
			<section ref={this.saveRoot} className={styles.root}>
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
				<button
					type="button"
					className={styles.scrollButton}
					onClick={this.handleButtonClick}
				>
					<Icons type="chevronDown"/>
				</button>
			</section>
		);
	}
}

export default TitleSection;
