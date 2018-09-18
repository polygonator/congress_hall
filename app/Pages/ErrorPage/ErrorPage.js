import {STATUS_CODES} from 'http';
import React from 'react';
import T from 'prop-types';
import cx from 'classnames';
import Helmet from 'react-helmet';
import styles from './ErrorPage.css';
import Container from 'Grid/Container';
import VerticalAlignContainer from 'Grid/VerticalAlignContainer';

const ErrorPage = ({status, pure_page}) => (
	<Container column tag="main" className={cx(styles.root, {[styles.pure_page]: pure_page})}>
		<VerticalAlignContainer className={styles.contentContainer}>
			<Helmet titleTemplate="%s">
				<title>{`${status}${STATUS_CODES[status] ? ` - ${STATUS_CODES[status]}` : ''}`}</title>
			</Helmet>
			<h1 className={styles.code}>
				<b>{status}</b>
			</h1>
			<h3 className={styles.message}>
				<span>{STATUS_CODES[status]}</span>
			</h3>
		</VerticalAlignContainer>
	</Container>
);

ErrorPage.defaultProps = {
	status: 404,
	pure_page: false
};

ErrorPage.propTypes = {
	status: T.number,
	pure_page: T.bool
};

export default ErrorPage;
