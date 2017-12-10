import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {logoutUser} from 'store/user';

function Logout({logout}) {
    logout();
    return <div />;
}

Logout.propTypes = {
    logout: PropTypes.func
};

export default connect(null, {logout: logoutUser})(Logout);
