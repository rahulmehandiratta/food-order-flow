import React, {useEffect, useRef, useState} from "react"
import {Button, Card, notification} from "../../../components/Elements/appUtils";
import {getPrintProductsFxn, OrderPaymentFxn, tableListFxn} from "../actions";
import {useNavigate} from "react-router-dom";
import {useReactToPrint} from 'react-to-print';
import PrintDesign from "../../print/printDesign";
import Modal from "../../../components/Elements/Modal";
import InputBox from "../../../components/Elements/InputBox";
import _ from "lodash";
import {useDispatch, useSelector} from "react-redux";

const PosTables = (props) => {
    const componentRef = useRef();
    const navigate = useNavigate();
    let dispatch = useDispatch();
    let [singleOrderData, setSingleOrderData] = useState({})
    let [isModalOpen, setIsModalOpen] = useState(false)

    const [paymentMethod, setPaymentMethod] = useState('');

    const handlePaymentMethodChange = (value) => {
        setPaymentMethod(value);
    };

    let [paymentData, setPaymentData] = useState({
        PaymentType: "",
        customerPaid: 0,
        returnToCustomer: 0,
        tip: 0,
        setteledAmount: 0,
        totalAmount: 0,
        orderNo: "",
        orderId: ""
    })

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    let [tableList, setTableList] = useState([])
    let loadTables = async () => {
        let {data} = await tableListFxn();
        setTableList(data);
    }

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

    let calculatePrice = () => {
        let customerPaid = paymentData.customerPaid;
        let returnToCustomer = 0;
        let tip = paymentData.tip || 0;
        let settledAmount = 0;
        if (tip) {
            tip = parseFloat(tip)
        }
        if (customerPaid) {
            settledAmount = paymentData.totalAmount + tip;
        }

        returnToCustomer = parseFloat(customerPaid) - settledAmount;

        setPaymentData({
            ...paymentData,
            returnToCustomer: returnToCustomer > 0 ? returnToCustomer.toFixed(2) : 0,
            setteledAmount: settledAmount,
        })
    }

    useEffect(() => {
        calculatePrice()
    }, [paymentData.customerPaid, paymentData.tip])

    let handlePayment = async () => {
        paymentData.paymentType = paymentMethod;
        if (!paymentData.paymentType) {
            notification.warning({message: "Choose payment method."})
            return
        }
        if (!paymentData.customerPaid) {
            notification.warning({message: "Enter Paid amount."})
            return
        }
        delete paymentData.totalAmount;

        let x = await dispatch(OrderPaymentFxn(paymentData));
        if (x && x.success) {
            setPaymentData({});
            setIsModalOpen(false);
            loadTables()
        }
    }
    useEffect(() => {
        loadTables()
    }, [])

    const resp = useSelector(state => {
        let {isPrintOrder, orderId} = state.global
        if (isPrintOrder) {
            loadOrderData(orderId);
            dispatch({type: 'PRINT_ORDER', orderId: "", isPrintOrder: false})
        }
    })


    const openTable = (key) => {
        navigate(`/pos/${key}`)
    }

    return (<>
        <Card>
            <div className={'rest-table-box'}>
                {tableList && tableList.length ? tableList.map((item) => {
                    return (<div key={item.name}>
                        <div className={'tab-header'}>
                            <span>{item.name}</span>
                        </div>
                        <div className={'table-list'}>
                            {item.tables.map((eachTable) => {
                                return (

                                    <div
                                        className={`tab-box ${eachTable.totalAmount ? `${eachTable.status}-selected` : ""}`}
                                        key={eachTable.key}>

                                        <div onClick={() => {
                                            openTable(eachTable.key)
                                        }}>
                                            {eachTable.name}
                                            {eachTable.totalAmount ? <div className={'price'}>
                                                <strong>Rs. {eachTable.totalAmount}</strong>
                                            </div> : null}

                                        </div>

                                        {eachTable.status == 'Done' ? <div className={'printBtn'} onClick={() => {
                                            loadOrderData(eachTable.orderId)
                                        }}>
                                            <i className={'fa fa-print'}/>
                                        </div> : null}


                                        {eachTable.status == 'Done' ?
                                            <div className={"payBtn"}
                                                 onClick={() => {
                                                     setIsModalOpen(true);
                                                     setPaymentData(
                                                         {
                                                             totalAmount: eachTable.totalAmount,
                                                             orderNo: eachTable.orderNo,
                                                             orderId: eachTable.orderId
                                                         })
                                                 }}>
                                                PAY
                                            </div> : null}
                                    </div>
                                )

                            })}

                        </div>
                    </div>)
                }) : null}
            </div>
            {isModalOpen && (<Modal
                visible={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                }}
                width={'40%'}
                title={"Payment"}>
                <h6 className={"mb-2"}>Order Number: {paymentData.orderNo}, Amount To Paid:
                    Rs. {paymentData.totalAmount}</h6>
                <InputBox title={"Payment Methods"}>
                    <div className="form-check form-check-inline">
                        <label onClick={() => handlePaymentMethodChange('card')}>
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="card"
                                className="form-check-input"
                                checked={paymentMethod === 'card'}
                            />
                            Card
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <label onClick={() => handlePaymentMethodChange('cash')}>
                            <input
                                className="form-check-input"
                                type="radio"
                                name="paymentMethod"
                                value="cash"
                                checked={paymentMethod === 'cash'}
                            />
                            Cash
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <label onClick={() => handlePaymentMethodChange('upi')}>
                            <input
                                className="form-check-input"
                                type="radio"
                                name="paymentMethod"
                                value="upi"
                                checked={paymentMethod === 'upi'}
                            />
                            UPI
                        </label>
                    </div>
                </InputBox>
                <InputBox
                    title={"Customer Paid"}>
                    <input
                        value={paymentData.customerPaid}
                        className={"form-control"}
                        type={"number"}
                        onChange={(e) => {
                            setPaymentData({
                                ...paymentData,
                                customerPaid: e.target.value,
                            });
                        }}
                    />
                </InputBox>
                <InputBox
                    title={"Return To Customer"}>
                    <input
                        value={paymentData.returnToCustomer}
                        className={"form-control"}
                        disabled
                        type={"number"}
                    />
                </InputBox>
                <InputBox
                    title={"Tip"}>
                    <input
                        value={paymentData.tip}
                        className={"form-control"}
                        type={"Number"}
                        onChange={(e) => {
                            setPaymentData({
                                ...paymentData,
                                tip: e.target.value,
                            });
                        }}
                    />
                </InputBox>
                <InputBox
                    title={"Settlement Amount"}>
                    <input
                        value={paymentData.setteledAmount}
                        className={"form-control"}
                        type={"number"}
                        disabled
                        onChange={(e) => {
                            setPaymentData({
                                ...paymentData,
                                setteledAmount: e.target.value,
                            });
                        }}
                    />
                </InputBox>
                <div
                    className={"mt-3 d-md-flex justify-content-md-end"}
                >
                    <button
                        className={"btn btn-danger"}
                        onClick={() => {
                            setIsModalOpen(false)
                            setPaymentData({})
                        }}>Cancel
                    </button>

                    <button
                        onClick={() => {
                            handlePayment();
                        }}
                        className={"btn btn-success  ms-2"}>Save
                    </button>

                </div>
            </Modal>)}
        </Card>
        <div style={{display: "none"}}>
            {singleOrderData && singleOrderData._id ?
                <PrintDesign ref={componentRef} singleOrderData={singleOrderData}/> : null}
        </div>
    </>)
}
export default PosTables
