import {requestApi} from './request.js';

export class AdAPIClass {
    getRequestURL(path) {
        return `${process.env.AD_HOST}:${process.env.AD_PORT}/${path}`;
    }

    loadAdListData = async () => {
        let requestURL = this.getRequestURL("ad");
        console.log('getRequestURL is ', requestURL);
        const axiosResponse = await requestApi(requestURL, {
            method: 'GET'
        });

        return axiosResponse.data;
    };

    loadAdData = async ({productId}) => {
        const axiosResponse = await requestApi(this.getRequestURL(`product/${productId}`), {
            method: 'GET'
        });

        return axiosResponse.data;
    };
}

export const AdAPI = new AdAPIClass();
