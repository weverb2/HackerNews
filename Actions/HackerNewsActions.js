const baseURL = "https://hacker-news.firebaseio.com/v0";

export function storyIdsRequested(pageSize) {
  return dispatch => {
    dispatch({
      type: "STORY_IDS_REQUESTED"
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
    type: "STORY_IDS_RECEIVED",
    ids
  };
}

export function storiesRequested(ids) {
  return dispatch => {
    dispatch({
      type: "STORIES_REQUESTED",
      ids
    });

    return Promise.all(ids.map(getItem)).then(stories =>
      dispatch(itemsReceived(stories))
    );
  };
}

export function itemsReceived(stories) {
  return {
    type: "STORIES_RECEIVED",
    stories
  };
}

export function storySelected(story) {
  return {
    type: "STORY_SELECTED",
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
