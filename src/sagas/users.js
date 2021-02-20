/**
 * Sagas
 * Good Practice: align your saga structure similar to the redux acations
 */
import { takeEvery, takeLatest, take, call, fork, put } from 'redux-saga/effects';

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
        yield put(actions.usersError({
            error: 'An error occured when trying to get users: ' + e
        }));
    }

}

function* watchGetUsersRequest() {
    yield takeEvery(actions.Types.GET_USERS_REQUEST, getUsers)
}

/**
 * Create User
 */

function* createUser(action) {

    const { firstName, lastName } = action.payload;

    try {

        // persist user data
        yield call(api.createUser, { firstName, lastName });

        // re-request getUser saga (shouldn't we dispatch the action again here instead?)
        yield call(getUsers);

    } catch (e) {
        yield put(actions.usersError({
            error: 'An error occured when trying to create the user: ' + e
        }));
    }
}

function* watchCreateUserRequest() {
    yield takeLatest(actions.Types.CREATE_USER_REQUEST, createUser)
}

/**
 * Delete User
 */

function* deleteUser({ userId }) {

    try {

        // delete user data
        yield call(api.deleteUser, userId);

        // re-request getUser saga (shouldn't we dispatch the action again here instead?)
        yield call(getUsers);

    } catch (e) {
        yield put(actions.usersError({
            error: 'An error occured when trying to delete the user: ' + e
        }));
    }
}

function* watchDeleteUserRequest() {
    while (true) {
        const action = yield take(actions.Types.DELETE_USER_REQUEST,);
        yield call(deleteUser, {
            userId: action.payload.userId
        })
    }
}


const usersSagas = [
    fork(watchGetUsersRequest),
    fork(watchCreateUserRequest),
    fork(watchDeleteUserRequest)
];

export default usersSagas;
