import React from 'react'
import { Switch, Route, useHistory } from "react-router-dom";
import { UserDataProvider } from '../../context/UserContext/UserContext'
import SideBar from '../Sidebar/sidebar'
import Header from '../Header/header'
import Dashboard from '../Dashboard/dashboard'
import Vendor from '../Vendor/index'
import UserProfile from '../UserProfile/userProfile'
import Customer from '../Cutomer/cutomer'
import RequestForQuotation from '../RequestForQuotation/requestForQuotation'
// import RequestForQuatation from '../RFQ/requestForQuatation'
import PurchaseOrder from '../PurchaseOrder/purchaseOrder'
import VendorDetails from '../Details/vendorDetails'
import CustomerDetails from '../Details/customerDetails'
import UpdateCustomer from '../Cutomer/updateCustomer'
import './layout.css'
import {VendorCustomerProvider} from '../../context/Random/random'

function Layout() {
    const history = useHistory()
    const token = localStorage.getItem('Authorization')
    if (!token) {
        history.replace('/')
        return null
    }
    return (
        <VendorCustomerProvider>
            <Header />
            <div className='main'>
                <div className='sidebar'>
                    <SideBar />
                </div>
                <div className='content'>
                    <Switch>
                        <Route path="/home/dashboard" component={Dashboard} />
                        <Route path="/home/user-profile" component={UserProfile} />
                        <Route path="/home/vendor" component={Vendor} />
                        <Route path="/home/customer" component={Customer} />
                        <Route path="/home/request-for-quotation" component={RequestForQuotation}/>
                        {/* <Route path="/home/request-for-qutation" component={RequestForQuatation}/> */}
                        <Route path="/home/purchase-order" component={PurchaseOrder}/>
                        <Route path="/home/vendor-details/:slug/:Cname" component={VendorDetails}/>
                        <Route path="/home/customer-details/:slug/:Cname" component={CustomerDetails}/>
                        <Route path="/home/update-customer/:data" component={UpdateCustomer}/>
                    </Switch>
                </div>
            </div>
        </VendorCustomerProvider>
    )
}
export default Layout