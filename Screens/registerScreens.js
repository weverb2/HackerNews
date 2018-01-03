import { Navigation } from "react-native-navigation";
import StoryList from "./StoryList";
import StoryViewer from "./StoryViewer";
import NavigationDrawer from "./NavigationDrawer";
import {
  TOP_STORIES,
  BEST_STORIES,
  NEW_STORIES
} from "../Actions/HackerNewsActions";

export function registerScreens(store, Provider) {
  Navigation.registerComponent(
    `hackernews.${TOP_STORIES}`,
    () => StoryList,
    store,
    Provider
  );
  Navigation.registerComponent(
    `hackernews.${BEST_STORIES}`,
    () => StoryList,
    store,
    Provider
  );
  Navigation.registerComponent(
    `hackernews.${NEW_STORIES}`,
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
