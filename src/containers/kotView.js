import React, {useEffect, useState} from "react";
import PageHeader from "../components/Elements/pageHeader";
import './kotStyle.css'
import {getPendingKotFxn, updateKotStatusFxn} from "./kot/actions";
import _ from "lodash"
import {useSelector, useDispatch} from "react-redux";
import {Popconfirm} from "../components/Elements/appUtils";

const KotView = () => {
    let dispatch = useDispatch()
    let [kotList, setKotList] = useState([]);
    useEffect(() => {
        events.loadKots()
    }, [])
    let events = {
        loadKots: async () => {
            let {data} = await getPendingKotFxn();
            setKotList(data);
        },
        updateKot: async (data, productId = '') => {
            let {success} = await updateKotStatusFxn({productId, kotId: data._id});
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
                    setKotList(cloneData);
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
            }

        }
    }

    const resp = useSelector(state => {
            let {isRefreshKot, kotData} = state.global
            if (isRefreshKot) {
                events.refreshKot(kotData)
                dispatch({type: 'REFRESH_KOT', kotData: {}, isRefreshKot: false})
            }
        }
    )


    return (
        <>
            <PageHeader>
                <div
                    className="instruction"
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        height: "37px",

                    }}
                >
                    <div className="left">
                        <button className="form-control">
                            <i className="fas fa-search"></i> Search
                        </button>
                    </div>
                    <div
                        className="right"
                        style={{display: "flex", flexDirection: "row-reverse"}}
                    >
                        <p style={{margin: "0 10px",}} className="with-dot-PickUp">PickUp</p>
                        <p style={{margin: "0 10px",}} className="with-dot-Dine">Dine in</p>
                        <p style={{margin: "0 10px"}} className="with-dot-Other">Other</p>
                        <p style={{margin: "0 10px"}} className="with-dot-Website">Website</p>
                        <p style={{margin: "0 10px"}} className="with-dot-Limit-Exceed">Limit Exceed</p>
                        <p style={{margin: "0 10px"}} className="with-dot-Delivery">Delivery</p>


                    </div>
                </div>
                <div
                    style={{marginLeft: "10px", marginTop: "5%", textAlign: "right"}}
                >
                    <input
                        type="text"
                        placeholder="Enter Kot/Order No."
                        style={{marginRight: "5px", height: "33px"}}
                    />
                    <button className="btn btn-danger btn-sm">MFR</button>
                </div>

                <div className={'row'}>
                    {kotList && kotList.length ? kotList.map((item) => {
                        return (
                            <>
                                <div className={'col-md-3'} key={item._id}>
                                    <div className="card">
                                        <div className="header-row">
                                            <div className="header-cell">
                                                <h6 style={{fontSize: "12px", color: "white"}}>{item.tableNo}</h6>
                                                <p style={{fontSize: "11px", color: "white"}}>DINE IN</p>
                                            </div>
                                            <div className="header-cell">
                                                <h6 style={{fontSize: "12px", color: "white"}}>{item.kotNo}</h6>
                                                <p style={{fontSize: "11px", color: "white"}}>KOT No.</p>
                                            </div>
                                            <div className="header-cell">
                                                <h6 style={{fontSize: "12px", color: "white"}}>03.42</h6>
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
                                                                {pro.status == 'Done' ? "C" : "P"} &nbsp;
                                                                {pro.productId && pro.productId.name ? pro.productId.name : ""}
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
                                            className="card-footer"
                                            style={{
                                                borderTop: "1px solid #ddd",
                                                display: "flex",
                                                justifyContent: "space-between",
                                            }}>
                                            <div className="icon">
                                                <i className="fa fa-times-circle" aria-hidden="true"></i>
                                            </div>
                                            <button
                                                className="btn btn-danger btn-sm"
                                                style={{height: "35px"}}>
                                                Food is Ready
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </>
                        )
                    }) : null}


                </div>

            </PageHeader>
        </>
    );
};
export default KotView;
