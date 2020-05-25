import { createSlice/* , createSelector  */ } from '@reduxjs/toolkit';
import i1Client from "../../app/i1Client";
import store from "../../app/store.js";

const defaultSignInMessage = { type: 'info', message: 'Enter your credentials' };

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        username: '',
        authToken: '',
        signInMessage: { type: 'info', message: 'Enter your credentials' },
    },
    reducers: {
        requestLogin: state => {
            state.signInMessage = { type: 'info', message: 'Attempting Login...' };
        },
        loginFailure: (state, action) => {
            state.signInMessage = !!action.payload.message
                ? action.payload.message
                : { type: 'error', message: 'Login Failed. Please try again.' };
        },
        persistToken: (state, action) => {
            state.isLoggedIn = true;
            state.username = action.payload.username;
            state.authToken = action.payload.authToken;

            state.signInMessage = defaultSignInMessage;
        },
    },
});

const { requestLogin, loginFailure, persistToken } = userSlice.actions;

const signInAsync = (username, password) => async function signInAsync(dispatch, getState) {

    if (getState().user.loginInProgress) {
        return;
    }

    dispatch(requestLogin());

    try {
        const authToken = await i1Client.authService.getAuthToken(username, password);
        dispatch(persistToken({ username, authToken }));
        persistAuthTokenToStorage(username, authToken);
        // TODO: get default feed sorting
    }
    catch (err) {
        console.log(err);
        let message;
        if (!!err.data) {
            message = { type: 'error', message: err.data.errorMessage };
        } else if (!!err.message) {
            message = { type: 'error', message: 'Login Failed: ' + err.message };
            dispatch(loginFailure({ message }));
        }
        dispatch(loginFailure({ message }));
    }
};

function persistAuthTokenToStorage(username, authToken) {
    localStorage.setItem('username', username);
    localStorage.setItem('authToken', authToken);
}


// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
const isLoggedIn = (state) => {
    if (state.user.username) {
        return true;
    } else if (localStorage.getItem('username')) {
        store.dispatch(persistToken({
            username: localStorage.getItem('username'),
            authToken: localStorage.getItem('authToken')
        }));
        return true;
    }
    return false;
}

export default userSlice.reducer;
export { signInAsync, isLoggedIn };