import React, { useEffect, useContext } from 'react'
import { getAllVendors, getAllInventoryItems, getAllCustomers, GetAllBom } from '../../Utils/utils'
import { Switch, Route, useHistory } from 'react-router-dom'
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
  PurchaseRequisition,
  Delivery,
  BillOfMaterial,
  Production,
  CustomerInvoice,
  CreateReport,
  PageNotFound
} from '../NavigationLinks/navLinks'
import { VendorCustomerContext } from '../../context/Random/random'
import { UserProvider } from '../../context/UserContext/UserContext'
import './layout.css'

function Layout () {
  const { setVendors, setAllInventoryItems, setCustomers, setBomItems } = useContext(VendorCustomerContext)

  useEffect(() => {
    getAllVendors().then(data => {
      setVendors(data)
    })

    getAllInventoryItems().then(data => {
      setAllInventoryItems(data)
    })

    getAllCustomers().then(data => {
      setCustomers(data)
    })

    GetAllBom().then(data => {
      setBomItems(data)
    })
  }, [])

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
                    <Route path='/home/dashboard' component={Dashboard} />
                    <Route path='/home/user-profile' component={UserProfile} />
                    <Route path='/home/vendor' component={Vendor} />
                    <Route path='/home/customer' component={Customer} />
                    <Route path='/home/request-for-quotation/' component={RequestForQuotation} />
                    <Route path='/home/request-for-quotation/:slug/:Cname' component={RequestForQuotation} />
                    <Route path='/home/purchase-order' component={PurchaseOrder} />
                    <Route path='/home/purchase-order-details/:slug/' component={PurchaseOrderDetails} />
                    <Route path='/home/vendor-details/:slug/:Cname' component={VendorDetails} />
                    <Route path='/home/customer-details/:slug/:Cname' component={CustomerDetails} />
                    <Route path='/home/customer-order/:slug/:Cname' component={CustomerOrder} />
                    <Route path='/home/update-customer/:data' component={UpdateCustomer} />
                    <Route path='/home/inventory' component={Inventory} />
                    <Route path='/home/invoices' component={AllInvoices} />
                    <Route path='/home/purchase-requisition' component={PurchaseRequisition} />
                    <Route path='/home/production' component={Production} />
                    <Route path='/home/bill-of-material' component={BillOfMaterial} />
                    <Route path='/home/customer-invoice' component={CustomerInvoice} />
                    <Route path='/home/delivery' component={Delivery} />
                    <Route path='/home/createInvoice/:slug' component={CreateReport} />
                    <Route component={PageNotFound} />

                  </Switch>
              </div>
          </div>
      </UserProvider>
    </div>

  )
}
export default Layout
