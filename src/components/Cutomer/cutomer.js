import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import { Label } from '../Textbox/style/index'
import { SubmitButton } from '../../Utils/styles'
import { validationSchema } from './validationSchema'
import { createNewCustomer, getCustomerOrder, getDataById, UpdateOrderDate } from '../../Utils/utils'
import { Title } from '../../Utils/styles'
import ErrorText from '../FormError/formError'
import AllCustomers from '../AllCustomers/allCustomers';
import { VendorMainDiv, FormDiv } from '../Vendor/style/index'
import {
    Tabs, Row, Col, Input, Space, Table, Button, Skeleton, Modal, Tag, DatePicker, message, Radio
} from 'antd';
const { TabPane } = Tabs;


const CreateCustomer = () => {

    const [allOrders, setAllOrders] = useState([])
    const [orderDetails, setOrderDetails] = useState()
    const [previousDate, setPreviousDate] = useState()
    const [newOrderDate, setNewOrderDate] = useState()
    const [collecId, setCollecId] = useState()
    const [showModal, setShowModal] = useState(false);
    const [showDateModal, setShowDateModal] = useState()

    const shortid = require('shortid')
    const orderID = shortid.generate()

    const orderItems = orderDetails?.flatMap(item => item.itemsList)

    const onSubmit = (values, onSubmitProps) => {
        createNewCustomer(values, orderID)
        onSubmitProps.resetForm()
    }

    const initialValues = {
        customerName: '',
        companyName: '',
        cnicNumber: '',
        billToAddress: '',
        city: '',
        state: '',
        postalCode: '',
        phone: '',
        email: '',
        responsibleName: '',
        responsiblePhone: '',
        secondaryPhone: ''
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
    }, [])


    const ShowOrderDetails = (id) => {
        getDataById('Customer_Order', id).then(data => {
            console.log('data: ', data);
            setOrderDetails(data)
        })
        setShowModal(true)
    }

    const setNewDate = (id) => {
        setCollecId(id)
        setShowDateModal(true)
    }
    const changaDate = (date, dateString) => {
        setNewOrderDate(dateString)
        setPreviousDate(allOrders?.[0].requiredDate)

    }
    const updateOrderDate = () => {
        if (!newOrderDate) return message.error('Error! No date selected.')
        if (newOrderDate == previousDate) return message.error('Error! New date and Previous date are same.')
        UpdateOrderDate(newOrderDate, collecId)
    }

    const allOrderTable = [
        {
            title: 'Order ID',
            dataIndex: 'orderID',
            key: 'order_id',
        },
        {
            title: 'Customer Name',
            dataIndex: 'CustomerName',
            key: 'customer_Name',
        },
        {
            title: 'Company',
            dataIndex: 'CompanyName',
            key: 'company_Name',
        },
        {
            title: 'Due Date',
            dataIndex: 'requiredDate',
            key: 'due_Date',
        },
        {
            title: 'New Due Date',
            dataIndex: 'newOrderDate',
            key: 'due_Date',
        },
        {
            title: 'Order Status',
            key: 'status',
            render: order => (
                <span>
                    <Tag color={order.Status == 'Finished' ? 'green' : 'orange'}>
                        {order.Status}
                    </Tag>
                </span>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (order) => (
                <Space size="middle">
                    <Radio.Group  >
                        <Radio.Button
                            onClick={
                                () => ShowOrderDetails(order.iD)
                            } >Details</Radio.Button>
                        <Radio.Button value="default" onClick={
                            () => setNewDate(order.iD)
                        }>Change Date</Radio.Button>
                    </Radio.Group>
                </Space>
            ),
        },
    ]

    const orderItemList = [
        {
            title: 'Item Name',
            dataIndex: 'item',
            key: 'name',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        }
    ]

    return (
        <div>
            <Title>Customer</Title>
            <Tabs defaultActiveKey="1" >

                <TabPane tab="Create Customer" key="1">
                    <VendorMainDiv>
                        <form
                            onSubmit={formik.handleSubmit}
                        >
                            <FormDiv>

                                <Row gutter={[10, 10]}>
                                    <Col xs={24} sm={12}>
                                        <Label>
                                            Customer Name:
                                         <Input
                                                type='text'
                                                name='customerName'
                                                maxLength='15'
                                                {...formik.getFieldProps('customerName')}
                                            />
                                        </Label>
                                        {formik.touched.customerName && formik.errors.customerName
                                            ? <ErrorText text={formik.errors.customerName} />
                                            : null}
                                    </Col>
                                    <Col xs={24} sm={12}>
                                        <Label>
                                            Company Name:
                                         <Input
                                                type='text'
                                                name='companyName'
                                                maxLength='25'
                                                {...formik.getFieldProps('companyName')}
                                            />
                                        </Label>
                                        {formik.touched.companyName && formik.errors.companyName
                                            ? <ErrorText text={formik.errors.companyName} />
                                            : null}
                                    </Col>
                                    <Col xs={24} sm={10}>
                                        <Label>
                                            CNIC-Number:
                                           <Input
                                                type='text'
                                                name='cnicNumber'
                                                maxLength='13'
                                                {...formik.getFieldProps('cnicNumber')}
                                            />
                                        </Label>
                                        {formik.touched.cnicNumber && formik.errors.cnicNumber
                                            ? <ErrorText text={formik.errors.cnicNumber} />
                                            : null}
                                    </Col>
                                    <Col xs={24} sm={14}>
                                        <Label>
                                            Bill To Address:
                                           <Input
                                                type='text'
                                                name='billToAddress'
                                                maxLength='50'
                                                {...formik.getFieldProps('billToAddress')}
                                            />
                                        </Label>
                                        {formik.touched.billToAddress && formik.errors.billToAddress
                                            ? <ErrorText text={formik.errors.billToAddress} />
                                            : null}
                                    </Col>
                                    <Col xs={24} sm={8}>
                                        <Label>City:
                                    <Input
                                                type='text'
                                                name='city'
                                                maxLength='20'
                                                {...formik.getFieldProps('city')}

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
                                                maxLength='15'
                                                {...formik.getFieldProps('state')}
                                            />
                                        </Label>
                                        {formik.touched.state && formik.errors.state
                                            ? <ErrorText text={formik.errors.state} />
                                            : null}
                                    </Col>
                                    <Col xs={24} sm={8}>
                                        <Label>Postl Code:
                                    <Input
                                                type='number'
                                                name='postalCode'
                                                maxLength='6'
                                                {...formik.getFieldProps('postalCode')}
                                            />
                                        </Label>
                                        {formik.touched.postalCode && formik.errors.postalCode
                                            ? <ErrorText text={formik.errors.postalCode} />
                                            : null}
                                    </Col>
                                    <Col xs={24} sm={8}>
                                        <Label>Phone#:
                                    <Input
                                                type='number'
                                                name='phone'
                                                maxLength='11'
                                                {...formik.getFieldProps('phone')}
                                            />
                                        </Label>
                                        {formik.touched.phone && formik.errors.phone
                                            ? <ErrorText text={formik.errors.phone} />
                                            : null}
                                    </Col>
                                    <Col xs={24} sm={16}>
                                        <Label>Email:
                                    <Input
                                                type='email'
                                                name='email'
                                                maxLength='50'
                                                {...formik.getFieldProps('email')}
                                            />
                                        </Label>
                                        {formik.touched.email && formik.errors.email
                                            ? <ErrorText text={formik.errors.email} />
                                            : null}
                                    </Col>
                                    <Col xs={24} sm={6}>
                                        <Label>Responsible Name:
                                    <Input
                                                type='text'
                                                name='responsibleName'
                                                maxLength='15'
                                                value={formik.values.responsibleName}
                                                onChange={formik.handleChange}
                                            />
                                        </Label>
                                        {formik.touched.responsibleName && formik.errors.responsibleName
                                            ? <ErrorText text={formik.errors.responsibleName} />
                                            : null}
                                    </Col>
                                    <Col xs={24} sm={6}>
                                        <Label>Responsible Phone:
                                    <Input
                                                type='text'
                                                name='responsiblePhone'
                                                maxLength='11'
                                                value={formik.values.responsiblePhone}
                                                onChange={formik.handleChange}
                                            />
                                        </Label>
                                        {formik.touched.responsiblePhone && formik.errors.responsiblePhone
                                            ? <ErrorText text={formik.errors.responsiblePhone} />
                                            : null}
                                    </Col>
                                    <Col xs={24} sm={6}>
                                        <Label>Secondary Phone:
                                    <Input
                                                type='text'
                                                name='secondaryPhone'
                                                maxLength='11'
                                                value={formik.values.secondaryPhone}
                                                onChange={formik.handleChange}
                                            />
                                        </Label>
                                        {formik.touched.secondaryPhone && formik.errors.secondaryPhone
                                            ? <ErrorText text={formik.errors.secondaryPhone} />
                                            : null}
                                    </Col>

                                    <Col xs={24} sm={6}>
                                        <Label>City:
                                    <Input
                                                type='text'
                                                name='city'
                                                maxLength='15'
                                                {...formik.getFieldProps('city')}
                                            />
                                        </Label>
                                        {formik.touched.city && formik.errors.city
                                            ? <ErrorText text={formik.errors.city} />
                                            : null}
                                    </Col>


                                </Row>
                                <Col xs={24} sm={16}>
                                    <SubmitButton type='submit' disabled={!formik.isValid}>Create Customer</SubmitButton>
                                </Col>
                            </FormDiv>
                        </form>
                    </VendorMainDiv>

                </TabPane>

                <TabPane tab="All Customer" key="2">
                    <AllCustomers />
                </TabPane>
                <TabPane tab="All Customer Orders" key="3">
                    <div>
                        {allOrders ?
                            <Table dataSource={allOrders} columns={allOrderTable} /> : <Skeleton />
                        }
                    </div>
                    <Modal
                        title="Customer Order Details"
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
                        {orderDetails ?
                            orderDetails.map((item, key) => {
                                return (
                                    <div>
                                        <label>Customer Name:
                                         <p>{item.CustomerName}</p>
                                        </label>
                                        <label>Company Name:
                                         <p>{item.CompanyName}</p>
                                        </label>
                                        <label>State:
                                        <p>{item.State}</p>
                                        </label>
                                        <label>City:
                                        <p>{item.City}</p>
                                        </label>

                                        <label>Address:
                                        <p>{item.BillToAddress}</p>
                                        </label>

                                        <label>Postal Code:
                                        <p>{item.PostalCode}</p>
                                        </label>

                                        <label>Phone:
                                        <p>{item.Phone}</p>
                                        </label>

                                        <p>Order Placed:
                                            <Tag color='blue'>
                                                {item.currentDate}
                                            </Tag>
                                        </p>
                                        <p>Due Date:
                                            <Tag color='volcano'>
                                                {item.requiredDate}
                                            </Tag>
                                        </p>
                                        <p>New Due Date:
                                            <Tag color='red'>
                                                {item.newOrderDate}
                                            </Tag>
                                        </p>
                                    </div>
                                )
                            }) : <Skeleton active />
                        }
                        <div>
                            {orderItems ?
                                <Table dataSource={orderItems} columns={orderItemList} /> : <Skeleton />
                            }
                        </div>
                    </Modal>
                    <Modal
                        title="Change Order Date"
                        centered
                        visible={showDateModal}
                        width={500}
                        footer={
                            <div
                                style={{
                                    textAlign: 'right'
                                }}
                            >
                                <Button onClick={() => setShowDateModal(false)} style={{ marginRight: 8 }}>
                                    Close
                           </Button>
                                <Button type='primary' onClick={updateOrderDate} style={{ marginRight: 8 }}>
                                    Set Date
                           </Button>
                            </div>
                        }>
                        <label>Set new date:
                         <DatePicker
                                placeholder='Requried Date'
                                format="DD-MM-YYYY"
                                //   disabledDate={disabledDate}
                                style={{ width: 200 }}
                                onChange={changaDate}
                            />
                        </label>
                    </Modal>
                </TabPane>
            </Tabs>
        </div>
    )
}
export default CreateCustomer