import React, {useState, useEffect} from "react";
import moment from "moment";
import {getTableName} from "../../components/_utils/_utils";

export class KotPrintDesign extends React.PureComponent {
    constructor(props) {
        super(props);
    }


    render() {
        let {kotRecord} = this.props;
        return (
            <div className="" id='printableDiv'>
                {kotRecord && kotRecord._id ?
                    <div className="subcontainer">
                        <h6 style={{textAlign: "center"}}>{moment(kotRecord.date).format("DD/MM/YYYY HH:mm")} </h6>
                        <p style={{textAlign: "center"}}>KOT - {kotRecord.kotNo}</p>
                        <p style={{textAlign: "center", fontWeight: "bold"}}>Dine In</p>
                        <p style={{textAlign: "center", fontWeight: "bold"}}>Table
                            No: {getTableName(kotRecord.tableNo)}</p>

                        <div className="table-kot-design mt-2">
                            <table className="table">
                                <tr>
                                    <th scope="col">Item</th>
                                    <th scope="col" className="table-heading">
                                        Special Note
                                    </th>
                                    <th scope="col">
                                        Qty.
                                    </th>
                                </tr>
                                {kotRecord.products?.map((item, index) => {
                                    let key = item._id + "-" + index;
                                    return (
                                        <>
                                            <tr key={key}>
                                                <td>{item.productId.name}</td>
                                                <td>---</td>
                                                <td>{item.quantity}</td>
                                            </tr>
                                        </>
                                    )
                                })}
                            </table>
                        </div>
                    </div> : null}
            </div>
        );
    }
}

export default KotPrintDesign
