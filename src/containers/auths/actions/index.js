import {appAxios as axios} from "../../../request";
import {showLoader, hideLoader} from "../../../actions/loader";
import {loginUrl} from "../apis";
import {notification} from "../../../components/Elements/appUtils";

export const loginFxn = (valData) => async (dispatch) => {
    dispatch(showLoader())
    let {data} = await axios.post(loginUrl(), valData);
    dispatch(hideLoader())
    if (data.success) {
        notification.success({message: data.message})
    } else {
        notification.error({message: data.message})
    }
    return data;
}
