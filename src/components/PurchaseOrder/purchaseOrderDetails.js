import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { CaretLeftOutlined } from "@ant-design/icons";
import { Goback } from '../Details/styles/index'
import { getPODetails } from '../../Utils/utils'
import {
    Divider, Input, Skeleton, Table, Space
} from 'antd'

import {TableSkeleton, ParaSkeleton} from '../../Utils/skeleton'
const PurchaseOrderDetails = () => {
    const [POItemData, setPOItemData] = useState()
    const [retrieveQuantity,setRetrieveQuantity] = useState()
    const history = useHistory()
    const { slug } = useParams()

    useEffect(() => {
        getPODetails(slug).then(data => {
            setPOItemData(data)
        })
    }, [])
    const itemsList = POItemData?.flatMap(O => O.newList)
        
    const itemRetrieveValue = (quantity) => {
        console.log({quantity})
    }
    // console.log({ itemsList });


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
            key: 'retrieve_quantity',
            render: (allPO) => (
                <Space size="middle">
                    {/* <Button onClick={() =>
                        history.push(`/home/purchase-order-details/${allPO.compId}`)}
                    >Details</Button> */}
                    <Input
                    type='number' 
                    placeholder='Enter Retrieve Quantity'
                    // value={}
                    onChange={e => itemRetrieveValue(e.target.value)}
                    />
                </Space>
            ),
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
          {/* <TableSkeleton/> */}
            {/* <ParaSkeleton/> */}
            <div>
                {itemsList?
                        <Table dataSource={itemsList} columns={columns} /> : <TableSkeleton/>
                }
                     </div>
        </div>
    )
}
export default PurchaseOrderDetails