import React, { useState, useEffect } from 'react'
import firebase from '../../config/Firebase/firebase';
import { useHistory } from 'react-router-dom'
import { EmptyDiv } from './style/index'
import { Empty, Button } from 'antd';
import {
    TableDiv,
    Table,
    TableRow,
    TableData,
    TableHeading,
    TableHead,
    TableBody
} from './style/index'


const AllCustomers = () => {
    const [allCustomers, setAllCustomers] = useState()
    const [isCustomer, setIsCustomer] = useState(false)
    const history = useHistory()

    const getAllCustomers = () => {
        firebase
            .firestore()
            .collection("Customer")
            .onSnapshot(function (querySnapshot) {
                const customerList = [];
                querySnapshot.forEach(function (doc) {
                    console.log('functions Doc', doc.data)
                    if (doc.exists) {
                        const comp = doc.data();
                        customerList.push({ ...comp, compId: doc.id });
                        setIsCustomer(true)
                    } else {
                        setIsCustomer(false)
                    }
                });
                setAllCustomers(customerList);
            });
    }
    
    const checkCustomer = () => {
        if (isCustomer) {
            return <TableDiv>
                <Table>
                    <TableHead>
                        <TableHeading>BusinessName</TableHeading>
                        <TableHeading>BillToAddress</TableHeading>
                        <TableHeading>Phone</TableHeading>
                        <TableHeading>Email</TableHeading>
                        <TableHeading>City</TableHeading>
                    </TableHead>
                    <TableBody>
                        {allCustomers &&
                            allCustomers.map((customer, index) => {
                                return (
                                    <TableRow>
                                        <TableData>[{customer.businessName}]</TableData>
                                        <TableData>[{customer.billToAddress}]</TableData>
                                        <TableData>[{customer.phone}]</TableData>
                                        <TableData>[{customer.email}]</TableData>
                                        <TableData>[{customer.city}]</TableData>
                                        <TableData>
                                            {/* <button onClick={() => history.push(`/home/update-customer/:${customer.compId}`)}>
                                                Update customer
                                            </button> */}
                                        </TableData>
                                        <TableData>
                                            <Button onClick={() =>
                                                history.push(`/home/customer-details/${customer.compId}/${'Customer'}`)
                                            } >
                                                customer Details
                                            </Button>
                                        </TableData>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableDiv>
        }
        return <EmptyDiv> <Empty /> </EmptyDiv>
    }
    useEffect(() => {
        getAllCustomers()
    }, [])

    // console.log('All Customers', allCustomers);
    return (
        <div>
            {checkCustomer()}
        </div>
    )
}
export default AllCustomers