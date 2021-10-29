import {combineReducers } from 'redux'
import todoReducer from './Todo/todoreducer'
import { visibilityFilter } from './Todo/TodoFilterReducer'
import  asyncReducer  from "./Todo/asyncreducer";
const rootreducer = combineReducers({ todoReducer, visibilityFilter,asyncReducer });
 export default rootreducer