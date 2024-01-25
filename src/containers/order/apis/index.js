import { apiUrl } from "../../../setting";

export const pendingKotUrl = () => {
    return '/getPendingKot'
}
export const updateKotStatusUrl = () => {
    return '/updateKotStatus'
}

export const getAllOrdersUrl = () => {
    return `${apiUrl}/orderList`;
};