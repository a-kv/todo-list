import React from 'react';

class TodoListTask extends React.Component {

    onIsDoneChanged = (e) =>{
        this.props.changeStatus(this.props.task, e.currentTarget.checked);
    }

    render = () => {
        return (
            <div className="todoList-task">
                <input type="checkbox"
                       checked={this.props.task.isDone}
                       onChange={this.onIsDoneChanged}
                />
                <span>{this.props.task.title}</span> - priority:
                <span>{this.props.task.priority}</span>
            </div>
        );
    }
}
export default TodoListTask;

// this.props={}
// this.props.title = "CSS"
// this.props.isDone = true