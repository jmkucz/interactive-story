import { combineReducers } from 'redux'
import loginReducer from './general.reducer'

const rootReducer = combineReducers(
    {
        login: loginReducer,
    }
)

export default rootReducer