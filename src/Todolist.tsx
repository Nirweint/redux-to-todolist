import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {EditableSpan} from "./EditableSpan";
import {AddItemForm} from "./AddItemForm";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    filter: FilterValuesType
    changeTaskTitle: (id: string, title: string, todolistId: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
}

export function Todolist(props: PropsType) {

    const addTaskHandler = (title: string) => {
            props.addTask(title, props.id);
    }
    const removeTodolist = () => props.removeTodolist(props.id)
    const changeTodolistTitleHandler = (title: string) => {
        props.changeTodolistTitle(props.id, title)
    }

    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);

    return <div>
        <h3>
            <EditableSpan title={props.title} changeTaskTitle={changeTodolistTitleHandler}/>
            <button onClick={removeTodolist}>x</button>
        </h3>
        <AddItemForm onClick={addTaskHandler}/>
        <ul>
           {
                props.tasks && props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(t.id, newIsDoneValue, props.id);
                    }
                    const changeTasksTitleHandler = (title: string) => {
                        props.changeTaskTitle(t.id, title, props.id)
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
            <button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
            </button>
            <button className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}


