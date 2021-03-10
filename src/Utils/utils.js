import firebase from '../config/Firebase/firebase'
import 'antd/dist/antd.css';
import { message } from 'antd';

const createUser = async (email, password, name, img) => {
  console.log(email, password, name, img);
  if (email == "" || password == "" || name == "") {
    message.error('Data is not in correct format')
  }
  else if (img == null) {
    message.error('upload an image')
  }
  else {
    return await firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then((u) => {
        const storageRef = firebase.storage().ref(`images/${img.name}.jpg`);
        storageRef
          .put(img)
          .then((response) => {
            response.ref.getDownloadURL()
              .then((url) => {
                const userId = u.user.uid;
                firebase.firestore().collection("Users").doc(userId).set({
                  name,
                  email,
                  url,
                  userId
                });
                message.success('Account Created')
              })
              .catch((error) => {
                console.log('Error', error.message)
              })
          })
          .catch((error) => {
            console.log('Error', error.message)
          })
      })
  }
}

const loginUser = async (email, password) => {

  return await firebase.auth()
    .signInWithEmailAndPassword(email, password)
    .then((u) => {
      const userId = u.user.uid
      console.log('login u', u.user.uid)
      localStorage.setItem('userId', userId)
      message.success('WelCome')
      // localStorage.setItem("userID", userId);
    })
    .catch(function (error) {
      console.log(error);
      message.error(error.message)
      throw error
    });

};

const getUserData = () => {
  const userID = localStorage.getItem('userId')
  // console.log('USER ID============>',userID);
  return firebase
    .firestore()
    .collection("Users")
    .where("userId", "==", userID)
    .get()
    .then(function (querySnapshot) {
      const comlist = [];
      querySnapshot.forEach(function (doc) {
        if (doc.exists) {
          const comp = doc.data();
          comlist.push({ ...comp, compId: doc.id });
        } else {
          message.info("No such document!");
        }
      });
      // setCompanyList(comlist);
      // setInitialCompany(comlist);
      // console.log('data-------->', comlist)
      return comlist
    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
    });

}

const createVendor = (vendorDetails, vendorId) => {
  console.log('create vendor function')
  const {
    companyName,
    ownerFirstName,
    ownerLastName,
    address,
    phone,
    email,
    city,
    postalCode
  } = vendorDetails

  // console.log(companyName, ownerFirstName, ownerLastName, address, phone, email, city, postalCode);
  const vendorObj = {
    companyName,
    ownerFirstName,
    ownerLastName,
    address,
    phone,
    email,
    city,
    postalCode,
    iD:''
  }

  firebase.firestore().collection("Vendor").add(
    vendorObj
  )
    .then((response) => {
      console.log('respnse', response.id)
      firebase.firestore().collection("Vendor").doc(response.id).update({'iD': response.id})

      message.success('Vendor Created')
    }).catch((error) => {
      console.log('Error', error.message)
      message.error(error.message)
    })

}

const createNewCustomer = (customerDetails, customerId) => {

  const {
    businessName,
    billToAddress,
    phone,
    email,
    city,
    responsibleName,
    responsiblePhone,
    secondaryPhone,
    postalCode
  } = customerDetails

  const customerObj={
    businessName,
    billToAddress,
    phone,
    email,
    city,
    responsibleName,
    responsiblePhone,
    secondaryPhone,
    postalCode,
    iD:''
  }
  // console.log(businessName, ownerFirstName, ownerLastName, billToAddress, phone, email, city, postalCode);

  firebase.firestore().collection("Customer").add(customerObj)
    .then((response) => {
      console.log('respnse', response.id)
      firebase.firestore().collection("Customer").doc(response.id).update({'iD': response.id})

      console.log('customer response', response.id);
      message.success('Customer Created')
    }).catch((error) => {
      console.log('Error', error.message)
      message.error(error.message)
    })
}

const getSpecificData = (id , Cname) => {
  
  return firebase
    .firestore()
    .collection(Cname)
    .where("iD", "==", id)
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
      // setCompanyList(comlist);
      // setInitialCompany(comlist);
      // console.log('data-------->', comlist)
      return comlist
    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
    });
}

const UpdateCustomer = (customerDetail, id) => {
  // console.log('firebase=======>',customerDetail, id)
  firebase.firestore().collection("Customer").doc(id)
          .update({
            businessName: customerDetail.businessName,
            companyName: customerDetail.companyName,
            state: customerDetail.state,
            city: customerDetail.city,
            billToAddress: customerDetail.billToAddress,
            postalCode: customerDetail.postalCode,
            phone:customerDetail.phone,
            email:customerDetail.email,
            secondaryPhone: customerDetail.secondaryPhone,
            responsibleName: customerDetail.responsibleName,
            responsiblePhone: customerDetail.responsiblePhone
          })
          .then(()=>{
            message.success('Data updated')
          })
          .catch((error) => {
            message.error(error.message)
          })
}

const UpdateVendor = (vendorDetail, id) => {
  // console.log('vendorDetail, id--------->', vendorDetail, id)
  firebase.firestore().collection("Vendor").doc(id)
          .update({
            address: vendorDetail.address,
            ownerFirstName: vendorDetail.ownerFirstName,
            ownerLastName: vendorDetail.ownerLastName,
            companyName: vendorDetail.companyName,
            state: vendorDetail.state,
            city: vendorDetail.city,
            postalCode: vendorDetail.postalCode,
            phone:vendorDetail.phone,
            email:vendorDetail.email
          })
          .then(()=>{
            message.success('Data updated')
          })
          .catch((error) => {
            message.error(error.message)
          })
}  

const CreateRFQ = (newList,RFQiD,fullDate,selectVednor)=>{
console.log('Create Rfq Utils',newList,RFQiD,fullDate,selectVednor)
const RfqObj={
  newList,
  RFQiD,
  fullDate,
  selectVednor
}
firebase.firestore().collection('RFQ').add(RfqObj)
.then((response)=>{
  console.log('Firebase response RFQ', response)
})
.catch((error)=>{
  console.log('Error MEssage', error.message)
})
}

export {
  createUser,
  loginUser,
  getUserData,
  createVendor,
  createNewCustomer,
  getSpecificData,
  UpdateCustomer,
  UpdateVendor,
  CreateRFQ
}