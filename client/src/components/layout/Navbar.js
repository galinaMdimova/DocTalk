import React from 'react'

const Navbar = () =>{
    return(
        <nav className="navbar bg-dark">
        <h1>
          <a href="index.html"><i className="fas fa-code"></i> DocTalk</a>
        </h1>
        <ul>
          <li><a href="profiles.html">Лекари</a></li>
          <li><a href="register.html">Регистрация</a></li>
          <li><a href="login.html">Вход</a></li>
        </ul>
      </nav>
    )
}

export default Navbar