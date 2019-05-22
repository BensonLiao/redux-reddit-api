import { take, put, call, fork, select } from 'redux-saga/effects'
import axios from 'axios'
import * as actions from '../actions'
import {
  selectedRedditSelector,
  postsByRedditSelector
} from '../reducers/selectors'

export function fetchPostsApi(reddit) {
  return axios
    .get(`https://www.reddit.com/r/${reddit}.json`)
    .then(response => response.data)
    .then(json => json.data.children.map(child => child.data))
}

export function* fetchPosts(reddit) {
  yield put(actions.requestPosts(reddit))
  const posts = yield call(fetchPostsApi, reddit)
  yield put(actions.receivePosts(reddit, posts))
}

export function* invalidateReddit() {
  while (true) {
    const { reddit } = yield take(actions.INVALIDATE_SUBREDDIT)
    yield call(fetchPosts, reddit)
  }
}

export function* nextRedditChange() {
  while (true) {
    const prevReddit = yield select(selectedRedditSelector)
    yield take(actions.SELECT_SUBREDDIT)

    const newReddit = yield select(selectedRedditSelector)
    const postsByReddit = yield select(postsByRedditSelector)
    if (prevReddit !== newReddit && !postsByReddit[newReddit])
      yield fork(fetchPosts, newReddit)
  }
}

export function* startup() {
  const selectedReddit = yield select(selectedRedditSelector)
  yield fork(fetchPosts, selectedReddit)
}

export default function* root() {
  yield fork(startup)
  yield fork(nextRedditChange)
  yield fork(invalidateReddit)
}
