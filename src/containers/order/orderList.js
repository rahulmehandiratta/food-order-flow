import React, {useEffect, useRef, useState} from "react";
import {Card, Modal, Table} from "../../components/Elements/appUtils";
import PageHeader from "../../components/Elements/pageHeader";
import _ from "lodash";
import moment from "moment";
import {fetchAllOrder} from "./actions";
import {getVegStatus} from "../../components/_utils/_utils";
import {getOldKotByOrderIdFxn, getPrintProductsFxn} from "../pos/actions";
import PrintDesign from "../print/printDesign";
import {useReactToPrint} from "react-to-print";
import {useDispatch} from "react-redux";

function OrderList() {
    let dispatch = useDispatch()
    const componentRef = useRef();
    let tableRef = useRef();
    let [OldKots, setOldKots] = useState([]);
    let [isModalOpen, setIsModalOpen] = useState(false);
    let [data, setData] = useState({
        orderNo: "",
        totalAmount: "",
        cgstAmount: "",
        sgstAmount: "",
        serviceTaxAmount: "",
        netAmount: "",
        orderId: ""
    });
    let [singleOrderData, setSingleOrderData] = useState({})

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    let loadOrderData = async (orderId) => {
        let params = {orderId}
        let resp = await dispatch(getPrintProductsFxn(params))
        setSingleOrderData(resp)
    }

    useEffect(() => {
        if (singleOrderData && singleOrderData._id) {
            handlePrint()
        }
    }, [singleOrderData])

    const getOldKotData = (params) => {
        return new Promise(async (resolve) => {
            try {
                const x = await getOldKotByOrderIdFxn({...params, orderId: data.orderId});
                if (x) {
                    setOldKots(x.data.data);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        });
    };

    useEffect(() => {
        getOldKotData();
    }, [data.orderId]);

    const apiRequest = (params) => {
        return new Promise(async (resolve) => {
            try {
                const data = await fetchAllOrder({...params});
                resolve(data);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        });
    };

    const columns = [
        {
            title: "Sr. No",
            dataIndex: "serialNo",
            key: "serialNo",
            render: (text, record, index) => index + 1,
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (item) => {
                return (
                    <>
                        {item == 'Pending' ? <label className={'label label-warning'}>Pending</label> : ""}
                        {item == 'Paid' ? <label className={'label label-success'}>Paid</label> : ""}
                        {item == 'Done' ? <label className={'label label-primary'}>Done</label> : ""}
                    </>
                )
            }
        },
        {
            title: "Table No.",
            dataIndex: "tableNo",
            key: "tableNo",
        },
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
            render: (text, record) => (
                <span>{moment(record.date).format("DD/MM/YYYY")} </span>
            ),
        },
        {
            title: "Time",
            dataIndex: "time",
            key: "time",
            render: (text, record) => (
                <span>{moment(record.date).format("hh:mm A")} </span>
            ),
        },

        {
            title: "Action",
            dataIndex: "action",
            key: "action",
            render: (v, record) => {
                return (
                    <>

                        {record.status && record.status !== "Pending" ?
                            <>
                                <a
                                    className="empty_btn"
                                    onClick={() => {
                                        setIsModalOpen(true);
                                        if (record) {
                                            setData({
                                                orderNo: record.orderNo,
                                                totalAmount: record.totalAmount,
                                                cgstAmount: record.cgstAmount,
                                                sgstAmount: record.sgstAmount,
                                                serviceTaxAmount: record.serviceTaxAmount,
                                                netAmount: record.netAmount,
                                                orderId: record._id,
                                            });
                                        }
                                    }}>
                                    <i className={'fa fa-eye'}/>
                                </a>

                                <a className="empty_btn"
                                   onClick={() => {
                                       loadOrderData(record._id)
                                   }}>
                                    <i className={'fa fa-print'}/>
                                </a>
                            </>

                            : ""}

                    </>
                );
            },
        },
    ];
    const columns2 = [
        {
            title: "Sr. No",
            dataIndex: "serialNo",
            key: "serialNo",
            render: (text, record, index) => index + 1,
        },
        {
            title: "Total Amount",
            dataIndex: "totalAmount",
            key: "totalAmount",
        },
        {
            title: "CGST Amount",
            dataIndex: "cgstAmount",
            key: "cgstAmount",
        },
        {
            title: "SGST Amount",
            dataIndex: "sgstAmount",
            key: "sgstAmount",
        },
        {
            title: "Service Tax Amount",
            dataIndex: "serviceTaxAmount",
            key: "serviceTaxAmount",
        },
        {
            title: "Net Amount",
            dataIndex: "netAmount",
            key: "netAmount",
        },
    ];

    const getColumns = () => {
        let columnArr = [];
        _.each(columns, (item) => {
            if (!item.hide) {
                columnArr.push(item);
            }
        });
        return columnArr;
    };

    const getColumns2 = () => {
        let columnArr = [];
        _.each(columns2, (item) => {
            if (!item.hide) {
                columnArr.push(item);
            }
        });
        return columnArr;
    };
    let orderN = (`Order Number : ${data.orderNo}`)

    return (
        <PageHeader title={"Order List"}>
            <div className="card mb-0">
                <div className="table-responsive">
                    <Table
                        apiRequest={apiRequest}
                        columns={getColumns()}
                        ref={tableRef}
                    />
                </div>
            </div>

            {isModalOpen && (
                <Modal visible={isModalOpen}
                       onClose={() => {
                           setIsModalOpen(false);
                       }}
                       title={orderN}>
                    <table className="table table-bordered">
                        <thead>
                        <tr>
                            <td>Total Amount</td>
                            <td>Cgst Amount</td>
                            <td>Sgst Amount</td>
                            <td>Service Tax</td>
                            <td>Net Amount</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>{data.totalAmount}</td>
                            <td>{data.cgstAmount}</td>
                            <td>{data.sgstAmount}</td>
                            <td>{data.serviceTaxAmount}</td>
                            <td>{data.netAmount}</td>
                        </tr>
                        </tbody>
                    </table>


                    <div className={'mt-2'}>
                        {OldKots && OldKots.length
                            ? OldKots.map((item) => {
                                return (
                                    <div key={item.kotNo}>
                                        <div className="dark-background">
                                            <h7>
                                                Kot - {item.kotNo} Time -{" "}
                                                {moment(item.time).format("hh:mm A")}
                                            </h7>
                                        </div>
                                        {item.products.map((product) => {
                                            return (
                                                <>
                                                    <ul className="product-lists mb-0 p-1"
                                                        key={product._id}>
                                                        <li className="w-50">
                                                            <div className="productimg">
                                                                <div className="productcontet">
                                                                    <h4 className={'mb-0'}>
                                                                        {product && product.productId && product.productId.vegNonVeg ?
                                                                            <>
                                                                                {getVegStatus(product.productId.vegNonVeg)}
                                                                            </> : ""}
                                                                        {product.name}{" "}
                                                                        {product.variant &&
                                                                        ` (${product.variant})`}

                                                                        <div className="productlinkset m-lg-1">
                                                                            <h5>{product.code}</h5>
                                                                        </div>
                                                                    </h4>

                                                                </div>
                                                            </div>
                                                        </li>

                                                        <li>
                                                            <div className="increment-decrement">
                                                                <div className="input-groups">
                                                                    <h7>Qty:</h7>
                                                                    <input
                                                                        type="text"
                                                                        name="child"
                                                                        value={product.quantity}
                                                                        className="quantity-field"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>

                                                            <span style={{fontSize: "80%"}}>
                                                                    Rs. {product.price}
                                                                  </span>
                                                        </li>
                                                        <li>

                                                            <strong>Rs. {product.totalAmount}</strong>

                                                        </li>
                                                    </ul>

                                                </>
                                            )
                                        })}
                                    </div>
                                );
                            })
                            : null}
                    </div>
                </Modal>
            )}

            <div style={{display: "none"}}>
                {singleOrderData && singleOrderData._id ?
                    <PrintDesign ref={componentRef} singleOrderData={singleOrderData}/> : null}
            </div>
        </PageHeader>
    );
}

export default OrderList;
