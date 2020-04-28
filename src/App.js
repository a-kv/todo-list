import React from 'react';
import './App.css';
import TodoListHeader from "./Components/Header/Header.jsx";
import TodoListTasks from "./Components/TodoListTasks/TodoListTasks";
import TodoListFooter from "./Components/Footer/Footer";

class App extends React.Component {

    constructor(props) {
        super(props);
        // this.newTaskTitleRef = React.createRef();

    }

    state = {
        tasks: [
            {title: "JS", isDone: true, priority: "low"},
            {title: "CSS", isDone: true, priority: "low"},
            {title: "jQuery", isDone: false, priority: "high"},
            {title: "ReactJs", isDone: false, priority: "med"},
            // {title: "ReactJs", isDone: true},
            // {title: "JS", isDone: false},
            // {title: "CSS", isDone: false},
            // {title: "jQuery", isDone: false},
        ],
        filterValue: "All"
    };
    changeStatus = (task, isDone) => {
        let newTasks = this.state.tasks.map(t => {
            if (t != task) {
                return t;
            }
                 return {...t, isDone: isDone};

        });
        this.setState({
            tasks: newTasks
        })
    }

    addTask = (newTitle) => {
        // let newTitle = this.newTaskTitleRef.current.value
        // this.newTaskTitleRef.current.value = ''
        let newTask = {
            title: newTitle, isDone: false, priority: "low"
        };
        let newTasks = [...this.state.tasks, newTask];
        this.setState({tasks: newTasks});
    };

    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        });
    }

    render = () => {

        let filteredTasks = this.state.tasks.filter(t => {
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
                    <TodoListHeader constr={this.newTaskTitleRef} addTask={this.addTask}/>
                    {/*<h3 className="todoList-header__title">What to Learn</h3>*/}
                    {/*<div className="todoList-newTaskForm">*/}
                    {/*<input ref={this.newTaskTitleRef} type="text" placeholder="New task name"/>*/}
                    {/*<button onClick={this.onAddTaskClick}>Add</button>*/}
                    <TodoListTasks changeStatus={this.changeStatus} tasks={filteredTasks}/>
                    <TodoListFooter changeFilter={this.changeFilter} filterValue={this.state.filterValue}/>
                </div>
            </div>


        );

    }
}

export default App;

// setTimeout(()=> {
//     let newTask = {
//         title: "jQuery", isDone: false, priority: "med"
//     };
//     let newTasks =[...this.state.tasks, newTask];
//     this.setState({tasks: newTasks});
//
// }, 2000);

// setTimeout(()=> {
//     let newTask = {
//         title: "jQuery", isDone: false, priority: "med"
//     };
//     let newTasks =[...this.state.tasks, newTask];
//     this.setState({tasks: newTasks});
//
// }, 2000);