import { useState } from "react"
import toast from "react-hot-toast"
import { updateTaskRequest } from "../../services/api"

export const useUpdateTask = () => {
    const [updatedTask, setUpdatedTask] = useState(null)

    const updateTask = async(id, task)=>{
        const response = await updateTaskRequest(id, task)
        if(response.error){
            toast.error(
                response?.err?.response?.data?.message ||
                'Error al actualizar la tarea'
            )
        }
        setUpdatedTask(response.data)
        toast.success('Actualizado correctamente')
    }
  return {
    updatedTask,
    isFetching: !updateTask,
    updateTask
  }
}
