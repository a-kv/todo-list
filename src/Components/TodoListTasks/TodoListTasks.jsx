
import React from 'react';
import TodoListTask from "./TodoListTask/TodoListTask";


class TodoListTasks extends React.Component {

    render = () => {
           let myFn = (t) =>{
            return  <TodoListTask
                    task={t}
                    changeStatus={this.props.changeStatus}/>
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

