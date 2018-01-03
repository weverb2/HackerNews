import React, { Component } from "react";
import { connect } from "react-redux";
import { SafeAreaView, FlatList, StyleSheet } from "react-native";
import ListSeparator from "../Components/ListSeparator";
import {
  storyIdsRequested,
  storiesRequested,
  storySelected,
  TOP_STORIES,
  BEST_STORIES,
  NEW_STORIES,
  categoryDisplayNames
} from "../Actions/HackerNewsActions";
import { toggleTheme } from "../Actions/StyleActions";
import StoryCard from "../Components/StoryCard";
import { navigatorStyle } from "../App";

const pageSize = 20;

class StoryList extends Component {
  static navigatorButtons = {
    leftButtons: [
      {
        title: "Menu",
        id: "sideMenu"
      }
    ]
  };

  onNavigatorEvent(event) {
    if (event.type == "DeepLink") {
      this.props.navigator.resetTo({
        screen: event.link,
        animated: true,
        navigatorStyle,
        passProps: {
          category: event.payload
        },
        title: categoryDisplayNames[event.payload]
      });
    } else if (event.id == "sideMenu") {
      this.props.navigator.toggleDrawer({
        side: "left"
      });
    }
  }

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this.state = {
      start: 0,
      end: 20
    };
  }

  componentDidMount() {
    this.props.requestStoryIds(pageSize);
  }

  _keyExtractor = (item, index) => item.id;

  _handleEndOfPage = () => {
    this.setState(
      {
        start: this.state.start + pageSize,
        end: this.state.end + pageSize
      },
      () => this.loadMoreStories()
    );
  };

  _refreshStories() {
    this.setState({
      start: 0,
      end: pageSize
    });
    this.props.requestStoryIds(pageSize);
  }

  loadMoreStories() {
    const { ids, inProgress } = this.props.content;
    const { start, end } = this.state;
    if (!inProgress) this.props.requestStories(ids.slice(start, end));
  }

  _handleStoryPressed(story) {
    this.props.storySelected(story);
    this.props.navigator.push({
      screen: "hackernews.StoryViewer",
      title: story.title,
      navigatorStyle: navigatorStyle
    });
  }

  render() {
    const { content, theme } = this.props;
    return (
      <SafeAreaView style={[styles.safeArea, theme.safeArea]}>
        <FlatList
          style={[theme.container]}
          keyExtractor={this._keyExtractor}
          data={content.stories}
          onEndReachedThreshold={0.5}
          onEndReached={this._handleEndOfPage}
          onRefresh={this._refreshStories.bind(this)}
          refreshing={content.isRefreshing}
          renderItem={({ item }) => (
            <StoryCard
              theme={theme}
              story={item}
              onPress={this._handleStoryPressed.bind(this)}
            />
          )}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  }
});

const mapStateToProps = (state, ownProps) => {
  var content;
  if (ownProps.category == TOP_STORIES) {
    content = state.HackerNewsReducer.topstories;
  } else if (ownProps.category == BEST_STORIES) {
    content = state.HackerNewsReducer.beststories;
  } else {
    content = state.HackerNewsReducer.newstories;
  }

  return {
    content: content,
    theme: state.StyleReducer.theme
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    requestStoryIds: pageSize =>
      dispatch(storyIdsRequested(pageSize, ownProps.category)),
    requestStories: ids => dispatch(storiesRequested(ids, ownProps.category)),
    storySelected: story => dispatch(storySelected(story))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StoryList);
