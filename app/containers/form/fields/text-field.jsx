import React from 'react';
import {noop} from 'lodash';
import PropTypes from 'prop-types';
import {FormControl, FormGroup, Col, HelpBlock} from 'react-bootstrap';

export default function TextField({name, value, placeholder, type, onChange, onBlur, validationState, sm, bsSize, message}) {
    return (
        <FormGroup bsSize={bsSize} controlId={name} validationState={validationState}>
            <Col sm={sm}>
                <FormControl
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                />
                {validationState && message && <HelpBlock>{message}</HelpBlock>}
            </Col>
        </FormGroup>
    );
}

/* eslint-disable react/forbid-prop-types */
TextField.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.any.isRequired,
    type: PropTypes.oneOf(['text', 'password']),
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    validationState: PropTypes.oneOf([null, 'success', 'warning', 'error']),
    sm: PropTypes.number.isRequired,
    bsSize: PropTypes.oneOf(['lg', 'large', 'sm', 'small']),
    message: PropTypes.string
};
/* eslint-enable */

TextField.defaultProps = {
    type: 'text',
    onChange: noop,
    onBlur: noop,
    bsSize: 'small'
};
