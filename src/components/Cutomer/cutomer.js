import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import { Button } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { Label } from '../Textbox/style/index'
import { SubmitButton } from './style/index'
import { validationSchema } from './validationSchema'
import { createNewCustomer } from '../../Utils/utils'
import ErrorText from '../FormError/formError'
import AllCustomers from '../AllCustomers/allCustomers';
import { VendorMainDiv, FormDiv } from '../Vendor/style/index'
import {
    Divider,
    Tabs,
    Row,
    Col,
    Input
} from 'antd';

const { TabPane } = Tabs;


const CreateCustomer = () => {

    const [customerId, setCustomerId] = useState('')

    const cusId = () => {
        setCustomerId(uuidv4())
    }
    useEffect(() => {
        cusId()
    }, [])
    const onSubmit = (values, onSubmitProps) => {
        createNewCustomer(values, customerId)
        onSubmitProps.resetForm()
    }
    const initialValues = {
        businessName: '',
        billToAddress: '',
        city: '',
        state: '',
        postalCode: '',
        phone: '',
        email: '',
        responsibleName: '',
        responsiblePhone: '',
        secondaryPhone: ''
    }
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema,
        cusId
    })
    
    function callback(key) {
        console.log(key);
    }

    return (
        <div>
            <h1>Customer</h1>
            <Divider />
            <Tabs defaultActiveKey="1" onChange={callback}>

                <TabPane tab="Create Customer" key="1">
                    <VendorMainDiv>
                        <form
                            onSubmit={formik.handleSubmit}
                        >
                            <FormDiv>

                                <Row gutter={[10, 10]}>
                                    <Col xs={24} sm={24}>
                                        <Label>
                                            Business Name:
                                         <Input
                                                type='text'
                                                name='businessName'
                                                // value={formik.values.companyName}
                                                // onBlur={formik.handleBlur}
                                                // onChange={formik.handleChange}
                                                {...formik.getFieldProps('businessName')}
                                            />
                                        </Label>
                                        {formik.touched.businessName && formik.errors.businessName
                                            ? <ErrorText text={formik.errors.businessName} />
                                            : null}
                                    </Col>
                                    <Col xs={24} sm={24}>
                                        <Label>
                                            Bill To Address:
                                 <Input
                                                type='text'
                                                name='billToAddress'
                                                {...formik.getFieldProps('billToAddress')}
                                            />
                                        </Label>
                                        {formik.touched.billToAddress && formik.errors.billToAddress
                                            ? <ErrorText text={formik.errors.billToAddress} />
                                            : null}
                                    </Col>
                                    <Col xs={24} sm={8}>
                                        <Label>City:
                                    <Input
                                                type='text'
                                                name='city'
                                                {...formik.getFieldProps('city')}

                                            />
                                        </Label>
                                        {formik.touched.city && formik.errors.city
                                            ? <ErrorText text={formik.errors.city} />
                                            : null}
                                    </Col>
                                    <Col xs={24} sm={8}>
                                        <Label>State:
                                    <Input
                                                type='text'
                                                name='state'
                                                {...formik.getFieldProps('state')}
                                            />
                                        </Label>
                                        {formik.touched.state && formik.errors.state
                                            ? <ErrorText text={formik.errors.state} />
                                            : null}
                                    </Col>
                                    <Col xs={24} sm={8}>
                                        <Label>Postl Code:
                                    <Input
                                                type='number'
                                                name='postalCode'
                                                {...formik.getFieldProps('postalCode')}
                                            />
                                        </Label>
                                        {formik.touched.postalCode && formik.errors.postalCode
                                            ? <ErrorText text={formik.errors.postalCode} />
                                            : null}
                                    </Col>
                                    <Col xs={24} sm={8}>
                                        <Label>Phone#:
                                    <Input
                                                type='number'
                                                name='phone'
                                                {...formik.getFieldProps('phone')}
                                            />
                                        </Label>
                                        {formik.touched.phone && formik.errors.phone
                                            ? <ErrorText text={formik.errors.phone} />
                                            : null}
                                    </Col>
                                    <Col xs={24} sm={16}>
                                        <Label>Email:
                                    <Input
                                                type='email'
                                                name='email'
                                                {...formik.getFieldProps('email')}
                                            />
                                        </Label>
                                        {formik.touched.email && formik.errors.email
                                            ? <ErrorText text={formik.errors.email} />
                                            : null}
                                    </Col>
                                    <Col xs={24} sm={6}>
                                        <Label>Responsible Name:
                                    <Input
                                                type='text'
                                                name='responsibleName'
                                                value={formik.values.responsibleName}
                                                onChange={formik.handleChange}
                                            />
                                        </Label>
                                        {formik.touched.responsibleName && formik.errors.responsibleName
                                            ? <ErrorText text={formik.errors.responsibleName} />
                                            : null}
                                    </Col>
                                    <Col xs={24} sm={6}>
                                        <Label>Responsible Phone:
                                    <Input
                                                type='text'
                                                name='responsiblePhone'
                                                value={formik.values.responsiblePhone}
                                                onChange={formik.handleChange}
                                            />
                                        </Label>
                                        {formik.touched.responsiblePhone && formik.errors.responsiblePhone
                                            ? <ErrorText text={formik.errors.responsiblePhone} />
                                            : null}
                                    </Col>
                                    <Col xs={24} sm={6}>
                                        <Label>Secondary Phone:
                                    <Input
                                                type='text'
                                                name='secondaryPhone'
                                                value={formik.values.secondaryPhone}
                                                onChange={formik.handleChange}
                                            />
                                        </Label>
                                        {formik.touched.secondaryPhone && formik.errors.secondaryPhone
                                            ? <ErrorText text={formik.errors.secondaryPhone} />
                                            : null}
                                    </Col>

                                    <Col xs={24} sm={6}>
                                        <Label>City:
                                    <Input
                                                type='text'
                                                name='city'
                                                {...formik.getFieldProps('city')}
                                            />
                                        </Label>
                                        {formik.touched.city && formik.errors.city
                                            ? <ErrorText text={formik.errors.city} />
                                            : null}
                                    </Col>


                                </Row>
                                <Col xs={24} sm={16}>
                                    <SubmitButton type='submit' disabled={!formik.isValid}>Create Customer</SubmitButton>
                                </Col>
                            </FormDiv>
                        </form>
                    </VendorMainDiv>

                </TabPane>

                <TabPane tab="All Customer" key="2">
                    <AllCustomers />
                </TabPane>

            </Tabs>
        </div>
    )
}
export default CreateCustomer