import {hideLoader, showLoader} from "../../../actions/loader";
import notification from "../../../components/Elements/Notification";
import {appAxios as axios, getToken} from "../../../request";
import {
    addKotUrl,
    addOrderUrl, getOldKotByOrderIdUrl,
    getOldKotUrl, getPrintProductsUrl,
    groupedProductUrl,
    OrderPaymentUrl,
    saveOrderUrl,
    tableListUrl
} from "../apis";

export const tableListFxn = async () => {
    let {data} = await axios.get(tableListUrl())
    return data;
}


export const getOldKotFxn = async (valData) => {
    let {data} = await axios.get(getOldKotUrl(), {params: valData})
    return data;
}

export const getOldKotByOrderIdFxn = async (valData) => {
    let {data} = await axios.get(getOldKotByOrderIdUrl(), {params: valData})
    return data;
}

export const groupedProductFxn = async () => {
    let {data} = await axios.get(groupedProductUrl())
    return data;
}

export const addOrderFxn = (valData) => async (dispatch) => {
    dispatch(showLoader())
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


export const OrderPaymentFxn = (valData) => async (dispatch) => {
    dispatch(showLoader())
    const {data} = await axios.post(OrderPaymentUrl(), valData);
    dispatch(hideLoader())
    if (!data.error) {
        notification.success({message: data.message || "Success"})
    } else {
        notification.error({message: data.message || "Error"})
    }
    return data;
};
export const getPrintProductsFxn = (valData) => async (dispatch) => {
    dispatch(showLoader())
    let config = {
        params: {...valData},
        ...await getToken()
    }
    const {data} = await axios.get(getPrintProductsUrl(), config);
    dispatch(hideLoader())
    return data;
};
