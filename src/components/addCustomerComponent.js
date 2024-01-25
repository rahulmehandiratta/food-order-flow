import React, { useEffect, useState } from "react";
import { Form, HyperLink } from "./Elements/appUtils";
import { useDispatch } from "react-redux";
import { GetEachFormFields } from "./_utils/formUtils";
import {
  States,
  gstTypeList,
  Countries,
  getStateByCountry,
} from "./_utils/appUtils";
import {addCustomerFxn} from "../containers/customer/action"
import _ from "lodash";

import {useNavigate} from "react-router-dom";
import {notification} from "./Elements/appUtils";

const AddCustomerComponent = (props) => {
  let {onClose=null, groupType, onSubmit}= props;

  console.log(onSubmit, "onSubmit")
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [shippingStateList, setShippingStateList] = useState([]);
  const [copyBillingAddress, setCopyBillingAddress] = useState(false);
  const { getFieldValue } = props.form;
  let dispatch = useDispatch();
  console.log(onClose, "onCLose")
//   useEffect(() => {
  
//     let resp = getStateByCountry("India");
//       setStateList(resp);
//       setShippingStateList(resp);
//   }, []);

  const handleSubmit = (e) => {
    const { form } = props;
    e.preventDefault();
    form.validateFields(async (err, valData) => {
      if (!err) {
     
        if (!valData.name) {
          notification.warning({ message: "Please Enter Name" });
          return;
        }

      
        let x = await dispatch(addCustomerFxn(valData));
        onSubmit();
        if (x && x.success) {
          if (onClose) {
            onClose()
            // window.location.reload()
          }
          props.form.setFieldsValue({
            name: "",
            mobileNo: "",
          
            address: "",
           
          });
         
        }
      }
    });
  };

//   const events = {
//     fetchGroups: async () => {
//       let params = {
//         // results: 100,
//         // count: 100,
//         type: "CLIENT",
//       };
      
//     },
//     getState: (countryName) => {
//       let resp = getStateByCountry(countryName);
//       setStateList(resp);
//     },
//     getShippingState: (countryName) => {
//       let resp = getStateByCountry(countryName);
//       setShippingStateList(resp);
//     },
//   };

//   useEffect(() => {
//     events.fetchGroups();
//   }, []);

  let inputTypes = {
    fields: [
      {
        key: "name",
        label: "Name *",
        span: "col-md-6",
        placeholder: "Name",
      },
      {
        key: "mobileNo",
        label: "Mobile No *",
        span: "col-md-6",
        placeholder: "Mobile No",
      },
      {
        key: "address",
        label: "Address",
        type: "text",
        span: "col-md-6",
        placeholder: "Address",
      },
      
    ],
  
  };

  

  return (
  
    <Form onSubmit={handleSubmit}>
      <div className="form-elements-wrapper">
        <div className={"row"}>
          {inputTypes.fields.map((item, key) => {
            return !item.hidden ? (
              <div
                className={` ${item.span ? item.span : "col-md-6"}`}
                key={key}
              >
                <GetEachFormFields {...props.form} item={item} />
              </div>
            ) : null;
          })}
        </div>
      
        
      </div>

      <button type="submit" className="btn btn-primary">
                    Submit
                </button>
      <HyperLink className=" ms-4 btn btn-danger" link={"/customers"}>
        Cancel
      </HyperLink>
    </Form>
 
  );
};

export default Form.create()(AddCustomerComponent);
