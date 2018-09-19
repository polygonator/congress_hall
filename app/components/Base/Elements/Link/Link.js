import React from 'react';
import T from 'prop-types';
import omit from 'lodash/omit';
import RouterLink from 'react-router/lib/Link';

const Link = ({to, ...rest}) => { // eslint-disable-line no-unused-vars
	return <RouterLink to={to ? `${to}` : null} {...omit(rest, ['dispatch'])}/>;
};

Link.propTypes = {
	to: T.string.isRequired
};

export default Link;
