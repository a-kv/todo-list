import React from 'react';
import style from './TodoListTask.module.css';
class TodoListTask extends React.Component {
    state = {
        isEditMode: false
    }

    activatedEditMode = () => {
        this.setState({isEditMode: true})
    };
    deactivatedEditMode = () => {
        this.setState({isEditMode: false})
    };
    onIsDoneChanged = (e) => {
        this.props.changeStatus(this.props.task.id, e.currentTarget.checked);
    };
    onTitleChanged = (e) => {
        this.props.changeTitle(this.props.task.id, e.currentTarget.value)
    }
    onchangePriorityValue = (e) => {
        this.props.changePriorityValue(this.props.task.id, e.currentTarget.value)
    };

    render = () => {
        let isDoneClasses = this.props.task.isDone ? "todoList-task done" : "todoList-task";
        return (
            <div className={isDoneClasses}>
                <input type="checkbox"
                       checked={this.props.task.isDone}
                       onChange={this.onIsDoneChanged}
                />
                {this.state.isEditMode
                    ?<input onChange={this.onTitleChanged}
                            value={this.props.task.title}
                            autoFocus={true}
                            onBlur={this.deactivatedEditMode}/>
                    : <span onClick={this.activatedEditMode}>{this.props.task.id}: {this.props.task.title} </span>
                }
                <span>- priority:
                    <select  onClick={this.onchangePriorityValue}>
                    <option>low</option>
                    <option>med</option>
                    <option>high</option>
                </select>{this.props.task.priority}</span>
                <button className={style.deleteTaskButton} onClick={() => this.props.deleteTask(this.props.id)}>X</button>
            </div>
        );
    }
}

export default TodoListTask;

