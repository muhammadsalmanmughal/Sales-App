import React, { createContext, useState } from 'react'

export const VendorCustomerContext = createContext()

export const VendorCustomerProvider = ({ children }) => {
    const [vendors, setVendors] = useState()
    const [customers, setCustomers] = useState()
    
    return (
        <VendorCustomerContext.Provider value={{
            vendors,
            setVendors,
            customers, 
            setCustomers
            }}>
            {children}
        </VendorCustomerContext.Provider>
    )
}