import React, { useState, useEffect, useContext } from 'react'
import firebase from '../../config/Firebase/firebase';
import {getAllInventoryItems} from '../../Utils/utils'
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
    Inventory
} from '../NavigationLinks/navLinks'
import { VendorCustomerContext, VendorCustomerProvider } from '../../context/Random/random'
import { UserProvider } from '../../context/UserContext/UserContext'
import './layout.css'

function Layout() {
    // const { setVendors } = useContext(VendorCustomerContext)
   
    //#region context functions
    const getAllVendors = () => {
        firebase
            .firestore()
            .collection("Vendor")
            .onSnapshot(function (querySnapshot) {
                const vendorList = [];
                querySnapshot.forEach(function (doc) {
                    console.log('functions Doc', doc.data)
                    if (doc.exists) {
                        const comp = doc.data();
                        vendorList.push({ ...comp, compId: doc.id });
                        // setIsVendor(true)
                    } else {
                        // alert("No such document!");
                        // <EmptyDiv>
                        //     <Empty/>
                        // </EmptyDiv>
                        // setIs/Vendor(false)
                    }
                });
                // setVendors(vendorList)
                console.log('vendor data from layout ', vendorList);
            });
    }
    //All Inventory Items store in context

    useEffect(() => {
        getAllVendors()
        getAllInventoryItems().then(data => {
            console.log('Inventory data in layout', data)
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