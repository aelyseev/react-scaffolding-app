/* eslint-disable react/sort-comp */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Col, Grid, Row} from 'react-bootstrap';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {matchPath} from 'react-router';
import {withRouter} from 'react-router-dom';
import Routes from 'constants/routes';
import moment from 'moment';

import Logo from 'components/logo';
import Space from 'components/space';
import Sidebar from 'containers/sidebar';
import Login from 'pages/login';
import AuthArea from 'containers/auth-area';

import styleNames from 'modules/style-names';
import styles from './styles.scss';

const sn = styleNames(styles);

class Layout extends Component {
    static propTypes = {
        location: PropTypes.shape({
            pathname: PropTypes.string
        })
    };

    render() {
        const content = (
            <AuthArea>
                <Row>
                    <Col md={2}><Sidebar /></Col>
                    <Col md={10}>
                        <div className={sn('layout__content')}>
                            {this.props.children}
                        </div>
                    </Col>
                </Row>
            </AuthArea>
        );
        const match = matchPath(this.props.location.pathname, {path: Routes.login});
        return (
            <Grid>
                <Row>
                    <Col md={2}><Logo /></Col>
                    <Col md={10} />
                </Row>
                <Row><Space height={20} /></Row>
                {
                    match
                        ? <Row><Login /></Row>
                        : content
                }
                <Row><Space height={40} /></Row>
                <Row>
                    <Col md={24}><div className={sn('layout__copyright')}>© Copyright info, {moment().format('YYYY')}</div></Col>
                </Row>
            </Grid>
        );
    }
}

export default compose(
    withRouter,
    connect(
        state => ({
            bundle: state.bundle
        })
    )
)(Layout);

