import React from 'react'
import { NavLink } from 'react-router-dom'
export default function Projects
() {
  return (
    <div>
        <ul>
          <li>
            <NavLink to="/Projects/Gameoflife">Game of Life</NavLink>
          </li>
        </ul>
    </div>
  )
}
