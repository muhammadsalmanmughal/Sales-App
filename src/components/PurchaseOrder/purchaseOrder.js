import React, { useState, useContext, useEffect } from 'react'
import firebase from '../../config/Firebase/firebase';
import { VendorCustomerContext } from '../../context/Random/random'
import { CreatePurchaseOrder } from '../../Utils/utils'
import moment from 'moment'
// import DatePicker from 'react-datepicker'
// import 'react-datepicker/dist/react-datepicker.css'
import {
    Divider,
    message,
    Row,
    Col,
    Input,
    Button,
    Radio,
    Select,
    DatePicker
} from 'antd'
import {
    ListItem,
    ItemDiv,
    QuantityAndButtonDiv,
    Quantity,
    DeleteButton
} from '../RequestForQuotation/style/index'

const PurchaseOrder = () => {
    const [selectedVendor, setSelectedVendor] = useState()
    const [items, setItems] = useState()
    const [quantity, setQuantity] = useState()
    const [itemsList, setItemsList] = useState([])
    const [radioValue, setRadioValue] = useState('A-class');
    const { vendors, allInventoryItems } = useContext(VendorCustomerContext)
    const [startDate, setStartDate] = useState(new Date());
    const [allPO, setAllPO] =useState()

    const { RangePicker } = DatePicker;
    const utc = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
    const shortid = require('shortid')
    const POiD = shortid.generate()
    console.log('all items from PO', allInventoryItems)

    function selectVednor(value) {
        setSelectedVendor(value)
    }
    function selectInventoryItem(value) {
        console.log('value', value)
        setItems(value)
    }
    const CreateList = () => {
        if (items == null) {
            message.error('Items can not left Empty')
        }
        else if (isNaN(quantity) || quantity.length > 2) {
            message.error('Quantity amount not support')
        }

        else {
            setItemsList([...itemsList, { items, quantity, radioValue }])
            setItems('')
            setQuantity('')
        }
    }
    console.log(itemsList)

    const deleteItem = (id) => {
        const newList = [...itemsList]
        newList.splice(id, 1)
        setItemsList(newList);
    }

    const selectQuality = e => {
        setRadioValue(e.target.value);
    };

    const generatePurchaseOrder = () => {
        CreatePurchaseOrder(itemsList, POiD, utc, selectedVendor)
        setItemsList([])
    }

    const getPurchaseOrder = () => {
            // setIsLoading(true)
            firebase
                .firestore()
                .collection("PurchaseOrder")
                .onSnapshot(function (querySnapshot) {
                    const poList = [];
                    querySnapshot.forEach(function (doc) {
                        console.log('functions Doc', doc.data)
                        if (doc.exists) {
                            const comp = doc.data();
                            poList.push({ ...comp, compId: doc.id });
                            // setIsVendor(true)
                        } else {
                            // alert("No such document!");
                            // <EmptyDiv>
                            //     <Empty/>
                            // </EmptyDiv>
                            // setIsVendor(false)
                            
                        }
                    });
                    setAllPO(poList)
                    // setIsVendor(true)
                });
        }
useEffect(()=>{
    getPurchaseOrder()
},[])

// console.log('all PO', allPO?.flatMap(O => O.newList));
console.log('all PO', allPO);
    // function range(start, end) {
    //     const result = [];
    //     for (let i = start; i < end; i++) {
    //         result.push(i);
    //     }
    //     return result;
    // }

    function disabledDate(current) {
        // Can not select days before today and today
        // return current && current < moment().endOf('day');
        // futureDate(current)
        // pastDate(current)
            return current && current < moment().endOf('day')
            // moment().add(1, 'month')  <= current;
        
        
    }

    const disableWeekends = current => {
        console.log('current',current);
        return current.day() !== 0 && current.day() !== 6;
      }

      const selectDate = (date, dateString) => {
console.log(dateString);
      }

    //   function disabledDateTime() {
    //     return {
    //       disabledHours: () => range(0, 24).splice(4, 20),
    //       disabledMinutes: () => range(30, 60),
    //       disabledSeconds: () => [55, 56],
    //     };
    //   }
    // const dateTimePicker = () => {
    //     return (
    //       <DatePicker
    //         selected={startDate}
    //         onChange={date => setStartDate(date)}
    //         dateFormat="MM/yyyy"
    //         showMonthYearPicker
    //       />
    //     ); onChange={e => selectDate(e.target.value)}
    //   };
    return (
        <div>
            <h1>Purchase Order</h1>
            <Divider />
            <Row gutter={[10, 10]}>
                <Col xs={24} sm={20}>
                    <h4>
                        RFQ-ID:{POiD}
                    </h4>
                </Col>
                <Col xs={24} sm={4}>
                    <h4>Date: {utc}</h4>
                </Col>
            </Row>
            <Row gutter={[10, 10]}>

                <Col xs={24} sm={11}>
                    <label>Select Vender: </label>
                    <Select xs={24} sm={16}
                        style={{ width: '200px' }}
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
                <Col xs={24} sm={10}>
                    <label>Select Delivery Date: </label>
                    <DatePicker
                        format="DD-MM-YYYY"
                        disabledDate={disabledDate}
                        // isValidDate={disableWeekends}
                        // isOutsideRange={day => (moment().diff(day) < 6)}
                        onChange={selectDate} 
                        // filterDate={date => date.getDay() !== 6 && date.getDay() !== 0}
                    //   disabledTime={disabledDateTime}
                    //   showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                    />
                    {/* {dateTimePicker()} */}
                </Col>

            </Row>
            <Divider>Add Items with quantity</Divider>
            <Row gutter={[10, 10]}>
                <Col xs={24} sm={6}>
                    {/* <label>Select Item: </label> */}
                    <Select
                        xs={24} sm={6}
                        style={{ width: '200px' }}
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
                {/* <Col xs={24} sm={8}>
                    <Input
                        type='text'
                        placeholder='Enter item name'
                        value={items}
                        onChange={e => setItems(e.target.value)}
                        maxLength={20}
                    />
                </Col> */}
                <Col xs={24} sm={6}>
                    <Input
                        type='number'
                        placeholder='Enter number of Quantity'
                        value={quantity}
                        onChange={e => setQuantity(e.target.value)}
                        maxLength={2}
                    />
                </Col>
                <Col xs={24} sm={9}>
                    <Radio.Group onChange={selectQuality} value={radioValue}>
                        <Radio value={'A-class'}>A</Radio>
                        <Radio value={'B-class'}>B</Radio>
                        <Radio value={'C-class'}>C</Radio>
                    </Radio.Group>
                </Col>
                <Col xs={24} sm={1}>

                    <Button
                        onClick={CreateList}
                    >Add</Button>
                </Col>

            </Row>

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
        </div>
    )
}
export default PurchaseOrder