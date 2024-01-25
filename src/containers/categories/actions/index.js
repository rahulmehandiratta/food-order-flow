import { addCategoryUrl, getCategoryDataUrl , singleCategoryUrl,updateCategoryUrl} from "../api";
import { showLoader, hideLoader } from "../../../actions/loader";
import notification from "../../../components/Elements/Notification";
import {appAxios as axios} from "../../../request";

export const addCategoryFxn = (valData) => async (dispatch) => {
  dispatch(showLoader());
  let { data } = await axios.post(addCategoryUrl(), valData);
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

export const fetchCategory = async (valData) => {
  let config = {
    params: {...valData}
  };
  const {data} = await axios.get(getCategoryDataUrl(), config);
  return data;
};

export const singleCategoryFxn = (id) => async (dispatch) => {
  dispatch(showLoader());
  
  let { data } = await axios.get(singleCategoryUrl(id));
  console.log(data);
  dispatch(hideLoader());
  if (data.error) {
    notification.error({
      message: data.message || "Error",
    });
  }

  return data;
};
export const updateCategoryFxn = (valData) => async (dispatch) => {
  dispatch(showLoader());
  let {data} = await axios.post(updateCategoryUrl(), valData);
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