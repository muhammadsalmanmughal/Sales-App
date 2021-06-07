import React, { useContext, useEffect } from 'react'
import firebase from '../../config/Firebase/firebase'
import 'firebase/firestore';
import { useHistory } from 'react-router-dom'
import { VendorCustomerContext } from '../../context/Random/random'
import { UserContext } from '../../context/UserContext/UserContext'
import {
    getCustomerOrder,
    getOrdersById,
    getAllInventoryItems,
    CreateProductionOrder,
    CapitalizeWords,
    getProductionOrders,
    UpdateProductionStatus,
    getProductionDetails,
    UpdateItemStatus
} from '../../Utils/utils'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import {
    Divider, Input, Button, Tooltip, message, Select, Tabs, Row, Col, Space, Table, Skeleton, Modal, Tag
} from 'antd'
import {
    Title, H3,
    ListItem,
    ItemDiv,
    QuantityAndButtonDiv,
    Quantity,
    ItemsListMainDiv,
    ItemsListOne,
    ItemsListTwo
} from '../../Utils/styles'
import { FaRegClipboard, FaDiagnoses } from 'react-icons/fa'
import TextArea from 'antd/lib/input/TextArea'
import { useState } from 'react/cjs/react.development'

const Production = () => {
    const { bomItems } = useContext(VendorCustomerContext)
    const { user } = useContext(UserContext)
    const [customerId, setCustomerId] = useState()
    const [customerName, setCustomerName] = useState()
    const [orderDate, setOrderDate] = useState()
    const [orderType, setOrderType] = useState()
    const [itemQuantity, setItemQuantity] = useState()
    const [discription, setDiscription] = useState()
    const [bomName, setBomName] = useState()
    const [newBomList, setNewBomList] = useState([])
    const [allInventory, setAllInventory] = useState([])
    const [customerOrder, setCustomerOrder] = useState()
    const [allOrders, setAllOrders] = useState()
    const [orderDetails, setOrderDetails] = useState()
    const [showModal, setShowModal] = useState(false);
    const [orderItemslist, setOrderItemslist] = useState()
    console.log('orderItemslist: ', orderItemslist);
    console.log('customerOrder: ', customerOrder);

    useEffect(() => {
        getCustomerOrder().then(data => {
            setCustomerOrder(data)
        })
        getAllInventoryItems().then(data => {
            setAllInventory(data)
        })
        getProductionOrders().then(data => {
            setAllOrders(data)
        })
    }, [])

    const name = user && user.map(user => user.name)
    const userName = name && name.toString()
    const { TabPane } = Tabs
    const history = useHistory()
    const current_datetime = new Date()
    const utc = current_datetime.getDate() + '-' + (current_datetime.getMonth() + 1) + '-' + current_datetime.getFullYear()
    const shortid = require('shortid')
    const POiD = shortid.generate()
    const bomItem = bomItems?.flatMap(n => n.BomName)

    const orderItems = orderDetails?.flatMap(i => i.ItemsList)

    const getOrderData = (id) => {
        getOrdersById(id).then(data => {
            setCustomerName(data[0].businessName)
            setOrderDate(data[0].requriedDate)
            setCustomerId(id)
        })
        const orderList = customerOrder?.filter(item => {
            return id == item.orderID
        })
        const orderItem = orderList.flatMap(i => i.itemsList)
        setOrderItemslist(orderItem)
    }

    const selectOrderType = (value) => {
        setOrderType(value)
    }

    const selectBomItem = (value) => {
        setBomName(value)
        const filterItem = bomItems.filter(items => {
            return items.BomName === value
        })
        const bomList = filterItem?.flatMap(list => list.List)
        const newList = bomList.map(items => {
            return {
                ...items,
                quantity: items.quantity * itemQuantity
            }
        })
        setNewBomList(newList)
    }

    const createPO = () => {
        if (!orderType) return message.error('Error! Select order type')
        if (!itemQuantity) return message.error('Error! Enter item quantity')
        if (!bomName) return message.error('Error! Select BOM')
        if (!customerName) return message.error('Error! Select customer order')

        allInventory && allInventory.map(item1 => {
            newBomList && newBomList.map(item2 => {
                if (item1.itemsName === item2.items && item1.quantity !== 0) {
                    if (item1.quantity >= item2.quantity) {
                        var newObj = { ...item1, quantity: item1.quantity - item2.quantity };
                        firebase
                            .firestore()
                            .collection('Item_Master').doc(item1.iD).update(newObj)
                    }

                }
            })
        })
        const PO_Object = {
            POiD,
            UserName: CapitalizeWords(userName),
            CustomerId: customerId,
            CustomerName: CapitalizeWords(customerName),
            DueDate: orderDate,
            OrderStatus: 'On-Hold',
            ItemStatus: 'Not Set',
            CreationDate: utc,
            Type: orderType,
            BomItems: bomName,
            Quantity: Number(itemQuantity),
            ItemsList: newBomList,
            Discription: CapitalizeWords(discription)
        }
        CreateProductionOrder(PO_Object)
        setItemQuantity('')
        setNewBomList([])
        setDiscription('')
    }

    const changeStatus = (e, id) => {
        UpdateProductionStatus(e, id)
    }

    const changeItemStatus = (e, id) => {
        UpdateItemStatus(e, id)
    }

    const ShowOrderDetails = (id) => {
        setShowModal(true)
        getProductionDetails(id).then(data => {
            setOrderDetails(data)
        })
    }
    const allOrderTable = [
        {
            title: 'Order ID',
            dataIndex: 'POiD',
            key: 'production_id',
        },
        {
            title: 'Customer Name',
            dataIndex: 'CustomerName',
            key: 'customer_Name',
        },
        {
            title: 'Due Date',
            dataIndex: 'DueDate',
            key: 'due_Date',
        },
        {
            title: 'OrderStatus',
            key: 'status',
            render: (allPO) => (
                <Space size="middle">
                    <Select
                        defaultValue={allPO.OrderStatus}
                        placeholder='Select Status'
                        style={{ width: 200 }}
                        onChange={e => changeStatus(e, allPO.iD)}
                    >
                        <Select.Option value="In-progress">In-progress</Select.Option>
                        <Select.Option value="On-Hold">On-Hold</Select.Option>
                    </Select>
                </Space>
            ),
        },
        {
            title: 'ItemStatus',
            key: 'itemstatus',
            render: (allPO) => (
                <Space size="middle">
                    <Select
                        defaultValue={allPO.ItemStatus}
                        // disabled={allPO.ItemStatus == 'In-progress'? false : true}
                        placeholder='Item Status'
                        style={{ width: 200 }}
                        onChange={e => changeItemStatus(e, allPO.iD)}
                    >
                        <Select.Option value="Cutting">Cutting</Select.Option>
                        <Select.Option value="Fixing">Fixing</Select.Option>
                        <Select.Option value="Polishing">Polishing</Select.Option>
                        <Select.Option value="Polishing">Complete</Select.Option>
                    </Select>
                </Space>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (good) => (
                <Space size="middle">
                    <Button
                        onClick={
                            e => ShowOrderDetails(good.iD)
                        }
                    >Details</Button>
                </Space>
            ),
        },
    ]
    const tableOrderDetails = [
        {
            title: 'Item Name',
            dataIndex: 'items',
            key: 'item_Name',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'UMO',
            dataIndex: 'unitOfMeassure',
            key: 'umo',
        }
    ]
    return (
        <div>
            <Title>
                Production
      </Title>

            <Divider />

            <Row gutter={[10, 10]}>
                <Col xs={24} sm={14}>
                    <h4>Date: {utc}</h4>
                </Col>

                <Col>
                    <label>Create BOM </label>
                    <Button type='primary' icon={<FaDiagnoses />} onClick={() => history.push('/home/bill-of-material')} />
                </Col>
            </Row>
            <Tabs defaultActiveKey='1'>
                <TabPane tab='Production Order' key='1'>
                    <Row gutter={[10, 10]}>
                        <Col>
                            <div style={{ marginBottom: 16 }}>
                                <label>Production Id:</label>

                                <Input
                                    addonAfter={
                                        <Tooltip placement='topRight' title='Click to Copy'>
                                            <CopyToClipboard text={POiD}>
                                                <FaRegClipboard
                                                    style={{ cursor: 'pointer' }}
                                                />
                                            </CopyToClipboard>
                                        </Tooltip>
                                    }
                                    value={POiD}
                                    disabled
                                />
                            </div>
                        </Col>

                        <Col>
                            <label>UserName:</label>
                            <Input type='text' value={userName} disabled />
                        </Col>
                    </Row>

                    <Row gutter={[10, 10]}>
                        <Col>
                            <Select
                                style={{ width: 200 }}
                                placeholder='Cutomer order Id'
                                onChange={getOrderData}
                            >
                                {customerOrder && customerOrder.map(item => <Select.Option
                                    value={item.orderID}
                                >
                                    {item.orderID}
                                </Select.Option>
                                )}
                            </Select>
                        </Col>

                        <Col>
                            <Input type='text' value={customerName} placeholder='Customer Name' disabled />
                        </Col>

                        <Col>
                            <Input type='text' value={orderDate} placeholder='Due Date' disabled />
                        </Col>
                        <Col>
                            <Select placeholder='Select type' style={{ width: 200 }} onChange={selectOrderType}>
                                <Select.Option value='Standard'>Standard</Select.Option>
                            </Select>
                        </Col>
                        <Col>
                            <Select placeholder='BOM Items' style={{ width: 200 }} onChange={selectBomItem}>
                                {bomItem && bomItem.map(itemname => <Select.Option
                                    value={itemname} disabled={!itemQuantity}>{itemname}</Select.Option>
                                )}

                            </Select>
                        </Col>
                        <Col>
                            <Input type='text' value={itemQuantity} placeholder='Planned Quantity' onChange={e => setItemQuantity(e.target.value)} />
                        </Col>

                    </Row>

                    <Row gutter={[10, 10]}>
                        <Col xs={24} sm={13}>
                            <TextArea
                                rows={2} col={5}
                                value={discription}
                                placeholder='Discription Optional'
                                showCount
                                maxLength={150}
                                size='small'
                                onChange={e => setDiscription(e.target.value)} />
                        </Col>

                    </Row>
                    <Divider>
                        <H3>Production - Items</H3>
                    </Divider>
                    <ItemsListMainDiv>
                        <ItemsListOne>
                        <H3>Cutomer Order</H3>
                            <ul>
                                {
                                    orderItemslist?.map((items, key) => {
                                        return (
                                            <>
                                                <ListItem key={key} xs={24} sm={12}>
                                                    <ItemDiv>
                                                        {items.item}
                                                    </ItemDiv>
                                                    <QuantityAndButtonDiv>
                                                        <Quantity>
                                                            {items.quantity}
                                                        </Quantity>
                                                    </QuantityAndButtonDiv>

                                                </ListItem>
                                            </>
                                        )
                                    })
                                }
                            </ul>
                        </ItemsListOne>
                        <ItemsListTwo>
                        <H3>BOM Items</H3>
                        <ul>
                                {
                                    newBomList?.map((item, key) => {
                                        return (
                                            <>
                                                <ListItem key={key} xs={24} sm={12}>
                                                    <ItemDiv>
                                                        {item.items}
                                                    </ItemDiv>
                                                    <QuantityAndButtonDiv>
                                                        <Quantity>
                                                            {item.quantity}-{item.unitOfMeassure}
                                                        </Quantity>
                                                    </QuantityAndButtonDiv>

                                                </ListItem>
                                            </>
                                        )
                                    })
                                }
                            </ul>
                        </ItemsListTwo>
                    </ItemsListMainDiv>
                    <Button onClick={createPO}>Create Production Order</Button>

                </TabPane>
                <TabPane tab='All Order' key='2'>
                    <div>
                        {allOrders ?
                            <Table dataSource={allOrders} columns={allOrderTable} /> : <Skeleton />
                        }
                    </div>
                    <Modal
                        title="Production Order Details"
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
                                        <p>{`Item: ${item.BomItems}`}</p>
                                        <p>{`Customer Name: ${item.CustomerName}`}</p>
                                        <p>Order Status:
                                           <Tag color={item.OrderStatus === 'In-progress' ? 'blue' : 'default'}>
                                                {item.OrderStatus}</Tag>
                                        </p>
                                        <p>{`Discription: ${item.Discription}`}</p>
                                    </div>
                                )
                            }) : <Skeleton active />
                        }
                        <div>
                            {orderDetails ?
                                <Table dataSource={orderItems} columns={tableOrderDetails} /> : <Skeleton />
                            }
                        </div>
                    </Modal>
                </TabPane>
            </Tabs>
        </div>
    )
}

export default Production
