import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { CaretLeftOutlined } from "@ant-design/icons";
import { Goback } from '../Details/styles/index'
import { getPODetails,updateInventoryItem } from '../../Utils/utils'
import {
    Divider, Modal, Input,Button, Skeleton, Table, Space, message
} from 'antd'

import { TableSkeleton, ParaSkeleton } from '../../Utils/skeleton'
const PurchaseOrderDetails = () => {
    const [POItemData, setPOItemData] = useState()
    const [retrieveQuantity, setRetrieveQuantity] = useState()
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [itemID,setItemID] = useState()
    const [requestedQuantity,setRequestedQuantity] =useState()
    const [itemQuantity,setItemQuantity] = useState()

    const history = useHistory()
    const { slug } = useParams()

    useEffect(() => {
        getPODetails(slug).then(data => {
            setPOItemData(data)
        })
    }, [])

    const itemsList = POItemData?.flatMap(O => O.newList)

    // const itemRetrieveValue = (quantity) => {
    //     console.log({ quantity })
    //     setRetrieveQuantity(quantity)
    // }
    // console.log({ itemsList });

    // const updateItemQuantity = (id) => {
    //     console.log(`itemID: ${id}`, `item Amount: ${retrieveQuantity}`);
    // }
    // ------------Modal-------------
    const showModal = (id,req_quantity) => {
        setItemID(id)
        setIsModalVisible(true);
        setRequestedQuantity(req_quantity)
    };

    const handleOk = () => {
        if(itemQuantity > requestedQuantity) return message.error('Quantity Error');
        if(itemQuantity < 0) return message.error('Quantity Error');
        updateInventoryItem(itemID,itemQuantity)
        setIsModalVisible(false); 
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    // -----------Modal--------------
    // console.log({ POItemData });
    const columns = [
        {
            title: 'Items ID',
            dataIndex: 'itemId',
            key: 'id',
        },
        {
            title: 'Items Name',
            dataIndex: 'items',
            key: 'name',
        },
        {
            title: 'Price Per Item',
            dataIndex: 'pricePerItem',
            key: 'price',
        },
        {
            title: 'Requested Quantity',
            dataIndex: 'quantity',
            key: 'requested_quantity',
        },
        {
            title: 'Retrieve Quantity',
            dataIndex: 'retrieve',
            key: 'retrieve_quantity',
            // render: (allPO) => (
            //     <Space size="middle">
            //         {/* <Button onClick={() =>
            //             history.push(`/home/purchase-order-details/${allPO.compId}`)}
            //         >Details</Button> */}
            //         <Input
            //         type='number' 
            //         placeholder='Enter Retrieve Quantity'
            //         // value={}
            //         onChange={e => itemRetrieveValue(e.target.value)}
            //         />
            //     </Space>
            // ),
        },
        {
            title: 'Remaining',
            dataIndex: 'remaining',
            key: 'remainingQuantity',
        },
        {
            title: 'Class',
            dataIndex: 'radioValue',
            key: 'class',
        },
        {
            title: 'Description',
            dataIndex: 'discription',
            key: 'discription',
        },
        {
            title: 'Action',
            key: 'action',
            render: (allPO) => (
                <Space size="middle">
                    <Button
                        onClick={e => showModal(allPO.itemId, allPO.quantity)}
                    >Update Inventory</Button>
                </Space>
            ),
        },

    ];
    return (
        <div>
            <Goback onClick={e => history.goBack()}>
                <CaretLeftOutlined /> GoBack
            </Goback>

            <h1>Purchase Order Details</h1>

            <Divider />

            { POItemData ?
                POItemData.map((item, key) => {
                    return (
                        <div>
                            <p>PO-ID: {item.POiD}</p>
                            <p>Requried Date:{item.requriedDate}</p>
                            <p>created Date:{item.createdDate}</p>
                            <p>Vendor Name:{item.selectVendor}</p>
                            <p>Status: {item.POStatus}</p>
                        </div>
                    )
                }) : <Skeleton active />
            }
            <div>
                {itemsList ?
                    <Table dataSource={itemsList} columns={columns} /> : <TableSkeleton />
                }
            </div>
            <Modal title="Update Item Quantity" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <label>Item ID: {itemID}</label>
                <Input type='number' placeholder='Number of Quantity' onChange={e => setItemQuantity(e.target.value)}/>
            </Modal>
        </div>
    )
}
export default PurchaseOrderDetails