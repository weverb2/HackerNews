import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text, WebView } from "react-native";

class StoryViewer extends Component {
  render() {
    return <WebView source={{ uri: this.props.selectedStory.url }} />;
  }
}

const mapStateToProps = state => {
  return {
    selectedStory: state.HackerNewsReducer.selectedStory
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(StoryViewer);
