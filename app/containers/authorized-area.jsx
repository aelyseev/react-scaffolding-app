import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import Routes from 'constants/routes';

export const AuthorizedArea = ({authorized, children}) => (
    authorized ? children : <Redirect to={Routes.login} />
);

AuthorizedArea.propTypes = {
    authorized: PropTypes.bool
};

export default connect(
    state => ({
        authorized: state.auth.authorized
    }),
    null,
    null,
    {
        pure: false // workaround for https://github.com/ReactTraining/react-router/issues/4671
    }
)(AuthorizedArea);
