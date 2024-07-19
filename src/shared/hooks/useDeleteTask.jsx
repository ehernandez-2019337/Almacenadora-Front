import { useState } from 'react';
import { deleteTaskRequest } from '../../services/api';
import toast from 'react-hot-toast';

export const useDeleteTask = () => {
    const [error, setError] = useState(null);

    const deleteTask = async (taskId) => {
        try {
            const response = await deleteTaskRequest(taskId)
            if (response.error) {
                setError('Error al eliminar la tarea: ' + response.err.message)
                toast.error('Error al eliminar la tarea')
                return false
            } else {
                toast.success('Tarea eliminada correctamente')
                return true
            }
        } catch (error) {
            setError('Error al eliminar la tarea: ' + error.message)
            toast.error('Error al eliminar la tarea')
            return false
        }
    }
    return {
        deleteTask, error, setError
    }
}


