import React, {useRef} from "react";
import {Table} from "../../components/Elements/appUtils";
import {fetchProduct} from "./actions";
import PageHeader from "../../components/Elements/pageHeader";
import _ from "lodash";
import {useNavigate} from "react-router-dom";
import Image from "../../edit (1).png"

function ProductList() {
    let tableRef = useRef();
    const navigate = useNavigate()
    const apiRequest = (params) => {
        return new Promise(async (resolve) => {
            try {
                const data = await fetchProduct({...params});
                resolve(data.data);
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
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Category",
            dataIndex: "categoryId",
            key: "categoryId",
            render: (text, record, index) => {
                return (
                    <span>{record.categoryId && record.categoryId.name ? record.categoryId.name : ""}</span>
                )
            },
        },
        {
            title: "Code",
            dataIndex: "code",
            key: "code",
            render: (item) => {
                return item ? <label className={'label label-info'}>{item}</label> : ""
            }
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
            render: (item) => {
                return item ? <>Rs. {item}</> : ""
            }
        },
        {
            title: "Veg/Non-Veg/Egg",
            dataIndex: "vegNonVeg",
            key: "vegNonVeg",
            render: (item) => {
                return item ? <label className={'label label-warning'}>{item}</label> : ""
            }
        },
        // {
        //     title: "Apply-Discount/Coupon",
        //     dataIndex: "coupon",
        //     key: "coupon",
        // },

        // {
        //     title: "Gst",
        //     dataIndex: "gst",
        //     key: "gst",
        // },
        {
            title: "Action",
            dataIndex: "action",
            key: "action",
            render: (v, item) => {
                return (
                    <>
                        <a className={'empty_btn'} onClick={() => {
                            navigate(`/editProduct?_id=${item._id}`)
                        }}>
                            <i className={'fa fa-edit far'}></i>
                        </a>
                    </>
                );
            },
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

    return (
        <PageHeader
            title={"Products"}
            extraLink={[
                {
                    name: "Add Product",
                    link: "/addproduct",
                },
            ]}
        >
            <div className="card mb-0">
                <div className="table-responsive">
                    <Table
                        apiRequest={apiRequest}
                        columns={getColumns()}
                        ref={tableRef}
                    />
                </div>
            </div>
        </PageHeader>
    );
}

export default ProductList;
