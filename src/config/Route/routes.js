import Dashboard from '../../components/Dashboard/dashboard'
import Vendor from '../../components/Vendor/index'
import Customer from '../../components/Cutomer/cutomer'
import RequestForQuotation from '../../components/RequestForQuotation/requestForQuotation'
import PurchaseOrder from '../../components/PurchaseOrder/purchaseOrder'
import Inventory from '../../components/Inventory/inventory'
import Invoices from '../../components/Invoice/allInvoices'
import PurchaseRequisition from '../../components/PurchaseRequisition/purchaseRequisition'
import Delivery from '../../components/Delivery/delivery'

import { 
    FaChartPie,FaUsers,FaUsersCog, FaWarehouse, FaFileMedical,
    FaFileAlt,FaFileInvoiceDollar, FaFileInvoice,FaTruckMoving
 } from "react-icons/fa"
const routes = [
    {
        path: '/dashboard',
        name: 'Dashboard',
        icon: <FaChartPie />,
        component: Dashboard
    },
    {
        path: '/vendor',
        name: 'Vendor',
        icon: <FaUsersCog />,
        component: Vendor
    },
    {
        path: '/customer',
        name: 'Customer',
        icon: <FaUsers />,
        component: Customer
    },
    {
        path: '/purchase-requisition',
        name: 'Purchase Requisition',
        icon: <FaFileInvoice />,
        component: PurchaseRequisition
    },
    {
        path: '/request-for-quotation',
        name: 'Request For Quotation',
        icon: <FaFileAlt />,
        component: RequestForQuotation
    },
    
    {
        path: '/purchase-order',
        name: 'Purchase Order',
        icon: <FaFileMedical />,
        component: PurchaseOrder
    },
    {
        path: '/inventory',
        name: 'Inventory',
        icon: <FaWarehouse/>,
        component: Inventory
    },
    {
        path: '/invoices',
        name: 'Invoices',
        icon: <FaFileInvoiceDollar/>,
        component: Invoices
    },
    {
        path: '/delivery',
        name: 'Delivery',
        icon: <FaTruckMoving/>,
        component: Delivery
    }


]
export default routes
