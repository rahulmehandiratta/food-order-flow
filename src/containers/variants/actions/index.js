import {addVariantUrl, getCategoryUrl, getVariantUrl, singleVarientUrl, updateVarientUrl} from "../api";

import {showLoader, hideLoader} from "../../../actions/loader";
import notification from "../../../components/Elements/Notification";
import axios from "axios";
import {getCategoryDataUrl} from "../../categories/api";
import {getToken} from "../../../request";

export const AddVariant = (valData) => async (dispatch) => {
    dispatch(showLoader());
    let {data} = await axios.post(addVariantUrl(), valData);
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
export const singleVarientFxn = (id) => async (dispatch) => {
    dispatch(showLoader());

    let {data} = await axios.get(singleVarientUrl(id));
    console.log(data);
    dispatch(hideLoader());
    if (data.error) {
        notification.error({
            message: data.message || "Error",
        });
    }

    return data;
};

export const updateVarientFxn = (valData) => async (dispatch) => {
    dispatch(showLoader());
    let {data} = await axios.post(updateVarientUrl(), valData);
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

export const FetchVariants = async () => {
    let config = {};
    const {data} = await axios.get(getVariantUrl(), config);
    return data;
};
export const FetchCatgory = async (valData) => {
    let config = {
        params: {...valData},
        ...await getToken()
    };
    const {data} = await axios.get(getCategoryUrl(), config);
    return data;
};

