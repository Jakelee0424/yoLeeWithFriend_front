import { createStore } from "redux";
import { combineReducers } from "redux";
import login from "../modules/login";
import search from "../modules/search";

const rootReducer = combineReducers({
    login: login,
    search: search
}); 
const store = createStore(rootReducer); 

export default store;