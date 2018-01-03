import React, { Component } from "react";
import { connect } from "react-redux";
import { StyleSheet, WebView, SafeAreaView, Text, View } from "react-native";
import HTMLView from "react-native-htmlview";

class StoryViewer extends Component {
  renderStory(story, theme) {
    if (story.url) {
      return <WebView source={{ uri: story.url }} />;
    } else {
      return (
        <HTMLView
          style={{ padding: 16 }}
          stylesheet={theme}
          value={`<body>${story.text}</body>`}
        />
      );
    }
  }

  render() {
    const { theme, selectedStory } = this.props;
    this.props.navigator.title = selectedStory.title;
    return (
      <SafeAreaView style={[styles.safeArea, theme.safeArea]}>
        <View style={[styles.container, theme.container]}>
          {this.renderStory(selectedStory, theme)}
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#F5FCFF"
  },
  container: {
    flex: 1
  }
});

const mapStateToProps = state => {
  console.log(state.StyleReducer.theme);
  return {
    selectedStory: state.HackerNewsReducer.selectedStory,
    theme: state.StyleReducer.theme
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(StoryViewer);
