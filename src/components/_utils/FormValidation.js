import _ from "lodash"
import {notification} from "../Elements/appUtils";

export const FormValidation = (fields, data) => {
    let errorObj = _.find(fields, (item) => {
        if (item.type == "select" && item.multiple) {
            if (item.required && (data[item.key] == undefined || data[item.key] == null || data[item.key] == "" || data[item.key] == [])) {
                if (!item.hidden) {
                    return true;
                }
            }
        } else {
            console.log(data[item.key], item.key, data)
            if (item.required && (data[item.key] == undefined || data[item.key] == null || data[item.key] == "")) {
                if (!item.hidden) {
                    return true;
                }
            }
        }
    })
    if (errorObj) {
        notification.warning({title: `${errorObj.label}`})
        return false
    } else {
        return true
    }
}
