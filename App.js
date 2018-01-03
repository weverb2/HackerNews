import React, { Component } from "react";
import { Provider } from "react-redux";
import { Navigation } from "react-native-navigation";

import configureStore from "./Store/configureStore";
import { registerScreens } from "./Screens/registerScreens";
import { TOP_STORIES, categoryDisplayNames } from "./Actions/HackerNewsActions";

const store = configureStore();

registerScreens(store, Provider);

export const navigatorStyle = {
  statusBarColor: "#FF6829",
  statusBarTextColorScheme: "light",
  navBarBackgroundColor: "#FF6829",
  navBarTextColor: "white",
  navBarButtonColor: "white",
  topBarElevationShadowEnabled: false,
  navBarHideOnScroll: false
};

Navigation.startSingleScreenApp({
  screen: {
    screen: `hackernews.${TOP_STORIES}`,
    navigatorStyle: navigatorStyle,
    title: categoryDisplayNames[TOP_STORIES]
  },
  appStyle: {
    hideBackButtonTitle: true
  },
  drawer: {
    left: {
      screen: "hackernews.LeftDrawer"
    }
  },
  passProps: {
    category: TOP_STORIES
  }
});
