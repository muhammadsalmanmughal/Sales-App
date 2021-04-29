import firebase from '../config/Firebase/firebase'
import 'antd/dist/antd.css';
import { message,notification } from 'antd';

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
    iD: ''
  }

  firebase.firestore().collection("Vendor").add(
    vendorObj
  )
    .then((response) => {
      console.log('respnse', response.id)
      firebase.firestore().collection("Vendor").doc(response.id).update({ 'iD': response.id })

      message.success('Vendor Created')
    }).catch((error) => {
      console.log('Error', error.message)
      message.error(error.message)
    })

}

const getAllVendors = () => {
  return new Promise((resolve, reject) => {
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
          }
          else {
            reject(alert('no data in vendors'))
          }
        });
        resolve(vendorList)
      });
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

  const customerObj = {
    businessName,
    billToAddress,
    phone,
    email,
    city,
    responsibleName,
    responsiblePhone,
    secondaryPhone,
    postalCode,
    iD: ''
  }
  // console.log(businessName, ownerFirstName, ownerLastName, billToAddress, phone, email, city, postalCode);

  firebase.firestore().collection("Customer").add(customerObj)
    .then((response) => {
      console.log('respnse', response.id)
      firebase.firestore().collection("Customer").doc(response.id).update({ 'iD': response.id })

      console.log('customer response', response.id);
      message.success('Customer Created')
    }).catch((error) => {
      console.log('Error', error.message)
      message.error(error.message)
    })
}

const getSpecificData = (id, Cname) => {

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
      phone: customerDetail.phone,
      email: customerDetail.email,
      secondaryPhone: customerDetail.secondaryPhone,
      responsibleName: customerDetail.responsibleName,
      responsiblePhone: customerDetail.responsiblePhone
    })
    .then(() => {
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
      phone: vendorDetail.phone,
      email: vendorDetail.email
    })
    .then(() => {
      message.success('Data updated')
    })
    .catch((error) => {
      message.error(error.message)
    })
}

const UpdatePOStatus = (status, id) => {
  firebase.firestore().collection("PurchaseOrder").doc(id)
    .update({
      POStatus: status
    })
}
const CreateRFQ = (newList, RFQiD, fullDate) => {
  console.log('Create Rfq Utils', newList, RFQiD, fullDate)
  const RfqObj = {
    newList,
    RFQiD,
    fullDate
  }
  firebase.firestore().collection('RFQ').add(RfqObj)
    .then((response) => {
      message.success('RFQ created')
    })
    .catch((error) => {
      message.error(error.message)
    })
}

const CreatePurchaseOrder = (newList, POiD, createdDate, requriedDate, selectVendor, POStatus) => {
  // console.log('Purchase Order Data', newList, POiD, createdDate, requriedDate, selectVendor)
  const PO_object = {
    newList,
    POiD,
    createdDate,
    requriedDate,
    selectVendor,
    POStatus: 'Not Defined',
    remaining: 0
  }
  console.log('PO_object', PO_object);
  firebase.firestore().collection('PurchaseOrder').add(PO_object)
    .then((response) => {
      firebase.firestore().collection("PurchaseOrder").doc(response.id).update({ 'iD': response.id })
      message.success('Purchase order created')
    })
    .catch((error) => {
      message.error(error.message)
    })
}

const getPODetails = (id) => {
  return firebase
    .firestore()
    .collection('PurchaseOrder')
    .where("iD", "==", id)
    .get()
    .then(function (querySnapshot) {
      // console.log('querySnapshot', querySnapshot)
      const PODetails = [];
      querySnapshot.forEach(function (doc) {
        if (doc.exists) {
          const comp = doc.data();
          PODetails.push({ ...comp, compId: doc.id });
        } else {
          message.info("No such document!");
        }
      });
      // setCompanyList(PODetails);
      // setInitialCompany(PODetails);
      // console.log('data-------->', PODetails)
      return PODetails
    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
    });
}

const CreateInventory = (itemsObj) => {

  console.log('itemData----firebase', itemsObj);
  firebase.firestore().collection('Item_Master').add(itemsObj)
    .then((response) => {
      firebase.firestore().collection("Item_Master").doc(response.id).update({ 'iD': response.id })

      message.success('Items added succesfully')
    })
    .catch((error) => {
      message.error(error.message)
    })
}
const getItemsId = (itemName) => {
  return firebase
    .firestore()
    .collection('Item_Master')
    .where("itemsName", "==", itemName)
    .get()
    .then(function (querySnapshot) {
      // console.log('querySnapshot', querySnapshot)
      const itemID = [];
      querySnapshot.forEach(function (doc) {
        if (doc.exists) {
          const comp = doc.data();
          itemID.push({ ...comp, compId: doc.id });
        } else {
          message.info("No such document!");
        }
      });
      // setCompanyList(itemID);
      // setInitialCompany(itemID);
      // console.log('data-------->', itemID)
      return itemID
    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
    });
}
const getInentoryDetails = (id) => {

  return firebase
    .firestore()
    .collection('Item_Master')
    .where("iD", "==", id)
    .get()
    .then(function (querySnapshot) {
      // console.log('querySnapshot', querySnapshot)
      const inventoryItem = [];
      querySnapshot.forEach(function (doc) {
        if (doc.exists) {
          const comp = doc.data();
          inventoryItem.push({ ...comp, compId: doc.id });
        } else {
          message.info("No such document!");
        }
      });
      // setCompanyList(inventoryItem);
      // setInitialCompany(inventoryItem);
      // console.log('data-------->', inventoryItem)
      return inventoryItem
    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
    });
}

const getAllInventoryItems = () => {
  return new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection("Item_Master")
      .onSnapshot(function (querySnapshot) {
        const allInventoryItems = [];
        querySnapshot.forEach(function (doc) {
          console.log('functions Doc', doc.data)
          if (doc.exists) {
            const comp = doc.data();
            allInventoryItems.push({ ...comp, compId: doc.id });
          } else {
            reject(message.info('No data to show.'))
            // alert("No such document!");
            // <EmptyDiv>
            //     <Empty/>
            // </EmptyDiv>
            // setIsVendor(false)
          }
        });
        resolve(allInventoryItems)
      });
  })
}

const getInventoryItemData = (itemName) => {
  const val = itemName && itemName
  console.log('getInventoryItemData is called', val)
  if (itemName) {
    return new Promise((resolve, reject) => {
      firebase
        .firestore()
        .collection('Item_Master')
        .where("itemsName", "==", itemName)
        .get()
        .then(function (querySnapshot) {
          // console.log('querySnapshot', querySnapshot)
          const comlist = [];
          querySnapshot.forEach(function (doc) {
            if (doc.exists) {
              const comp = doc.data();
              comlist.push({ ...comp, compId: doc.id });
            } else {
              reject(message.info("No such document!"))
            }
          });
          resolve(comlist)
        })
        .catch(function (error) {
          console.log("Error getting documents: ", error);
        });
    }
    )
  }
}

const updateInventoryItem = (docId, increaseBy, itemName) => {
  console.log('utils fjasdfa itemID', docId, increaseBy);
  const docRef = firebase.firestore().collection("Item_Master").doc(docId)
  docRef.get().then(function (doc) {
    let cT = doc.data().quantity + increaseBy
    docRef.update({
      quantity: cT,
    });
    message.success(`Item ${itemName} is increase with quantity ${increaseBy}`)
  });
}
const createGoodReceipt = (GRdata) => {
console.log('Good Receipt ', GRdata)
}
function CapitalizeWords(str) {
  // return str[0].toUpperCase()+str.slice(1)
  if (typeof str === 'string') {
    return str.replace(/^\w/, c => c.toUpperCase());
  } else {
    return '';
  }
}
export {
  createUser,
  loginUser,
  getInentoryDetails,
  getAllInventoryItems,
  getInventoryItemData,
  getItemsId,
  updateInventoryItem,
  createVendor,
  getAllVendors,
  createNewCustomer,
  getSpecificData,
  UpdateCustomer,
  UpdateVendor,
  CreateRFQ,
  CreatePurchaseOrder,
  getPODetails,
  UpdatePOStatus,
  CreateInventory,
  CapitalizeWords,
  createGoodReceipt
}