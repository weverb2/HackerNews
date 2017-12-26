import React, { Component } from "react";
import { connect } from "react-redux";
import { Platform, StyleSheet, Text, View, FlatList } from "react-native";
import ListSeparator from "../Components/ListSeparator";
import {
  storyIdsRequested,
  storiesRequested
} from "../Actions/HackerNewsActions";

class App extends Component {
  _keyExtractor = (item, index) => item.id;

  constructor() {
    super();
    this.state = {
      stories: {}
    };
  }

  componentDidMount() {
    this.props.requestStoryIds();
  }

  componentWillReceiveProps(nextProps) {
    const ids = nextProps.stories.ids;
    console.log("outside the if");
    console.log(JSON.stringify(this.props));
    console.log(JSON.stringify(nextProps));
    if (
      ids &&
      nextProps.stories.stories.length == 0 &&
      !nextProps.stories.inProgress
    ) {
      console.log("inside the if");
      this.props.requestStories(ids.slice(0, 20));
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          ItemSeparatorComponent={ListSeparator}
          keyExtractor={this._keyExtractor}
          data={this.props.stories.stories}
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
    requestStoryIds: () => dispatch(storyIdsRequested()),
    requestStories: ids => dispatch(storiesRequested(ids))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
