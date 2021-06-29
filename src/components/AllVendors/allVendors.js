import React, { useState, useEffect } from 'react'
import firebase from '../../config/Firebase/firebase';
import { useHistory } from 'react-router-dom'
import { Skeleton, Table, Space, Button, message } from 'antd';

const AllVendors = () => {
    const history = useHistory()
    const [allVendors, setAllVendors] = useState()

    const getAllVendors = () => {
          firebase
            .firestore()
            .collection('Vendor')
            .onSnapshot(function (querySnapshot) {
              const vendorList = []
              querySnapshot.forEach(function (doc) {
                if (doc.exists) {
                  const comp = doc.data()
                  vendorList.push({ ...comp, compId: doc.id })
                } else {
                  message.error('no data in vendors')
                }
            })
            setAllVendors(vendorList)
        })
      }

      useEffect(() => {
        getAllVendors()
    }, [])

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

    return (
        <div>

            {allVendors?
                <Table dataSource={allVendors} columns={columns} />
            :<Skeleton/>}

        </div>
    )
}
export default AllVendors