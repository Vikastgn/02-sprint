import React, {useState} from 'react'
import './App.css'
import {TaskType, Todolist} from './Todolist';
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

export type FilterValuesType = "all" | "completed" | "active";
type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    function removeTask(id: string, todolistId: string) {
        let tasks = tasksObj[todolistId];
        let filteredTasks = tasks.filter(t => t.id !== id);
        tasksObj[todolistId] = filteredTasks;
        setTasks({...tasksObj});
    }

    function changeTodolistTitle( id: string, newTitle: string ) {
        const todolist = todolists.find(tl => tl.id === id);
        if (todolist) {
            todolist.title= newTitle;
            setTodolists([...todolists]);
        }
    }

    function addTask(title: string, todolistId: string) {
        let task = {id: v1(), title: title, isDone: false};
        let tasks = tasksObj[todolistId];
        let newTasks = [task, ...tasks];
        tasksObj[todolistId] = newTasks;
        setTasks({...tasksObj});
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        let tasks = tasksObj[todolistId];
        let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
            setTasks({...tasksObj})
        }

    }

    function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
        let tasks = tasksObj[todolistId];
        let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.title = newTitle;
            setTasks({...tasksObj})
        }

    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId);
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists])
        }
    }

    let todolistId1 = v1();
    let todolistId2 = v1();

    // const tasks2: Array<TaskType> = [
    //   { id: 1, title: 'Hello world', isDone: true },
    //   { id: 2, title: 'I am Happy', isDone: false },
    //   { id: 3, title: 'Yo', isDone: false },
    // ]

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"},
    ])

    let removeTodolist = (todolistId: string) => {
        let filteredTodolist = todolists.filter(tl => tl.id !== todolistId)
        setTodolists(filteredTodolist);
        delete tasksObj[todolistId];
        setTasks({...tasksObj})
    }
    let [tasksObj, setTasks] = useState<TasksStateType> ( {
        [todolistId1]:  [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
            {id: v1(), title: 'Typescript', isDone: false},
            {id: v1(), title: 'RTK query', isDone: false}],
        [todolistId2]:  [
            {id: v1(), title: 'Book', isDone: false},
            {id: v1(), title: 'Milk', isDone: true}
        ]
    })

    function addTodolist (title:string) {
        let todolist: TodolistType = {
            id: v1(),
            filter: "all",
            title: title
        }
        setTodolists([todolist, ...todolists]);
        setTasks({
            ...tasksObj,
            [todolist.id]: []
        })
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {
                todolists.map((tl) => {

                    let tasksForTodolist = tasksObj[tl.id];
                    
                    if (tl.filter === "completed") {
                        tasksForTodolist = tasksObj[tl.id].filter(t => t.isDone === true);
                    }

                    if (tl.filter === "active") {
                        tasksForTodolist = tasksObj[tl.id].filter(t => t.isDone === false);
                    }
                    return <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        changeTaskTitle={changeTaskTitle}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                        changeTodolistTitle={changeTodolistTitle}
                    />
                })
            }

        </div>
    )
}

export default App