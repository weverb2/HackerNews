import reducer from "./HackerNewsReducer";
import { ActionTypes } from "../Actions/HackerNewsActions";

const initialState = {
  selectedStory: null,
  topstories: {
    inProgress: false,
    isRefreshing: false,
    ids: [],
    stories: []
  },
  beststories: {
    inProgress: false,
    isRefreshing: false,
    ids: [],
    stories: []
  },
  newstories: {
    inProgress: false,
    isRefreshing: false,
    ids: [],
    stories: []
  }
};

describe("HackerNews Reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("should handle requesting story ids", () => {
    expect(
      reducer(undefined, {
        type: ActionTypes.storyIdsRequested,
        category: "topstories"
      })
    ).toEqual({
      ...initialState,
      topstories: {
        inProgress: false,
        isRefreshing: true,
        ids: [],
        stories: []
      }
    });
  });

  it("should handle receiving story ids", () => {
    expect(
      reducer(undefined, {
        type: ActionTypes.storyIdsReceived,
        category: "newstories",
        ids: [0, 1, 2, 3]
      })
    ).toEqual({
      ...initialState,
      newstories: {
        inProgress: false,
        isRefreshing: false,
        ids: [0, 1, 2, 3],
        stories: []
      }
    });
  });

  it("should handle requesting stories", () => {
    expect(
      reducer(undefined, {
        type: ActionTypes.storiesRequested,
        category: "newstories"
      })
    ).toEqual({
      ...initialState,
      newstories: {
        inProgress: true,
        isRefreshing: false,
        ids: [],
        stories: []
      }
    });
  });

  it("should handle receiving stories", () => {
    expect(
      reducer(undefined, {
        type: ActionTypes.storiesReceived,
        category: "newstories",
        stories: [
          { title: "I'm a story!" },
          { title: "I'm another story!" },
          { title: "I'm a third story!" }
        ]
      })
    ).toEqual({
      ...initialState,
      newstories: {
        inProgress: false,
        isRefreshing: false,
        ids: [],
        stories: [
          { title: "I'm a story!" },
          { title: "I'm another story!" },
          { title: "I'm a third story!" }
        ]
      }
    });
  });

  it("should handle selecting a story", () => {
    expect(
      reducer(undefined, {
        type: ActionTypes.storySelected,
        story: { title: "I'm a story!" }
      })
    ).toEqual({
      ...initialState,
      selectedStory: { title: "I'm a story!" }
    });
  });
});
