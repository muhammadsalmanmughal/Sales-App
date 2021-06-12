import React, { useState, useEffect, useContext } from 'react'
import { VendorCustomerContext } from '../../context/Random/random'
import { CreatePurchaseRequisition, getPR, getDataById } from '../../Utils/utils'
import {
    Title,
    ListItem,
    ItemDiv,
    QuantityAndButtonDiv,
    Quantity,
    DeleteButton
} from '../../Utils/styles'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import moment from 'moment'
import {
    Divider, message, Row, Col, Input, Button, Tooltip, Select, DatePicker, Tabs, Table, Space, Modal, Skeleton
} from 'antd'

import { FaRegClipboard } from "react-icons/fa";

const PurchaseRequisition = () => {
    const { allInventoryItems } = useContext(VendorCustomerContext)
    const [itemName, setItemName] = useState()
    const [requesterName, setRequesterName] = useState()
    const [requriedDate, setRequriedDate] = useState();
    const [qualityValue, setQualityValue] = useState('A-class');
    const [requestedquantity, setQuantity] = useState()
    const [itemsList, setItemsList] = useState([])
    const [allPRData, setAllPRData] = useState()
    const [prDetails, setPRDetails] = useState()
    const [showModal, setShowModal] = useState(false);

    const { TabPane } = Tabs;

    useEffect(() => {
        getPR().then(data => {
            setAllPRData(data)
        })
    }, [])

    let current_datetime = new Date()
    let createdDate = current_datetime.getDate() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getFullYear()
    const Quanity = Number(requestedquantity)
    const shortid = require('shortid')
    const PR_iD = shortid.generate()
    const details = prDetails && prDetails.flatMap(d => d.itemsList)

    const selectRequriedDate = (date, dateString) => {
        setRequriedDate(dateString)
    }

    function disabledDate(current) {
        return current && current < moment().endOf('day')
    }

    const selectQuality = e => {
        setQualityValue(e);
    };

    function selectInventoryItem(value) {
        setItemName(value)
    }

    const CreateList = () => {
        if (requesterName == null || !requesterName) return message.error('Error! Requester Name cannot be left empty.')
        if (!itemName) return message.error('Error! Select Item Name.')
        if (!requriedDate) return message.error('Error! Select required date.')
        if (!qualityValue) return message.error('Error! Select quality type.')
        if (!requestedquantity || requestedquantity.length > 2 || requestedquantity <= 0) {
            message.error('Error! Quantity not support')
        }
        else {
            setItemsList([...itemsList, { itemName, qualityValue, Quanity }])
            setRequesterName('')
            setQuantity('')
            setQualityValue('')
        }
    }

    const deleteItem = (id) => {
        const newList = [...itemsList]
        newList.splice(id, 1)
        setItemsList(newList);
    }

    const generatePurchaseOrder = () => {
        CreatePurchaseRequisition(PR_iD, requesterName, createdDate, requriedDate, itemsList)
        setItemsList([])
        setRequesterName('')
    }

    const getPRDetails = (id) => {
        setShowModal(true)
        getDataById('PurchaseRequisitions', id).then(data => {
            setPRDetails(data)
        })
    }
    const PR_Table = [
        {
            title: 'PR ID',
            dataIndex: 'PR_iD',
            key: 'id',
        },
        {
            title: 'Requester Name',
            dataIndex: 'RequesterName',
            key: 'requesterName',
        },
        {
            title: 'Created Date',
            dataIndex: 'createdDate',
            key: 'created_date',
        },
        {
            title: 'Requried Date',
            dataIndex: 'requriedDate',
            key: 'requried_date',
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
            dataIndex: 'Quanity',
            key: 'quanity',
        },
        {
            title: 'Quality',
            dataIndex: 'qualityValue',
            key: 'quality_Value',
        }
    ]

    return (
        <div>
            <Title>Purchase Requisition </Title>
            <Tabs defaultActiveKey="1" >
                <TabPane tab="Create New" key="1">
                    <Row gutter={[10, 10]}>
                        <Col>
                            <div style={{ marginBottom: 16 }}>
                                <label>
                                    Purchase Requisition Id:
                        </label>
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

                        <Col xs={24} sm={12}>
                            <lable>
                                Posting Date:
                    </lable>
                            <h4>{createdDate}</h4>
                        </Col>

                    </Row>
                    <Row gutter={[10, 10]}>
                        <Col xs={24} sm={6}>
                            <Input
                                value={requesterName}
                                placeholder='Requester Name'
                                onChange={e => setRequesterName(e.target.value)}
                                maxLength={25}
                            />
                        </Col>
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
                        <Col>
                            <Select placeholder='Select Quality type' style={{ width: 200 }} onChange={selectQuality}>
                                <Select.Option value="a">A</Select.Option>
                                <Select.Option value="b">B</Select.Option>
                                <Select.Option value="c">C</Select.Option>
                            </Select>
                        </Col>
                        <Col xs={24} sm={6}>
                            <Input
                                type='number'
                                placeholder='Enter item Quantity'
                                value={requestedquantity}
                                onChange={e => setQuantity(e.target.value)}
                                max={2}
                            />
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
                                                    {item.Quanity}/
                                                    {item.qualityValue}
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
                                disabled={!itemsList.length ? true : false}
                                onClick={generatePurchaseOrder}
                            >Create Purchase Order</Button>
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