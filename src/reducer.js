export const ADD_TODOLIST = "TodoList/Reducer/ADD-TODOLIST";
export const DELETE_TODOLIST = "TodoList/Reducer/DELETE-TODOLIST";
export const DELETE_TASK = "TodoList/Reducer/DELETE-TASK";
export const ADD_TASK = "TodoList/Reducer/ADD-TASK";
export const UPDATE_TASK = "TodoList/Reducer/UPDATE-TASK";
export const SET_TODOLISTS = "TodoList/Reducer/SET_TODOLISTS";
export const SET_TASKS = "TodoList/Reducer/SET_TASKS";

const initialState = {
    "todolists": []
}

export const reducer = (state = initialState, action) => {
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
            debugger
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
            debugger
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
    }
    // console.log("reducer: ", action);
    return state;
}
export const setTodolistsAC = (todolists) => {
    return { type: SET_TODOLISTS, todolists: todolists }
}
export const addTodolistAC = (newTodolist) => {
    return {type: ADD_TODOLIST, newTodolist}
}
export const setTasksAC = (todolistId, tasks ) => {
    return { type: SET_TASKS, todolistId, tasks };
}
export const addTaskAC = (newTask,todolistId) => {
    return { type: ADD_TASK, todolistId, newTask };
}
export const updateTaskAC = (task) => {
    return { type: UPDATE_TASK, task};
}
export const deleteTodolistAC = (todolistId) => {
    return {type: DELETE_TODOLIST, todolistId: todolistId };
}
export const deleteTaskAC = (taskId, todolistId) => {
    return { type: DELETE_TASK, taskId, todolistId };
}





// export default reducer;

