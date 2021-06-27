import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { getSpecificData, UpdateVendor } from '../../Utils/utils'
import { CaretLeftOutlined } from "@ant-design/icons";
import { DetailsDiv } from './styles/index'
import { Goback } from '../../Utils/styles'
import {
    Divider,
    Row,
    Col,
    Input,
    Button,
    Switch
} from 'antd';
const VendorDetails = () => {
    const [isDisable, setisDisable] = useState(true)
    const [detailsdData, setDetailsData] = useState(
        {
            ownerFirstName: "",
            ownerLastName: '',
            companyName: "",
            city: "",
            address: "",
            email: "",
            state: '',
            iD: "",
            phone: '',
            postalCode: ''
        }
    )
    const { slug, Cname } = useParams()
    const history = useHistory();

    useEffect(() => {
        getSpecificData(slug, Cname).then(data => {
            setDetailsData(data[0])
        })
        DisableFields(false)
    }, [])

    function DisableFields(checked) {
        console.log(`switch to ${checked}`);
        setisDisable(checked)
    }
    const changeHandler = (key, value) => {
        setDetailsData({ ...detailsdData, [value]: key.target.value })
    }
    const updateVendor = () => {
        UpdateVendor(detailsdData, detailsdData.compId)
    }
    return (
        <DetailsDiv>
            <Goback onClick={e => history.goBack()}>
                <CaretLeftOutlined /> GoBack
            </Goback>
            <h2>Vendor Details page</h2>
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
                    <Col xs={24} sm={8}>
                        <h2>FirstName:</h2>
                        {
                            <Input type='text' value={detailsdData.ownerFirstName}
                                onChange={(e) => changeHandler(e, 'ownerFirstName')}
                                disabled={!isDisable}
                            />
                        }
                    </Col>
                    <Col xs={24} sm={8}>
                        <h2>LastName:</h2>
                        {
                            <Input type='text' value={detailsdData.ownerLastName}
                                onChange={(e) => changeHandler(e, 'ownerLastName')}
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
                        <Input type='text' value={detailsdData.State}
                            onChange={(e) => changeHandler(e, 'state')}
                            disabled={!isDisable}
                        />
                    </Col>
                    <Col xs={24} sm={8}>
                        <h2>City:</h2>
                        <Input type='text' value={detailsdData.City}
                            onChange={(e) => changeHandler(e, 'city')}
                            disabled={!isDisable}
                        />
                    </Col>
                </Row>
                <Row gutter={[10, 10]}>
                    <Col xs={24} sm={16}>
                        <h2>Address:</h2>
                        <Input type='text' value={detailsdData.Address}
                            onChange={(e) => changeHandler(e, 'address')}
                            disabled={!isDisable}
                        />
                    </Col>
                    <Col xs={24} sm={8}>
                        <h2>PostalCode:</h2>
                        <Input type='text' value={detailsdData.PostalCode}
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
                        <Input type='text' value={detailsdData.Email}
                            onChange={(e) => changeHandler(e, 'email')}
                            disabled={!isDisable}
                        />
                    </Col>
                    <Col xs={24} sm={8}>
                        <h2>Phone Number:</h2>
                        <Input type='text' value={detailsdData.Phone}
                            onChange={(e) => changeHandler(e, 'phone')}
                            disabled={!isDisable}
                        />
                    </Col>
                </Row>
                <Row gutter={10, 10}>
                    <Col xs={24} sm={16}>
                        <Button 
                        onClick={updateVendor}
                        disabled={!isDisable}
                        >Update</Button>
                    </Col>
                </Row>
            </div>
            {/* )
            })} */}
        </DetailsDiv>
    )
}
export default VendorDetails