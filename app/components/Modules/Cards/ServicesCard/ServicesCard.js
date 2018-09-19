import React, {PureComponent} from 'react';
import T from 'prop-types';
import styles from './ServicesCard.css';
import Icons from 'app/components/Base/Elements/Icons';

class ServicesCard extends PureComponent {
	static propTypes ={
		text: T.string,
		iconType: T.string
	};

	static defaultProps ={
		text: '',
		iconType: ''
	};

	render() {
		const {text, iconType} = this.props;
		return (
			<div className={styles.root}>
				<Icons type={iconType} className={styles.image}/>
				<p className={styles.text}>{text}</p>
			</div>
		);
	}
}

export default ServicesCard;
