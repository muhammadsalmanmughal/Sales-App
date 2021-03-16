import React, { useState, useContext } from 'react'
import { VendorCustomerContext } from '../../context/Random/random'
import { CreatePurchaseOrder } from '../../Utils/utils'
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
import {
    ListItem,
    ItemDiv,
    QuantityAndButtonDiv,
    Quantity,
    DeleteButton
} from '../RequestForQuotation/style/index'

const PurchaseOrder = () => {
    const [selectedVendor, setSelectedVendor] = useState()
    const [items, setItems] = useState()
    const [quantity, setQuantity] = useState()
    const [itemsList, setItemsList] = useState([])
    const [radioValue, setRadioValue] = useState('A-class');
    const { vendors } = useContext(VendorCustomerContext)


    const utc = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
    const shortid = require('shortid')
    const POiD = shortid.generate()

    function selectVednor(value) {
        // console.log(`selected----> ${value}`);
        setSelectedVendor(value)
    }
    const CreateList = () => {
        // setIsDisabled(false)
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
    const selectQuality = e => {
        // console.log('radio checked', e.target.value);
        setRadioValue(e.target.value);
    };
    const generatePurchaseOrder = () => {
        CreatePurchaseOrder(itemsList, POiD, utc, selectedVendor)
        setItemsList([])
    }
    return (
        <div>
            <h1>Purchase Order</h1>
            <Divider />
            <Row gutter={[10, 10]}>
                <Col xs={24} sm={20}>
                    <h4>
                        RFQ-ID:{POiD}
                    </h4>
                </Col>
                <Col xs={24} sm={4}>
                    <h4>Date: {utc}</h4>
                </Col>
            </Row>
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

                    <Button
                        onClick={CreateList}
                    >Add</Button>
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
                    <Button 
                    onClick={generatePurchaseOrder}
                    >Create Purchase Order</Button>
                </Col>
            </Row>
        </div>
    )
}
export default PurchaseOrder