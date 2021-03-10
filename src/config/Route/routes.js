import Dashboard from '../../components/Dashboard/dashboard'
import Vendor from '../../components/Vendor/index'
import Customer from '../../components/Cutomer/cutomer';
import RequestForQuotation from '../../components/RequestForQuotation/requestForQuotation'
import PurchaseOrder from '../../components/PurchaseOrder/purchaseOrder'
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
    },
    {
        path: '/request-for-quotation',
        // sidebar: true,
        name: 'Request For Quotation',
        component: RequestForQuotation
    },
    // {
    //     path: '/request-for-quatation',
    //     // sidebar: true,
    //     name: 'Request For Quataion',
    //     component: RequestForQuatation
    // },
    {
        path: '/purchase-order',
        // sidebar: true,
        name: 'Purchase Order',
        component: PurchaseOrder
    }


]
export default routes
