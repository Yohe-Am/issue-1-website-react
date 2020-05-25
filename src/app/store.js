import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice.js';
import user from '../features/user/userSlice.js';
import post from '../features/post/postSlice.js';
import feed from '../features/feed/feedSlice.js';
// import client from './clientSlice';
// import main from './mainSlice.js';

export default configureStore({
  reducer: {
    counter: counterReducer,
    user,
    post,
    feed,
    // main,
    // client
  },
});
