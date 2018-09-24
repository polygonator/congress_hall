import React, {PureComponent} from 'react';
import T from 'prop-types';
import styles from './BlogCard.css';
import Container from 'app/components/Grid/Container';

class BlogCard extends PureComponent {
	static propTypes ={
		title: T.string,
		date: T.string,
		desc: T.string,
		pictures: T.string
	};

	static defaultProps ={
		title: '',
		date: '',
		desc: '',
		pictures: ''
	};

	render() {
		const {title, date, desc, pictures} = this.props;
		return (
			<Container className={styles.root} block>
				<div className={styles.image_wrapp}>
					<img src={pictures} alt="" className={styles.image}/>
				</div>
				<div className={styles.title_block}>
					<h4 className={styles.title}>{title}</h4>
					<p className={styles.date}>{date}</p>
				</div>
				<div className={styles.desc_block}>
					<p className={styles.desc}>{desc}</p>
				</div>
			</Container>
		);
	}
}

export default BlogCard;
