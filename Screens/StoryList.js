import React, { Component } from "react";
import { connect } from "react-redux";
import { Platform, StyleSheet, Text, View, FlatList } from "react-native";
import ListSeparator from "../Components/ListSeparator";
import {
  storyIdsRequested,
  storiesRequested
} from "../Actions/HackerNewsActions";

const pageSize = 20;

class StoryList extends Component {
  constructor() {
    super();
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
    const { ids, inProgress } = this.props.stories;
    const { start, end } = this.state;
    if (!inProgress) this.props.requestStories(ids.slice(start, end));
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          ItemSeparatorComponent={ListSeparator}
          keyExtractor={this._keyExtractor}
          data={this.props.stories.stories}
          onEndReachedThreshold={0.5}
          onEndReached={this._handleEndOfPage}
          onRefresh={this._refreshStories.bind(this)}
          refreshing={this.props.stories.isRefreshing}
          renderItem={({ item }) => (
            <View>
              <Text>{item.title}</Text>
            </View>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});

const mapStateToProps = state => {
  return {
    stories: state.HackerNewsReducer.topStories
  };
};

const mapDispatchToProps = dispatch => {
  return {
    requestStoryIds: pageSize => dispatch(storyIdsRequested(pageSize)),
    requestStories: ids => dispatch(storiesRequested(ids))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StoryList);
