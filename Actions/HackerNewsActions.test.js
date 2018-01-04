import * as actions from "./HackerNewsActions";

describe("HackerNews synchronous Actions", () => {});

describe("HackerNews synchronous Actions", () => {
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
