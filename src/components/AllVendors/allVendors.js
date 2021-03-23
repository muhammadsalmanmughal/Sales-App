import React, { useState, useEffect, useContext } from 'react'
import firebase from '../../config/Firebase/firebase';
import { useHistory } from 'react-router-dom'
import { EmptyDiv } from './style/index'
import { Empty, Table, Space, Button } from 'antd';
import loader from '../../assets/loader.gif'

import { VendorCustomerContext } from '../../context/Random/random'
import { TableDiv, LoaderDiv } from './style/index'

const AllVendors = () => {
    const [isVendor, setIsVendor] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const history = useHistory()

    const value = useContext(VendorCustomerContext)
    const { vendors, setVendors } = useContext(VendorCustomerContext)

    const getAllVendors = () => {
        setIsLoading(true)
        firebase
            .firestore()
            .collection("Vendor")
            .onSnapshot(function (querySnapshot) {
                const vendorList = [];
                querySnapshot.forEach(function (doc) {
                    console.log('functions Doc', doc.data)
                    if (doc.exists) {
                        const comp = doc.data();
                        vendorList.push({ ...comp, compId: doc.id });
                        setIsVendor(true)
                    } else {
                        // alert("No such document!");
                        // <EmptyDiv>
                        //     <Empty/>
                        // </EmptyDiv>
                        setIsVendor(false)
                    }
                });
                setVendors(vendorList)
                setIsLoading(false)
                // setIsVendor(true)
            });
    }
console.log('All Vendors-------->', vendors);
    const updateVendor = (e) => {
        console.log('update E', e)
    }

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
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Action',
            key: 'action',
            render: (vendors) => (
                <Space size="middle">
                    <Button
                        onClick={() =>
                            history.push(`/home/vendor-details/${vendors.compId}/${'Vendor'}`)}
                    >Details</Button>
                </Space>
            ),
        },
    ];
    const checkVendor = () => {
        if (isVendor) {
            return <TableDiv>
                <Table dataSource={vendors} columns={columns} />;
            </TableDiv>
        }
        else if (!isVendor || isLoading) {
            return <LoaderDiv><img src={loader} /></LoaderDiv>
        }
        return <EmptyDiv> <Empty /> </EmptyDiv>


    }
    useEffect(() => {
        getAllVendors()
    }, [])

    console.log('All vendros', vendors);
    return (
        <div>

            {checkVendor()}


        </div>
    )
}
export default AllVendors