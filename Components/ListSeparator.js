import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, FlatList } from "react-native";

export default (ListSeparator = props => {
  return (
    <View
      style={{
        height: 1,
        marginLeft: 16,
        width: "100%",
        backgroundColor: "#CED0CE"
      }}
    />
  );
});
