import React, { useState } from 'react'
const INITIAL_NOTES = [
    { id: 1, text: "Task 01" },
    { id: 2, text: "Task 02" },
    { id: 3, text: "Task 03" },
    { id: 4, text: "Task 04" },
    { id: 5, text: "Task 05" },
]
function DragDrop() {
    const [notes, setNotes] = useState(INITIAL_NOTES)
  return (
    <div className="flex flex-col w-full justify-center items-center">
        <h4>Drag & Drop Container (in complete) </h4>
        <div className='mt-5 grid gap-6 md:grid-cols-2 lg:grid-cols-4 w-full max-w-screen-lg px-4'>
            {notes.map((note, i) => (
                <div
                    key={i}
                    className="cursor-move transition ease-in-out delay-150 bg-gray-100 hover:-translate-y-1 hover:scale-105 hover:bg-slate-300 duration-300 p-6 rounded-lg shadow-lg flex flex-col items-center"
                >
                    <div className="min-w-full flex flex-col items-center justify-center p-4 rounded-lg bg-gray-100 shadow-md">
                        <h5>{note.text}</h5>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default DragDrop