import React, { useState, useEffect } from 'react'
import { getAllInvoices, getInvoiceById } from '../../Utils/utils'
import {
    Divider, Button, Skeleton, Table, Space, Modal, Tag
} from 'antd'


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
        getInvoiceById(id).then(data => {
            setInvoiceDetails(data)
            setInvoiceItemList(data&&data.flatMap(i => i.Invoice_Items)) 
            console.log('data------------>', data)
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
            dataIndex: 'createdDate',
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
            dataIndex: 'pricePerItem',
            key: 'price',
        },
        {
            title: 'Requested',
            dataIndex: 'requestedquantity',
            key: 'requested',
        },
        {
            title: 'Retreive',
            dataIndex: 'retreiveQuantity',
            key: 'retreive',
        },
        {
            title: 'Remaining',
            dataIndex: 'remainingQuantity',
            key: 'remaining',
        },
        {
            title: 'Amount',
            dataIndex: 'itemAmount',
            key: 'amount',
        },

    ];

    return (
        <div>
            <h1>ALL INVOICES</h1>
            <Divider />
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
                        <div>
                            {invoiceItemList ?
                                <Table dataSource={invoiceItemList} columns={columns}  /> : <Skeleton />
                            }
                        </div>
                        <p>Total Amount : <b>
                            <Tag color="blue">{invoiceDetails&&invoiceDetails[0].Total_Amount}</Tag>
                        </b>
                        </p>
                    </Modal>
        </div>
    )
}
export default AllInvoices