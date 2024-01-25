import {apiUrl} from "../../../setting";


export const getorderListUrl = () => {
    return `${apiUrl}/orderList`;
};

export const paymentGroupByPaymentMethodUrl = () => {
    return `${apiUrl}/paymentGroupByPaymentMethod`;
};

export const dashboardCountUrl = () => {
    return `${apiUrl}/dashboard-count`;
};
