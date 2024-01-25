import React from "react";
import Image from "../../darbaar.png";
import Image2 from "../../mehfil.png";
import Image3 from "../../throne.png";

const PrintDesign = () => {
    return (
        <>
            <div className="" id='printableDiv'>
                <div className="subcontainer">
                    <h6 style={{textAlign: "center", fontSize: "15px"}}>
                        RGS Food & Beverages
                    </h6>
                    <p style={{textAlign: "center", fontSize: "12px"}}>GST Number : </p>

                    <div className="print_row">
                        <div className="col-sm-4 ">
                            <img src={Image}/>
                        </div>
                        <div className="col-sm-4 align_center">
                            <img src={Image3}/>
                        </div>
                        <div className="col-sm-4 align_right">
                            <img src={Image2}/>
                        </div>
                    </div>

                    <div className="divider"></div>
                    <h6 className="mt-1" style={{fontSize: "13px"}}>
                        Name : aewwwwwwwwwwwwww
                    </h6>
                    <div className="divider border"></div>
                    <div className="detail mt-1 ">
                        <div className="print_row setting">
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

                                    <td style={{textAlign: "right", fontSize: "13px"}}>6</td>
                                    <td style={{textAlign: "right", fontSize: "13px"}}>
                                        Sub Total:
                                    </td>
                                    <td style={{textAlign: "right", fontSize: "13px"}}>
                                        697.00
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
                                        10
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
                                        10
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
                                        17.43
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
                                        17.43
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
                                            +0.44
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
            </div>
        </>
    );
};
export default PrintDesign;
