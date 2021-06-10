import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { getSpecificData, CapitalizeWords,CreateRecord } from '../../Utils/utils'
import { CaretLeftOutlined } from "@ant-design/icons";
import { Goback } from '../../Utils/styles'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { FaRegClipboard } from "react-icons/fa";
import moment from 'moment'

import {
    Divider,
    message,
    Row,
    Col,
    Input,
    Button,
    Tooltip,
    DatePicker
} from 'antd'
import {
    ListItem,
    ItemDiv,
    QuantityAndButtonDiv,
    Quantity,
    DeleteButton,
    H3
} from '../../Utils/styles'

const CustomerOrder = () => {
    const [detailsdData, setDetailsData] = useState(
        {
            BillToAddress: "",
            CustomerName: "",
            City: "",
            compId: "",
            email: "",
            State: '',
            iD: "",
            Phone: '',
            PostalCode: '',
            responsibleName: "",
            responsiblePhone: "",
            secondaryPhone: ""
        }
    )
    const [orderDetails, setOrderDetails] = useState()
    const [itemsList, setItemsList] = useState([])
    const [disable, setDisabled] = useState(false)
    let current_datetime = new Date()
    let currentDate = current_datetime.getDate() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getFullYear()
    const shortid = require('shortid')
    const orderID = shortid.generate()
    const [items, setItems] = useState()
    const [itemQuantity, setItemQuantity] = useState()
    const [requiredDate, setRequiredDate] = useState();

    const { slug, Cname } = useParams()
    const history = useHistory();

    useEffect(() => {
        getSpecificData(slug, Cname).then(data => {
            setDetailsData(data[0])
        })
    }, [])

    useEffect(() => {
        DisableButton()
    }, [itemsList])
    const customerOrder = () => {
        if(!requiredDate) return message.error('Error! Select required date')
        const { CustomerName, CompanyName, Phone, BillToAddress, State, City, PostalCode } = detailsdData

        const customerObeject = {
            CustomerName, CompanyName, Phone, BillToAddress, State, City, PostalCode,
            itemsList, orderID, currentDate,requiredDate
        }
        CreateRecord(customerObeject,'Customer_Order','Customers order has been placed')
        setItemsList([])
        setOrderDetails('')
    }

    const DisableButton = () => {
        if (itemsList.length === 0) return setDisabled(true)
        setDisabled(false)
    }

    function disabledDate(current) {
        return current && current < moment().endOf('day')
    }

    const selectRequiredDate = (date, dateString) => {
        setRequiredDate(dateString)
    }

    const CreateList = () => {
        const quantity = Number(itemQuantity)
        if (items == null) return message.error('Error! Items can not be left Empty')
        if (isNaN(quantity) || quantity.length > 2 || quantity <= 0) return message.error('Error! Quantity amount not support')
        if (!items || !quantity) return message.error('Error! All fields should be filed')
        else {
            const item = CapitalizeWords(items)
            setItemsList([...itemsList, { item, quantity }])
            setItems('')
            setItemQuantity('')
        }
    }

    const deleteItem = (id) => {
        const newList = [...itemsList]
        newList.splice(id, 1)
        setItemsList(newList);
    }
    return (
        <div>
            <Goback onClick={e => history.goBack()}>
                <CaretLeftOutlined /> GoBack
            </Goback>
            <Row gutter={[10, 10]}>
                <Col xs={24} sm={12}>
                    <h2>
                        Customer Order
            </h2>
                </Col>

            </Row>
            <Divider />
            <Row gutter={[10, 10]}>
                <Col>
                    <div style={{ marginBottom: 16 }}>
                        <Input addonAfter={
                            <Tooltip placement="topRight" title='Click to Copy'>
                                <CopyToClipboard text={orderID}>
                                    <FaRegClipboard
                                        onClick={() => alert(orderID)}
                                        style={{ cursor: 'pointer' }}
                                    />
                                </CopyToClipboard>
                            </Tooltip>
                        }
                            value={orderID}
                            disabled
                        />
                    </div>
                </Col>
                <Col xs={24} sm={12}>
                    <h3>
                        Date: {currentDate}
                    </h3>
                </Col>
                <Col >
                    <DatePicker
                        placeholder='Requried Date'
                        format="DD-MM-YYYY"
                        disabledDate={disabledDate}
                        style={{ width: 200 }}
                        onChange={selectRequiredDate}
                    />
                </Col>
            </Row>
            <Row gutter={[10, 10]}>
                <Col xs={24} sm={8}>
                    <h4>Name:</h4>
                    {
                        <h3>{detailsdData.CustomerName}</h3>
                    }
                </Col>
                <Col xs={24} sm={8}>
                    <h4>Company Name:</h4>
                    {
                        <h3>{detailsdData.CompanyName}</h3>
                    }
                </Col>
                <Col xs={24} sm={8}>
                    <h4>Phone:</h4>
                    {
                        <h3>{detailsdData.Phone}</h3>
                    }
                </Col>
            </Row>
            <Row gutter={[10, 10]}>
                <Col xs={24} sm={24}>
                    <h4>Address:</h4>
                    {
                        <h3>{detailsdData.BillToAddress}</h3>
                    }
                </Col>
            </Row>
            <Row gutter={[10, 10]}>
                <Col xs={24} sm={8}>
                    <h4>State</h4>
                    {
                        <h3>{detailsdData.State}</h3>
                    }
                </Col>
                <Col xs={24} sm={8}>
                    <h4>City</h4>
                    {
                        <h3>{detailsdData.City}</h3>
                    }
                </Col>
                <Col xs={24} sm={8}>
                    <h4>Postal Code</h4>
                    {
                        <h3>{detailsdData.PostalCode}</h3>
                    }
                </Col>
            </Row>
            <Divider>
                <H3 style={{ textAlign: 'center' }}>ITEMS</H3>
            </Divider>
            <Row gutter={[10, 10]}>
                <Col xs={24} sm={10}>
                    <Input type='text' value={items} placeholder='Item Name' onChange={e => setItems(e.target.value)} maxLength={25} />
                </Col>
                <Col xs={24} sm={10}>
                    <Input type='text' value={itemQuantity} placeholder='Item Quantity' onChange={e => setItemQuantity(e.target.value)} maxLength={2} />
                </Col>
                <Col xs={24} sm={1}>

                    <Button
                        onClick={CreateList}
                    >Add</Button>
                </Col>
            </Row>
            {/* <Row gutter={[10, 10]}>
                <Col xs={24} sm={24}>
                    <h4>Discription</h4>
                    {
                        <Input.TextArea
                            value={orderDetails}
                            rows={7}
                            onChange={e => setOrderDetails(e.target.value)} />
                    }
                </Col>
            </Row> */}

            <ul>
                {
                    itemsList.map((item, key) => {
                        return (
                            <>
                                <ListItem key={key} xs={24} sm={12}>
                                    <ItemDiv>
                                        {item.item}
                                    </ItemDiv>
                                    <QuantityAndButtonDiv>
                                        <Quantity>
                                            {item.quantity}/
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
            <Row gutter={[10, 10]}>
                <Col xs={24} sm={16}>
                    <Button
                        disabled={disable}
                        onClick={customerOrder}>
                        Create CustomerOrder
                    </Button>
                </Col>
            </Row>
        </div>
    )
}
export default CustomerOrder