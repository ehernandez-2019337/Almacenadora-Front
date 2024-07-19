import { PacmanLoader } from "react-spinners"
import { useGetTasks } from "../shared/hooks/useGetTasks"
import { TaskView } from "./TaskView"
import { useEffect } from "react"
import { Route, Routes } from "react-router-dom"

export const TasksContents = () => {
    const { tasks, getTasks, isFetching } = useGetTasks()

     useEffect(() =>{
        getTasks()
     }, [])
     console.log(tasks)

    if(isFetching){
      return (
        <div className="container d-flex align-items-center justify-content-center vh-100">
          <PacmanLoader color="#ffe733"/>
        </div>
      )
    }
  return (
    <div>
      <Routes>
        <Route path="tasksview" element={<TaskView tasks={tasks} getTasks={getTasks} />}/>
      </Routes>
    </div>
  )
}
