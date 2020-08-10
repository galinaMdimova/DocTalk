import React, { Fragment } from 'react'
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'

const App = () => {
  return (
    <Router>
      <Fragment>
        <Navbar />
        <Landing />
      </Fragment>
    </Router>
  )
}

export default App
