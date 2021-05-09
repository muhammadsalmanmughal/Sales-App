import React, { useState, useEffect, useContext } from 'react'
import {getAllVendors, getAllInventoryItems, getAllCustomers} from '../../Utils/utils'
import { Switch, Route, useHistory } from "react-router-dom";
import {
    SideBar, Header,
    Dashboard,
    Vendor,
    UserProfile,
    Customer,
    RequestForQuotation,
    PurchaseOrder,
    VendorDetails,
    CustomerDetails,
    CustomerOrder,
    UpdateCustomer,
    Inventory,
    PurchaseOrderDetails,
    AllInvoices,
    PurchaseRequisition
} from '../NavigationLinks/navLinks'
import { VendorCustomerContext } from '../../context/Random/random'
import { UserProvider } from '../../context/UserContext/UserContext'
import './layout.css'

function Layout() {
    const { setVendors, setAllInventoryItems, setCustomers } = useContext(VendorCustomerContext)
    useEffect(() => {
        getAllVendors().then(data => {
            // console.log('all vendors data in layout', data)
            setVendors(data)
        })
        
        getAllInventoryItems().then(data => {
            // console.log('Inventory data in layout', data)
            setAllInventoryItems(data)
        })
        getAllCustomers().then(data => {
            console.log('customer data in layout', data)
            setCustomers(data)
        })
    }, [])

    //#endregion

    const history = useHistory()
    const token = localStorage.getItem('Authorization')
    if (!token) {
        history.replace('/')
        return null
    }
    return (
        <div>
            <UserProvider>
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
                                <Route path="/home/purchase-order-details/:slug/" component={PurchaseOrderDetails} />
                                <Route path="/home/vendor-details/:slug/:Cname" component={VendorDetails} />
                                <Route path="/home/customer-details/:slug/:Cname" component={CustomerDetails} />
                                <Route path="/home/customer-order/:slug/:Cname" component={CustomerOrder} />
                                <Route path="/home/update-customer/:data" component={UpdateCustomer} />
                                <Route path="/home/inventory" component={Inventory} />
                                <Route path="/home/invoices" component={AllInvoices} />
                                <Route path="/home/purchase-requisition" component={PurchaseRequisition} />
                            </Switch>
                        </div>
                    </div>
            </UserProvider>
        </div>

    )
}
export default Layout