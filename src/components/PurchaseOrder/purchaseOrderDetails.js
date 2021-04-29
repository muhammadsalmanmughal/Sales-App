import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { CaretLeftOutlined } from "@ant-design/icons";
import { Goback } from '../Details/styles/index'
import { getPODetails, updateInventoryItem,createGoodReceipt } from '../../Utils/utils'
import {
    Divider, Input, Button, Skeleton, Table, Space, message, Drawer
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

    const history = useHistory()
    const { slug } = useParams()

    console.log({POItemData});
    useEffect(() => {
        getPODetails(slug).then(data => {
            setPOItemData(data)
            setGrItemList(data.flatMap(O => O.newList))
        })
        
    }, [])
    const itemsList = POItemData?.flatMap(O => O.newList)

    // ------------Drawer-------------
// console.log('itemsList',itemsList);
// console.log('POItemData',POItemData);

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
        // updateInventoryItem(collectionId, parseFloat(itemQuantity))
        createGR(itemID,itemQuantity)
        setItemQuantity('')

    };

    const showDrawer = (itemId, req_quantity, docId) => {
        setVisible(true);
        setItemID(itemId)
        setRequestedQuantity(req_quantity)
        setCollectionId(docId)
        
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
            dataIndex: 'requestedquantity',
            key: 'requested_quantity',
        },
        {
            title: 'Retrieve Quantity',
            dataIndex: 'retreiveQuantity',
            key: 'retrieve_quantity',
        },
        {
            title: 'Remaining',
            dataIndex: 'remainingQuantity',
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

    const createGR = (itemId, inceaseBy) => {
        const goodReceipt=
            grItemList.map(item => {
                if(item.itemId !== itemId) return item
                if (requestedQuantity < inceaseBy) return message.error('Retreive Quantity cannot be greator then Requested Quantity');
                if (inceaseBy < 0) return message.error('Quantity cannot be less then zero');
                if (!inceaseBy) return message.error('Quantity cannot be set empty');
                return{
                    ...item,
                    retreiveQuantity: parseFloat(item.retreiveQuantity + inceaseBy)
                }
            })
        setGrItemList(goodReceipt)
        return goodReceipt
    }
    const objGR ={
        POid: POItemData&&POItemData[0].POiD,
        Vendor: POItemData&&POItemData[0].selectVendor,
        grItemList
    }
    const createGRDoc= () => {
        createGoodReceipt(objGR)
    }
    console.log('gr list data',grItemList)

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
        </div>
    )
}
export default PurchaseOrderDetails