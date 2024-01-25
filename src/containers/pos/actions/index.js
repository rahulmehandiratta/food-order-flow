import { hideLoader, showLoader } from "../../../actions/loader";
import notification from "../../../components/Elements/Notification";
import {appAxios as axios} from "../../../request";
import {addKotUrl, addOrderUrl, getOldKotUrl, groupedProductUrl, saveOrderUrl, tableListUrl} from "../apis";

export const tableListFxn = async () => {
    let {data} = await axios.get(tableListUrl())
    return data;
}


export const getOldKotFxn = async (valData) => {
    console.log(valData,"ths is valdata");
    let {data} = await axios.get(getOldKotUrl(),{params:valData})
    return data;
}

export const groupedProductFxn = async () => {
    let {data} = await axios.get(groupedProductUrl())
    return data;
}

export const addOrderFxn = (valData) => async (dispatch) => {
    dispatch(showLoader())
    console.log(valData,"thsi is valdata");
    const {data} = await axios.post(addOrderUrl(), valData);
    dispatch(hideLoader())
    if (!data.error) {
        notification.success({message: data.message || "Success"})
    } else {
        notification.error({message: data.message || "Error"})
    }
    return data;
};

export const saveOrderFxn = (valData) => async (dispatch) => {
    dispatch(showLoader())
    const {data} = await axios.post(saveOrderUrl(), valData);
    dispatch(hideLoader())
    if (!data.error) {
        notification.success({message: data.message || "Success"})
    } else {
        notification.error({message: data.message || "Error"})
    }
    return data;
};