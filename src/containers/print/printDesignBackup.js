import React from "react";
import Image from "../../darbaar.png";
import Image2 from "../../mehfil.png";
import Image3 from "../../throne.png";

const PrintDesign = () => {
    return (
        <>
            <div className="container" style={{maxWidth: "307px", float: "left", padding: 0, margin: 0}}>
                <div className="subcontainer">
                    <h6 style={{textAlign: "center", fontSize: "15px"}}>
                        RGS Food & Beverages
                    </h6>
                    <p style={{textAlign: "center", fontSize: "12px"}}>GST Number : </p>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    ></div>

                    <div className="row">
                        <div className="col-sm-4">
                            <img src={Image} style={{height: "40px", width: "50px"}}/>
                        </div>
                        <div className="col-sm-4">
                            <img src={Image3} style={{height: "40px", width: "50px"}}/>
                        </div>
                        <div className="col-sm-4">
                            <img
                                src={Image2}
                                style={{height: "40px", width: "50px", float: "right"}}
                            />
                        </div>
                    </div>

                    <div
                        className="divider"
                        style={{borderBottom: "1px solid black"}}
                    ></div>
                    <h6 className="mt-1" style={{fontSize: "13px"}}>
                        Name : aewwwwwwwwwwwwww
                    </h6>
                    <div className="divider"
                         style={{borderBottom: "1px solid black"}}></div>
                    <div className="detail mt-2 ">
                        <div className="row setting">
                            <div className="col-sm-6">
                                <p style={{fontSize: "13px"}}>Date: 02/01/24</p>
                                <p style={{fontSize: "13px"}}>17:20</p>
                                <p style={{fontSize: "13px"}}>Cashier Biller</p>
                            </div>
                            <div className="col-sm-6">
                                <p style={{fontWeight: "bold"}}>Dine In: G1</p>
                                <p>{""}</p>
                                <p style={{fontSize: "13px"}}>Bill No. 240</p>
                            </div>
                        </div>
                    </div>
                    <div className="table-design" style={{borderTop: "1px solid black"}}>
                        <div className="cols">


                            <table class="table">
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
                                <tr className="sett">
                                    <th scope="row" style={{fontSize: "13px"}}>
                                        Chicken Rara
                                    </th>

                                    <td style={{textAlign: "right", fontSize: "13px"}}>1</td>
                                    <td style={{textAlign: "right", fontSize: "13px"}}>
                                        200.00
                                    </td>
                                    <td style={{textAlign: "right", fontSize: "13px"}}>
                                        200.00
                                    </td>
                                </tr>

                                <tr>
                                    <th scope="row" style={{fontSize: "13px"}}>
                                        Egg Curry
                                    </th>
                                    <td style={{textAlign: "right", fontSize: "13px"}}>1</td>
                                    <td style={{textAlign: "right", fontSize: "13px"}}>
                                        130.00
                                    </td>
                                    <td style={{textAlign: "right", fontSize: "13px"}}>
                                        130.00
                                    </td>
                                </tr>

                                <tr>
                                    <th scope="row" style={{fontSize: "13px"}}>
                                        Kadai Veg
                                    </th>
                                    <td style={{textAlign: "right", fontSize: "13px"}}>1</td>
                                    <td style={{textAlign: "right", fontSize: "13px"}}>
                                        150.00
                                    </td>
                                    <td style={{textAlign: "right", fontSize: "13px"}}>
                                        150.00r
                                    </td>
                                </tr>

                                <tr>
                                    <th scope="row" style={{fontSize: "13px"}}>
                                        Mutton Curry
                                    </th>
                                    <td style={{textAlign: "right", fontSize: "13px"}}> 1</td>
                                    <td style={{textAlign: "right", fontSize: "13px"}}>
                                        250.00
                                    </td>
                                    <td style={{textAlign: "right", fontSize: "13px"}}>
                                        250.00
                                    </td>
                                </tr>

                                <tr>
                                    <th scope="row" style={{fontSize: "13px"}}>
                                        Stuffed Kulcha
                                    </th>
                                    <td style={{textAlign: "right", fontSize: "13px"}}> 1</td>
                                    <td style={{textAlign: "right", fontSize: "13px"}}>
                                        80.00
                                    </td>
                                    <td style={{textAlign: "right", fontSize: "13px"}}>
                                        80.00
                                    </td>
                                </tr>

                                <tr>
                                    <th scope="row" style={{fontSize: "13px"}}>
                                        Tawa Roti
                                    </th>
                                    <td style={{textAlign: "right", fontSize: "13px"}}> 1</td>
                                    <td style={{textAlign: "right", fontSize: "13px"}}>
                                        10.00
                                    </td>
                                    <td style={{textAlign: "right", fontSize: "13px"}}>
                                        10.00
                                    </td>
                                </tr>

                                </tbody>
                            </table>
                        </div>
                        <div
                            className="divider"
                            style={{borderBottom: "1px solid black"}}
                        ></div>
                    </div>
                    <div className="total-section mt-1">
                        <div className="row">
                            <div className="col-sm-4">
                                <p style={{fontSize: "13px"}}>Total Qty: </p>
                            </div>
                            <div className="col-sm-2">
                                <p style={{textAlign: "right", fontSize: "13px"}}>6</p>
                            </div>
                            <div className="col-sm-4">
                                <p style={{fontSize: "13px"}}>Sub Total:</p>
                            </div>
                            <div className="col-sm-2" style={{fontSize: "13px"}}>
                                <p
                                    className="total"
                                    style={{
                                        fontSize: "13px",
                                        float: "left",
                                        marginLeft: "-30px",
                                    }}
                                >
                                    697.00
                                </p>
                            </div>
                        </div>
                        <div className="row mt-1">
                            <div className="col-sm-8">
                                <p style={{fontSize: "13px"}}>Service Charge</p>
                            </div>
                            <div className="col-sm-3" style={{textAlign: "right"}}>
                                <p style={{fontSize: "13px"}}>10.00</p>
                            </div>
                        </div>
                        <div className="row mt-1">
                            <div className="col-sm-4">
                                <p style={{fontSize: "13px"}}>SGST</p>
                            </div>
                            <div
                                className="col-sm-4"
                                style={{textAlign: "right", fontSize: "13px"}}
                            >
                                <p style={{fontSize: "13px"}}>2.5%</p>
                            </div>
                            <div
                                className="col-sm-3"
                                style={{textAlign: "right", fontSize: "13px"}}
                            >
                                <p style={{fontSize: "13px"}}>17.43</p>
                            </div>
                            <div className="col-sm-4">
                                <p style={{fontSize: "13px"}}>CGST</p>
                            </div>
                            <div
                                className="col-sm-4"
                                style={{textAlign: "right", fontSize: "13px"}}
                            >
                                <p style={{fontSize: "13px"}}>2.5%</p>
                            </div>
                            <div
                                className="col-sm-3"
                                style={{textAlign: "right", fontSize: "13px"}}
                            >
                                <p style={{fontSize: "13px"}}>17.43</p>
                            </div>
                        </div>
                        <div
                            className="divider"
                            style={{borderBottom: "1px solid black", marginTop: "2px"}}
                        ></div>
                        <div className="row mt-2">
                            <div className="col-sm-2">
                                <p></p>
                            </div>
                            <div className="col-sm-2">
                                <p></p>
                            </div>
                            <div className="col-sm-4">
                                <p style={{textAlign: "right", fontSize: "13px"}}>
                                    Round Off
                                </p>
                            </div>
                            <div className="col-sm-3">
                                <p
                                    className="total"
                                    style={{textAlign: "right", fontSize: "13px"}}
                                >
                                    +0.44
                                </p>
                            </div>
                        </div>
                        <div className="row ">
                            <div className="col-sm-2">
                                <p></p>
                            </div>
                            <div className="col-sm-2">
                                <p></p>
                            </div>
                            <div className="col-sm-4">
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
                            </div>
                            <div className="col-sm-3">
                                <p
                                    className="total"
                                    style={{
                                        textAlign: "right",
                                        fontWeight: "bold",
                                        fontSize: "13px",
                                    }}
                                >
                                    <b> 742.00 </b>
                                </p>
                            </div>
                        </div>
                        <div
                            className="divider"
                            style={{borderBottom: "1px solid black", marginTop: "2px"}}
                        ></div>
                    </div>
                    <p
                        style={{textAlign: "center", marginTop: "12px", fontSize: "13px"}}
                    >
                        Thanks
                    </p>
                </div>
            </div>
        </>
    );
};
export default PrintDesign;
