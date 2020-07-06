import * as React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddNewItemForm from "./Components/Header/AddNewItemForm";
import {connect} from "react-redux";
import {addTodolist, setTodolists, ThunkDispatchType} from "./reducer";
import {AppStateType} from "./store";
import {TodoType} from "./types/entities";


type MapStateToPropsType = {
    todolists: Array<TodoType>
}
type MapDispatchToPropsType = {
    addTodolist: (title: string) => void
    setTodolist: () => void
}

type PropsType = MapStateToPropsType & MapDispatchToPropsType

class App extends React.Component<PropsType> {



    restoreState = (): void => {
        this.props.setTodolist()
    }

    componentDidMount() {
        this.restoreState();
    }

    addTodoList = (title: string): void => {
        this.props.addTodolist(title);
    }

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

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        todolists: state.todo.todolists

    }
}
const mapDispatchToProps = (dispatch: ThunkDispatchType): MapDispatchToPropsType => {
    return {
        addTodolist: (title) => {
            dispatch(addTodolist(title));
        },
        setTodolist: () => {
            dispatch(setTodolists());
        }
    }
}

const ConnectedApp = connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, mapDispatchToProps)(App);
export default ConnectedApp;
