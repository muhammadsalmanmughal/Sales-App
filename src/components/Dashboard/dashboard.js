import React,{useContext} from 'react'
import {VendorContext} from '../../context/Random/random'

import './Styled/index.css'
const Dashboard = () => {
const value = useContext(VendorContext)
const {vendors, setVendors} = useContext(VendorContext)

console.log('Context ------>', value.vendors)

function changeVendor(){
    setVendors('vendor data is changed')
}
    return (
        <div>

            <h1>Dashboard</h1>
            <button onClick={changeVendor} > logout </button>
            {value.vendors.map((items,key)=>{
                return <p>{items.companyName}</p>
            })}
        </div>
    )
}
export default Dashboard