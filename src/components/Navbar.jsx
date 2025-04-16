import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate();

  const handleHomeClick = () =>{
    navigate("/",{replace : true})
  };
  return (
    <div className='flex justify-around rounded-lg w-full gap-3 mb-14 bg-indigo-600 py-1'>
      <NavLink to="/" onClick={handleHomeClick} className="text-lg text-white font-bold p-2 rounded-lg cursor-pointer hover:bg-white hover:text-blue-600 transition-colors">
        Home
      </NavLink>
      <NavLink to="/notes" className="text-lg text-white font-bold p-2 rounded-lg cursor-pointer hover:bg-white hover:text-blue-600 transition-colors">
        Notes
      </NavLink>
    </div>
  )
}

export default Navbar
