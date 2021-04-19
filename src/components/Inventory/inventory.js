import React, { useState, useEffect, useContext } from 'react'
import firebase from '../../config/Firebase/firebase';
import { VendorCustomerContext } from '../../context/Random/random'
import {
    CreateInventory,
    getInentoryDetails,
    CapitalizeWords,
    getInventoryItemData
} from '../../Utils/utils'
import { UserContext } from '../../context/UserContext/UserContext'
import { PlusSquareOutlined } from "@ant-design/icons";

import {
    Divider, message, Row, Col, Input, Button, Select, Modal, Table, Space, Alert, Tabs
} from 'antd'

const Inventory = () => {
    const { user, allInventoryItems } = useContext(UserContext)
    const value = useContext(VendorCustomerContext)
    console.log('valiue--------->', value.allInventoryItems)

    const [itemName, setItemsName] = useState()
    const [itemID,setItemID] = useState()
    const [unitOfMeassure, setUnitOfMeassure] = useState()
    const [inventoryItems, setInventoryItems] = useState()
    const [itemDetails, setItemDetails] = useState()
    const [allItemsName, setAllItemsName] = useState()
    // ----------------------------------------------------
    const [retreiveItem, setRetreiveItem] = useState('')
    const [specificItemData, setSpecificItemData] = useState()

    //#region  modal
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [updateInventoryModal, setUpdateInventoryModal] = useState(false)
    const itemDataObj = {
        name: user && user[0].name,
        itemId:itemID,
        email: user && user[0].email,
        url: user && user[0].url,
        unitOfMeassure,
        date: new Date().toJSON().slice(0, 10).replace(/-/g, '/'),
        itemsName: CapitalizeWords(itemName),
        quantity: '0'
    }
    const showModal = () => {
        setIsModalVisible(true);
    };
    const showUpdateInventoryModal = () => {
        setUpdateInventoryModal(true);
    };
    const closeUpdateInventoryModal = () => {
        setUpdateInventoryModal(false);
    };
    const handleOk = () => {
        if (!itemName) return message.error('Items can not be left empty')
        if (!unitOfMeassure) return message.error('Select Unit of Meassure')
        if ( itemID < 0 ) return message.error('Items Id not acceptable')
        // CreateInventory(itemDataObj)
        setItemsName('')
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    //----------Inventory Details--------------

    const [isInventoryModalVisible, setIsInventoryModalVisible] = useState(false);
    const showInventoryModal = (id) => {
        getInentoryDetails(id).then(data => {
            setItemDetails(data)
        })
        setIsInventoryModalVisible(true)
    }
    const onInvModalClose = () => {
        setIsInventoryModalVisible(false);
    };
    //#endregion

    const { Option } = Select;

    useEffect(() => {
        itemDetails && itemDetails.map((item, key) => {
            setAllItemsName(item)
        })
    }, [])

    console.log('retreiveItem', retreiveItem);
    const getItemData = (retreiveItem) => {
        console.log('retreiveItem', retreiveItem);
    }
    useEffect(() => {
        // getInventoryItemData(retreiveItem)
        if (!retreiveItem) {
            <Alert
                message="Error"
                description="Select item."
                type="error"
                showIcon
            />
        }
        else {
            getInventoryItemData(retreiveItem).then((data) => {
                console.log('specific item detail data function called', data)
                setSpecificItemData(data[0].quantity)
            })
        }
    }, [retreiveItem])

    // console.log('specificItemData', specificItemData)

    function UOM(value) {
        setUnitOfMeassure(value)
    }

    function getItemQuantity(value) {
        setRetreiveItem(value)
    }

    const GetAllInventory = () => {
        firebase
            .firestore()
            .collection("Item_Master")
            .onSnapshot(function (querySnapshot) {
                const inventoryList = [];
                querySnapshot.forEach(function (doc) {
                    if (doc.exists) {
                        const comp = doc.data();
                        inventoryList.push({ ...comp, compId: doc.id });
                    } else {
                        message.info('No data! Please insert some')
                    }
                });
                setInventoryItems(inventoryList)
            });
    }

    useEffect(() => {
        GetAllInventory()
    }, [])

    const columns = [
        {
            title: 'Items Name',
            dataIndex: 'itemsName',
            key: 'name',
        },
        {
            title: 'Unit Of Meassure',
            dataIndex: 'unitOfMeassure',
            key: 'uom',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Action',
            key: 'action',
            render: (inventoryItems) => (
                <Space size="middle">
                    <Button
                        onClick={() => showInventoryModal(inventoryItems.iD)}
                    >Details</Button>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <h1>INVENTORY</h1>
            <Divider />
            <Button onClick={showModal}>
                <PlusSquareOutlined />
                Add New Items
            </Button>
            <Button onClick={showUpdateInventoryModal}>
                <PlusSquareOutlined />
                Update Inventory
            </Button>
            <Modal title="Add New Item" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Row gutter={[10, 10]}>
                    <Col xs={24} sm={14}>
                        <Input
                            type='text'
                            placeholder='Enter item name'
                            value={itemName}
                            onChange={e => setItemsName(e.target.value)}
                            maxLength={25}
                        />
                    </Col>
                    <Col xs={24} sm={14}>
                        <Input
                            type='number'
                            placeholder='Enter item ID'
                            // value={itemName}
                            onChange={e => setItemID(e.target.value)}
                            maxLength={3}
                        />
                    </Col>
                    
                    <Col xs={24} sm={10}>
                        <Select placeholder="Select Type" onChange={UOM}>
                            <Option value="packet">Packet</Option>
                            <Option value="dozen">Dozen</Option>
                            <Option value="single">Single</Option>
                        </Select>

                    </Col>
                    <Col sm={24}>
                        <p>
                            By default quantity will be zero.
                        </p>
                    </Col>
                </Row>
            </Modal>

            <Modal title="Item Detail" visible={isInventoryModalVisible} onCancel={onInvModalClose}>
                <h3>Inventory details</h3>

            </Modal>

            <Modal
                title="Update Inventory"
                visible={updateInventoryModal}
                onCancel={closeUpdateInventoryModal}>

                <h3>Update inventory modal</h3>
                {console.log('itemName.itemsName', allInventoryItems && allInventoryItems)}
                <Row gutter={[10, 10]}>
                    <Col xs={24} sm={10}>
                        <Select placeholder="Select Type" style={{ width: '170px' }} onChange={getItemQuantity}>
                            {value.allInventoryItems && value.allInventoryItems.map((itemName, key) => <Select.Option
                                value={itemName.itemsName}
                            >
                                {itemName.itemsName}
                            </Select.Option>
                            )}
                        </Select>

                    </Col>
                    <Col xs={24} sm={10}>
                        <Input placeholder='Show item quantity here' value={specificItemData} disabled />
                    </Col>
                    <Col xs={24} sm={10}>
                        <Input placeholder='Add new amount of inventory' disabled={!specificItemData} />
                    </Col>
                    {/* <Col xs={24} sm={10}>
                            <Button onClick={getItemData}>Update Inentory</Button>
                        </Col> */}
                </Row>
            </Modal>
          
                    <div>
                        <Table dataSource={inventoryItems} columns={columns} />;
                     </div>

        </div>
    )
}
export default Inventory