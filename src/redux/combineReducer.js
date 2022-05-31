import { combineReducers } from "redux";
import { authReducer } from "./reducer/userReducer";

export const rootReducer = combineReducers({
    auth : authReducer,
})