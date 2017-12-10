import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'containers/form/fields/text-field';

export default function InputContainer({
                            input: {name, value, onChange, onBlur},
                            meta: {valid, dirty, error, submitFailed},
                            type,
                            placeholder,
                            sm,
                            bsSize
                        }) {
    const validationState = (!submitFailed || valid) ? null : 'error';
    return (
        <TextField
            type={type}
            value={value}
            name={name}
            onBlur={onBlur}
            onChange={onChange}
            dirty={dirty}
            message={error}
            validationState={validationState}
            placeholder={placeholder}
            sm={sm}
            bsSize={bsSize}
        />
    );
}

/* eslint-disable react/forbid-prop-types */
InputContainer.propTypes = {
    input: PropTypes.shape({
        name: PropTypes.string,
        value: PropTypes.any,
        onChange: PropTypes.func,
        onBlur: PropTypes.func
    }),
    meta: PropTypes.shape({
        valid: PropTypes.bool,
        submitFailed: PropTypes.bool,
        dirty: PropTypes.bool,
        error: PropTypes.string
    }),
    placeholder: PropTypes.string,
    type: PropTypes.oneOf(['text', 'password']),
    sm: PropTypes.number.isRequired,
    bsSize: PropTypes.oneOf(['lg', 'large', 'sm', 'small'])
};

InputContainer.defaultProps = {
    type: 'text',
    bsSize: 'small',
    error: 'Обязательное поле'
};
