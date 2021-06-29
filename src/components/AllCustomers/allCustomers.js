import React, { useState,useEffect } from 'react'
import firebase from '../../config/Firebase/firebase';
import { useHistory } from 'react-router-dom'
import { Table, Skeleton, Radio } from 'antd';

const AllCustomers = () => {
    const history = useHistory()
    const [customers, setCustomers] = useState()

    const getAllCustomers = () => {
          firebase
            .firestore()
            .collection('Customer')
            .onSnapshot(function (querySnapshot) {
              const customerList = []
              querySnapshot.forEach(function (doc) {
                if (doc.exists) {
                  const comp = doc.data()
                  customerList.push({ ...comp, compId: doc.id })
                }
              })
           setCustomers(customerList)
            })
      }

    useEffect(()=>{
        getAllCustomers()
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