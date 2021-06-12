import React, { useState, useContext } from 'react'
import { Label } from '../Textbox/style/index'
import { VendorCustomerContext } from '../../context/Random/random'
import { CreateRFQ } from '../../Utils/utils'
import {
  Title,
  ListItem,
  ItemDiv,
  QuantityAndButtonDiv,
  Quantity,
  DeleteButton
} from '../../Utils/styles'
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
  const [items, setItems] = useState()
  const [quantity, setQuantity] = useState()
  const [itemsList, setItemsList] = useState([])
  const [radioValue, setRadioValue] = useState('A-class');
  // const { vendors } = useContext(VendorCustomerContext)

  const shortid = require('shortid')
  const RFQiD = shortid.generate()

  const selectQuality = e => {
    setRadioValue(e.target.value);
  };
console.log('items',items);
console.log('quantity',quantity);

const utc = new Date().toJSON().slice(0, 10).replace(/-/g, '/');

  const CreateList = () => {
    if (items == null) {
      message.error('Items can not left Empty')
    }
    else if (isNaN(quantity) || quantity.length > 2) {
      message.error('Quantity amount not support')
    }

    else {
      setItemsList([...itemsList, { items, quantity, radioValue }])
      setItems('')
      setQuantity('')
    }
  }
  const deleteItem = (id) => {
    const newList = [...itemsList]
    newList.splice(id, 1)
    setItemsList(newList);
  }

  const generateRFQ = () => {
      CreateRFQ(itemsList, RFQiD, utc)
      setItemsList([])
  }
  console.log('itemList', itemsList);
  return (
    <div>
      <Title>Request For Quotation</Title>
      <Row gutter={[10, 10]}>
        <Col xs={24} sm={8}>
          <h4>
            RFQ-ID:{RFQiD}
          </h4>
        </Col>
        <Col xs={24} sm={12}>
          <h4>Date: {utc}</h4>
        </Col>
      </Row>
      <Row gutter={[10, 10]}>
        
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
            maxLength={20}
          />
        </Col>
        <Col xs={24} sm={4}>
          <Input
            type='number'
            placeholder='Enter number of Quantity'
            value={quantity}
            onChange={e => setQuantity(e.target.value)}
            maxLength={2}
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
                <ListItem key={key} xs={24} sm={12}>
                  <ItemDiv>
                    {item.items}
                  </ItemDiv>
                  <QuantityAndButtonDiv>
                    <Quantity>
                      {item.quantity}/
                      {item.radioValue}
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
          <Button onClick={generateRFQ}>Create RFQ</Button>
        </Col>
      </Row>
    </div>
  )
}
export default RequestForQuatation