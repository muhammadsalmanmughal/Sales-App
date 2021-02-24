import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getSpecificData } from '../../Utils/utils'
const Details = () => {
    const { slug, Cname } = useParams()
    console.log('customerDetails------->', slug, Cname)

    // const getData = () => {
    //     // const userID = localStorage.getItem('userId')
    //     // console.log('USER ID============>',userID);
    //     return firebase
    //         .firestore()
    //         .collection(Cname)
    //         .where("iD", "==", slug)
    //         .get()
    //         .then(function (querySnapshot) {
    //             console.log('querySnapshot', querySnapshot)
    //             const comlist = [];
    //             querySnapshot.forEach(function (doc) {
    //                 if (doc.exists) {
    //                     const comp = doc.data();
    //                     comlist.push({ ...comp, compId: doc.id });
    //                 } else {
    //                     message.info("No such document!");
    //                 }
    //             });
    //             // setCompanyList(comlist);
    //             // setInitialCompany(comlist);
    //             console.log('data-------->', comlist)
    //             return comlist
    //         })
    //         .catch(function (error) {
    //             console.log("Error getting documents: ", error);
    //         });

    // }
    useEffect(() => {
        getSpecificData(slug , Cname)
    }, [])


    return (
        <div>
            <h1> Details page</h1>
        </div>
    )
}
export default Details