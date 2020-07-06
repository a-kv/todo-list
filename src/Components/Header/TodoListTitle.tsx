import * as React from 'react';
import {ChangeEvent} from "react";


type OwnPropsType = {
    id: string
    changeTitleTodolist: (title: string) => void
    deleteTodoList: (taskId: string) => void
    title: string

}
type StatePropsType = { //???
    // isEditMode: boolean
    // title: string
}
class TodoListTitle extends React.Component<StatePropsType & OwnPropsType> {

    state = {
        isEditMode: false,
        title: this.props.title
    }

    activatedEditMode = () => {
        this.setState({isEditMode: true})
    };

    deactivatedEditMode = () => {
        this.setState({isEditMode: false});
        this.props.changeTitleTodolist(this.state.title)
    };
    onTitleChanged = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({title: e.currentTarget.value})
    }


    render = () => {

        return (
            <div className="todoList-header">
                <h3 className="todoList-header__title">
                    {this.state.isEditMode
                        ? <input onChange={this.onTitleChanged}
                                 value={this.state.title}
                                 autoFocus={true}
                                 onBlur={this.deactivatedEditMode}/>
                        : <span onClick={this.activatedEditMode}>{this.props.title} </span>
                    }
                    <button onClick={() => this.props.deleteTodoList(this.props.id)}>X</button>
                </h3>

            </div>
        );
    }
}

export default TodoListTitle;
