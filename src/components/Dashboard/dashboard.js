import React,{useContext} from 'react'
import {VendorCustomerContext} from '../../context/Random/random'

import './Styled/index.css'
const Dashboard = () => {
const value = useContext(VendorCustomerContext)
const {vendors, setVendors} = useContext(VendorCustomerContext)
const {customers} = useContext(VendorCustomerContext)
console.log('Context Dashboard------>', value)

function changeVendor(){
    setVendors('vendor data is changed')
}
    return (
        <div>

            <h1>Dashboard</h1>
            {/* <button onClick={changeVendor} > logout </button> */}
            {value.vendors.map((items,key)=>{
                return <p>{items.companyName}</p>
            })}

            {customers.map((items,key)=>{
                return <p>{items.phone}</p>
            })}
        </div>
    )
}
export default Dashboard