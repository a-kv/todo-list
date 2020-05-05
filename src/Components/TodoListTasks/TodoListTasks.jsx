
import React from 'react';
import TodoListTask from "./TodoListTask/TodoListTask";


class TodoListTasks extends React.Component {

    render = () => {
           let myFn = (t) =>{
            return  <TodoListTask
                    // key={this.props.task.id}
                    id={t.id}
                    task={t}
                    changeStatus={this.props.changeStatus}
                    changeTitle={this.props.changeTitle}/>
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

