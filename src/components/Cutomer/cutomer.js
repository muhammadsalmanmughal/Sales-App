import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import { Label } from '../Textbox/style/index'
import { SubmitButton } from '../../Utils/styles'
import { validationSchema } from './validationSchema'
import { createNewCustomer, getCustomerOrder,getDataById } from '../../Utils/utils'
import { Title } from '../../Utils/styles'
import ErrorText from '../FormError/formError'
import AllCustomers from '../AllCustomers/allCustomers';
import { VendorMainDiv, FormDiv } from '../Vendor/style/index'

import {
    Tabs,
    Row,
    Col,
    Input,
    Space,
    Table,
    Button,
    Skeleton,
    Modal,
    Tag
} from 'antd';

const { TabPane } = Tabs;


const CreateCustomer = () => {

    const [allOrders, setAllOrders] = useState([])
    const [orderDetails, setOrderDetails] = useState()
    const [showModal, setShowModal] = useState(false);

    const shortid = require('shortid')
    const orderID = shortid.generate()

    const orderItems = orderDetails?.flatMap(item => item.itemsList)

    const onSubmit = (values, onSubmitProps) => {
        createNewCustomer(values,orderID)
        onSubmitProps.resetForm()
    }

    const initialValues = {
        customerName: '',
        companyName:'',
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
        getDataById('Customer_Order',id).then(data => {
            console.log('data: ', data);
            setOrderDetails(data)
        })
        setShowModal(true)
        console.log('order id: ', id);

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
            title: 'Action',
            key: 'action',
            render: (order) => (
                <Space size="middle">
                    <Button
                        onClick={
                            e => ShowOrderDetails(order.iD)
                        }
                    >Details</Button>
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
        },
        {
            title: 'Item Quantity',
            dataIndex: 'itemPrice',
            key: 'price',
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
                                                // value={formik.values.companyName}
                                                // onBlur={formik.handleBlur}
                                                // onChange={formik.handleChange}
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
                                                // value={formik.values.companyName}
                                                // onBlur={formik.handleBlur}
                                                // onChange={formik.handleChange}
                                                {...formik.getFieldProps('companyName')}
                                            />
                                        </Label>
                                        {formik.touched.companyName && formik.errors.companyName
                                            ? <ErrorText text={formik.errors.companyName} />
                                            : null}
                                    </Col>
                                    <Col xs={24} sm={24}>
                                        <Label>
                                            Bill To Address:
                                 <Input
                                                type='text'
                                                name='billToAddress'
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
                                        <p>{`Customer Name: ${item.CustomerName}`}</p>
                                        <p>{`Company Name: ${item.CompanyName}`}</p>
                                        <p>{`State: ${item.State}`}</p>
                                        <p>{`City: ${item.City}`}</p>
                                        <p>{`Address: ${item.BillToAddress}`}</p>
                                        <p>{`Postal Code: ${item.PostalCode}`}</p>
                                        <p>{`Phone: ${item.Phone}`}</p>
                                        <p>Order Placed:
                                            <Tag color='green'>
                                                {item.currentDate}
                                            </Tag>
                                        </p>
                                        <p>Due Date:
                                            <Tag color='red'>
                                                {item.requiredDate}
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
                </TabPane>

            </Tabs>
        </div>
    )
}
export default CreateCustomer