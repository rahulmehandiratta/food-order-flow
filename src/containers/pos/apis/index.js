import { apiUrl } from "../../../setting";

export const tableListUrl = () => {
    return "/table-list"
}

export const getOldKotUrl = () => {
    return "/getOrderByTableNo"
}

export const groupedProductUrl = () => {
    return "/groupedProduct";
};

export const addOrderUrl = () => {
    return apiUrl + "/addOrder";
};


export const saveOrderUrl = () => {
    return apiUrl + "/saveOrder";
};
