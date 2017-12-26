import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunkMiddleware from "redux-thunk";

import rootReducer from "../Reducers/RootReducer";

const middleware = [thunkMiddleware, logger];

const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);

export default (configureStore = () => {
  return createStoreWithMiddleware(rootReducer);
});
