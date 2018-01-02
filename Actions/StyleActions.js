export const ActionTypes = {
  toggleTheme: "TOGGLE_THEME"
};

export function toggleTheme() {
  return {
    type: ActionTypes.toggleTheme
  };
}
