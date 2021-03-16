import React, { useState } from 'react'
import {
    Divider,
    message,
    Row,
    Col,
    Input,
    Button,
    Radio,
    Select,
    Tabs
} from 'antd'
const Inventory = () => {
    function callback(key) {
        console.log(key);
      }
    const { TabPane } = Tabs;
    return (
        <div>
            <h1>INVENTORY</h1>
            <Divider />
            <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab="Total Inventory" key="1">
                    Inventory
    </TabPane>
                <TabPane tab="Add Inventory" key="2">
                   Add Inventory
    </TabPane>
            </Tabs>
        </div>
    )
}
export default Inventory