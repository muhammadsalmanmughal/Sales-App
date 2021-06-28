import React, { useState,useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Table, Skeleton, Radio, message } from 'antd';
import { getAllCustomers } from '../../Utils/utils'

const AllCustomers = () => {
    const history = useHistory()
    const [customers, setCustomers] = useState()

    useEffect(()=>{
        getAllCustomers().then(data => {
            setCustomers(data)
          })
    },[])

    const customerTable = [
        {
            title: 'Customer Name',
            dataIndex: 'CustomerName',
            key: 'customer_Name',
        },
        {
            title: 'Phone',
            dataIndex: 'Phone',
            key: 'phone',
        },
        {
            title: 'Email',
            dataIndex: 'Email',
            key: 'email',
        },
        {
            title: 'City',
            dataIndex: 'City',
            key: 'city',
        },
        {
            title: 'Action',
            key: 'action',
            render: customer => (
                    <Radio.Group  >
                        <Radio.Button
                            onClick={
                            () => history.push(`/home/customer-details/${customer.compId}/${'Customer'}`)
                            } >Details</Radio.Button>
                        <Radio.Button value="default" onClick={
                         () => history.push(`/home/customer-order/${customer.compId}/${'Customer'}`)
                        }>Customer order</Radio.Button>
                    </Radio.Group>
            ),
        }
    ]
    return (
        <div>
            <div>
                {customers ?
                    <Table dataSource={customers && customers} columns={customerTable} /> : <Skeleton />
                }
            </div>

        </div>
    )
}
export default AllCustomers