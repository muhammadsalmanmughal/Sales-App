import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    useHistory
} from 'react-router-dom'

import Dashboard from '../../components/Dashboard/dashboard'
import Login from '../../components/Login/Login'
import Signup from '../../components/Signup/signup'

const MainRouter = ({isLoggedIn, isLoading}) =>{
    const history = useHistory();
    console.log('route index history', history)
    // if (isLoading) return <img width="150" src='https://cdn.lowgif.com/small/ee5eaba393614b5e-pehliseedhi-suitable-candidate-suitable-job.gif' />
    // console.log('window.location.pathname***', window.location.pathname)
    const currentPath = window.location.pathname.length === 1 ? '/dashboard' : window.location.pathname
    console.log('Current Path=========>',currentPath)
    return (
    <Router>
        <div>
            <Switch>
            <Route path="/" exact>
            {isLoggedIn ? <Redirect to={currentPath} /> : <Login />}
          </Route>
            <Route path="/signup">
                {isLoggedIn ? <Redirect to={currentPath} /> : <Signup />}
            </Route>
          <Route path="/dashboard">{AuthChecker(isLoggedIn, <Dashboard />)}</Route>
            </Switch>
        </div>
    </Router>
    );
  }
export default MainRouter;

const AuthChecker = (isLoggedIn, component) =>{
    return isLoggedIn ? component : <Redirect to='/' />
    console.log('auth checker')
}