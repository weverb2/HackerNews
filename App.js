import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import configureStore from "./Store/configureStore";
import StoryList from "./Screens/StoryList";

const store = configureStore();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <StoryList />
      </Provider>
    );
  }
}
