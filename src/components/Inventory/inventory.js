import React, { useState } from 'react'
import { CreateInventory } from '../../Utils/utils'
import AllInventory from './allInventory'
import {
    Divider,
    message,
    Row,
    Col,
    Input,
    Button,
    Select,
    Tabs,
    Modal
} from 'antd'
import {
    ListItem,
    ItemDiv,
    QuantityAndButtonDiv,
    Quantity,
    DeleteButton
} from '../RequestForQuotation/style/index'
const Inventory = () => {
    const [itemsName, setItemsName] = useState()
    const [itemSize, setItemSize] = useState()
    const [itemsList, setItemsList] = useState([])
    const [unitOfMeassure, setUnitOfMeassure] = useState()
    //-------------------------------------------------------
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        if(!itemsName) return message.error('Items can not be left empty')
        if(!unitOfMeassure) return message.error('Select Unit of Meassure')
        CreateInventory(itemsName, unitOfMeassure)
        setItemsName('')
        // setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    //-------------------------------------------------------
    const { Option } = Select;
    const CreateList = () => {
        // setIsDisabled(false)
        if (itemsName == null) {
            message.error('Items can not left Empty')
        }
        else if (isNaN(itemSize) || itemSize.length > 3) {
            message.error('Quantity amount not support')
        }
        else if (unitOfMeassure == null) {
            message.error('Please select unit of measure')
        }

        else {
            setItemsList([...itemsList, { itemsName, itemSize, unitOfMeassure }])
            setItemsName('')
            setItemSize('')
        }
    }
    const deleteItem = (id) => {
        const newList = [...itemsList]
        newList.splice(id, 1)
        setItemsList(newList);
    }
    function UOM(value) {
        console.log(`selected ${value}`);
        setUnitOfMeassure(value)
    }
    function callback(key) {
        console.log(key);
    }
    const AddItemsInInventory = () => {
        CreateInventory(itemsList, unitOfMeassure)
        setItemsList([])
    }
    const GetInventoryItems = () => {

    }
    const { TabPane } = Tabs;
    return (
        <div>
            <h1>INVENTORY</h1>
            <Divider />
            <Button onClick={showModal}>
                Add New Items
      </Button>
            <Modal title="Add New Item" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <Row gutter={[10, 10]}>
                <Col xs={24} sm={14}>
                    <Input
                        type='text'
                        placeholder='Enter item name'
                        value={itemsName}
                        onChange={e => setItemsName(e.target.value)}
                        maxLength={20}
                    />
                </Col>
                <Col xs={24} sm={10}>
                            <Select placeholder="Select Type"  onChange={UOM}>
                                <Option value="packet">Packet</Option>
                                <Option value="dozen">Dozen</Option>
                            </Select>

                        </Col>
                </Row>
            </Modal>
            <Row gutter={[10, 10]}>
                {/* <Col xs={24} sm={10}>
                    <Input
                        type='text'
                        placeholder='Enter item name'
                        value={itemsName}
                        onChange={e => setItemsName(e.target.value)}
                        maxLength={20}
                    />
                </Col> */}
                {/* <Col xs={24} sm={6}>
                            <Input
                                type='text'
                                placeholder='Enter item size'
                                value={itemSize}
                                onChange={e => setItemSize(e.target.value)}
                                maxLength={3}
                            />
                        </Col>
                        <Col xs={24} sm={4}>
                            <Select placeholder="Select Type" style={{ width: 120 }} onChange={handleChange}>
                                <Option value="packet">Packet</Option>
                                <Option value="dozen">Dozen</Option>
                            </Select>

                        </Col>
                        <Col xs={24} sm={4}>

                            <Button
                                onClick={CreateList}
                            >Add</Button>
                        </Col> */}
            </Row>
            <ul>
                {
                    itemsList.map((item, key) => {
                        return (
                            <>
                                <ListItem key={key} xs={24} sm={12}>
                                    <ItemDiv>
                                        {item.itemsName}
                                    </ItemDiv>
                                    <QuantityAndButtonDiv>
                                        <Quantity>
                                            {item.itemSize}-
                                                    {item.unitOfMeassure}
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
            {/* <Row gutter={[10, 10]}>
                <Col xs={24} sm={6}>
                    <Button onClick={AddItemsInInventory}>Add item to Inventory</Button>
                </Col>
            </Row> */}

        </div>
    )
}
export default Inventory