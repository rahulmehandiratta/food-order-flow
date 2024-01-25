import React, { useRef } from "react";
import { Table } from "../../components/Elements/appUtils";
import { fetchAllKot } from "./actions";
import PageHeader from "../../components/Elements/pageHeader";
import _ from "lodash";
import moment from "moment";

function KotData() {
  let tableRef = useRef();

  const apiRequest = (params) => {
    return new Promise(async (resolve) => {
      try {
        const data = await fetchAllKot({ ...params });
        resolve(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    });
  };

  const columns = [
    {
      title: "Kot no.",
      dataIndex: "kotNo",
      key: "kotNo",
    },
    {
      title: "Table No.",
      dataIndex: "tableNo",
      key: "tableNo",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },

    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      render: (record) => <span>{moment(record.time).format("hh:mm A")} </span>,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (record) => (
        <span>{moment(record.date).format("DD/MM/YYYY")} </span>
      ),
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
    <PageHeader title={"Kot List"}>
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

export default KotData;
