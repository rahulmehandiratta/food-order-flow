import {combineReducers} from 'redux'
import global from '../actions/index'

import {connectRouter} from "connected-react-router";
import {createBrowserHistory as createHistory} from 'history'

export const history = createHistory()


export default combineReducers({
    global,
    router: connectRouter(history)
})
