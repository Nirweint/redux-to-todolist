import React, {ChangeEvent} from 'react';
import {TodolistType} from './App';
import {EditableSpan} from "./EditableSpan";
import {AddItemForm} from "./AddItemForm";
import {useDispatch, useSelector} from "react-redux";
import {rootReducerType} from "./state/store";
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
}

export function Todolist(props: PropsType) {

    const dispatch = useDispatch()
    let todolists = useSelector<rootReducerType, Array<TodolistType>>(state => state.todolists.filter(todolist => todolist.id === props.id))[0]
    let tasks = useSelector<rootReducerType, Array<TaskType>>(state => state.tasks[props.id])

    const addTaskHandler = (title: string) => {
           dispatch(addTaskAC(title, props.id));
    }
    const removeTodolistHandler = () => dispatch(removeTodolistAC(props.id))
    const changeTodolistTitleHandler = (title: string) => {
        dispatch(changeTodolistTitleAC(props.id, title))
    }

    const onAllClickHandler = () => dispatch(changeTodolistFilterAC("all", props.id));
    const onActiveClickHandler = () => dispatch(changeTodolistFilterAC("active", props.id));
    const onCompletedClickHandler = () => dispatch(changeTodolistFilterAC("completed", props.id));

    if (todolists.filter === "active") {
        tasks = tasks.filter(t => !t.isDone);
    }
    if (todolists.filter === "completed") {
        tasks = tasks.filter(t => t.isDone);
    }

    return <div>
        <h3>
            <EditableSpan title={todolists.title} changeTaskTitle={changeTodolistTitleHandler}/>
            <button onClick={removeTodolistHandler}>x</button>
        </h3>
        <AddItemForm onClick={addTaskHandler}/>
        <ul>
           {
                tasks.map(t => {
                    const onClickHandler = () => dispatch(removeTaskAC(t.id, props.id))
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        dispatch(changeTaskStatusAC(t.id, newIsDoneValue, props.id))
                    }
                    const changeTasksTitleHandler = (title: string) => {
                        dispatch(changeTaskTitleAC(t.id, title, props.id))
                    }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>
                        <EditableSpan title={t.title} changeTaskTitle={changeTasksTitleHandler}/>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={todolists.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
            </button>
            <button className={todolists.filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={todolists.filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}


