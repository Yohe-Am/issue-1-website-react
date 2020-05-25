import React from 'react';
import { connect } from 'react-redux'
import { ReduxedSignInForm } from "./features/user/form-signin/SignIn";
import { ReduxedMainFeed } from "./features/feed/MainFeed.js";
import { isLoggedIn } from "./features/user/userSlice.js";
import './App.css';

function App({ isLoggedIn, username }) {

  if (isLoggedIn) {
    return (
      <ReduxedMainFeed />
    );
  }

  return (
    <ReduxedSignInForm />
  );
}

const ReduxedApp = connect(
  state => {
    return {
      isLoggedIn: isLoggedIn(state),
      username: state.user.username,
    }
  },
)(App);

export default ReduxedApp;

// import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';
/* function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </header>
    </div>
  );
}
 */
