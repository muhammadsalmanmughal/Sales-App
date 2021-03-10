import React, { useState, useEffect, useContext } from 'react'
import firebase from '../../config/Firebase/firebase';
import { useHistory } from 'react-router-dom'
import { EmptyDiv } from './style/index'
import { Empty, Button } from 'antd';
import {VendorCustomerContext} from '../../context/Random/random'
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
    const [isCustomer, setIsCustomer] = useState(false)
    const history = useHistory()

    const value = useContext(VendorCustomerContext)
    const { customers, setCustomers } = useContext(VendorCustomerContext)
    console.log('all customers', value)

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
                setCustomers(customerList)
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
                        {customers &&
                            customers.map((customer, index) => {
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