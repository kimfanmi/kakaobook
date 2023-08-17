import React from 'react'
import { NavLink } from 'react-router-dom'



const NavBar = ({categories}) => {
  
  
  return (
    <div className='navBar'>
      {categories.map(p=><NavLink key={p.id} to={'/'+p.id}>{p.title}</NavLink>)}
    </div>
  )
}

export default NavBar