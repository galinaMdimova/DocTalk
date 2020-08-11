import React from 'react'
import { Link } from 'react-router-dom'

const Landing = () =>{
    return(
        <section className="landing">
        <div className="dark-overlay">
          <div className="landing-inner">
            <h1 className="x-large">DocTalk</h1>
            <p className="lead">
              Направете ваш профил и споделяйте професионален опит с вашите колеги
            </p>
            <div className="buttons">
              <Link to="/register" className="btn btn-primary">Регистрация</Link>
              <Link to="/login" className="btn btn-light">Вход</Link>
            </div> 
          </div>
        </div>
      </section>
    )

}

export default Landing