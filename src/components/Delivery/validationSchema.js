import * as Yup from 'yup'

export const validationSchema = Yup.object({
    name: Yup.string().required('Required').matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
    organization: Yup.string().required('Required').matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
    address: Yup.string().required('Required').min(10, 'Minimum 10 characters'),
    phone: Yup.number().required('Required').positive('Invalid phone number').integer(),
    alternatePhone: Yup.number().required('Required').positive('Invalid phone number').integer(),
    email: Yup.string().email('Enter valid email').required('Required'),
    city: Yup.string().required('Required').min(4,'Minimum 4 characters').matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
    state: Yup.string().required('Required').min(4,'Minimum 4 characters').matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
    postalCode: Yup.number().required('Required')
})