import axios from 'axios';

export const instanse = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists',
    headers: {"API-KEY": "d13010db-d825-4b89-b5a1-3acdd313b6bb"}

})

export const api = {
    createTodolist(title) {
       return  instanse.post('/', {title: title}).then(res => res.data) //ok
    },
    getTodolists() {
        return instanse.get('/').then(res => res.data)//ok
    },
    createTask(newText, todolistId){
        return instanse.post(`/${todolistId}/tasks`, {title: newText}).then(res => res.data)//ok
    },
    getTasks(todolistId){
        return instanse.get(`/${todolistId}/tasks`).then(res => res.data)//ok
    },
    deleteTask(taskId, todolistId){
            return instanse.delete(`/${todolistId}`).then(res =>res.data)//ok
    },
    deleteTodoList(todolistId){
            return instanse.delete(`/${todolistId}`, todolistId).then(res =>res.data)//ok
    },
    updateTask(newTask, todolistId){
            return instanse.put(`${todolistId}/tasks/${newTask.id}`, newTask).then(res =>res.data)
    },
    updataTodolist(title, todolistId){
        return instanse.put(`/${todolistId}`, {title: title}).then(res => res.data)//ok
    }

}


