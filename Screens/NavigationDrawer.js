import React, { Component } from "react";
import { View, SafeAreaView, StyleSheet, Text, Switch } from "react-native";
import { connect } from "react-redux";
import { toggleTheme } from "../Actions/StyleActions";
import { Dark } from "../Components/ThemeStyleSheet";

class NavigationDrawer extends Component {
  render() {
    const { theme } = this.props;
    return (
      <SafeAreaView style={[styles.safeArea, theme.container]}>
        <View style={[styles.container, theme.container]}>
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
