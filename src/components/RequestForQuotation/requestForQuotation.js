import React, { useState, useEffect } from 'react'
import firebase from '../../config/Firebase/firebase'
import { Label } from '../Textbox/style/index'
import {
  Divider,
  message,
  Row,
  Col,
  Input,
  Button
} from 'antd'

const RequestForQuatation = () => {
  const [allVendorsName, setAllVendorsName] = useState([])
  const [items, setItems] = useState()
  const [quantity, setQuantity] = useState()
  const [itemsList, setItemsList] = useState([])
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
        comlist.map((items, key) => {
          return setAllVendorsName(items)
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

  const today = new Date()
  // let date = today.getDate();
  // let month = today.getMonth() +1;
  let year = today.getFullYear();
  let todayDate = String(today.getDate()).padStart(2, '0')
  let todayMonth = String(today.getMonth()).padStart(2, '0')
  const fullDate = `${todayDate}/${todayMonth}/${year}`
  const shortid = require('shortid');

  const CreateList = () => {
    setItemsList([...itemsList, [ items, quantity ]])
    setItems('')
    setQuantity('')
  }
  console.log('itemsList----------->', itemsList)

  const deleteItem = (id) => {
    const newList = itemsList.filter((item) => item.id !== id);
    setItemsList(newList);
  }
 console.log('new list ', itemsList)

  return (
    <div>
      <h1>Request For Quotation</h1>
      <Divider />
      <Row gutter={[10, 10]}>
        <Col xs={24} sm={12}>
          <h4>Date: {fullDate}</h4>
        </Col>
        <Col xs={24} sm={12}>
          <h4>RFQ-ID: {shortid.generate()}</h4>
        </Col>
      </Row>
      <Row gutter={[10, 10]}>
        <Col xs={24} sm={24}>
          <Label> Compnay Address:
            <Input
              type='text'
              disabled
            />
          </Label>
        </Col>
      </Row>
      <Divider>Add Items with quantity</Divider>
      <Row gutter={[10, 10]}>
        <Col xs={24} sm={10}>
          <Input
            type='text'
            placeholder='Enter item name'
            value={items}
            onChange={e => setItems(e.target.value)}
          />
        </Col>
        <Col xs={24} sm={10}>
          <Input
            type='number'
            placeholder='Enter number of Quantity'
            value={quantity}
            onChange={e => setQuantity(e.target.value)}
          />
        </Col>
        <Col xs={24} sm={4}>

          <Button onClick={CreateList}>Add</Button>
        </Col>

      </Row>
      <Row>
        <Col xs={24} sm={12}>
          <Button>Create RFQ</Button>
        </Col>
      </Row>
      <ul>
        {
          itemsList.map((item, key)=>{
            return(
              <>
              <li key={key}>
                {item}
              </li>
              <li><Button onClick={() => deleteItem(key)}>delete</Button></li>
              </>
            )
          })
        }
      </ul>
    </div>
  )
}
export default RequestForQuatation