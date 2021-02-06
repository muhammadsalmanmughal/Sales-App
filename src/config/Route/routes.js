import Dashboard from '../../components/Dashboard/dashboard'
import RequestForQuatation from '../../components/RequestForQuatation/requestForQuatation'

const routes = [
    {
        path: '/dashboard',
        // sidebar: true,
        name: 'Dashboard',
        component: Dashboard
    },
    {
        path: '/requestforquataion',
        // sidebar: true,
        name: 'RequestForQuatation',
        component: RequestForQuatation
    }
]
export default routes
