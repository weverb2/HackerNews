import React, { Component } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import moment from "moment";

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
          <Text style={[styles.title, theme.text]}>{story.title}</Text>
          <View style={styles.detail}>
            <Text style={[styles.author, theme.text]}>
              Posted By: {story.by}
            </Text>
            <Text style={[styles.author, theme.text]}>
              {moment(story.time, "X").fromNow()}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 8
  },
  title: {
    fontSize: 18,
    fontWeight: "600"
  },
  author: {
    paddingTop: 8
  },
  detail: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
