import React, { useState, useEffect } from 'react'
import firebase from '../../config/Firebase/firebase'
import { Divider, message } from 'antd'


const RequestForQuatation = () => {
    const [allVendorsName, setAllVendorsName] = useState([])
    const getAllVendorNames = () => {
         firebase
        .firestore()
        .collection('Vendor')
        // .where("iD", "==", id)
        .get()
        .then(function (querySnapshot) {
          // console.log('querySnapshot', querySnapshot)
          const comlist = [];
          querySnapshot.forEach(function (doc) {
            if (doc.exists) {
              const comp = doc.data();
              comlist.push({ ...comp, compId: doc.id });
            } else {
              message.info("No such document!");
            }
          });
          comlist.map((items, key)=>{
            return setAllVendorsName(items.companyName)
          })
          // setAllVendorsName(comlist);
          // setInitialCompany(comlist);
          // console.log('data-------->', comlist)
          
        })
        .catch(function (error) {
          console.log("Error getting documents: ", error);
        });
      }
    useEffect(() => {
        getAllVendorNames()
    }, [])
    // console.log('allvendorData', allVendorsName)
    return (
        <div>
            <h1>Request For Quotation</h1>
            <Divider />
         <ul>
           <li>{console.log('all vendors name',allVendorsName)}</li>
         </ul>
        </div>
    )
}
export default RequestForQuatation