import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import { Label } from '../Textbox/style/index'
import { validationSchema } from './validationSchema'
import { SubmitButton, H3, Title } from '../../Utils/styles'
import { FormDiv } from '../Vendor/style/index'
import { createDelivery, getCustomerOrder, getAllDeliveries, getDataById } from '../../Utils/utils'
import ErrorText from '../FormError/formError'
import {
    Input, Tabs, Row, Col, Select, List, message, Table, Skeleton, Modal, Space, Button
} from 'antd'
import { getOrdersById } from '../../Utils/utils'

const Delivery = () => {
    const { TabPane } = Tabs

    const [allOrders, setAllOrders] = useState()
    const [orderList, setOrderList] = useState()
    const [deliveries, setDeliveries] = useState()
    const [deliveryDetails, setDeliveryDetails] = useState()
    const [showModal, setShowModal] = useState(false);

    const current_datetime = new Date()
    const utc = current_datetime.getDate() + '-' + (current_datetime.getMonth() + 1) + '-' + current_datetime.getFullYear()
    const shortid = require('shortid')
    const deliveryId = shortid.generate()

    const initialValues = {
        name: '',
        organization: '',
        address: '',
        city: '',
        state: '',
        postalCode: '',
        phone: '',
        alternatePhone: '',
        email: ''
    }
    const onSubmit = (values, onSubmitProps) => {
        if (!orderItems) return message.error('Error! Select customer Order')
        createDelivery(values, deliveryId, orderItems)
        onSubmitProps.resetForm()
    }

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema,
    })

    useEffect(() => {
        getCustomerOrder().then(data => {
            setAllOrders(data)
        })
        getAllDeliveries().then(data => {
            setDeliveries(data)
        })
    }, [])

    const getCustomerName = (id) => {
        getOrdersById(id).then(data => {
            setOrderList(data)
        })
    }
    const Items = deliveryDetails?.flatMap(d => d.DeliveryItems)
    const orderItems = orderList?.flatMap(list => list.itemsList)

    const DeliveryDetails = (id) => {
        getDataById('Delivery', id).then(data => {
            setDeliveryDetails(data)
        })
        setShowModal(true)
    }

    const customerDetails = [
        {
            title: 'Delivery Id',
            dataIndex: 'DeliveryId',
            key: 'delivery_id',
        },
        {
            title: 'Customer Name',
            dataIndex: 'CustomerName',
            key: 'customer_name',
        },
        {
            title: 'Organization',
            dataIndex: 'Organization',
            key: 'organization',
        },
        {
            title: 'Address',
            dataIndex: 'Address',
            key: 'address',
        },
        {
            title: 'Phone',
            dataIndex: 'Phone',
            key: 'phone',
        },
        {
            title: 'ItemStatus',
            key: 'itemstatus',
            render: (delivery) => (
                <Space size="middle">
                    <Button
                        onClick={e => DeliveryDetails(delivery.iD)}
                    >
                        Details
                    </Button>
                </Space>
            ),
        },
    ]
    const itemDetails = [
        {
            title: 'Item',
            dataIndex: 'item',
            key: 'item_name',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        }
    ]

    return (
        <div>
            <Title>Delivery Document</Title>
            <Tabs defaultActiveKey="1">
                <TabPane tab="Delivery Document" key="1">
                    <form
                        onSubmit={formik.handleSubmit}
                    >
                        <Row>
                            <Col xs={24} sm={6}>
                                <h4>Date: {utc}</h4>
                            </Col>
                            <Col xs={24} sm={6}>
                                <h4>{`Delivery ID: ${deliveryId}`}</h4>
                            </Col>
                            <Col xs={24} sm={6}>
                                <Select
                                    placeholder='Select Production ID'
                                    style={{ width: 200 }}
                                    onChange={e => getCustomerName(e, allOrders.orderID)}
                                >
                                    {allOrders && allOrders.map(item => <Select.Option
                                        value={item.orderID}
                                    >
                                        {item.orderID}
                                    </Select.Option>
                                    )}
                                </Select>
                            </Col>
                        </Row>
                        <FormDiv>

                            <Row gutter={[10, 10]}>
                                <Col xs={24} sm={12}>
                                    <Label>
                                        Name:
                                         <Input
                                            type='text'
                                            name='name'
                                            {...formik.getFieldProps('name')}
                                            maxLength={25}
                                        />
                                    </Label>
                                    {formik.touched.name && formik.errors.name
                                        ? <ErrorText text={formik.errors.name} />
                                        : null}
                                </Col>
                                <Col xs={24} sm={12}>
                                    <Label>
                                        Organization:
                                 <Input
                                            type='text'
                                            name='organization'
                                            {...formik.getFieldProps('organization')}
                                            maxLength={25}
                                        />
                                    </Label>
                                    {formik.touched.organization && formik.errors.organization
                                        ? <ErrorText text={formik.errors.organization} />
                                        : null}
                                </Col>
                                <Col xs={24} sm={24}>
                                    <Label>
                                        Address:
                                 <Input
                                            type='text'
                                            name='address'
                                            {...formik.getFieldProps('address')}
                                            maxLength={50}
                                        />
                                    </Label>
                                    {formik.touched.address && formik.errors.address
                                        ? <ErrorText text={formik.errors.address} />
                                        : null}
                                </Col>
                                <Col xs={24} sm={8}>
                                    <Label>City:
                                    <Input
                                            type='text'
                                            name='city'
                                            {...formik.getFieldProps('city')}
                                            maxLength={20}
                                        />
                                    </Label>
                                    {formik.touched.city && formik.errors.city
                                        ? <ErrorText text={formik.errors.city} />
                                        : null}
                                </Col>
                                <Col xs={24} sm={8}>
                                    <Label>State:
                                    <Input
                                            type='text'
                                            name='state'
                                            {...formik.getFieldProps('state')}
                                            maxLength={10}
                                        />
                                    </Label>
                                    {formik.touched.state && formik.errors.state
                                        ? <ErrorText text={formik.errors.state} />
                                        : null}
                                </Col>
                                <Col xs={24} sm={8}>
                                    <Label>Postl Code:
                                    <Input
                                            type='text'
                                            name='postalCode'
                                            {...formik.getFieldProps('postalCode')}
                                            maxLength={10}
                                        />
                                    </Label>
                                    {formik.touched.postalCode && formik.errors.postalCode
                                        ? <ErrorText text={formik.errors.postalCode} />
                                        : null}
                                </Col>
                                <Col xs={24} sm={6}>
                                    <Label>Phone#:
                                    <Input
                                            type='text'
                                            name='phone'
                                            {...formik.getFieldProps('phone')}
                                            maxLength={11}
                                        />
                                    </Label>
                                    {formik.touched.phone && formik.errors.phone
                                        ? <ErrorText text={formik.errors.phone} />
                                        : null}
                                </Col>
                                <Col xs={24} sm={12}>
                                    <Label>Email:
                                    <Input
                                            type='email'
                                            name='email'
                                            {...formik.getFieldProps('email')}
                                            maxLength={50}
                                        />
                                    </Label>
                                    {formik.touched.email && formik.errors.email
                                        ? <ErrorText text={formik.errors.email} />
                                        : null}
                                </Col>
                                <Col xs={24} sm={6}>
                                    <Label>Alternate Phone:
                                    <Input
                                            type='text'
                                            name='alternatePhone'
                                            value={formik.values.alternatePhone}
                                            onChange={formik.handleChange}
                                            maxLength={11}
                                        />
                                    </Label>
                                    {formik.touched.alternatePhone && formik.errors.alternatePhone
                                        ? <ErrorText text={formik.errors.alternatePhone} />
                                        : null}
                                </Col>

                            </Row>
                            <Col xs={24} sm={16}>
                                <SubmitButton type='submit' disabled={!formik.isValid}>Create Document</SubmitButton>
                            </Col>
                        </FormDiv>
                    </form>

                    <List
                        size='small'
                        itemLayout="horizontal"
                        bordered
                        header={<H3>Order ITem</H3>}
                        dataSource={orderItems}
                        style={{ marginTop: '15px', transistion: '1s' }}
                        renderItem={items => (
                            <List.Item>
                                <List.Item>
                                    <h4>{items.item}-</h4>
                                    <h4>{items.quantity}</h4>
                                </List.Item>
                            </List.Item>
                        )}
                    />
                </TabPane>
                <TabPane tab="All Deliveries" key="2">
                    <div>
                        {deliveries ?
                            <Table dataSource={deliveries} columns={customerDetails} /> : <Skeleton />
                        }
                    </div>
                    <Modal
                        title="Production Order Details"
                        centered
                        visible={showModal}
                        width={1000}
                        footer={
                            <div
                                style={{
                                    textAlign: 'right'
                                }}
                            >
                                <Button onClick={() => setShowModal(false)} style={{ marginRight: 8 }}>
                                    Close
                              </Button>
                            </div>
                        }
                    >
                        {deliveryDetails ?
                            deliveryDetails.map((item, key) => {
                                return (
                                    <div>
                                        <p>{`Customer Name: ${item.CustomerName}`}</p>
                                        <p>{`Organization Name: ${item.Organization}`}</p>
                                        <p>{`Email: ${item.Email}`}</p>
                                        <p>{`Alternate Phone: ${item.Alternate_Phone}`}</p>
                                    </div>
                                )
                            }) : <Skeleton active />
                        }
                        <div>
                            {deliveryDetails ?
                                <Table dataSource={Items} columns={itemDetails} /> : <Skeleton />
                            }
                        </div>
                    </Modal>
                </TabPane>
            </Tabs>
        </div>
    )
}
export default Delivery