import {apiUrl} from "../../../setting";

export const getCategoryDataUrl = () => {
    return `/getCategoryData`;
};
export const addCategoryUrl = () => {
    return `/addCategory`;
};
export const updateCategoryUrl = () => {
    return `/updateCategory`;
};
export const singleCategoryUrl = (id) => {
    return apiUrl + "/getSingleCategory/" + id;
  };
