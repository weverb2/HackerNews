import React, { Component } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Dark } from "./ThemeStyleSheet";

export default class StoryCard extends Component {
  _onPress = () => {
    this.props.onPress(this.props.story);
  };

  render() {
    const { story, theme } = this.props;
    return (
      <TouchableOpacity onPress={this._onPress}>
        <View style={[styles.container, theme.container]}>
          <Text style={[theme.text]}>{story.title}</Text>
          <Text style={[styles.author, theme.text]}>Posted By: {story.by}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 8
  },
  author: {
    paddingTop: 4
  }
});
