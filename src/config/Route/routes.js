import Dashboard from '../../components/Dashboard/dashboard'
import Vendor from '../../components/Vendor/index'
import Customer from '../../components/Cutomer/cutomer';
const routes = [
    {
        path: '/dashboard',
        // sidebar: true,
        name: 'Dashboard',
        component: Dashboard
    },
    {
        path: '/vendor',
        // sidebar: true,
        name: 'Vendor',
        component: Vendor
    },
    {
        path: '/customer',
        // sidebar: true,
        name: 'Customer',
        component: Customer
    }
]
export default routes
