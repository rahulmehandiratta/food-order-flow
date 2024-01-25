import {addProductUrl, getStockUrl,singleProductUrl,updateProductUrl} from "../api";
import {hideLoader, showLoader} from "../../../actions/loader";
import {notification} from "../../../components/Elements/appUtils";
import axios from "axios";


export const fetchProduct = async (valData) => {
    let config = {
        params: {...valData},
    }
    const {data} = await axios.get(getStockUrl(), config);
    return data;
};


export const addProductFxn = (valData) => async (dispatch) => {
    dispatch(showLoader())
    const {data} = await axios.post(addProductUrl(), valData);
    dispatch(hideLoader())
    if (!data.error) {
        notification.success({message: data.message || "Success"})
    } else {
        notification.error({message: data.message || "Error"})
    }
    return data;
};

export const singleProductFxn = (id) => async (dispatch) => {
    dispatch(showLoader());
    
    let { data } = await axios.get(singleProductUrl(id));
    console.log(data);
    dispatch(hideLoader());
    if (data.error) {
      notification.error({
        message: data.message || "Error",
      });
    }
  
    return data;
  };
  export const updateProductFxn = (valData) => async (dispatch) => {
    dispatch(showLoader());
    let {data} = await axios.post(updateProductUrl(), valData);
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