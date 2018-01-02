const baseURL = "https://hacker-news.firebaseio.com/v0";

export const ActionTypes = {
  storyIdsRequested: "STORY_IDS_REQUESTED",
  storyIdsReceived: "STORY_IDS_RECEIVED",
  storiesRequested: "STORIES_REQUESTED",
  itemsReceived: "STORIES_RECEIVED",
  storySelected: "STORY_SELECTED"
};

export function storyIdsRequested(pageSize) {
  return dispatch => {
    dispatch({
      type: ActionTypes.storyIdsRequested
    });

    return fetch(`${baseURL}/topstories.json`)
      .then(response => response.json())
      .then(ids => {
        dispatch(storyIdsReceived(ids));
        dispatch(storiesRequested(ids.slice(0, pageSize)));
      });
  };
}

export function storyIdsReceived(ids) {
  return {
    type: ActionTypes.storyIdsReceived,
    ids
  };
}

export function storiesRequested(ids) {
  return dispatch => {
    dispatch({
      type: ActionTypes.storiesRequested,
      ids
    });

    return Promise.all(ids.map(getItem)).then(stories =>
      dispatch(itemsReceived(stories))
    );
  };
}

export function itemsReceived(stories) {
  return {
    type: ActionTypes.itemsReceived,
    stories
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
