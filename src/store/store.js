import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

import { carReducer } from './car.reducer'
import { userReducer } from './user.reducer'
import { reviewReducer } from './review.reducer'
import { systemReducer } from './system.reducer'

const rootReducer = combineReducers({
    carModule: carReducer,
    userModule: userReducer,
    systemModule: systemReducer,
    reviewModule: reviewReducer,
})

export const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production'
})

// For debug:
// store.subscribe(() => {
//     console.log('**** Store state changed: ****')
//     console.log('storeState:\n', store.getState())
//     console.log('*******************************')
// })
