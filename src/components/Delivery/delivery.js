import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import { Label } from '../Textbox/style/index'
import { validationSchema } from './validationSchema'
import { SubmitButton } from '../../Utils/styles'
import { FormDiv } from '../Vendor/style/index'

import ErrorText from '../FormError/formError'
import { v4 as uuidv4 } from 'uuid';
import {
    Divider, Input, Button, Skeleton, Table, Space, message, Drawer, Tabs, Modal, Tag, Empty, Row, Col
} from 'antd'
import { Title } from '../../Utils/styles'




const Delivery = () => {
    const { TabPane } = Tabs

    const [deliveryId, setDeliveryId] = useState('')

    const devId = () => {
        setDeliveryId(uuidv4())
    }
    useEffect(() => {
        devId()
    }, [])
    const onSubmit = (values, onSubmitProps) => {
        // createDelivery(values, deliveryId)
        console.log('values', values)
        onSubmitProps.resetForm()
    }
    const initialValues = {
        name: '',
        organization: '',
        address:'',
        city: '',
        state: '',
        postalCode: '',
        phone: '',
        alternatePhone: '',
        email: ''
    }
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema,
        devId
    })

    return (
        <div>
            <Title>DELIVERY DOCUMENT:</Title>
            <Divider />
            <Tabs defaultActiveKey="1">
                <TabPane tab="Delivey Document" key="1">
                <form
                    onSubmit={formik.handleSubmit}
                >
                    <FormDiv>

                    <Row gutter={[10, 10]}>
                        <Col xs={24} sm={12}>
                            <Label>
                                Name:
                                         <Input
                                    type='text'
                                    name='name'
                                    {...formik.getFieldProps('name')}
                                />
                            </Label>
                            {formik.touched.name && formik.errors.name
                                ? <ErrorText text={formik.errors.name} />
                                : null}
                        </Col>
                        <Col xs={24} sm={12}>
                            <Label>
                                Organization:
                                 <Input
                                    type='text'
                                    name='organization'
                                    {...formik.getFieldProps('organization')}
                                />
                            </Label>
                            {formik.touched.organization && formik.errors.organization
                                ? <ErrorText text={formik.errors.organization} />
                                : null}
                        </Col>
                        <Col xs={24} sm={24}>
                            <Label>
                                Address:
                                 <Input
                                    type='text'
                                    name='address'
                                    {...formik.getFieldProps('address')}
                                />
                            </Label>
                            {formik.touched.address && formik.errors.address
                                ? <ErrorText text={formik.errors.address} />
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
                        <Col xs={24} sm={6}>
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
                        <Col xs={24} sm={12}>
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
                            <Label>Alternate Phone:
                                    <Input
                                    type='number'
                                    name='alternatePhone'
                                    value={formik.values.alternatePhone}
                                    onChange={formik.handleChange}
                                />
                            </Label>
                            {formik.touched.alternatePhone && formik.errors.alternatePhone
                                ? <ErrorText text={formik.errors.alternatePhone} />
                                : null}
                        </Col>
                        {/* <Col xs={24} sm={6}>
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
                                    </Col> */}
                        {/* <Col xs={24} sm={6}>
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
                                    </Col> */}
                        
                    </Row>
                    <Col xs={24} sm={16}>
                        <SubmitButton type='submit' disabled={!formik.isValid}>Create Document</SubmitButton>
                    </Col>
                    </FormDiv>
                </form>
                </TabPane>
                <TabPane tab=" Goods Issue" key="2">
                </TabPane>
            </Tabs>
        </div>
    )
}
export default Delivery