import axios from 'axios';
import {TaskType, TodoType} from "../types/entities";

type CommonApiType<T> = {
    resultCode: 0 | 1 | 100
    messages: Array<TaskType>
    data: T
}
export type GetTodolistApiType = Array<TodoType>

export type GetTasksApiType = {
    error: null | string
    items: Array<TaskType>
    totalCount: number
}


export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists',
    headers: {"API-KEY": "d13010db-d825-4b89-b5a1-3acdd313b6bb"}

})

export const api = {
    createTodolist(title: string) {
        return instance.post<CommonApiType<{ item: TodoType }>>('/', {title: title}).then(res => res.data) //ok
    },
    getTodolists() {
        return instance.get<GetTodolistApiType>('/').then(res => res.data)//ok
    },
    createTask(newText: string, todolistId: string) {
        return instance.post<CommonApiType<{ item: TaskType }>>(`/${todolistId}/tasks`, {title: newText}).then(res => res.data)//ok
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksApiType>(`/${todolistId}/tasks`).then(res => res.data)//ok
    },
    deleteTask(taskId: string, todolistId: string) {
        return instance.delete<CommonApiType<{}>>(`/${todolistId}`).then(res => res.data)//ok
    },

    deleteTodoList(todolistId: string) {
        return instance.delete<CommonApiType<{}>>(`/${todolistId}`).then(res => res.data)//ok
    },

    updateTask(todolistId: string, taskId: string, newTask: TaskType) {
        return instance.put<CommonApiType<{ item: TaskType }>>(`${todolistId}/tasks/${newTask.id}`, newTask).then(res => res.data)
    },
    updataTodolist(title: string, todolistId: string) {
        return instance.put(`/${todolistId}`, {title: title}).then(res => res.data)//ok
    }

}


