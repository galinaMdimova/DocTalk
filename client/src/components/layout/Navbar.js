import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logout } from '../../actions/auth'

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <a onClick={ logout } href='#!'>
          <i className="fas fa-sign-out-alt"></i>{' '} 
          <span className="hide-sm"> Изход</span>
          </a>
      </li>
    </ul>
  )

  const guestLinks = (
    <ul>
      <li><a href='#!'>Лекари</a></li>
      <li><Link to="/register">Регистрация</Link></li>
      <li><Link to="/login">Вход</Link></li>
    </ul>
  )
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/"><i className="fas fa-code"></i> DocTalk</Link>
      </h1>
  { !loading && 
  (<Fragment>{ isAuthenticated ? authLinks : guestLinks }</Fragment>) }
    </nav>
  )
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logout })(Navbar)