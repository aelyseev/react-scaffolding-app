import React, {Component} from 'react';
import {noop} from 'lodash';
import {createPortal} from 'react-dom';
import PropTypes from 'prop-types';

import {document} from 'lib/browser';
import {KEY_CODES} from 'lib/keyboard';

import styleNames from 'modules/style-names';
import styles from 'components/portal/styles.scss';

const sn = styleNames(styles);
const modalRootElement = document.getElementById('modal');

export default class Portal extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
        requestToClose: PropTypes.func,
        visibility: PropTypes.bool
    };

    static defaultProps = {
        requestToClose: noop,
        visibility: false
    };

    _handler = (e) => {
        if (e.keyCode === KEY_CODES.ESC) {
            this.props.requestToClose();
        }
    };

    content() {
        return (
            <div className={sn('portal__overlay')}>
                <div className={sn('portal__content')}>{this.props.children}</div>
            </div>
        );
    }

    componentDidMount() {
        document.body.addEventListener('keydown', this._handler);
    }

    componentWillUnmount() {
        document.body.removeEventListener('keydown', this._handler);
    }

    render() {
        const {visibility} = this.props;
        return visibility === true ? createPortal(this.content(), modalRootElement) : null;
    }
}
