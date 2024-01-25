import AddCategory from "../containers/categories/addCategory";
import Dashboard from "../containers/dashboard";
import AddProduct from "../containers/products/addProduct";
import AddProductNew from "../containers/products/addProductNew";
import ProductData from "../containers/products/productList";
import PosTables from "../containers/pos/views/posTables";
import Pos from "../containers/pos/views/pos";
import AddVariant from "../containers/variants/addVariants";
import PrintDesign from "../containers/print/printDesign";
import KotPrintDesign from "../containers/print/kotPrint";
import AddCustomer from "../containers/customer/addCustomer";
import CustomerList from "../containers/customer/customerList";
import EditCustomer from "../containers/customer/editCustomer";
import KotView from "../containers/kotView";
import KotData from "../containers/kot/kotList";
import OrderList from "../containers/order/orderList";
let menuData = [
    {
        name: "Dashboard",
        path: "/dashboard",
        key: "dashboard",
        icon: "monitor",
        component: Dashboard,
        authority: ["admin"],
    },
    {
        name: "Kot Print",
        path: "/kot-print",
        key: "kotPrint",
        icon: "monitor",
        component: KotPrintDesign,
        dontShowOnMenu: true,
    },
    {
        name: "KotView",
        path: "/KotView",
        key: "KotView",
        icon: "monitor",
        component: KotView,
    },
    {
        name: "Product",
        icon: "book",
        key: "product",
        authority: ["admin"],
        subMenu: [
            {
                name: "Add Product",
                path: "/addProduct",
                key: "addProduct",
                component: AddProduct,
            },
            {
                name: "Product List",
                path: "/productList",
                key: "productList",
                component: ProductData,
            }
        ],
    },
    {
        name: "Customer",
        icon: "book",
        key: "customer",
        authority: ["admin"],
        subMenu: [
            {
                name: "Add Customer",
                path: "/add-customer",
                key: "addCustomer",
                component: AddCustomer,
            },
            {
                name: "Customer List",
                path: "/customerList",
                key: "customerList",
                icon: "monitor",
                component: CustomerList,
            },
            {
                name: "editCustomer",
                path: "/editCustomer",
                key: "editCustomer",
                icon: "monitor",
                component: EditCustomer,
                dontShowOnMenu: true,
            },
        ],
    },
    {
        name: "Tables",
        path: "/tables",
        key: "tables",
        icon: "monitor",
        component: PosTables,
    },
    {
        name: "POS",
        path: "/pos/:table",
        key: "post",
        icon: "monitor",
        component: Pos,
        dontShowOnMenu: true,
    },
    {
        name: "Print",
        path: "/print",
        key: "post",
        icon: "monitor",
        component: PrintDesign,
        dontShowOnMenu: true,

    },
    {
        name: "Kot Print",
        path: "/kot-print",
        key: "kotPrint",
        icon: "monitor",
        component: KotPrintDesign,
        dontShowOnMenu: true,

    },
    {
        name: "Kot List",
        path: "/kotList",
        key: "kotList",
        icon: "monitor",
        component: KotData,
        // dontShowOnMenu: true,

    },
    {
        name: "Order List",
        path: "/orderList",
        key: "orderList",
        icon: "monitor",
        component: OrderList,
        // dontShowOnMenu: true,

    },
];
let settingData = [
    {
        name: "Category",
        path: "/addCategory",
        key: "addCategory",
        icon: "monitor",
        component: AddCategory,
    },
    {
        name: "Variant",
        path: "/addVariant",
        key: "addVariant",
        icon: "monitor",
        component: AddVariant,
    }
];
export {menuData, settingData}
