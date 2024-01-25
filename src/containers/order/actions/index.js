import {appAxios as axios, getToken} from "../../../request";
import {getAllOrdersUrl, pendingKotUrl, updateKotStatusUrl} from "../apis";

export const getPendingKotFxn = async () => {
    let {data} = await axios.post(pendingKotUrl(), {}, getToken());
    return data;
}

export const updateKotStatusFxn = async (valData) => {
    let {data} = await axios.post(updateKotStatusUrl(), valData, getToken());
    return data;
}

export const fetchAllOrder = async () => {
    let config = {
        // params: {...valData},
    }
    const {data} = await axios.get(getAllOrdersUrl(), config);
    return data;
};
