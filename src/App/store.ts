import { combineReducers, configureStore } from "@reduxjs/toolkit";
import loginReducer from "../Features/Login/loginSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import registerReducer from "../Features/Register/registerSlice";
import projectReducer from "../Features/Project/projectSlice";
import profileReducer from "../Features/Profile/profileSlice";
import userReducer from "../Features/Users/userSlice";
import taskReducer from "../Features/Task/taskSlice";
const rootReducer = combineReducers({
  login: loginReducer,
  register: registerReducer,
  project: projectReducer,
  profile: profileReducer,
  user: userReducer,
  tasks: taskReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["login", "register", "project", "profile", "user", "tasks"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
