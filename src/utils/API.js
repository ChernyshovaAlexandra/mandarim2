import axios from "axios";

export default axios.create({
    baseURL: "https://mandarim-kdd.promo-dixy.ru/api", 
    responseType: "json",
    headers: {
        'Authorization': `Bearer ${window.localStorage.getItem('mandarim2021-token')}`,
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    }
});