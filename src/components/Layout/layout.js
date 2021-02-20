import React from 'react'
import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";
import { UserDataProvider } from '../../context/UserContext/UserContext'
import SideBar from '../Sidebar/sidebar'
import Header from '../Header/header'
import Dashboard from '../Dashboard/dashboard'
import Vendor from '../Vendor/index'
import UserProfile from '../UserProfile/userProfile'
import Customer from '../Cutomer/cutomer'
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
                        <Route path="/home/dashboard" component={Dashboard} />
                        <Route path="/home/user-profile" component={UserProfile} />
                        <Route path="/home/vendor" component={Vendor} />
                        <Route path="/home/customer" component={Customer} />
                    </Switch>
                </div>
                {/* </Router> */}

            </div>
        </UserDataProvider>
    )
}
export default Layout