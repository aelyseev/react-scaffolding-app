import React, {Component} from 'react';
import {credentials} from 'stubs/user.yml';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import {Field, reduxForm} from 'redux-form';
import InputContainer from 'containers/form/input-container';
import {Button, Col, Form, FormGroup, HelpBlock} from 'react-bootstrap';

import {addUpdateUser, getUserToken} from 'store/user';
import {loginUser} from 'modules/request';
import {wrapWithState} from 'lib/utils/components';
import Routes from 'constants/routes';

@reduxForm({form: 'login', validate})
@connect(
    state => ({authToken: getUserToken(state)}),
    {login: addUpdateUser}
)
@wrapWithState({isAuthError: false}, (state, setState) => ({
    clearAuthErrors: () => setState({isAuthError: false}),
    setAuthError: () => setState({isAuthError: true})
}))
export default class Login extends Component {
    static propTypes = {
        handleSubmit: PropTypes.func,
        login: PropTypes.func,
        reset: PropTypes.func,
        dirty: PropTypes.bool,
        isAuthError: PropTypes.bool,
        clearAuthErrors: PropTypes.func,
        authToken: PropTypes.string,
        setAuthError: PropTypes.func
    };

    onSubmit = ({login, password}) => loginUser(login, password)
        .then(response => this.props.login(response))
        .catch(() => {
            this.props.reset();
            this.props.setAuthError();
        });

    componentDidUpdate() {
        const {isAuthError, clearAuthErrors, dirty} = this.props;
        if (isAuthError && dirty) {
            clearAuthErrors();
        }
    }

    renderForm() {
        const {handleSubmit, isAuthError} = this.props;
        return (
            <Form horizontal onSubmit={handleSubmit(this.onSubmit)}>
                {isAuthError && <FormGroup bsSize="large" validationState="error" controlId="loginFormReport">
                    <Col sm={4}>
                        <HelpBlock>Неверные логин или пароль</HelpBlock>
                    </Col>
                </FormGroup>}
                <FormGroup validationState="warning">
                    <Col sm={4}>
                        <HelpBlock>Login: {credentials.login}, password: {credentials.password}</HelpBlock>
                    </Col>
                </FormGroup>
                <Field
                    name="login"
                    placeholder="Логин"
                    sm={6}
                    bsSize="large"
                    component={InputContainer}
                />

                <Field
                    name="password"
                    type="password"
                    placeholder="Пароль"
                    sm={6}
                    bsSize="large"
                    component={InputContainer}
                />

                <FormGroup bsSize="large">
                    <Col sm={3}>
                        <Button block bsStyle="primary" bsSize="large" type="submit">Login</Button>
                    </Col>
                </FormGroup>
            </Form>
        );
    }

    render() {
        const {authToken} = this.props;
        return authToken ? <Redirect to={Routes.root} /> : this.renderForm();
    }
}

function validate(values) {
    const fields = ['email', 'password'];
    return fields.reduce((errors, field) => (!values[field] ? {...errors, [field]: 'Обязательное поле'} : errors), {});
}
