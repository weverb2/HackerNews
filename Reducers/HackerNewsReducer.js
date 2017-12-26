import { createReducer } from "./createReducer";

const initialState = {
  topStories: { inProgress: false, ids: [], stories: [] }
};

export default createReducer(initialState, {
  ["STORY_IDS_REQUESTED"](state, action) {
    const { topStories } = state;
    const newState = {
      ...state,
      topStories: { ...topStories, inProgress: true, ids: [] }
    };
    return newState;
  },
  ["STORY_IDS_RECEIVED"](state, action) {
    const { topStories } = state;
    const newState = {
      ...state,
      topStories: { ...topStories, inProgress: false, ids: action.ids }
    };
    return newState;
  },
  ["STORIES_REQUESTED"](state, action) {
    const { topStories } = state;
    const newState = {
      ...state,
      topStories: { ...topStories, inProgress: true }
    };
    return newState;
  },
  ["STORIES_RECEIVED"](state, action) {
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
  }
});
