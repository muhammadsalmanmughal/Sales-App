import React, { useState, useEffect } from 'react'
import { getAllInvoices, getDataById } from '../../Utils/utils'
import {
    Button, Skeleton, Table, Space, Modal, Tag, Row, Col
} from 'antd'
import { Title, CName, Location, Paragraph, H3 } from '../../Utils/styles'
import { HeaderDetails, CompanyDetails, InvoiceDetails, General } from '../PurchaseOrder/style/index'

const AllInvoices = () => {
    const [allInvoices, setAllInvoices] = useState()
    const [showModal, setShowModal] = useState(false)
    const [invoiceDetails, setInvoiceDetails] = useState()
    const [invoiceItemList, setInvoiceItemList] = useState()

    useEffect(() => {
        getAllInvoices().then(data => {
            setAllInvoices(data)
        })
    }, [])

    const getInvoiceDetails = (id) => {
        setShowModal(true)
        getDataById('Invoices', id).then(data => {
            setInvoiceDetails(data)
            setInvoiceItemList(data && data.flatMap(i => i.OrderItems))
        })
    }

    const invoicesTable = [
        {
            title: 'Invoice Id',
            dataIndex: 'InvoiceId',
            key: 'invoice_id',
        },
        {
            title: 'Order Id',
            dataIndex: 'CustomerOrderId',
            key: 'order_id',
        },
        {
            title: 'Customer Name',
            dataIndex: 'CustomerName',
            key: 'customer_Name',
        },
        {
            title: 'Created Date',
            dataIndex: 'InvoiceCreateDate',
            key: 'date',
        },
        {
            title: 'Action',
            key: 'action',
            render: (allPO) => (
                <Space size="middle">
                    <Button
                        onClick={
                            e => getInvoiceDetails(allPO.compId)
                        }
                    >Details</Button>
                </Space>
            ),
        },

    ];

    const columns = [
        {
            title: 'Item Name',
            dataIndex: 'item',
            key: 'item_name',
        },
        {
            title: 'Requested Quantity',
            dataIndex: 'quantity',
            key: 'requested',
        },
        {
            title: 'Price Per Item',
            dataIndex: 'itemPrice',
            key: 'price',
        },
        {
            title: 'Description',
            dataIndex: 'discription',
            key: 'details',
        },

    ];

    return (
        <div>
            <Title>All Customer Invoices</Title>
            <div>
                {allInvoices ?
                    <Table dataSource={allInvoices} columns={invoicesTable} /> : <Skeleton />
                }
            </div>
            <Modal
                title="INVOICE DETAILS"
                centered
                visible={showModal}
                width={1000}
                footer={
                    <div
                        style={{
                            textAlign: 'right',
                        }}
                    >
                        <Button onClick={() => setShowModal(false)} style={{ marginRight: 8 }}>
                            Close
                                 </Button>
                    </div>
                }
            >
                <CName>Sams Star</CName>
                <HeaderDetails>
                    <CompanyDetails>
                        <h3>Address:</h3>
                        <Location>
                            <h3>Karachi,</h3>
                            <h3>Sindh,</h3>
                            <h3>123456</h3>
                        </Location>
                        <h3>Email: www.SamsStar.pk</h3>
                    </CompanyDetails>
                    <InvoiceDetails>
                        <p>Invoice Id: {invoiceDetails && invoiceDetails[0].InvoiceId} </p>
                        <p>Invoice Date:{invoiceDetails && invoiceDetails[0].InvoiceCreateDate}</p>
                    </InvoiceDetails>
                </HeaderDetails>
                <CompanyDetails>
                    <H3>Bill To:</H3>
                    <Row>
                        <Col><h3>Customer: </h3></Col>
                        <Col>
                            <h3>{invoiceDetails && invoiceDetails[0].CustomerName}</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col><h3>Order Date: </h3></Col>
                        <Col>
                            <h3>{invoiceDetails && invoiceDetails[0].OrderCreated}</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col><h3>Order Required: </h3></Col>
                        <Col>
                            <h3>{invoiceDetails && invoiceDetails[0].OrderRequiredDate}</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col><h3>Phone: </h3></Col>
                        <Col>
                            <h3>{invoiceDetails && invoiceDetails[0].Phone}</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col><h3>City: </h3></Col>
                        <Col>
                            <h3>{invoiceDetails && invoiceDetails[0].City}</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col><h3>State: </h3></Col>
                        <Col>
                            <h3>{invoiceDetails && invoiceDetails[0].State}</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col><h3>Address: </h3></Col>
                        <Col>
                            <h3>{invoiceDetails && invoiceDetails[0].Address}</h3>
                        </Col>
                    </Row>
                </CompanyDetails>
                {invoiceDetails ?
                    invoiceDetails.map((item, key) => {
                        return (
                            <General>
                                <p>User Name: {item.UserName}</p>
                                <p>User Email: {item.UserEmail}</p>
                            </General>
                        )
                    }) : <Skeleton active />
                }
                <div>
                    {invoiceItemList ?
                        <Table dataSource={invoiceItemList} columns={columns} /> : <Skeleton />
                    }
                </div>
                <p>Total Amount : <b>
                    <Paragraph><Tag color='#87d068'>{invoiceDetails && invoiceDetails[0].TotalAmount} Rs.</Tag></Paragraph>
                </b>
                </p>
            </Modal>
        </div>
    )
}
export default AllInvoices
