import {TasksStateType} from "../App";
import {addTodolistACType, removeTodolistACType} from "./todolists-reducer";
import {v1} from "uuid";


type RootActionsType =
    removeTaskACType
    | addTaskACType
    | changeTaskStatusACType
    | changeTaskTitleACType
    | removeTodolistACType
    | addTodolistACType;

const initState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initState, action: RootActionsType): TasksStateType => {
    switch (action.type) {

        case "REMOVE-TASK": {
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.id)}
        }
        case "ADD-TASK": {
            const newTask = {id: action.newId, title: action.title, isDone: false}
            if (state[action.todolistId]) {
                return {...state, [action.todolistId]: [newTask, ...state[action.todolistId]]}
            }
            return {...state, [action.todolistId]: [newTask]}

        }
        case "CHANGE-TASK-STATUS": {
            return {
                ...state, [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.id ? {...t, isDone: action.isDone} : t)
            }
        }
        case "CHANGE-TASK-TITLE": {
            return {
                ...state, [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.id ? {...t, title: action.title} : t)
            }
        }

        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.todolistId]
            return stateCopy
        }

        case "ADD-TODOLIST": {
            const stateCopy = {...state}
                stateCopy[action.todolistId] = []
            return stateCopy

        }

        default: {
            return state
        }
    }
}


type removeTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (id: string, todolistId: string) => {
    return {
        type: "REMOVE-TASK",
        id,
        todolistId,
    } as const
}

type addTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (title: string, todolistId: string) => {
    return {
        type: "ADD-TASK",
        title,
        todolistId,
        newId:  v1()
    } as const
}

type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (id: string, isDone: boolean, todolistId: string) => {
    return {
        type: "CHANGE-TASK-STATUS",
        id,
        isDone,
        todolistId,
    } as const
}

type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (id: string, title: string, todolistId: string) => {
    return {
        type: "CHANGE-TASK-TITLE",
        id,
        title,
        todolistId,
    } as const
}
