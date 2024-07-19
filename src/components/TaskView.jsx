import React, { useState, useEffect, useRef } from 'react';
import { useSaveTask } from '../shared/hooks/useSaveTask';
import { useUpdateTask } from '../shared/hooks/useUpdateTask';
import { useDeleteTask } from '../shared/hooks/useDeleteTask';
import LogoCutest from '../assets/img/The_Cutest__1_-removebg-preview.png';
import './TaskStyle.css';
import { useLogout } from '../shared/hooks/useLogout';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
    return `${formattedDay}/${formattedMonth}/${year}`;
};

export const TaskView = ({ tasks, getTasks }) => {
    const { save } = useSaveTask();
    const { updateTask } = useUpdateTask();
    const { deleteTask } = useDeleteTask();
    const formRef = useRef(null);

    const [formData, setFormData] = useState({
        nameT: '',
        description: ''
    });
    const [selectedTask, setSelectedTask] = useState(null);

    useEffect(() => {
        if (selectedTask) {
            setFormData({
                nameT: selectedTask.name,
                description: selectedTask.description
            });
            formRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [selectedTask]);

    const handleChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }));
    };

    const handleSaveOrUpdate = async () => {
        try {
            const taskData = {
                name: formData.nameT,
                description: formData.description
            };
            if (selectedTask) {
                await updateTask(selectedTask._id, taskData);
                const updatedTasks = tasks.map(task =>
                    task._id === selectedTask._id ? { ...task, ...taskData } : task
                );
                getTasks(updatedTasks);
            } else {
                await save(formData.nameT, formData.description);
                getTasks();
            }
            setFormData({ nameT: '', description: '' });
            setSelectedTask(null);
        } catch (error) {
            console.error('Error al guardar o actualizar la tarea:', error);
        }
    };

    const handleEditTask = (task) => {
        setSelectedTask(task);
    };

    const handleCompleteTask = async (task) => {
        try {
            await updateTask(task._id, { state: 'TERMINADA' });
            getTasks();
        } catch (error) {
            console.error('Error al marcar la tarea como terminada:', error);
        }
    };

    const handleIncompleteTask = async (task) => {
        try {
            await updateTask(task._id, { state: 'PENDIENTE' });
            getTasks();
        } catch (error) {
            console.error('Error al marcar la tarea como pendiente:', error);
        }
    };

    const handleEliminateTask = async (task) => {
        try {
            await deleteTask(task._id);
            const updatedTasks = tasks.filter(t => t._id !== task._id);
            getTasks(updatedTasks);
        } catch (error) {
            console.error('Error al eliminar la tarea:', error);
        }
    };

    const handleCancel = () => {
        setFormData({ nameT: '', description: '' });
        setSelectedTask(null);
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light mb-4">
                <div className="container-fluid">
                    <a className="navbar-brand">
                        <img src={LogoCutest} alt="The Cutest" width="80%" height="75" />
                    </a>
                    <div className="navbar-nav ms-auto flex-row">
                        <a className="nav-link fw-bold fs-5" style={{ cursor: 'pointer' }} onClick={() => useLogout()}>LogOut</a>
                    </div>
                </div>
            </nav>

            <div className='container mt-5'>
                <div className='row justify-content-center'>
                    <div className='col-lg-6'>
                        <div ref={formRef} className='border border-dark-subtle border-2 p-4 rounded'>
                            <h4 className='text-center mb-4'>Agrega tu tarea</h4>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Agrega tu tarea..."
                                    aria-label="Tarea"
                                    name="nameT"
                                    value={formData.nameT}
                                    onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <textarea
                                    type="text"
                                    className="form-control"
                                    placeholder="Agrega su descripción...."
                                    aria-label="Descripción"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange} />
                            </div>
                            <div className="d-flex align-items-center justify-content-center">
                                <button type="button" className="btn btn-success me-2" onClick={handleSaveOrUpdate}>
                                    {selectedTask ? 'Editar' : 'Guardar'}
                                </button>
                                <button type="button" className="btn btn-danger" onClick={handleCancel}>Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row justify-content-center m-5">
                    <div className="col-12 mb-3 d-flex align-items-center justify-content-center">
                        <h2>Mis tareas</h2>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-lg-5">
                            <h4 className="mb-4 text-center">Pendientes 📕</h4>
                            <div className="scroll-container">
                                <div className="row">
                                    {tasks.filter(task => task.state === 'PENDIENTE').map(task => (
                                        <div className="col-md-6" key={task._id}>
                                            <div className="card m-3">
                                                <div className="card-body">
                                                    <div className="d-flex justify-content-between">
                                                        <h5 className="card-title">{task.name}</h5>
                                                        <svg onClick={() => handleEliminateTask(task)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16" style={{ color: 'red', cursor: 'pointer' }}>
                                                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                                                        </svg>
                                                    </div>
                                                    <h6 className="card-subtitle mb-2">{task.description}</h6>
                                                    <p className="card-text">Creada: {formatDate(task.startDate)}</p>
                                                    <p className="card-text">{task.user.name} {task.user.surname}</p>
                                                    <div className="d-flex justify-content-end">
                                                        <button type="button" className="btn btn-warning btn-sm me-2" onClick={() => handleEditTask(task)}>Editar</button>
                                                        <button type="button" className="btn btn-success btn-sm" onClick={() => handleCompleteTask(task)}>Terminada</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-1 d-flex align-items-center separator">
                            <div className="vr"></div>
                        </div>
                        <div className="col-lg-5">
                            <h4 className="mb-4 text-center">Terminadas ✅</h4>
                            <div className="scroll-container">
                                <div className="row">
                                    {tasks.filter(task => task.state === 'TERMINADA').map(task => (
                                        <div className="col-md-6" key={task._id}>
                                            <div className="card m-3">
                                                <div className="card-body">
                                                    <div className="d-flex justify-content-between">
                                                        <h5 className="card-title">{task.name}</h5>
                                                        <svg onClick={() => handleEliminateTask(task)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16" style={{ color: 'red', cursor: 'pointer' }}>
                                                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                                                        </svg>
                                                    </div>
                                                    <h6 className="card-subtitle mb-2">{task.description}</h6>
                                                    <p className="card-text">Creada: {formatDate(task.startDate)}</p>
                                                    <p className="card-text">Completada: {formatDate(task.endDate)}</p>
                                                    <p className="card-text">{task.user.name} {task.user.surname}</p>
                                                    <div className="d-flex justify-content-end">
                                                        <button type="button" className="btn btn-danger btn-sm" onClick={() => handleIncompleteTask(task)}>Pendiente</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
