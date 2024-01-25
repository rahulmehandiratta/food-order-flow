import React, { useEffect, useState } from "react";
import {
  Form,
  HyperLink,
  notification,
} from "../../components/Elements/appUtils";
import PageHeader from "../../components/Elements/pageHeader";
import { useDispatch } from "react-redux";
import { GetEachFormFields } from "../../components/_utils/formUtils";
import _ from "lodash";
import { useNavigate } from "react-router-dom";
import { singleCustomerFxn, updateCustomerFxn } from "./action";
import moment from "moment";
const EditCustomer = (props) => {
    let {onClose} = props;
  const { getFieldValue,setFieldsValue } = props.form;
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const [customerId, setCustomerId] = useState("");
  useEffect(() => {
    checkCustomerId();
  }, []);

  let id;

  const checkCustomerId = async () => {
    let searchParams = new URLSearchParams(window.location.search);
    id = searchParams.get("_id");
    if (id) {
        getSingleCustomer(id);
        setCustomerId(id);
    }
  };
  const getSingleCustomer = async (id) => {
    let { data, success } = await dispatch(singleCustomerFxn(id));
    console.log(data, "valdata")
    if (success) {
      setTimeout(() => {
        props.form.setFieldsValue({
            name: data.name,
            mobileNo: data.mobileNo,
            address: data.address,
           
        });
       
         
     
      }, 300);
      
      
    }
  };
 

    const handleSubmit = (e) => {
      const {form} = props;
      e.preventDefault();

      form.validateFields(async (err, valData) => {
          if (!err) {

              valData._id = customerId

              let x = await dispatch(updateCustomerFxn(valData));
              if (x && x.success) {
                  console.log(x, "valdata")
                  navigate('/customerList')
              }
          } else {
              if (err.name) {
                  notification.warning({
                      message: `Please enter Name`,
                  });
                  return;
              }

            

              notification.warning({
                  message: "Fill All Required Fields",
              });
          }
      });
  };

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
    <>
      <PageHeader title={"Edit Customer"}>
        <div className="card">
          <div className="card-body">
            <Form onSubmit={handleSubmit}>
              <div className="form-elements-wrapper">
                <div className={"row"}>
                  {inputTypes.fields.map((item, key) => {
                    return !item.hidden ? (
                      <div
                        className={`${item.span ? item.span : "col-md-6"}`}
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
              <HyperLink
                className=" ms-4 btn btn-danger"
                link={"/customerList"}
              >
                Cancel
              </HyperLink>
            </Form>
          </div>
        </div>
      </PageHeader>
    </>
  );
};

export default Form.create()(EditCustomer);
