import { AuthPage } from "./Pages/Auth/AuthPage.jsx"
import { NotFoundPage } from "./Pages/NotFoundPage/NotFoundPage.jsx"    
import { TasksContents } from "./components/TasksContents.jsx"

export const routes = [
    {path: '/', element: <AuthPage />},
    {path: '/tasks/*', element: <TasksContents/>},
    {path: '*', element: <NotFoundPage/>}
]