import { combineReducers } from "redux";
import HackerNewsReducer from "./HackerNewsReducer";
import StyleReducer from "./StyleReducer";

const rootReducer = combineReducers({
  HackerNewsReducer,
  StyleReducer
});

export default rootReducer;
