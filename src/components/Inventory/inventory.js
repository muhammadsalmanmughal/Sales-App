import React, { useState, useEffect, useContext } from 'react'
import firebase from '../../config/Firebase/firebase';
import { CreateInventory, getInentoryDetails, CapitalizeWords } from '../../Utils/utils'
import { UserContext } from '../../context/UserContext/UserContext'
import { PlusSquareOutlined } from "@ant-design/icons";
import {
    Divider,
    message,
    Row,
    Col,
    Input,
    Button,
    Select,
    Modal,
    Table,
    Space,
} from 'antd'

const Inventory = () => {
    const [itemName, setItemsName] = useState()
    const [unitOfMeassure, setUnitOfMeassure] = useState()
    const [inventoryItems, setInventoryItems] = useState()
    const [itemDetails, setItemDetails] = useState()
    const { user, setAllInventoryItems } = useContext(UserContext)

    //#region  modal
    const [isModalVisible, setIsModalVisible] = useState(false);
    const itemDataObj = {
        name: user && user[0].name,
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

    const handleOk = () => {
        if (!itemName) return message.error('Items can not be left empty')
        if (!unitOfMeassure) return message.error('Select Unit of Meassure')

        CreateInventory(itemDataObj)
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

    function UOM(value) {
        setUnitOfMeassure(value)
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
            <Button type='primary' onClick={showModal}>
                <PlusSquareOutlined />
                Add New Items
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
                {itemDetails && itemDetails.map((item, key) => {
                    return (
                        <>
                        {setAllInventoryItems(item.itemsName)}
                            <h2>{item.itemsName}</h2>
                            <h3>{item.unitOfMeassure}</h3>
                        </>
                    )
                })}
            </Modal>
            <div>
                <Table dataSource={inventoryItems} columns={columns} />;
            </div>

        </div>
    )
}
export default Inventory