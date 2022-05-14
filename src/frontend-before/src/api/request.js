import axios from 'axios';
import qs from 'qs';

export async function requestApi(
    url,
    options,
) {
    return axios({
        url,
        withCredentials: false,
        validateStatus: (status) => status >= 200 && status < 300, // default
        ...options,
        params: options.params,
        data: options.data,
        maxContentLength: 2000000,
        paramsSerializer: (params) => qs.stringify(params, {arrayFormat: 'repeat'})
    })
        .catch((error) => {
            if (error.response != null && error.response.data) {
                throw new Error(JSON.stringify(error.response.data));
            } else {
                throw new Error(JSON.stringify(error));
            }
        });
}
