import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import PageNotFound from '../../components/404/pagenotfound'

import Layout from '../../components/Layout/layout'
import Login from '../../components/Login/Login'
import Signup from '../../components/Signup/signup'

// import './route.css'
const MainRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Login} />
        <Route path='/signup' component={Signup} />
        <Route path='/home' component={Layout} />
        <Route component={PageNotFound} />
        {/* <Route render={() => <Redirect to="/home" />} /> */}
      </Switch>
    </Router>
  )
}
export default MainRouter
