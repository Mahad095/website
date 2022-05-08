import React from 'react'
import { NavLink } from 'react-router-dom'
export default function Projects
() {
  const projectdetails=[
    {
      name:"Game of Life",
      path:"/Projects/Gameoflife",
    },
    {
      name:"WizChat",
      path:"/Projects/WizChat",
    }
  ];
  return (
    <div>
        <ul>
          {
            projectdetails.map((proj, i)=>
              (
                <li>
                  <NavLink key={i} to={proj.path}>{proj.name}</NavLink>
                </li>
              ))
          }
        </ul>
    </div>
  )
}
