import React from "react";
import thronesLogo from "./logos/thrones_sm.png";
import darbaarLogo from "./logos/darbaar_sm.png";
import mehfilLogo from "./logos/mehfil_sm.png";
import moment from "moment";
import {getTableName} from "../../components/_utils/_utils";

export class PrintDesign extends React.PureComponent {
    render() {
        let {singleOrderData} = this.props;
        let {mergedProducts} = singleOrderData;
        let netAmount = Math.round(singleOrderData.netAmount)
        return (
            <>
                {singleOrderData && singleOrderData._id ? < div className="" id='printableDiv'>
                    <div className="subcontainer">
                        <h6 style={{textAlign: "center", fontSize: "15px"}}>
                            RGS Food & Beverages
                        </h6>
                        <p style={{textAlign: "center", fontSize: "12px"}}>GST Number : </p>

                        <div className="print_row">
                            <div className="col-sm-4">
                                <img src={darbaarLogo} className={'mt-2 '}/>
                            </div>
                            <div className="col-sm-4 align_center">
                                <img src={thronesLogo}/>
                            </div>
                            <div className="col-sm-4 align_right">
                                <img src={mehfilLogo} className={'mt-2'}/>
                            </div>
                        </div>

                        <div className="divider"></div>
                        <h6 className="mt-1" style={{fontSize: "13px"}}>
                            Name :
                        </h6>
                        <div className="divider border"></div>
                        <div className="detail mt-1 ">
                            <div className="print_row setting">
                                <div className="col-sm-6">
                                    <p style={{fontSize: "13px"}}>Date: {moment(singleOrderData.date).format('DD/MM/YYYY')}</p>
                                    <p style={{fontSize: "13px"}}>{moment(singleOrderData.time).format('hh:mm')}</p>
                                    <p style={{fontSize: "13px"}}>Cashier Biller</p>
                                </div>
                                <div className="col-sm-6">
                                    <p style={{fontWeight: "bold"}}>Dine In: {getTableName(singleOrderData.tableNo)}</p>
                                    <p>{""}</p>
                                    <p style={{fontSize: "13px"}}>Bill No. {singleOrderData.orderNo}</p>
                                </div>
                            </div>
                        </div>
                        <div className="table-design" style={{borderTop: "1px solid black"}}>
                            <div className="cols">
                                <table class="table print_table">
                                    <thead>
                                    <tr>
                                        <th
                                            scope="col"
                                            className="setWidth"
                                            style={{width: "70% !important"}}>
                                            Item
                                        </th>
                                        <th scope="col" style={{textAlign: "right", width: "5%"}}>
                                            Qty
                                        </th>
                                        <th scope="col" style={{textAlign: "right", width: "5%"}}>
                                            Price
                                        </th>
                                        <th scope="col" style={{textAlign: "right", width: "5%"}}>
                                            Amt
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {mergedProducts && mergedProducts.length ? mergedProducts.map((item) => {
                                        return (
                                            <>
                                                <tr className="sett" key={item._id}>
                                                    <th scope="row" style={{fontSize: "13px"}}>
                                                        {item.name}
                                                    </th>

                                                    <td style={{
                                                        textAlign: "right",
                                                        fontSize: "13px"
                                                    }}>{item.quantity}</td>
                                                    <td style={{textAlign: "right", fontSize: "13px"}}>
                                                        Rs. {item.price}
                                                    </td>
                                                    <td style={{textAlign: "right", fontSize: "13px"}}>
                                                        Rs. {item.totalAmount}
                                                    </td>
                                                </tr>
                                            </>
                                        )
                                    }) : null}


                                    </tbody>
                                </table>
                            </div>
                            <div className="divider"></div>
                        </div>
                        <div className="table-design">
                            <div className="cols">
                                <table class="table print_table">
                                    <tbody>
                                    <tr className="sett">
                                        <th scope="row" style={{fontSize: "13px"}}>
                                            Total Qty:
                                        </th>

                                        <td style={{
                                            textAlign: "right",
                                            fontSize: "13px"
                                        }}>{singleOrderData.totalQty}</td>
                                        <td style={{textAlign: "right", fontSize: "13px"}}>
                                            Sub Total:
                                        </td>
                                        <td style={{textAlign: "right", fontSize: "13px"}}>
                                            Rs. {singleOrderData.totalAmount}
                                        </td>
                                    </tr>
                                    <tr className="sett">
                                        <th scope="row" style={{fontSize: "13px"}}>
                                            Discount
                                        </th>
                                        <td style={{textAlign: "right", fontSize: "13px"}}></td>
                                        <td style={{textAlign: "right", fontSize: "13px"}}>

                                        </td>
                                        <td style={{textAlign: "right", fontSize: "13px"}}>
                                            0
                                        </td>
                                    </tr>

                                    <tr className="sett">
                                        <th scope="row" style={{fontSize: "13px"}}>
                                            Service tax
                                        </th>

                                        <td style={{textAlign: "right", fontSize: "13px"}}></td>
                                        <td style={{textAlign: "right", fontSize: "13px"}}>

                                        </td>
                                        <td style={{textAlign: "right", fontSize: "13px"}}>
                                            Rs. {singleOrderData.serviceTaxAmount}
                                        </td>
                                    </tr>

                                    <tr className="sett">
                                        <th scope="row" style={{fontSize: "13px"}}>
                                            CGST
                                        </th>
                                        <td style={{textAlign: "right", fontSize: "13px"}}></td>
                                        <td style={{textAlign: "right", fontSize: "13px"}}>
                                            2.5%
                                        </td>
                                        <td style={{textAlign: "right", fontSize: "13px"}}>
                                            Rs. {singleOrderData.cgstAmount}
                                        </td>
                                    </tr>
                                    <tr className="sett">
                                        <th scope="row" style={{fontSize: "13px"}}>
                                            SGST
                                        </th>
                                        <td style={{textAlign: "right", fontSize: "13px"}}></td>
                                        <td style={{textAlign: "right", fontSize: "13px"}}>
                                            2.5%
                                        </td>
                                        <td style={{textAlign: "right", fontSize: "13px"}}>
                                            Rs. {singleOrderData.sgstAmount}
                                        </td>
                                    </tr>


                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="divider"></div>

                        <div className="table-design">
                            <div className="cols">
                                <table class="table print_table">
                                    <tbody>
                                    <tr className="sett">
                                        <th scope="row" style={{fontSize: "13px"}}>
                                        </th>

                                        <td style={{textAlign: "right", fontSize: "13px"}}></td>
                                        <td style={{textAlign: "right", fontSize: "13px"}}>
                                            <p>
                                                Round Off
                                            </p>
                                        </td>
                                        <td style={{textAlign: "right", fontSize: "13px"}}>
                                            <p className="total">
                                                +{(netAmount - singleOrderData.netAmount).toFixed(2)}
                                            </p>
                                        </td>
                                    </tr>

                                    <tr className="sett">
                                        <th scope="row" style={{fontSize: "13px"}}>
                                        </th>

                                        <td style={{textAlign: "right", fontSize: "13px"}}></td>
                                        <td style={{textAlign: "right", fontSize: "13px"}}>
                                            <p
                                                style={{
                                                    textAlign: "right",
                                                    fontWeight: "bold",
                                                    fontSize: "13px",
                                                }}
                                            >
                                                {" "}
                                                Grand Total
                                            </p>
                                        </td>
                                        <td style={{textAlign: "right", fontSize: "13px"}}>
                                            <p className="total"
                                               style={{
                                                   textAlign: "right",
                                                   fontWeight: "bold",
                                                   fontSize: "13px",
                                               }}>
                                                <b> Rs. {netAmount} </b>
                                            </p>
                                        </td>
                                    </tr>


                                    </tbody>
                                </table>
                            </div>
                            <div className="divider"></div>
                        </div>

                        <p style={{textAlign: "center", marginTop: "12px", fontSize: "13px"}}>
                            Thanks
                        </p>
                    </div>
                </div> : null}
            </>
        )
    }
}

export default PrintDesign;
