import React from 'react'
import { NavLink } from 'react-router-dom'
import './index.css'
export default function Navbar() {
  
  const pages = [
    {name:"Home", path: "/"},
    {name:"Projects", path: "/Projects"},
    {name:"About", path: "/About"},
    {name:"Contact", path: "/Contact"},
  ];


  return (
    <React.Fragment>
      <div className="container-fluid nav_bg mt-1">
        <div className="row">
          <div className="col-12">

            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <div className="container-fluid">
                <h3 className="navbar-brand">CodeWizard</h3>
                {/* <NavLink className="navbar-brand" to="/">CodeWizard</NavLink> */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    
                    {
                      pages.map((page, i)=>
                        
                          <li className="nav-item" key={i}>
                            <NavLink className={({ isActive }) => (isActive? "menu_active": '') + " nav-link" } aria-current="page" to={page.path}>{page.name}</NavLink>
                          </li>
                        )
                    }

{/*                     
                    <li className="nav-item">
                      <NavLink className={({ isActive }) => (isActive? "menu_active": '') + " nav-link" } exact aria-current="page" to='/'>Home</NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className={({ isActive }) => (isActive? "menu_active": '') + " nav-link" } exact aria-current="page" to='/projects'>Projects</NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className={({ isActive }) => (isActive? "menu_active": '') + " nav-link" } exact aria-current="page" to='/about'>About</NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className={({ isActive }) => (isActive? "menu_active": '') + " nav-link" } exact aria-current="page" to='/contact'>Contact</NavLink>
                    </li>
 */}

                  </ul>
                </div>
              </div>
            </nav>

          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
