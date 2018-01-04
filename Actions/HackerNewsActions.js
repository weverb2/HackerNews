const baseURL = "https://hacker-news.firebaseio.com/v0";

export const ActionTypes = {
  storyIdsRequested: "STORY_IDS_REQUESTED",
  storyIdsReceived: "STORY_IDS_RECEIVED",
  storiesRequested: "STORIES_REQUESTED",
  storiesReceived: "STORIES_RECEIVED",
  storySelected: "STORY_SELECTED"
};

export const TOP_STORIES = "topstories";
export const BEST_STORIES = "beststories";
export const NEW_STORIES = "newstories";

export const categories = [TOP_STORIES, BEST_STORIES, NEW_STORIES];

export const categoryDisplayNames = {
  topstories: "Top Stories",
  beststories: "Best Stories",
  newstories: "New Stories"
};

export function storyIdsRequested(pageSize, category) {
  return dispatch => {
    dispatch({
      type: ActionTypes.storyIdsRequested,
      category
    });

    return fetch(`${baseURL}/${category}.json`)
      .then(response => response.json())
      .then(ids => {
        dispatch(storyIdsReceived(ids, category));
        dispatch(storiesRequested(ids.slice(0, pageSize), category));
      });
  };
}

export function storyIdsReceived(ids, category) {
  return {
    type: ActionTypes.storyIdsReceived,
    ids,
    category
  };
}

export function storiesRequested(ids, category) {
  return dispatch => {
    dispatch({
      type: ActionTypes.storiesRequested,
      ids,
      category
    });

    return Promise.all(ids.map(getItem)).then(stories =>
      dispatch(storiesReceived(stories, category))
    );
  };
}

export function storiesReceived(stories, category) {
  return {
    type: ActionTypes.storiesReceived,
    stories,
    category
  };
}

export function storySelected(story) {
  return {
    type: ActionTypes.storySelected,
    story
  };
}

getItem = id => {
  return fetch(`${baseURL}/item/${id}.json`)
    .then(response => response.json())
    .then(json => {
      return json;
    });
};
