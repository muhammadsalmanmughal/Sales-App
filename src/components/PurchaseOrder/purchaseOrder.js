import React, { useState, useContext, useEffect } from 'react'
import firebase from '../../config/Firebase/firebase';
import { VendorCustomerContext } from '../../context/Random/random'
import { useHistory } from 'react-router-dom'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { CreatePurchaseOrder, UpdatePOStatus, getItemsId } from '../../Utils/utils'
import { FaRegClipboard } from "react-icons/fa";
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
    Space
} from 'antd'
import {
    ListItem,
    ItemDiv,
    QuantityAndButtonDiv,
    Quantity,
    DeleteButton
} from '../RequestForQuotation/style/index'
const { TabPane } = Tabs;

const PurchaseOrder = () => {
    const [selectedVendor, setSelectedVendor] = useState()
    const [items, setItems] = useState()
    const [requestedquantity, setQuantity] = useState()
    const [itemsList, setItemsList] = useState([])
    const [itemId, setItemId] = useState()
    const [radioValue, setRadioValue] = useState('A-class');
    const [itemCollectionId, setItemCollectionId] = useState()
    const { vendors, allInventoryItems } = useContext(VendorCustomerContext)
    const [startDate, setStartDate] = useState(new Date());
    const [requriedDate, setRequriedDate] = useState();
    const [pricePerItem, setPricePerItem] = useState()
    const [discription, setDiscription] = useState()
    const [allPO, setAllPO] = useState()

    const { RangePicker } = DatePicker;
    const utc = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
    const shortid = require('shortid')
    const POiD = shortid.generate()
    const retreiveQuantity = 0
    const remainingQuantity = 0

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

    const CreateList = () => {
        if (items == null) {
            message.error('Items can not left Empty')
        }
        else if (isNaN(requestedquantity) || requestedquantity.length > 2) {
            message.error('Quantity amount not support')
        }

        else {
            setItemsList([...itemsList, {itemCollectionId,itemId, items, requestedquantity,retreiveQuantity,remainingQuantity, radioValue, pricePerItem, discription }])
            setItems('')
            setQuantity('')
        }
    }
    // console.log(itemsList)

    const deleteItem = (id) => {
        const newList = [...itemsList]
        newList.splice(id, 1)
        setItemsList(newList);
    }

    const selectQuality = e => {
        setRadioValue(e);
    };
    const changeStatus = (e, id) => {
        UpdatePOStatus(e, id)
    };

    const generatePurchaseOrder = () => {
        CreatePurchaseOrder(itemsList, POiD, utc, requriedDate, selectedVendor)
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
    useEffect(() => {
        getPurchaseOrder()
    }, [])

    // console.log('all PO', allPO?.flatMap(O => O.newList));
    console.log('all PO', allPO);

    function disabledDate(current) {
        return current && current < moment().endOf('day')
    }

    const disableWeekends = current => {
        console.log('current', current);
        return current.day() !== 0 && current.day() !== 6;
    }

    const selectRequriedDate = (date, dateString) => {
        console.log(dateString);
        setRequriedDate(dateString)
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
        // {
        //     title: 'Quantity',
        //     dataIndex: 'quantity',
        //     key: 'quantity',
        // },
        {
            title: 'Action',
            key: 'action',
            render: (allPO) => (
                <Space size="middle">
                    <Button onClick={() =>
                        history.push(`/home/purchase-order-details/${allPO.compId}`)
                    }
                    >Details</Button>
                </Space>
            ),
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
                        <Select.Option value="approved">Approved</Select.Option>
                        <Select.Option value="rejected">Rejected</Select.Option>
                    </Select>
                </Space>
            ),
        },
    ];
    return (
        <div>
            <h1>Purchase Order</h1>
            <Divider />
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
                            <h4>Date: {utc}</h4>
                        </Col>
                    </Row>
                    <Row gutter={[24, 10]}>

                        <Col>
                            {/* <label>Select Vender: </label> */}
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
                            {/* <label>Select Item: </label> */}
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
                            <Select placeholder='Select Quality type' style={{ width: 200 }} onChange={selectQuality}>
                                <Select.Option value="a">A</Select.Option>
                                <Select.Option value="b">B</Select.Option>
                                <Select.Option value="c">C</Select.Option>
                            </Select>
                            {/* <Radio.Group onChange={selectQuality} value={radioValue}>
                        <Radio value={'A-class'}>A</Radio>
                        <Radio value={'B-class'}>B</Radio>
                        <Radio value={'C-class'}>C</Radio>
                    </Radio.Group> */}
                        </Col>
                        <Col >
                            {/* <label>Select Delivery Date: </label> */}
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
                                type='number'
                                placeholder='Enter item Quantity'
                                value={requestedquantity}
                                onChange={e => setQuantity(e.target.value)}
                                maxLength={2}
                            />
                        </Col>
                        <Col xs={24} sm={10}>
                            <Input
                                type='number'
                                placeholder='Price per Item'
                                value={pricePerItem}
                                onChange={e => setPricePerItem(e.target.value)}
                                maxLength={3}
                            />
                        </Col>

                        <Col xs={24} sm={20}>
                            <Input
                                type='text'
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
                    <Divider>ITEMS LIST</Divider>

                    <ul>
                        {
                            itemsList.map((item, key) => {
                                return (
                                    <>
                                        <ListItem key={key} xs={24} sm={12}>
                                            <ItemDiv>
                                                {item.items}
                                            </ItemDiv>
                                            <QuantityAndButtonDiv>
                                                <Quantity>
                                                    {item.quantity}/
                      {item.radioValue}
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
                </TabPane>

                <TabPane tab="All Purchase Orders" key="2">
                    <h1>hello world</h1>
                    <div>
                        <Table dataSource={allPO} columns={columns} />;
                     </div>
                </TabPane>
            </Tabs>
        </div>
    )
}
export default PurchaseOrder