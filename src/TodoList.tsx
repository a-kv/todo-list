import * as React from 'react';
import './App.css';
import TodoListTasks from "./Components/TodoListTasks/TodoListTasks";
import TodoListFooter from "./Components/Footer/TodolistFooter";
import TodoListTitle from "./Components/Header/TodoListTitle";
import AddNewItemForm from "./Components/Header/AddNewItemForm";
import {connect} from "react-redux";
import {addTask, deleteTask, deleteTodolist, setTasks, ThunkDispatchType, updateTask, updateTodolist} from "./reducer";
import {TaskType} from "./types/entities";
import {AppStateType} from "./store";

type MapDispatchToPropsType = {
    addTask: (newText: string, todolistId: string) => void
    setTasks: (todolistId: string) => void
    deleteTodolist: (todolistId: string) => void
    updateTask: (todolistId: string, taskId: string, newTask: TaskType) => void
    updateTodolist: (title: string, todolistId: string) => void
    deleteTask: (taskId: string, todolistId: string) => void

}
type OwnPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
}
type StateType = {
    filterValue: string //will change
}

type PropsType = MapDispatchToPropsType & OwnPropsType

class TodoList extends React.Component<PropsType, StateType> {
    nextTaskId = 0;

    state: StateType = {
        filterValue: "All"
    };

    // _restoreStore = () => {
    //     let state = {
    //         tasks: [],
    //         filterValue: "All"
    //     };
    //     let stateAsString = localStorage.getItem('our-state-' + this.props.id);
    //     if (stateAsString) {
    //         state = JSON.parse(stateAsString);
    //     }
    //
    //     this.setState(state, () => {
    //         this.state.tasks.forEach(t => {
    //             if (t.id >= this.nextTaskId) {
    //                 this.nextTaskId = t.id + 1
    //             }
    //         })
    //     });
    // }

    restoreState = () => { // получаем таски с сервака
        this.props.setTasks(this.props.id);
    }

    componentDidMount() {
        this.restoreState(); // удобно запускать сет таймауты и тд
    }

    changeTask = (newTask: TaskType): void => {
        this.props.updateTask(this.props.id, this.props.id, newTask);
    } // second param


    changeStatus = (newTask: TaskType, status: boolean): void => {
        this.changeTask({...newTask, status: status ? 2 : 0})
    }

    changeTitle = (newTask: TaskType, title: string): void => {
        this.changeTask({...newTask, title: title})

    }
    changePriority = (newTask: TaskType, priority: string): void => {

        this.changeTask({...newTask, priority: priority === 'high' ? 2 : priority === 'med' ? 1 : 0})

    }
    deleteTodoList = () => {
                    this.props.deleteTodolist(this.props.id);
    }

    deleteTask = (taskId: string, todolistId: string): void => {
        this.props.deleteTask(taskId, this.props.id);
    }


    addTask = (newText: string) => {
        this.props.addTask(newText, this.props.id);
    };


    changeFilter = (newFilterValue: string) => {
        this.setState({
            filterValue: newFilterValue
        });
    }
    changeTitleTodolist = (title: string) => {
        debugger
        this.props.updateTodolist(title, this.props.id)
    }

    render = () => {
        let {tasks = []} = this.props;  //деструктуризация , вытаскиваем таски из пропсов
        let filteredTasks = tasks.filter(t => {
            switch (this.state.filterValue) { //???
                case 'Active':
                    return t.status === 0;
                case 'Completed':
                    return t.status === 2;
                default:
                    return true;
            }
        })

        return (
            <div>
                <TodoListTitle  title={this.props.title} changeTitleTodolist={this.changeTitleTodolist} id={this.props.id}
                               deleteTodoList={this.deleteTodoList}/>
                <AddNewItemForm addItem={this.addTask} id={this.props.id}/>
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

const mapDispatchToProps = (dispatch: ThunkDispatchType): MapDispatchToPropsType => {
    return {
        addTask(newText, todolistId) {
            dispatch(addTask(newText, todolistId));
        },
        setTasks(todolistId) {
            dispatch(setTasks(todolistId));
        },
        deleteTodolist: (todolistId) => {
            const action = deleteTodolist(todolistId);
            dispatch(action)
        },
        deleteTask: (taskId, todolistId) => {
            const action = deleteTask(taskId, todolistId);
            dispatch(action)
        },
        updateTask(todolistId, taskId, newTask) {
            dispatch(updateTask(todolistId, taskId, newTask));
        },
        updateTodolist(title, todolistId) {
            dispatch(updateTodolist(title, todolistId));
        }
    }

}

const ConnectedTodolist = connect<{}, MapDispatchToPropsType, {}, AppStateType>(null, mapDispatchToProps)(TodoList);

export default ConnectedTodolist;
