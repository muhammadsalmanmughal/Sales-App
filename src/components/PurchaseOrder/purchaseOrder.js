import React, { useState, useContext, useEffect } from 'react'
import firebase from '../../config/Firebase/firebase';
import { VendorCustomerContext } from '../../context/Random/random'
import { UserContext } from '../../context/UserContext/UserContext'
import { useHistory } from 'react-router-dom'
import {
    CreatePurchaseOrder, UpdatePOStatus, getItemsId, getDataById,
    CreateRecord
} from '../../Utils/utils'
import {
    Divider, message, Row, Col, Input, Button, Tooltip, Select, DatePicker, Tabs, Table, Space, Modal,
    Skeleton, Tag, Radio
} from 'antd'
import {
    Title, ListItem, ItemDiv, QuantityAndButtonDiv, Quantity, DeleteButton, H3, Paragraph, Location, CName
} from '../../Utils/styles'
import { HeaderDetails, InvoiceDetails, CompanyDetails, General } from './style/index'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { FaRegClipboard } from "react-icons/fa";
import moment from 'moment'
const { TabPane } = Tabs;

const PurchaseOrder = () => {
    const { vendors, allInventoryItems } = useContext(VendorCustomerContext)
    const { user } = useContext(UserContext)
    const [selectedVendor, setSelectedVendor] = useState()
    const [items, setItems] = useState()
    const [requestedquantity, setQuantity] = useState()
    const [itemsList, setItemsList] = useState([])
    const [itemId, setItemId] = useState()
    const [itemQuality, setItemQuality] = useState('A-class');
    const [itemCollectionId, setItemCollectionId] = useState()
    const [requriedDate, setRequriedDate] = useState();
    const [pricePerItem, setPricePerItem] = useState()
    const [discription, setDiscription] = useState('Nothing')
    const [uom, setUom] = useState()
    const [allPO, setAllPO] = useState()
    const [poData, setPOData] = useState()
    const [allGoodsReceipt, setAllGoodsReceipt] = useState()
    const [showInvoiceModal, setShowInvoiceModal] = useState(false);
    const [totalInvoiceAmount, setTotalInvoiceAmount] = useState()
    const [invoiceDueDate, setInvoiceDueDate] = useState()

    const [gRData, setGRData] = useState()
    const [showPOModal, setShowPOModal] = useState(false)
    const [showModal, setShowModal] = useState(false);

    // const utc = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
    let current_datetime = new Date()
    let utc = current_datetime.getDate() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getFullYear()
    const shortid = require('shortid')
    const POiD = shortid.generate()
    const InvoiceId = shortid.generate()
    const retreiveQuantity = 0
    const remainingQuantity = requestedquantity

    const history = useHistory()

    function selectVednor(value) {
        setSelectedVendor(value)
    }

    function selectInventoryItem(value) {
        getItemsId(value).then(data => {
            setItemId(data[0].itemId)
            setItemCollectionId(data[0].compId)
        })
        setItems(value)
    }
    const selectUOM = e => {
        setUom(e);
    };

    const CreateList = () => {
        if (!items) return message.error('Error! Invalid Items')
        const found = itemsList.some(el => el.items == items)
        if (found) return message.error(`${items} already exist in the list`)
        if (!uom) return message.error('Error! Invalid unit of measure')
        if (!requestedquantity) return message.error('Error! Invalid Requested Quantity')
        if (isNaN(requestedquantity) || requestedquantity <= 0) return message.error('Error! Invalid Requested Quantity')
        if (isNaN(pricePerItem) || pricePerItem <= 0) return message.error('Error! Invalid Item Price')
        if (!discription) return message.error('Error! Please add small')
        else {
            const itemPrice = Number(pricePerItem)
            const quantity = Number(requestedquantity)
            setItemsList([...itemsList, { itemCollectionId, itemId, items, uom, quantity, retreiveQuantity, remainingQuantity, itemQuality, itemPrice, discription }])
            setItems('')
            setQuantity('')
            setPricePerItem('')
        }
    }

    const deleteItem = (id) => {
        const newList = [...itemsList]
        newList.splice(id, 1)
        setItemsList(newList);
    }

    const selectQuality = e => {
        setItemQuality(e);
    };

    const changeStatus = (e, id) => {
        UpdatePOStatus(e, id)
    };

    const generatePurchaseOrder = () => {
        const name = user && user[0].name
        const email = user && user[0].email

        if (!selectedVendor) return message.error('Error! Invalid Vendor')
        if (!itemsList.length) return message.error('Error! Select some items')
        if (!requriedDate) return message.error('Error! Select required date')
        const PO_Object = {
            POiD,
            createdDate:utc,
            requriedDate,
            selectedVendor,
            UserName: name,
            UserEmail: email,
            itemsList,
            GR_against_PO: 'Not-Created',
            POStatus: 'Not Defined',
            remaining: 0
        }
        CreatePurchaseOrder(PO_Object)
        setItemsList([])
    }

    const getPurchaseOrder = () => {
        firebase
            .firestore()
            .collection("PurchaseOrder")
            .onSnapshot(function (querySnapshot) {
                const poList = [];
                querySnapshot.forEach(function (doc) {
                    if (doc.exists) {
                        const comp = doc.data();
                        poList.push({ ...comp, compId: doc.id });
                    }
                });
                setAllPO(poList)
            });
    }

    const GetAllGoodsReceipt = () => {
        firebase
            .firestore()
            .collection('Goods_Receipts')
            .onSnapshot(function (querySnapshot) {
                const goodsReceipt = []
                querySnapshot.forEach(function (doc) {
                    if (doc.exists) {
                        const comp = doc.data()
                        goodsReceipt.push({ ...comp, compId: doc.id })
                    } else {
                        message.info('No such document!')
                    }
                })
                setAllGoodsReceipt(goodsReceipt)
            })
    }

    const getPO = (id) => {
        setShowPOModal(true)
        getDataById('PurchaseOrder', id).then(data => {
            setPOData(data)
        })
    }

    useEffect(() => {
        getPurchaseOrder()
        GetAllGoodsReceipt()
    }, [])

    const poItemList = poData?.flatMap(o => o.itemsList)

    function disabledDate(current) {
        return current && current < moment().endOf('day')
    }

    const selectRequriedDate = (date, dateString) => {
        setRequriedDate(dateString)
    }
    const InvoiceDueDate = (date, dateString) => {
        setInvoiceDueDate(dateString)
    }
    const showGRDetails = (id) => {
        setShowModal(true)
        getDataById('Goods_Receipts', id).then(data => {
            setGRData(data.map(gritem => {
                return {
                    ...gritem, grItemList: gritem.grItemList.map(grlistitem => {
                        return {
                            ...grlistitem,
                            itemAmount: Number(grlistitem.itemPrice) * grlistitem.retreiveQuantity
                        }
                    })
                }
            }))

        })
    }
    const invoiceModal = (id) => {
        setShowInvoiceModal(true)
        getDataById('Goods_Receipts', id).then(data => {
            setGRData(data.map(gritem => {
                return {
                    ...gritem, grItemList: gritem.grItemList.map(grlistitem => {
                        return {
                            ...grlistitem,
                            itemAmount: Number(grlistitem.itemPrice) * grlistitem.retreiveQuantity
                        }
                    })
                }
            }))

        })
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

    const goods = gRData?.flatMap(goods => goods.grItemList)
    const invoiceList = gRData?.flatMap(invoice => invoice.grItemList)

    const objInvoice = {
        CompanyName: 'Sams Star',
        Address: 'asfasdfasdfs',
        State: 'Sindh',
        City: 'Karachi',
        PostalCode: 123456,
        Invoice_Id: InvoiceId,
        Invoice_Created: utc,
        Invoice_DueDate: invoiceDueDate,
        PO_Id: gRData && gRData[0].POid,
        Vendor: gRData && gRData[0].Vendor,
        Invoice_Items: invoiceList,
        Total_Amount: totalInvoiceAmount,
        GR_Date: gRData && gRData[0].Created_Date
    }
    const generateInvoice = () => {
        if (!invoiceDueDate) return message.error('Error! Invalid Due Date')
        CreateRecord(objInvoice, 'Invoices', 'Your Invoice has been created')
    }
    const columns = [
        {
            title: 'PO ID',
            dataIndex: 'POiD',
            key: 'purchase order id',
        },
        {
            title: 'Created-Date',
            dataIndex: 'createdDate',
            key: 'createdDate',
        },
        {
            title: 'Requried-Date',
            dataIndex: 'requriedDate',
            key: 'requriedDate',
        },
        {
            title: 'Status',
            key: 'status',
            render: (allPO) => (
                <Space size="middle">
                    <Select
                        defaultValue={allPO.POStatus}
                        placeholder='Select Status'
                        style={{ width: 200 }}
                        onChange={e => changeStatus(e, allPO.iD)}>
                        <Select.Option value="Approved">Approved</Select.Option>
                        <Select.Option value="Rejected">Rejected</Select.Option>
                    </Select>
                </Space>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (allPO) => (
                <Radio.Group  >
                    <Radio.Button
                        onClick={
                            e => getPO(allPO.compId)
                        } >
                        Details
                    </Radio.Button>
                    <Radio.Button value="default" onClick={
                        () => history.push(`/home/purchase-order-details/${allPO.compId}`)
                    }>Create GR</Radio.Button>
                </Radio.Group>
            ),
        }
    ];

    const poDetailsColumn = [
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
            title: 'Item Quality',
            dataIndex: 'itemQuality',
            key: 'name',
        },
        {
            title: 'Per Price',
            dataIndex: 'itemPrice',
            key: 'perPrice',
        },
        {
            title: 'Requested Quantity',
            dataIndex: 'quantity',
            key: 'requestedQuantity',
        }
    ]

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
                <Radio.Group  >
                    <Radio.Button
                        onClick={
                            e => showGRDetails(good.iD)
                        } >Details</Radio.Button>
                    <Radio.Button
                        value="default"
                        onClick={e => invoiceModal(good.iD)}>Create Invoice</Radio.Button>
                </Radio.Group>
            ),
        }
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
            dataIndex: 'itemPrice',
            key: 'perPrice',
        },
        {
            title: 'Requested Quantity',
            dataIndex: 'quantity',
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
            dataIndex: 'itemPrice',
            key: 'perPrice',
        },
        {
            title: 'Requested Quantity',
            dataIndex: 'quantity',
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
    return (
        <div>
            <Title>Purchase Order</Title>
            <Tabs defaultActiveKey="1">
                <TabPane tab="New Purchase Order" key="1">
                    <Row gutter={[10, 10]}>
                        <Col>
                            <div style={{ marginBottom: 16 }}>
                                <Input addonAfter={
                                    <Tooltip placement="topRight" title='Click to Copy'>
                                        <CopyToClipboard text={POiD}>
                                            <FaRegClipboard
                                                onClick={() => alert(POiD)}
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
                        <Col xs={24} sm={4}>
                            <Paragraph>Date: {utc}</Paragraph>
                        </Col>
                    </Row>
                    <Row gutter={[24, 10]}>

                        <Col>
                            <Select
                                style={{ width: 200 }}
                                placeholder='Select Vendor'
                                onChange={selectVednor}
                            >
                                {vendors && vendors.map((name, key) => <Select.Option
                                    value={name.companyName}
                                >
                                    {name.companyName}
                                </Select.Option>
                                )}
                            </Select>
                        </Col>
                        <Col>
                            <Select
                                style={{ width: 200 }}
                                placeholder='Select Item'
                                onChange={selectInventoryItem}
                            >
                                {allInventoryItems && allInventoryItems.map((itemName, key) => <Select.Option
                                    value={itemName.itemsName}
                                >
                                    {itemName.itemsName}
                                </Select.Option>
                                )}
                            </Select>
                        </Col>
                        <Col>
                            <Input
                                value={itemId}
                                placeholder='Selected items id'
                                disabled
                            />
                        </Col>
                        <Col>
                            <Select placeholder='Unit of Measure' style={{ width: 200 }} onChange={selectUOM}>
                                <Select.Option value="packet">Packet</Select.Option>
                                <Select.Option value="dozen">Dozen</Select.Option>
                                <Select.Option value="single">Single</Select.Option>
                                <Select.Option value="sheet">Sheet</Select.Option>
                            </Select>
                        </Col>
                        <Col>
                            <Select placeholder='Select Quality type' style={{ width: 200 }} onChange={selectQuality}>
                                <Select.Option value="A-class">A-class</Select.Option>
                                <Select.Option value="B-class">B-class</Select.Option>
                                <Select.Option value="C-class">C-class</Select.Option>
                            </Select>
                        </Col>
                        <Col >
                            <DatePicker
                                placeholder='Requried Date'
                                format="DD-MM-YYYY"
                                disabledDate={disabledDate}
                                style={{ width: 200 }}
                                // isValidDate={disableWeekends}
                                // isOutsideRange={day => (moment().diff(day) < 6)}
                                onChange={selectRequriedDate}
                            // filterDate={date => date.getDay() !== 6 && date.getDay() !== 0}
                            //   disabledTime={disabledDateTime}
                            //   showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                            />
                            {/* {dateTimePicker()} */}
                        </Col>


                    </Row>
                    <Row gutter={[10, 10]}>
                        <Col xs={24} sm={10}>
                            <Input
                                type='text'
                                placeholder='Enter item Quantity'
                                value={requestedquantity}
                                onChange={e => setQuantity(e.target.value)}
                                maxLength={2}
                            />
                        </Col>
                        <Col xs={24} sm={10}>
                            <Input
                                type='text'
                                placeholder='Price per Item'
                                value={pricePerItem}
                                onChange={e => setPricePerItem(e.target.value)}
                                maxLength={4}
                            />
                        </Col>

                        <Col xs={24} sm={20}>
                            <Input
                                type='text'
                                value={discription}
                                placeholder='Enter a small discription'
                                onChange={e => setDiscription(e.target.value)}
                                maxLength={100} />
                        </Col>

                        <Col xs={24} sm={1}>

                            <Button
                                onClick={CreateList}
                            >Add</Button>
                        </Col>

                    </Row>
                    <Divider><H3>ITEMS LIST</H3></Divider>

                    <ul>
                        {
                            itemsList.map((item, key) => {
                                return (
                                    <>
                                        <ListItem key={key} xs={24} sm={12}>
                                            <ItemDiv>
                                                ItemName: {item.items}
                                            </ItemDiv>
                                            <QuantityAndButtonDiv>
                                                <Quantity>
                                                    Requested Quantity: {item.quantity}
                                                </Quantity>
                                                <Quantity>
                                                    Per item price:
                                                {item.itemPrice}/
                                                    {item.itemQuality}
                                                </Quantity>
                                                <DeleteButton>
                                                    <Button danger onClick={() => deleteItem(key)}>Delete</Button>
                                                </DeleteButton>
                                            </QuantityAndButtonDiv>

                                        </ListItem>
                                    </>
                                )
                            })
                        }
                    </ul>
                    <Row>
                        <Col xs={24} sm={12}>
                            <Button
                                onClick={generatePurchaseOrder}
                            >Create Purchase Order</Button>
                        </Col>
                    </Row>
                    <Modal
                        title="Purchase Order Details"
                        centered
                        visible={showPOModal}
                        onOk={() => setShowPOModal(false)}
                        onCancel={() => setShowPOModal(false)}
                        width={1000}
                    >
                        {poData ?
                            poData.map((item, key) => {
                                return (
                                    <div>
                                        <p>{`PO-ID: ${item.POiD}`}</p>
                                        <p>{`Requried Date: ${item.requriedDate}`}</p>
                                        <p>{`Created Date: ${item.createdDate}`}</p>
                                        <p>{`Vendor Company: ${item.selectVendor}`}</p>
                                        <p>{`Status: ${item.POStatus}`}</p>
                                        <p>{`User Name: ${item.UserName}`}</p>
                                        <p>{`User Email: ${item.UserEmail}`}</p>
                                        <p>{`Vendor: ${item.selectedVendor}`}</p>

                                    </div>
                                )
                            }) : <Skeleton active />
                        }
                        <div>
                            {itemsList ?
                                <Table dataSource={poItemList} columns={poDetailsColumn} /> : <Skeleton />
                            }
                        </div>
                    </Modal>
                </TabPane>

                <TabPane tab="All Purchase Orders" key="2">
                    <div>
                        <Table dataSource={allPO} columns={columns} />;
                     </div>
                </TabPane>
                <TabPane tab="All Goods Receipt" key="3">
                    <div>
                        {allGoodsReceipt ?
                            <Table dataSource={allGoodsReceipt} columns={goodsReceiptColumns} /> : <Skeleton />
                        }
                    </div>
                    <Modal
                        title="GOODS RECEIPT DETAILS"
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
                                    Cancel
                                 </Button>

                            </div>
                        }
                    >
                        {gRData ?
                            gRData.map((item, key) => {
                                return (
                                    <div>
                                        <p>User Name: {item.UserName}</p>
                                        <p>User Email: {item.UserEmail}</p>
                                        <p>Purchase Order Id: {item.POid}</p>
                                        <p>Vendor Name: {item.Vendor}</p>
                                        <p>GR Id: {item.GR_id}</p>
                                        <p>GR Created Date: {item.Created_Date}</p>

                                        {/* <Paragraph>Vendor Name: {item.selectVendor}</Paragraph> */}
                                        {/* <Paragraph>Status: <Tag color={item.POStatus === 'Approved' ? 'green' : 'red'}>{item.POStatus}</Tag></Paragraph> */}
                                    </div>
                                )
                            }) : <Skeleton active />
                        }
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
                        <CName>Sams Star</CName>
                        <HeaderDetails>
                            <CompanyDetails>
                                <h3>Address:</h3>
                                <Location>
                                    <h3>Karachi</h3>
                                    <h3>Sindh</h3>
                                    <h3>123456</h3>
                                </Location>
                                <h3>Email: www.SamsStar.pk</h3>
                            </CompanyDetails>
                            <InvoiceDetails>
                                <p>Invoice Id: {InvoiceId}</p>
                                <p>Invoice Date: {utc}</p>
                                <p>Invoice Due Date:</p>

                                <Col >
                                    <DatePicker
                                        placeholder='Invoice Due Date'
                                        format="DD-MM-YYYY"
                                        disabledDate={disabledDate}
                                        style={{ width: 200 }}
                                        onChange={InvoiceDueDate}
                                    />
                                    {/* {dateTimePicker()} */}
                                </Col>
                            </InvoiceDetails>
                        </HeaderDetails>
                        {gRData ?
                            gRData.map((item, key) => {
                                return (
                                    <General>
                                        <p>User Name: {item.UserName}</p>
                                        <p>User Email: {item.UserEmail}</p>
                                        <p>Purchase Order Id: {item.POid}</p>
                                        <p>Vendor Name: {item.Vendor}</p>
                                        <p>GR Created Date: {item.Created_Date}</p>
                                        {/* <Paragraph>Vendor Name: {item.selectVendor}</Paragraph> */}
                                        {/* <Paragraph>Status: <Tag color={item.POStatus === 'Approved' ? 'green' : 'red'}>{item.POStatus}</Tag></Paragraph> */}
                                    </General>
                                )
                            }) : <Skeleton active />
                        }
                        <Paragraph>
                            {itemsList ?
                                <Table dataSource={goods} columns={invoiceTable} /> : <Skeleton />
                            }
                        </Paragraph>
                        <p>Total Amount is: <b>
                            <Tag color="red">{totalInvoiceAmount} Rs.</Tag>
                        </b>
                        </p>
                    </Modal>

                </TabPane>
            </Tabs>
        </div >
    )
}
export default PurchaseOrder