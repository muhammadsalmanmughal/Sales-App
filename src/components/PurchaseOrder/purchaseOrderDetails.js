import React from 'react'
import {useHistory} from 'react-router-dom'
import { CaretLeftOutlined } from "@ant-design/icons";
import { Goback } from '../Details/styles/index'
import {
    Divider,
} from 'antd'

const PurchaseOrderDetails = () => {
    const history = useHistory()
    return(
        <div>
              <Goback onClick={e => history.goBack()}>
                <CaretLeftOutlined /> GoBack
            </Goback>
            <h1>Purchase Order Details</h1>
            <Divider/>
        </div>
    )
}
export default PurchaseOrderDetails