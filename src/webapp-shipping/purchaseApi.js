import {requestApi} from './request.js';

export class PurchaseAPIClass {
    getRequestURL(path) {
        return `http://${process.env.PURCHASE_HOST}:${process.env.PURCHASE_PORT}/${path}`;
    }

    loadCardList = async () => {
        let requestURL = this.getRequestURL(
            "purchase"
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

    loadCard = async ({
                          cardId
                      }) => {
        const axiosResponse = await requestApi(
            this.getRequestURL(
                `purchase/${cardId}`
            ), {
                method: 'GET'
            });

        return axiosResponse.data;
    };
}

export const PurchaseAPI = new PurchaseAPIClass();
