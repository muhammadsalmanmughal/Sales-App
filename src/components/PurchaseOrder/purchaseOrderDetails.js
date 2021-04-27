import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { CaretLeftOutlined } from "@ant-design/icons";
import { Goback } from '../Details/styles/index'
import { getPODetails, updateInventoryItem } from '../../Utils/utils'
import {
    Divider, Input, Button, Skeleton, Table, Space, message, Drawer
} from 'antd'

import { TableSkeleton, ParaSkeleton } from '../../Utils/skeleton'
const PurchaseOrderDetails = () => {
    const [POItemData, setPOItemData] = useState()
    const [visible, setVisible] = useState(false);
    const [itemID, setItemID] = useState()
    const [requestedQuantity, setRequestedQuantity] = useState()
    const [itemQuantity, setItemQuantity] = useState()
    const [collectionId, setCollectionId] = useState()
    const [itemName, setItemName] = useState()
    const history = useHistory()
    const { slug } = useParams()
    useEffect(() => {
        getPODetails(slug).then(data => {
            setPOItemData(data)
        })
    }, [])

    const itemsList = POItemData?.flatMap(O => O.newList)



    // ------------Drawer-------------
    
    const showDrawer = (itemId, req_quantity, docId, name) => {
        setVisible(true);
        setItemID(itemId)
        setRequestedQuantity(req_quantity)
        setCollectionId(docId)
        setItemName(name)
    };
    const handleOk = () => {
        if (requestedQuantity < itemQuantity) return message.error('Retreive Quantity cannot be greator then Requested Quantity');
        if (itemQuantity < 0) return message.error('Quantity cannot be less then zero');
        if (!itemQuantity) return message.error('Quantity cannot be set empty');
        updateInventoryItem(collectionId, parseFloat(itemQuantity), itemName)
        setVisible(false)
        setItemQuantity('')
    };
    const onClose = () => {
        setVisible(false);
    };
    // -----------Drawer--------------
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
            dataIndex: 'quantity',
            key: 'requested_quantity',
        },
        {
            title: 'Retrieve Quantity',
            dataIndex: 'retrieve',
            key: 'retrieve_quantity',
        },
        {
            title: 'Remaining',
            dataIndex: 'remaining',
            key: 'remainingQuantity',
        },
        {
            title: 'Class',
            dataIndex: 'radioValue',
            key: 'class',
        },
        {
            title: 'Description',
            dataIndex: 'discription',
            key: 'discription',
        },
        {
            title: 'Action',
            key: 'action',
            render: (allPO) => (
                <Space size="middle">
                    <Button
                        onClick={
                            e => showDrawer(allPO.itemId, allPO.quantity, allPO.itemCollectionId, allPO.items)
                        }
                    >Update Inventory</Button>
                </Space>
            ),
        },

    ];
    return (
        <div>
            <Goback onClick={e => history.goBack()}>
                <CaretLeftOutlined /> GoBack
            </Goback>

            <h1>Purchase Order Details</h1>

            <Divider />

            { POItemData ?
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
        </div>
    )
}
export default PurchaseOrderDetails