import React, { useEffect, useState } from 'react'

const INITIAL_TASKS = [
  { name: 'task 0', stage: 0 },
  { name: 'task 1', stage: 0 },
  { name: 'task 2', stage: 0 },
  { name: 'task 3', stage: 0 },
  { name: 'task 4', stage: 1 },
  { name: 'task 5', stage: 1 },
  { name: 'task 6', stage: 1 },
  { name: 'task 7', stage: 2 },
  { name: 'task 8', stage: 2 },
  { name: 'task 9', stage: 3 },
]
const stages = ['Backlog', 'To Do', 'Ongoing', 'Done'];

function KanbanBoard() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [stagedTasks, setStagedTasks] = useState([])

  const handleMoveToBack = (task) =>{
    console.log("Move back");

    if(task.stage > 0){
      let temp  = (prevTasks) => 
        prevTasks.map((t) => t.name === task.name ? {...t, stage: t.stage-1}: t)

      setTasks(temp);
    }

  }
  const handleMoveToForward = (task) =>{
    console.log("Move front");

    if(task.stage < stages.length -1){
      let temp  = (prevTasks) => 
        prevTasks.map((t) => t.name === task.name ? {...t, stage: t.stage+1}: t)

      setTasks(temp);
    }
  }
  useEffect(() =>{
    const groupedTask = Array(stages.length).fill().map(()=> [])

    tasks.forEach((task) =>{
      groupedTask[task.stage].push(task)
    })
    setStagedTasks(groupedTask)
    //console.log(groupedTask);
    
  },[tasks])
  return (
    <div className="mt-20 flex w-full justify-center items-center">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 w-full max-w-screen-lg px-4">
        {stagedTasks.map((tasks, i) => (
          <div
            key={i}
             
            className="transition ease-in-out delay-150 bg-gray-100 hover:-translate-y-1 hover:scale-105 hover:bg-slate-300 duration-300 p-6 rounded-lg shadow-lg flex flex-col items-center"
          >
            <div className="min-w-full flex flex-col items-center justify-center p-4 rounded-lg bg-gray-100 shadow-md">
              <h4 className="text-gray-800 text-lg font-semibold mb-4">{stages[i]}</h4>
              <ul className="space-y-2 w-full">
                {tasks?.map((task, i) =>(
                  <li className="bg-white p-3 rounded shadow flex items-center justify-between">
                    <span className="text-gray-700 text-sm">{task.name}</span>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleMoveToBack(task)}
                        className={`text-gray-400 hover:text-gray-600 ${
                          task.stage === 0 ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        disabled={task.stage === 0}
                      >
                        ←
                      </button>
                      <button
                        onClick={() => handleMoveToForward(task)}
                        className={`text-gray-400 hover:text-gray-600 ${
                          task.stage === stages.length - 1
                            ? 'opacity-50 cursor-not-allowed'
                            : ''
                        }`}
                        disabled={task.stage === stages.length - 1}
                      >
                        →
                      </button>
                    </div>
                  </li>
                ))}
                
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default KanbanBoard