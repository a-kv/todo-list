import React from 'react';
class TodoListTitle extends React.Component {
    state = {
        isEditMode: false,

    }

    activatedEditMode = () => {
        this.setState({isEditMode: true})
    };
    deactivatedEditMode = () => {
        this.setState({isEditMode: false});
        this.props.changeTitleTodolist(this.state.title)
    };
    onTitleChanged = (e) => {
        this.setState({title: e.currentTarget.value})
    }


    render = (props) => {

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
