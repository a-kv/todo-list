import React from 'react';
import TodoListTask from "./TodoListTask/TodoListTask";


class TodoListTasks extends React.Component {

    render = () => {
        let myFn = (t) => {
            return <TodoListTask
                key={t.id}
                id={t.id}
                task={t}
                changeStatus={this.props.changeStatus}
                changeTitle={this.props.changeTitle}
                deleteTask={this.props.deleteTask}
                changePriorityValue={this.props.changePriorityValue}
                priority={this.props.priority}

            />
        }
        let tasksElements = this.props.tasks.map(myFn);
        return (
            <div>
                {tasksElements}
            </div>
        );
    }
}

export default TodoListTasks;

