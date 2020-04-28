import React from 'react';
import TodoListTasks from "../TodoListTasks/TodoListTasks";
import TodoListFooter from "../Footer/Footer";

class TodoListHeader extends React.Component {
    constructor(props) {
        super(props);
        this.newTaskTitleRef = React.createRef();
    }
    onAddTaskClick = () => {
        let newTitle = this.newTaskTitleRef.current.value
        this.newTaskTitleRef.current.value = ''
        this.props.addTask(newTitle);
    };


    render = (props) => {
        return (
            <div className="todoList-header">
                <h3 className="todoList-header__title">What to Learn</h3>
                <div className="todoList-newTaskForm">
                    <input ref={this.newTaskTitleRef} type="text" placeholder="New-task-name"/>
                    <button onClick={this.onAddTaskClick}>Add</button>
                </div>
            </div>
        );
    }
}
    export default TodoListHeader;
