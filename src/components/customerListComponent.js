import React, {useEffect, useRef, useState} from "react";
import {
    Card,
    Modal,
    Table,
    Tooltip,
    Popconfirm
} from "../components/Elements/appUtils";
import {notification} from "../components/Elements/appUtils";
import {fetchCustomer} from "../containers/customer/action";

import axios from "axios";
import moment from "moment";
import Image from "../edit (1).png"
import Image2 from "../remove.png"
import _ from "lodash";
import {useNavigate} from "react-router-dom";
import {deleteCustomerUrl} from "../containers/customer/api";

function CustomerListComponent() {
    let tableRef = useRef();

    const navigate = useNavigate();

    const apiRequest = (params) => {
        return new Promise(async (resolve) => {
            try {
                const data = await fetchCustomer({...params});
                resolve(data.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        });
    };

    const deleteCustomer = async (id) => {
        try {
            const response = await axios.delete(deleteCustomerUrl(id));
            if (response.data.error) {
                notification.error({
                    message: response.data.message,
                });
            } else {
                tableRef.current.reload();
                notification.success({
                    message: response.data.message,
                });
            }
        } catch (error) {
            console.error("Error getting the data:", error);
        }
    };
    const columns = [
        {
            title: "Sr. No",
            dataIndex: "serialNo",
            key: "serialNo",
            render: (text, record, index) => index + 1,
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },

        {
            title: "Mobile",
            dataIndex: "mobileNo",
            key: "mobileNo",
        },

        {
            title: "Address",
            dataIndex: "address",
            key: "address",
        },
        {
            title: "Action",
            dataIndex: "action",
            key: "action",
            render: (v, item) => {
                return (
                    <>
                        <a className={'empty_btn'} onClick={() => {
                            navigate(`/editCustomer?_id=${item._id}`)
                        }}>
                            <i className={'fa fa-edit far'}></i>
                        </a>

                        <Tooltip title={"Delete"}>
                            <Popconfirm
                                title={"Are your sure, you want to delete Customer?"}
                                okText="Yes"
                                cancelText="No"
                                onConfirm={() => {
                                    deleteCustomer(item._id);
                                }}>
                                <a className={'empty_btn'}>
                                    <i className={'fa fa-trash far'}></i>
                                </a>
                            </Popconfirm>
                        </Tooltip>


                    </>
                );
            },
        },
    ];


    return (


        <div className="card mb-0">
            <div className="table-responsive">
                <Table
                    apiRequest={apiRequest}
                    columns={columns}
                    ref={tableRef}
                />
            </div>
        </div>


    );
}

export default CustomerListComponent;
