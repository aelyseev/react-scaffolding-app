import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import {win, localStorage} from 'lib/browser';
import {pick, startsWith} from 'lodash';
import promiseMiddleware from 'redux-promise';
import {reducer as form} from 'redux-form';

import user, {NAMESPACE as USERS_NAMESPACE} from 'store/user';

const storeReducers = {
    form,
    user
};

export const AUTH_STORAGE_KEY = '__APP';

let initialStore;
try {
    initialStore = JSON.parse(localStorage[AUTH_STORAGE_KEY]);
} catch (e) {
    initialStore = {};
}

const backupStore = ({getState}) => next => (action) => {
    const result = next(action);
    if (startsWith(action.type, USERS_NAMESPACE)) {
        localStorage[AUTH_STORAGE_KEY] = JSON.stringify(pick(getState(), ['user']));
    }
    return result;
};

const reduxLogger = win.__REDUX_DEVTOOLS_EXTENSION__ ? win.__REDUX_DEVTOOLS_EXTENSION__({maxAge: 10}) : f => f;
const store = createStore(
    combineReducers(storeReducers),
    initialStore,
    compose(applyMiddleware(backupStore), applyMiddleware(promiseMiddleware), reduxLogger)
);

export default store;
