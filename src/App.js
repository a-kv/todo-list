import React from 'react';
import './App.css';
import TodoListHeader from "./Components/Header/Header.jsx";
import TodoListTasks from "./Components/TodoListTasks/TodoListTasks";
import TodoListFooter from "./Components/Footer/Footer";

class App extends React.Component {

     tasks = [
        {title: "JS", isDone: true, priority: "low"},
        {title: "CSS", isDone: true, priority: "low"},
        {title: "jQuery", isDone: false, priority: "high"},
        {title: "ReactJs", isDone: false, priority: "med"},
        // {title: "ReactJs", isDone: true},
         // {title: "JS", isDone: false},
         // {title: "CSS", isDone: false},
         // {title: "jQuery", isDone: false},
    ];
   filterValue = "All";
    render = () => {


        return (
            <div className="App">
                <div className="todoList">
                    <TodoListHeader/>
                    <TodoListTasks tasks={this.tasks}/>
                    <TodoListFooter filterValue={this.filterValue}/>
                </div>
            </div>
        );
    }
}

export default App;

