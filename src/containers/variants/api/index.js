import { apiUrl } from "../../../setting";

export const addVariantUrl = () => {
  return `${apiUrl}/addVariant`;
};
export const getVariantUrl = () => {
  return `${apiUrl}/getVariantData`;
};
export const getCategoryUrl = () => {
  return `${apiUrl}/getCategoryData`;
};
export const singleVarientUrl = (id) => {
  return apiUrl + "/getSingleVarient/" + id;
};
export const updateVarientUrl = () => {
  return `${apiUrl}/updateVarient`;
};
