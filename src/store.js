import {createStore} from "redux";

const initialState = {
    todolists: [
        {
            id: 0, title: 'every day', tasks: [
                {id: 0, title: "JS"},
                {id: 1, title: "CSS"},
                {id: 2, title: "jQuery"}
            ]
        },
        {
            id: 1, title: 'to learn', tasks: [
                {id: 0, title: "JS"},
                {id: 1, title: "CSS"},
                {id: 2, title: "jQuery"}
            ]
        },
        {id: 2, title: 'ff', tasks: []}
    ]
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TODOLIST':
            return {...state, todolists: [...state.todolists, action.newTodolist]}
        case 'DELETE_TODOLIST':
            return {
                ...state, todolists: state.todolists.filter(tl => tl.id !== action.todoListId)
            }
        case 'ADD_TASK':
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id !== action.todolistId) {
                        return tl
                    } else {
                        return {...tl, tasks: [...tl.tasks, action.newTask]}
                    }
                })
            }
        case 'UPDATE_TASK':
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id === action.todolistId) {
                        return {
                            ...tl,
                            tasks: tl.tasks.map(t => {
                                if (t.id != action.taskId) {
                                    return t;
                                } else {
                                    return {...t, ...action.obj};
                                }
                            })
                        }
                    } else {
                        return tl
                    }
                })
            }
        case 'DELETE_TASK':
            return{
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
    }
    console.log('reducer', action)
    return state;
}

const store = createStore(reducer);
export default store;