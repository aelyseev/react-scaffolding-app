/* eslint-disable no-param-reassign */

import {noop} from 'lodash';

/**
 * @param node {HTMLElement}
 * @param clickOutsideHandler {Function}
 * @param [forceFocusOnTarget] {Boolean}
 * @returns {Function}
 */
export default function (node, clickOutsideHandler = noop, forceFocusOnTarget = true) {
    let isClickOutSide;
    const onFocus = () => {
        isClickOutSide = false;
    };

    const onBlur = () => {
        setTimeout(() => {
            if (isClickOutSide) {
                clickOutsideHandler();
            }
        }, 10);
        isClickOutSide = true;
    };

    const unsub = el => () => {
        el.removeEventListener('focus', onFocus);
        el.removeEventListener('focus', onBlur);
    };

    if (!node) {
        return noop;
    }

    if (!node._clickoutsideIsHandled) {
        node._clickoutsideIsHandled = true;
        node.tabIndex = -1;
        node.addEventListener('focus', onFocus, true);
        node.addEventListener('blur', onBlur, true);

        if (forceFocusOnTarget) {
            node.focus();
        }
    }

    return unsub(node);
}
