import Vue from 'vue'
import Env from './env.js'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios);

export default {
    get(api) {
        return request(api, 'get');
    },
    post(api, data) {
        return request(api, 'post', data);
    }
}


let request = function (api, type, data) {

    let axiosRequest;
    let fullURL = Env.baseURL + api;

    if (type === 'get') {
        axiosRequest = Vue.axios.get(fullURL);
    } else {
        axiosRequest = Vue.axios.post(fullURL, data);
    }

    return axiosRequest.then((response) => {
        return response.data;
    }).catch(function (e) {

    })
};
