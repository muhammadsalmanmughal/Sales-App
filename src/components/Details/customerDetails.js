import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { getSpecificData } from '../../Utils/utils'
import { CaretLeftOutlined } from "@ant-design/icons";
import {Goback} from './styles/index'
import {
    Divider,
    Row,
    Col
} from 'antd';
const VendorDetails = () => {
    const [detailsdData, setDetailsData] = useState([])
    const { slug, Cname } = useParams()
    console.log('customerDetails------->', slug, Cname)
    const history = useHistory();
    const params = useParams();
    useEffect(() => {
        getSpecificData(slug, Cname).then(data => {
            setDetailsData(data)
        })
    }, [])

    const { city } = detailsdData
    return (
        <div>
            <Goback onClick={e => history.goBack()}>
            <CaretLeftOutlined /> GoBack
            </Goback>
            <h2>Customer Details page</h2>

            {detailsdData.map(data => {
                return (
                    <div>
                        <Divider orientation="left">
                            <h2>Name</h2>
                        </Divider>
                        <Row gutter={[10, 10]}>
                            <Col xs={24} sm={16}>
                                <h2>Name:</h2>
                               {
                                <h3>{data.businessName}</h3>
                            }
                            </Col>
                            <Col xs={24} sm={8}>
                                <h2>Company:</h2>
                                <h3>{data.companyName}</h3>
                            </Col>

                        </Row>
                        <Divider orientation="left">
                            <h2>Address</h2>
                        </Divider>
                        <Row gutter={[10, 10]}>
                            <Col xs={24} sm={16}>
                                <h2>State:</h2>
                                <h3>State</h3>
                            </Col>
                            <Col xs={24} sm={8}>
                                <h2>City:</h2>
                                <h3>{data.city}</h3>
                            </Col>
                        </Row>
                        <Row gutter={[10, 10]}>
                            <Col xs={24} sm={16}>
                                <h2>Address:</h2>
                                <h3>{data.billToAddress}</h3>
                            </Col>
                            <Col xs={24} sm={8}>
                                <h2>PostalCode:</h2>
                                <h3>{data.postalCode}</h3>
                            </Col>
                        </Row>
                        <Divider orientation='left'>
                            <h2>Contact</h2>
                        </Divider>
                        <Row gutter={[10, 10]}>
                            <Col xs={24} sm={16}>
                                <h2>Email:</h2>
                                <h3>{data.email}</h3>
                            </Col>
                            <Col xs={24} sm={8}>
                                <h2>Phone Number:</h2>
                                <h3>{data.phone}</h3>
                            </Col>
                            <Col xs={24} sm={8}>
                                <h2>Secondary Phone Number:</h2>
                                <h3>{data.secondaryPhone}</h3>
                            </Col>
                        </Row>
                        <Divider orientation='left'>
                            <h2>Responsible Details</h2>
                        </Divider>
                        <Row gutter={[10, 10]}>
                            <Col xs={24} sm={16}>
                                <h2>Name:</h2>
                                <h3>{data.email}</h3>
                            </Col>
                            <Col xs={24} sm={8}>
                                <h2>Phone Number:</h2>
                                <h3>{data.phone}</h3>
                            </Col>
                        </Row>
                    </div>
                )
            })}
        </div>
    )
}
export default VendorDetails