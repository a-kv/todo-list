import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddNewItemForm from "./Components/Header/AddNewItemForm";
import {saveState, restoreStore} from "./localStorageTodoList";

class App extends React.Component {

    state = {
        todolists: [
            // {id: 1, title: 'js'},
            // {id: 2, title: 'redux'},
            // {id: 3, title: 'TS'},
            // {id: 4, title: 'react'}
        ]

    }
    nextTodoList = 0;

    saveStateTodolists = () => {
        saveState('todolists', this.state)
    }
    restoreStoreTodolists = () => {
        let newState = restoreStore('todolists', this.state)
        this.setState(newState, () => {
            this.state.todolists.forEach(t => {
                if (t.id >= this.nextTodoList) {
                    this.nextTodoList = t.id + 1
                }
            })
        });
    }
    componentDidMount() {
        this.restoreStoreTodolists();
    }
    addTodoList = (newTodoListName) => {
        let newTodoList = {
            id: this.nextTodoList,
            title: newTodoListName
        };
        this.nextTodoList++;
        this.setState({todolists: [...this.state.todolists, newTodoList]},
            this.saveStateTodolists);
    };
    deleteTodoList = (todoListId) => {
        this.setState({todolists: this.state.todolists.filter(t => t.id !== todoListId)}, this.saveState);
    };


    render = () => {
        let todolists = this.state.todolists.map(tl => {
            return <TodoList deleteTodoList={this.deleteTodoList} key={tl.id} id={tl.id} title={tl.title}/>
        });

        return (
            <>
                    <AddNewItemForm addItem={this.addTodoList}/>
                <div className="App">
                    {todolists}
                </div>
            </>

        );
    };
}

export default App;
