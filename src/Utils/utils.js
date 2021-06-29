import firebase from '../config/Firebase/firebase'
import 'antd/dist/antd.css'
import { message } from 'antd'

const createUser = async (email, password, name, img) => {
  if (email == '' || password == '' || name == '') {
    message.error('Data is not in correct format')
  } else if (img == null) {
    message.error('upload an image')
  } else {
    return await firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then((u) => {
        const storageRef = firebase.storage().ref(`images/${img.name}.jpg`)
        storageRef
          .put(img)
          .then((response) => {
            response.ref.getDownloadURL()
              .then((url) => {
                const userId = u.user.uid
                firebase.firestore().collection('Users').doc(userId).set({
                  name,
                  email,
                  url,
                  userId
                })
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
      localStorage.setItem('userId', userId)
      message.success('WelCome')
    })
    .catch(function (error) {
      message.error(error.message)
      throw error
    })

};

const createVendor = (vendorDetails) => {
  const vendorObj = {
    companyName: CapitalizeWords(vendorDetails.companyName),
    ownerFirstName: CapitalizeWords(vendorDetails.ownerFirstName),
    ownerLastName: CapitalizeWords(vendorDetails.ownerLastName),
    CnicNumber: vendorDetails.cnicNumber,
    State: CapitalizeWords(vendorDetails.state),
    Address: vendorDetails.address,
    Phone: vendorDetails.phone,
    Email: vendorDetails.email,
    City: vendorDetails.city,
    PostalCode: vendorDetails.postalCode,
    iD: ''
  }

  firebase.firestore().collection('Vendor').add(
    vendorObj
  )
    .then((response) => {
      firebase.firestore().collection('Vendor').doc(response.id).update({ iD: response.id })
      message.success('Vendor Created')
    }).catch((error) => {
      message.error(error.message)
    })
}

const getAllVendors = () => {
  return new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection('Vendor')
      .onSnapshot(function (querySnapshot) {
        const vendorList = []
        querySnapshot.forEach(function (doc) {
          if (doc.exists) {
            const comp = doc.data()
            vendorList.push({ ...comp, compId: doc.id })
          } else {
            reject(alert('no data in vendors'))
          }
        })
        resolve(vendorList)
      })
  })
}

const createNewCustomer = (customerDetails, CustomerId) => {
  const customerObj = {
    CustomerName: CapitalizeWords(customerDetails.customerName),
    CompanyName: CapitalizeWords(customerDetails.companyName),
    Customer_CNIC: customerDetails.cnicNumber,
    BillToAddress: CapitalizeWords(customerDetails.billToAddress),
    Phone: customerDetails.phone,
    Email: customerDetails.email,
    City: CapitalizeWords(customerDetails.city),
    State: CapitalizeWords(customerDetails.state),
    ResponsibleName: CapitalizeWords(customerDetails.responsibleName),
    ResponsiblePhone: customerDetails.responsiblePhone,
    SecondaryPhone: customerDetails.secondaryPhone,
    PostalCode: customerDetails.postalCode,
    customerId: CustomerId,
    iD: ''
  }

  firebase.firestore().collection('Customer').add(customerObj)
    .then((response) => {
      firebase.firestore().collection('Customer').doc(response.id).update({ iD: response.id })
      message.success('Customer Created')
    }).catch((error) => {
      message.error(error.message)
    })
}

const getAllCustomers = () => {
  return new Promise((resolve, reject) => {
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
          else {
            reject(alert('no data in customer'))
          }
        })
        resolve(customerList)
      })
  })
}

const getSpecificData = (id, Cname) => {
  return firebase
    .firestore()
    .collection(Cname)
    .where('iD', '==', id)
    .get()
    .then(function (querySnapshot) {
      const comlist = []
      querySnapshot.forEach(function (doc) {
        if (doc.exists) {
          const comp = doc.data()
          comlist.push({ ...comp, compId: doc.id })
        } else {
          message.info('No such document!')
        }
      })
      return comlist
    })
    .catch(function (error) {
      console.log('Error getting documents: ', error)
    })
}

const UpdateCustomer = (customerDetail, id) => {
  console.log('customerDetail: ', customerDetail);
  firebase.firestore().collection('Customer').doc(id)
    .update({
      CustomerName: customerDetail.CustomerName,
      CompanyName: customerDetail.CompanyName,
      State: customerDetail.State,
      City: customerDetail.City,
      BillToAddress: customerDetail.BillToAddress,
      PostalCode: customerDetail.PostalCode,
      Phone: customerDetail.Phone,
      Email: customerDetail.Email,
      SecondaryPhone: customerDetail.SecondaryPhone,
      ResponsibleName: customerDetail.ResponsibleName,
      ResponsiblePhone: customerDetail.ResponsiblePhone
    })
    .then(() => {
      message.success('Data updated')
    })
    .catch((error) => {
      message.error(error.message)
    })
}

const CreateRecord = (dataObject, collectionName, textMessage) => {
  firebase.firestore().collection(collectionName).add(dataObject)
    .then((response) => {
      firebase.firestore().collection(collectionName).doc(response.id).update({ iD: response.id })
      message.success(textMessage)
    })
    .catch((error) => {
      message.error(error.message)
    })
}

const getCustomerOrder = () => {
  return firebase
    .firestore()
    .collection('Customer_Order')
    .get()
    .then(function (querySnapshot) {
      const customerOrder = []
      querySnapshot.forEach(function (doc) {
        if (doc.exists) {
          const comp = doc.data()
          customerOrder.push({ ...comp, compId: doc.id })
        } else {
          message.info('No such document!')
        }
      })
      return customerOrder
    })
    .catch(function (error) {
      console.log('Error getting documents: ', error)
    })
}

const UpdateOrderDate = (newdate, id) => {
  firebase.firestore().collection('Customer_Order').doc(id)
    .update({
      newOrderDate: newdate,
      // previousDate: previuos,
    })
  message.success(`New Order updated to ${newdate}`)
}

const UpdateVendor = (vendorDetail, id) => {
  firebase.firestore().collection('Vendor').doc(id)
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

const CreatePR = (prData) => {
  const object_PR = {
    RequisitionId: prData.PR_iD,
    RequesterName: CapitalizeWords(prData.requesterName),
    RequesterEmail: prData.requesterEmail,
    RequesterPosition: CapitalizeWords(prData.position),
    CreatedDate: prData.createdDate,
    RequriedDate: prData.requriedDate,
    ItemsList: prData.itemsList,
    Status: 'Not-Defined'
  }
  firebase.firestore().collection('PurchaseRequisitions').add(object_PR)
    .then((response) => {
      firebase.firestore().collection('PurchaseRequisitions').doc(response.id).update({ iD: response.id })
      message.success('Purchase Requisition created')
    })
    .catch((error) => {
      message.error(error.message)
    })
}

const getPrById = (id) => {
  return firebase
    .firestore()
    .collection('PurchaseRequisitions')
    .where('RequisitionId', '==', id)
    .get()
    .then(function (querySnapshot) {
      const comlist = []
      querySnapshot.forEach(function (doc) {
        if (doc.exists) {
          const comp = doc.data()
          comlist.push({ ...comp, compId: doc.id })
        } else {
          message.info('No such document!')
        }
      })
      return comlist
    })
    .catch(function (error) {
      console.log('Error getting documents: ', error)
    })
}

const UpdatePOStatus = (status, id) => {
  firebase.firestore().collection('PurchaseOrder').doc(id)
    .update({
      POStatus: status
    })
}
const UpdateStatus = (collectionName, status, id) => {
  console.log('collectionName,status, id: ', collectionName, status, id);
  firebase.firestore().collection(collectionName).doc(id)
    .update({
      Status: status
    })
  message.success(`Status updated to ${status}`)
}

const UpdatePO = (status, id) => {
  firebase.firestore().collection('PurchaseOrder').doc(id)
    .update({
      GR_against_PO: status
    })
}

const CreateRFQ = (QuoationData) => {
    firebase.firestore().collection('RFQ').add(QuoationData)
    .then((response) => {
      firebase.firestore().collection('RFQ').doc(response.id).update({ iD: response.id })
      message.success('Request for quotation is created')
    })
    .catch((error) => {
      message.error(error.message)
    })
}

const getRFQById = (id) => {
  return firebase
    .firestore()
    .collection('RFQ')
    .where('iD', '==', id)
    .get()
    .then(function (querySnapshot) {
      const goodsReceipt = []
      querySnapshot.forEach(function (doc) {
        if (doc.exists) {
          const comp = doc.data()
          goodsReceipt.push({ ...comp, compId: doc.id })
        } else {
          message.info('No such document!')
        }
      })
      return goodsReceipt
    })
    .catch(function (error) {
      console.log('Error!', error.message)
    })
}

const CreatePurchaseOrder = (PO_Object) => {
  firebase.firestore().collection('PurchaseOrder').add(PO_Object)
    .then((response) => {
      firebase.firestore().collection('PurchaseOrder').doc(response.id).update({ iD: response.id })
      message.success('Purchase order created')
    })
    .catch((error) => {
      message.error(error.message)
    })
}

const getItemsId = (itemName) => {
  return firebase
    .firestore()
    .collection('Item_Master')
    .where('itemsName', '==', itemName)
    .get()
    .then(function (querySnapshot) {
      const itemID = []
      querySnapshot.forEach(function (doc) {
        if (doc.exists) {
          const comp = doc.data()
          itemID.push({ ...comp, compId: doc.id })
        } else {
          message.info('No such document!')
        }
      })
      return itemID
    })
    .catch(function (error) {
      console.log('Error getting documents: ', error)
    })
}

const getAllInventoryItems = () => {
  return new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection('Item_Master')
      .onSnapshot(function (querySnapshot) {
        const allInventoryItems = []
        querySnapshot.forEach(function (doc) {
          if (doc.exists) {
            const comp = doc.data()
            allInventoryItems.push({ ...comp, compId: doc.id })
          } else {
            reject(message.info('No data to show.'))
          }
        })
        resolve(allInventoryItems)
      })
  })
}
const getItemByName = (name) => {
  return firebase
    .firestore()
    .collection('Item_Master')
    .where('itemsName', '==', name)
    .get()
    .then(function (querySnapshot) {
      const goodsReceipt = []
      querySnapshot.forEach(function (doc) {
        if (doc.exists) {
          const comp = doc.data()
          goodsReceipt.push({ ...comp, compId: doc.id })
        } else {
          message.info('No such document!')
        }
      })
      return goodsReceipt
    })
    .catch(function (error) {
      console.log('Error!', error.message)
    })
}

const updateInventoryItem = (docId, increaseBy, itemName) => {
  const docRef = firebase.firestore().collection('Item_Master').doc(docId)
  docRef.get().then(function (doc) {
    const cT = doc.data().quantity + increaseBy
    docRef.update({
      quantity: cT
    })
    message.success(`Item ${itemName} increased by ${increaseBy} quantity`)
  })
}

const GetAllGoodsReceipt = () => {
  return firebase
    .firestore()
    .collection('Goods_Receipts')
    .get()
    .then(function (querySnapshot) {
      const goodsReceipt = []
      querySnapshot.forEach(function (doc) {
        if (doc.exists) {
          const comp = doc.data()
          goodsReceipt.push({ ...comp, compId: doc.id })
        } else {
          message.info('No such document!')
        }
      })
      return goodsReceipt
    })
    .catch(function (error) {
      message.error('Error!', error.message)
    })
}

const getPR = () => {
  return firebase
    .firestore()
    .collection('PurchaseRequisitions')
    .get()
    .then(function (querySnapshot) {
      const prData = []
      querySnapshot.forEach(function (doc) {
        if (doc.exists) {
          const comp = doc.data()
          prData.push({ ...comp, compId: doc.id })
        } else {
          message.info('No such document!')
        }
      })
      return prData
    })
    .catch(function (error) {
      message.error('Error!', error.message)
    })
}

const getDataById = (dbName, id) => {
  return firebase
    .firestore()
    .collection(dbName)
    .where('iD', '==', id)
    .get()
    .then(function (querySnapshot) {
      const goodsReceipt = []
      querySnapshot.forEach(function (doc) {
        if (doc.exists) {
          const comp = doc.data()
          goodsReceipt.push({ ...comp, compId: doc.id })
        } else {
          message.info('No such document!')
        }
      })
      return goodsReceipt
    })
    .catch(function (error) {
      console.log('Error!', error.message)
    })
}
const getAllInvoices = () => {
  return firebase
    .firestore()
    .collection('Invoices')
    .get()
    .then(function (querySnapshot) {
      const allInvoices = []
      querySnapshot.forEach(function (doc) {
        if (doc.exists) {
          const comp = doc.data()
          allInvoices.push({ ...comp, compId: doc.id })
        } else {
          message.info('No such document!')
        }
      })
      return allInvoices
    })
    .catch(function (error) {
      console.log('Error!', error.message)
    })
}
const createDelivery = (deliveryData, id, orderItems) => {
  const objDelivery = {
    CustomerName: CapitalizeWords(deliveryData.name),
    Organization: CapitalizeWords(deliveryData.organization),
    State: CapitalizeWords(deliveryData.state),
    City: CapitalizeWords(deliveryData.city),
    Address: CapitalizeWords(deliveryData.address),
    Phone: deliveryData.phone,
    Alternate_Phone: deliveryData.alternatePhone,
    Email: deliveryData.email,
    PostalCode: deliveryData.postalCode,
    DeliveryId: id,
    DeliveryItems: orderItems
  }
  firebase.firestore().collection('Delivery').add(objDelivery)
    .then((response) => {
      firebase.firestore().collection('Delivery').doc(response.id).update({ iD: response.id })
      message.success('Delivery document created')
    })
    .catch((error) => {
      message.error(error.message)
    })
}

const getAllDeliveries = () => {
  return firebase
    .firestore()
    .collection('Delivery')
    .get()
    .then(function (querySnapshot) {
      const deliveryData = []
      querySnapshot.forEach(function (doc) {
        if (doc.exists) {
          const comp = doc.data()
          deliveryData.push({ ...comp, compId: doc.id })
        } else {
          message.info('No such document!')
        }
      })
      return deliveryData
    })
    .catch(function (error) {
      console.log('Error!', error.message)
    })
}

const CreateBom = (Id, Name, Type, Date, List) => {
  const objectBOM = {
    BomId: Id,
    BomName: CapitalizeWords(Name),
    BomType: Type,
    BomDate: Date,
    List
  }
  firebase.firestore().collection('BillOfMaterial').add(objectBOM)
    .then((response) => {
      firebase.firestore().collection('BillOfMaterial').doc(response.id).update({ iD: response.id })
      message.success('BOM created')
    })
    .catch((error) => {
      message.error(error.message)
    })
}
const GetAllBom = () => {
  return firebase
    .firestore()
    .collection('BillOfMaterial')
    .get()
    .then(function (querySnapshot) {
      const allInvoices = []
      querySnapshot.forEach(function (doc) {
        if (doc.exists) {
          const comp = doc.data()
          allInvoices.push({ ...comp, compId: doc.id })
        } else {
          message.info('No such document!')
        }
      })
      return allInvoices
    })
    .catch(function (error) {
      console.log('Error!', error.message)
    })
}

const getProductionOrders = () => {
  return firebase
    .firestore()
    .collection('Production_Orders')
    .get()
    .then(function (querySnapshot) {
      const orderData = []
      querySnapshot.forEach(function (doc) {
        if (doc.exists) {
          const comp = doc.data()
          orderData.push({ ...comp, compId: doc.id })
        } else {
          message.info('No such document!')
        }
      })
      return orderData
    })
    .catch(function (error) {
      console.log('Error getting documents: ', error)
    })
}

const UpdateProductionStatus = (status, id) => {
  firebase.firestore().collection('Production_Orders').doc(id)
    .update({
      OrderStatus: status
    })
}
const UpdateItemStatus = (status, id) => {
  firebase.firestore().collection('Production_Orders').doc(id)
    .update({
      ItemStatus: status
    })
}
const getOrdersById = (id) => {
  return firebase
    .firestore()
    .collection('Customer_Order')
    .where('orderID', '==', id)
    .get()
    .then(function (querySnapshot) {
      const orderData = []
      querySnapshot.forEach(function (doc) {
        if (doc.exists) {
          const comp = doc.data()
          orderData.push({ ...comp, compId: doc.id })
        } else {
          message.info('No such document!')
        }
      })
      return orderData
    })
    .catch(function (error) {
      console.log('Error getting documents: ', error)
    })
}

function CapitalizeWords(str) {
  // return str[0].toUpperCase()+str.slice(1)
  if (typeof str === 'string') {
    return str.replace(/^\w/, c => c.toUpperCase())
  } else {
    return ''
  }
}
export {
  createUser,
  loginUser,
  getAllInventoryItems,
  getItemsId,
  getItemByName,
  updateInventoryItem,
  createVendor,
  getAllVendors,
  createNewCustomer,
  getCustomerOrder,
  UpdateOrderDate,
  getAllCustomers,
  getSpecificData,
  UpdateCustomer,
  UpdateVendor,
  CreatePR,
  getPrById,
  CreateRFQ,
  getRFQById,
  CreatePurchaseOrder,
  UpdatePOStatus,
  CapitalizeWords,
  GetAllGoodsReceipt,
  getAllInvoices,
  createDelivery,
  getAllDeliveries,
  getDataById,
  getPR,
  CreateBom,
  GetAllBom,
  getProductionOrders,
  UpdateProductionStatus,
  UpdateItemStatus,
  CreateRecord,
  getOrdersById,
  UpdateStatus,
  UpdatePO
}