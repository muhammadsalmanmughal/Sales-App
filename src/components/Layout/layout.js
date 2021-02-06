import React from 'react'
import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";
import { UserDataProvider } from '../../context/UserContext/UserContext'
import SideBar from '../Sidebar/sidebar'
import Header from '../Header/header'
import Dashboard from '../Dashboard/dashboard'
import RequestForQuatation from '../RequestForQuatation/requestForQuatation'
import './layout.css'

function Layout() {
    const history = useHistory()
    const token = localStorage.getItem('Authorization')
    if (!token) {
        history.replace('/')
        return null
    }
    return (
        <UserDataProvider>
            <Header />
            <div className='main'>
                {/* <Router> */}
                <div className='sidebar'>
                    <SideBar />
                </div>
                <div className='content'>
                    <Switch>
                        <Route path="/home/requestforquatation" component={RequestForQuatation} />
                        <Route path="/home/dashboard" component={Dashboard} />
                    </Switch>
                </div>
                {/* </Router> */}

            </div>
        </UserDataProvider>
    )
}
export default Layout