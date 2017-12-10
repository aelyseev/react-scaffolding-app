import React from 'react';
import {Link} from 'react-router-dom';
import Routes from 'constants/routes';
import styleNames from 'modules/style-names';
import styles from './style.scss';
import logo from './logo.svg';

const sn = styleNames(styles);

export default function Logo() {
    return (
        <div className={sn('logo')}>
            <Link to={Routes.root}>
                <img alt="Logo" src={logo} />
            </Link>
        </div>

    );
}
