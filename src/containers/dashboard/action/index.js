import {dashboardCountUrl, getorderListUrl, paymentGroupByPaymentMethodUrl,} from "../api";
import {hideLoader, showLoader} from "../../../actions/loader";
import {notification} from "../../../components/Elements/appUtils";
import axios from "axios";
import {getToken} from "../../../request";


export const fetchOrderListFxn = async (valData) => {
    let config = {
        params: {...valData},
    }
    const {data} = await axios.get(getorderListUrl(), config);
    return data;
};

export const dashboardCountFxn = async (valData) => {
    let config = {
        params: {...valData},
        ...await getToken()
    }
    const {data} = await axios.get(dashboardCountUrl(), config);
    return data;
};

export const paymentGroupByPaymentMethodFxn = async (valData) => {
    const {data} = await axios.post(paymentGroupByPaymentMethodUrl(), valData, getToken());
    return data;
};
