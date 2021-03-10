import React, { useState,useContext } from 'react'
import { Label } from '../Textbox/style/index'
import { VendorCustomerContext } from '../../context/Random/random'
import {CreateRFQ} from '../../Utils/utils'
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
import { generate } from 'shortid'

const RequestForQuatation = () => {
  const [items, setItems] = useState()
  const [quantity, setQuantity] = useState()
  const [itemsList, setItemsList] = useState([])
  const [radioValue, setRadioValue] = useState('A-class');
  const [selectedVendor, setSelectedVendor] = useState() 
  const {vendors} = useContext(VendorCustomerContext)

  const shortid = require('shortid')
  const RFQiD = shortid.generate()

  const { Option } = Select;

  function selectVednor(value) {
    console.log(`selected----> ${value}`);
    setSelectedVendor(value)
  }


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
    setItemsList([...itemsList, {items, quantity, radioValue}])
    setItems('')
    setQuantity('')
  }

  const deleteItem = (id) => {
    const newList = [...itemsList]
    newList.splice(id, 1)
    setItemsList(newList);
  }

  const generateRFQ =() => {
    CreateRFQ(itemsList,RFQiD,fullDate,selectedVendor)
  }
  console.log('itemList', itemsList);
  return (
    <div>
      <h1>Request For Quotation</h1>
      <Divider />
      <Row gutter={[10, 10]}>
        <Col xs={24} sm={16}>
          <label>Select Vender: </label>
          <Select xs={24} sm={16} style={{ width: '200px' }}
            onChange={selectVednor}
          >
            {vendors && vendors.map((name, key) => <Select.Option
              value={name.companyName}
            >
              {name.companyName}
            </Select.Option>
            )}
          </Select>
        </Col>
        <Col xs={24} sm={8}>
          <h4>
            RFQ-ID:{RFQiD}
          </h4>
        </Col>
      </Row>
      <Row gutter={[10, 10]}>
        <Col xs={24} sm={12}>
          <h4>Date: {fullDate}</h4>
        </Col>
        <Col xs={24} sm={12}>
          {/* <h4>RFQ-ID: <Id /></h4> */}
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
        {/* {
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
        } */}
      </ul>
      <Row>
        <Col xs={24} sm={12}>
          <Button onClick={generateRFQ}>Create RFQ</Button>
        </Col>
      </Row>
    </div>
  )
}
export default RequestForQuatation