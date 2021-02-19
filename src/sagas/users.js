/**
 * Sagas
 * Good Practice: align your saga structure similar to the redux acations
 */
import { takeEvery, takeLatest, call, fork, put } from 'redux-saga/effects';

import * as actions from '../actions/users';
import * as api from '../api/users';

/**
 * Get Users
 */

function* getUsers() {

    try {
        const result = yield call(api.getUsers);

        yield put(actions.getUsersSuccess({
            items: result.data.data
        }))

    } catch (e) {
        console.log(e);
    }

}

function* watchGetUsersRequest() {
    yield takeEvery(actions.Types.GET_USERS_REQUEST, getUsers)
}

/**
 * Create User
 */

function* createUser(action) {
    yield;
}

function* watchCreateUserRequest() {
    yield takeLatest(actions.Types.CREATE_USER_REQUEST, createUser)
}

const usersSagas = [
    fork(watchGetUsersRequest),
    fork(watchCreateUserRequest)
];

export default usersSagas;
