import React, { Component } from "react";
import { connect } from "react-redux";
import { StyleSheet, WebView, SafeAreaView } from "react-native";

class StoryViewer extends Component {
  render() {
    const { theme, selectedStory } = this.props;
    return (
      <SafeAreaView style={[styles.container, theme.safeArea]}>
        <WebView source={{ uri: selectedStory.url }} />
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  }
});

const mapStateToProps = state => {
  return {
    selectedStory: state.HackerNewsReducer.selectedStory,
    theme: state.StyleReducer.theme
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(StoryViewer);
