import React from 'react'
import { useFormik } from 'formik'
import { validationSchema } from './schema'
import { createVendor } from '../../Utils/utils'
import { Label } from '../Textbox/style/index'
import { VendorMainDiv, FormDiv } from './style/index'
import ErrorText from '../FormError/formError'
import AllVendors from '../AllVendors/allVendors';
import {
    Tabs,
    Row,
    Col,
    Input
} from 'antd';
import {
    Title, SubmitButton
} from '../../Utils/styles'
const initialValues = {
    companyName: '',
    ownerFirstName: '',
    ownerLastName: '',
    state: '',
    cnicNumber: '',
    address: '',
    phone: '',
    email: '',
    city: '',
    postalCode: ''
}

const Vendor = () => {
    const onSubmit = (values, onSubmitProps) => {
        createVendor(values)
        onSubmitProps.resetForm()
    }

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    })

    const { TabPane } = Tabs;

    return (
        <div>
            <Title>Vendor</Title>
            <Tabs defaultActiveKey="1">
                <TabPane tab="Create Vendor" key="1">
                    <VendorMainDiv>
                        <form
                            onSubmit={formik.handleSubmit}
                        >
                            <FormDiv>

                                <Row gutter={[10, 10]}>
                                    <Col xs={24} sm={8}>
                                        <Label>
                                            Company Name:
                                <Input
                                                type='text'
                                                name='companyName'
                                                {...formik.getFieldProps('companyName')}
                                            />
                                        </Label>
                                        {formik.touched.companyName && formik.errors.companyName
                                            ? <ErrorText text={formik.errors.companyName} />
                                            : null}
                                    </Col>
                                    <Col xs={24} sm={8}>
                                        <Label>
                                            Owner First Name:
                                <Input
                                                type='text'
                                                name='ownerFirstName'
                                                {...formik.getFieldProps('ownerFirstName')}
                                            />
                                        </Label>
                                        {formik.touched.ownerFirstName && formik.errors.ownerFirstName
                                            ? <ErrorText text={formik.errors.ownerFirstName} />
                                            : null}
                                    </Col>
                                    <Col xs={24} sm={8}>
                                        <Label>Owner Last Name:
                                    <Input
                                                type='text'
                                                name='ownerLastName'
                                                {...formik.getFieldProps('ownerLastName')}

                                            />
                                        </Label>
                                        {formik.touched.ownerLastName && formik.errors.ownerLastName
                                            ? <ErrorText text={formik.errors.ownerLastName} />
                                            : null}
                                    </Col>
                                    <Col xs={24} sm={10}>
                                        <Label>
                                            CNIC-Number:
                                           <Input
                                                type='text'
                                                name='cnicNumber'
                                                maxLength='13'
                                                {...formik.getFieldProps('cnicNumber')}
                                            />
                                        </Label>
                                        {formik.touched.cnicNumber && formik.errors.cnicNumber
                                            ? <ErrorText text={formik.errors.cnicNumber} />
                                            : null}
                                    </Col>
                                    <Col xs={24} sm={14}>
                                        <Label>Address:
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
                                    <Col xs={24} sm={6}>
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
                                    <Col xs={24} sm={8}>
                                        <Label>State:
                                    <Input
                                                type='text'
                                                name='state'
                                                maxLength='15'
                                                {...formik.getFieldProps('state')}
                                            />
                                        </Label>
                                        {formik.touched.state && formik.errors.state
                                            ? <ErrorText text={formik.errors.state} />
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
                                    <Col xs={24} sm={6}>
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

                                </Row>
                                <Col xs={24} sm={16}>
                                    <SubmitButton type='submit' disabled={!formik.isValid}>Create Vendor</SubmitButton>
                                </Col>
                            </FormDiv>
                        </form>
                    </VendorMainDiv>
                </TabPane>
                <TabPane tab="All Vendors" key="2">
                    <AllVendors />
                </TabPane>

            </Tabs>
        </div >
    )
}
export default Vendor