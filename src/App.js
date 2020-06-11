import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddNewItemForm from "./Components/Header/AddNewItemForm";
import {saveState, restoreStore} from "./localStorageTodoList";
import {connect} from "react-redux";
import {addTodolistAC, setTodolistsAC} from "./reducer";
import axios from 'axios';

class App extends React.Component {

    state = {
        todolists: []

    }
    nextTodoList = 0;

    saveStateTodolists = () => {
        saveState('todoLists', this.props)
    }

    restoreState = () => {
        debugger
        axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists',
            {withCredentials: true}) //разрешаются использаваться кросс-доменные запросы и куки
            .then(res => {
                debugger
                this.props.setTodolists(res.data)
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
        debugger
        axios.post("https://social-network.samuraijs.com/api/1.1/todo-lists", //endpoint
            {title: title}, //body
            {
                withCredentials: true,
                headers: {"API-KEY": "d13010db-d825-4b89-b5a1-3acdd313b6bb"}
            })
            .then(res => {
                debugger
                let todolist = res.data.data.item;
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
