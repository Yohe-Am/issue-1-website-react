import { createSlice } from '@reduxjs/toolkit';
import { getAuthToken } from 'issue-1-client-js';
import { act } from 'react-dom/test-utils';

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
        reportLoginFailure: (state, action) => {
            state.signInMessage = !!action.payload
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

const { requestLogin, reportLoginFailure, persistToken } = userSlice.actions;

const signInAsync = (username, password) => async function signInAsync(dispatch, getState) {

    if (getState().loginInProgress) {
        return
    }

    dispatch(requestLogin());

    try {
        const token = await getAuthToken("http://localhost:8080", username, password);
        dispatch(persistToken({ username, token }));
    }
    catch (err) {
        console.log(err);
        if (!!err.data) {
            dispatch(reportLoginFailure({ message: { type: 'error', message: err.data.errorMessage } }));
        } else {
            dispatch(reportLoginFailure());
        }
    }
};


// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
// const isLoggedIn = state => state.user.isLoggedIn;


export default userSlice.reducer;
export { signInAsync };