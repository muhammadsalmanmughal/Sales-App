import React, { useState, useEffect } from 'react'
import { getAllInvoices, getDataById } from '../../Utils/utils'
import {
    Button, Skeleton, Table, Space, Modal, Tag
} from 'antd'
import { Title, CName, Location} from '../../Utils/styles'
import { HeaderDetails, CompanyDetails, InvoiceDetails, General } from '../PurchaseOrder/style/index'

const AllInvoices = () => {
    const [allInvoices, setAllInvoices] = useState()
    const [showModal, setShowModal] = useState(false)
    const [invoiceDetails, setInvoiceDetails] = useState()
    console.log('invoiceDetails: ', invoiceDetails);
    const [invoiceItemList, setInvoiceItemList] = useState()
    console.log('invoiceItemList: ', invoiceItemList);

    useEffect(() => {
        getAllInvoices().then(data => {
            setAllInvoices(data)
        })
    }, [])

    const getInvoiceDetails = (id) => {
        setShowModal(true)
        getDataById('Invoices', id).then(data => {
            setInvoiceDetails(data)
            setInvoiceItemList(data && data.flatMap(i => i.Invoice_Items))
        })
    }

    const invoicesTable = [
        {
            title: 'Purchase Order Id',
            dataIndex: 'PO_Id',
            key: 'po_id',
        },
        {
            title: 'Vendor Name',
            dataIndex: 'Vendor',
            key: 'vendor_name',
        },
        {
            title: 'Created Date',
            dataIndex: 'Invoice_Created',
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
            title: 'Item Id',
            dataIndex: 'itemId',
            key: 'item_id',
        },
        {
            title: 'Item Name',
            dataIndex: 'items',
            key: 'item_name',
        },
        {
            title: 'Price Per Item',
            dataIndex: 'itemPrice',
            key: 'price',
        },
        {
            title: 'Item Quality',
            dataIndex: 'radioValue',
            key: 'price',
        },
        {
            title: 'Requested',
            dataIndex: 'quantity',
            key: 'requested',
        },
        {
            title: 'Retreive',
            dataIndex: 'retreiveQuantity',
            key: 'retreive',
        },
        {
            title: 'Amount',
            dataIndex: 'itemAmount',
            key: 'amount',
        },

    ];

    return (
        <div>
            <Title>Vendor Invoices</Title>
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
                        <p>Invoice Id: {invoiceDetails&&invoiceDetails[0].Invoice_Id} </p>
                        <p>Invoice Date:{invoiceDetails&&invoiceDetails[0].Invoice_Created}</p>
                        <p>Invoice Due Date: {invoiceDetails&&invoiceDetails[0].Invoice_DueDate}</p>
                    </InvoiceDetails>
                </HeaderDetails>
                {invoiceDetails ?
                            invoiceDetails.map((item, key) => {
                                return (
                                    <General>
                                        <p>User Name: {item.UserName}</p>
                                        <p>User Email: {item.UserEmail}</p>
                                        <p>Purchase Order Id: {item.PO_Id}</p>
                                        <p>Vendor Name: {item.Vendor}</p>
                                        <p>GR Created Date: {item.Created_Date}</p>
                                        {/* <Paragraph>Vendor Name: {item.selectVendor}</Paragraph> */}
                                        {/* <Paragraph>Status: <Tag color={item.POStatus === 'Approved' ? 'green' : 'red'}>{item.POStatus}</Tag></Paragraph> */}
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
                    <Tag color="blue">{invoiceDetails && invoiceDetails[0].Total_Amount}</Tag>
                </b>
                </p>
            </Modal>
        </div>
    )
}
export default AllInvoices
