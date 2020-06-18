import React from 'react';
import style from './TodoListTask.module.css';

class TodoListTask extends React.Component {
    state = {
        isEditMode: false,
        title: this.props.task.title
    }

    activatedEditMode = () => {
        this.setState({isEditMode: true})
    };
    deactivatedEditMode = () => {
        this.setState({isEditMode: false});
        this.props.changeTitle(this.props.task, this.state.title)
    };
    onIsDoneChanged = (e) => {
        this.props.changeStatus(this.props.task, e.currentTarget.checked);
    };
    onTitleChanged = (e) => {
        this.setState({title: e.currentTarget.value})
    }
    onchangePriorityValue = (e) => {
        this.props.changePriorityValue(this.props.task, e.currentTarget.value)
    };

    render = () => {

        let isStatus = this.props.task.status === 2
        let isDoneClasses = isStatus ? "todoList-task done" : "todoList-task";
        let priorityTask = this.props.task.priority  === 2 ? 'high' : this.props.task.priority  === 1 ? 'med' : 'low'
        return (
            <div className={isDoneClasses}>
                <input type="checkbox"
                       checked={isStatus}
                       onChange={this.onIsDoneChanged}
                />
                {this.state.isEditMode
                    ? <input onChange={this.onTitleChanged}
                             value={this.state.title}
                             autoFocus={true}
                             onBlur={this.deactivatedEditMode}/>
                    : <span onClick={this.activatedEditMode}>{this.props.task.id}: {this.props.task.title} </span>
                }
                <span>- priority:
                    <select onClick={this.onchangePriorityValue}                    >
                    <option>low</option>
                    <option>med</option>
                    <option>high</option>
                </select>{priorityTask}</span>
                <button className={style.deleteTaskButton} onClick={() => this.props.deleteTask(this.props.id)}>X
                </button>
            </div>
        );
    }
}

export default TodoListTask;

