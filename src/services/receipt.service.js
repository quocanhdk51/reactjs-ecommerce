import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/receipt/";

const getReceiptByUser = (id) => {
    return axios(API_URL + "?user_id=" + id, { headers: authHeader() });
}

const makePayment = (id, data) => {
    return axios.post(API_URL + "add?user_id=" + id, {
        ...data
    })
}

export default {
    getReceiptByUser,
    makePayment,
};