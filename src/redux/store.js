import { createStore, applyMiddleware, combineReducers } from "redux";
import { reducer } from "./reducer";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
console.log(store.getState());
export default store;
