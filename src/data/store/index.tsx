import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';

import IndexReducer from '../reducers'


const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)

const store = createStoreWithMiddleware(IndexReducer)

export type RootStore = ReturnType<typeof IndexReducer> 

export default store;