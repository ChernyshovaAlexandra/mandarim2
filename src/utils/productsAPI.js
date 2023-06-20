import axios from "axios";
const token = window.localStorage.getItem('mandarim2021-token')
export default axios.create({
    baseURL: "https://scancheck.promo-dixy.ru/api", 
    responseType: "json",
    headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    }
});
