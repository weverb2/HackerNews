import React, { Component } from "react";
import { Provider } from "react-redux";
import { Navigation } from "react-native-navigation";

import configureStore from "./Store/configureStore";
import { registerScreens } from "./Screens/registerScreens";

const store = configureStore();

registerScreens(store, Provider);

export const navigatorStyle = {
  statusBarColor: "#FF6829",
  statusBarTextColorScheme: "light",
  navigationBarColor: "#FF6829",
  navBarBackgroundColor: "#FF6829",
  navBarTextColor: "white",
  navBarButtonColor: "white",
  topBarElevationShadowEnabled: false,
  navBarHideOnScroll: false
};

Navigation.startSingleScreenApp({
  screen: {
    screen: "hackernews.StoryList",
    navigatorStyle: navigatorStyle,
    title: " HackerNews " // Spaces needed or title gets truncated
  },
  appStyle: {
    hideBackButtonTitle: true
  },
  drawer: {
    left: {
      screen: "hackernews.LeftDrawer",
      passProps: {},
      fixedWidth: 500
    }
  }
});
