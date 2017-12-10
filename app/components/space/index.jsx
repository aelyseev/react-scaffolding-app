import React from 'react';
import PropTypes from 'prop-types';

export default function Space({width, height}) {
    return (
        <div style={{width: getPxValue(width), height: getPxValue(height)}} />
    );
}

Space.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number
};

function getPxValue(val) {
    return val ? `${parseInt(val, 10)}px` : 'auto';
}
