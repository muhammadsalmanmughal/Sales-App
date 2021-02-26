import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import { v4 as uuidv4 } from 'uuid';
import { validationSchema } from './schema'
import { createVendor, updateVendor } from '../../Utils/utils'
import { Label } from '../Textbox/style/index'
import { VendorMainDiv, FormDiv} from './style/index'
import ErrorText from '../FormError/formError'
import AllVendors from '../AllVendors/allVendors';
import {
    Divider,
    Tabs,
    Row,
    Col,
    // Form,
    Input
} from 'antd';
const initialValues = {
    companyName: '',
    ownerFirstName: '',
    ownerLastName: '',
    address: '',
    phone: '',
    email: '',
    // country: '',
    city: '',
    postalCode: ''
}
// const validate = values => {
//     const errors = {}
//     if (!values.companyName) {
//         errors.companyName = 'Field Required'
//     }
//     else if (values.companyName.length < 4) {
//         errors.companyName = 'Company name is too short'
//     }
//     if (!values.ownerFirstName || values.ownerFirstName < 5) {
//         errors.ownerFirstName = 'Invalid Name'
//     }
//     if (!values.ownerLastName || values.ownerLastName < 5) {
//         errors.ownerLastName = 'Invalid Name'
//     }
//     if (!values.address) {
//         errors.address = 'Field Required'
//     }
//     else if(values.address. length < 15){
//         errors.address = 'Enter valid address'
//     }
//     if (!values.phone) {
//         errors.phone = 'Field Required'
//     }
//     else if(values.phone.length < 11){
//         errors.phone = 'Invalid phone number'
//     }
//     if (!values.email) {
//         errors.email = 'Field Required'
//     }
//     else if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(values.email)) {
//         errors.email = 'Invalid email format'
//     }
//     // if(!values.country){
//     //     errors.country = 'Required'
//     // }else if(values.country  )
//     if (!values.city) {
//         errors.city = 'Field Required'
//     }
//     else if (values.city.length < 7 || values.city.length > 15) {
//         errors.city = 'Invalid city name'
//     }
//     if (!values.postalCode || values.postalCode.length < 5) {
//         errors.postalCode = 'Enter valid postal code'
//     }
//     return errors
// }
const Vendor = () => {

    const [vendorId, setVendorId] = useState('')

    const venId = () => {
        setVendorId(uuidv4())
    }
    const onSubmit = (values,onSubmitProps) => {
        createVendor(values, vendorId)
        onSubmitProps.resetForm()
    }
    useEffect(() => {
        venId()
        updateVendor()
    }, [])

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    })


    const { TabPane } = Tabs;
    function callback(key) {
        console.log(key);
    }
    // console.log('Formik visited fiedls', formik.touched);
    return (
        <div>
            <h1>Vendor</h1>
            <Divider />
            <Tabs defaultActiveKey="1" onChange={callback}>
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
                                                // value={formik.values.companyName}
                                                // onBlur={formik.handleBlur}
                                                // onChange={formik.handleChange}
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
                                                // value={formik.values.ownerFirstName}
                                                // onBlur={formik.handleBlur}
                                                // onChange={formik.handleChange}
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
                                                // value={formik.values.ownerLastName}
                                                // onBlur={formik.handleBlur}
                                                // onChange={formik.handleChange}
                                                {...formik.getFieldProps('ownerLastName')}

                                            />
                                        </Label>
                                        {formik.touched.ownerLastName && formik.errors.ownerLastName
                                            ? <ErrorText text={formik.errors.ownerLastName} />
                                            : null}
                                    </Col>
                                    <Col xs={24} sm={24}>
                                        <Label>Address:
                                    <Input
                                                type='text'
                                                name='address'
                                                // value={formik.values.address}
                                                // onBlur={formik.handleBlur}
                                                // onChange={formik.handleChange}
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
                                                // value={formik.values.phone}
                                                // onBlur={formik.handleBlur}
                                                // onChange={formik.handleChange}
                                                {...formik.getFieldProps('phone')}
                                            // max={11}
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
                                                // value={formik.values.email}
                                                // onBlur={formik.handleBlur}
                                                // onChange={formik.handleChange}
                                                {...formik.getFieldProps('email')}
                                            />
                                        </Label>
                                        {formik.touched.email && formik.errors.email
                                            ? <ErrorText text={formik.errors.email} />
                                            : null}
                                    </Col>
                                    {/* <Col xs={24} sm={6}>
                                        <Label>Coutnry:
                                    <Input
                                                type='text'
                                                name='country'
                                                value={formik.values.country}
                                                onChange={formik.handleChange}
                                            />
                                        </Label>
                                    </Col> */}
                                    <Col xs={24} sm={6}>
                                        <Label>City:
                                    <Input
                                                type='text'
                                                name='city'
                                                // value={formik.values.city}
                                                // onBlur={formik.handleBlur}
                                                // onChange={formik.handleChange}
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
                                                // value={formik.values.postalCode}
                                                // onBlur={formik.handleBlur}
                                                // onChange={formik.handleChange}
                                                {...formik.getFieldProps('postalCode')}
                                            />
                                        </Label>
                                        {formik.touched.postalCode && formik.errors.postalCode
                                            ? <ErrorText text={formik.errors.postalCode} />
                                            : null}
                                    </Col>

                                    {/* <Col style={style} span={8}>col-10</Col> */}
                                </Row>
                                <Col xs={24} sm={16}>
                                    <button type='submit' disabled={!formik.isValid}>Submit</button>
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