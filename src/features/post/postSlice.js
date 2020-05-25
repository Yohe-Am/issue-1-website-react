import { createSlice } from '@reduxjs/toolkit';
import i1Client from "../../app/i1Client";

export const postSlice = createSlice({
    name: 'post',
    initialState: {
        cache: {},
    },
    reducers: {
        cachePosts: (state, action) => {
            let posts = action.payload.posts;
            if (!!posts) {
                posts.forEach(post => {
                    state.cache[post.id] = post;
                });
            }
        },
    },
});

const { cachePosts } = postSlice.actions;

const fetchPostsAsync = (...ids) => async function fetchPostsAsync(dispatch, getState) {
    let postState = getState().post;
    let nonCachedPosts = ids.filter(
        id => !!postState.cache[id]
    );
    let posts = [];
    for (const id of nonCachedPosts) {
        let post = await i1Client.postService.getPost(id);
        posts.push(post);
    }
    dispatch(cachePosts({ posts }));
}

export default postSlice.reducer;
export { fetchPostsAsync, cachePosts };