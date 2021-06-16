import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { CaretLeftOutlined } from "@ant-design/icons";
import { Goback } from '../../Utils/styles'
import { updateInventoryItem, CreateRecord, getDataById } from '../../Utils/utils'
import {
    Input, Button, Skeleton, Table, Space, message, Drawer, Tabs, Tag, Empty
} from 'antd'

import {
    ListItem, ItemDiv, QuantityAndButtonDiv, Quantity
} from '../RequestForQuotation/style/index'

// import { H3 } from './style/index'
import { ItemsDiv, Title, Paragraph, H3 } from '../../Utils/styles'

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
    const [updatedItem, setUpdatedItem] = useState([])


    const history = useHistory()
    const { slug } = useParams()

    const current_datetime = new Date()
    const formatted_date = current_datetime.getDate() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getFullYear()
    useEffect(() => {
        getDataById('PurchaseOrder', slug).then(data => {
            setPOItemData(data)
            setGrItemList(data.flatMap(O => O.newList))
        })
    }, [])
    const shortid = require('shortid')
    const GRiD = shortid.generate()

    const itemsList = POItemData?.flatMap(O => O.newList)

    // ------------Drawer-------------
    const showDrawer = (itemId, quantity, docId, name) => {
        setVisible(true);
        setItemID(itemId)
        setRequestedQuantity(quantity)
        setCollectionId(docId)
        setItemName(name)
    };

    const handleOk = () => {
        var numbers = /^[0-9]+$/;
        if (!requestedQuantity) return message.error('Error! Invalid Quanity')
        if (itemQuantity <= 0) return message.error('Error! Quantity cannot be less then or equal to zero');
        // if (!itemQuantity) return message.error('Error! Quantity cannot be set empty');
        if (!itemQuantity.match(numbers)) return message.error('Error! Number is in decimal')
        if (requestedQuantity < itemQuantity) return message.error('Error! Retreive Quantity cannot be greator then Requested Quantity');

        updateInventoryItem(collectionId, parseFloat(itemQuantity), itemName)
        setUpdatedItem([...updatedItem, { itemName, itemQuantity }])
        createGR(itemID, itemQuantity)
        setItemQuantity('')
        setVisible(false)

    };

    const onClose = () => {
        setVisible(false);
        setItemQuantity('')
    };

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
            dataIndex: 'itemPrice',
            key: 'price',
        },
        {
            title: 'Requested Quantity',
            dataIndex: 'quantity',
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
                        disabled={POItemData && POItemData[0].POStatus !== 'Approved' ? true : false}
                        onClick={
                            e => showDrawer(allPO.itemId, allPO.quantity, allPO.itemCollectionId, allPO.items)
                        }
                    >Update Inventory</Button>
                </Space>
            ),
        },

    ];


    const createGR = (itemId, inceaseBy) => {
        const goodReceipt =
            grItemList.map(item => {
                if (item.itemId !== itemId) return item
                return {
                    ...item,
                    remainingQuantity: item.quantity - inceaseBy,
                    retreiveQuantity: parseFloat(item.retreiveQuantity + inceaseBy),
                }
            })
            grItemList.map(items => {
                if(items.remainingQuantity == 0){
                    return {
                        ...items,
                        remainingQuantity:items.quantity
                    }
                }
            })
        setGrItemList(goodReceipt)
        return goodReceipt
    }

    const objGR = {
        GR_id: GRiD,
        POid: POItemData && POItemData[0].POiD,
        Vendor: POItemData && POItemData[0].selectVendor,
        Created_Date: formatted_date,
        grItemList
    }
    
    const createGRDoc = () => {
        CreateRecord(objGR, 'Goods_Receipts', 'Goods Receipt created')
        setUpdatedItem([])
    }

    return (
        <div>
            <Goback onClick={e => history.goBack()}>
                <CaretLeftOutlined /> GoBack
            </Goback>

            <Title>Create Goods Receipt</Title>
            <Paragraph>Goods Receipts id: <h3>{GRiD}</h3></Paragraph>

            {POItemData ?
                POItemData.map((item, key) => {
                    return (
                        <div>
                            <Paragraph>PO-ID: {item.POiD}</Paragraph>
                            <Paragraph>Requried Date: {item.requriedDate}</Paragraph>
                            <Paragraph>created Date: {item.createdDate}</Paragraph>
                            <Paragraph>Vendor Name: {item.selectVendor}</Paragraph>
                            <Paragraph>Status: <Tag color={item.POStatus === 'Approved' ? 'green' : 'red'}>{item.POStatus}</Tag></Paragraph>
                        </div>
                    )
                }) : <Skeleton active />
            }
            <ItemsDiv>
                {itemsList ?
                    <Table dataSource={itemsList} columns={columns} /> : <TableSkeleton />
                }
            </ItemsDiv>
            <Button disabled={POItemData && POItemData[0].POStatus !== 'Approved' ? true : false}
                onClick={createGRDoc}>Create GR</Button>

            <div style={{ marginTop: '20px' }}>
                <H3 style={{ textAlign: 'center' }}>UPDATED ITEMS</H3>
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
                        : <Empty />
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
        </div>
    )
}
export default PurchaseOrderDetails