import React, { Component } from "react";
import { connect } from "react-redux";
import { SafeAreaView, FlatList, StyleSheet } from "react-native";
import ListSeparator from "../Components/ListSeparator";
import {
  storyIdsRequested,
  storiesRequested,
  storySelected
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
    if (event.id == "sideMenu") {
      this.props.navigator.toggleDrawer({
        side: "left",
        animated: true
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

const mapStateToProps = state => {
  return {
    content: state.HackerNewsReducer.topStories,
    theme: state.StyleReducer.theme
  };
};

const mapDispatchToProps = dispatch => {
  return {
    requestStoryIds: pageSize => dispatch(storyIdsRequested(pageSize)),
    requestStories: ids => dispatch(storiesRequested(ids)),
    storySelected: story => dispatch(storySelected(story)),
    toggleTheme: () => dispatch(toggleTheme())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StoryList);
