import React from 'react'

export const Pills = ({image, text, onClick}) => {
  return (
    
    <span className='flex h-6 items-center gap-1 bg-blue-400 p-4 border rounded-full cursor-pointer text-white' onClick={onClick}>
        <img src={image} alt={text} className='h-5'/>
        <span> {text} &times;</span>
    </span>
    
  )
}

export default Pills;