import {singleKotUrl,} from "../api";
import {hideLoader, showLoader} from "../../../actions/loader";
import {notification} from "../../../components/Elements/appUtils";
import axios from "axios";


export const singleKotFxn = (id) => async (dispatch) => {
    dispatch(showLoader());
    let {data} = await axios.get(singleKotUrl(id));
    dispatch(hideLoader());
    if (data.error) {
        notification.error({
            message: data.message || "Error",
        });
    }

    return data;
};
