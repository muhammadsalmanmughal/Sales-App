import React, { useState, useEffect, useContext } from 'react'
import { VendorCustomerContext } from '../../context/Random/random'
import { getItemsId } from '../../Utils/utils'
import {
    ListItem,
    ItemDiv,
    QuantityAndButtonDiv,
    Quantity,
    DeleteButton
} from '../RequestForQuotation/style/index'

import { CopyToClipboard } from 'react-copy-to-clipboard'
import moment from 'moment'
import {
    Divider,
    message,
    Row,
    Col,
    Input,
    Button,
    Tooltip,
    Select,
    DatePicker,
    Tabs,
    Table,
    Space,
    Modal,
    Skeleton
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

    let current_datetime = new Date()
    let createdDate = current_datetime.getDate() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getFullYear()

    const Quanity = Number(requestedquantity)

    const shortid = require('shortid')
    const PR_iD = shortid.generate()

    const selectRequriedDate = (date, dateString) => {
        console.log(dateString);
        setRequriedDate(dateString)
    }
    function disabledDate(current) {
        return current && current < moment().endOf('day')
    }
    const selectQuality = e => {
        setQualityValue(e);
    };
    function selectInventoryItem(value) {
        console.log(value)
        // getItemsId(value).then(data => {
        //     setItemId(data[0].itemId)
        //     setItemCollectionId(data[0].compId)
        // })
        setItemName(value)

    }
    const ObjItemList = {
        PR_iD,
        requesterName,
        createdDate,
        requriedDate
    }
    const CreateList = () => {
        if (requesterName == null || !requriedDate) {
            message.error('Fill all the fields')
        }
        else if(requestedquantity.length > 2){
            message.error('Quantity out of range')
        }

        else {
            setItemsList([...itemsList, { itemName, qualityValue, Quanity }])
            setItemName('')
            setRequesterName('')
            setQuantity('')
        }
    }
    const deleteItem = (id) => {
        const newList = [...itemsList]
        newList.splice(id, 1)
        setItemsList(newList);
    }
    console.log('itemsList',itemsList);

    return (
        <div>
            <h1>Purchase Requisition </h1>
            <Divider />
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
                        max ={5}

                    />
                </Col>
            </Row>
            <Row>
                <Button
                    onClick={CreateList}
                >Add</Button>
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
        </div>
    )
}
export default PurchaseRequisition