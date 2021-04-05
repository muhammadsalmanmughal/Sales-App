import Dashboard from '../../components/Dashboard/dashboard'
import Vendor from '../../components/Vendor/index'
import Customer from '../../components/Cutomer/cutomer'
import RequestForQuotation from '../../components/RequestForQuotation/requestForQuotation'
import PurchaseOrder from '../../components/PurchaseOrder/purchaseOrder'
import Inventory from '../../components/Inventory/inventory'
import {FaChartPie,FaUsers,FaUsersCog, FaWarehouse, FaFileMedical, FaFileAlt } from "react-icons/fa"
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
    }


]
export default routes
