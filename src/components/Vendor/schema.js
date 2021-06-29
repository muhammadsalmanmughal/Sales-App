import * as Yup from 'yup'

export const validationSchema = Yup.object({
    companyName: Yup.string().required('Required').matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
    ownerFirstName: Yup.string().required('Required').min(4,'Minimum 4 characters').matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
    ownerLastName: Yup.string().required('Required').min(4,'Minimum 4 characters').matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
    cnicNumber: Yup.number().required('Required').positive('Invalid cnic number').integer().min(13, 'Required 13 digits'),
    address: Yup.string().required('Required').min(10, 'Minimum 10 characters').max(30, 'Maximum 30 characters'),
    phone: Yup.number().required('Required').positive('Invalid phone number').integer().min(11, 'Required 11 digits'),
    email: Yup.string().email('Enter valid email').required('Required'),
    city: Yup.string().required('Required').min(4,'Minimum 4 characters').matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
    postalCode: Yup.number().required('Required').integer(),
    state: Yup.string().required('Required').min(4,'Minimum 4 characters').matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
})
