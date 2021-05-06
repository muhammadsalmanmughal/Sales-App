import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Table, Skeleton, Space } from 'antd';
import { VendorCustomerContext } from '../../context/Random/random'

const AllCustomers = () => {
    const history = useHistory()
    const { customers } = useContext(VendorCustomerContext)

    const customerTable = [
        {
            title: 'BusinessName',
            dataIndex: 'businessName',
            key: 'business_Name',
        },
        {
            title: 'BillToAddress',
            dataIndex: 'billToAddress',
            key: 'billtoaddress',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'City',
            dataIndex: 'city',
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