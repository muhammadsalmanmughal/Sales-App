import React, { createContext, useState } from 'react'

export const VendorContext = createContext()

export const VendorProvider = ({ children }) => {
    const [vendors, setVendors] = useState()
    return (
        <VendorContext.Provider value={{vendors, setVendors}}>
            {children}
        </VendorContext.Provider>
    )
}