import React, { useState } from 'react';
import styles from './SignIn.module.css';
import { connect } from 'react-redux'
import { signInAsync } from "../userSlice";

export const ReduxedSignInForm = connect(
    state => {
        if (!!state.user.signInMessage) {
            return {
                message: state.user.signInMessage.message
            }
        }
    },
    dispatch => {
        return {
            onSubmit: (username, password) => dispatch(signInAsync(username, password))
        }
    }
)(SignInForm);

function SignInForm({ message, onSubmit }) {
    const [prevState, changeState] = useState({ username: '', password: '' })
    const { username, password } = prevState;

    function usernameChanged(event) {
        // this.setState({ value: event.target.value });
        changeState({ ...prevState, username: event.target.value });
        event.preventDefault();
    }

    function passwordChanged(event) {
        changeState({ ...prevState, password: event.target.value });
        event.preventDefault();
    }

    function submitForm(event) {
        event.preventDefault();
        onSubmit(username, password);
    }

    return (
        <div className={styles.signInForm}>
            {message}
            <form onSubmit={submitForm}>
                <label htmlFor='username'>
                    Username:
            </label>
                <input
                    aria-label="Username"
                    name="username"
                    type='text'
                    value={username}
                    placeholder="username"
                    onChange={usernameChanged}
                    aria-required
                    minLength={5}
                />
                <label htmlFor='password'>
                    Password:
            </label>
                <input
                    aria-label="Password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={passwordChanged}
                    autoComplete="off"
                    aria-required
                    minLength={8}
                    placeholder="password"
                />
                <input
                    type="submit"
                    value="Submit" />
            </form>

        </div>
    );
}
