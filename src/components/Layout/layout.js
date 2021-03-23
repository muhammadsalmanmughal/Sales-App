import React from 'react'
import { Switch, Route, useHistory } from "react-router-dom";
import SideBar from '../Sidebar/sidebar'
import Header from '../Header/header'
import Dashboard from '../Dashboard/dashboard'
import Vendor from '../Vendor/index'
import UserProfile from '../UserProfile/userProfile'
import Customer from '../Cutomer/cutomer'
import RequestForQuotation from '../RequestForQuotation/requestForQuotation'
import PurchaseOrder from '../PurchaseOrder/purchaseOrder'
import VendorDetails from '../Details/vendorDetails'
import CustomerDetails from '../Details/customerDetails'
import CustomerOrder from '../CustomerOrder/customerOrder'
import UpdateCustomer from '../Cutomer/updateCustomer'
import { VendorCustomerProvider } from '../../context/Random/random'
import { UserProvider } from '../../context/UserContext/UserContext'
import Inventory from '../Inventory/inventory'
import './layout.css'

function Layout() {
    const history = useHistory()
    const token = localStorage.getItem('Authorization')
    if (!token) {
        history.replace('/')
        return null
    }
    return (
        <div>
            <UserProvider>
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
                                <Route path="/home/request-for-quotation" component={RequestForQuotation} />
                                <Route path="/home/purchase-order" component={PurchaseOrder} />
                                <Route path="/home/vendor-details/:slug/:Cname" component={VendorDetails} />
                                <Route path="/home/customer-details/:slug/:Cname" component={CustomerDetails} />
                                <Route path="/home/customer-order/:slug/:Cname" component={CustomerOrder} />
                                <Route path="/home/update-customer/:data" component={UpdateCustomer} />
                                <Route path="/home/inventory" component={Inventory} />
                            </Switch>
                        </div>
                    </div>
                </VendorCustomerProvider>
            </UserProvider>
        </div>

    )
}
export default Layout