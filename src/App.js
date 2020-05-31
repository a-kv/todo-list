import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddNewItemForm from "./Components/Header/AddNewItemForm";
import {saveState, restoreStore} from "./localStorageTodoList";
import {connect} from "react-redux";

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
        saveState('todolists', this.props)
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
            title: newTodoListName,
            tasks: []
        }
        this.nextTodoList++;
        this.props.createTodolist(newTodoList);
    }
    //     this.nextTodoList++;
    //     this.setState({todolists: [...this.state.todolists, newTodoList]},
    //         this.saveStateTodolists);
    // };

    render = () => {
        let todolists = this.props
            .todolists.map(tl => {
            return <TodoList key={tl.id} id={tl.id} title={tl.title} tasks={tl.tasks}/>
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

const mapStateToProps = (state) => {
    return {
        todolists: state.todolists
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        createTodolist: (newTodolist) => {
            const action = {
                type: 'ADD_TODOLIST',
                newTodolist
            };
            dispatch(action)
        },
    }
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default ConnectedApp;
