import * as Yup from 'yup'

export const validationSchema = Yup.object({
    companyName: Yup.string().required('Required'),
    ownerFirstName: Yup.string().required('Required').min(4,'Minimum 4 characters').max(10, 'Maximum 10 characters'),
    ownerLastName: Yup.string().required('Required').min(4,'Minimum 4 characters').max(10, 'Maximum 10 characters'),
    cnicNumber: Yup.number().required('Required').positive('Invalid cnic number').min(13, 'Required 13 digits'),
    address: Yup.string().required('Required').min(10, 'Minimum 10 characters').max(30, 'Maximum 30 characters'),
    phone: Yup.number().required('Required').positive('Invalid phone number').min(11, 'Required 11 digits'),
    email: Yup.string().email('Enter valid email').required('Required'),
    city: Yup.string().required('Required').min(4,'Minimum 4 characters').max(12, 'Maximum 12 characters'),
    postalCode: Yup.number().required('Required'),
    state: Yup.string().required('Required').min(4,'Minimum 4 characters').max(12, 'Maximum 12 characters'),
})
