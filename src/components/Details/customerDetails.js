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
    Switch,
    message
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
    // console.log('detailsData.CompanyName.length',detailsData.CompanyName.length)
    const updateCustomer = () => {
        if(!detailsData.CompanyName ) return message.error('Error! Invalid Company name')
        if(!detailsData.CustomerName ) return message.error('Error! Invalid Customer name')

        if(!detailsData.State) return message.error('Error! Invalid State')
        if(!detailsData.City) return message.error('Error! Invalid City')
        if(!detailsData.BillToAddress) return message.error('Error! Invalid Address')
        if(!detailsData.PostalCode && detailsData.PostalCode.length < 6) return message.error('Error! Invalid Postal Code')
        if(!detailsData.Email) return message.error('Error! Invalid Address')

        if(!detailsData.Phone && detailsData.Phone.length < 11) return message.error('Error! Invalid phone number')
        if(!detailsData.SecondaryPhone && detailsData.SecondaryPhone.length < 11) return message.error('Error! Invalid phone number')
        
        if(!detailsData.ResponsibleName) return message.error('Error! Invalid Responsiable name')
        if(!detailsData.ResponsiblePhone && detailsData.ResponsiblePhone.length < 11) return message.error('Error! Invalid Responsibale phone number')
       
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
                                maxLength='15'
                            />
                        }
                    </Col>

                    <Col xs={24} sm={8}>
                        <h2>Company:</h2>
                        <Input type='text' value={detailsData.CompanyName}
                            onChange={(e) => changeHandler(e, 'CompanyName')}
                            disabled={!isDisable}
                            maxLength='15'
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
                            maxLength='15'
                        />
                    </Col>
                    <Col xs={24} sm={8}>
                        <h2>City:</h2>
                        <Input type='text' value={detailsData.City}
                            onChange={(e) => changeHandler(e, 'City')}
                            disabled={!isDisable}
                            maxLength='15'
                        />
                    </Col>
                </Row>
                <Row gutter={[10, 10]}>
                    <Col xs={24} sm={16}>
                        <h2>Address:</h2>
                        <Input type='text' value={detailsData.BillToAddress}
                            onChange={(e) => changeHandler(e, 'BillToAddress')}
                            disabled={!isDisable}
                            maxLength='50'
                        />
                    </Col>
                    <Col xs={24} sm={8}>
                        <h2>PostalCode:</h2>
                        <Input type='text' value={detailsData.PostalCode}
                            onChange={(e) => changeHandler(e, 'PostalCode')}
                            disabled={!isDisable}
                            maxLength='6'
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
                            maxLength='50'
                        />
                    </Col>
                    <Col xs={24} sm={8}>
                        <h2>Phone Number:</h2>
                        <Input type='text' value={detailsData.Phone}
                            onChange={(e) => changeHandler(e, 'Phone')}
                            disabled={!isDisable}
                            maxLength='11'
                        />
                    </Col>
                    <Col xs={24} sm={8}>
                        <h2>Secondary Phone Number:</h2>
                        <Input type='text' value={detailsData.SecondaryPhone}
                            onChange={(e) => changeHandler(e, 'SecondaryPhone')}
                            disabled={!isDisable}
                            maxLength='11'
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
                            maxLength='15'
                        />
                    </Col>
                    <Col xs={24} sm={8}>
                        <h2>Phone Number:</h2>
                        <Input type='text' value={detailsData.ResponsiblePhone}
                            onChange={(e) => changeHandler(e, 'ResponsiblePhone')}
                            disabled={!isDisable}
                            maxLength='11'
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