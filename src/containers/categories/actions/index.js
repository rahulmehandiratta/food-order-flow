import { addCategoryUrl, getCategoryDataUrl } from "../api";
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
