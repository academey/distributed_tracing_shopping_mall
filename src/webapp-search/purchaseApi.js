import {requestApi} from './request.js';

export class PurchaseAPIClass {
    getRequestURL(path) {
        return `http://${process.env.PURCHASE_HOST}:${process.env.PURCHASE_PORT}/${path}`;
    }

    loadListData = async () => {
        let requestURL = this.getRequestURL(
            "pays"
        );
        console.log('getRequestURL is ', requestURL);

        try {
            const axiosResponse = await requestApi(
                requestURL, {
                    method: 'GET'
                });
            console.log('axiosResponse is ', axiosResponse);
            return axiosResponse.data;
        } catch (e) {
            console.log('error is ', e);
            return e;
        }
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
