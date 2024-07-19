import axios from "axios"

const apiClient = axios.create({
    baseURL: 'http://localhost:2656/almacenadora/v1',
    timeout: 1000
})

apiClient.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token')
        if (token) config.headers.Authorization = token
        return config
    },
    err => Promise.reject(err)
)


export const registerRequest = async (user) => {
    try {
        return await apiClient.post('/auth/register', user)
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}

export const loginRequest = async (user) => {
    try {
        return await apiClient.post('/auth/login', user)
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}

export const getTasksRequest = async () => {
    try {
        return await apiClient.get('/task/getTasks')
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}

export const saveTaskRequest = async (task) => {
    try {
        return await apiClient.post('/task/save', task)
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}

export const updateTaskRequest = async (id, task) => {
    try {
        return await apiClient.put(`/task/update/${id}`, task)
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}

export const deleteTaskRequest = async (id) => {
    try {
        return await apiClient.delete(`/task/deleteTask/${id}`);
    } catch (err) {
        return {
            error: true,
            err
        };
    }
};