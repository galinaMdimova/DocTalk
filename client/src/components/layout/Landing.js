import React from 'react'

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
              <a href="register.html" className="btn btn-primary">Регистрация</a>
              <a href="login.html" className="btn btn-light">Вход</a>
            </div>
          </div>
        </div>
      </section>
    )

}

export default Landing