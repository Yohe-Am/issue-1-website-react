import { createSlice, createSelector } from '@reduxjs/toolkit';
import i1Client from "../../app/i1Client";
import { cachePosts } from "../post/postSlice";

export const postSlice = createSlice({
    name: 'feed',
    initialState: {
        userDefaultSorting: 'top',
        currentSorting: 'top',
        feedPosts: [],
        autoRefresh: true,
        refreshInterval: 10_000,
        lastFetchTimestamp: new Date(0).valueOf(),
    },
    reducers: {
        changeSorting: (state, action) => {
            let sorting = action.payload.sorting;
            if (sorting) {
                state.currentSorting = sorting;
            }
        },
        setFeedPosts: (state, action) => {
            let feedPosts = action.payload.feedPosts;
            if (feedPosts) {
                state.feedPosts = feedPosts;
                state.lastFetchTimestamp = Date.now();
            }
        },
        enableAutoRefresh: state => state.autoRefresh = true,
        disableAutoRefresh: state => state.autoRefresh = false,
        setRefreshInterval: (state, action) => {
            var intervalSeconds = action.payload.intervalSeconds;
            if (!!intervalSeconds) {
                let intervalMS = intervalSeconds * 1000;
                state.refreshInterval = intervalMS;
            }
        },
    },
});

const { changeSorting, setFeedPosts, enableAutoRefresh, disableAutoRefresh, setRefreshInterval } = postSlice.actions;

const freshenCacheIfNecessary = () => async function freshenCacheIfNecessary(dispatch, getState) {
    let feedState = getState().feed;
    if (!feedState.lastFetchTimestamp
        ||
        (feedState.autoRefresh && (Date.now() - feedState.lastFetchTimestamp) > feedState.refreshInterval)
    ) {
        dispatch(assembleFeedAsync());
    }
};

const assembleFeedAsync = (sorting = '') => async function assembleFeedAsync(dispatch, getState) {
    let state = getState();
    let posts = await i1Client.feedService.getFeedPosts(
        state.user.username,
        state.user.authToken,
        {
            sorting,
            onlyIds: false,
        }
    );
    dispatch(cachePosts({ posts }));
    if (sorting) {
        dispatch(changeSorting({ sorting }));
    }
    dispatch(setFeedPosts({ feedPosts: posts.map(post => post.id) }));
}

const getFeedPosts = createSelector(
    state => state.feed.feedPosts,
    state => state.post.cache,
    (feedPostIds, postCache) => feedPostIds.map(id => postCache[id]),
);

/* let feedRefresher;
function setFeedRefresher(interval) {
    feedRefresher = setInterval(() => {

    }, interval);
}

function clearFeedRefresher() {
    if (feedRefresher) {
        clearInterval(feedRefresher);
    }
}
 */


/* 
const shouldRefreshFeedPosts = createSelector(
    state => state.feed.currentSorting,
    state => state.feed.autoRefresh && (Date.now() - state.feed.lastFetchTimestamp) > state.refreshInterval,
    (sorting, timeToRefresh) => true
);
 */
export default postSlice.reducer;
export {
    assembleFeedAsync,
    freshenCacheIfNecessary,
    changeSorting,
    setFeedPosts,
    enableAutoRefresh,
    disableAutoRefresh,
    setRefreshInterval,
    getFeedPosts
};