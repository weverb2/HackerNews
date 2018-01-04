import reducer from "./StyleReducer";

import { Dark, Light } from "../Components/ThemeStyleSheet";
import { ActionTypes } from "../Actions/StyleActions";

const initialState = {
  theme: Dark
};

describe("Style Reducer", () => {
  it("returns the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("can toggle the theme", () => {
    expect(reducer(undefined, { type: ActionTypes.toggleTheme })).toEqual({
      theme: Light
    });
  });

  it("can toggle the theme back", () => {
    expect(
      reducer(
        {
          theme: Light
        },
        { type: ActionTypes.toggleTheme }
      )
    ).toEqual({
      theme: Dark
    });
  });
});
