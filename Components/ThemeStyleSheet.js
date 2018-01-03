import { StyleSheet } from "react-native";

export const Dark = StyleSheet.create({
  container: {
    backgroundColor: "#424242"
  },
  text: {
    color: "#fafafa"
  },
  safeArea: {
    backgroundColor: "#FF6829",
    flex: 1
  },
  body: {
    backgroundColor: "#424242",
    color: "#fafafa"
  }
});

export const Light = StyleSheet.create({
  container: {
    backgroundColor: "#F6F6F0"
  },
  text: {
    color: "#212121"
  },
  safeArea: {
    backgroundColor: "#FF6829",
    flex: 1
  },
  body: {
    backgroundColor: "#F6F6F0",
    color: "#212121"
  }
});
