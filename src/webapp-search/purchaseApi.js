import {requestApi} from './request.js';

export class PurchaseAPIClass {
    getRequestURL(path) {
        return `${process.env.PURCHASE_HOST}:${process.env.PURCHASE_PORT}/${path}`;
    }

    loadListData = async () => {
        let requestURL = this.getRequestURL(
            "pays"
        );
        console.log('getRequestURL is ', requestURL);
        const axiosResponse = await requestApi(
            requestURL, {
                method: 'GET'
            });
        console.log('axiosResponse is ', axiosResponse);
        return axiosResponse.data;
    };

    loadData = async ({
                          payId
                      }) => {
        const axiosResponse = await requestApi(
            this.getRequestURL(
                `pays/${payId}`
            ), {
                method: 'GET'
            });

        return axiosResponse.data;
    };
}

export const PurchaseAPI = new PurchaseAPIClass();
