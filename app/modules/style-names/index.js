import get from 'lodash/get';

export default function (styles) {
    return function style(...names) {
        return names.map(name => get(styles, name, '')).join(' ');
    };
}
