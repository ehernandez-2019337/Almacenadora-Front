import { useState } from "react"
import { getTasksRequest } from "../../services/api"
import toast from "react-hot-toast"


export const useGetTasks = () => {
    const [ tasks, setTasks ] = useState(null)

    const getTasks = async() => {
        const response = await getTasksRequest()
        if(response.error){
            return toast.error(
                response?.err?.response?.data?.messagge || 
                'Error al obtener las tareas'
            )
        }
        setTasks(response.data)
    }

  return {
    tasks, 
    isFetching: !tasks,
    getTasks
  }
}

