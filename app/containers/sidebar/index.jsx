import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Routes from 'constants/routes';
import {NavLink} from 'react-router-dom';

import styleNames from 'modules/style-names';
import styles from './style.scss';

const sn = styleNames(styles);

export default class Sidebar extends Component {
    static propTypes = {
        logout: PropTypes.func
    };

    render() {
        return (
            <div className={sn('menu')}>
                <div className={sn('menu__list')}>
                    {link('Sample placeholder with popup', Routes.samplePlaceholderWithPopup)}
                    {link('Sample placeholder', Routes.samplePlaceholder)}
                    {link('Logout', Routes.logout)}
                </div>
            </div>
        );
    }
}

function link(text, url) {
    return (
        <NavLink
            className={sn('menu__link')}
            activeClassName={sn('menu__link--active')}
            exact
            to={url}
        >
            {text}
        </NavLink>
    );
}
