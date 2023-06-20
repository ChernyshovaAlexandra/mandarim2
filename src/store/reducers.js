import {
   
} from './actionTypes'

import { combineReducers } from 'redux'


const defaultState = {
   
}

export const mainReducer = (state = defaultState, action) => {
    switch (action.type) {
        // case SET_WINNERS_LIST:
        //     return { ...state, winners: action.payload }
   
    }

    return state
}
export const rootReducer = mainReducer
// combineReducers({
//     store: mainReducer
// })
