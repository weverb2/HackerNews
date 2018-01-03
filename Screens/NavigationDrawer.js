import React, { Component } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  Switch,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import { toggleTheme } from "../Actions/StyleActions";
import { Dark } from "../Components/ThemeStyleSheet";
import { categoryDisplayNames, categories } from "../Actions/HackerNewsActions";
import { navigatorStyle } from "../App";

class NavigationDrawer extends Component {
  onCategorySelected(category) {
    console.log(category + " selected");
    this.props.navigator.toggleDrawer({
      side: "left"
    });
    this.props.navigator.handleDeepLink({
      link: `hackernews.${category}`,
      payload: category
    });
  }

  getStoryCategoryRow(category, theme) {
    const displayName = categoryDisplayNames[category];
    return (
      <TouchableOpacity
        key={category}
        onPress={() => this.onCategorySelected(category)}
      >
        <View style={styles.drawerItem}>
          <Text style={[styles.drawerItemText, theme.text]}>{displayName}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const { theme } = this.props;
    return (
      <SafeAreaView style={[styles.safeArea, theme.container]}>
        <View style={[styles.container, theme.container]}>
          {categories.map(category =>
            this.getStoryCategoryRow(category, theme)
          )}
          <View style={styles.drawerItem}>
            <Text style={[styles.drawerItemText, theme.text]}>Night Mode</Text>
            <Switch
              onTintColor={"#FF6829"}
              value={theme === Dark}
              thumbTintColor={"white"}
              onValueChange={() => this.props.toggleTheme()}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  container: {
    flex: 1
  },
  drawerItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16
  },
  drawerItemText: {
    fontSize: 20
  }
});

const mapStateToProps = state => {
  return {
    theme: state.StyleReducer.theme
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleTheme: () => dispatch(toggleTheme())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationDrawer);
