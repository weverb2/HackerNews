import { createReducer } from "./createReducer";
import { ActionTypes } from "../Actions/HackerNewsActions";

const initialState = {
  selectedStory: null,
  topStories: { inProgress: false, isRefreshing: false, ids: [], stories: [] }
};

export default createReducer(initialState, {
  [ActionTypes.storyIdsRequested](state, action) {
    const { topStories } = state;
    const newState = {
      ...state,
      topStories: {
        ...topStories,
        isRefreshing: true,
        ids: [],
        stories: []
      }
    };
    return newState;
  },
  [ActionTypes.storyIdsReceived](state, action) {
    const { topStories } = state;
    const newState = {
      ...state,
      topStories: {
        ...topStories,
        isRefreshing: false,
        ids: action.ids
      }
    };
    return newState;
  },
  [ActionTypes.storiesRequested](state, action) {
    const { topStories } = state;
    const newState = {
      ...state,
      topStories: { ...topStories, inProgress: true }
    };
    return newState;
  },
  [ActionTypes.itemsReceived](state, action) {
    const { topStories } = state;
    const { stories } = topStories;
    const newState = {
      ...state,
      topStories: {
        ...topStories,
        inProgress: false,
        stories: [...stories, ...action.stories]
      }
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
