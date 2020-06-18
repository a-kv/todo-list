import React from 'react';
import './App.css';
import TodoListTasks from "./Components/TodoListTasks/TodoListTasks";
import TodoListFooter from "./Components/Footer/Footer";
import TodoListTitle from "./Components/Header/TodoListTitle";
import AddNewItemForm from "./Components/Header/AddNewItemForm";
import {connect} from "react-redux";
import {addTaskAC, deleteTaskAC, deleteTodolistAC, setTasksAC, updateTaskAC, updateTodolistAC} from "./reducer";
import axios from "axios";
import {api} from "./api/api";


//"API-KEY": "d13010db-d825-4b89-b5a1-3acdd313b6bb"
class TodoList extends React.Component {

    // constructor(props) {
    //     super(props);
    //     this.addTask = this.addTask.bind(this)
    // }

    nextTaskId = 0;

    state = {
        tasks: [],
        filterValue: "All"
    };

    saveState = () => {
        let stateAsString = JSON.stringify(this.state)
        localStorage.setItem('our-state-' + this.props.id, stateAsString)
    }

    _restoreStore = () => {
        let state = {
            tasks: [],
            filterValue: "All"
        };
        let stateAsString = localStorage.getItem('our-state-' + this.props.id);
        if (stateAsString) {
            state = JSON.parse(stateAsString);
        }

        this.setState(state, () => {
            this.state.tasks.forEach(t => {
                if (t.id >= this.nextTaskId) {
                    this.nextTaskId = t.id + 1
                }
            })
        });
    }

    restoreState = () => { // получаем таски с сервака
        api.getTasks(this.props.id)
            .then(res => {
                this.props.setTasks(this.props.id, res.items);
            });
    }

    componentDidMount() {
        this.restoreState(); // удобно запускать сет таймауты и тд
    }

    // changeTask = (taskId, obj) => {
    //     let newTasks = this.state.tasks.map(t => {
    //         if (t.id === taskId) {
    //             return {...t, ...obj};
    //         }
    //         return t;
    //     });
    //     this.props.changeTask(taskId, obj, this.props.id);
    //
    //     this.setState({
    //         tasks: newTasks
    //     }, this.saveState)
    // }
    changeTask = (newTask) => {
        // this.props.tasks.forEach(t => {
        //     if (t.id === taskId) {
                api.updateTask(newTask, this.props.id)
                    .then(res => {
                        if (res.resultCode === 0) {
                            this.props.updateTask(res.data.item);
                        }
                    })
                    .catch(e => {
                        console.log(e)
                    });
            // }
        // })

    }

    changeStatus = (newTask, status) => {
        this.changeTask({...newTask, status: status === true ? 2 : 0})
    }

    changeTitle = (newTask, title) => {
        this.changeTask({...newTask, title: title})

    }
    changePriority = (newTask, priority) => {

        this.changeTask({...newTask, priority: priority === 'high' ? 2 : priority === 'med' ? 1 : 0})

    }
    deleteTodoList = () => {
        api.deleteTodoList(this.props.id)
            .then(res => {
                if (res.resultCode === 0) {
                    this.props.deleteTodolist(this.props.id);
                }
            });
    }

    deleteTask = (taskId, todolistId) => {
        api.deleteTask(taskId, this.props.id)
            .then(res => {
                if (res.resultCode === 0) {
                    this.props.deleteTask(taskId, this.props.id);
                }
            });
    }

    addTask = (newText) => {
        api.createTask(newText, this.props.id)
            .then(res => {
                if (res.resultCode === 0) {
                    let newTask = res.data.item;
                    this.props.addTask(newTask, this.props.id);
                }
            })
    };

// let newTask = {
//     id: this.nextTaskId,
//     title: newTitle,
//     isDone: false,
//     priority: 'low'
// };
// this.nextTaskId++;
// // let newTasks = [...this.state.tasks, newTask];
// this.props.addTask(newTask, this.props.id);
// this.setState({tasks: newTasks}, this.saveState);

    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        });
    }
    changeTitleTodolist = (title) => {
        api.updataTodolist(title, this.props.id)
            .then(res => {
                if (res.resultCode === 0) {
                    this.props.updateTodolist({id: this.props.id, title: title})
                }
            })
        // let newTodolist = {
        //     id: this.props.id,
        //     title: title,
        // }

    }

    render = () => {
        let {tasks = []} = this.props;  //деструктуризация , вытаскиваем таски из пропсов
        let filteredTasks = tasks.filter(t => {
            switch (this.state.filterValue) {
                case 'Active':
                    return !t.isDone;
                case 'Completed':
                    return t.isDone;
                default:
                    return true;
            }
        })

        return (

            <div className="todoList">
                <TodoListTitle changeTitleTodolist={this.changeTitleTodolist} id={this.props.id}
                               deleteTodoList={this.deleteTodoList}
                               title={this.props.title}/>
                <AddNewItemForm addItem={this.addTask}/>
                <TodoListTasks changeTitle={this.changeTitle}
                               changeStatus={this.changeStatus}
                               tasks={filteredTasks}
                               changePriorityValue={this.changePriority}
                               deleteTask={this.deleteTask}
                />
                <TodoListFooter changeFilter={this.changeFilter} filterValue={this.state.filterValue}/>
            </div>

        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addTask(newTask, todolistId) {
            dispatch(addTaskAC(newTask, todolistId));
        },
        setTasks(todolistId, tasks) {
            dispatch(setTasksAC(todolistId, tasks));
        },
        deleteTodolist: (todolistId) => {
            const action = deleteTodolistAC(todolistId);
            dispatch(action)
        },
        deleteTask: (taskId, todolistId) => {
            const action = deleteTaskAC(taskId, todolistId);
            dispatch(action)
        },
        updateTask(task) {
            dispatch(updateTaskAC(task));
        },
        updateTodolist(todolist) {
            dispatch(updateTodolistAC(todolist));
        }
    }
}

const ConnectedTodolist = connect(null, mapDispatchToProps)(TodoList);

export default ConnectedTodolist;
