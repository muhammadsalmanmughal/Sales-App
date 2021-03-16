import Dashboard from '../../components/Dashboard/dashboard'
import Vendor from '../../components/Vendor/index'
import Customer from '../../components/Cutomer/cutomer';
import RequestForQuotation from '../../components/RequestForQuotation/requestForQuotation'
import PurchaseOrder from '../../components/PurchaseOrder/purchaseOrder'
import Inventory from '../../components/Inventory/inventory'
const routes = [
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard
    },
    {
        path: '/vendor',
        name: 'Vendor',
        component: Vendor
    },
    {
        path: '/customer',
        name: 'Customer',
        component: Customer
    },
    {
        path: '/request-for-quotation',
        name: 'Request For Quotation',
        component: RequestForQuotation
    },
    {
        path: '/purchase-order',
        name: 'Purchase Order',
        component: PurchaseOrder
    },
    {
        path: '/inventory',
        name: 'Inventory',
        component: Inventory
    }


]
export default routes
