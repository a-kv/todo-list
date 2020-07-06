import {api} from "./api/api";
import {TaskType, TodoType} from "./types/entities";
import {ThunkAction, ThunkDispatch } from "redux-thunk";
import {AppStateType} from "./store";

export const ADD_TODOLIST = "TodoList/Reducer/ADD-TODOLIST";
export const DELETE_TODOLIST = "TodoList/Reducer/DELETE-TODOLIST";
export const DELETE_TASK = "TodoList/Reducer/DELETE-TASK";
export const ADD_TASK = "TodoList/Reducer/ADD-TASK";
export const UPDATE_TASK = "TodoList/Reducer/UPDATE-TASK";
export const SET_TODOLISTS = "TodoList/Reducer/SET_TODOLISTS";
export const SET_TASKS = "TodoList/Reducer/SET_TASKS";
export const UPDATE_TITLE_TODOLIST = "TodoList/Reducer/UPDATE_TITLE_TODOLIST";

type InitialState = {
    todolists: Array<TodoType>
}

const initialState: InitialState = {
    todolists: []
}

type ActionsType = addTodolistType | setTodolistsType | addTaskSucsessType | setTasksType | deleteTaskType | updateTodolistType | deleteTodolistType | UpdateTaskSuccessActionType

export const reducer = (state: InitialState = initialState, action: ActionsType): InitialState => {
    switch (action.type) {
        case SET_TASKS:
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id !== action.todolistId) {
                        return tl;
                    } else {
                        return {...tl, tasks: action.tasks}
                    }
                })
            }
        case SET_TODOLISTS:
            return {
                ...state,
                todolists: action.todolists.map(tl => ({...tl, tasks: []}))
            }
        case ADD_TODOLIST:
            return {
                ...state,
                todolists: [...state.todolists, action.newTodolist]
            }
        case DELETE_TODOLIST:
            return {
                ...state,
                todolists: state.todolists.filter(tl => tl.id !== action.todolistId)
            }
        case DELETE_TASK:
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id === action.todolistId) {
                        return {
                            ...tl,
                            tasks: tl.tasks.filter(t => t.id !== action.taskId)
                        }
                    } else {
                        return tl
                    }
                })
            }
        case ADD_TASK:
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id === action.todolistId) {
                        return {...tl, tasks: [...tl.tasks, action.newTask]}
                    } else {
                        return tl
                    }
                })
            }
        case UPDATE_TASK:
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id === action.task.todoListId) {
                        return {
                            ...tl,
                            tasks: tl.tasks.map(t => {
                                if (t.id !== action.task.id) {
                                    return t;
                                } else {
                                    return action.task;
                                }
                            })
                        }
                    } else {
                        return tl
                    }
                })
            }
        case UPDATE_TITLE_TODOLIST: //start from bll
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id !== action.todolistId) {
                        return tl;
                    } else {
                        return {...tl, title: action.title}
                    }
                })
            }

    }
    // console.log("reducer: ", action);
    return state;
}


type UpdateTaskSuccessActionType = {
    type: typeof UPDATE_TASK
    task: TaskType
}

type addTodolistType = {
    type: typeof ADD_TODOLIST
    newTodolist: TodoType
}

type setTodolistsType = {
    type: typeof SET_TODOLISTS
    todolists: Array<TodoType>
}

type addTaskSucsessType = {
    type: typeof ADD_TASK
    newTask: TaskType,
    todolistId: string
}

type setTasksType = {
    type: typeof SET_TASKS
    todolistId: string,
    tasks: Array<TaskType>
}
type deleteTodolistType = {
    type: typeof DELETE_TODOLIST
    todolistId: string,
}
type deleteTaskType = {
    type: typeof DELETE_TASK
    taskId: string
    todolistId: string
}

type updateTodolistType = {
    type: typeof UPDATE_TITLE_TODOLIST
    title:string
    todolistId: string
}

// type ActionsType =
//     UpdateTaskSuccessActionType
//     | DeleteTodoSuccessActionType
//     | DeleteTaskSuccessActionType
//     | UpdateTodolistTitleSuccessActionType
//     | AddTaskSuccessActionType
//     | GetTasksSuccessActionType
//     | AddTodolistSuccessActionType
//     | GetTodolistsSuccessActionType
//
//
// type UpdateTaskSuccessActionType = {
//     type: typeof UPDATE_TASK_SUCCESS // TodoList/Reducer/UPDATE_TASK_SUCCESS';
//     taskId: string
//     obj: TodoUpdateObject
//     todolistId: string
// }
// type DeleteTodoSuccessActionType = {
//     type: typeof DELETE_TODOLIST_SUCCESS // TodoList/Reducer/UPDATE_TASK_SUCCESS';
//     todolistId: string
// }
// type DeleteTaskSuccessActionType = {
//     type: typeof DELETE_TASK_SUCCESS
//     todolistId: string
//     taskId: string
// }
// type UpdateTodolistTitleSuccessActionType = {
//     type: typeof UPDATE_TODOLIST_TITLE_SUCCESS
//     todolistId: string
//     title: string
// }
// type AddTaskSuccessActionType = {
//     type: typeof ADD_TASK_SUCCESS
//     newTask: TaskType
//     todolistId: string
// }
// type GetTasksSuccessAction
// От Дмитрий Кузюбердин (VroonLab) всем:  08:20 PM
// type GetTasksSuccessActionType = {
//     type: typeof SET_TASKS_SUCCESS
//     tasks: Array<TaskType>
//     todolistId: string
// }
// type AddTodolistSuccessActionType = {
//     type: typeof ADD_TODOLIST_SUCCESS
//     newTodolist: TodoType
// }
// type GetTodolistsSuccessActionType = {
//     type: typeof SET_TODOLISTS_SUCCESS
//     todolists: Array<TodoType>
// }

//Action creators
export const setTodolistsAC = (todolists: Array<TodoType>): setTodolistsType => {
    // debugger
    return {type: SET_TODOLISTS, todolists}
}
export const addTodolistAC = (newTodolist: TodoType): addTodolistType => {
    return {type: ADD_TODOLIST, newTodolist}
}
export const setTasksAC = (todolistId: string, tasks: Array<TaskType>): setTasksType => {
    return {type: SET_TASKS, todolistId, tasks};
}
export const addTaskSucsess = (newTask: TaskType, todolistId: string): addTaskSucsessType => {
    return {type: ADD_TASK, todolistId, newTask};
}
export const updateTaskAC = (task: TaskType): UpdateTaskSuccessActionType => {
    return {type: UPDATE_TASK, task};
}
export const deleteTodolistAC = (todolistId: string): deleteTodolistType => {
    return {type: DELETE_TODOLIST, todolistId: todolistId};
}
export const deleteTaskAC = (taskId: string, todolistId: string): deleteTaskType => {
    return {type: DELETE_TASK, taskId, todolistId};
}
export const updateTodolistAC = (title:string, todolistId: string): updateTodolistType => {
    return {type: UPDATE_TITLE_TODOLIST, title, todolistId};
}

//Thunk
type ThunkType =  ThunkAction<void, AppStateType, unknown, ActionsType>
export type ThunkDispatchType =  ThunkDispatch <AppStateType, {}, ActionsType>

export const setTodolists = (): ThunkType=> (dispatch: ThunkDispatchType) => {
    //request to server
    api.getTodolists()
        .then(res => {
            dispatch(setTodolistsAC(res)) // undef
        });
}
export const addTodolist = (title: string):ThunkType  => (dispatch: ThunkDispatchType) => {
    api.createTodolist(title)
        .then(res => {
            let todolist = res.data.item;
            dispatch(addTodolistAC(todolist))
        });
}
export const setTasks = (todolistId: string):ThunkType  => (dispatch: ThunkDispatchType) => {
    api.getTasks(todolistId)
        .then(res => {
            dispatch(setTasksAC(todolistId, res.items)); //items
        });
}

export const addTask = (newText: string, todolistId: string):ThunkType  => (dispatch: ThunkDispatchType) => {
    api.createTask(newText, todolistId)
        .then(res => {
            if (res.resultCode === 0) {
                let newTask = res.data.item;
                dispatch(addTaskSucsess(newTask, todolistId));
            }
        });
}
export const updateTask = (todolistId: string, taskId: string, newTask: TaskType):ThunkType => (dispatch: ThunkDispatchType, getState: () => AppStateType) => {
    api.updateTask(todolistId, taskId, newTask)
        .then(res => {
            if (res.resultCode === 0) {
                dispatch(updateTaskAC(res.data.item));
            }
        });
} //??

export const deleteTodolist = (todolistId: string):ThunkType  => (dispatch: ThunkDispatchType) => {
    api.deleteTodoList(todolistId)
        .then(res => {
            if (res.resultCode === 0) {
                dispatch(deleteTodolistAC(todolistId));
            }
        });
}
export const deleteTask = (taskId: string, todolistId: string):ThunkType  => (dispatch: ThunkDispatchType) => {
    api.deleteTodoList(todolistId)
        .then(res => {
            if (res.resultCode === 0) {
                dispatch(deleteTaskAC(taskId, todolistId));
            }
        });
}
export const updateTodolist = (title: string, todolistId: string):ThunkType => (dispatch: ThunkDispatchType, getState) => {
    api.updataTodolist(title, todolistId)
        .then(res => {
            if (res.resultCode === 0) {
                debugger
                dispatch(updateTodolistAC(title, todolistId));
            }
        });
}
