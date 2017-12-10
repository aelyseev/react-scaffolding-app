import {createAction, handleActions} from 'redux-actions';
import {createSelector} from 'reselect';

export const NAMESPACE = 'USER';

export const addUpdateUser = createAction(
    'USER/ADD_UPDATE_USER',
    ({
         token,
         description,
         status,
         profile: {id, email, firstName, lastName}
     }) => (
        {
            token, status, profile: {id, email, firstName, lastName}, description
        }
    )
);

export const updateToken = createAction('USER/UPDATE_TOKEN', token => token);

export const logoutUser = createAction('USER/LOGOUT_USER');

const defaults = {
    token: null,
    description: null,
    status: null,
    profile: {
        id: null,
        email: null,
        firstName: null,
        lastName: null
    }
};

const getUser = state => state.user;
export const getUserToken = createSelector(getUser, user => user.token || '');
export const getUserProfile = createSelector(getUser, user => user.profile);

const reducer = handleActions({
    [addUpdateUser]: (state, {payload}) => ({...state, ...payload}),
    [updateToken]: (state, {payload: token}) => ({...state, token}),
    [logoutUser]: () => defaults
}, defaults);

export default reducer;
