import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { getSpecificData, abcfunction } from '../../Utils/utils'
import { CaretLeftOutlined } from "@ant-design/icons";
import { Goback } from './styles/index'
import {
    Divider,
    Row,
    Col
} from 'antd';
const VendorDetails = () => {
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
    const { slug, Cname } = useParams()
    const history = useHistory();
    useEffect(() => {
        getSpecificData(slug, Cname).then(data => {
            setDetailsData(data[0])
        })
    }, [])

    const changeHandler = (key, value) => {
        setDetailsData({ ...detailsdData, [value]: key.target.value })
    }
    const click = () => {
        abcfunction(detailsdData, detailsdData.compId)
    }

    console.log('customerDetails------->', detailsdData, detailsdData.compId)
    return (
        <div>
            <Goback onClick={e => history.goBack()}>
                <CaretLeftOutlined /> GoBack
            </Goback>
            <h2>Customer Details page</h2>
            <button onClick={click}>Click</button>
            {/* {detailsdData.map(data => { */}
            {/* return ( */}
            <div>
                <Divider orientation="left">
                    <h2>Name</h2>
                </Divider>
                <Row gutter={[10, 10]}>
                    <Col xs={24} sm={16}>
                        <h2>Name:</h2>
                        {
                            // <h3>{data.businessName}</h3>
                            <input type='text' value={detailsdData.businessName}
                                onChange={(e) => changeHandler(e, 'businessName')} />

                        }
                    </Col>
                    <Col xs={24} sm={8}>
                        <h2>Company:</h2>
                        {/* <h3>{data.companyName}</h3> */}
                        <input type='text' value={detailsdData.companyName}
                            onChange={(e) => changeHandler(e, 'companyName')} />
                    </Col>

                </Row>
                <Divider orientation="left">
                    <h2>Address</h2>
                </Divider>
                <Row gutter={[10, 10]}>
                    <Col xs={24} sm={16}>
                        <h2>State:</h2>
                        <input type='text' value={detailsdData.state}
                            onChange={(e) => changeHandler(e, 'state')} />
                    </Col>
                    <Col xs={24} sm={8}>
                        <h2>City:</h2>
                        {/* <h3>{data.city}</h3> */}
                        <input type='text' value={detailsdData.city}
                            onChange={(e) => changeHandler(e, 'city')} />
                    </Col>
                </Row>
                <Row gutter={[10, 10]}>
                    <Col xs={24} sm={16}>
                        <h2>Address:</h2>
                        {/* <h3>{data.billToAddress}</h3> */}
                        <input type='text' value={detailsdData.billToAddress}
                            onChange={(e) => changeHandler(e, 'billToAddress')} />
                    </Col>
                    <Col xs={24} sm={8}>
                        <h2>PostalCode:</h2>
                        {/* <h3>{data.postalCode}</h3> */}
                        <input type='text' value={detailsdData.postalCode}
                            onChange={(e) => changeHandler(e, 'postalCode')} />
                    </Col>
                </Row>
                <Divider orientation='left'>
                    <h2>Contact</h2>
                </Divider>
                <Row gutter={[10, 10]}>
                    <Col xs={24} sm={16}>
                        <h2>Email:</h2>
                        {/* <h3>{data.email}</h3> */}
                        <input type='text' value={detailsdData.email}
                            onChange={(e) => changeHandler(e, 'email')} />
                    </Col>
                    <Col xs={24} sm={8}>
                        <h2>Phone Number:</h2>
                        {/* <h3>{data.phone}</h3> */}
                        <input type='text' value={detailsdData.phone}
                            onChange={(e) => changeHandler(e, 'phone')} />
                    </Col>
                    <Col xs={24} sm={8}>
                        <h2>Secondary Phone Number:</h2>
                        {/* <h3>{data.secondaryPhone}</h3> */}
                        <input type='text' value={detailsdData.secondaryPhone}
                            onChange={(e) => changeHandler(e, 'secondaryPhone')} />
                    </Col>
                </Row>
                <Divider orientation='left'>
                    <h2>Responsible Details</h2>
                </Divider>
                <Row gutter={[10, 10]}>
                    <Col xs={24} sm={16}>
                        <h2>Name:</h2>
                        {/* <h3>{data.email}</h3> */}
                        <input type='text' value={detailsdData.responsibleName}
                            onChange={(e) => changeHandler(e, 'responsibleName')} />
                    </Col>
                    <Col xs={24} sm={8}>
                        <h2>Phone Number:</h2>
                        {/* <h3>{data.responsiblePhone}</h3> */}
                        <input type='text' value={detailsdData.responsiblePhone}
                            onChange={(e) => changeHandler(e, 'responsiblePhone')} />
                    </Col>
                </Row>
            </div>
                )
            {/* } */}
            )
            {/* } */}
        </div>
    )
}
export default VendorDetails