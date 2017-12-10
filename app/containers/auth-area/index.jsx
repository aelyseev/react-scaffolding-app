import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';

import {win} from 'lib/browser';
import {getUserToken, updateToken} from 'store/user';
import Routes from 'constants/routes';
import {AUTH_STORAGE_KEY} from 'store';

const tokenStorageHandler = props => (e) => {
    if (e.key !== AUTH_STORAGE_KEY) {
        return;
    }
    let token;
    try {
        const state = JSON.parse(e.newValue);
        token = getUserToken(state);
    } catch (ex) {
        token = null;
    }
    props.updateToken(token);
};

@connect(
    state => ({
        authToken: getUserToken(state) || ''
    }),
    {
        updateToken
    }
)
export default class AuthArea extends Component {
    static propTypes = {
        authToken: PropTypes.string,
        children: PropTypes.node.isRequired,
        /* eslint-disable */
        updateToken: PropTypes.func
        /* eslint-enable */
    };

    componentDidMount() {
        this.storageHandler = tokenStorageHandler(this.props);
        win.addEventListener('storage', this.storageHandler);
    }

    componentWillUnmount() {
        win.removeEventListener('storage', this.storageHandler);
    }

    render() {
        const {authToken} = this.props;
        return authToken ? this.props.children : <Redirect to={Routes.login} />;
    }
}
