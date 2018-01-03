import { Navigation } from "react-native-navigation";
import StoryList from "./StoryList";
import StoryViewer from "./StoryViewer";
import NavigationDrawer from "./NavigationDrawer";

export function registerScreens(store, Provider) {
  Navigation.registerComponent(
    "hackernews.StoryList",
    () => StoryList,
    store,
    Provider
  );
  Navigation.registerComponent(
    "hackernews.StoryViewer",
    () => StoryViewer,
    store,
    Provider
  );
  Navigation.registerComponent(
    "hackernews.LeftDrawer",
    () => NavigationDrawer,
    store,
    Provider
  );
}
