import * as Yup from 'yup'

export const validationSchema = Yup.object({
    customerName: Yup.string().required('Required').matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
    responsibleName: Yup.string().required('Required').matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
    companyName: Yup.string().required('Required').min(4,'Minimum 4 characters').matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
    cnicNumber: Yup.number().required('Required').positive('Invalid cnic number').integer().min(13, 'Required 13 digits'),
    billToAddress: Yup.string().required('Required').min(10, 'Minimum 10 characters'),
    phone: Yup.number().min(11, 'Required 11 digits').required('Required').positive('Invalid phone number').integer(),
    responsiblePhone: Yup.number().required('Required').positive('Invalid phone number').integer().min(11, 'Required 11 digits'),
    secondaryPhone: Yup.number().required('Required').positive('Invalid phone number').integer().min(11, 'Required 11 digits'),
    email: Yup.string().email('Enter valid email').required('Required'),
    city: Yup.string().required('Required').min(4,'Minimum 4 characters').matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
    state: Yup.string().required('Required').min(4,'Minimum 4 characters').matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
    postalCode: Yup.number().required('Required').positive('Invalid Postal code').integer(),
    reponsiblecity: Yup.string().min(4,'Minimum 4 characters').required('Required').matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),

})