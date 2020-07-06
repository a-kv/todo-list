import * as React from 'react';
import TodoListTask from "./TodoListTask/TodoListTask";
import {TaskType, TodoType} from "../../types/entities";

type OwnPropsType = {
    deleteTask: (taskId: string, todolistId: string) => void
    changeTitle: (newTask: TaskType, title: string) => void
    changeStatus: (newTask: TaskType, status: boolean) => void
    tasks: Array<TaskType>
    changePriorityValue: (newTask: TaskType, priority: string) => void
    priority?: string
}
class TodoListTasks extends React.Component<OwnPropsType> {

    render = () => {
        let myFn = (t: TaskType) => {
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

