import { createStore,applyMiddleware } from 'redux'
import rootreducer from './'
import { logger } from 'redux-logger'
import  thunk  from "redux-thunk";
const store = createStore(rootreducer,applyMiddleware(logger,thunk));
export default store