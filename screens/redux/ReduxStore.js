import { configureStore } from "@reduxjs/toolkit";
import LearningtoolReducer from './slices/LearningToolList'
import ActivityListReducer from './slices/ModuleActivityList'

const ReduxStore = configureStore({
    reducer:{
        LearningToolList:LearningtoolReducer,
        ActivityToolList:ActivityListReducer,
    }
})
export default ReduxStore