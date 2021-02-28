import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { getSpecificData, UpdateCustomer } from '../../Utils/utils'
import { CaretLeftOutlined } from "@ant-design/icons";
import { Goback } from './styles/index'
import {
    Divider,
    Row,
    Col,
    Input,
    Button,
    Switch
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
    const [isDisable, setisDisable] = useState(true)
    const { slug, Cname } = useParams()
    const history = useHistory();
    useEffect(() => {
        getSpecificData(slug, Cname).then(data => {
            setDetailsData(data[0])
        })
        DisableFields(false)
    }, [])

    const changeHandler = (key, value) => {
        setDetailsData({ ...detailsdData, [value]: key.target.value })
    }

    const updateCustomer = () => {
        UpdateCustomer(detailsdData, detailsdData.compId)
    }

    function DisableFields(checked) {
        console.log(`switch to ${checked}`);
        setisDisable(checked)
    }
    // console.log('customerDetails------->', detailsdData, detailsdData.compId)
    return (
        <div>
            <Goback onClick={e => history.goBack()}>
                <CaretLeftOutlined /> GoBack
            </Goback>
            <h2>Customer Details page</h2>
            <label> Update
                <Switch
                    size='small'
                    onChange={DisableFields}
                />
            </label>
            <div>
                <Divider orientation="left">
                    <h2>Name</h2>
                </Divider>
                <Row gutter={[10, 10]}>
                    <Col xs={24} sm={16}>
                        <h2>Name:</h2>
                        {
                            <Input type='text' value={detailsdData.businessName}
                                onChange={(e) => changeHandler(e, 'businessName')}
                                disabled={!isDisable}
                            />
                        }
                    </Col>

                    <Col xs={24} sm={8}>
                        <h2>Company:</h2>
                        <Input type='text' value={detailsdData.companyName}
                            onChange={(e) => changeHandler(e, 'companyName')}
                            disabled={!isDisable}
                        />
                    </Col>

                </Row>
                <Divider orientation="left">
                    <h2>Address</h2>
                </Divider>
                <Row gutter={[10, 10]}>
                    <Col xs={24} sm={16}>
                        <h2>State:</h2>
                        <Input type='text' value={detailsdData.state}
                            onChange={(e) => changeHandler(e, 'state')}
                            disabled={!isDisable}
                        />
                    </Col>
                    <Col xs={24} sm={8}>
                        <h2>City:</h2>
                        <Input type='text' value={detailsdData.city}
                            onChange={(e) => changeHandler(e, 'city')}
                            disabled={!isDisable}
                        />
                    </Col>
                </Row>
                <Row gutter={[10, 10]}>
                    <Col xs={24} sm={16}>
                        <h2>Address:</h2>
                        <Input type='text' value={detailsdData.billToAddress}
                            onChange={(e) => changeHandler(e, 'billToAddress')}
                            disabled={!isDisable}
                        />
                    </Col>
                    <Col xs={24} sm={8}>
                        <h2>PostalCode:</h2>
                        <Input type='text' value={detailsdData.postalCode}
                            onChange={(e) => changeHandler(e, 'postalCode')}
                            disabled={!isDisable}
                        />
                    </Col>
                </Row>
                <Divider orientation='left'>
                    <h2>Contact</h2>
                </Divider>
                <Row gutter={[10, 10]}>
                    <Col xs={24} sm={16}>
                        <h2>Email:</h2>
                        <Input type='text' value={detailsdData.email}
                            onChange={(e) => changeHandler(e, 'email')}
                            disabled={!isDisable}
                        />
                    </Col>
                    <Col xs={24} sm={8}>
                        <h2>Phone Number:</h2>
                        <Input type='text' value={detailsdData.phone}
                            onChange={(e) => changeHandler(e, 'phone')}
                            disabled={!isDisable}
                        />
                    </Col>
                    <Col xs={24} sm={8}>
                        <h2>Secondary Phone Number:</h2>
                        <Input type='text' value={detailsdData.secondaryPhone}
                            onChange={(e) => changeHandler(e, 'secondaryPhone')}
                            disabled={!isDisable}
                        />
                    </Col>
                </Row>
                <Divider orientation='left'>
                    <h2>Responsible Details</h2>
                </Divider>
                <Row gutter={[10, 10]}>
                    <Col xs={24} sm={16}>
                        <h2>Name:</h2>
                        <Input type='text' value={detailsdData.responsibleName}
                            onChange={(e) => changeHandler(e, 'responsibleName')}
                            disabled={!isDisable}
                        />
                    </Col>
                    <Col xs={24} sm={8}>
                        <h2>Phone Number:</h2>
                        <Input type='text' value={detailsdData.responsiblePhone}
                            onChange={(e) => changeHandler(e, 'responsiblePhone')}
                            disabled={!isDisable}
                        />
                    </Col>
                </Row>
                <Row gutter={[10, 10]}>
                    <Col xs={24} sm={16}>
                        <Button onClick={updateCustomer}
                            disabled={!isDisable}
                        >Update</Button>
                    </Col>
                </Row>
            </div>
        </div>
    )
}
export default VendorDetails