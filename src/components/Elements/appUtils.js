import moment from "moment";

export {default as Avatar} from "./Avatar";
export {default as Button} from "./Button";
export {default as TableButton} from "./Button/TableButton";
export {default as Card} from "./Card";
export {default as Checkbox} from "./CheckBox";
export {default as DatePicker} from "./DatePicker";
export {default as Drawer} from "./Drawer";
export {default as DropDown} from "./DropDown";
export {default as Form} from "./Form";
export {default as HyperLink} from "./HyperLink";
export {default as Icon} from "./Icon";
export {default as Modal} from "./Modal";
export {default as notification} from "./Notification";
export {default as Pagination} from "./Pagination";
export {default as Popconfirm} from "./Popconfirm";
export {SelectRc as Select, SelectComponent2 as Select2} from "./Select";
export {default as Table} from "./Table";
export {default as Tabs} from "./Tabs";
export {default as TimePicker} from "./TimePicker";
export {default as Tooltip} from "./Tooltip";
export {titleComponent as Title} from "./component";
export {default as InputBox} from "./inputComponent";

export const displayDate = (date) => {
  if (date) {
    // return moment(date).format("DD MMMM YYYY");
    return moment(date).format("DD-MM-YYYY");
  } else {
    return null;
  }
};
export const appDisplayDate = (date) => {
  if (date) {
    return moment(date).format("DD/MM/YYYY");
  } else {
    return null;
  }
};
export const displayTime = (date) => {
  if (date) {
    return moment(date).format("hh:mm a");
  } else {
    return null;
  }
};
export const longDisplayDate = (date) => {
  if (date) {
    return moment(date).format("DD-MM-YYYY | h:mm A");
  } else {
    return null;
  }
};

export const DefaultTablePagination = (
    newParams,
    defaultPageSize = 20,
    pageSizeOptions = ["20", "50", "75", "100"]
) => {
  let params = {
    defaultPageSize,
    pageSizeOptions,
    ...newParams,
    position: "top",
  };
  return params;
};


export const getStatusColor = (status) => {
  let colorObj = [
    "#337ab7",
    "#5cb85c",
    "#5bc0de",
    "#f0ad4e",
    "#d9534f",
    "#0000FF",
    "#FF1493",
    "#F4A460",
    "#708090",
    "#808080",
    "#5F9EA0",
    "#1890ff",
    "#0872BC",
  ];
  return (
      <span className={"statusLabel"} style={{borderColor: "#4B49AC"}}>
      {status}
    </span>
  );
};
