import { addVariantUrl, getCategoryUrl, getVariantUrl } from "../api";
// import { customAxios as axios, getToken } from "../../../request";
import { showLoader, hideLoader } from "../../../actions/loader";
import notification from "../../../components/Elements/Notification";
import axios from "axios";
import { getCategoryDataUrl } from "../../categories/api";

export const AddVariant = (valData) => async (dispatch) => {
  dispatch(showLoader());
  let { data } = await axios.post(addVariantUrl(), valData);
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
  let config = {
  };
  const { data } = await axios.get(getVariantUrl(), config);
  return data;
};
export const FetchCatgory = async () => {
  let config = {
  };
  const { data } = await axios.get(getCategoryUrl(), config);
  return data;
};

