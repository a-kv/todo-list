import React from 'react';
import './App.css';
import TodoListTasks from "./Components/TodoListTasks/TodoListTasks";
import TodoListFooter from "./Components/Footer/Footer";
import TodoListTitle from "./Components/Header/TodoListTitle";
import AddNewItemForm from "./Components/Header/AddNewItemForm";
import {connect} from "react-redux";

class TodoList extends React.Component {

    constructor(props) {
        super(props);
        this.addTask = this.addTask.bind(this)
    }

    nextTaskId = 0;

    state = {
        tasks: [
            // {id: 0, title: "JS", isDone: true, priority: "low"},
            // {id: 1, title: "CSS", isDone: true, priority: "low"},
            // {id: 2, title: "jQuery", isDone: false, priority: "high"},
            // {id: 3, title: "ReactJs", isDone: false, priority: "med"}
        ],
        filterValue: "All"
    };

    saveState = () => {
        let stateAsString = JSON.stringify(this.state)
        localStorage.setItem('our-state-' + this.props.id, stateAsString)
    }
    restoreStore = () => {
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

    componentDidMount() {
        this.restoreStore(); // удобно запускать сет таймауты и тд
    }

    changeTask = (taskId, obj) => {
        let newTasks = this.state.tasks.map(t => {
            if (t.id === taskId) {
                return {...t, ...obj};
            }
            return t;

        });
        this.props.changeTask(taskId, obj, this.props.id);

        this.setState({
            tasks: newTasks
        }, this.saveState)
    }

    changeStatus = (taskId, isDone) => {
        this.changeTask(taskId, {isDone: isDone})
    }

    changeTitle = (taskId, title) => {
        this.changeTask(taskId, {title: title})

    }
    changePriority = (taskId, priority) => {
        this.changeTask(taskId, {priority: priority})

    }
    deleteTask = (taskId) => {
        this.props.deleteTask(taskId, this.props.id);
        // this.setState({tasks: this.state.tasks.filter(t => t.id !== taskId)}, this.saveState);
    };
    deleteTodoList = (todoListId) => {
        this.props.deleteTodolist(this.props.id);
        // this.setState({todolists: this.state.todolists.filter(t => t.id !== todoListId)}, this.saveState);
    };

    addTask = (newTitle) => {
        let newTask = {
            id: this.nextTaskId,
            title: newTitle,
            isDone: false,
            priority: 'low'
        };
        this.nextTaskId++;
        // let newTasks = [...this.state.tasks, newTask];
        this.props.addTask(newTask, this.props.id);
        // this.setState({tasks: newTasks}, this.saveState);
    };

    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        });
    }


    render = () => {
        let filteredTasks = this.props.tasks.filter(t => {
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
            <div className="App">
                <div className="todoList">
                    <TodoListTitle id={this.props.id} deleteTodoList={this.deleteTodoList}
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
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addTask: (newTask, todolistId) => {
            const action = {
                type: 'ADD_TASK',
                newTask,
                todolistId
            };
            dispatch(action);
        },
        changeTask: (taskId, obj, todolistId) => {
            const action = {type: 'UPDATE_TASK', taskId, obj, todolistId};
            dispatch(action);
        },
        deleteTask: (taskId, todolistId) => {
            const action = {type: 'DELETE_TASK', taskId, todolistId};
            dispatch(action);
        },
        deleteTodolist: (todolistId) => {
            const action = {
                type: 'DELETE_TODOLIST',
                todolistId
            };
            dispatch(action)
        }

    }
}

const ConnectedTodolist = connect(null, mapDispatchToProps)(TodoList);

export default ConnectedTodolist;
