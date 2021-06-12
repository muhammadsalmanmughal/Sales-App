import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { CaretLeftOutlined } from "@ant-design/icons";
import { Goback } from '../../Utils/styles'
import { updateInventoryItem, CreateRecord, GetAllGoodsReceipt,getDataById } from '../../Utils/utils'
import {
    Divider, Input, Button, Skeleton, Table, Space, message, Drawer, Tabs, Modal, Tag,Empty
} from 'antd'

import {
    ListItem, ItemDiv, QuantityAndButtonDiv, Quantity
} from '../RequestForQuotation/style/index'

import { H3 } from './style/index'
import {ItemsDiv} from '../../Utils/styles'

import { TableSkeleton } from '../../Utils/skeleton'
const PurchaseOrderDetails = () => {
    const [POItemData, setPOItemData] = useState()
    const [visible, setVisible] = useState(false);
    const [itemID, setItemID] = useState()
    const [requestedQuantity, setRequestedQuantity] = useState()
    const [itemQuantity, setItemQuantity] = useState()
    const [collectionId, setCollectionId] = useState()
    const [itemName, setItemName] = useState()
    const [grItemList, setGrItemList] = useState()
    const [allGoodsReceipt, setAllGoodsReceipt] = useState()
    const [showModal, setShowModal] = useState(false);
    const [showInvoiceModal, setShowInvoiceModal] = useState(false);
    const [gRData, setGRData] = useState()
    const [totalInvoiceAmount, setTotalInvoiceAmount] = useState()
    const [disable, setDisable] = useState(false)
    const [updatedItem, setUpdatedItem] = useState([])
    const history = useHistory()
    const { slug } = useParams()
    console.log('slug: ', slug);
    const { TabPane } = Tabs

    const current_datetime = new Date()
    const formatted_date = current_datetime.getDate() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getFullYear()
    function DisableButton() {

        if (POItemData && POItemData[0].POStatus !== 'approved') {
            setDisable(true)
        }
    }
    useEffect(() => {
        getDataById('PurchaseOrder',slug).then(data => {
            setPOItemData(data)
            setGrItemList(data.flatMap(O => O.newList))
        })
        GetAllGoodsReceipt().then(data => {
            setAllGoodsReceipt(data)
        })
        DisableButton()
    }, [])

    const itemsList = POItemData?.flatMap(O => O.newList)
    const goods = gRData?.flatMap(goods => goods.grItemList)
    // ------------Drawer-------------
    const showDrawer = (itemId, req_quantity, docId, name) => {
        console.log('updated item id-->',itemId, req_quantity, docId, name)
        setVisible(true);
        setItemID(itemId)
        setRequestedQuantity(req_quantity)
        setCollectionId(docId)
        setItemName(name)
    };

    const handleOk = () => {
        var numbers = /^[0-9]+$/;
        // if (requestedQuantity < itemQuantity) return message.error('Retreive Quantity cannot be greator then Requested Quantity');
       console.log('chala');
        if (itemQuantity < 0) return message.error('Quantity cannot be less then zero');
        if (!itemQuantity) return message.error('Quantity cannot be set empty');
        if (!itemQuantity.match(numbers)) return message.error('Error! number is in decimal')
        updateInventoryItem(collectionId, parseFloat(itemQuantity), itemName)
        setUpdatedItem([...updatedItem, { itemName, itemQuantity }])
        createGR(itemID, itemQuantity)
        setItemQuantity('')
        setVisible(false)

    };

    const onClose = () => {
        setVisible(false);
    };
    console.log('updatedItem------------->', updatedItem);
    // -----------Drawer--------------
    //------------Modal---------------

    const showGRDetails = (id) => {
        setShowModal(true)
        getDataById('Goods_Receipts',id).then(data => {
            setGRData(data.map(gritem => {
                return {
                    ...gritem, grItemList: gritem.grItemList.map(grlistitem => {
                        return {
                            ...grlistitem,
                            itemAmount: Number(grlistitem.pricePerItem) * grlistitem.retreiveQuantity
                        }
                    })
                }
            }))

        })
    }
    //------------Modal---------------

    //------------Invoice Modal---------------

    const invoiceModal = () => {
        setShowInvoiceModal(true)

    }

    //------------Invoice Modal---------------

    const columns = [
        {
            title: 'Items ID',
            dataIndex: 'itemId',
            key: 'id',
        },
        {
            title: 'Items Name',
            dataIndex: 'items',
            key: 'name',
        },
        {
            title: 'Price Per Item',
            dataIndex: 'pricePerItem',
            key: 'price',
        },
        {
            title: 'Requested Quantity',
            dataIndex: 'requestedquantity',
            key: 'requested_quantity',
        },
        {
            title: 'Class',
            dataIndex: 'radioValue',
            key: 'class',
        },
        {
            title: 'Action',
            key: 'action',
            render: (allPO) => (
                <Space size="middle">
                    <Button
                        onClick={
                            e => showDrawer(allPO.itemId, allPO.requestedquantity, allPO.itemCollectionId, allPO.items)
                        }
                    >Update Inventory</Button>
                </Space>
            ),
        },

    ];

    const goodsReceiptColumns = [
        {
            title: 'Purchase Order ID',
            dataIndex: 'POid',
            key: 'id',
        },
        {
            title: 'Created At',
            dataIndex: 'Created_Date',
            key: 'date',
        },
        {
            title: 'Vendor Name',
            dataIndex: 'Vendor',
            key: 'vendor_name',
        },
        {
            title: 'Action',
            key: 'action',
            render: (good) => (
                <Space size="middle">
                    <Button
                        onClick={
                            e => showGRDetails(good.iD)
                        }
                    >Details</Button>
                    <Button onClick={invoiceModal}>
                        Create Invoice
                    </Button>
                </Space>
            ),
        },
    ]

    const goodReceiptDetails = [
        {
            title: 'Item ID',
            dataIndex: 'itemId',
            key: 'id',
        },
        {
            title: 'Item Name',
            dataIndex: 'items',
            key: 'name',
        },
        {
            title: 'Per Price',
            dataIndex: 'pricePerItem',
            key: 'perPrice',
        },
        {
            title: 'Requested Quantity',
            dataIndex: 'requestedquantity',
            key: 'requestedQuantity',
        },
        {
            title: 'Retreive Quantity',
            dataIndex: 'retreiveQuantity',
            key: 'retreiveQuantity',
        },
        {
            title: 'Remaining Quanity',
            dataIndex: 'remainingQuantity',
            key: 'remainingQuantity',
        }
    ]

    const invoiceTable = [
        {
            title: 'Item ID',
            dataIndex: 'itemId',
            key: 'id',
        },
        {
            title: 'Item Name',
            dataIndex: 'items',
            key: 'name',
        },
        {
            title: 'Per Price',
            dataIndex: 'pricePerItem',
            key: 'perPrice',
        },
        {
            title: 'Requested Quantity',
            dataIndex: 'requestedquantity',
            key: 'requestedQuantity',
        },
        {
            title: 'Retreive Quantity',
            dataIndex: 'retreiveQuantity',
            key: 'retreiveQuantity',
        },
        {
            title: 'Remaining Quanity',
            dataIndex: 'remainingQuantity',
            key: 'remainingQuantity',
        },
        {
            title: 'Amount Price',
            dataIndex: 'itemAmount',
            key: 'amountPrice',
        }
    ]

    const createGR = (itemId, inceaseBy) => {
        const goodReceipt =
            grItemList.map(item => {
                if (item.itemId !== itemId) return item
                return {
                    ...item,
                    remainingQuantity: item.requestedquantity - inceaseBy,
                    retreiveQuantity: parseFloat(item.retreiveQuantity + inceaseBy),
                }
            })
        setGrItemList(goodReceipt)
        return goodReceipt
    }

    const objGR = {
        POid: POItemData && POItemData[0].POiD,
        Vendor: POItemData && POItemData[0].selectVendor,
        Created_Date: formatted_date,
        grItemList
    }

    const createGRDoc = () => {
        CreateRecord(objGR,'Goods_Receipts','Goods Receipt created')
        setUpdatedItem([])
    }

    const totalInvoice = () => {
        const a = gRData && gRData[0].grItemList && gRData[0].grItemList.reduce((acc, current) => {
            return acc + current.itemAmount
        }, 0);
        setTotalInvoiceAmount(a)
    }

    useEffect(() => {
        totalInvoice()
    }, [gRData])
    const invoiceList = gRData?.flatMap(invoice => invoice.grItemList)

    const objInvoice = {
        createdDate: formatted_date,
        PO_Id: gRData && gRData[0].POid,
        Vendor: gRData && gRData[0].Vendor,
        Invoice_Items: invoiceList,
        Total_Amount: totalInvoiceAmount
    }

    const generateInvoice = () => {
        CreateRecord(objInvoice,'Invoices','Your Invoice has been created')
    }
    return (
        <div>
            <Goback onClick={e => history.goBack()}>
                <CaretLeftOutlined /> GoBack
            </Goback>

            <h1>Create Goods Receipt</h1>

            <Divider />
            <Tabs defaultActiveKey="1">
                <TabPane tab="Create Goods Receipt" key="1">
                    {POItemData ?
                        POItemData.map((item, key) => {
                            return (
                                <div>
                                    <p>PO-ID: {item.POiD}</p>
                                    <p>Requried Date:{item.requriedDate}</p>
                                    <p>created Date:{item.createdDate}</p>
                                    <p>Vendor Name:{item.selectVendor}</p>
                                    <p>Status: {item.POStatus}</p>
                                </div>
                            )
                        }) : <Skeleton active />
                    }
                    <ItemsDiv>
                        {itemsList ?
                            <Table dataSource={itemsList} columns={columns} /> : <TableSkeleton />
                        }
                    </ItemsDiv>
                    <Button disabled={disable} onClick={createGRDoc}>Create GR</Button>
                    <div style={{marginTop:'20px'}}>
                        <H3 style={{textAlign:'center'}}>UPDATED ITEMS</H3>
                        <ul>
                            {updatedItem ?
                                updatedItem.map((item, key) => {
                                    return (
                                        <>
                                            <ListItem key={key} xs={24} sm={12}>
                                                <ItemDiv>
                                                    {item.itemName}
                                                </ItemDiv>
                                                <QuantityAndButtonDiv>
                                                    <Quantity>
                                                        {item.itemQuantity}/
                      {item.radioValue}
                                                    </Quantity>
                                                </QuantityAndButtonDiv>

                                            </ListItem>
                                        </>
                                    )
                                })
                                : <Empty/>
                            }
                        </ul>
                    </div>
                    <Drawer
                        title="Update item Inventory"
                        placement="bottom"
                        closable={false}
                        onClose={onClose}
                        visible={visible}
                        footer={
                            <div
                                style={{
                                    textAlign: 'right',
                                }}
                            >
                                <Button onClick={onClose} style={{ marginRight: 8 }}>
                                    Cancel
                                </Button>
                                <Button onClick={handleOk} type="primary">
                                    Submit
                                </Button>
                            </div>
                        }
                    >
                        <label>Item ID: {itemID}</label>
                        <Input
                            type='number'
                            value={itemQuantity}
                            placeholder='Number of Quantity'
                            maxLength={3}
                            onChange={e => setItemQuantity(e.target.value)}
                        />
                    </Drawer>
                </TabPane>
                <TabPane tab="All Goods Receipt" key="2">
                    <div>
                        {allGoodsReceipt ?
                            <Table dataSource={allGoodsReceipt} columns={goodsReceiptColumns} /> : <Skeleton />
                        }
                    </div>
                    <Modal
                        title="GOODS RECEIPT DETAILS"
                        centered
                        visible={showModal}
                        onOk={() => setShowModal(false)}
                        onCancel={() => setShowModal(false)}
                        width={1000}
                    >
                        <div>
                            {goods ?
                                <Table dataSource={goods} columns={goodReceiptDetails} /> : <Skeleton />
                            }
                        </div>
                    </Modal>
                    <Modal
                        title="CREATE INVOICE"
                        centered
                        visible={showInvoiceModal}
                        width={1000}
                        footer={
                            <div
                                style={{
                                    textAlign: 'right',
                                }}
                            >
                                <Button onClick={() => setShowInvoiceModal(false)} style={{ marginRight: 8 }}>
                                    Cancel
                                 </Button>
                                <Button onClick={generateInvoice} type="primary">
                                    Create Invoice
                                 </Button>
                            </div>
                        }
                    >
                        <div>
                            {itemsList ?
                                <Table dataSource={goods} columns={invoiceTable} /> : <Skeleton />
                            }
                        </div>
                        <p>Total Amount is: <b>
                            <Tag color="red">{totalInvoiceAmount}</Tag>
                        </b>
                        </p>
                    </Modal>

                </TabPane>
            </Tabs>
        </div>
    )
}
export default PurchaseOrderDetails