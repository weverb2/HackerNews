import * as actions from "./HackerNewsActions";
import fetchMock from "fetch-mock";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("HackerNews Async Actions", () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it("can request story ids", () => {
    const category = "newstories";
    const storyIds = [1];
    fetchMock.getOnce(`end:${category}.json`, {
      body: storyIds
    });
    fetchMock.getOnce(`end:/item/${storyIds[0]}.json`, {
      body: { title: "Story 1" }
    });

    const expectedActions = [
      {
        type: actions.ActionTypes.storyIdsRequested,
        category
      },
      {
        type: actions.ActionTypes.storyIdsReceived,
        ids: storyIds,
        category
      },
      {
        category,
        ids: storyIds,
        type: actions.ActionTypes.storiesRequested
      }
    ];

    const store = mockStore({ newstories: {} });
    return store.dispatch(actions.storyIdsRequested(1, category)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("can request stories", () => {
    const storyIds = [1, 2];
    fetchMock.getOnce(`end:/item/${storyIds[0]}.json`, {
      body: { title: "Story 1" }
    });
    fetchMock.getOnce(`end:/item/${storyIds[1]}.json`, {
      body: { title: "Story 2" }
    });

    const expectedActions = [
      {
        type: actions.ActionTypes.storiesRequested,
        ids: storyIds,
        category: "newstories"
      },
      {
        category: "newstories",
        stories: [{ title: "Story 1" }, { title: "Story 2" }],
        type: actions.ActionTypes.storiesReceived
      }
    ];

    const store = mockStore({ newstories: {} });
    return store
      .dispatch(actions.storiesRequested(storyIds, "newstories"))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});

describe("HackerNews Synchronous Actions", () => {
  it("should create a story ids received action", () => {
    const storyIds = [1, 2, 3];
    const category = "category";
    const expected = {
      type: actions.ActionTypes.storyIdsReceived,
      category,
      ids: storyIds
    };

    expect(actions.storyIdsReceived(storyIds, category)).toEqual(expected);
  });

  it("should create a stories received action", () => {
    const stories = [
      { title: "I'm a story!" },
      { title: "I'm another story!" },
      { title: "I'm a third story!" }
    ];
    const category = "category";
    const expected = {
      type: actions.ActionTypes.storiesReceived,
      category,
      stories
    };

    expect(actions.storiesReceived(stories, category)).toEqual(expected);
  });

  it("should create an story selected action", () => {
    const story = { title: "I am a story" };
    const expected = {
      type: actions.ActionTypes.storySelected,
      story
    };
    expect(actions.storySelected(story)).toEqual(expected);
  });
});
