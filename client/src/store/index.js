import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { authentication } from "./reducers/authentication";
import { message } from "./reducers/message";

const middleware = [thunk];
const rootReducer = combineReducers({
  authentication,
  message
});
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
