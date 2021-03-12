import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { getSpecificData } from '../../Utils/utils'
import { CaretLeftOutlined } from "@ant-design/icons";
import { Goback } from '../Details/styles/index'
import {
    Divider,
    Row,
    Col,
    Input,
    Button
} from 'antd';
const CustomerOrder = () => {
    const [detailsdData, setDetailsData] = useState(
        {
            billToAddress: "",
            businessName: "",
            city: "",
            compId: "",
            email: "",
            state: '',
            iD: "",
            phone: '',
            postalCode: '',
            responsibleName: "",
            responsiblePhone: "",
            secondaryPhone: ""
        }
    )
    const [orderDetails, setOrderDetails] = useState()
    const { slug, Cname } = useParams()
    const history = useHistory();
    useEffect(() => {
        getSpecificData(slug, Cname).then(data => {
            setDetailsData(data[0])
        })
    }, [])
    const utc = new Date().toJSON().slice(0, 10).replace(/-/g, '/');

    const CreateCustomerOrder = () => {
        console.log(detailsdData && detailsdData, orderDetails)
        setOrderDetails('')
    }

    return (
        <div>
            <Goback onClick={e => history.goBack()}>
                <CaretLeftOutlined /> GoBack
            </Goback>
            <Row gutter={[10, 10]}>
                <Col xs={24} sm={12}>
                    <h3>
                        Customer Order
            </h3>
                </Col>
                <Col xs={24} sm={12}>
                    <h3>
                        Date: {utc}
                    </h3>
                </Col>
            </Row>
            <Divider />
            <Row gutter={[10, 10]}>
                <Col xs={24} sm={8}>
                    <h4>Name:</h4>
                    {
                        <Input type='text' value={detailsdData.businessName}
                            disabled
                        />
                    }
                </Col>
                <Col xs={24} sm={8}>
                    <h4>Company Name:</h4>
                    {
                        <Input type='text' value={detailsdData.companyName}
                            disabled
                        />
                    }
                </Col>
                <Col xs={24} sm={8}>
                    <h4>Phone:</h4>
                    {
                        <Input type='text' value={detailsdData.phone}
                            disabled
                        />
                    }
                </Col>
            </Row>
            <Row gutter={[10, 10]}>
                <Col xs={24} sm={24}>
                    <h4>Address:</h4>
                    {
                        <Input type='text' value={detailsdData.billToAddress}
                            disabled
                        />
                    }
                </Col>
            </Row>
            <Row gutter={[10, 10]}>
                <Col xs={24} sm={8}>
                    <h4>State</h4>
                    {
                        <Input type='text' value={detailsdData.state}
                            disabled
                        />
                    }
                </Col>
                <Col xs={24} sm={8}>
                    <h4>City</h4>
                    {
                        <Input type='text' value={detailsdData.city}
                            disabled
                        />
                    }
                </Col>
                <Col xs={24} sm={8}>
                    <h4>Postal Code</h4>
                    {
                        <Input type='text' value={detailsdData.postalCode}
                            disabled
                        />
                    }
                </Col>
            </Row>
            <Row gutter={[10, 10]}>
                <Col xs={24} sm={24}>
                    <h4>Discription</h4>
                    {
                        <Input.TextArea
                            value={orderDetails}
                            rows={7}
                            onChange={e => setOrderDetails(e.target.value)} />
                    }
                </Col>
            </Row>
            <Row gutter={[10, 10]}>
                <Col xs={24} sm={16}>
                    <Button 
                    disabled={!orderDetails}
                    onClick={CreateCustomerOrder}>
                        CreateCustomerOrder
    </Button>
                </Col>
            </Row>
        </div>
    )
}
export default CustomerOrder