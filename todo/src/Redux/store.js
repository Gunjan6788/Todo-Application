import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import {authreducer} from './Auth/authreducer'
import {todoreducer} from './Todo/todoreducer'

const mainreducer = combineReducers({auth:authreducer,todo:todoreducer})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store =  createStore(mainreducer, composeEnhancers(applyMiddleware()))

console.log(store.getState())