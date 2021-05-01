import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { CaretLeftOutlined } from "@ant-design/icons";
import { Goback } from '../Details/styles/index'
import { getPODetails, updateInventoryItem, CreateGoodReceipt, GetGRbyId, GetAllGoodsReceipt } from '../../Utils/utils'
import {
    Divider, Input, Button, Skeleton, Table, Space, message, Drawer, Tabs, Modal
} from 'antd'

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
    const [gRData, setGRData] = useState()
    const history = useHistory()
    const { slug } = useParams()
    const { TabPane } = Tabs

    const current_datetime = new Date()
    const formatted_date = current_datetime.getDate() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getFullYear()

    useEffect(() => {
        getPODetails(slug).then(data => {
            setPOItemData(data)
            setGrItemList(data.flatMap(O => O.newList))
        })
        GetAllGoodsReceipt().then(data => {
            setAllGoodsReceipt(data)
        })
    }, [])

    const itemsList = POItemData?.flatMap(O => O.newList)
    const goods = gRData?.flatMap(goods => goods.grItemList)

    // ------------Drawer-------------
    const showDrawer = (itemId, req_quantity, docId, name) => {
        setVisible(true);
        setItemID(itemId)
        setRequestedQuantity(req_quantity)
        setCollectionId(docId)
        setItemName(name)
    };

    const handleOk = () => {
        var numbers = /^[0-9]+$/;
        if (requestedQuantity < itemQuantity) return message.error('Retreive Quantity cannot be greator then Requested Quantity');
        if (itemQuantity < 0) return message.error('Quantity cannot be less then zero');
        if (!itemQuantity) return message.error('Quantity cannot be set empty');
        if (!itemQuantity.match(numbers)) return message.error('Error! number is in decimal')
        updateInventoryItem(collectionId, parseFloat(itemQuantity), itemName)
        createGR(itemID, itemQuantity)
        setItemQuantity('')
        setVisible(false)

    };

    const onClose = () => {
        setVisible(false);
    };

    // -----------Drawer--------------
    //------------Modal---------------

    const showGRDetails = (id) => {
        setShowModal(true)

        GetGRbyId(id).then(data => {
            setGRData(data)
        })
    }
    //------------Modal---------------

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
        }
        ,
        // {
        //     title: 'Description',
        //     dataIndex: 'discription',
        //     key: 'discription',
        // }
        ,
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
                            e => showGRDetails(good.collectioniD)
                        }
                    >Details</Button>
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

    const createGR = (itemId, inceaseBy) => {
        const goodReceipt =
            grItemList.map(item => {
                if (item.itemId !== itemId) return item
                return {
                    ...item,
                    remainingQuantity: item.requestedquantity - inceaseBy,
                    retreiveQuantity: parseFloat(item.retreiveQuantity + inceaseBy)
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
        CreateGoodReceipt(objGR)
    }

    return (
        <div>
            <Goback onClick={e => history.goBack()}>
                <CaretLeftOutlined /> GoBack
            </Goback>

            <h1>Purchase Order Details</h1>

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
                    <div>
                        {itemsList ?
                            <Table dataSource={itemsList} columns={columns} /> : <TableSkeleton />
                        }
                    </div>
                    <Button onClick={createGRDoc}>Create GR</Button>
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
                        title="Modal 1000px width"
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

                </TabPane>
            </Tabs>
        </div>
    )
}
export default PurchaseOrderDetails