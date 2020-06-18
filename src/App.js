import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddNewItemForm from "./Components/Header/AddNewItemForm";
import {saveState, restoreStore} from "./localStorageTodoList";
import {connect} from "react-redux";
import {addTodolistAC, setTodolistsAC} from "./reducer";
import axios from 'axios';
import {api} from "./api/api";

class App extends React.Component {

    state = {
        todolists: []

    }
    nextTodoList = 0;

    saveStateTodolists = () => {
        saveState('todoLists', this.props)
    }

    restoreState = () => {
        api.getTodolists().then(res => {
                this.props.setTodolists(res)
            })


        // let newState = restoreStore('todolists', this.state)
        // this.setState(newState, () => {
        //     this.state.todolists.forEach(t => {
        //         if (t.id >= this.nextTodoList) {
        //             this.nextTodoList = t.id + 1
        //         }
        //     })
        // });
    }

    componentDidMount() {
        this.restoreState();
    }


    addTodoList = (title) => {
     api.createTodolist(title)
            .then(res => {
                let todolist = res.data.item;
                this.props.addTodolist(todolist);
            });
    }

    //     let newTodoList = {
    //         id: this.nextTodoList,
    //         title: newTodoListName,
    //         tasks: []
    //     }
    //     this.nextTodoList++;
    //     this.props.createTodolist(newTodoList);
    // }
    //     this.nextTodoList++;
    //     this.setState({todolists: [...this.state.todolists, newTodoList]},
    //         this.saveStateTodolists);
    // };

    render = () => {
        const todolists = this.props.todolists.map(tl => {
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
        setTodolists: (todolists) => {
            dispatch(setTodolistsAC(todolists));
        },
        addTodolist: (newTodolist) => {
            dispatch(addTodolistAC(newTodolist));
        }
    }
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default ConnectedApp;
