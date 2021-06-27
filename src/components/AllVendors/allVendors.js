import React, { useState, useEffect, useContext } from 'react'
import { getAllVendors } from '../../Utils/utils'
import { useHistory } from 'react-router-dom'
import { Skeleton, Table, Space, Button } from 'antd';

import { VendorCustomerContext } from '../../context/Random/random'

const AllVendors = () => {
    const history = useHistory()
    const [allVendors, setAllVendors] = useState()

    const { vendors } = useContext(VendorCustomerContext)

    const columns = [
        {
            title: 'Company Name',
            dataIndex: 'companyName',
            key: 'name',
        },
        {
            title: 'FirstName',
            dataIndex: 'ownerFirstName',
            key: 'firstname',
        },
        {
            title: 'LastName',
            dataIndex: 'ownerLastName',
            key: 'lastname',
        },
        {
            title: 'Phone',
            dataIndex: 'Phone',
            key: 'phone',
        },
        {
            title: 'Address',
            dataIndex: 'Address',
            key: 'address',
        },
        {
            title: 'Action',
            key: 'action',
            render: (allVendors) => (
                <Space size="middle">
                    <Button
                        onClick={() =>
                            history.push(`/home/vendor-details/${allVendors.compId}/${'Vendor'}`)}
                    >Details</Button>
                </Space>
            ),
        },
    ];
    useEffect(() => {
        getAllVendors().then(data => {
            setAllVendors(data)
        })
    }, [])

    console.log('All vendros', vendors);
    return (
        <div>

            {allVendors?
                <Table dataSource={allVendors} columns={columns} />
            :<Skeleton/>}

        </div>
    )
}
export default AllVendors