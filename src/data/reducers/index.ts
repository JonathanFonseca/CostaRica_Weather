import { combineReducers } from 'redux'
import locationReducer from './locationReducer'
import weatherReducer from './weatherReducer'
const allReducers = combineReducers({
    locationReducer: locationReducer,
    weatherReducer: weatherReducer
})

export default allReducers