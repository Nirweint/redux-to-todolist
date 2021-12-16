import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";


type RootActionsType = changeTodolistFilterACType | removeTodolistACType | changeTodolistTitleACType | addTodolistACType


const initState: Array<TodolistType> = []

export const todolistsReducer = (state: Array<TodolistType> = initState, action: RootActionsType) => {
    switch (action.type) {

        case "CHANGE-TODOLIST-FILTER": {
            return state.map(tl => tl.id === action.todolistId ? {...tl, filter: action.value} : tl)
        }
        case "REMOVE-TODOLIST": {
            return  state.filter(tl => tl.id !== action.todolistId)
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(tl => tl.id === action.todolistId ? {...tl, title: action.title} : tl)
        }

        case "ADD-TODOLIST": {
            const newTodolist: TodolistType = {id: action.todolistId, title: action.title, filter: "all" }
            return [...state, newTodolist]
        }

        default: {
            return state
        }
    }
}


type changeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>
export const changeTodolistFilterAC = (value: FilterValuesType, todolistId: string) => {
    return {
        type: "CHANGE-TODOLIST-FILTER",
        value,
        todolistId,
    } as const
}

export type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todolistId: string) => {
    return {
        type: "REMOVE-TODOLIST",
        todolistId,
    } as const
}


export type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (todolistId: string, title: string) => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        todolistId,
        title,
    } as const
}

export type addTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (title: string) => {
    return {
        type: "ADD-TODOLIST",
        todolistId: v1(),
        title,
    } as const
}