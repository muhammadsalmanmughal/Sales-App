import React, { useState, useEffect } from 'react'
import firebase from '../../config/Firebase/firebase'
import { Label } from '../Textbox/style/index'
import Id from '../ShortID/id';
import {
  ListItem,
  ItemDiv,
  QuantityAndButtonDiv,
  Quantity,
  DeleteButton
} from './style/index'
import {
  Divider,
  message,
  Row,
  Col,
  Input,
  Button,
  Radio,
  Select
} from 'antd'

const RequestForQuatation = () => {
  const [allVendorsName, setAllVendorsName] = useState([])
  const [items, setItems] = useState()
  const [quantity, setQuantity] = useState()
  const [itemsList, setItemsList] = useState([])
  const [radioValue, setRadioValue] = React.useState('A-class');

  const {Option} = Select;
  function handleChange(value) {

    console.log(`selected----> ${value}`);
  }

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
        // comlist.map((items, key) => {
        return setAllVendorsName(comlist)
        // return setAllVendorsName(items.companyName)
        // })
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

  const selectQuality = e => {
    console.log('radio checked', e.target.value);
    setRadioValue(e.target.value);
  };

  const today = new Date()
  let year = today.getFullYear();
  let todayDate = String(today.getDate()).padStart(2, '0')
  let todayMonth = String(today.getMonth()).padStart(2, '0')
  const fullDate = `${todayDate}/${todayMonth}/${year}`


  const CreateList = () => {
    setItemsList([...itemsList, [items, quantity, radioValue]])
    setItems('')
    setQuantity('')
  }
  // console.log('old itemsList----------->', itemsList)

  const deleteItem = (id) => {
    const newList = [...itemsList]
    newList.splice(id, 1)
    // itemsList.filter((item) => item.id !== id);
    setItemsList(newList);
  }
  // console.log('new list ', itemsList)
  console.log('all vendors------------>', allVendorsName)
  return (
    <div>
      <h1>Request For Quotation</h1>
      <Divider />
      <Row gutter={[10, 10]}>
        <Col xs={24} sm={16}>
          <label>Select Vender: </label>
          <Select xs={24} sm={16} style={{width:'200px'}} 
          onChange={handleChange}
          // onSelect={e => console.log(e.target.value)}
          >
            {allVendorsName && allVendorsName.map((name, key) => <Select.Option 
            value={name.companyName}
            
            >
                  {name.companyName}
                </Select.Option>
              
            )}

          </Select>
        </Col>
      </Row>
      <Row gutter={[10, 10]}>
        <Col xs={24} sm={12}>
          <h4>Date: {fullDate}</h4>
        </Col>
        <Col xs={24} sm={12}>
          <h4>RFQ-ID: <Id /></h4>
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
        <Col xs={24} sm={8}>
          <Input
            type='text'
            placeholder='Enter item name'
            value={items}
            onChange={e => setItems(e.target.value)}
          />
        </Col>
        <Col xs={24} sm={4}>
          <Input
            type='number'
            placeholder='Enter number of Quantity'
            value={quantity}
            onChange={e => setQuantity(e.target.value)}
          />
        </Col>
        <Col xs={24} sm={6}>
          <Radio.Group onChange={selectQuality} value={radioValue}>
            <Radio value={'A-class'}>A</Radio>
            <Radio value={'B-class'}>B</Radio>
            <Radio value={'C-class'}>C</Radio>
          </Radio.Group>
        </Col>
        <Col xs={24} sm={4}>

          <Button onClick={CreateList}>Add</Button>
        </Col>

      </Row>

      <ul>
        {
          itemsList.map((item, key) => {
            return (
              <>
                {console.log('item', item[0])}
                <ListItem key={key} xs={24} sm={12}>
                  <ItemDiv>
                    {item[0]}
                  </ItemDiv>
                  <QuantityAndButtonDiv>
                    <Quantity>
                      {item[1]}/
                      {item[2]}
                    </Quantity>
                    <DeleteButton>
                      <Button danger onClick={() => deleteItem(key)}>Delete</Button>
                    </DeleteButton>
                  </QuantityAndButtonDiv>

                </ListItem>
              </>
            )
          })
        }
      </ul>
      <Row>
        <Col xs={24} sm={12}>
          <Button>Create RFQ</Button>
        </Col>
      </Row>
    </div>
  )
}
export default RequestForQuatation