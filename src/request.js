import {apiUrl} from "./setting";
import axios from "axios";

export let appAxios = axios.create({
    baseURL: apiUrl
});

export const getToken = () => {
    return ({
        'headers': {
            "Access-Control-Allow-Origin": apiUrl,
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH',
            'Access-Control-Allow-Credentials': true,
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'X-Requested-With': 'XMLHttpRequest',
            'crossdomain': true,
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Expires': '0'
        }
    })
}

export const getUserData = async () => {
    return new Promise(async (next, error) => {
        try {
            next(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null)
        } catch (e) {
            next(null)
        }
    })
}
export const getUserToken = async () => {
    return new Promise(async (next, error) => {
        try {
            // console.log("token is", await AsyncStorage.getItem('token'))
            next(localStorage.getItem('token'))
        } catch (e) {
            next(null)
        }
    })
}
