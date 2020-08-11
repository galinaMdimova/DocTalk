import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () =>{
    return(
        <nav className="navbar bg-dark">
        <h1>
          <Link to="/"><i className="fas fa-code"></i> DocTalk</Link>
        </h1>
        <ul>
          <li><a to="/!#">Лекари</a></li>
          <li><Link to="/register">Регистрация</Link></li>
          <li><Link to="/login">Вход</Link></li>
        </ul>
      </nav>
    )
}

export default Navbar