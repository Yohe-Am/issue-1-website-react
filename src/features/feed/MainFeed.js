import React from 'react';
import { connect } from 'react-redux'
import PostCard from "./PostCard";
import { freshenCacheIfNecessary, getFeedPosts } from "./feedSlice";

export const ReduxedMainFeed = connect(
    state => {
        return {
            posts: getFeedPosts(state),
        }
    },
    dispatch => {
        return {
            refreshCache: () => dispatch(freshenCacheIfNecessary())
        };
    }
)(MainFeed);

function MainFeed({ posts, refreshCache }) {
    refreshCache();
    if (!posts) {
    }
    return (
        <div className='mainFeed'>
            <ul>
                {posts.map(post => <PostCard post={post} key={post.id} />)}
            </ul>
        </div>
    );
}
