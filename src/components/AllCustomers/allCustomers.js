import React, { useState, useEffect } from 'react'
import firebase from '../../config/Firebase/firebase';
import { useHistory } from 'react-router-dom'
import { EmptyDiv } from './style/index'
import { Empty } from 'antd';
import loader from '../../assets/loader.gif'
import {
    TableDiv,
    Table,
    TableRow,
    TableData,
    TableHeading,
    TableHead,
    TableBody,
    LoaderDiv
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
                        // alert("No such document!");
                        // <EmptyDiv>
                        //     <Empty/>
                        // </EmptyDiv>
                        setIsCustomer(false)
                    }
                });
                setAllCustomers(customerList);
                // setIsVendor(true)
            });
    }

    const updateCustomer = (e) => {
        console.log('update E', e)
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
                                            <button onClick={() => updateCustomer(customer)}>
                                                Update customer
                                            </button>
                                        </TableData>
                                        <TableData>
                                            <button onClick={() =>
                                                history.push(`/home/customer-details/${customer.compId}/${'Customer'}`)
                                            } >
                                                customer Details
                                            </button>
                                        </TableData>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableDiv>
        }
        return <EmptyDiv> <Empty/> </EmptyDiv>
        

    }
    useEffect(() => {
        getAllCustomers()
    }, [])

    console.log('All Customers', allCustomers);
    return (
        <div>
{checkCustomer()}

        </div>
    )
}
export default AllCustomers