import React, {PureComponent} from 'react';
import T from 'prop-types';
import styles from './CongressHall.css';
import Container from 'app/components/Grid/Container';
import HalfContainer from 'app/components/Grid/HalfContainer';

class CongressHall extends PureComponent {
	static propTypes = {
		title: T.string,
		subTitle: T.string,
		desc: T.string,
		knowMore: T.bool
	};

	static defaultProps = {
		title: '',
		subTitle: '',
		desc: '',
		knowMore: false
	};

	render() {
		const {title, subTitle, desc, knowMore} = this.props;
		return (
			<Container className={styles.root}>
				<HalfContainer className={styles.titleBlock} block pureHalf>
					<h3 className={styles.title}>{title}</h3>
				</HalfContainer>
				<HalfContainer className={styles.textBlock} block pureHalf>
					{subTitle ? <h5 className={styles.subTitle}>{subTitle}</h5> : null}
					<p className={styles.desc}>{desc}</p>
					{knowMore ?
						<a className={styles.knowMore}>Узнать больше</a>						:
						<div className={styles.underline}/>
					}
				</HalfContainer>
			</Container>
		);
	}
}

export default CongressHall;
