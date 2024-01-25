import { apiUrl } from "../../../setting";


export const singleKotUrl = (id) => {
    return apiUrl + "/getSingleKot/" + id;
};
