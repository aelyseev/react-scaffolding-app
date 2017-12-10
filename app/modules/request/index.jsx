import {credentials, user} from 'stubs/user.yml';

const HOST = 'http://api-url';
const LOGIN_USER = `${HOST}/api/login/`;

const OK_STATUS = 'ok';
const ERROR_STATUS = 'error';

function post(url, data) {
    if (url === LOGIN_USER) {
        const {login, password} = data;
        if ((login === credentials.login) && (password === credentials.password)) {
            return Promise.resolve({status: OK_STATUS, ...user.login.response});
        }
        return Promise.resolve({status: ERROR_STATUS, error: 'Wrong credentials'});
    }

    return Promise.resolve({status: ERROR_STATUS, error: 'Unknown url request'});
}

export function loginUser(login, password) {
    return processRequest(LOGIN_USER, {login, password});
}

function processRequest(url, data) {
    return post(url, data)
        .then(response => (
            response.status === OK_STATUS
                ? Promise.resolve(response)
                : Promise.reject(`status: ${response.status}, error: ${response.error} \n body: ${JSON.stringify(response)}`)
        ));
}
