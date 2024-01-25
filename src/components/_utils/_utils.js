import {apiUrl} from "../../setting";
import S from "string"

export const RoundOf = (value) => {
    return parseFloat(value.toFixed(2));
};

export const genderOption = [{option: "Male"}, {option: "Female"}];
export const getAvatar = (name) => {
    return name ? name.charAt(0) : null;
};
export const imgPath = {
    edit: "../assets/icons/edit.svg",
    view: "../assets/icons/view.svg",
    transfer: "../assets/icons/transfer.svg",
    menu: "../assets/icons/menu.svg",
    close: "../assets/icons/close.svg",
    wallet: "../assets/icons/wallet.svg",
    check: "../assets/icons/check.svg",
    student: "../assets/icons/student.svg",
    search: "../assets/icons/search.svg",
    upload: "../assets/icons/upload.svg",
};

export const gstRate = [
    {code: "5", number: "5"},
    {code: "12", number: "12"},
    {code: "18", number: "18"},
    {code: "28", number: "28"},
];

export const vegNonVeg = [
    {name: "Veg"},
    {name: "Non-Veg"},
    {name: "Egg"}
];

export const Boolean = [
    {name: "Yes", value: true},
    {name: "No", value: false},
];

export const gst = [{name: "Yes", value: true}, {name: "No", value: false}];

export const type = [{name: "Inclusive"}, {name: "Exclusive"}];

export const types = [
    {name: "Product"},
    {name: "Service"},
    {name: "Slip"},
    {name: "Membership"},
];

export const RenderImage = (path) => {
    return path ? `${apiUrl}${path}` : null;
};
export const getTableName = (name) => {
    return S(name).humanize().s
}
export const getKotProStatus = (status) => {
    return status == "Pending" ? <i className={'label label-warning flex-label'}>P</i> :
        <i className={'label label-success flex-label'}>D</i>
}

export const getVegStatus = (status) => {
    return status == "Veg" ? <i className={'label label-success flex-label'}>V</i> :
        <i className={'label label-danger flex-label'}>N</i>
}
