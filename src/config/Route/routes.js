import Dashboard from '../../components/Dashboard/dashboard'
import Vendor from '../../components/Vendor/index'

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
    }
]
export default routes
