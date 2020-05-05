import React from 'react';
import './App.css';
import TodoListHeader from "./Components/Header/Header.jsx";
import TodoListTasks from "./Components/TodoListTasks/TodoListTasks";
import TodoListFooter from "./Components/Footer/Footer";

class App extends React.Component {

    constructor(props) {
        super(props);
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
        localStorage.setItem('state', stateAsString)
    }
    restoreStore = () => {
        let state = {
            tasks: [],
            filterValue: "All"
        };
        let stateAsString = localStorage.getItem('state');
        if(stateAsString){
            state = JSON.parse(stateAsString);
        }

        this.setState(state, () => {
            this.state.tasks.forEach(t => {
                if(t.id >= this.nextTaskId){
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
        this.setState({
            tasks: newTasks}, this.saveState)
    }

    changeStatus = (taskId, isDone) => {
        this.changeTask(taskId, {isDone: isDone})
    }

    changeTitle = (taskId, title) => {
        this.changeTask(taskId, {title: title})

    }

    addTask = (newTitle) => {
        let newTask = {
            id: this.nextTaskId,
            title: newTitle,
            isDone: false, priority: "low"
        };
        this.nextTaskId++;
        let newTasks = [...this.state.tasks, newTask];
        this.setState({tasks: newTasks},this.saveState);
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
                    <TodoListTasks changeTitle={this.changeTitle} id={this.state.tasks.id}
                                   changeStatus={this.changeStatus} tasks={filteredTasks}/>
                    <TodoListFooter changeFilter={this.changeFilter} filterValue={this.state.filterValue}/>
                </div>
            </div>


        );

    }
}

export default App;
