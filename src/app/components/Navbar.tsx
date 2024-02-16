import React from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../theme-context';
import { FiMoon } from "react-icons/fi";
import { IoLogoReact } from "react-icons/io5";

export default function Navbar() {
    const {theme, toggleTheme} = useTheme();
    const labelRound = "w-10 h-5 relative ml-2 inline-block";
    const sliderRound= "";
  return (
    <nav className={`flex items-center justify-between   p-4 ${theme=== "dark" ? 'bg-gray-800 text-white ':' bg-gray-200  text-gray-800'}`}>
        <Link to="/">
         <h1 className="text-3xl font-bold"><IoLogoReact /></h1>
       </Link>
       <div className='flex items-center'>
        

          <button className={`rounded-full h-10 w-10 ${theme=== "dark" ? 'bg-purple-600 text-white ':' bg-white  text-purple-600'} items-center p-2`} onClick={toggleTheme}> <FiMoon className='h-6 w-6'/> </button>
          
   
       
       </div>
    </nav>
  )
}
