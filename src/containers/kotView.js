import React, {useEffect, useRef, useState} from "react";
import PageHeader from "../components/Elements/pageHeader";
import './kotStyle.css'
import {getPendingKotFxn, updateKotStatusFxn} from "./kot/actions";
import _ from "lodash"
import {useSelector, useDispatch} from "react-redux";
import {Popconfirm} from "../components/Elements/appUtils";
import {useNavigate} from "react-router";
import moment from "moment";
import {getTableName, getKotProStatus} from "../components/_utils/_utils";
import KotPrintDesign from "./print/kotPrint";
import {useReactToPrint} from "react-to-print";

const KotView = () => {
    const componentRef = useRef();
    let dispatch = useDispatch()
    let [kotList, setKotList] = useState([]);
    let [kotRecord, setKotRecord] = useState({})
    let [refreshKey, setRefreshKey] = useState(moment())
    const navigate = useNavigate()
    useEffect(() => {
        events.loadKots()
    }, [])
    let events = {
        loadKots: async () => {
            let {data} = await getPendingKotFxn();
            setKotList(data);
        },
        updateKot: async (data, productId = '') => {
            let {success, data: kotData} = await updateKotStatusFxn({productId, kotId: data._id});
            if (success && productId) {
                let cloneData = _.clone(kotList);
                let findKot = _.find(cloneData, (item) => {
                    return item._id == data._id;
                })
                if (findKot) {
                    let findPro = _.find(findKot.products, (item) => {
                        return item._id == productId;
                    })
                    if (findPro) {
                        findPro.status = 'Done'
                    }
                    if (kotData.status == 'Pending') {
                        setKotList(cloneData);
                    }
                }
            }
        },
        refreshKot: (data) => {
            let cloneData = _.clone(kotList);
            if (data && data.status == "Done") {
                cloneData = _.reject(cloneData, (item) => {
                    return item._id == data._id;
                })
                setKotList(cloneData)
                setRefreshKey(moment())
            } else {
                let findKot = _.find(cloneData, (item) => {
                    return item._id == data._id;
                })
                if (findKot) {
                    findKot.products = data.products;
                } else {
                    cloneData.unshift(data);
                }
                setKotList(cloneData)

                if (data.kotSubmitType == "kotAndPrint") {
                    setKotRecord(data)
                }
                playSoundFxn()

                setRefreshKey(moment())

            }

        }
    }

    const resp = useSelector(state => {
        let {isRefreshKot, kotData} = state.global
        if (isRefreshKot) {
            events.refreshKot(kotData);
            dispatch({type: 'REFRESH_KOT', kotData: {}, isRefreshKot: false})
        }
    })

    const playSoundFxn = () => {
        setTimeout(() => {
            document.getElementById('mySound').play();
        }, 500)
    }


    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    useEffect(() => {
        if (kotRecord && kotRecord._id) {
            handlePrint()
        }
    }, [kotRecord])


    return (
        <>
            <PageHeader>
                <div className="instruction d-flex justify-content-between">
                    <div className="left w-25">
                        <div className={'form-group d-flex'}>
                            <input
                                type="text"
                                className={'form-control'}
                                placeholder="Enter Kot/Order No."
                            />
                            <button className="btn btn-outline-success btn-sm">Search</button>
                        </div>
                    </div>
                    <div
                        className="right"
                        style={{display: "flex", flexDirection: "row-reverse"}}>
                        <p style={{margin: "0 10px",}} className="with-dot-PickUp">PickUp</p>
                        <p style={{margin: "0 10px",}} className="with-dot-Dine">Dine in</p>
                        <p style={{margin: "0 10px"}} className="with-dot-Other">Other</p>
                        <p style={{margin: "0 10px"}} className="with-dot-Website">Website</p>
                        <p style={{margin: "0 10px"}} className="with-dot-Limit-Exceed">Limit Exceed</p>
                        <p style={{margin: "0 10px"}} className="with-dot-Delivery">Delivery</p>


                    </div>
                </div>
                <div>

                </div>

                <div className={'row'} key={refreshKey}>
                    {kotList && kotList.length ? kotList.map((item) => {
                        return (
                            <>
                                <div className={'col-md-3'} key={item._id}>
                                    <div className="card">
                                        <div className="header-row">
                                            <div className="header-cell">
                                                <h6 style={{
                                                    fontSize: "12px",
                                                    color: "white"
                                                }}>{getTableName(item.tableNo)}</h6>
                                                <p style={{fontSize: "11px", color: "white"}}>DINE IN</p>
                                            </div>
                                            <div className="header-cell">
                                                <h6 style={{fontSize: "12px", color: "white"}}>{item.kotNo}</h6>
                                                <p style={{fontSize: "11px", color: "white"}}>KOT No.</p>
                                            </div>
                                            <div className="header-cell">
                                                <h6 style={{
                                                    fontSize: "12px",
                                                    color: "white"
                                                }}>{moment(item.time).format("hh:mm")}</h6>
                                                <p style={{fontSize: "11px", color: "white"}}>MM:SS</p>
                                            </div>
                                        </div>
                                        <div className="section" style={{marginTop: "-3%"}}>
                                            <table className="table" style={{marginLeft: "0%"}}>
                                                <thead>
                                                <tr>
                                                    <th scope="col">Item</th>
                                                    <th scope="col" style={{textAlign: "right"}}>
                                                        Qty
                                                    </th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {item.products && item.products.length ? item.products.map((pro) => {
                                                    let rowData = (
                                                        <tr key={pro._id + pro.status}>
                                                            <th scope="row">
                                                                <div className={'d-flex'}>
                                                                    {getKotProStatus(pro.status)}
                                                                    {pro.productId && pro.productId.name ? pro.productId.name : ""}
                                                                </div>
                                                            </th>
                                                            <td className={'align_right'}>{pro.quantity}</td>
                                                        </tr>
                                                    )
                                                    return (
                                                        <>
                                                            {pro.status == "Pending" ?
                                                                <Popconfirm
                                                                    title={`${pro.productId && pro.productId.name ? pro.productId.name : ""} is Ready?`}
                                                                    okText={"Click to Complete."}
                                                                    onConfirm={() => {
                                                                        events.updateKot(item, pro._id);
                                                                    }}>
                                                                    {rowData}
                                                                </Popconfirm> :
                                                                rowData
                                                            }
                                                        </>
                                                    )
                                                }) : null}
                                                </tbody>
                                            </table>
                                        </div>
                                        <div
                                            className="card-footer d-inline-flex justify-content-between">
                                            <div>
                                                <div className="btn btn-outline-primary btn-sm" onClick={() => {
                                                    setKotRecord(item)
                                                }}>
                                                    <i className="fa fa-print" aria-hidden="true"></i>
                                                </div>
                                            </div>

                                            <button
                                                className="btn btn-danger btn-sm">
                                                Food is Ready
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </>
                        )
                    }) : null}


                </div>
                <div style={{display: "none"}}>
                    {kotRecord ? <KotPrintDesign ref={componentRef} kotRecord={kotRecord}/> : null}

                </div>

            </PageHeader>
        </>
    );
};
export default KotView;
