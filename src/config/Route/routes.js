import Dashboard from '../../components/Dashboard/dashboard'
import Vendor from '../../components/Vendor/index'
import Customer from '../../components/Cutomer/cutomer';
import PurchaseRequisition from '../../components/PurchaseRequisition/purchaseRequisition'
import RFQ from '../../components/RFQ/rfq'
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
        path: '/purchase-requisition',
        // sidebar: true,
        name: 'Purchase Requisition',
        component: PurchaseRequisition
    },
    {
        path: '/request-for-quatation',
        // sidebar: true,
        name: 'Request For Quataion',
        component: RFQ
    }
    ,
    {
        path: '/purchase-order',
        // sidebar: true,
        name: 'Purchase Order',
        component: PurchaseOrder
    }


]
export default routes
