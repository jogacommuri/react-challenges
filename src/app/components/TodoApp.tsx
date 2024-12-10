import { FiCheckSquare,FiTrash2,FiPlusSquare } from "react-icons/fi";
import React, { useState } from 'react'
let id = 0;
const INITIAL_TASKS = [
    { id: id++, label: 'Walk the dog' , status:"Pending"},
    { id: id++, label: 'Water the plants',status:"Pending" },
    { id: id++, label: 'Wash the dishes',status:"Pending" },
  ];
function TodoApp() {
    const [tasks, setTasks] = useState(INITIAL_TASKS)
    const [newTask, setNewTask] = useState('');

    const handleAddNewTask = () =>{
        console.log("NEW TASK")
        console.log(newTask)
        newTask.length > 0 ?
        setTasks(tasks.concat({
            id:id++, label: newTask.trim()
        })): console.log("aler the user to add new task with atleast 1 character")
        setNewTask('')
    }
    const handleDeleteTask = (id) =>{
        console.log("To delete =>", id)
        setTasks(tasks.filter((task) => task.id !== id))
        console.log(tasks)
    }
    const handleCompleteTask = (id) =>{
        console.log("To mark Complete =>", id)
        const updatedTasks = tasks.map((task) => {
            if (task.id == id ) {
                return {...task, status: 'Completed'}
            }
            return task;
        })
         setTasks(updatedTasks)
        console.log("Temp ", updatedTasks)
    }
  return (
    <div className='flex flex-col w-full justify-between items-center'>
        <h4>TodoApp</h4>
        <div className='space-x-4 p-3'>
            <input 
            type="text" 
            placeholder='Add new task'
            aria-label='Add new task'
            className='rounded-md p-2 '
            value={newTask}
            
            onChange={(event) => {setNewTask(event.target.value)}}
            />
        
            <button onClick={handleAddNewTask} className=' border rounded-md border-green-400 bg-green-500 text-white p-2'>
            <FiPlusSquare / >
            </button>
        </div>
        <div className='flex p-2'>
            <ul className='list-disc'>
            {tasks?.map(({id, label, status}) =>(
                <li key={id} >
                    <div className='flex gap-4 justify-between items-center m-2 p-2'>
                        <span className="flex-1 text-md font-small text-gray-500 whitespace-normal max-w-xs">{label}</span>
                        <button 
                        className=' border rounded-md border-none bg-red-500 text-white p-1'
                        onClick={() => handleDeleteTask(id)}
                        >
                            <FiTrash2 />
                        </button>
                         <button 
                        className=' border rounded-md border-none bg-green-500 text-white p-1 disabled:bg-gray-400'
                        onClick={()=> handleCompleteTask(id)}
                        disabled={status === 'Completed'}
                        >
                           <FiCheckSquare />
                        </button>
                    </div>
                    
                </li>
            ))}
            </ul>
        </div>
    </div>
    
  )
}

export default TodoApp