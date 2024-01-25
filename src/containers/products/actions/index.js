import {addProductUrl, getStockUrl} from "../api";
import {hideLoader, showLoader} from "../../../actions/loader";
import {notification} from "../../../components/Elements/appUtils";
import axios from "axios";


export const fetchProduct = async () => {
    let config = {
        // params: {...valData},
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