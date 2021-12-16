import React from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {AddItemForm} from "./AddItemForm";
import {addTodolistAC} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {rootReducerType} from "./state/store";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function App() {
    const dispatch = useDispatch()
    const todolists = useSelector<rootReducerType, Array<TodolistType>>(state => state.todolists)
    const addTodolist = (title: string) => {
        dispatch(addTodolistAC(title))
    }

    return (
        <div className="App">
            <AddItemForm onClick={addTodolist}/>
            {
                todolists.map(tl => {
                    return <Todolist
                        key={tl.id}
                        id={tl.id}
                    />
                })
            }
        </div>
    );
}

export default App;
