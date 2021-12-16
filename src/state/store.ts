import {combineReducers, createStore} from "redux";
import {tasksReducer} from "./tasks-reducer";
import {todolistsReducer} from "./todolists-reducer";


let rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
})

export type rootReducerType = ReturnType<typeof rootReducer>

export let store = createStore(rootReducer);