import React, {useEffect, useState} from "react";
import {dashboardCountFxn, fetchOrderListFxn, paymentGroupByPaymentMethodFxn} from "./action";
import {fetchCustomer} from "../customer/action";
import {fetchProduct} from "../products/actions";
import OrderList from "../order/orderList";
import ProductList from "../products/productList";
import _ from "lodash"

let initPaymentMode = [
    {name: "Card", value: 0},
    {name: "Cash", value: 0},
    {name: "UPI", value: 0}
]
let initState = {
    totalOrder: 0,
    totalCustomer: 0,
    totalKot: 0,
    totalProduct: 0,
}
const Dashboard = () => {
    const [totalCustomer, setTotalCustomer] = useState('')
    const [totalProduct, setTotalProduct] = useState('')
    const [orderList, setOrderList] = useState([])
    const [paymentData, setPaymentData] = useState(initPaymentMode)
    const [state, setState] = useState(initState)
    const apiRequest = async (params) => {
        const {data} = await dashboardCountFxn({...params});
        setState(data);
    };


    const loadPaymentData = async () => {
        const {data} = await paymentGroupByPaymentMethodFxn({});
        let cloneDoc = _.clone(initPaymentMode);
        _.each(cloneDoc, (item) => {
            let findVal = _.find(data, (doc) => {
                return doc._id == item.name.toLowerCase()
            })
            if (findVal) {
                item.value = findVal.totalAmount
            }
        })
        setPaymentData(cloneDoc)
    };

    useEffect(() => {
        apiRequest()
        loadPaymentData()
    }, [])


    return (
        <>
            <div class="main-wrapper">
                <div class="page-wrapper-2">
                    <div class="content">
                        <div class="row">
                            {paymentData && paymentData.length ? paymentData.map((item) => {
                                return (
                                    <div className="col-lg-3 col-sm-6 col-12" key={item.name}>
                                        <div className="dash-widget">
                                            <div className="dash-widgetimg">
                                        <span>
                                          <img src="assets/img/icons/dash1.svg" alt="img"/>
                                        </span>
                                            </div>
                                            <div className="dash-widgetcontent">
                                                <h5>
                                          <span className="counters" data-count={item.value}>
                                            Rs. {item.value}
                                          </span>
                                                </h5>
                                                <h6>{item.name}</h6>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }) : null}


                        </div>
                        <div className={'row'}>
                            <div className="col-lg-3 col-sm-6 col-12 d-flex">
                                <div className="dash-count">
                                    <div className="dash-counts">
                                        <h4>{state.totalCustomer}</h4>
                                        <h5>Total Customer</h5>
                                    </div>
                                    <div className="dash-imgs">
                                        <i className={'fa fa-user'}></i>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-sm-6 col-12 d-flex">
                                <div className="dash-count">
                                    <div className="dash-counts">
                                        <h4>{state.totalProduct}</h4>
                                        <h5>Total Product</h5>
                                    </div>
                                    <div className="dash-imgs">
                                        <i className={'fa fa-user'}></i>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-sm-6 col-12 d-flex">
                                <div className="dash-count">
                                    <div className="dash-counts">
                                        <h4>{state.totalOrder}</h4>
                                        <h5>Total Order</h5>
                                    </div>
                                    <div className="dash-imgs">
                                        <i className={'fa fa-user'}></i>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-sm-6 col-12 d-flex">
                                <div className="dash-count">
                                    <div className="dash-counts">
                                        <h4>{state.totalProduct}</h4>
                                        <h5>Total KOT</h5>
                                    </div>
                                    <div className="dash-imgs">
                                        <i className={'fa fa-user'}></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-12 col-sm-12 col-12 d-flex">
                                <div class="card flex-fill">
                                    <div className="card-body">
                                        <OrderList/>
                                    </div>

                                </div>
                            </div>

                        </div>
                        <div class="card mb-0">
                            <div class="card-body">
                                <div class="table-responsive dataview">
                                    <ProductList/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Dashboard;
