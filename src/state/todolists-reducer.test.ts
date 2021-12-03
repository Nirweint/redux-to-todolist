import {v1} from "uuid";
import {TasksStateType, TodolistType} from "../App";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";

test('tasks should be removed, when deleting todolist', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const startTasksState: TasksStateType = {
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true},
        ]
    }

    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))
    const endTasksState = tasksReducer(startTasksState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
    expect(endTasksState[todolistId1]).toBeUndefined();

})


test('todolist should be added with new array of tasks', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const startTasksState: TasksStateType = {
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true},
        ]
    }

    const action = addTodolistAC("Grocery att")

    const endState = todolistsReducer(startState, addTodolistAC("Grocery att"))
    const endTasksState = tasksReducer(startTasksState, addTodolistAC("Grocery att"))

    expect(endState.length).toBe(3);
    expect(endState[0].id).toBe(todolistId1);
    expect(endTasksState[action.todolistId]).toBe(startTasksState[action.todolistId]);

})


test('correct todolist should be removed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]


    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});


test('todolist filter should be changed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]


    const endState = todolistsReducer(startState, changeTodolistFilterAC('completed',todolistId1))

    expect(endState.length).toBe(2);
    expect(endState[0].filter).toBe('completed');
});


test('todolist title should be changed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]


    const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistId1,'Changed'))

    expect(endState.length).toBe(2);
    expect(endState[0].title).toBe('Changed');
    expect(endState[1].title).toBe('What to buy');
});
