import { apiUrl } from "../../../setting";

export const addCustomerUrl = () => {
    return `${apiUrl}/createCustomer`;
};
export const getcustomerUrl = () => {
    return `${apiUrl}/customerList`;
};
export const singleCustomerUrl = (id) => {
    return apiUrl + "/getSingleCustomer/" + id;
};
export const updateCustomerUrl = () => {
    return `${apiUrl}/updateCustomer`;
  };
  export const deleteCustomerUrl = (id) => {
    return apiUrl + "/deleteCustomer/" + id;
  };
