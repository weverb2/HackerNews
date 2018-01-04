import { createReducer } from "./createReducer";
import { ActionTypes } from "../Actions/HackerNewsActions";

const initialState = {
  selectedStory: null,
  topstories: { inProgress: false, isRefreshing: false, ids: [], stories: [] },
  beststories: { inProgress: false, isRefreshing: false, ids: [], stories: [] },
  newstories: { inProgress: false, isRefreshing: false, ids: [], stories: [] }
};

export default createReducer(initialState, {
  [ActionTypes.storyIdsRequested](state, action) {
    const innerState = state[action.category];
    const newState = {
      ...state
    };
    newState[action.category] = {
      ...innerState,
      isRefreshing: true,
      ids: [],
      stories: []
    };

    return newState;
  },
  [ActionTypes.storyIdsReceived](state, action) {
    const innerState = state[action.category];
    const newState = {
      ...state
    };

    newState[action.category] = {
      ...innerState,
      isRefreshing: false,
      ids: action.ids
    };
    return newState;
  },
  [ActionTypes.storiesRequested](state, action) {
    const innerState = state[action.category];
    const newState = {
      ...state
    };

    newState[action.category] = {
      ...innerState,
      inProgress: true
    };

    return newState;
  },
  [ActionTypes.storiesReceived](state, action) {
    const innerState = state[action.category];
    const { stories } = innerState;
    const newState = {
      ...state
    };
    newState[action.category] = {
      ...innerState,
      inProgress: false,
      stories: [...stories, ...action.stories]
    };

    return newState;
  },
  [ActionTypes.storySelected](state, action) {
    const newState = {
      ...state,
      selectedStory: action.story
    };
    return newState;
  }
});
