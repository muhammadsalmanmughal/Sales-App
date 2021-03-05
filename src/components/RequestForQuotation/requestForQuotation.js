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

  console.log(shortid.generate());
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
          />
        </Col>
        <Col xs={24} sm={10}>
          <Input type='number' placeholder='Enter number of Quantity' />
        </Col>
        <Col xs={24} sm={2}>

          <Button>Add</Button>
        </Col>

      </Row>
      <Row>
        <Col xs={24} sm={6}>
          <Button>Create RFQ</Button>
        </Col>
      </Row>

    </div>
  )
}
export default RequestForQuatation