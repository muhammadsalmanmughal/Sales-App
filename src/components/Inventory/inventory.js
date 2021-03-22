import React, { useState, useEffect } from 'react'
import firebase from '../../config/Firebase/firebase';
import { useHistory } from 'react-router-dom'
import { CreateInventory } from '../../Utils/utils'
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
    const [itemsName, setItemsName] = useState()
    const [unitOfMeassure, setUnitOfMeassure] = useState()
    const [inventoryItems, setInventoryItems] = useState()
    //#region  modal
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        if (!itemsName) return message.error('Items can not be left empty')
        if (!unitOfMeassure) return message.error('Select Unit of Meassure')
        CreateInventory(itemsName, unitOfMeassure)
        setItemsName('')
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    //#endregion

    const history = useHistory();
    const { Option } = Select;

    function UOM(value) {
        console.log(`selected ${value}`);
        setUnitOfMeassure(value)
    }
    function callback(key) {
        console.log(key);
    }

    const GetInventoryItems = () => {
        // setIsLoading(true)
        firebase
            .firestore()
            .collection("Item_Master")
            .onSnapshot(function (querySnapshot) {
                const inventoryList = [];
                querySnapshot.forEach(function (doc) {
                    console.log('functions Doc', doc.data)
                    if (doc.exists) {
                        const comp = doc.data();
                        inventoryList.push({ ...comp, compId: doc.id });
                    } else {
                        // alert("No such document!");
                        // <EmptyDiv>
                        //     <Empty/>
                        // </EmptyDiv>
                    }
                });
                setInventoryItems(inventoryList)
            });
    }
    useEffect(() => {
        GetInventoryItems()
    }, [])
    console.log('All Inventory------>', inventoryItems)

    const columns = [
        {
            title: 'Items Name',
            dataIndex: 'itemsName',
            key: 'name',
        },
        {
            title: 'Unit Of Meassure',
            dataIndex: 'Type',
            key: 'uom',
        },
        {
            title: 'Quantity',
            dataIndex: '0',
            key: 'quantity',
        },
        {
            title: 'Action',
            key: 'action',
            render: (vendors) => (
                <Space size="middle">
                    <Button
                    // onClick={() =>
                    //     history.push(`/home/vendor-details/${vendors.compId}/${'Vendor'}`)}
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
                            value={itemsName}
                            onChange={e => setItemsName(e.target.value)}
                            maxLength={20}
                        />
                    </Col>
                    <Col xs={24} sm={10}>
                        <Select placeholder="Select Type" onChange={UOM}>
                            <Option value="packet">Packet</Option>
                            <Option value="dozen">Dozen</Option>
                            <Option value="single">Single</Option>
                        </Select>

                    </Col>
                </Row>
            </Modal>
            <div>
                <Table dataSource={inventoryItems} columns={columns} />;
            </div>

        </div>
    )
}
export default Inventory