import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

import {combineReducers} from "redux"
import { adminReducer } from "./adminReducer"
import  authReducer from './authReducer'
import { doctorReducer } from "./doctorReducer"

const persistConfig = {
    key: 'root',
    storage,
  }
const rootReducer = combineReducers ({
    authReducer,doctorReducer,adminReducer
})
export default persistReducer(persistConfig, rootReducer);