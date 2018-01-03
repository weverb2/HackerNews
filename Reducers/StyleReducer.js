import { createReducer } from "./createReducer";
import { Light, Dark } from "../Components/ThemeStyleSheet";
import { ActionTypes } from "../Actions/StyleActions";

const initialState = {
  theme: Dark
};

export default createReducer(initialState, {
  [ActionTypes.toggleTheme](state, action) {
    const currentTheme = state.theme;
    var newTheme;
    if (currentTheme === Light) {
      newTheme = Dark;
    } else {
      newTheme = Light;
    }
    const newState = {
      ...state,
      theme: newTheme
    };
    return newState;
  }
});
