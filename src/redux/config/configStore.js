import { createStore } from "redux";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // 기본: localStorage
import login from "../modules/login";
import search from "../modules/search";

const rootReducer = combineReducers({
    login: login,
    search: search
}); 

// persist 설정
const persistConfig = {
  key: "root",       // localStorage key
  storage,           // localStorage 사용
  whitelist: ["login"], // 저장할 리듀서 이름 (예: login만 저장)
  // blacklist: ["something"], // 반대로 제외할 리듀서 지정 가능
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer); 

// persist store 생성
const persistor = persistStore(store);

export { store, persistor };