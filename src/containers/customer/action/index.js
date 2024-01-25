import {addCustomerUrl, getcustomerUrl, singleCustomerUrl, updateCustomerUrl} from "../api";
import {hideLoader, showLoader} from "../../../actions/loader";
import {notification} from "../../../components/Elements/appUtils";
import axios from "axios";



export const fetchCustomer = async () => {
    let config = {
        // params: {...valData},
    }
    const {data} = await axios.get(getcustomerUrl(), config);
    return data;
};


export const addCustomerFxn = (valData) => async (dispatch) => {
    dispatch(showLoader())
    const {data} = await axios.post(addCustomerUrl(), valData);
    dispatch(hideLoader())
    if (!data.error) {
        notification.success({message: data.message || "Success"})
    } else {
        notification.error({message: data.message || "Error"})
    }
    return data;
};

export const singleCustomerFxn = (id) => async (dispatch) => {
    dispatch(showLoader());
    
    let { data } = await axios.get(singleCustomerUrl(id));
    console.log(data);
    dispatch(hideLoader());
    if (data.error) {
      notification.error({
        message: data.message || "Error",
      });
    }
  
    return data;
  };

  export const updateCustomerFxn = (valData) => async (dispatch) => {
    dispatch(showLoader());
    let {data} = await axios.post(updateCustomerUrl(), valData);
    dispatch(hideLoader());
    if (data.error) {
        notification.error({
            message: data.message || "Error",
        });
    } else {
        notification.success({
            message: data.message || "Success",
        });
    }
    return data;
  };