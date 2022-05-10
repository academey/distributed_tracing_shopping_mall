import {requestApi} from './request.js';
import dotenv from 'dotenv';

dotenv.config();

export class PurchaseAPIClass {
    getRequestURL(path) {
        return `http://localhost:8002/${path}`;
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
            //console.log('axiosResponse is ', axiosResponse);
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
