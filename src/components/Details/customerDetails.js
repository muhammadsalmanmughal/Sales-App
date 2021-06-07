import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { getSpecificData, UpdateCustomer } from '../../Utils/utils'
import { CaretLeftOutlined } from "@ant-design/icons";
import { Goback } from '../../Utils/styles'
import {
    Divider,
    Row,
    Col,
    Input,
    Button,
    Switch
} from 'antd';
const CustomerDetails = () => {
    const [detailsData, setDetailsData] = useState(
        {
            billToAddress: "",
            CustomerName: "",
            companyName:"",
            city: "",
            compId: "",
            email: "",
            state: '',
            iD: "",
            phone: '',
            postalCode: '',
            responsibleName: "",
            responsiblePhone: "",
            secondaryPhone: "",
            state:''
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

    function DisableFields(checked) {
        setisDisable(checked)
    }
    const changeHandler = (key, value) => {
        setDetailsData({ ...detailsData, [value]: key.target.value })
    }
    const updateCustomer = () => {
        UpdateCustomer(detailsData, detailsData.compId)
    }

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
                            <Input type='text' value={detailsData.CustomerName}
                                onChange={(e) => changeHandler(e, 'CustomerName')}
                                disabled={!isDisable}
                            />
                        }
                    </Col>

                    <Col xs={24} sm={8}>
                        <h2>Company:</h2>
                        <Input type='text' value={detailsData.CompanyName}
                            onChange={(e) => changeHandler(e, 'CompanyName')}
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
                        <Input type='text' value={detailsData.State}
                            onChange={(e) => changeHandler(e, 'State')}
                            disabled={!isDisable}
                        />
                    </Col>
                    <Col xs={24} sm={8}>
                        <h2>City:</h2>
                        <Input type='text' value={detailsData.City}
                            onChange={(e) => changeHandler(e, 'City')}
                            disabled={!isDisable}
                        />
                    </Col>
                </Row>
                <Row gutter={[10, 10]}>
                    <Col xs={24} sm={16}>
                        <h2>Address:</h2>
                        <Input type='text' value={detailsData.BillToAddress}
                            onChange={(e) => changeHandler(e, 'BillToAddress')}
                            disabled={!isDisable}
                        />
                    </Col>
                    <Col xs={24} sm={8}>
                        <h2>PostalCode:</h2>
                        <Input type='text' value={detailsData.PostalCode}
                            onChange={(e) => changeHandler(e, 'PostalCode')}
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
                        <Input type='text' value={detailsData.Email}
                            onChange={(e) => changeHandler(e, 'Email')}
                            disabled={!isDisable}
                        />
                    </Col>
                    <Col xs={24} sm={8}>
                        <h2>Phone Number:</h2>
                        <Input type='text' value={detailsData.Phone}
                            onChange={(e) => changeHandler(e, 'Phone')}
                            disabled={!isDisable}
                        />
                    </Col>
                    <Col xs={24} sm={8}>
                        <h2>Secondary Phone Number:</h2>
                        <Input type='text' value={detailsData.SecondaryPhone}
                            onChange={(e) => changeHandler(e, 'SecondaryPhone')}
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
                        <Input type='text' value={detailsData.ResponsibleName}
                            onChange={(e) => changeHandler(e, 'ResponsibleName')}
                            disabled={!isDisable}
                        />
                    </Col>
                    <Col xs={24} sm={8}>
                        <h2>Phone Number:</h2>
                        <Input type='text' value={detailsData.ResponsiblePhone}
                            onChange={(e) => changeHandler(e, 'ResponsiblePhone')}
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
export default CustomerDetails