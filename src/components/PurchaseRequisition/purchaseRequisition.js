import React, { useState, useEffect, useContext } from 'react'
import firebase from '../../config/Firebase/firebase';
import { VendorCustomerContext } from '../../context/Random/random'
import { UserContext } from '../../context/UserContext/UserContext'
import { CreatePR, getDataById, UpdateStatus } from '../../Utils/utils'
import {
    Title,
    ListItem,
    ItemDiv,
    QuantityAndButtonDiv,
    Quantity,
    DeleteButton,
    Paragraph
} from '../../Utils/styles'
import { IdDate } from './style'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import moment from 'moment'
import {
    Divider, message, Row, Col, Input, Button, Tooltip, Select,
    DatePicker, Tabs, Table, Space, Modal, Skeleton
} from 'antd'

import { FaRegClipboard } from "react-icons/fa";

const PurchaseRequisition = () => {
    const { allInventoryItems } = useContext(VendorCustomerContext)
    const { user } = useContext(UserContext)
    const [itemName, setItemName] = useState()
    const [position, setPosition] = useState()
    const [requriedDate, setRequriedDate] = useState();
    const [qualityValue, setQualityValue] = useState('A-class');
    const [requestedquantity, setQuantity] = useState()
    const [uom , setUom] = useState()
    const [itemPrice, setItemPrice] = useState()
    const [itemsList, setItemsList] = useState([])
    const [allPRData, setAllPRData] = useState()
    const [prDetails, setPRDetails] = useState()
    const [showModal, setShowModal] = useState(false);

    const { TabPane } = Tabs;

    const getPR = () => {
        firebase
          .firestore()
          .collection('PurchaseRequisitions')
          .onSnapshot(function (querySnapshot) {
            const prData = []
            querySnapshot.forEach(function (doc) {
              if (doc.exists) {
                const comp = doc.data()
                prData.push({ ...comp, compId: doc.id })
              } else {
                message.info('No such document!')
              }
            })
            setAllPRData(prData)
          })
      }

    useEffect(() => {
        getPR()
    }, [])

    const UserName= user && user[0].name
    const UserEmail= user && user[0].email
    let current_datetime = new Date()
    let createdDate = current_datetime.getDate() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getFullYear()
    const itemQuantity = Number(requestedquantity)
    const price = Number(itemPrice)
    const shortid = require('shortid')
    const PR_iD = shortid.generate()
    const details = prDetails && prDetails.flatMap(d => d.ItemsList)

    const selectRequriedDate = (date, dateString) => {
        setRequriedDate(dateString)
    }

    function disabledDate(current) {
        return current && current < moment().endOf('day')
    }

    const selectQuality = e => {
        setQualityValue(e);
    };

    const selectUOM = e => {
        setUom(e);
    };

    const selectPosition = e => {
        setPosition(e);
    };

    function selectInventoryItem(value) {
        setItemName(value)
    }

    const CreateList = () => {
        if (!requriedDate) return message.error('Error! Select required date.')
        if (!itemName) return message.error('Error! Select Item Name.')
        if (itemsList.length && itemsList.includes(itemName)) return message.error(`${itemName} already exist in the list`)
        if (isNaN(requestedquantity)) return message.error('Error! Invalid Quantity.')
        if (!requestedquantity || requestedquantity.length > 2 || requestedquantity <= 0) return message.error('Error! Quantity not support')
        if (!uom) return message.error('Error! Select unit of meassure.')
        if (isNaN(price) || !price || price <= 0) return message.error('Error! Invaid price per item.')
        if (!qualityValue) return message.error('Error! Select quality type.')
        else {
            setItemsList([...itemsList, { itemName, qualityValue, itemQuantity,price, uom }])
            setQuantity('')
            setItemPrice('')
            setQualityValue('')
        }
    }

    const deleteItem = (id) => {
        const newList = [...itemsList]
        newList.splice(id, 1)
        setItemsList(newList);
    }

    const generatePurchaseRequisition = () => {
        // var pattern = /^[A-Za-z._]{3,}@[A_Za-z]{3,}[.]{1}[A-Za-z.]{2,6}$/
        if (!position) return message.error('Error! Select requester position.')
            const PRData={
                PR_iD,
                UserName,
                UserEmail,
                position,
                createdDate,
                requriedDate,
                itemsList
            }
            CreatePR(PRData)
        setItemsList([])
    }

    const getPRDetails = (id) => {
        setShowModal(true)
        getDataById('PurchaseRequisitions', id).then(data => {
            setPRDetails(data)
        })
    }
    const changeStatus = (status, id) => {
        UpdateStatus('PurchaseRequisitions', status, id)
    };


    const PR_Table = [
        {
            title: 'PR ID',
            dataIndex: 'RequisitionId',
            key: 'id',
        },
        {
            title: 'Requester Name',
            dataIndex: 'RequesterName',
            key: 'requesterName',
        },
        ,
        {
            title: 'Requester Email',
            dataIndex: 'RequesterEmail',
            key: 'requesterEmail',
        },
        {
            title: 'Created Date',
            dataIndex: 'CreatedDate',
            key: 'created_date',
        },
        {
            title: 'Requried Date',
            dataIndex: 'RequriedDate',
            key: 'requried_date',
        },
        {
            title: 'Status',
            key: 'status',
            render: (allPO) => (
                <Space size="middle">
                    <Select
                        value={allPO.Status}
                        placeholder='Select Status'
                        style={{ width: 120 }}
                        onChange={e => changeStatus(e, allPO.iD)}>
                        <Select.Option value="approved">Approved</Select.Option>
                        <Select.Option value="rejected">Rejected</Select.Option>
                        <Select.Option value="cancle">Cancle</Select.Option>
                    </Select>
                </Space>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (allPR) => (
                <Space size="middle">

                    <Button
                        onClick={() =>
                            getPRDetails(allPR.compId)
                        }
                    >Details</Button>
                </Space>
            ),
        }
    ]

    const PRDetails_Table = [
        {
            title: 'Name',
            dataIndex: 'itemName',
            key: 'name',
        },
        {
            title: 'Quanity',
            dataIndex: 'itemQuantity',
            key: 'quanity',
        },
        {
            title: 'Quality',
            dataIndex: 'qualityValue',
            key: 'quality_Value',
        },
        {
            title: 'Unit of Measure',
            dataIndex: 'uom',
            key: 'quality_Value',
        }
    ]

    return (
        <div>
            <Title>Purchase Requisition </Title>
            <Tabs defaultActiveKey="1" >
                <TabPane tab="Create New" key="1">
                    <IdDate >
                        <Col>
                            <div style={{ marginBottom: 16 }}>
                                <Paragraph>
                                    PR Id:
                               </Paragraph>
                                <Input addonAfter={
                                    <Tooltip placement="topRight" title='Click to Copy'>
                                        <CopyToClipboard text={PR_iD}>
                                            <FaRegClipboard
                                                style={{ cursor: 'pointer' }}
                                            />
                                        </CopyToClipboard>
                                    </Tooltip>
                                }
                                    value={PR_iD}
                                    disabled
                                />
                            </div>
                        </Col>

                        <Col>
                            <Paragraph>
                                Posting Date:
                             </Paragraph>
                            <Input value={createdDate} disabled />
                        </Col>

                    </IdDate>
                    <Row gutter={[10, 10]}>
                        <Col xs={24} sm={6}>
                            <Input
                                type='text'
                                value={UserName}
                                disabled
                                maxLength={25}
                            />
                        </Col>
                        <Col xs={24} sm={11}>
                            <Input
                                type='text'
                                value={UserEmail}
                                disabled
                                maxLength={25}
                            />
                        </Col>
                        <Col>
                            <Select placeholder='Requister Position' style={{ width: 200 }} onChange={selectPosition}>
                                <Select.Option value="manager">Manager</Select.Option>
                            </Select>
                        </Col>
                    </Row>
                    <Row gutter={[10, 10]}>
                        <Col >
                            <DatePicker
                                placeholder='Requried Date'
                                format="DD-MM-YYYY"
                                disabledDate={disabledDate}
                                style={{ width: 200 }}
                                onChange={selectRequriedDate}
                            />
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
                        <Col xs={24} sm={5}>
                            <Input
                                type='text'
                                placeholder='Enter item Quantity'
                                value={requestedquantity}
                                onChange={e => setQuantity(e.target.value)}
                                maxLength={2}
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
                        <Col xs={24} sm={4}>
                            <Input
                                type='text'
                                placeholder='Enter price per item '
                                value={itemPrice}
                                onChange={e => setItemPrice(e.target.value)}
                                maxLength={4}
                            />
                        </Col>
                        <Col>
                            <Select placeholder='Select Quality type' style={{ width: 200 }} onChange={selectQuality}>
                                <Select.Option value="A-class">A</Select.Option>
                                <Select.Option value="B-class">B</Select.Option>
                                <Select.Option value="C-class">C</Select.Option>
                            </Select>
                        </Col>
                        <Col>
                            <Button
                                onClick={CreateList}
                            >Add</Button>
                        </Col>
                    </Row>
                    <Divider>ITEMS LIST</Divider>
                    <ul>
                        {
                            itemsList.map((item, key) => {
                                return (
                                    <>
                                        <ListItem key={key} xs={24} sm={12}>
                                            <ItemDiv>
                                                {item.itemName}
                                            </ItemDiv>
                                            <QuantityAndButtonDiv>
                                                <Quantity>
                                                 {item.itemQuantity}{item.uom}
                                                </Quantity>
                                                <Quantity>
                                                   Per Price: {item.price}
                                                </Quantity>
                                                <Quantity>
                                                   Total: {item.itemQuantity*item.price}Rs/
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
                    <Row gutter={[10, 10]}>
                        <Col >
                            <Button
                                disabled={!itemsList.length ? true : false}
                                onClick={generatePurchaseRequisition}
                            >Create Requisition</Button>
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tab="All Requisitions" key="2">
                    <div>
                        {allPRData ?
                            <Table dataSource={allPRData} columns={PR_Table} /> : <Skeleton />
                        }
                    </div>
                    <Modal
                        title="Purchase Order Details"
                        centered
                        visible={showModal}
                        onOk={() => setShowModal(false)}
                        onCancel={() => setShowModal(false)}
                        width={1000}
                    >
                        <div>
                            {details ?
                                <Table dataSource={details} columns={PRDetails_Table} /> : <Skeleton />
                            }
                        </div>
                    </Modal>
                </TabPane>
            </Tabs>
        </div>
    )
}
export default PurchaseRequisition