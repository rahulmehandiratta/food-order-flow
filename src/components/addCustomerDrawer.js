import React from "react";
import AddCustomerComponent from "./addCustomerComponent";
import {Drawer} from "../components/Elements/appUtils"

const AddCustomerDrawer = (props) => {
  let { visible, onClose, onSubmit } = props;
  return (
    <Drawer
        placement="right"
        onClose={onClose}
        visible={visible}
        width="600px"
       
       
        title={"Add Customer"}
      >
      <AddCustomerComponent onClose={onClose} onSubmit={onSubmit}/>
    </Drawer>
  );
};
export default AddCustomerDrawer;
