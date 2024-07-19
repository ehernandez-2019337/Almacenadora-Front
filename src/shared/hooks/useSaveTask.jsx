import { useState } from "react"
import { saveTaskRequest } from "../../services/api"
import toast from "react-hot-toast"

export const useSaveTask = () => {
    const [ isLoading, setIsLoading] = useState(false)

    const save = async(name, description) => {
        setIsLoading(true)
        const task = {
            name, description
        }
        const response = await saveTaskRequest(task)
        setIsLoading(false)
        if(response.error){
          return toast.error(
              response?.err?.response?.data?.messagge || 
              'Error guardando tarea'
          )
        }
        toast.success('Tarea guardada correctamente')
    }
    return {
        save, 
        isLoading
    }

}