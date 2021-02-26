import React, { useState, useEffect } from 'react'
import firebase from '../../config/Firebase/firebase';
import Details from '../Details/vendorDetails'
import { useHistory } from 'react-router-dom'
import { EmptyDiv } from './style/index'
import { Empty} from 'antd';
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


const AllVendors = () => {
    const [allVendors, setAllVendors] = useState()
    const [isVendor, setIsVendor] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const history = useHistory()

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
                setAllVendors(vendorList);
                setIsLoading(false)
                // setIsVendor(true)
            });
    }

    const updateVendor = (e) => {
        console.log('update E', e)
    }
    const checkVendor = () => {
        if (isVendor) {
            return <TableDiv>
                <Table>
                    <TableHead>
                        <TableHeading>Company</TableHeading>
                        <TableHeading>FirstName</TableHeading>
                        <TableHeading>Phone</TableHeading>
                        <TableHeading>City</TableHeading>
                    </TableHead>
                    <TableBody>
                        {allVendors &&
                            allVendors.map((vendor, index) => {
                                return (
                                    <TableRow>
                                        <TableData>[{vendor.companyName}]</TableData>
                                        <TableData>[{vendor.ownerFirstName}]</TableData>
                                        <TableData>[{vendor.phone}]</TableData>
                                        <TableData>[{vendor.city}]</TableData>
                                        <TableData>
                                            <button onClick={() => updateVendor(vendor)}>
                                                Update
                                            </button>
                                        </TableData>
                                        <TableData>
                                            <button 
                                            onClick={() =>
                                                history.push(`/home/vendor-details/${vendor.compId}/${'Vendor'}`)}
                                            >
                                                Details
                                            </button>
                                        </TableData>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
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

    console.log('All vendros', allVendors);
    return (
        <div>

            {checkVendor()}
           

        </div>
    )
}
export default AllVendors