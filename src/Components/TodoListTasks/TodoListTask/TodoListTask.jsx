import React from 'react';

class TodoListTask extends React.Component {
    // this.props={}
    // this.props.title = "CSS"
    // this.props.isDone = true

    render = () => {
        return (
            <div className="todoList-task">
                <input type="checkbox" checked={this.props.isDone} priority={this.props.priority}/>
                <span>{this.props.title}</span> -
                <span>{this.props.priority}</span>
            </div>
        );
    }
}
export default TodoListTask;

