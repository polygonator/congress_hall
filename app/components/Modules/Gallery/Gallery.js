import React, {PureComponent} from 'react';
import T from 'prop-types';
import cx from 'classnames';
import partial from 'lodash/partial';
import styles from './Gallery.css';
import Container from 'Grid/Container';

class Gallery extends PureComponent {
	static propTypes ={
		images: T.array
	};

	static defaultProps ={
		images: []
	};

	state = {
		selectImage: this.props.images[0]
	};

	handleSelectedImage = id => this.setState({selectImage: this.props.images[id]});

	handleNextImage = () => {
		const index = this.state.selectImage.id;
		if (index < this.props.images.length - 1) {
			this.setState({selectImage: this.props.images[index + 1]});
		}
	};

	handlePrevImage =() => {
		const index = this.state.selectImage.id;
		if (index > 0) {
			this.setState({selectImage: this.props.images[index - 1]});
		}
	};

	render() {
		const {images} = this.props;
		const {selectImage} = this.state;
		return (
			<Container block className={styles.root}>
				<div className={styles.navigation}>
					<button type="button" className={styles.next} onClick={this.handleNextImage}/>
					<button type="button" className={styles.prev} onClick={this.handlePrevImage}/>
				</div>
				<div className={styles.selectImgContainer}>
					<img src={selectImage.url} alt="" className={styles.select_image}/>
				</div>
				<div className={styles.container}>
					{images.map(image => {
						const active = image.id === selectImage.id;
						return (
							<div
								key={image.id}
								className={cx(styles.imageContainer, {[styles.active]: active})}
								onClick={partial(this.handleSelectedImage, image.id)}
							>
								<img
									src={image.url}
									className={styles.image}
									alt=""
								/>
							</div>
						);
					})}
				</div>
			</Container>
		);
	}
}

export default Gallery;
