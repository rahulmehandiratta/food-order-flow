import React, { useRef, useState } from "react";
import { Card, Modal, Table } from "../../components/Elements/appUtils";
import PageHeader from "../../components/Elements/pageHeader";
import _ from "lodash";
import moment from "moment";
import { fetchAllOrder } from "./actions";

function OrderList() {
  let tableRef = useRef();
  let [isModalOpen, setIsModalOpen] = useState(false);
  let [data, setdata] = useState({
    orderNo: "",
    totalAmount: "",
    cgstAmount: "",
    sgstAmount: "",
    serviceTaxAmount: "",
    netAmount: "",
  });
  console.log(data, "data");
  const apiRequest = (params) => {
    return new Promise(async (resolve) => {
      try {
        const data = await fetchAllOrder({ ...params });
        resolve(data);
        console.log(data.data);
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
            <button
              className="btn btn-link w-25"
              onClick={() => {
                console.log(record);
                  setIsModalOpen(true);
                if (record) {
                  setdata({
                    orderNo: record.orderNo,
                    totalAmount: record.totalAmount,
                    cgstAmount: record.cgstAmount,
                    sgstAmount: record.sgstAmount,
                    serviceTaxAmount: record.serviceTaxAmount,
                    netAmount: record.netAmount,
                  });
                }
                //   navigate(`/editCustomer?_id=${item._id}`)
              }}
            >
              View
            </button>
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
        <Modal
          visible={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
          }}
          title={orderN}
        >
          <table className="table table-bordered mt-4">
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
        </Modal>
      )}
    </PageHeader>
  );
}

export default OrderList;
