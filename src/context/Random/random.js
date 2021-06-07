import React, { createContext, useState } from 'react'

export const VendorCustomerContext = createContext()

export const VendorCustomerProvider = ({ children }) => {
    const [vendors, setVendors] = useState()
    const [customers, setCustomers] = useState()
    const [allInventoryItems, setAllInventoryItems] = useState()
    const [bomItems, setBomItems] = useState([])
    return (
        <VendorCustomerContext.Provider value={{
            vendors, setVendors,
            customers, setCustomers,
            allInventoryItems, setAllInventoryItems,
            bomItems, setBomItems
            }}>
            {children}
        </VendorCustomerContext.Provider>
    )
}