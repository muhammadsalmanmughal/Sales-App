import React, { useState,useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Table, Skeleton, Space } from 'antd';
import { VendorCustomerContext } from '../../context/Random/random'
import { getAllCustomers } from '../../Utils/utils'

const AllCustomers = () => {
    const history = useHistory()
    const [customers, setCustomers] = useState()

    useEffect(()=>{
        getAllCustomers().then(data => {
            setCustomers(data)
          })
    },[])
    // const { customers } = useContext(VendorCustomerContext)


    const customerTable = [
        {
            title: 'Customer Name',
            dataIndex: 'CustomerName',
            key: 'customer_Name',
        },
        {
            title: 'Address',
            dataIndex: 'BillToAddress',
            key: 'billtoaddress',
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
            render: (customer) => (
                <Space size="middle">
                    <Button onClick={() =>
                        history.push(`/home/customer-details/${customer.compId}/${'Customer'}`)
                    } >
                        customer Details
                    </Button>
                    <Button onClick={() =>
                        history.push(`/home/customer-order/${customer.compId}/${'Customer'}`)
                    } >
                        customer order
                    </Button>
                </Space>
            ),
        },
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