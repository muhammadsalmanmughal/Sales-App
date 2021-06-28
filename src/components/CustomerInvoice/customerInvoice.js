import React, { useState, useEffect } from 'react'
import { getCustomerOrder, getOrdersById, CreateRecord,UpdateStatus } from '../../Utils/utils'
import { Row, Col, List, Button, Tag, Select, Divider, message } from 'antd';
import { H3, Title, Paragraph, } from '../../Utils/styles'
import { Details } from './style'

const CustomerInvoice = () => {
    const [customerOrders, setCustomerOrders] = useState()
    const [orderDetails, setOrderDetails] = useState()
    const [orderItems, setOrderItems] = useState()

    useEffect(() => {
        getCustomerOrder().then(data => {
            setCustomerOrders(data)
        })
    }, [])

    const shortid = require('shortid')
    const invoiceId = shortid.generate()
    let current_datetime = new Date()
    let currentDate = current_datetime.getDate() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getFullYear()

    const getOrderDetails = (id) => {
        getOrdersById(id).then(data => {
            setOrderDetails(data)
            setOrderItems(data?.flatMap(items => items.itemsList))
        })
    }

    const invoiceTotal = orderItems && orderItems.reduce((acc, current) => {
        return acc + parseInt(current.itemPrice)
    }, 0);

    const createInvoice = () => {
        if (!orderDetails || !orderItems) return message.error('Error! Select customer id to retreive data')
        if (orderDetails && orderDetails[0].Status == 'Finished') return message.error('Invoice Aleardy Created')
        const InvoiceObject = {
            InvoiceId: invoiceId,
            CustomerName: orderDetails && orderDetails[0].CustomerName,
            CompanyName: orderDetails && orderDetails[0].CompanyName,
            Phone: orderDetails && orderDetails[0].Phone,
            Address: orderDetails && orderDetails[0].BillToAddress,
            City: orderDetails && orderDetails[0].City,
            State: orderDetails && orderDetails[0].State,
            PostalCode: orderDetails && orderDetails[0].PostalCode,
            InvoiceCreateDate: currentDate,
            CustomerOrderId: orderDetails && orderDetails[0].orderID,
            OrderCreated: orderDetails && orderDetails[0].currentDate,
            OrderRequiredDate: orderDetails && orderDetails[0].requiredDate,
            UserName: orderDetails && orderDetails[0].UserName,
            UserEmail: orderDetails && orderDetails[0].UserEmail,
            OrderItems: orderItems,
            TotalAmount: invoiceTotal
        }
        CreateRecord(InvoiceObject, 'Invoices', 'Your Invoice has been created')
        UpdateStatus('Customer_Order', 'Finished', orderDetails?.[0].iD)
        setOrderDetails('')
        setOrderItems('')
    }
    return (
        <div>
            <Title>Customer Invoice</Title>
            <Row gutter={[10, 10]}>
                <Col><Paragraph>Date:</Paragraph></Col>
                <Col>{currentDate}</Col>
            </Row>
            <Row gutter={[10, 10]}>
                <Col><Paragraph>Invoice Number:</Paragraph></Col>
                <Col>{invoiceId}</Col>
            </Row>
            <Row gutter={[10, 10]}>
                <Col xs={24} sm={6}>
                    <Select
                        placeholder='Select Order Id'
                        style={{ width: 200 }}
                        onChange={orderId => getOrderDetails(orderId)}
                    >
                        {customerOrders && customerOrders.map(item => <Select.Option
                            value={item.orderID}
                        >
                            {item.orderID}
                        </Select.Option>
                        )}
                    </Select>
                </Col>
            </Row>
            <Details>
                <div>
                    <Row gutter={[10, 10]}>
                        <Col><Paragraph>Customer Name: </Paragraph></Col>
                        <Col>{orderDetails && orderDetails[0].CustomerName}</Col>
                    </Row>
                    <Row gutter={[10, 10]}>
                        <Col><Paragraph>CompanyName Name: </Paragraph></Col>
                        <Col>{orderDetails && orderDetails[0].CompanyName}</Col>
                    </Row>
                    <Row gutter={[10, 10]}>
                        <Col><Paragraph>Phone: </Paragraph></Col>
                        <Col>{orderDetails && orderDetails[0].Phone}</Col>
                    </Row>
                    <Row gutter={[10, 10]}>
                        <Col><Paragraph>Address: </Paragraph></Col>
                        <Col>{orderDetails && orderDetails[0].BillToAddress}</Col>
                    </Row>
                    <Row gutter={[10, 10]}>
                        <Col><Paragraph>City: </Paragraph></Col>
                        <Col>{orderDetails && orderDetails[0].City}</Col>
                    </Row>
                    <Row gutter={[10, 10]}>
                        <Col><Paragraph>State: </Paragraph></Col>
                        <Col>{orderDetails && orderDetails[0].State}</Col>
                    </Row>
                    <Row gutter={[10, 10]}>
                        <Col><Paragraph>Postal Code: </Paragraph></Col>
                        <Col>{orderDetails && orderDetails[0].PostalCode}</Col>
                    </Row>
                    <Row gutter={[10, 10]}>
                        <Col><Paragraph>Order Is: </Paragraph></Col>
                        <Col>
                            <Tag color={orderDetails&& orderDetails[0].Status == 'In-Progress' ? 'orange' : 'green'}>
                                {orderDetails&& orderDetails[0].Status}
                            </Tag>
                        </Col>
                    </Row>
                </div>
                <div>
                    <Row gutter={[10, 10]}>
                        <Col><Paragraph>Order Id: </Paragraph></Col>
                        <Col>{orderDetails && orderDetails[0].orderID}</Col>
                    </Row>
                    <Row gutter={[10, 10]}>
                        <Col><Paragraph>Order Creation: </Paragraph></Col>
                        <Col>{orderDetails && orderDetails[0].currentDate}</Col>
                    </Row>
                    <Row gutter={[10, 10]}>
                        <Col><Paragraph>Order Required: </Paragraph></Col>
                        <Col>{orderDetails && orderDetails[0].requiredDate}</Col>
                    </Row>
                    <Row gutter={[10, 10]}>
                        <Col><Paragraph>User Name: </Paragraph></Col>
                        <Col>{orderDetails && orderDetails[0].UserName}</Col>
                    </Row>
                    <Row gutter={[10, 10]}>
                        <Col><Paragraph>User Email: </Paragraph></Col>
                        <Col>{orderDetails && orderDetails[0].UserEmail}</Col>
                    </Row>
                </div>
            </Details>
            <Divider><H3>Item List</H3></Divider>
            <List
                size='small'
                itemLayout="horizontal"
                bordered
                header={<H3>Order Items</H3>}
                dataSource={orderItems}
                style={{ marginTop: '15px', transistion: '1s' }}
                renderItem={items => (
                    <List.Item>
                        <List.Item>
                            <Paragraph>Item Name: <Tag color='geekblue' style={{ marginLeft: '5px', marginRight: '5px' }}>{items.item}</Tag> </Paragraph>
                            <Paragraph>Item Quantity: <Tag color='green' style={{ marginLeft: '5px', marginRight: '5px' }}>{items.quantity}</Tag> </Paragraph>
                            <Paragraph>Item TotalPrice: <Tag color='blue' style={{ marginLeft: '5px', marginRight: '5px' }}>{items.itemPrice}</Tag></Paragraph>

                        </List.Item>
                    </List.Item>
                )}
            />
            <Row gutter={[10, 10]}>
                <Col>Total Amount:</Col>
                <Col><Paragraph><Tag color='#87d068'>{invoiceTotal} Rs.</Tag></Paragraph></Col>
            </Row>

            <Row>
                <Button onClick={createInvoice}>Create Invoice</Button>
            </Row>
        </div>
    )
}
export default CustomerInvoice