import React from 'react';
import TodoListTasks from "../TodoListTasks/TodoListTasks";
import TodoListFooter from "../Footer/Footer";
import style from './Header.css';

class TodoListHeader extends React.Component {
    state={
        error: true,
        title: ''
    }
    onAddTaskClick = () => {
        let newTitle = this.state.title.trim();
        this.state.title = "";

        if (newTitle === "") {
            this.setState({error: true});
        }else{
            this.setState( {error: false});
            this.props.addTask(newTitle);
        }
    };
    onTitleChange = (e) => {
           this.setState({
               error: false,
               title: e.currentTarget.value
           });
        };
    onKeyPress = (e) => {
        if(e.key === 'Enter'){
            return this.onAddTaskClick()
        }

    }

    render = (props) => {
        let errorClass = this.state.error ? 'error': '';
        return (
            <div className="todoList-header">
                <h3 className="todoList-header__title">What to Learn</h3>
                <div className="todoList-newTaskForm">
                    <input
                        onChange={this.onTitleChange}
                        className={errorClass}
                        // ref={this.newTaskTitleRef}
                        type="text"
                        placeholder="New-task-name"
                        onKeyPress={this.onKeyPress}
                        value={this.state.title}
                    />
                    <button onClick={this.onAddTaskClick}>Add</button>
                </div>
            </div>
        );
    }
}
    export default TodoListHeader;
